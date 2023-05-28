import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";

import EditVenue from "../dashboard/editVenue";
import DeleteVenue from "../dashboard/deleteVenue";
const OwnVenueCard = ({ id, name, media, description, price, maxGuests }) => {
  return (
    <>
      <Card
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
        }}
        key={id}
      >
        <Link sx={{ textDecoration: "none" }} to={`/venues/${id}`}>
          <CardMedia component="img" height="194" image={media} alt={name} />
        </Link>
        <CardContent sx={{ padding: 2 }}>
          <h4>{name}</h4>
          <p>{description.slice(0, 50)}</p>
          <p>Price: ${price}</p>
          <p>Max guests: {maxGuests}</p>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: "flex-end",

            gap: 2,
          }}
        >
          <DeleteVenue id={id} />
          <EditVenue id={id} />
        </CardActions>
      </Card>
    </>
  );
};

export default OwnVenueCard;
