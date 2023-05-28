import React from "react";
import { BookButton, CTABox, PostButton, Wrapper } from "./styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Container, useMediaQuery } from "@mui/material";
import { theme } from "../../../utils/theme";

const CTA = () => {
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = user;
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // useMediaQuery hook from mui to check screen size

  const handlePost = () => {
    isLoggedIn
      ? navigate("/dashboard")
      : toast.error("Please Login to post venues");
    //console.log("post");
  };
  const handleBook = () => {
    navigate("/venues");
    //console.log("book");
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexGrow: 1,

          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          backgroundColor: "other.white",
          marginBottom: "2rem",
          maxWidth: "lg",
        }}
      >
        <Wrapper>
          <CTABox>
            <h1>Book your Next holiday with a top rated platform! </h1>
            <p>
              Reserve your stay with us and experience luxury like never before
              in your life!
            </p>
            <BookButton onClick={handleBook}>Book Venue</BookButton>
          </CTABox>
          <CTABox>
            <h1>List your venues on the top rated platform.</h1>
            <p>
              Maximize your venue's potential - post it on our site and reach a
              wider audience!
            </p>

            <PostButton onClick={handlePost}>Post Venue</PostButton>
          </CTABox>
        </Wrapper>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexGrow: 1,

          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          backgroundColor: "other.gray",
          marginBottom: "2rem",
        }}
      >
        <Card
          sx={{
            p: 2,
            m: 2,
            backgroundColor: "other.white",
            border: "1px solid #C0BFBF",
            flex: 1,
          }}
        >
          <h2>Why Choose Us?</h2>

          <p style={{ p: 5 }}>
            Holidaze is a booking agency for hotels and other accomodations. We
            offer a wide range of accomodations in Bergen, Norway.
          </p>
        </Card>
        <Card
          sx={{
            p: 2,
            m: 2,
            backgroundColor: "other.white",
            border: "1px solid #C0BFBF",
            flex: 1,
          }}
        >
          <h2>Our Mission</h2>

          <p style={{ p: 5 }}>
            Our mission is to provide the best possible service to our customers
            and to make sure that they have the best possible experience when
            booking their next holiday.
          </p>
        </Card>
        <Card
          sx={{
            p: 2,
            m: 2,
            backgroundColor: "other.white",
            border: "1px solid #C0BFBF",
            flex: 1,
          }}
        >
          <h2>Our Vision</h2>

          <p style={{ p: 5 }}>
            Our vision is to be the leading booking agency in Bergen, Norway. We
            want to be the first choice for people who are looking for a place
            to stay in Bergen.
          </p>
        </Card>
      </Container>
    </>
  );
};

export default CTA;
