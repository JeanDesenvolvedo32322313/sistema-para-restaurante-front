import { createContext } from "react";
import { IUser } from "../../types/User";

export type AuthContextType = {
    user: IUser | null;
    tokenInvalid?: any;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);