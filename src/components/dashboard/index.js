import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileImage, StyledBadge } from "./styles";
import PersonIcon from "@mui/icons-material/Person";
import FallbackAvatar from "@mui/material/Avatar";
import AvatarUpdate from "./avatarUpdate";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PostVenue from "./postVenue";
import { theme } from "../../utils/theme";
import ManageVenues from "./manageVenues";
import ManageBookings from "./manageBookings";
import BookingsOnVenues from "./bookingsOnVenues";
import VerifiedIcon from "@mui/icons-material/Verified";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const { name, avatar, isLoggedIn, venueManager } = user;
  const [value, setValue] = useState("1");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  //console.log(user);

  const handleTab = (event, newValue) => {
    setValue(newValue);
    //console.log("Your Venues");
  };

  return (
    <>
      <Container sx={{ minHeight: "100vh" }}>
        <Paper elevation={0} sx={{ mb: 2, mt: 2, p: 2 }}>
          <h1>Dashboard</h1>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <div>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                {avatar ? (
                  <ProfileImage alt={name} src={avatar} />
                ) : (
                  <FallbackAvatar sx={{ backgroundColor: "primary.main" }}>
                    <PersonIcon />
                  </FallbackAvatar>
                )}
              </StyledBadge>
              <span>
                <h3>Welcome, {name ? name : "Please Login"}!</h3>
                <span>
                  {venueManager ? "Manager" : "User"}
                  <VerifiedIcon color="primary" fontSize="small" />
                </span>
              </span>
            </div>
            <div>
              {isLoggedIn && (
                <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
                  <AvatarUpdate />
                  {venueManager && <PostVenue />}
                </Stack>
              )}
            </div>
          </Stack>
        </Paper>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper elevation={0} sx={{ minHeight: "20vh" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleTab}
                    aria-label="lab API tabs example"
                  >
                    {venueManager ? (
                      <>
                        <Tab label="Your Bookings" value="1" />
                        <Tab label="Your Venues" value="2" />
                        <Tab label="Bookings On Venues" value="3" />
                      </>
                    ) : (
                      <Tab label="Your Bookings" value="1" />
                    )}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ManageBookings />
                </TabPanel>
                <TabPanel value="2">
                  <ManageVenues />
                </TabPanel>
                <TabPanel value="3">
                  <BookingsOnVenues />
                </TabPanel>
              </TabContext>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
