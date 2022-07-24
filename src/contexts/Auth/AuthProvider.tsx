import React, { useState, useEffect } from "react";
import { IUser } from "../../types/User";
import { HAuth } from "../../hooks/Auth/Auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

 
    const [user, setUser] = useState<IUser | null>(null);
    const [tokenInvalid, setTokenInvalid] = useState<boolean | null>(false);
    const api = HAuth();



    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('T');
            if (storageData) {
                await api.validateToken(storageData).then((resp) => {
                   
                    if (resp.data.user) {
                        setUser(resp.data.user);
                    }
                }).catch(err=>{
                    setTokenInvalid(true);
                });
            }
        }

        validateToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = async (username: string, password: string) => {
        const data = await api.login(username, password);
        if (data !== undefined) {
            if (data.user && data.access_token) {
                setUser(data.user);
                setToken(data.access_token);
                return true;
            }
        }
        return false;
    }

    const logout = async () => {
        await api.logout();
        setUser(null);
        localStorage.removeItem('T');
    }

    const setToken = (token: string) => {
        localStorage.setItem('T', token);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, tokenInvalid }}>
            {children}
        </AuthContext.Provider>
    )
}