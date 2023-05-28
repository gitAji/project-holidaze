import React, { useEffect, useState } from "react";
import { Url, VenuesUrl } from "../../api/constant";
import {
  Container,
  Stack,
  Grid,
  Input,
  useMediaQuery,
  FormControlLabel,
  Switch,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../utils/theme";
import VenueCard from "../cards/venueCard";
import fetchData from "../../api/fetchData";
import Loader from "../../utils/loader";

const Venues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // for drawer
  const user = localStorage.getItem("user");
  // filter by amenities
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const url = `${Url}${VenuesUrl}?_owner=true&?_booking=true&?sort=created`;

  // axios fetch data in fetchData.js using async/await in useEffect

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await fetchData(url, setData, setLoading, setError);
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchVenues();
  }, [url]);

  useEffect(() => {
    if (data) {
      setVenues(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  // filter by amenities
  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (wifi ? venue.meta.wifi : true) &&
      (parking ? venue.meta.parking : true) &&
      (breakfast ? venue.meta.breakfast : true) &&
      (pets ? venue.meta.pets : true)
  );

  return (
    <>
      <Container sx={{ mb: 2, minHeight: "100vh" }}>
        <Grid container spacing={4} justifyContent={"center"}>
          <Grid item xs={12} sm={4} md={6} lg={6}>
            <Stack direction="row" spacing={2} marginTop={2} flexGrow={1}>
              <Input
                autoFocus
                placeholder="Search venues by title"
                startAdornment={<SearchIcon />}
                value={searchTerm}
                sx={{ width: isSmallScreen ? "100%" : "70%" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Input>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <Stack
              direction="row"
              spacing={2}
              marginTop={2}
              alignItems="center"
              justifyContent="center"
              sx={{ width: isSmallScreen ? "100%" : "100%" }}
            >
              <WifiIcon sx={{ color: wifi ? "primary.light" : "other.gray" }} />
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-track": {
                        backgroundColor: "secondary.light",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                    }}
                    checked={wifi}
                    name="wifi"
                    color="primary"
                    onChange={(e) => setWifi(e.target.checked)}
                  />
                }
              />
              <DirectionsCarIcon
                sx={{ color: parking ? "primary.light" : "other.gray" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-track": {
                        backgroundColor: "secondary.light",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                    }}
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                    name="parking"
                    color="primary"
                  />
                }
              />
              <RestaurantIcon
                sx={{ color: breakfast ? "primary.light" : "other.gray" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-track": {
                        backgroundColor: "secondary.light",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                    }}
                    checked={breakfast}
                    name="breakfast"
                    color="primary"
                    onChange={(e) => setBreakfast(e.target.checked)}
                  />
                }
              />
              <PetsIcon sx={{ color: pets ? "primary.light" : "other.gray" }} />
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-track": {
                        backgroundColor: "secondary.light",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                    }}
                    checked={pets}
                    name="pets"
                    color="primary"
                    onChange={(e) => setPets(e.target.checked)}
                  />
                }
              />
            </Stack>
          </Grid>
        </Grid>
        {/**End of filter section */}
        <Grid container spacing={2} mt={2} justifyContent={"space-between"}>
          {filteredVenues.length === 0 && searchTerm.length > 0 && (
            <Container sx={{ mt: 2, minHeight: "100vh" }}>
              <p>No results found for "{searchTerm}"</p>
            </Container>
          )}
          {loading ? (
            <Grid item xs={12}>
              <Loader />
            </Grid>
          ) : (
            filteredVenues
              .sort((a, b) => a.created - b.created)
              .map((venue) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <VenueCard
                    id={venue.id}
                    name={venue.name}
                    owner={venue.owner.name}
                    avatar={venue.owner.avatar}
                    media={venue.media[0]}
                    description={venue.description.slice(0, 100) + "..."}
                    price={venue.price}
                    maxGuests={venue.maxGuests}
                    rating={venue.rating}
                    reviews={venue.reviews}
                    isOwnVenue={venue.owner.name === user}
                  />
                </Grid>
              ))
          )}
        </Grid>
      </Container>
    </>
  );
};
export default Venues;
