import React from "react";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import CarList from "../components/CarList/CarList";
import AppStoreBanner from "../components/AppStoreBanner/AppStoreBanner";
import Contact from "../components/Contact/Contact";
import Testimonial from "../components/Testimonial/Testimonial";

export default function Home() {
  return (
    <div>
      <Hero theme='dark' />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <AppStoreBanner />
      <Contact />
    </div>
  );
}
