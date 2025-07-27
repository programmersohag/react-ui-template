import {Navigate} from "react-router-dom";

const getCurrentUserRole = () => {
    return localStorage.getItem("userType"); // or useContext(AuthContext)
};

export default function ProtectedRoute({children, roles}) {
    const userRole = getCurrentUserRole();

    if (!userRole) {
        return <Navigate to="/" replace/>;
    }

    if (!roles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children;
}
