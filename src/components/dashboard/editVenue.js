import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { ModalBox } from "./styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../../utils/schema";
import CloseIcon from "@mui/icons-material/Close";
import { Url, VenuesUrl } from "../../api/constant";
import EditIcon from "@mui/icons-material/Edit";
import putData from "../../api/putData";
import { useDispatch, useSelector } from "react-redux";
import { venueUpdated } from "../../state/venuesManage/venuesManageSlice";

const EditVenue = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editedVenue, setEditedVenue] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const venuesManaged = useSelector((state) => state.venuesManage.venuesManage);
  //console.log(venuesManaged); this should get affected when edited data is posted & then this should re-render managed venues
  useEffect(() => {
    const venue = venuesManaged.find((venue) => venue.id === id);
    console.log(venue);
    setName(venue.name);
    setDescription(venue.description);
    setImages(venue.media);
    setPrice(venue.price);
    setMaxGuest(venue.maxGuests);
  }, [id, venuesManaged]);
  //console.log(name, description, images, price, maxGuest);
  useEffect(() => {
    if (data) {
      setEditedVenue(data);
      handleClose();
    }
  }, [data, dispatch]);
  console.log(editedVenue);

  const editedData = {
    name,
    description,
    media: images,
    price,
    maxGuests: maxGuest,
  };
  console.log(editedData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });
  const postVenueUrl = `${Url}${VenuesUrl}${id}`;

  const onSubmit = async (editedData) => {
    console.log(editedData);
    const requiredData = { ...editedData, media: editedData.media?.split(",") };
    console.log(requiredData);
    try {
      const token = accessToken;
      const response = await putData(
        postVenueUrl,
        requiredData,
        token,
        setLoading,
        setData,
        setError
      );
      console.log(response);
      setData(response);
      setSuccessMessage("Venue updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(venueUpdated(data));
    }
  }, [data, dispatch]);
  return (
    <>
      <EditIcon
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "primary.light",
          },
        }}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Stack
            spacing={3}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h2>EditVenue</h2>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Stack>
          <Stack
            spacing={3}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <FormControl>
              <FormLabel>Venue Name</FormLabel>
              <Input
                {...register("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel> Description</FormLabel>
              <Input
                {...register("description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText>{errors.description?.message}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Image Url</FormLabel>
              <Input
                {...register("media")}
                value={images[0]}
                onChange={(e) => setImages([e.target.value])}
              />
              <FormHelperText>{errors.media?.message}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                {...register("price")}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FormHelperText>{errors.price?.message}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Max Guest</FormLabel>
              <Input
                {...register("maxGuests")}
                value={maxGuest}
                onChange={(e) => setMaxGuest(e.target.value)}
              />
              <FormHelperText>{errors.maxGuests?.message}</FormHelperText>
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </FormControl>
          </Stack>
          {loading && <Alert>Loading...</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          {data && <Alert severity="success">{successMessage}</Alert>}
        </ModalBox>
      </Modal>
    </>
  );
};

export default EditVenue;
