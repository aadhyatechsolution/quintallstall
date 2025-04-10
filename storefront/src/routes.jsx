import { lazy } from "react";
import Layout from "./app/views/storefront/layouts/Layout";
import Home from "./app/views/storefront/Home/Home";
import Shop from "./app/views/storefront/Shop/Shop";
import ProductList from "./app/views/storefront/Products/ProductList";
import Blog from "./app/views/storefront/Blog/Blog";
import ProductDetails from "./app/views/storefront/Products/ProductDetails";
import Cart from "./app/views/storefront/Cart/Cart";
import Checkout from "./app/views/storefront/Checkout/Checkout";
import OrderSuccess from "./app/views/storefront/OrderPage/OrderSuccess";

// Lazy load other components
const About = lazy(() => import("./app/views/storefront/About/Index"));
const Contact = lazy(() => import("./app/views/storefront/Contact/Contact"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "about",
        element: <About />,
      },
      { path: "contact", element: <Contact /> },
      { path: "shop", element: <Shop /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "cart", element: <Cart /> },
      { path: "blog", element: <Blog /> },
    ],
  },
];

export default routes;
