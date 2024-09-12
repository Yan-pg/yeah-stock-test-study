import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/home/App.tsx";
import "./style/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CreateProduct } from "./pages/createProduct/CreateProduct.tsx";
import { EditProduct } from "./pages/editProduct/EditProduct.tsx";
import { PrivateLayout } from "./pages/_layouts/priviteLayout.tsx";
import { PublicLayout } from "./pages/_layouts/publicLayout.tsx";
import { SignIn } from "./pages/signIn/index.tsx";
import { SignUp } from "./pages/signUp/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
