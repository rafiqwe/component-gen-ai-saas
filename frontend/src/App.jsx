import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayOut from "./LayOuts/MainLayOut";
import { ReactLenis } from "lenis/react";
import DashboardLayout from "./LayOuts/DeshboardLayOut/DeshboardLayOut";
import UserDashboard from "./components/deshboard/UserDeshboard";
import GenerateComponent from "./components/deshboard/GenerateComponent";
import MyComponents from "./components/deshboard/MyComponent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedWraper from "./pages/ProtectedWraper";
import ProfilePage from "./components/deshboard/ProfilePage";
import SettingsPage from "./components/deshboard/SettingPage";
import PricingPage from "./components/deshboard/Pricing";
import GenAILandingPage from "./components/deshboard/GenerateCode";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      children: [
        { path: "/", element: <Home /> }, // ✅ top-level absolute OK
        { path: "/login", element: <Login /> }, // ✅ top-level absolute OK
      ],
    },
    {
      path: "/genAI",
      element: (
        <ProtectedWraper>
          <DashboardLayout />
        </ProtectedWraper>
      ),
      children: [
        { path: "", element: <UserDashboard /> }, // default for /genAI
        { path: "component-generator", element: <GenerateComponent /> },
        { path: "my-component", element: <MyComponents /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "setting", element: <SettingsPage /> },
        { path: "pricing", element: <PricingPage /> },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/genai-created-demo",
      element: <GenAILandingPage />,
    },
  ]);

  return (
    <ReactLenis root>
      <RouterProvider router={router} />
    </ReactLenis>
  );
};

export default App;
