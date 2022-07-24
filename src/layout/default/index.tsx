
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiAlignLeft, FiUser } from "react-icons/fi";
import NavegacaoSimples from "../../components/navegacaoSimples";
import {
    FaUsersCog,
    FaRegListAlt,
    FaFileSignature,
    FaUserFriends,
    FaToriiGate,
    FaVoteYea

} from "react-icons/fa";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Swal from "sweetalert2";



export default function LayoutDefaut() {

    function HiderShowMenu() {
        // (window as any).$("body").attr('class',"nav-fixed sidenav-toggled");
        (window as any).$("body").toggleClass("sidenav-toggled");
    }

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.logout();
        navigate('/')
        Swal.fire({
            toast: true,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
            title: 'Deslogado com sucesso.',
            position: 'top-right',
            timerProgressBar: true
        })
    }

    return (
        <>
            <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">

                <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" onClick={HiderShowMenu}>
                    <FiAlignLeft style={{ fontSize: 20 }} />
                </button>

                <a className="navbar-brand pe-3 ps-4 ps-lg-2" >Gestão Restaurante</a>

                <ul className="navbar-nav align-items-center ms-auto">


                    {/* <!-- User Dropdown--> */}
                    <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FiUser style={{ fontSize: 20, }} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                                <FiUser style={{ fontSize: 20, marginRight: 23 }} />
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name">{auth.user?.name} </div>
                                    <div className="dropdown-user-details-email">{auth.user?.email}</div>
                                </div>
                            </h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" >
                                <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                                Perfil
                            </a>
                            <a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                                Sair
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sidenav shadow-right sidenav-light">
                        <div className="sidenav-menu">
                            <div className="nav accordion" id="accordionSidenav">

                                <div className="sidenav-menu-heading">Garçom</div>

                                <NavegacaoSimples Icon={FaFileSignature} name="Fazer o Pedido" link="fazer_pedido" />
                                <NavegacaoSimples Icon={FaUserFriends} name="Clientes" link="pedidos" />
                                <NavegacaoSimples Icon={FaToriiGate} name="Mesas" link="pedidos" />

                                <div className="sidenav-menu-heading">Cozinheiro</div>
                                <NavegacaoSimples Icon={FaVoteYea} name="Pedidos" link="pedidos" />



                                {
                                    auth.user?.role_id === 1 ? (
                                        <>
                                            <div className="sidenav-menu-heading">Admin</div>
                                            <NavegacaoSimples Icon={FaUsersCog} name="Usuários" link="usuarios" />
                                            <NavegacaoSimples Icon={FaRegListAlt} name="Cadastro de cardapios" link="cadastro_cardapios" />
                                        </>
                                    ) : ''
                                }

                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <Outlet />
                    <footer className="footer-admin mt-auto footer-light">
                        <div className="container-xl px-4">
                            <div className="row">
                                <div className="col-md-6 small">Copyright &copy; Your Website 2021</div>

                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}