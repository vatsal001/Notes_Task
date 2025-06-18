import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../Api/axiosBase";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { socket } from "../../socketBase";
import { setNotes, addOrUpdate, deleteNotes } from "../../store/NoteSlice";
import NotesMOdal from "../Notes/NotesModal";
import { toggleDarkMode } from "../../store/darkmodeSlice";

const NotesDashboard = () => {
  const dispatch = useDispatch();
  const { notes, view, dark } = useSelector((s) => s.notes);
  const observer = useRef();
  const [Open, setOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["notes"],
      queryFn: ({ pageParam = 1 }) =>
        api.get(`/notes?page=${pageParam}&limit=10`).then((r) => {
          console.log(r);
          return r.data;
        }),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length < 10) return undefined;
        return allPages.length + 1;
      },
    });
  console.log(data);
  useEffect(() => {
    if (data) {
      const updatedData = data.pages.flat();
      dispatch(setNotes(updatedData));
    }
  }, [data]);

  useEffect(() => {
    socket.on("note-updated", (note) => dispatch(addOrUpdate(note)));
    socket.on("note-deleted", (id) => dispatch(deleteNotes(id)));
    return () => {
      socket.off("note-updated");
      socket.off("note-deleted");
    };
  }, []);

  const lastRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("Loading more notes...");
          fetchNextPage();
        }
      });

      if (node) {
        console.log("Observing last note card...");
        observer.current.observe(node);
      }
    },
    [isFetchingNextPage, hasNextPage]
  );

  const maybeLastRef = (idx) => {
    return idx === notes.length - 1 ? lastRef : null;
  };

  const timer = useRef(null);
  useEffect(() => {
    if (!editNote) return;
    timer.current = setInterval(async () => {
      await api.put(`/notes/${editNote._id}`, editNote);
    }, 10000);
    return () => clearInterval(timer.current);
  }, [editNote]);

  const handleSave = (note) => setEditNote(note);
  const openEditor = (note) => {
    setEditNote(note);
    setOpen(true);
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Note
        </Button>
        <Typography>
          Showing {notes.length} notes {hasNextPage ? "Has more..." : "End"}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {notes.map((note, idx) => (
          <Grid
            item
            xs={12}
            sm={view === "grid" ? 6 : 12}
            key={note._id}
            ref={maybeLastRef(idx)}
          >
            <Card onClick={() => openEditor(note)} sx={{ cursor: "pointer" }}>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography paragraph>{note.content}</Typography>
                <Typography variant="caption">
                  {new Date(note.updatedAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isFetchingNextPage && <CircularProgress sx={{ mt: 2 }} />}

      <NotesMOdal
        open={Open}
        note={editNote}
        onClose={() => {
          setOpen(false);
          setEditNote(null);
        }}
        onSave={handleSave}
      />
    </Box>
  );
};

export default NotesDashboard;
