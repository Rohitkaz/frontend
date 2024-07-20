import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
} from "react-router-dom";
import { Contextprovider } from "./pages/context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import BlogForm from "./pages/BlogForm";
import ShowBlogPage from "./pages/ShowBlogpage";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import Allblog from "./pages/Allblog";
import CommentBar from "./pages/comment";
import Header1 from "./pages/headercheck";
import Root from "./pages/Root";
import { Await, defer } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Home />,
        path: "/",
        loader: async ({ params }) => {
          console.log("hi");

          try {
            const res = axios.get(
              `https://blog-backend-u88k.onrender.com/blog`,
              {
                withCredentials: true,
              }
            );

            return defer({ res: res });
          } catch (err) {
            return redirect("/");
          }
        },
      },
      {
        element: <Dashboard />,
        path: "/dashboard",
        loader: async ({ params }) => {
          console.log("hi");
          try {
            const res = await axios.get(
              `https://blog-backend-u88k.onrender.com/dashboard`,
              {
                withCredentials: true,
              }
            );
            const data = await res.data;

            return data;
          } catch (err) {
            return redirect("/login");
          }
        },
      },

      /* children: [
          {
            element: <Blog />,
            path: "blog",
          },
        ],*/
      // children: [
      {
        element: <Login />,
        path: "/Login",
      },
      {
        element: <Header1 />,
        path: "/image",
      },
      {
        element: <CommentBar />,
        path: "/contact",
      },
      {
        element: <Register />,
        path: "/Register",
      },
      {
        element: <BlogForm />,
        path: "/newblog",
      },
      {
        element: <ShowBlogPage />,
        path: "/blog/:id",
        loader: async ({ params }) => {
          console.log("hi");
          try {
            const res = await axios.get(
              `https://blog-backend-u88k.onrender.com/blog/${params.id}`,
              {
                withCredentials: true,
              }
            );
            const data = await res.data;
            console.log(data);
            return data;
          } catch (err) {
            return redirect("/");
          }
        },
      },
      {
        element: <Allblog />,
        path: "/Yourblog",
        loader: async ({ params }) => {
          console.log("hi");
          try {
            const res = await axios.get(
              `https://blog-backend-u88k.onrender.com/Yourblog`,
              {
                withCredentials: true,
              }
            );
            const data = await res.data;

            return data;
          } catch (err) {
            return redirect("/dashboard");
          }
        },
      },
      //  ],
      //  },
    ],
  },
]);

function App() {
  return (
    //<Contextprovider>
    <RouterProvider router={router} />
    // </Contextprovider>
  );
}

export default App;
