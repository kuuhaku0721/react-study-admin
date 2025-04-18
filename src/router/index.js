import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import UserList from "../pages/UserList";
import ModifyUser from "../pages/ModifyUser";
import QuestionList from "../pages/QuestionList";
import ModifyQuestion from "../pages/ModifyQuestion";
import MessageList from "../pages/MessageList";
import ModifyMessage from "../pages/ModifyMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "UserList",
        element: <UserList />,
      },
      {
        path: "ModifyUser",
        element: <ModifyUser />,
      },
      {
        path: "QuestionList",
        element: <QuestionList />,
      },
      {
        path: "ModifyQuestion",
        element: <ModifyQuestion />,
      },
      {
        path: "MessageList",
        element: <MessageList />,
      },
      {
        path: "ModifyMessage",
        element: <ModifyMessage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
