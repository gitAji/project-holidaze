import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Menu,
  useMediaQuery,
} from "@mui/material";
import logo from "../../../assets/logo.png";
import {
  CustomToolbar,
  LogoImg,
  LogoImgMobile,
  Nav,
  Search,
  UserBox,
} from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "../../../utils/theme";
import LoginModal from "../../user/modal";

const Head = () => {
  const [open, setOpen] = useState(false); // for menu
  const [drawerOpen, setDrawerOpen] = useState(false); // for drawer
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // for drawer

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); // for drawer
  };

  return (
    <>
      <AppBar position="static">
        <CustomToolbar>
          {/* from styles */}
          {!isSmallScreen ? (
            <Link to="/">
              <LogoImg src={logo} alt="logo" />
            </Link>
          ) : (
            <Link to="/">
              {" "}
              <LogoImgMobile src={logo} alt="logo" />{" "}
            </Link>
          )}
          <Search>
            <InputBase
              autoFocus
              placeholder="Search..."
              startAdornment={
                <SearchIcon
                  sx={{
                    color: "other.gray",
                    mr: 1,
                    "&:hover": { color: "secondary.main" },
                  }}
                />
              }
            />
          </Search>
          {!isSmallScreen ? (
            <Nav>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/venues" className="nav-link">
                Venues
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </Nav>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isSmallScreen && (
            <UserBox>
              <LoginModal /> {/* from user modal */}
            </UserBox>
          )}
        </CustomToolbar>
        <Menu
          open={open}
          onClose={(e) => setOpen(false)}
          id="menu"
          aria-labelledby="button"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
        ></Menu>
      </AppBar>

      {isSmallScreen && (
        <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
          <Nav
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              width: "250px",
              marginTop: "64px",
              fontWeight: "bold",
            }}
          >
            <NavLink
              exact
              to="/"
              onClick={handleDrawerToggle}
              className="nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/venues"
              onClick={handleDrawerToggle}
              className="nav-link"
            >
              Venues
            </NavLink>
            <NavLink
              to="/contact"
              onClick={handleDrawerToggle}
              className="nav-link"
            >
              Contact
            </NavLink>
            <Divider />
            <UserBox>
              <LoginModal />
            </UserBox>
          </Nav>
        </Drawer>
      )}
    </>
  );
};

export default Head;
