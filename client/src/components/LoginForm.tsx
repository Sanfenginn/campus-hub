"use client";
import { Box, Typography, Container, CssBaseline } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/common/Button";
import CustomTextField from "@/components/common/TextField";
import { initializeApollo } from "@/lib/apolloClient";
import useLogin from "@/graphql/useLogin";

import config from "@/config/config.json";

type UserType = "admin" | "student" | "teacher";

const LoginForm: React.FC = () => {
  const apolloClient = initializeApollo();
  const router = useRouter();
  const { loginFn } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const account = formData.get("account") as string;
    const password = formData.get("password") as string;

    try {
      const response = await loginFn(account, password);
      const userType: UserType = response.userType;
      const userConfig = config[userType] || {};
      const settings = config.settings || {};

      const loginData = {
        account: response.account,
        token: response.token,
        userType: userType,
        userConfig: userConfig,
        settings: settings,
      };

      localStorage.setItem("loginInfo", JSON.stringify(loginData));

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
