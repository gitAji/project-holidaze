import React, { useState, useEffect } from "react";
import Meta from "../../utils/meta";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { UserBox, UserBoxTitle } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../utils/schema";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../state/auth/userSlice";
import { useNavigate } from "react-router-dom";
import postData from "../../api/postData";
import { Url, Login } from "../../api/constant";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    if (loginSuccessful && data) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", data.name);
      localStorage.setItem("venueManager", data.venueManager);
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
      dispatch(loginSuccess(data));
    }
  }, [loginSuccessful, data, dispatch, navigate]);

  const loginUrl = `${Url}${Login}`;

  const onSubmit = async (userData) => {
    try {
      const response = await postData(
        loginUrl,
        userData,
        setLoading,
        setData,
        setError
      );
      setData(response);
      setLoginSuccessful(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      <Meta title="Login" description="Login into your account"></Meta>
      <Container>
        <UserBox>
          <UserBoxTitle>Login</UserBoxTitle>
          {loading && <Alert severity="info">Logging in...</Alert>}
          {loginSuccessful && (
            <Alert severity="success">You have successfully Logged in!</Alert>
          )}
          {error && <Alert severity="error">Login failed!</Alert>}
          <FormControl fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              {...register("email")}
              value={email}
              onChange={handleEmailChange}
            />
            <FormHelperText className="Error" id="email-helper-text">
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              {...register("password")}
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <FormHelperText className="Error" id="password-helper-text">
              {errors.password?.message}
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
            Login
          </Button>
        </UserBox>
      </Container>
    </>
  );
};

export default LoginForm;
