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
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
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
      setErrorMsg("Password & konfirmasi tidak sama 😵");
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
        setErrorMsg(data.error || "Gagal membuat player");
        setLoading(false);
        return;
      }

      window.location.href = "/login";
    } catch {
      setErrorMsg("Server lagi capek 😭");
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
        bgcolor: "linear-gradient(135deg,#667eea,#764ba2)",
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 460,
          p: 4,
          borderRadius: 4,
        }}
      >
        {/* HEADER */}
        <Stack spacing={1} alignItems="center" mb={3}>
          <SportsEsportsIcon color="primary" fontSize="large" />
          <Typography variant="h4" fontWeight={900}>
            Create Player
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Mulai petualangan finansialmu 🚀
          </Typography>
        </Stack>

        {/* ERROR */}
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
            label="Nama Player"
            placeholder="Dompet Slayer"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
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

          <TextField
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            fullWidth
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
        </Stack>

        {/* ACTION */}
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
          onClick={handleRegister}
          startIcon={!loading && <PersonAddAlt1Icon />}
        >
          {loading ? <CircularProgress size={24} /> : "Start New Game"}
        </Button>

        {/* FOOTER */}
        <Typography textAlign="center" mt={3} variant="body2">
          Sudah punya player?{" "}
          <a href="/login" style={{ fontWeight: 700 }}>
            Continue Game →
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
