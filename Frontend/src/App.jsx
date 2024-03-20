import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import AIResponse from "./routes/AIResponse";
import ErrorPage from "./pages/ErrorPage";
import Home from "./routes/Home";
import Register, { action as registerAction } from "./routes/Resgister";
import Login, { action as loginAction } from "./routes/Login";
import UserPage, { loader as userLoader } from "./routes/UserPage";
import ChatLog, { loader as dataLoader } from "./components/ChatLog";

import "./App.css";
import "./normal.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home class="home" />,
      },
      {
        path: "/ai",
        element: <AIResponse className="ai" />,
      },
      {
        path: "/register",
        element: <Register className="register" />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login className="login" />,
        action: loginAction,
      },
      {
        path: "/user",
        element: <UserPage className="user" />,
        loader: userLoader,
      },
      {
        path: "/chatlog",
        element: <ChatLog className="chatlog" />,
        loader: dataLoader,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
