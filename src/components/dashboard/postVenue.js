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
import postData from "../../api/postData";
import { useSelector } from "react-redux";

const PostVenue = () => {
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

  const user = useSelector((state) => state.user);
  const { accessToken } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const postVenueUrl = `${Url}${VenuesUrl}`;

  const onSubmit = async (data) => {
    //console.log(data);
    const requiredData = { ...data, media: data.media?.split(",") };
    //console.log(requiredData);
    try {
      const token = accessToken;
      const response = await postData(
        postVenueUrl,
        requiredData,
        token,
        setLoading,
        setData,
        setError
      );
      //console.log(response);
      setData(response);
      setLoading(false);

      setSuccessMessage("Venue posted successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setName("");
      setDescription("");
      setImages([""]);
      setPrice("");
      setMaxGuest("");
    }
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, [successMessage]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Post Venue
      </Button>
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
            <h2>Post Venue</h2>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Stack>
          <Stack
            spacing={3}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <FormControl>
              <FormLabel>Enter Venue Name</FormLabel>
              <Input
                {...register("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Enter Venue Description</FormLabel>
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
                Submit
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

export default PostVenue;
