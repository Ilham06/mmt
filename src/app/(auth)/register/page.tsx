"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");

    if (form.password !== form.confirm) {
      setErrorMsg("Password and confirmation must match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // redirect to login
      window.location.href = "/login";
    } catch (err: any) {
      setErrorMsg("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) => theme.palette.grey[100],
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          background: "white",
        }}
      >
        {/* TITLE */}
        <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 1 }}>
          Create an Account
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Register to start using your Money Tracker dashboard
        </Typography>

        {/* ERROR */}
        {errorMsg && (
          <Typography
            color="error"
            sx={{
              mb: 2,
              fontSize: 14,
              textAlign: "center",
              bgcolor: "#ffebee",
              p: 1,
              borderRadius: 1,
            }}
          >
            {errorMsg}
          </Typography>
        )}

        {/* NAME */}
        <TextField
          label="Full Name"
          fullWidth
          sx={{ mb: 3 }}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* EMAIL */}
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          sx={{ mb: 3 }}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <TextField
          label="Password"
          fullWidth
          type={showPass ? "text" : "password"}
          sx={{ mb: 3 }}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* CONFIRM PASSWORD */}
        <TextField
          label="Confirm Password"
          fullWidth
          type={showConfirm ? "text" : "password"}
          sx={{ mb: 3 }}
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* REGISTER BUTTON */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.4,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            fontSize: 16,
          }}
          disabled={loading}
          onClick={handleRegister}
          startIcon={!loading && <PersonAddAlt1Icon />}
        >
          {loading ? <CircularProgress size={24} /> : "Create Account"}
        </Button>

        {/* FOOTER */}
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 600 }}>
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
