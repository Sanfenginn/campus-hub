import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

type EditUsersButtonsProps = {
  show: boolean;
  handleClose: () => void;
};

const ReminderForSelection: React.FC<EditUsersButtonsProps> = ({
  show,
  handleClose,
}) => {
  const reminder = useSelector((state: RootState) => state.reminder.reminder);

  const getMessage = () => {
    if (reminder === "permission settings") {
      return "No permissions are changed!";
    }
    if (reminder === "upload files") {
      return "Please upload the files before submitting them!";
    }

    if (reminder === "edit user no") {
      return "No user is selected!";
    }

    if (reminder === "edit user more") {
      return "Only one user can be edited at a time!";
    }

    if (reminder === "edit course more") {
      return "Only one course can be edited at a time!";
    }

    if (reminder === "edit course no") {
      return "No course is selected!";
    }
  };

  return (
    <div>
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {getMessage()}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReminderForSelection;
