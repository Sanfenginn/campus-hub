import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import getPathName from "@/utils/getPathName";
import ConfirmDelete from "@/components/search-users/ConfirmDeleteModel";
import { DELETE_USERS } from "@/graphql/users";
import { useMutation } from "@apollo/client";
import { User } from "@/types/displayList";

interface AddUserProps {
  show: boolean;
  handleClose: () => void;
  operation: "add" | "edit" | "delete";
  data?: User[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const UserModel: React.FC<AddUserProps> = ({
  show,
  handleClose,
  operation,
  data,
}) => {
  const pathName = getPathName();
  const [deleteUsers] = useMutation(DELETE_USERS);

  // console.log("operation: ", operation);
  // console.log("pathName: ", pathName);

  let message = "";
  if (pathName === "/admin/users") {
    message = "Do you want to delete the user you selected?";
  }

  console.log("data", data);
  // console.log("userDeletedData", userDeletedData);

  const id: string[] | undefined = data?.map((item) => item.id);
  console.log("id", id);

  const handleDelete = async () => {
    try {
      if (pathName === "/admin/users" || pathName === "/admin/users/search") {
        const { data } = await deleteUsers({
          variables: { id: id },
        });
        console.log("data", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  let UserComponent: JSX.Element | null = null;
  switch (operation) {
    case "add":
      UserComponent = <div>add</div>;
      break;
    case "edit":
      UserComponent = <div>edit</div>;
      break;
    case "delete":
      UserComponent = (
        <ConfirmDelete
          onDelete={handleDelete}
          handleClose={handleClose}
          message={message}
        />
      );
      break;
  }

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg"
      sx={{ border: "2px solid yellow" }}
    >
      {
        <Box sx={style}>
          {(pathName === "/admin/users" ||
            pathName === "/admin/users/search") &&
            UserComponent}
        </Box>
      }
    </Modal>
  );
};

export default UserModel;
