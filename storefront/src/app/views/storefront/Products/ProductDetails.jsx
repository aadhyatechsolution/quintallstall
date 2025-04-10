import React, { useEffect, useState } from "react";
import { apiConfig } from "../../../../config";
import {
  Box,
  Typography,
  Container,
  CardMedia,
  Grid,
  Button,
  Divider,
  Chip,
  Rating,
  Stack,
  IconButton,
  useTheme,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  LocalShipping,
  Verified,
} from "@mui/icons-material";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useProduct } from "../../../../hooks/useProducts";
import { useCartStore } from "../../../../store/cartStore";

const ProductDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  //const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event, newValue) => setValue(newValue);

  useEffect(() => {
    if (product) {
      const itemInCart = cart.find((item) => item.id === product.id);
      if (itemInCart) {
        setQuantity(itemInCart.quantity);
      }
    }
  }, [product, cart]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
    }
  };

  const increaseQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
  };

  if (isLoading || !product) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Breadcrumbs
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">{product?.name}</Typography>
      </Breadcrumbs> */}

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {/* Product Images */}
          <Grid>
            <Box
              sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                image={`${apiConfig.MEDIA_URL}${
                  product?.image || "placeholder.jpg"
                }`}
                alt={product?.name}
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                }}
              />
            </Box>
            <Stack direction="row" spacing={1} mt={2} justifyContent="center">
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  sx={{
                    width: 60,
                    height: 60,
                    border: "1px solid #f0f0f0",
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <img
                    src={`${apiConfig.MEDIA_URL}${
                      product?.image || "placeholder.jpg"
                    }`}
                    alt={`Thumbnail ${item}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Product Info */}
          <Grid>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {product?.name}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Rating
                value={product?.rating || 4.2}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                {product?.reviews || 0} Ratings & Reviews
              </Typography>
              <Chip
                label="Verified"
                size="small"
                icon={<Verified fontSize="small" />}
                sx={{ backgroundColor: "#e3f2fd" }}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h4" fontWeight={700} mb={2}>
              ₹{product?.price}
              {product?.originalPrice && (
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.disabled",
                    ml: 1,
                    fontSize: "1rem",
                  }}
                >
                  ₹{product.originalPrice}
                </Typography>
              )}
              {product?.discount && (
                <Typography
                  component="span"
                  color="success.main"
                  sx={{ ml: 1, fontSize: "1rem" }}
                >
                  {product.discount}% off
                </Typography>
              )}
            </Typography>

            <Typography color="success.main" fontWeight={500} mb={2}>
              Special price
            </Typography>
          </Grid>

          {/* Actions */}
          <Grid>
            <Paper elevation={0} sx={{ p: 2, border: "1px solid #f0f0f0" }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Delivery Options
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalShipping color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography>
                    Delivery to <strong>Delhi 110001</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usually delivered in 3-4 days
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Seller Information
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sold by: <strong>SuperComNet</strong> (4.5/5 rating)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                7 Days Replacement Policy
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Quantity Selector */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  backgroundColor: "background.paper",
                  boxShadow: 1,
                  width: "fit-content",
                }}
              >
                <Button
                  variant="text"
                  size="small"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  sx={{
                    minWidth: 32,
                    fontWeight: "bold",
                    color: "text.primary",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  −
                </Button>
                <Typography
                  sx={{ minWidth: 28, textAlign: "center", fontWeight: 500 }}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={increaseQuantity}
                  sx={{
                    minWidth: 32,
                    fontWeight: "bold",
                    color: "text.primary",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  +
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Button
                fullWidth
                variant="contained"
                color="error"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={() => addToCart(product, quantity, true)}
                sx={{ mb: 2, py: 1.5, fontWeight: 600 }}
              >
                ADD TO CART
              </Button>

              <Stack direction="row" spacing={1} mt={2}>
                <IconButton>
                  <FavoriteBorder />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Tabs */}
      <Paper elevation={0} sx={{ p: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, mb: 3 }}
        >
          <Tab label="Product Details" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        {value === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              About this item
            </Typography>
            <Typography variant="body1" paragraph>
              {product?.description ||
                "No description available for this product."}
            </Typography>
          </Box>
        )}
        {value === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Brand"
                  secondary={product?.brand || "Not specified"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Model"
                  secondary={product?.model || "Not specified"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Color"
                  secondary={product?.color || "Not specified"}
                />
              </ListItem>
            </List>
          </Box>
        )}
        {value === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Customer Reviews
            </Typography>
            <Typography color="text.secondary">
              No reviews yet. Be the first to review!
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ProductDetails;
