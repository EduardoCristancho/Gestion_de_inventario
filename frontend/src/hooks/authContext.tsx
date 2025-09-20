'use client'
import React, { useState ,createContext} from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    id: number,
    username: string,
    companyId: number,
    rol: string
    iat?: number
    exp?: number
}
export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: ()=>Promise<void>
}
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children, initialUser}: {children: React.ReactNode, initialUser?: User | null}) {
    const [user, setUser] = useState<User | null>(initialUser || null);
    const router = useRouter();
    async function logout() {
        const response = await fetch('/api/auth/logout', {
            credentials: 'include'
        });
        if (!response.ok) return;
        setUser(null);
        router.push('/login');
    }
    return ( 
        <AuthContext.Provider value = {{user, setUser, logout }}>
            {children}
        </AuthContext.Provider> 
    );
}