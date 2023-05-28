import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  Container,
  Stack,
  FormControl,
  Box,
  MenuItem,
  Select,
  Button,
  InputLabel,
  Typography,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ShareIcon from "@mui/icons-material/Share";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PetsIcon from "@mui/icons-material/Pets";
import { DateRange } from "react-date-range";
import { bookingSuccess } from "../../state/booking/bookingSlice";
import { BookingsUrl, Url, VenuesUrl } from "../../api/constant";
import fetchData from "../../api/fetchData";
import Loader from "../../utils/loader";
import BackButton from "../../utils/backButton";
import moment from "moment";
import postData from "../../api/postData";

const Venue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [guests, setGuests] = useState("");
  const [guestsSuccess, setGuestsSuccess] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [showDateError, setShowDateError] = useState(false); // show error if date is not selected
  const [showGuestsError, setShowGuestsError] = useState(false); // show error if guests is not selected

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // get user from redux store
  const { isLoggedIn, accessToken } = user; // destructure isLoggedIn from user

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log(dateRange); // startDate[0] and endDate[0]
  const startDate = dateRange[0].startDate;
  const endDate = dateRange[0].endDate;
  const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
  console.log(formattedStartDate);
  console.log(formattedEndDate);

  const url = `${Url}${VenuesUrl}${id}`;
  //console.log(url);

  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const response = await fetchData(url, setData, setLoading, setError);
        setData(response);
        setLoading(false);
        //console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVenue();
  }, [url, setData, setLoading, setError]);

  useEffect(() => {
    if (data) {
      setVenue(data);
      setLoading(false);
    }
    if (error) {
      setLoading(false);
      setError(error);
    }
  }, [data, error]);

  //fetch using id

  //console.log(venue);
  const {
    name,
    media = [],
    description,
    price,
    maxGuests,
    rating,
    created,
    updated,
    location: { address, city, country, zip } = {}, //nested destructuring,if location is undefined we assign it to empty object then it will not throw an error
    meta: { wifi, parking, breakfast, pets } = {},
  } = venue;

  const createdDate = new Date(created).toLocaleDateString();
  const updatedDate = new Date(updated).toLocaleDateString();

  const totalDays = () => {
    const startDate = new Date(formattedStartDate);
    const endDate = new Date(formattedEndDate);

    const days = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return days;
  };

  console.log(totalDays());

  const totalPrice = () => {
    const total = price * guests * totalDays().toFixed(2);
    return total;
  };

  const handleGuestsChange = (e) => {
    e.preventDefault();
    const guests = e.target.value;
    if (guests === "") {
      setGuestsSuccess(false);
    } else {
      setGuestsSuccess(true);
      setShowGuestsError(false);
    }
    setGuests(guests);
  };
  //console.log(guests);

  const handleDateChange = (ranges) => {
    if (ranges.selection.startDate && ranges.selection.endDate) {
      const days =
        (ranges.selection.endDate - ranges.selection.startDate) /
        (1000 * 60 * 60 * 24);
      if (days >= 0) {
        setDateSelected(true);
        setDateRange([ranges.selection]);
        setShowDateError(false);
      } else {
        setDateSelected(false);
      }
    } else {
      setDateSelected(false);
    }
  };

  const bookingData = {
    venueId: id,
    guests: guests,
    dateFrom: formattedStartDate,
    dateTo: formattedEndDate,
  };
  console.log(bookingData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateSelected) {
      setShowDateError(true);
    }
    if (!guestsSuccess) {
      setShowGuestsError(true);
    } else {
      postBooking();
    }
  };
  const postBooking = async () => {
    const postBookingUrl = `${Url}${BookingsUrl}`;
    const token = accessToken;
    try {
      const response = await postData(
        postBookingUrl,
        bookingData,
        token,
        setLoading,
        setData,
        setError
      );
      //console.log(response);
      setData(response);
      dispatch(bookingSuccess(response));
      navigate("/booking-success");
    } catch (error) {
      setError(error);
    }
  };

  // guest options for dropdown
  const options = [];
  for (let i = 1; i <= maxGuests; i++) {
    options.push(
      <MenuItem value={i}>
        {i}
        {i > 1 ? " Guests" : " Guest"}
      </MenuItem>
    );
  }
  //console.log(options); // 1-10 guests

  return (
    <>
      <Container sx={{ minWidth: "100vh" }} key={id}>
        {loading ? (
          <Loader />
        ) : (
          <div key={id}>
            <Stack
              direction="row"
              spacing={2}
              p={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <BackButton />
              <h2>{name}</h2>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <LocationOnIcon />
              <p>Address:{address ? address : "No address registered"} </p>
              <p>City: {city ? city : "No city registered"}</p>

              <ReviewsIcon />
              <p>Rating:{rating ? rating : "No reviews"}</p>
              <ShareIcon />
            </Stack>

            <Grid container spacing={2} mt={2}>
              {media.slice(0, 5).map((image, index) => (
                <Grid
                  xs={index < 1 ? 12 : 6}
                  sm={index < 1 ? 12 : 6}
                  md={index < 1 ? 12 : 3}
                  lg={index < 1 ? 12 : 3}
                >
                  <Card>
                    <CardMedia
                      sx={{
                        objectFit: "cover",
                        height: 300,
                        width: "100%",
                        backgroundColor: "other.white",
                        p: 1,
                      }}
                      component="img"
                      image={image}
                      alt={name}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                justifyContent={"space-between"}
              >
                <h2>Description</h2>
                <p>{description}</p>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <p>Created:{createdDate}</p>
                  <p>Updated:{updatedDate}</p>
                </Stack>
                <h2>Amenities</h2>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <p>
                    <WifiIcon /> {wifi ? "Yes" : "No"}
                  </p>
                  <p>
                    <DirectionsCarIcon /> {parking ? "Yes" : "No"}
                  </p>
                  <p>
                    <RestaurantIcon />
                    {breakfast ? "Yes" : "No"}
                  </p>
                  <p>
                    <PetsIcon /> {pets ? "Yes" : "No"}
                  </p>
                </Stack>

                <h2>Location</h2>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <p>Address:{address ? address : "No address registered."}</p>
                  <p>City:{city ? city : "No city registered."}</p>
                  <p>Zip:{zip ? zip : "No zip registered."}</p>
                  <p>Country:{country ? country : "No country registered."}</p>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ m: 1, boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}>
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-evenly"
                  >
                    <h2>Price:${price}</h2>
                    <p>Max Guests:{maxGuests}</p>
                    <p>
                      Ratings:
                      {rating ? rating : "No reviews"}
                    </p>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <FormControl sx={{ m: 2 }}>
                      {showGuestsError && (
                        <Alert
                          severity="error"
                          className="alert"
                          sx={{ mt: 5 }}
                        >
                          Please select number of guests!
                        </Alert>
                      )}
                      <InputLabel id="demo-simple-select-helper-label">
                        Guests
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={guests}
                        label="Guests"
                        onChange={handleGuestsChange}
                      >
                        {options}
                      </Select>
                      {/** how to load max-guests to dropdown   */}
                      <h2>Check In & Check Out</h2>

                      {showDateError && (
                        <Alert
                          severity="error"
                          className="alert"
                          sx={{ mt: 2 }}
                        >
                          Please select check-in and check-out dates!
                        </Alert>
                      )}

                      <DateRange
                        editableDateInputs={true}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        minDate={new Date()}
                        rangeColors={["#FF6464"]}
                      />

                      <Stack direction={"row"} spacing={2}>
                        <h2>Total Price</h2>
                        <h2>${totalPrice()}</h2>
                      </Stack>
                      <Stack direction={"row"} alignContent={"center"}>
                        <Typography variant="body1" color="other.gray">
                          ({guests} Person x {totalDays()}Days x ${price})
                        </Typography>
                      </Stack>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!isLoggedIn}
                      >
                        {isLoggedIn ? "Book" : "Login to Book"}
                      </Button>
                    </FormControl>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </>
  );
};

export default Venue;
