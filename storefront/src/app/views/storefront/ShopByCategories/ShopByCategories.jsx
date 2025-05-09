import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../../hooks/useCategories";
import { apiConfig } from "../../../../config";

// Category Button Component
const CategoryButton = React.memo(({ id, name, image, onClick }) => (
  <Box
    sx={{
      width: {
        xs: "calc(50% - 8px)",
        sm: "calc(50% - 12px)",
        md: "calc(33.33% - 16px)",
        lg: "calc(18% - 16px)",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      borderRadius: 2,
      justifyContent: "center",
      boxShadow: 1,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 4,
        "& .category-image": {
          transform: "scale(1.05)",
        },
      },
    }}
  >
    <Button
      onClick={() => onClick?.(id)}
      aria-label={`Shop ${name}`}
      sx={{
        width: "100%",
        height: "100%",
        p: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        className="category-image"
        sx={{
          width: "100%",
          height: { xs: 100, sm: 120, md: 130 },
          objectFit: "cover",
          transition: "transform 0.3s ease",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Box
        sx={{
          p: 2,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          mt={0.5}
          display={{ xs: "none", sm: "block" }}
        >
          Shop Now
        </Typography>
      </Box>
    </Button>
  </Box>
));

// Main Component
const ShopByCategories = ({ title = "Shop By Categories" }) => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, isError } = useCategories();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth={false} sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth={false} sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">Failed to load categories.</Typography>
      </Container>
    );
  }

  if (!categories?.length) return null;

  return (
    <Container
      maxWidth={false}
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 6,
          color: "text.primary",
          fontSize: { xs: "1.8rem", sm: "2.2rem" },
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: 80,
            height: 4,
            backgroundColor: "primary.main",
            margin: "16px auto 0",
            borderRadius: 2,
          },
        }}
      >
        {title}
      </Typography>

      <Box sx={{ maxWidth: "1600px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            mb: 6,
          }}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              id={category.id}
              name={category.name}
              image={`${apiConfig.MEDIA_URL}${category.image}`}
              onClick={handleCategoryClick}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ShopByCategories;
