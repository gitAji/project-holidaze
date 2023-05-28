import React, { useEffect } from "react";
import { useState } from "react";
import { ProfilesUrl, Url, VenuesManageUrl } from "../../api/constant";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OwnVenueCard from "../cards/ownVenueCard";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../../api/fetchData";
import { venuesManageLoaded } from "../../state/venuesManage/venuesManageSlice";

const ManageVenues = () => {
  const token = localStorage.getItem("token");
  const flag = "?_owner=true&?sort=created";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.user);
  const { name, isLoggedIn } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      const url = `${Url}${ProfilesUrl}${name}${VenuesManageUrl}${flag}`;
      fetchData(url, token, setLoading, setData, setError);
    } else {
      navigate("/login");
    }
  }, [navigate, isLoggedIn, token, name]);

  useEffect(() => {
    if (data) {
      dispatch(venuesManageLoaded(data)); // fetch result is stored in state to be used in the component
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, dispatch]);

  const venues = useSelector((state) => state.venuesManage.venuesManage);

  //console.log(venues);

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {venues.length === 0 ? (
              <Grid item xs={12} sm={6} md={4}>
                <p>No venues found!</p>
              </Grid>
            ) : (
              venues.map((venue) => (
                <Grid item xs={12} sm={6} md={3} key={venue?.id}>
                  {venue && (
                    <OwnVenueCard
                      id={venue.id}
                      name={venue.name}
                      media={venue.media[0]}
                      description={venue.description}
                      price={venue.price}
                      maxGuests={venue.maxGuests}
                    />
                  )}
                </Grid>
              ))
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default ManageVenues;
