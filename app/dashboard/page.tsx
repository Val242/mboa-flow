"use client"
import { useAuth } from '@/context/AuthContext'
import supabaseClient from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
    const {session, signOutUser} = useAuth();
    const [error, setError] = useState(null);
    const [deals, setDeals] = useState([]);
    const router = useRouter()

const handleSignOutUser = async(e: { preventDefault: () => void; })=>{
  e.preventDefault();

  const {success, error} = await signOutUser();
  if(success){
      router.push('/sign-in')
  }else{
    setError(error.message)
    console.error(error.message)
  }
}

useEffect(()=>{

  fetchDeals()

 async function fetchDeals() {
  try {
    const {data, error} = await supabaseClient
    .from('sales_deals')
    .select(
      `
      title,
      description,
      value,
      status
      `
    )
     if(error){
          throw error
        }
          console.log(data)
        setDeals(data)
  } catch (error) {
      console.error("Error fetching deals", error)
  }
  
 }
},[])
  return (
  <div>
    <h1>Welcome {session?.user?.email}</h1>

   { 
    deals.map((deal, index)=>
      <div key={index}>
     <table>
      <thead>
   <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Value</th>
    <th>Status</th>
  </tr>
  </thead>

  <tbody>
  <tr >
    <td>{deal.title}</td>
     <td>{deal.description}</td>
     <td>{deal.value}</td>
      <td>{deal.status}</td>
  </tr>
  </tbody>
</table> </div>)}

      <button onClick={handleSignOutUser}>Sign Out</button>

           {
            error && (
                <div>
                    {error.message}
                </div>
            )
        }
  </div>
  )
}

