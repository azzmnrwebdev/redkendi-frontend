import App from "./App";
import User from "./layouts/User";
import Auth from "./layouts/Auth";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/Login";
// import NotFound from "./pages/NotFound";
// import Order from "./pages/order/Order";
import Register from "./pages/auth/Register";
import Product from "./pages/product/Product";
import "bootstrap/dist/css/bootstrap.min.css";
// import OrderItem from "./pages/order/OrderItem";
import ShowProduct from "./pages/product/ShowProduct";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    children: [
      { path: "/", element: <App /> },
      { path: "/product", element: <Product /> },
      { path: "/product/:id", element: <ShowProduct /> },
      { path: "/cart", element: <Cart /> },
      // { path: "/order", element: <Order /> },
      // { path: "/order/:id", element: <OrderItem /> },
    ],
  },
  {
    path: "/register",
    element: (
      <Auth>
        <Register />
      </Auth>
    ),
  },
  {
    path: "/login",
    element: (
      <Auth>
        <Login />
      </Auth>
    ),
  },
  // { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
