import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import AIResponse from "./routes/AIResponse";
import ErrorPage from "./pages/ErrorPage";
import Home from "./routes/Home";
import Register, { action as registerAction } from "./routes/Resgister";
import Login, { action as loginAction } from "./routes/Login";
import LogOutButton from "./components/LogOutButton";

import "./App.css";
import "./normal.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ai",
        element: <AIResponse />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/logout",
        element: <LogOutButton />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
