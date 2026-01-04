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
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import Link from "next/link";
import Image from "next/image";

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
      setErrorMsg("Password dan konfirmasi tidak sama");
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
        setErrorMsg(data.error || "Gagal membuat akun");
        setLoading(false);
        return;
      }

      window.location.href = "/login";
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
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 460,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          {/* ================= HEADER ================= */}
          <Stack spacing={1.2} alignItems="center">
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
              Buat Akun Baru
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Mulai kelola keuanganmu dengan lebih rapi
            </Typography>
          </Stack>

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
                Nama
              </Typography>
              <TextField
                placeholder="Nama lengkap"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                fullWidth
              />
            </Stack>

            <Stack spacing={0.8}>
              <Typography fontWeight={600}>
                Email
              </Typography>
              <TextField
                type="email"
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
                placeholder="Minimal 8 karakter"
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

            <Stack spacing={0.8}>
              <Typography fontWeight={600}>
                Konfirmasi Password
              </Typography>
              <TextField
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi password"
                value={form.confirm}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirm: e.target.value,
                  })
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowConfirm(!showConfirm)
                        }
                      >
                        {showConfirm ? (
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
            onClick={handleRegister}
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
              "Daftar"
            )}
          </Button>

          {/* ================= FOOTER ================= */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            Sudah punya akun?{" "}
            <Link
              href="/login"
              style={{
                fontWeight: 700,
                color: "#2065D1",
                textDecoration: "none",
              }}
            >
              Masuk
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
