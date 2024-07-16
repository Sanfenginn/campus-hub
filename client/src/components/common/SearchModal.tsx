import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import getPathName from "@/utils/getPathName";

interface AddUserProps {
  show: boolean;
  handleClose: () => void;
  operation: "add" | "edit" | "delete";
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const UserModel: React.FC<AddUserProps> = ({
  show,
  handleClose,
  operation,
}) => {
  const pathName = getPathName();
  console.log("operation: ", operation);
  console.log("pathName: ", pathName);

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg border-2 border-blue-500"
      sx={{ border: "2px solid yellow" }}
    >
      {
        <Box sx={style}>
          {(pathName === "/admin/users" ||
            pathName === "/admin/users/search") && (
            <>
              {operation === "add" && <div>add</div>}
              {operation === "edit" && <div>edit</div>}
              {operation === "delete" && <div>delete</div>}
            </>
          )}
        </Box>
      }
    </Modal>
  );
};

export default UserModel;
