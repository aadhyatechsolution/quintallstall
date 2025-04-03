import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ShopByCategories from "../../ShopByCategories/ShopByCategories";
import MarketGrid from "../../OurAPMC/MarketCard";
import ProductsSlider from "../../Products/ProductsSlider";
import Features from "../../Features/Features";
import FeatureBanner from "../../Features/FeatureBanner";

function Body() {
  return (
    <>
      <ShopByCategories />
      <MarketGrid />
      <ProductsSlider />
      <Features />
      {/* <FeatureBanner /> */}
    </>
  );
}

export default Body;
