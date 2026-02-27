import { ReactNode } from "react";
import "./styles.css";


export default function AuthLayout({ children }: {
    children:ReactNode
}) {
  return <>
  <h1 className="text-2xl">
    <span className="text-green-600 font-sans">Mbo</span>
    <span className="text-red-600">aF</span>
    <span className="text-yellow-300">low</span>
    </h1>
   {children} 
  {/* <h2>Hello</h2> */}
  </>;
}