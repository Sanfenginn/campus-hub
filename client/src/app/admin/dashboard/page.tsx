"use client";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Head from "next/head";

const DashboardPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo") ?? "{}");
      setFirstName(loginInfo?.name?.firstName || "");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        className="h-full"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#f5f5f5",
        }}
      >
        <Card sx={{ maxWidth: 600, padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              {`Welcome back, ${firstName}!`}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="left">
              Welcome to our Campus Hub System, a comprehensive solution
              designed to streamline administrative tasks and improve the
              overall efficiency of our educational institution.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DashboardPage;
