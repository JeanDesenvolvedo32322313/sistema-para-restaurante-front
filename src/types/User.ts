export type IUser = {
    id: number;
    name: string;
    email: string;
    username?: string;
    password?: string;
    active?: number;
    role_id: number;
    descricao?:string;
    created_at: string;
    updated_at: number;
}