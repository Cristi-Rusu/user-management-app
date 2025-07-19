import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useUsersConnection } from "../../../hooks/useUsersConnection";
import type { User } from "../../../types/users";
import * as S from "./styles";

const DeleteCell = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const { deleteUser } = useUsersConnection();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    deleteUser(user);
    handleClose();
  };

  const titleId = `${user.id}-delete-dialog-title`;
  const descriptionId = `${user.id}-delete-dialog-description`;
  return (
    <S.CellContainer>
      <IconButton
        color="error"
        size="small"
        aria-label="delete"
        onClick={handleOpen}
      >
        <DeleteTwoToneIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <DialogTitle id={titleId}>
          Are you sure you want to delete this user?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={descriptionId}>
            The user with email "{user.email}" is going to be deleted. This
            action is irreversible. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </S.CellContainer>
  );
};

export { DeleteCell };
