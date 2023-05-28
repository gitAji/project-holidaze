import React, { useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../state/auth/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { MenuOpen } from "@mui/icons-material";

function UserMenu() {
  const user = useSelector((state) => state.user);
  const { avatar, name } = user;
  const [userMenu, setUserMenu] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (e) => {
    setUserMenu(e.currentTarget);
  };

  const handleMenuClose = () => {
    setUserMenu(null);
  };

  const handleDashboard = () => {
    handleMenuClose();
    navigate("/dashboard");
  };

  const handleLogout = () => {
    dispatch(logoutSuccess(true));
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        variant="outlined"
        sx={{
          borderColor: "other.gray",
          borderRadius: "30px",
          borderWidth: "2px",
        }}
        startIcon={<MenuOpen sx={{ color: "other.black" }}></MenuOpen>}
      >
        {avatar ? (
          <Avatar sx={{ backgroundColor: "secondary.main" }}>
            <img
              src={avatar}
              alt={name}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Avatar>
        ) : (
          <Avatar
            sx={{ backgroundColor: "secondary.main", objectFit: "cover" }}
          >
            <PersonIcon />
          </Avatar>
        )}
      </Button>
      <Menu
        anchorEl={userMenu}
        open={Boolean(userMenu)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
