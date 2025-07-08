import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "@/contexts/userContext";
import { FunctionControlDeAcceso } from "./ControlDeAcceso";

interface PrivateRouteProps {
    rolesPermitidos: string[];
    children?: React.ReactNode;
}

const PrivateRoute = ({ rolesPermitidos, children }: PrivateRouteProps) => {
    const { usuario } = useContext(UserContext);

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const tienePermiso = FunctionControlDeAcceso(rolesPermitidos, usuario.roles);

    if (!tienePermiso) {
        return <Navigate to="/login" replace />;
    }

    return <>{children ?? <Outlet />}</>;
};

export default PrivateRoute;
