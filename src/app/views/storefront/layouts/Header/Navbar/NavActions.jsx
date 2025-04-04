import {
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PersonOutline,
  FavoriteBorder,
  ShoppingCart,
  Phone,
} from "@mui/icons-material";

const NavActions = ({ isLargeScreen }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: { md: 1, lg: 2, xl: 3 },
      ml: "auto",
      pl: { md: 2, lg: 4 },
    }}
  >
    {isLargeScreen && (
      <Tooltip title="Call us">
        <Stack direction="row" alignItems="center" sx={{ cursor: "pointer" }}>
          <Phone sx={{ fontSize: "1.3rem", mr: 1 }} />
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            +9 888 104 2340
          </Typography>
        </Stack>
      </Tooltip>
    )}

    <Tooltip title="Wishlist">
      <IconButton sx={{ color: "black", "&:hover": { color: "#2b4a04" } }}>
        <Badge badgeContent={4} color="primary">
          <FavoriteBorder fontSize={isLargeScreen ? "medium" : "small"} />
        </Badge>
      </IconButton>
    </Tooltip>

    <Tooltip title="Cart">
      <IconButton sx={{ color: "black", "&:hover": { color: "#2b4a04" } }}>
        <Badge badgeContent={2} color="primary">
          <ShoppingCart fontSize={isLargeScreen ? "medium" : "small"} />
        </Badge>
      </IconButton>
    </Tooltip>

    <Button
      startIcon={
        <PersonOutline fontSize={isLargeScreen ? "medium" : "small"} />
      }
      sx={{
        color: "black",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: { md: "0.9rem", lg: "1rem" },
        "&:hover": { color: "#2b4a04" },
      }}
    >
      My Account
    </Button>
  </Box>
);

export default NavActions;
