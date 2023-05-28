import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@mui/material";
import "./styles.js";
import { ModalBox } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateAvatarSchema } from "../../utils/schema.js";
import { MediaUrl, ProfilesUrl, Url } from "../../api/constant.js";
import { useEffect } from "react";
import putData from "../../api/putData.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../state/auth/userSlice.js";

const AvatarUpdate = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const user = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAvatarSchema),
  });

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(updateAvatar(data.avatar));
        setSuccessMessage("");
        handleClose();
      }, 2000);
    }
  }, [successMessage, dispatch, data]);

  const avatarUrl = `${Url}${ProfilesUrl}${user}/${MediaUrl}`;
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token
      await putData(avatarUrl, data, token, setLoading, setData, setError); // Pass the setLoading, setData, and setError functions to the putData function
      setData(data);
      setSuccessMessage("Avatar updated successfully");
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Edit Avatar
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <ModalBox>
          <Stack
            spacing={3}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h2>Update Avatar</h2>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Stack>
          <Stack
            spacing={3}
            direction={"column"}
            padding={2}
            justifyContent={"space-between"}
          >
            <FormControl>
              <Input {...register("avatar")} placeholder="Avatar" />
            </FormControl>
            <FormControl>
              <FormHelperText error={true}>
                {errors.avatar?.message}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Update
              </Button>
            </FormControl>

            {loading && <Alert severity="error">Loading...</Alert>}
            {error && <Alert severity="info">Error: {error.message}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
          </Stack>
        </ModalBox>
      </Modal>
    </div>
  );
};
export default AvatarUpdate;
