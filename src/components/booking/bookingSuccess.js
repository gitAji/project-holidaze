import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BackButton from "../../utils/backButton";

const BookingSuccess = () => {
  const { booking } = useSelector((state) => state.booking);
  console.log(booking);
  const { id, dateFrom, dateTo, guests, created, updated } = booking;
  const from = new Date(dateFrom).toLocaleDateString();
  const to = new Date(dateTo).toLocaleDateString();
  const createdDate = new Date(created).toLocaleDateString();
  const updatedDate = new Date(updated).toLocaleDateString();

  return (
    <>
      {!booking && <h1>Booking not found</h1>}
      <Container sx={{ minHeight: "100vh" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton />
          <h1>Booking Confirmation</h1>
        </Stack>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{ p: 1 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <h1>Booking Success</h1>

                <CheckCircleOutlineIcon sx={{ color: "primary.main" }} />
              </Stack>
              <h4>Booking Details</h4>
              <Divider sx={{ mb: 1 }} />

              <Paper elevation={0} sx={{ p: 2 }} key={id}>
                <p>Booking Id: {id}</p>
                <p>Start Date: {from}</p>
                <p>End Date: {to}</p>
                <p>Guests: {guests}</p>
                <p>Created: {createdDate}</p>
                <p>Updated: {updatedDate}</p>
              </Paper>

              <Link to={"/dashboard"}>
                <Button>Go To Dashboard</Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookingSuccess;
