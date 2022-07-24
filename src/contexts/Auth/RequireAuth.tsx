import React, { useContext } from "react";
import Login from "../../pages/login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children, role_id }: { children: JSX.Element, role_id: number }) => {
    const auth = useContext(AuthContext);



    if (!auth.user) {
        setTimeout(function () {
            return <Login />
        }, 5000)
    }

    if (auth.user?.role_id === role_id || auth.user?.role_id === 1) {

    } else {
        setTimeout(function () {
            return <Login />
        }, 5000)
    }

    return children;
}