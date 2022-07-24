import Api from "../../services/api";

export const HAuth = () => ({
    validateToken: async (token: string) => {
        const response = await Api.post('/auth/me');
        return response;
    },
    login: async (username: string, password: string) => {
        const response = await Api.post('/auth/login', {
            username: username,
            password: password
        });
        return response.data;
    },
    logout: async () => {
        const respose = await Api.post('/auth/logout');
        return respose.data;
    }
});