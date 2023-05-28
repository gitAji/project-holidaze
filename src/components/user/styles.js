// Description: All styles for user component
//both styled components and material ui styles
import styled from "styled-components";
import { Box } from "@mui/material";

export const UserBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "1rem",
  minWidth: "350px",
});
export const UserBoxTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
`;

export const LoginLabel = styled.label`
  font-size: 1rem;
  color: #000;
`;

export const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: 5,
  border: "2px solid #FFF",
  backgroundColor: "white",
});
