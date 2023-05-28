import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Avatar,
  Stack,
  useMediaQuery,
} from "@mui/material";
import LoginForm from "./LoginForm";
import SignUpForm from "./RegistrationForm";
import CloseIcon from "@mui/icons-material/Close";
import { MenuOpen, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../state/auth/userSlice";
import { theme } from "../../utils/theme";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./userMenu";
import { ModalBox } from "./styles";

function LoginModal() {
  const [open, setOpen] = useState(false);
  const [isLoginBox, setIsLoginBox] = useState(true);
  const user = useSelector((state) => state.user);
  const { name, avatar, isLoggedIn } = user;
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // for drawer
  const navigate = useNavigate();

  //console.log(isLoggedIn);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function toggleForm() {
    setIsLoginBox(!isLoginBox);
  }

  function handleLogout() {
    dispatch(logoutSuccess(true));
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Button
            variant="outlined"
            sx={{
              borderColor: "other.gray",
              borderRadius: "30px",
              borderWidth: "2px",
            }}
            startIcon={<MenuOpen sx={{ color: "other.black" }}></MenuOpen>}
            endIcon={
              <Avatar sx={{ backgroundColor: "other.gray" }}>
                <Person />
              </Avatar>
            }
            onClick={handleOpen}
          ></Button>
          <Modal open={open} onClose={handleClose}>
            <ModalBox>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "2",
                  right: "0",
                  cursor: "pointer",
                  m: 1,
                }}
              />
              {isLoginBox ? <LoginForm /> : <SignUpForm />}
              <Box
                sx={{
                  p: 2,
                }}
              >
                <Button onClick={toggleForm} sx={{ textTransform: "none" }}>
                  {isLoginBox
                    ? "Create new account"
                    : "Already have an account?"}
                </Button>
              </Box>
            </ModalBox>
          </Modal>
        </>
      ) : (
        <>
          {!isSmallScreen ? (
            <Stack
              direction="row"
              spacing={2}
              marginTop={2}
              alignItems="center"
              justifyContent="space-between"
            >
      
              <UserMenu name={name} avatar={avatar} />
            </Stack>
          ) : (
            <Stack
              direction="column"
              spacing={2}
              marginTop={2}
              alignItems="center"
              justifyContent="flex-end"
            >
             
              <Avatar sx={{ backgroundColor: "secondary.main" }}>
                <img
                  src={avatar}
                  alt={name}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Avatar>
              <Link
                to={"/dashboard"}
                className="nav-link"
                onClick={handleClose}
              >
                Dashboard
              </Link>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          )}
        </>
      )}
    </>
  );
}

export default LoginModal;
