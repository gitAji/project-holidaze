import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const VenueCard = ({
  id,
  name,
  media,
  description,
  price,
  maxGuests,
  rating,
  owner,
  avatar,
  isOwnVenue,
}) => {
  const [manageMenu, setManageMenu] = useState(false);
  const handleMenuOpen = (e) => {
    setManageMenu(e.currentTarget);
    //console.log("More");
  };
  const handleMenuClose = () => {
    setManageMenu(null);
  };

  //console.log(id);
  return (
    <>
      <Card
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
        key={id}
      >
        <Link sx={{ textDecoration: "none" }} to={`/venues/${id}`}>
          <CardMedia component="img" height="194" image={media} alt={name} />
          <Menu
            id="manage-menu"
            anchorEl={manageMenu}
            keepMounted
            open={Boolean(manageMenu)}
            onClose={handleMenuClose}
          >
            <MenuItem>Save</MenuItem>
          </Menu>
        </Link>
        <CardHeader
          avatar={
            <Avatar
              alt={owner}
              src={avatar}
              sx={{ objectFit: "cover", backgroundColor: "secondary.light" }}
            />
          }
          title={owner}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleMenuOpen} />
            </IconButton>
          }
        />
        <CardContent sx={{ padding: 2 }}>
          <h2>{name}</h2>

          <p>{description}</p>

          <Stack
            sx={{
              color: "black",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            Price: <div className="price"> $ {price}</div>
          </Stack>
          <Stack
            sx={{
              color: "black",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            Maximum Guests: <div className="guests">{maxGuests}</div>
          </Stack>
          <Stack
            sx={{
              color: "black",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            Rating:
            <ReactStars
              count={5}
              value={rating}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#7D7D7D"
              color={"lightgray"}
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default VenueCard;
