import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProfilesUrl, Url, VenuesManageUrl } from "../../api/constant";
import { Card, CardContent, CardMedia, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import fetchData from "../../api/fetchData";

const BookingsOnVenues = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { name, accessToken, isLoggedIn } = user;
  const token = accessToken;
  const url = `${Url}${ProfilesUrl}${name}${VenuesManageUrl}?_bookings=true`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData(url, token, setLoading, setData, setError);
    } else {
      navigate("/login");
    }
  }, [navigate, isLoggedIn, token, url]);

  useEffect(() => {
    if (data) {
      setVenues(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  //console.log(venues);

  return (
    <>
      <Grid container spacing={5}>
        {loading && <p>Loading...</p>}
        {venues.length === 0 && (
          <Grid item xs={12} sm={6} md={4}>
            <p>No bookings found!</p>
          </Grid>
        )}

        {venues.map((venue) => (
          <Grid item xs={12} md={4} key={venue.id}>
            <Card
              sx={{
                minHeight: "100%",
                flex: 1,
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image={venue.media}
                alt={venue.name}
              />

              <CardContent>
                <div>
                  <h2>{venue.name}</h2>

                  <div className="booking-count">
                    Has {venue.bookings.length}{" "}
                    {venue.bookings.length > 1 ? "bookings" : "booking"}
                  </div>
                </div>
              </CardContent>

              {venue.bookings.map((booking) => (
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    gap={2}
                    key={booking.id}
                  >
                    <p>Guests: {booking.guests}</p>
                    <p>
                      From: {new Date(booking.dateFrom).toLocaleDateString()}
                    </p>
                    <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  </Stack>
                </CardContent>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default BookingsOnVenues;
