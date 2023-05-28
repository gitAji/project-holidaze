import React, { useEffect, useState } from "react";
import Meta from "../../utils/meta";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { UserBox, UserBoxTitle } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationSchema } from "../../utils/schema";
import { useNavigate } from "react-router-dom";
import { Url, Register } from "../../api/constant";
import postData from "../../api/postData";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const url = `${Url}${Register}`;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleManagerChange = (e) => {
    setVenueManager(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data;
    //console.log(userData);
    //console.log(url);
    setLoading(true);
    try {
      const response = await postData(
        url,
        userData,
        setLoading,
        setError,
        setSubmitSuccess,
        setLoading
      );
      setData(response);

      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data) {
      setSubmitSuccess(true);

      navigate(0);
    }
  }, [data, navigate]);

  return (
    <>
      <Meta title="Sign Up" description="Sign up to your account"></Meta>
      <Container>
        <UserBox>
          <UserBoxTitle>Sign Up</UserBoxTitle>
          {loading && <Alert severity="info">Loading...</Alert>}
          {submitSuccess && (
            <Alert severity="success">You have successfully signed up!</Alert>
          )}
          {error && <Alert severity="error">User exists already!</Alert>}
          <FormControl fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              {...register("name")}
              value={name}
              onChange={handleNameChange}
            />
            <FormHelperText className="Error" id="email-helper-text">
              {errors.name?.message}{" "}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              {...register("email")}
              value={email}
              onChange={handleEmailChange}
            />
            <FormHelperText className="Error" id="email-helper-text">
              {errors.email?.message}{" "}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              {...register("password")}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              type="password"
            />
            <FormHelperText className="Error" id="password-helper-text">
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <Input
              {...register("confirmPassword")}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
            />
            <FormHelperText className="Error" id="password-helper-text">
              {errors.confirmPassword?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-label" border="none">
              Venue Manager
            </InputLabel>
            <Select
              labelId="manager-label"
              id="manager"
              label="manager"
              {...register("venueManager")}
              value={venueManager}
              onChange={handleManagerChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText className="Error" id="password-helper-text">
              {errors.venueManager?.message}
            </FormHelperText>
          </FormControl>

          <Button
            sx={{ m: 2 }}
            variant="contained"
            color="primary"
            fullWidth
            margin="dense"
            marginTop="10px"
            onClick={handleSubmit(onSubmit)}
          >
            Sign up
          </Button>
        </UserBox>
      </Container>
    </>
  );
};

export default SignUpForm;
