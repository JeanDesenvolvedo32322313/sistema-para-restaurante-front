import { useState, useEffect } from "react";
import Header from "../../../components/header";
import { FaUserEdit, FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import CardComponent from "../../../components/cardComponent";
import TableComponent from "../../../components/tableComponent";
import { ModalDialog } from "../../../components/modal";
import Swal from "sweetalert2";
import Loading from "../../../components/loading";
import { HCrudUser } from "../../../hooks/Usuarios";
import { IUser } from "../../../types/User";
import BtnGroup from "../../../components/btnGroup";
import ModalUpdateUser from "./modalUpdate";


export default function Usuarios() {

    const crudUser = HCrudUser();

    const [inputsCad, setInputCad] = useState<any>({
        confirmSenha: "",
        email: "",
        nivelPermissao: "",
        nome: "",
        senha: "",
        usuario: "",
    })

    const [listUsers, setListUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [listRoles, setListRoles] = useState<any[]>([]);

    //captura dados dos inputs 
    function getDataInputs(value: any) {
        setInputCad((prevValue: any) => (
            {
                ...prevValue,
                [value.target.name]: value.target.value
            }
        ))
    }
    //captura dados dos inputs 



    //botão salvar dados do usuário
    function cadastrar_usuario() {

        //verificar se preencheou todos os campos
        if (!inputsCad.confirmSenha || !inputsCad.email || !inputsCad.nivelPermissao || !inputsCad.nome || !inputsCad.senha || !inputsCad.usuario) {
            Swal.fire({
                title: "Atenção",
                text: "Preecha todos os campos",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
            return false;
        }
        //verificar se preencheou todos os campos


        //verificar se as senhas estão iguais
        if (inputsCad.senha !== inputsCad.confirmSenha) {
            Swal.fire({
                title: "Atenção",
                text: "As senhas devem ser iguais. ",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
            return false;
        }
        //verificar se as senhas estão iguais

        //verificar o nome do usuário cadastrado
        if (inputsCad.nome.split(" ").length <= 1) {
            Swal.fire({
                title: "Atenção",
                text: "Nome do usuário muito curto.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
            return false;
        }
        //verificar o nome do usuário cadastrado


        //cadastrar 
        crudUser.Create(inputsCad.nome, inputsCad.email, inputsCad.usuario, inputsCad.nivelPermissao, inputsCad.senha, 1).then((res) => {
            if (res.status === 0) {
                Swal.fire({
                    title: "Error",
                    text: res.msg,
                    icon: "error",
                    showConfirmButton: false,
                    timerProgressBar: true
                });
            } else if (res.status === 1) {
                Swal.fire({
                    title: "Sucesso",
                    text: res.msg,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                ReadUsers();
            }
        }).finally(() => {
            setInputCad((i: any) => ({ confirmSenha: "", email: "", nivelPermissao: "", nome: "", senha: "", usuario: "" }));
            (window as any).$("#modalCadUser").modal("hide");
        });
        //cadastrar 
    }
    //botão salvar dados do usuário


    //List User
    const ReadUsers = () => {
        crudUser.Read().then((res: any) => {
            setListUsers(res.data);
        }).finally(() => {
            setLoading(false)
            ListRoles();
        })
    }
    //List User


    //List Roles
    const ListRoles = () => {
        crudUser.ListPermicao().then((res: any) => {
            setListRoles(res.data);
        })
    }
    //List Roles

    useEffect(() => {
        setLoading(true);
        ReadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        //Gerar nome do usuário altomaticamente
        let userName = inputsCad.nome;
        let userName1 = userName.split(" ");
        let userName2 = userName1[0] + "." + userName1[userName1.length - 1];
        let userName3 = userName2.toLowerCase();
        if (userName3 === '.') {
            setInputCad({ ...inputsCad, usuario: '' });
        } else {
            setInputCad({ ...inputsCad, usuario: userName3 });
        }
        //Gerar nome do usuário altomaticamente
    }, [inputsCad.nome])


    return (
        <main>
            <Header Icon={FaUserEdit} title="Usuários" subtitle="Gestão dos usuários do sistema" />

            <CardComponent att="top" title="Usuários" buttonTitle="Novo Usuário " IconButton={FaPlus} onClick={() => { (window as any).$('#modalCadUser').modal("show") }} >

                <TableComponent size="sm" colunas={['#', 'Nome', 'Usuário', 'E-mail', 'Permisão', 'Ações']} >
                    {
                        listUsers.map((item: any, k: any) => (
                            <tr key={k}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    <BtnGroup>
                                        <button type="button" onClick={() => { (window as any).$(`#modalEditar${item.id}`).modal('show') }} className="btn btn-primary"><FaRegEdit /></button>
                                        <button type="button" className="btn btn-primary"><FaRegTrashAlt /></button>
                                    </BtnGroup>
                                    <ModalUpdateUser idModal={`modalEditar${item.id}`} dados={item} listRoles={listRoles} refreshData={ReadUsers} />
                                </td>

                            </tr>
                        ))
                    }
                </TableComponent>
                {loading && (<Loading color="black" top={true} />)}

            </CardComponent>



            <ModalDialog id="modalCadUser" title="Cadastrar usuário" modalSize="small" buttonClose={[true, 'Cancelar']} buttonSend={[true, "Salvar"]} onClick={cadastrar_usuario} >
                <div>
                    <div className="row gx-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputFirstName">Nome</label>
                                <input autoComplete="off" onChange={getDataInputs} value={inputsCad.nome} name="nome" className="form-control" id="inputFirstName" type="text" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="small mb-1" >Usuário</label>
                                <input autoComplete="off" onChange={getDataInputs} value={inputsCad.usuario} name="usuario" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="small mb-1" >Email</label>
                        <input autoComplete="off" onChange={getDataInputs} value={inputsCad.email} name="email" className="form-control" type="email" aria-describedby="emailHelp" placeholder="fulano@email.com" />
                    </div>

                    <div className="mb-3">
                        <label>Nível de Permissão</label>
                        <select onChange={getDataInputs} value={inputsCad.nivelPermissao} name="nivelPermissao" className="form-control " >
                            <option>Selecione...</option>
                            {
                                listRoles.map((l: any, k: any) => (
                                    <option key={k} value={l.id}>{l.descricao}</option>
                                ))
                            }

                        </select>
                    </div>
                    <div className="row gx-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="small mb-1">Senha</label>
                                <input autoComplete="off" onChange={getDataInputs} value={inputsCad.senha} name="senha" className="form-control" type="password" placeholder="Enter password" />
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="mb-3">
                                <label className="small mb-1" >Confirme a Senha</label>
                                <input autoComplete="off" onChange={getDataInputs} value={inputsCad.confirmSenha} name="confirmSenha" className="form-control" type="password" placeholder="Confirm password" />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalDialog>

        </main>
    )
}

