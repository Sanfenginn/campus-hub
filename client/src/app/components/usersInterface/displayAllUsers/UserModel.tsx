import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewAddUserForm from "./NewAddUserForm";
import EditAddUserForm from "./EditUserForm";
import NewAddCoursesForm from "@/app/components/coursesInterface/displayAllCourses/AddCourseForm";
import EditAddCoursesForm from "@/app/components/coursesInterface/displayAllCourses/EditCourseForm";

interface AddUserProps {
  show: boolean;
  handleCloseEdit: () => void;
  isEditUser: boolean;
  handleCloseAdd: () => void;
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
  handleCloseAdd,
  handleCloseEdit,
  isEditUser,
}) => {
  const currentPage = localStorage.getItem("currentPage");
  console.log("UserModel rendered");
  console.log("currentPage:", currentPage);
  console.log("isEditUser:", isEditUser);
  console.log("show:", show);

  return (
    <Modal
      open={show}
      onClose={isEditUser ? handleCloseEdit : handleCloseAdd}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg border-2 border-blue-500"
      sx={{ border: "2px solid yellow" }}
    >
      <Box sx={style}>
        {currentPage === "users" && (
          <>
            {!isEditUser && <NewAddUserForm handleClose={handleCloseAdd} />}
            {isEditUser && <EditAddUserForm handleClose={handleCloseEdit} />}
          </>
        )}
        {currentPage === "courses" && (
          <>
            {console.log("NewAddCoursesForm已加载")}
            {!isEditUser && <NewAddCoursesForm handleClose={handleCloseAdd} />}
            {isEditUser && <EditAddCoursesForm handleClose={handleCloseEdit} />}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UserModel;
