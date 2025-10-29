import { createBrowserRouter } from "react-router"
import MainLayout from './../layout/MainLayout.jsx';
import Register from './../pages/Register.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            // {
            //     path: "/",
            //     element: <div>root</div>
            // },
            {
                path: "/register",
                element: <Register />
            },

        ]
    },
])

export default router;