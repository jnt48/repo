"use client"

import { useUser } from '@/firebase/useUser'
import React from 'react'

const Dashboard = () => {
  const user = useUser();
  return (
    <div>Welcome, {user ? user.email : "Guest"}!</div>
  )
}

export default Dashboard