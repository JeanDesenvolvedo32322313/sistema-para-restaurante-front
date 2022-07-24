import React, { useState } from "react";
import { ModalDialog } from "../../../components/modal";
import { IUser } from "../../../types/User";
import { HCrudUser } from "../../../hooks/Usuarios";
import Swal from "sweetalert2";

interface IModalEditUser {
    idModal: string;
    dados: IUser;
    listRoles?: any;
    refreshData?: any;
}

export default function ModalUpdateUser({ idModal, dados, listRoles, refreshData }: IModalEditUser) {

    const crudUsers = HCrudUser();

    const [inputEdit, setInputEdit] = useState<any>({
        name: dados.name,
        username: dados.username,
        email: dados.email,
        role_id: dados.role_id,
    })

    //captura dados dos inputs 
    function getDataInputs(value: any) {
        setInputEdit((prevValue: any) => (
            {
                ...prevValue,
                [value.target.name]: value.target.value
            }
        ))
    }
    //captura dados dos inputs 


    //salvar edição de dados
    const SaveEdicao = () => {

        if (!inputEdit.name || !inputEdit.username || !inputEdit.email || !inputEdit.role_id) {
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

        crudUsers.Update(inputEdit.name, inputEdit.email, inputEdit.username, inputEdit.role_id, dados.id).then((res) => {
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
                    timerProgressBar: true,
                    toast:true,
                    position: "top-right"
                });
                refreshData();
            }
            (window as any).$(`#${idModal}`).modal('hide');
        })
        
    }
    //salvar edição de dados

    return (
        <ModalDialog id={`${idModal}`} title={`Editar usuário ${dados.id}`} modalSize="" buttonClose={[true, 'Cancelar']} buttonSend={[true, "Salvar"]} onClick={SaveEdicao}  >
            <div>
                <div className="row gx-3">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputFirstName">Nome</label>
                            <input value={inputEdit.name} onChange={getDataInputs} autoComplete="off" name="name" className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="small mb-1" >Usuário</label>
                            <input value={inputEdit.username} onChange={getDataInputs} autoComplete="off" name="username" className="form-control" type="text" />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="small mb-1" >Email</label>
                    <input value={inputEdit.email} onChange={getDataInputs} autoComplete="off" name="email" className="form-control" type="email" />
                </div>

                <div className="mb-3">
                    <label>Nível de Permissão</label>
                    <select name="role_id" onChange={getDataInputs} className="form-control " >
                        <option value={dados.role_id}>{dados.descricao}</option>
                        <option disabled={true}>-----------------</option>
                        {
                            listRoles.map((l: any, k: any) => {
                                return (
                                    <option key={k} value={l.id}>{l.descricao}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </ModalDialog>
    )
}