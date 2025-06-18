import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../Api/axiosBase";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/signup", data),
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    await mutation.mutateAsync(form);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center py-20">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-700 p-6 rounded shadow"
      >
        <Typography variant="h5" mb={2}>
          Signup
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
          className="w-full bg-green-500 dark:bg-green-700 text-white p-2 rounded"
        >
          {mutation.isLoading ? "Signing up..." : "Signup"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
