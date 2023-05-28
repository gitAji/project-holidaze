import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  backgroundColor: theme.palette.secondary.main,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  alignItems: "center",
  padding: "1rem",
  paddingInline: "2rem",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  maxWidth: "90%",
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #FFF",
  borderRadius: "5px",
  boxShadow: 24,
  maxHeight: "90vh",
  overflowY: "auto",
}));

export const DeleteBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  alignItems: "center",
  padding: "1rem",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  maxWidth: "90%",

  backgroundColor: theme.palette.background.paper,
  border: "2px solid #FFF",
  borderRadius: "5px",
  boxShadow: 24,
  maxHeight: "90vh",
  overflowY: "auto",
}));
