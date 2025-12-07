"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import { iconSet, colorSet } from "@/config/categories";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/slices/categoryApi";

export default function AddCategoryDialog({
  open,
  onClose,
  category, // jika ada → edit mode
}: {
  open: boolean;
  onClose: () => void;
  category?: any;
}) {
  const [form, setForm] = useState({
    name: "",
    type: "EXPENSE",
    icon: "",
    color: "",
  });

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const isEdit = Boolean(category);

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
      });
    } else {
      setForm({
        name: "",
        type: "EXPENSE",
        icon: "",
        color: "",
      });
    }
  }, [category, open]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateCategory({ id: category.id, ...form }).unwrap();
      } else {
        await createCategory(form).unwrap();
      }

      onClose();
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Fade}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {isEdit ? "Edit Category" : "Add New Category"}
      </DialogTitle>

      <Typography px={3} pb={2} color="text.secondary">
        {isEdit
          ? "Update category information"
          : "Used to classify transactions"}
      </Typography>

      <Divider />

      <DialogContent sx={{ py: 3, px: 4 }}>
        <Stack spacing={3}>
          {/* NAME */}
          <TextField
            label="Category Name"
            fullWidth
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* TYPE */}
          <TextField
            select
            label="Type"
            fullWidth
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <MenuItem value="EXPENSE">Expense</MenuItem>
            <MenuItem value="INCOME">Income</MenuItem>
          </TextField>

          {/* ICON PICKER */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Choose Icon
            </Typography>
            <Grid container spacing={1.5}>
              {iconSet.map((item) => (
                <Grid key={item.label} size={{ xs: 2 }}>
                  <IconButton
                    onClick={() => handleChange("icon", item.label)}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      border:
                        form.icon === item.label
                          ? `2px solid ${form.color || "#4f8ef7"}`
                          : "1px solid #ccc",
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* COLOR PICKER */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Choose Color
            </Typography>
            <Grid container spacing={1.5}>
              {colorSet.map((clr) => (
                <Grid key={clr} size={{ xs: 2 }}>
                  <Box
                    onClick={() => handleChange("color", clr)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      cursor: "pointer",
                      bgcolor: clr,
                      border:
                        form.color === clr
                          ? "3px solid #000"
                          : "2px solid white",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button sx={{ textTransform: "none" }} onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ borderRadius: 2, px: 4 }}
          disabled={!form.name || !form.icon || !form.color}
          onClick={handleSubmit}
        >
          {creating || updating
            ? "Saving..."
            : isEdit
            ? "Update"
            : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
