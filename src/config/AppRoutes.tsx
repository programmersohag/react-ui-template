import {useRoutes, Navigate} from "react-router-dom";
import UserLayout from "../layouts/UserLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import UnauthorizedPage from "../pages/UnauthorizedPage.tsx";
import {UserHome} from "../pages/UserHome.tsx";
import {AdminPage} from "../pages/AdminPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";


const getUserType = () => localStorage.getItem("userType");

const AppRoutes = () => {
    const userType = getUserType();
    const routes = [
        {path: "/", element: <LoginPage/>},
        {
            path: "/admin",
            element: userType === "admin" ? <AdminLayout/> : <Navigate to="/unauthorized"/>,
            children: [
                {
                    path: "", element: (
                        <ProtectedRoute roles={["admin"]}>
                            <AdminPage/>
                        </ProtectedRoute>
                    )
                },
                // Add more admin routes here
            ]
        },

        {
            path: "/user",
            element: userType === "user" ? <UserLayout/> : <Navigate to="/unauthorized"/>,
            children: [
                {path: "", element: <UserHome/>},
                // Add more user routes here
            ]
        },
        {path: "/unauthorized", element: <UnauthorizedPage/>}
    ];
    return useRoutes(routes);
};

export default AppRoutes;
