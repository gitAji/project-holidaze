import React from "react";
import NavBar from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import VenuesPage from "./pages/venues";
import Contact from "./pages/contact";
import "./main.css";
import ErrorPage from "./pages/404";
import VenuePage from "./components/venue";
import DashboardPage from "./pages/dashboard";
import BookingSuccessPage from "./pages/bookingSuccess";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const bookingLoaded = useSelector((state) => state.booking);
  const navigate = useNavigate();
  if (!bookingLoaded) {
    navigate("/");
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venues/:id" element={<VenuePage />} />

        <Route path="/booking-success" element={<BookingSuccessPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />

      <ToastContainer />
    </>
  );
};

export default App;
