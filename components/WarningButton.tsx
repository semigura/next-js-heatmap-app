import { ReactNode, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function WarningButton({
  handleConfirm,
  children,
}: {
  handleConfirm: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="contained"
        fullWidth
      >
        {children}
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>消します。いいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            いいえ
          </Button>
          <Button
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
            autoFocus
          >
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WarningButton;
