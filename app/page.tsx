"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import SignIn from "./(auth)/sign-in/page";
import { ReactNode } from "react";


export default function Home({children}: {children:ReactNode}) {
  const {session} = useAuth()
  const router = useRouter();

  if(session === undefined){
    return <div>Loading</div>
  }
   return session ? <>{children}</>: router.push('/sign-in'); 

}
