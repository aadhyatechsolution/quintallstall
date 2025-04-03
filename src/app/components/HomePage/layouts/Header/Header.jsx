import React from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar/Navbar";
import OfferCarousel from "app/components/HomePage/Carousel/OfferCarousel";

function Header() {
  return (
    <>
      <Topbar />
      <Navbar />
      <OfferCarousel />
    </>
  );
}

export default Header;
