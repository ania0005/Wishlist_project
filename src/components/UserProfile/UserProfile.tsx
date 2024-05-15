import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { instance } from "../../components/lib/axios"

interface User {
        id: number
        firstName: string
        lastName: string
        email: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User | undefined>(undefined)

  async function fetchUserProfile() {

    const result = await instance.get("/api/users/auth/me")
    
    setUser(result.data)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])
  
  if(localStorage.getItem("authToken")){
    return (
      <div>
        <h1>My Profile</h1>
        <h2>{user?.firstName}</h2>
      </div>
    )
  } else {
    return <Navigate to="/"/>
  }
}