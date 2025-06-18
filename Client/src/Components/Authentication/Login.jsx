import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../Api/axiosBase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/UserSlice";
import { Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
  });

  const handle = async (e) => {
    e.preventDefault();
    const res = await mutation.mutateAsync(form);
    dispatch(setUser(res.data.userId));
  };

  return (
    <div className="flex flex-col items-center py-20">
      <form
        onSubmit={handle}
        className="bg-white dark:bg-gray-700 p-6 rounded shadow"
      >
        <Typography style={{ color: "black" }} variant="h5" mb={2}>
          Login
        </Typography>
        <TextField
          type="text"
          placeholder="Username"
          className="mb-2 w-full p-2 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <TextField
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          className="w-full bg-blue-500 dark:bg-blue-700 text-white p-2 rounded"
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
