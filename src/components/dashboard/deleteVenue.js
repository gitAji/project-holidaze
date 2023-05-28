import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Url, VenuesUrl } from "../../api/constant";
import deleteData from "../../api/deleteData";
import { Button, Modal, Typography } from "@mui/material";
import { DeleteBox } from "./styles";
import { venueDeleted } from "../../state/venuesManage/venuesManageSlice";
import { useDispatch, useSelector } from "react-redux";

const DeleteVenue = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const deleteVenueUrl = `${Url}${VenuesUrl}${id}`;
  const handleDelete = () => {
    loading && console.log("loading");
    data && console.log("data");
    error && console.log("error");
    successMessage && console.log("successMessage");

    console.log("delete");
    deleteVenue();
    handleClose();
  };
  const deleteVenue = async () => {
    setLoading(true);
    try {
      const token = accessToken;
      const response = await deleteData(
        deleteVenueUrl,
        token,

        setData,
        setError
      );
      console.warn(response);
      setData(response);
      setLoading(false);
      setSuccessMessage("Venue deleted successfully");
      dispatch(venueDeleted(id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <DeleteOutlineIcon
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "secondary.light",
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
        <DeleteBox>
          <Typography id="modal-modal-title">
            Are you sure you want to delete this venue?
          </Typography>
          <Button onClick={handleDelete}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DeleteBox>
      </Modal>
    </>
  );
};

export default DeleteVenue;
