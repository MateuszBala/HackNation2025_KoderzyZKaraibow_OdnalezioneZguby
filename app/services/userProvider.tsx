"use client"
import { User } from "@/types/types";
import { createContext, useState, ReactNode, useContext, useEffect } from 'react'

interface State {
    user?: User;
    logIn: (login: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext<State | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }):ReactNode {
    const [user, setUser] = useState<User|undefined>(undefined);

    useEffect(()=>{
      getUser().then(res => {
        if(res?.value)
          setUser(JSON.parse(res.value));
      });
    }, [])

    async function getUser() {
      return await cookieStore.get("user")
    }

    async function logIn(login: string, password: string){
      if(!login)
        throw new Error("Login jest wymagany");
      if(!password)
        throw new Error("Hasło jest wymagane");
      if(login == "admin" && password == "admin"){
        setUser({email: "admin", role: "admin"});
        cookieStore.set("user", JSON.stringify({email: "admin", role: "admin"}))
        return true
      }
      else if(login == "user" && password == "user"){
        setUser({email: "user", role: "user"})
        cookieStore.set("user", JSON.stringify({email: "user", role: "user"}))
        return true
      }
      else
        throw new Error("Błędne dane logowania")
    }

    const contextValue = {
        user,
        logIn
    };

    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
}

export function useAuth():State {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
