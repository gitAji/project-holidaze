import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(-1)}>
        <ArrowBackIosIcon sx={{ cursor: "pointer", fontSize: "2rem" }} />
      </Button>
    </>
  );
};

export default BackButton;
