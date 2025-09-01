import {useRoutes, Navigate} from "react-router-dom";
import UserLayout from "../layouts/UserLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import UnauthorizedPage from "../pages/UnauthorizedPage.tsx";
import {UserHome} from "../pages/UserHome.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AdminPage from "../pages/AdminPage.tsx";
import DashboardLayout from "../layouts/DashboardLayout.tsx";
import DashboardPage from "../pages/dashboard/DashboardPage.tsx";
import Form from "../pages/dashboard/Form.tsx";
import AdvancedTable from "../pages/dashboard/Table.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import MultiStepForm from "../pages/MultistepForm.tsx";

const getUserType = () => localStorage.getItem("userType");

const AppRoutes = () => {
    const userType = getUserType();
    const routes = [
        {
            path: "/", element: userType === "admin" ? <DashboardLayout/> : <Navigate to="/unauthorized"/>,
            children: [
                {
                    path: "", element: (
                        <ProtectedRoute roles={["admin"]}>
                            <DashboardPage/>
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/form", element: (
                        <ProtectedRoute roles={["admin"]}>
                            <Form/>
                        </ProtectedRoute>
                    )
                }, {
                    path: "/table", element: (
                        <ProtectedRoute roles={["admin"]}>
                            <AdvancedTable/>
                        </ProtectedRoute>
                    )
                },{
                    path: "/multi-step-form", element: (
                        <ProtectedRoute roles={["admin"]}>
                            <MultiStepForm/>
                        </ProtectedRoute>
                    )
                },
            ]
        },
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
        {path: "/login", element: <LoginPage/>},
        {path: "/unauthorized", element: <UnauthorizedPage/>},
        {path: "*", element: <p>404 Not Found</p>}
    ];
    return useRoutes(routes);
};

export default AppRoutes;
