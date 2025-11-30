"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

export default function TransactionFormDialog({ open, onClose }: any) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Transaction</DialogTitle>

      <Formik
        initialValues={{
          title: "",
          amount: "",
          type: "EXPENSE",
          category: "",
          wallet: "",
          date: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required(),
          amount: Yup.number().required(),
          type: Yup.string().required(),
          date: Yup.string().required(),
        })}
        onSubmit={(values) => {
          console.log(values);
          onClose();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField name="title" label="Title" value={values.title} onChange={handleChange} />

                <TextField
                  name="amount"
                  label="Amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                />

                <TextField select name="type" label="Type" value={values.type} onChange={handleChange}>
                  <MenuItem value="INCOME">Income</MenuItem>
                  <MenuItem value="EXPENSE">Expense</MenuItem>
                  <MenuItem value="TRANSFER">Transfer</MenuItem>
                </TextField>

                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={values.date}
                  onChange={handleChange}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={() => handleSubmit()} variant="contained">
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
