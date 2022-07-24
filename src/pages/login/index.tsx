import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

import imgLogo from '../../assets/img/slogan-para-restaurante.jpg'
import Loading from "../../components/loading";
import Swal from "sweetalert2";

export default function Login() {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {

        if (!username || !password) {
            Swal.fire({
                title: "Atenção!!!",
                icon: "info",
                showConfirmButton: false,
                timer: 5000,
                text: "Preencha todos os campos",
                toast: true,
                position: 'top-right'
            })
            return false;
        }

        if (username && password) {

            setLoading(true);
            const isLogged = await auth.login(username, password).finally(() => {
                setLoading(false);
            });

            if (isLogged) {
                navigate('/usuarios');
                Swal.fire({
                    toast: true,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                    title: 'Bem vindo(a)',
                    position: 'top-right',
                    timerProgressBar: true
                })
            }
        }

    }

    return (
        <main >

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={imgLogo} alt="IMG" />
                        </div>

                        <div className="login100-form validate-form">
                            <span className="login100-form-title">
                                Controle Interno
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input onChange={(e) => setUsername(e.target.value)} className="input100" type="text" value={username} name="username" placeholder="Usuários" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input onChange={(e) => setPassword(e.target.value)} className="input100" type="password" value={password} name="password" placeholder="Senha" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button onClick={handleLogin} className="login100-form-btn">
                                    {loading && <Loading color="white" />}    Entrar
                                </button>
                            </div>

                            <div className="text-center p-t-136">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}