import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayOut from "./LayOuts/MainLayOut";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      children:[
        {
          path:'/',
          element:<Home/>
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
