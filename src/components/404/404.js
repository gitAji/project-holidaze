import { Button, Container, Paper } from "@mui/material";
import React from "react";
import Meta from "../../utils/meta";
import { Link } from "react-router-dom";
import { QuestionMark } from "./styles";

const Page404 = () => {
  return (
    <>
      <Meta title="404" description="Page not found"></Meta>
      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={0}>
          <QuestionMark sx={{ fontSize: 100 }}>Oops!</QuestionMark>

          <h1>We can’t seem to find the page you’re looking for</h1>
          <p>You could try one of the following options:</p>
          <Link to={"/"}>
            <Button>Home</Button>
          </Link>
          <Link to={"/contact"}>
            <Button>Contact</Button>
          </Link>
        </Paper>
      </Container>
    </>
  );
};

export default Page404;
