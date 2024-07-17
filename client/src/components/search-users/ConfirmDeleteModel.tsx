import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DELETE_USERS, USER_DELETED_SUBSCRIPTION } from "@/graphql/users";
import { useApolloClient, useMutation, useSubscription } from "@apollo/client";

interface ConfirmDeleteProps {
  handleClose: () => void;
  onDelete: () => void;
  message: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  handleClose,
  onDelete,
  message,
}) => {
  const handleClickYes = () => {
    onDelete();
    handleClose();
  };

  return (
    <Box
    // sx={{
    //   width: 300,
    //   bgcolor: "background.paper",
    //   boxShadow: 24,
    //   p: 3,
    //   borderRadius: 2,
    //   display: "flex",
    //   flexDirection: "column",
    //   gap: 2,
    // }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Confirmation
      </Typography>
      <Typography sx={{ mt: 1, mb: 2 }}>{message}</Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={handleClose} color="error">
          No
        </Button>
        <Button
          variant="contained"
          onClick={handleClickYes}
          autoFocus
          color="primary"
        >
          Yes
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmDelete;
