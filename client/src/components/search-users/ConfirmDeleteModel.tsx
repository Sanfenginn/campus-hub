import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

interface ConfirmDeleteProps {
  show: boolean;
  handleClose: () => void;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  show,
  handleClose,
  onConfirm,
}) => {
  const [condition, setCondition] = useState("item");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPage = localStorage.getItem("currentPage");
      console.log("currentPage:", currentPage);

      switch (currentPage) {
        case "users":
          setCondition("users");
          break;
        case "courses":
          setCondition("courses");
          break;
        default:
          setCondition("item");
      }

      console.log("condition:", condition);
    }
  }, [show]);

  console.log("condition:", condition);

  const handleClickYes = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Do you want to delete the selected ${condition}?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClickYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
