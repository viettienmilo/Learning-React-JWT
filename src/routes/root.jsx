import { createBrowserRouter } from "react-router"
import MainLayout from './../layout/MainLayout.jsx';
import Home from './../pages/Home.jsx';
import Register from './../pages/Register.jsx';
import Login from './../pages/Login.jsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
        ],
    },
])

export default router;