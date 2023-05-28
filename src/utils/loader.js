import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Stack } from "@mui/material";

const Loader = () => {
  return (
    <>
      <Container
        sx={{
          minHeight: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ alignItems: "center" }}>
          <CircularProgress />
        </Stack>
      </Container>
    </>
  );
};

export default Loader;
