import React from "react";
import { Url, BookingsUrl, ProfilesUrl } from "../../api/constant";
import { useState, useEffect } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import fetchData from "../../api/fetchData";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const user = useSelector((state) => state.user);
  const { name, isLoggedIn } = user;
  const userName = name + "/";
  //console.log(userName);

  useEffect(() => {
    if (isLoggedIn) {
      const url = `${Url}${ProfilesUrl}${userName}${BookingsUrl}`;
      fetchData(url, token, setLoading, setData, setError);
    } else {
      navigate("/");
    }
  }, [navigate, isLoggedIn, token, userName]);

  useEffect(() => {
    if (data) {
      setBookings(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  return (
    <>
      <Grid container spacing={5}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {bookings.length === 0 ? (
              <Grid item xs={12} sm={6} md={4}>
                <p>No venues found!</p>
              </Grid>
            ) : (
              bookings.map((booking) => (
                <Grid item xs={12} md={6} lg={4} key={booking.id}>
                  <Card
                    sx={{
                      minHeight: "100%",
                      flex: 1,
                    }}
                  >
                    <CardContent
                      sx={{
                        minHeight: "100%",
                        flex: 1,
                        spacing: 5,
                      }}
                    >
                      <h3>Booking ID:</h3>
                      <p>{booking.id}</p>
                      <h3>From:</h3>
                      <p>{new Date(booking.dateFrom).toLocaleDateString()}</p>
                      <h3>To:</h3>
                      <p>{new Date(booking.dateTo).toLocaleDateString()}</p>
                      <h3>Guests:</h3>
                      <p>{booking.guests}</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </>
        )}
      </Grid>
    </>
  );
};
export default ManageBookings;
