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
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <<< PENTING!!!
        body: JSON.stringify(form),
      });
      console.log(res)


      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // SUCCESS → REDIRECT
      router.replace("/dashboard");

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
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          background: "white",
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Please login to continue
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

        {/* LOGIN BUTTON */}
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
          onClick={handleLogin}
          startIcon={!loading && <LoginIcon />}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        {/* FOOTER */}
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          © {new Date().getFullYear()} My Money Tracker
        </Typography>
      </Paper>
    </Box>
  );
}
