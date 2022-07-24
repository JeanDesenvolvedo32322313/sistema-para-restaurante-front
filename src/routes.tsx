import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import LayoutDefaut from "./layout/default";
import DefaultLogin from "./layout/login";
import Login from "./pages/login";
import Usuarios from "./pages/Admin/Usuarios";
import FazerPedido from "./pages/Garcom/Fazer_pedidos";
import Clientes from "./pages/Garcom/Clientes";
import Mesas from "./pages/Garcom/Mesas";
import CPedidos from "./pages/Cozinheiro/Pedidos";
import CadastroCadapio from "./pages/Admin/Cadastro_cardapio";

export default function Rotas() {
    return (
        <Routes>
            <Route element={<DefaultLogin />}>
                <Route path="/" element={<Login />} ></Route>
            </Route>

            <Route element={<RequireAuth role_id={2}><LayoutDefaut /></RequireAuth>}>
                <Route path="/fazer_pedido" element={<FazerPedido />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/mesas" element={<Mesas />} />
                <Route path="/pedidos" element={<CPedidos />} />
                <Route path="/cadastro_cardapios" element={<CadastroCadapio />} />
            </Route>

            <Route element={<RequireAuth role_id={1}><LayoutDefaut /></RequireAuth>}>
                <Route path="/usuarios" element={<Usuarios />} />
            </Route>

        </Routes>
    )
}