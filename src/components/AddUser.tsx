import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import type { UserRole } from "../types/users";
import {
  EMAIL_REGEXP,
  AT_LEAST_2_CHARS_REGEXP,
  ONLY_LETTERS_AND_SPACES_REGEXP,
} from "../utils";
import { useUsersConnection } from "../hooks/useUsersConnection";

const roleText: Record<UserRole, string> = {
  Developer: "Developer",
  Designer: "Designer",
  Manager: "Manager",
  Other: "Other",
};

type AddUserInputs = {
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
};

export function AddUser() {
  const [open, setOpen] = useState(false);
  const { addUser } = useUsersConnection();
  const { control, handleSubmit, reset } = useForm<AddUserInputs>({
    mode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      role: "Developer",
      department: "",
    },
  });
  console.log();
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const onSubmit: SubmitHandler<AddUserInputs> = (data) => {
    addUser({
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      role: data.role,
      department: data.department?.trim(),
    });
    handleClose();
    reset();
  };

  return (
    <Box sx={{ mb: 1, textAlign: "end" }}>
      <Button variant="contained" onClick={handleOpen}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in all the required fields (*).
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: "Full name is required.",
                validate: {
                  atLeast2Chars: (value) =>
                    AT_LEAST_2_CHARS_REGEXP.test(value) ||
                    "Full name should have at least 2 characters.",
                  onlyLettersAndSpaces: (value) =>
                    ONLY_LETTERS_AND_SPACES_REGEXP.test(value) ||
                    "Only letters and spaces are allowed.",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required
                  margin="dense"
                  label="Full Name"
                  type="text"
                  id="fullName"
                  fullWidth
                  variant="standard"
                  {...field}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required.",
                pattern: {
                  value: EMAIL_REGEXP,
                  message: "Input a valid email format.",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required
                  margin="dense"
                  label="Email Address"
                  id="email"
                  type="email"
                  fullWidth
                  variant="standard"
                  {...field}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
            <Controller
              control={control}
              name="role"
              rules={{ required: "Role is required." }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  required
                  select
                  margin="dense"
                  id="role"
                  label="Role"
                  fullWidth
                  variant="standard"
                  {...field}
                  helperText={error ? error.message : null}
                  error={!!error}
                >
                  {Object.keys(roleText).map((role) => (
                    <MenuItem key={role} value={role}>
                      {roleText[role as UserRole]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="department"
              rules={{
                maxLength: {
                  value: 50,
                  message: "Maximum number of characters is 50.",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  margin="dense"
                  id="department"
                  label="Department"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...field}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
