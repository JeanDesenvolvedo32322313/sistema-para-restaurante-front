import Api from "../../services/api";

export const HUsuariosView = () => ({
    ListPermicao: async (id: number | string | undefined) => {
        const response = await Api.get(`clientes/view/${id}`);
        return response.data;
    }
})