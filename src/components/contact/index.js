import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactSchema } from "../../utils/schema";
import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Stack,
} from "@mui/material";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ContactSchema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Container sx={{ minHeight: "90vh" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card sx={{ p: 5, m: 5 }}>
              <Stack sx={{ m: 5, spacing: 6 }}>
                <h2>Get in touch</h2>
                <Divider />
                <p>
                  We value your input and look forward to connecting with you.
                  Feel free to contact us anytime.
                </p>
                <p>Tel:5000899</p>
                <p>Email:info@holidaze.no</p>
                <p>Address:Main Street,Bergen.</p>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack sx={{ m: 5 }}>
              <h2>Contact us</h2>
              <Divider sx={{ mb: 2 }} />
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="full-name">Full name</FormLabel>
                <Input {...register("fullName")} />
                <FormHelperText>{errors.fullName?.message} </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...register("email")} />
                <FormHelperText>{errors.email?.message} </FormHelperText>
                <FormLabel htmlFor="subject">Subject</FormLabel>
              </FormControl>
              <FormControl>
                <Input {...register("subject")} />
                <FormHelperText>{errors.subject?.message} </FormHelperText>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Input {...register("message")} />
                <FormHelperText>{errors.message?.message}</FormHelperText>
              </FormControl>
              <FormControl>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  Submit
                </Button>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactForm;
