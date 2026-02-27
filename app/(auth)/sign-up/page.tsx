import { useAuth } from '@/context/AuthContext'
import React from 'react'

export default function SignUp() {
       const{session} = useAuth()
       console.log(session.email)
  return (
    <div>SignUp
    <p>Welcome {session.email} </p>
    </div>
  )
}
