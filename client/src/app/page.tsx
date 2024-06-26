"use client";

import type { Metadata } from "next";
import LoginForm from "../app/components/LoginForm";
import { Box } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen justify-center items-center flex  bg-cover bg-center bg-login ">
      {/* <div className="absolute w-full h-full bg-black opacity-30"></div> */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
        className=" shadow-lg  flex p-6 flex-column items-center  rounded-2xl"
      >
        <LoginForm />
      </Box>
    </div>
  );
};

export default LoginPage;
