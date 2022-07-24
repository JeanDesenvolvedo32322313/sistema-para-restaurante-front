import { IUser } from "../../types/User";
import Api from "../../services/api";

export const HCrudUser = () => ({
    Create: async (name: IUser, email: IUser, username: IUser, role_id: IUser, password: IUser, active?: number) => {
        const respose = await Api.post('/users/create', {
            name,
            email,
            username,
            role_id,
            password,
            active
        });
        return respose.data;
    },

    Read: async () => {
        const response = await Api.get('/users/read');
        return response;
    },

    Update: async (name: IUser, email: IUser, username: IUser, role_id: IUser, id: number) => {
        const respose = await Api.post(`/users/update/${id}`, {
            name,
            email,
            username,
            role_id,
        });
        return respose.data;
    },

    Delete: async () => {

    },

    ListPermicao: async () => {
        const response = await Api.get('/users/list_roles');
        return response;
    }
})