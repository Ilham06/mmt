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
  Stack,
  Chip,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Login gagal");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch {
      setErrorMsg("Server error 😭");
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
        bgcolor: "linear-gradient(135deg,#43cea2,#185a9d)",
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={1} alignItems="center" mb={3}>
          <LocalFireDepartmentRoundedIcon color="warning" fontSize="large" />
          <Typography variant="h4" fontWeight={900}>
            Continue Game
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Progresmu sudah menunggu 🔥
          </Typography>
        </Stack>

        {errorMsg && (
          <Typography
            color="error"
            textAlign="center"
            sx={{ mb: 2, bgcolor: "#ffebee", p: 1, borderRadius: 2 }}
          >
            {errorMsg}
          </Typography>
        )}

        <Stack spacing={2}>
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />

          <TextField
            label="Password"
            type={showPass ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
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
        </Stack>

        <Button
          fullWidth
          sx={{
            mt: 3,
            py: 1.4,
            borderRadius: 3,
            fontWeight: 800,
            textTransform: "none",
            fontSize: 16,
          }}
          variant="contained"
          disabled={loading}
          onClick={handleLogin}
          startIcon={!loading && <LoginIcon />}
        >
          {loading ? <CircularProgress size={24} /> : "Enter World"}
        </Button>

        <Typography textAlign="center" mt={3} variant="body2">
          © {new Date().getFullYear()} Financial Game
        </Typography>
      </Paper>
    </Box>
  );
}
