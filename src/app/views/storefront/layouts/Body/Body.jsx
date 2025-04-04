import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ShopByCategories from "../../ShopByCategories/ShopByCategories";
import APMCMarketGrid from "../../APMC/APMCMarketCard";
import ProductsSlider from "../../Products/ProductsSlider";
import Features from "../../Features/Features";
import FeatureBanner from "../../Features/FeatureBanner";
import PromoBanner from "../../Banner/PromoBanner";

function Body() {
  return (
    <>
      <ShopByCategories />
      <APMCMarketGrid />
      <ProductsSlider />
      <PromoBanner />
      <Features />
      {/* <FeatureBanner /> */}
    </>
  );
}

export default Body;
