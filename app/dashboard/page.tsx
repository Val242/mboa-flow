"use client"
import { useAuth } from '@/context/AuthContext'
import React from 'react'

export default function page() {
    const {session} = useAuth();
  return (
  <div>
    Welcome {session?.user?.email}
  </div>
  )
}

