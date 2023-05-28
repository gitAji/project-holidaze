import styled from "styled-components";
import { Box, Toolbar } from "@mui/material";
import { theme } from "../../../utils/theme"; // since i have mui Theme provider in index its not applied here,i have to import it here to be used

export const CustomToolbar = styled(Toolbar)`
  background-color: ${theme.palette.other.white};
  color: ${theme.palette.other.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

export const LogoImg = styled("img")({
  width: "80px",
  height: "auto",
});
export const LogoImgMobile = styled("img")({
  width: "60px",
  height: "auto",
});

export const Search = styled("div")({
  backgroundColor: theme.palette.other.white,
  padding: "0 10px",
  width: "30%",
  borderRadius: "20px",
  border: "1px solid #ccc",
  borderShadow: "0 0 5px #ccc",
});

export const Nav = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

export const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
