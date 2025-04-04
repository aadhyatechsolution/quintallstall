import React from "react";
import { Box, Typography, Button } from "@mui/material";

const PromoBanner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "200px", sm: "300px", md: "400px" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mb: 4,
      }}
    >
      {/* Background Image - Replace with your image path */}
      <Box
        component="img"
        src="/assets/images/promo-banner.jpg"
        alt="Promotional Banner"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Dark overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          p: 3,
          maxWidth: "800px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem",
            },
            lineHeight: 1.2,
            textTransform: "uppercase",
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          FREE GIFT ANY ORDER
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "3rem",
              sm: "4rem",
              md: "5rem",
            },
            lineHeight: 1,
            color: "#ffeb3b", // Yellow color for emphasis
            textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
            mb: 3,
          }}
        >
          70% OFF
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            backgroundColor: "#ff5722", // Orange color
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#e64a19",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          SHOP NOW
        </Button>
      </Box>
    </Box>
  );
};

export default PromoBanner;
