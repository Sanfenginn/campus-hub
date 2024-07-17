"use client";
import { Box, Typography, Container, CssBaseline } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/common/Button";
import CustomTextField from "@/components/common/TextField";
import { LOGIN } from "@/graphql/auth";
import { useMutation } from "@apollo/client";
import config from "@/config/config.json";
import { useState } from "react";

type UserType = "admin" | "student" | "teacher";

const LoginForm: React.FC = () => {
  const [login, { error }] = useMutation(LOGIN);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const account = formData.get("account") as string;
    const password = formData.get("password") as string;

    try {
      const input = {
        account,
        password,
      };

      const response = await login({ variables: { input } });
      // console.log("response: ", response);
      const userType: UserType = response.data.login.role.userType;
      const userConfig = config[userType] || {};
      const settings = config.settings || {};

      const loginData = {
        token: response.data.login.token,
        userType: userType,
        userConfig: userConfig,
        settings: settings,
        name: response.data.login.name,
      };

      // console.log("loginData: ", loginData);

      if (typeof window !== "undefined") {
        localStorage.setItem("loginInfo", JSON.stringify(loginData));
      }

      // 在登录成功后跳转到系统主界面
      if (userType === "admin") {
        router.push("/admin");
      } else if (userType === "teacher") {
        router.push("/teachers");
      } else if (userType === "student") {
        router.push("/students");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className="flex flex-col items-center mt-[2.5rem] ">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
          <CustomTextField
            id="account"
            label="Account Number"
            name="account"
            autoComplete="account"
          />
          <CustomTextField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
          <CustomButton type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
