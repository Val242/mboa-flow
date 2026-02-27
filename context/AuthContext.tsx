"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import supabaseClient from "@/lib/supabase/client";


const AuthContext = createContext<{session: string} | undefined>(undefined);

export const AuthContextProvider = ({children}:{children:ReactNode})=>{
    const[session, setSession] = useState("Valentine");
    useEffect(()=>{
        async function getInitialSession() {
        try{
            const {data, error} = await supabaseClient.auth.getSession()
            if(error){
                throw error;
            }
            console.log(data.session)
            setSession(data.session)
        }
        catch(error){
                 const message = error instanceof Error ? error.message : String(error);
                 console.error("Error getting session", message)
        }
    }

    getInitialSession()

    supabaseClient.auth.onAuthStateChange((_event, session)=>{
        setSession(session);
        console.log('Session changed', session) 
    })

    },[])

    const signInUser = async (email: string, password:string)=>{
        try {
            const {data, error} =await supabaseClient.auth.signInWithPassword({
                    email: email.toLowerCase(),
                    password: password
                })
                if(error){
                    console.error('Supabase sign-in error:', error.message)
                        return {sucess: false, error: error.message}
                }
                console.log('Supabase sigin-in success', data)
                  setSession(data.session)
                return{success: true, data}
              
            
        } catch (error) {
                 const message = error instanceof Error ? error.message : String(error);
                 console.error("Unexpected error during sign-in", message)
                  return{success: false, error: 'An unexpected error occured please try again'}
            }
        }

    


    return (
    <AuthContext.Provider value ={{session, signInUser}}>
        {children}
    </AuthContext.Provider>
    )

}
   export const useAuth = ()=>{
        return useContext(AuthContext)
    }
