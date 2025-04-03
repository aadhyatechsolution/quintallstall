import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Payment as PaymentIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";

const Features = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        backgroundColor: "#f9f9f9",
      }}
    >
      <Grid container spacing={2} justifyContent="flex-start">
        {/* 24x7 Service */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              borderRadius: "8px",
              backgroundColor: "#fff",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <AccessTimeIcon
              sx={{
                fontSize: 32,
                color: "#a81724",
                mb: 1,
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
                color: "#333",
              }}
            >
              24 x 7 Service
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Online Service For 24 x 7
            </Typography>
          </Paper>
        </Grid>

        {/* Online Pay */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              borderRadius: "8px",
              backgroundColor: "#fff",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <PaymentIcon
              sx={{
                fontSize: 32,
                color: "#a81724",
                mb: 1,
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
                color: "#333",
              }}
            >
              Online Pay
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Online Payment Available
            </Typography>
          </Paper>
        </Grid>

        {/* Festival Offer */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              borderRadius: "8px",
              backgroundColor: "#fff",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <LocalOfferIcon
              sx={{
                fontSize: 32,
                color: "#a81724",
                mb: 1,
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                mb: 0.5,
                color: "#333",
              }}
            >
              Festival Offer
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Super Sale Upto 50% off
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
