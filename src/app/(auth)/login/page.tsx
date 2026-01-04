"use client";

import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Stack,
  Alert,
  Divider,
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
        setErrorMsg(data.error || "Email atau password salah");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch {
      setErrorMsg("Terjadi kesalahan server");
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
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          {/* ================= HEADER ================= */}
          <Stack spacing={1} alignItems="center">
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 3,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src="/images/logo/main-logo.svg"
                alt="App Logo"
                width={42}
                height={42}
                priority
              />
            </Box>


            <Typography fontWeight={800} fontSize={22}>
              Masuk ke Akun
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Kelola keuanganmu dengan aman dan terarah
            </Typography>
          </Stack>

          <Divider />

          {/* ================= ERROR ================= */}
          {errorMsg && (
            <Alert severity="error">
              {errorMsg}
            </Alert>
          )}

          {/* ================= FORM ================= */}
          <Stack spacing={2.5}>
            <Stack spacing={0.8}>
              <Typography fontWeight={600}>
                Email
              </Typography>
              <TextField
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                fullWidth
              />
            </Stack>

            <Stack spacing={0.8}>
              <Typography fontWeight={600}>
                Password
              </Typography>
              <TextField
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowPass(!showPass)
                        }
                      >
                        {showPass ? (
                          <VisibilityOffRoundedIcon />
                        ) : (
                          <VisibilityRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>

          {/* ================= ACTION ================= */}
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogin}
            sx={{
              py: 1.3,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: "none",
              fontSize: 15,
            }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Masuk"
            )}
          </Button>

          {/* ================= FOOTER ================= */}
          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
          >
            © {new Date().getFullYear()} Money Tracker
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
