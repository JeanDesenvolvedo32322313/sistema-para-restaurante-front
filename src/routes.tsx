import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import LayoutDefaut from "./layout/default";
import DefaultLogin from "./layout/login";
import Login from "./pages/login";
import Usuarios from "./pages/usuarios";

export default function Rotas() {
    return (
        <Routes>
            <Route element={<DefaultLogin />}>
                <Route path="/" element={<Login />} ></Route>
                {/* <Route path="/login" element={<Login />} ></Route> */}
            </Route>

            <Route element={<RequireAuth role_id={2}><LayoutDefaut /></RequireAuth>}>

            </Route>

            <Route element={<RequireAuth role_id={1}><LayoutDefaut /></RequireAuth>}>
                <Route path="/usuarios" element={<Usuarios />} />
            </Route>

        </Routes>
    )
}