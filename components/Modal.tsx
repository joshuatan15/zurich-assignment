import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { DialogContent, DialogActions, Grid } from "@mui/material";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

function Modal(props: ModalProps) {
  const { onClose, open, user } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Avatar
              alt={`${user?.first_name} ${user?.last_name}`}
              src={`${user?.avatar}`}
              sx={{
                width: 72,
                height: 72,
                bgcolor: blue[100],
                fontSize: "3rem",
              }}
              imgProps={{
                style: { objectFit: "cover" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              {`${user?.first_name} ${user?.last_name || ""}` || "Guest"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {user?.email || "No email provided"}
            </Typography>
            <Typography variant="body2">
              This is just a placeholder.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
