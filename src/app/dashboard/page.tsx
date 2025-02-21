"use client"

import React from "react";
import { useUser } from "@/firebase/useUser";

const Dashboard = () => {
  const { user, userData, loading, error } = useUser();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {user ? (
        <h1>
          Welcome, {userData && userData.username ? userData.username : "User"}!
        </h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  )
}

export default Dashboard