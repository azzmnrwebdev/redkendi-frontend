import App from "./App";
import User from "./layouts/User";
import Auth from "./layouts/Auth";
import Forbidden from "./Forbidden";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/Login";
// import NotFound from "./pages/NotFound";
import Order from "./pages/order/Order";
import Register from "./pages/auth/Register";
import Product from "./pages/product/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderItem from "./pages/order/OrderItem";
import ShowProduct from "./pages/product/ShowProduct";
import ProtectedRoute from "./middleware/ProtectedRoute";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    children: [
      { path: "/", element: <App /> },
      { path: "/product", element: <Product /> },
      { path: "/product/:id", element: <ShowProduct /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderItem />
          </ProtectedRoute>
        ),
      },
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
  { path: "/forbidden", element: <Forbidden /> },
  // { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer theme="colored" />
  </StrictMode>
);
