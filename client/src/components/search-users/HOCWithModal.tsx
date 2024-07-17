"use client";
import React, { useState, ComponentType } from "react";
import SearchModel from "@/components/common/SearchModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setReminder } from "@/redux/reminder";
import ReminderForSelection from "@/components/common/Reminder";
import { useEffect } from "react";

export interface HOCWithModalProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  handleClose?: () => void;
}

const HOCWithModal = <P extends object>(
  WrappedComponent: ComponentType<P & HOCWithModalProps>
): React.FC<P> => {
  const HOC: React.FC<P> = (props) => {
    const dispatch = useDispatch();
    const selectedData = useSelector(
      (state: RootState) => state.selectedDataInfo.selectedDataInfo
    );
    // console.log("selectedData:", selectedData);
    // console.log("selectedData:", selectedData.length);

    const [modals, setModals] = useState({
      add: false,
      edit: false,
      delete: false,
      reminderForSelection: false,
    });

    const [currentOperation, setCurrentOperation] = useState<
      "add" | "edit" | "delete" | null
    >(null);

    const toggleModal = (
      modalName: "add" | "edit" | "delete",
      state: boolean
    ) => {
      setModals((prev) => ({ ...prev, [modalName]: state }));
    };

    useEffect(() => {
      if (modals.add) {
        setCurrentOperation("add");
      } else if (modals.edit) {
        setCurrentOperation("edit");
      } else if (modals.delete) {
        setCurrentOperation("delete");
      } else {
        setCurrentOperation(null);
      }
    }, [modals]);

    console.log("currentOperation:", currentOperation);

    const handleAddModelShow = () => toggleModal("add", true);
    const handleAddModelClose = () => toggleModal("add", false);
    const handleEditModelShow = () => {
      if (selectedData.length === 0) {
        dispatch(setReminder("row=0"));
        handleReminderForSelectionShow();
        return;
      } else if (selectedData.length > 1) {
        dispatch(setReminder("row>1"));
        handleReminderForSelectionShow();
        return;
      }
      toggleModal("edit", true);
    };
    const handleEditModelClose = () => toggleModal("edit", false);
    const handleDeleteModelShow = () => {
      if (selectedData.length === 0) {
        dispatch(setReminder("row=0"));
        handleReminderForSelectionShow();
        return;
      }
      toggleModal("delete", true);
    };
    const handleDeleteModelClose = () => toggleModal("delete", false);
    const handleReminderForSelectionShow = () =>
      toggleModal("reminderForSelection", true);
    const handleReminderForSelectionClose = () =>
      toggleModal("reminderForSelection", false);

    const getHandleCloseFunction = (operation: "add" | "edit" | "delete") => {
      switch (operation) {
        case "add":
          return handleAddModelClose;
        case "edit":
          return handleEditModelClose;
        case "delete":
          return handleDeleteModelClose;
        default:
          return () => {};
      }
    };

    return (
      <>
        <WrappedComponent
          {...props}
          onAdd={handleAddModelShow}
          onEdit={handleEditModelShow}
          onDelete={handleDeleteModelShow}
        />
        {modals.reminderForSelection ? (
          <ReminderForSelection
            show={modals.reminderForSelection}
            handleClose={handleReminderForSelectionClose}
          />
        ) : (
          currentOperation && (
            <SearchModel
              show={modals[currentOperation]}
              handleClose={getHandleCloseFunction(currentOperation)}
              operation={currentOperation}
              data={selectedData}
            />
          )
        )}
      </>
    );
  };

  return HOC;
};

export default HOCWithModal;
