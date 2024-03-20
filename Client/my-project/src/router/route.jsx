import { createBrowserRouter, redirect } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { SideBar } from "../components/sidebar";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      if (getToken()) {
        if (getRole() === "buyer") return redirect("/");
        if (getRole() === "seller") return redirect("/seller");
      }
      return null;
    },
    children: [
    //   {
    //     path: "register",
    //     element: <Register />,
    //   },
      {
        path: "login",
        element: <Login />,
      },
    ],
  }, {
    // loader: () => {
    //   const access_token = localStorage.getItem('access_token');
    //   if (!access_token) {
    //     return redirect('/login');
    //   }
    //   return null;
    // },
    path: "/admin",
    element: <Navbar />,
    children: [
      {
        path: "dashboard",
        element: <SideBar content="dashboard" />,
      },
      {
        path: "user",
        element: <SideBar content="user" />,
      },
      {
        path: "product",
        element: <SideBar content="product" />,
      },
    ],
    //     children: [
    //       {
    //         path: 'posts',
    //         // element: <ListPost />,
    //       },
    //       {
    //         path: 'categories',
    //         // element: <ListCategory />,
    //       },
    //       {
    //         path: 'add-staff',
    //         // element: <AddStaff />,
    //       },
    //     ],
  },
]);

export default router;
