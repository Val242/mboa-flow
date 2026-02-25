"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import supabaseClient from "@/lib/supabase/client";


const AuthContext = createContext<{session: string} | null>(null);

export const AuthContextProvider = ({children}:{children:ReactNode})=>{


    const[session, setSession] = useState("Valentine");
    

    return (
    <AuthContext.Provider value ={{session}}>
        {children}
    </AuthContext.Provider>
    )

}
   export const useAuth = ()=>{
        return useContext(AuthContext)
    }
