// import SignIn from "@/components/SignIn";
"use client"
import Image from "next/image";
import SignIn from "./(auth)/sign-in/page";
import { useContext } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const{session} = useAuth()
  return (
   <div>
  <SignIn/>
  {session}
   </div>
  );
}
