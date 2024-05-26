import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import FooterComponent from "./components/Footer";
import DashBoard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import OnlyServiceProviderPrivateRoute from "./components/OnlyServiceProviderPrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<OnlyServiceProviderPrivateRoute />}>
          <Route element={<OnlyAdminPrivateRoute />}>
            {/* <Route path="/dashboard" element={<DashBoard />} /> */}
          </Route>
        </Route>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
