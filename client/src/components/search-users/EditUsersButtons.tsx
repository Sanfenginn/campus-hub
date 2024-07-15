import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import bulkDeleteUsers from "@/app/api/deleteUsers";
import getUsersData from "@/app/api/getUsersData";
import { setUsersData } from "@/app/redux/usersData";
import ConfirmDelete from "@/app/components/usersInterface/displayAllUsers/ConfirmDeleteModel";
import { useEffect, useState } from "react";
import UserModel from "@/app/components/usersInterface/displayAllUsers/UserModel";
import ReminderForSelection from "@/app/components/usersInterface/displayAllUsers/ReminderForSelection";
import { setReminder } from "@/app/redux/reminder";
import bulkDeleteCourses from "@/app/api/deleteCourses";
import { setCoursesData } from "@/app/redux/coursesData";
import getCourses from "@/app/api/getCourses";

interface ApiResponse {
  data: {
    message: any[]; // 根据实际返回的数据类型调整
  };
}

interface IdsType {
  ids: string[];
}

const EditUsersButtons: React.FC = () => {
  const dispatch = useDispatch();
  const [confirmDeletionModelShow, setConfirmDeletionModelShow] =
    useState(false);
  const [addUserModelShow, setAddUserModelShow] = useState(false);
  const [editUserModelShow, setEditUserModelShow] = useState(false);
  const [reminderForSelectionShow, setReminderForSelectionShow] =
    useState(false);
  const [selectedDataIds, setSelectedDataIds] = useState<string[]>([]);

  const currentPage = localStorage.getItem("currentPage");

  const selectedDataInfo = useSelector(
    (state: RootState) => state.selectedDataInfo.selectedDataInfo
  );

  console.log("selectedDataInfo in EditUsersButtons:", selectedDataInfo);

  useEffect(() => {
    if (selectedDataInfo.length > 0) {
      const selectedDataIds = selectedDataInfo.map((data) => data._id);
      setSelectedDataIds(selectedDataIds);
    }
  }, [selectedDataInfo]);

  console.log("selectedDataIds in EditUsersButtons:", selectedDataIds);

  const handleConfirmDeletionShow = () => {
    setConfirmDeletionModelShow(true);
  };

  const handleConfirmDeletionClose = () => {
    setConfirmDeletionModelShow(false);
  };

  const handleConfirmDeletion = () => {
    if (currentPage === "users") {
      if (selectedDataInfo.length === 0) {
        handleReminderForSelection();
        dispatch(setReminder("edit user no"));
        return;
      }
    }
    if (currentPage === "courses") {
      if (selectedDataInfo.length === 0) {
        handleReminderForSelection();
        dispatch(setReminder("edit course no"));
        return;
      }
    }
    handleConfirmDeletionShow();
  };

  const handleDeleteUsers = async () => {
    const deleteData = async (
      fetchFunction: (input: IdsType) => Promise<ApiResponse>,
      ids: IdsType
    ) => {
      try {
        await fetchFunction(ids);
        if (currentPage === "users") {
          const responseAfter = await getUsersData({
            condition: "All Users",
            inputValue: "",
          });
          dispatch(setUsersData(responseAfter?.data?.message ?? []));
        } else if (currentPage === "courses") {
          const responseAfter = await getCourses("");
          dispatch(setCoursesData(responseAfter || []));
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (currentPage === "users") {
      deleteData(bulkDeleteUsers, selectedDataIds);
    }

    if (currentPage === "courses") {
      deleteData(bulkDeleteCourses, selectedDataIds);
    }
  };

  const handleAddUserModelShow = () => {
    setAddUserModelShow(true);
  };

  const handleAddUserModelClose = () => {
    setAddUserModelShow(false);
  };

  const handleAddUser = () => {
    handleAddUserModelShow();
  };

  const handleEditUserModelShow = () => {
    setEditUserModelShow(true);
  };

  const handleEditUserModelClose = () => {
    setEditUserModelShow(false);
  };

  const handleReminderForSelectionShow = () => {
    setReminderForSelectionShow(true);
  };

  const handleReminderForSelectionClose = () => {
    setReminderForSelectionShow(false);
  };

  const handleReminderForSelection = () => {
    handleReminderForSelectionShow();
  };

  const handleEditUser = () => {
    if (currentPage === "users") {
      if (selectedDataInfo.length > 1) {
        handleReminderForSelection();
        dispatch(setReminder("edit user more"));
        return;
      }
      if (selectedDataInfo.length === 0) {
        handleReminderForSelection();
        dispatch(setReminder("edit user no"));
        return;
      }
    }

    if (currentPage === "courses") {
      if (selectedDataInfo.length > 1) {
        handleReminderForSelection();
        dispatch(setReminder("edit course more"));
        return;
      }
      if (selectedDataInfo.length === 0) {
        handleReminderForSelection();
        dispatch(setReminder("edit course no"));
        return;
      }
    }

    handleEditUserModelShow();
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          className="w-[8rem]"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditUser}
        >
          Edit
        </Button>
        <Button
          className="w-[8rem]"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add
        </Button>
        <Button
          className="w-[8rem]"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleConfirmDeletion}
        >
          Delete
        </Button>
      </Stack>
      <ConfirmDelete
        show={confirmDeletionModelShow}
        handleClose={handleConfirmDeletionClose}
        onConfirm={handleDeleteUsers}
      />
      <UserModel
        show={addUserModelShow}
        handleCloseAdd={handleAddUserModelClose}
        isEditUser={false}
      />
      <UserModel
        show={editUserModelShow}
        handleCloseEdit={handleEditUserModelClose}
        isEditUser={true}
      />
      <ReminderForSelection
        show={reminderForSelectionShow}
        handleClose={handleReminderForSelectionClose}
      />
    </div>
  );
};

export default EditUsersButtons;
