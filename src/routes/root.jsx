import { createBrowserRouter } from "react-router"
import MainLayout from './../layout/MainLayout.jsx';
import Home from './../pages/Home.jsx';
import Register from './../pages/Register.jsx';
import Login from './../pages/Login.jsx';
import Product from './../pages/Product.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import Dashboard from './../dashboard/Dashboard.jsx';
import RoleBasedProtectedRoute from './../components/auth/RoleBasedProtectedRoute.jsx';
import Unauthrized from './../pages/Unauthrized.jsx';
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
            {
                path: "product",
                element:
                    <ProtectedRoute>
                        <Product />
                    </ProtectedRoute>,
            },
            {
                path: "dashboard",
                element:
                    <RoleBasedProtectedRoute allowedRoles={["ADMIN"]}>
                        <Dashboard />,
                    </RoleBasedProtectedRoute>,
            },
            {
                path: "unauthorized",
                element: <Unauthrized />
            }
        ],
    },
])

export default router;