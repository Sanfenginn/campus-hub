import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

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
  const handleClickYes = () => {
    onConfirm();
    handleClose();
  };
  const currentPage = localStorage.getItem("currentPage");
  console.log("currentPage:", currentPage);

  let condition = "";
  switch (currentPage) {
    case "users":
      condition = "users";
      break;
    case "courses":
      condition = "courses";
      break;
    default:
      condition = "item";
  }

  console.log("condition:", condition);

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
