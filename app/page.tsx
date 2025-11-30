"use client"

import { useState } from "react"
import { LoginPage } from "@/components/pages/login-page"
import { DashboardPage } from "@/components/pages/dashboard-page"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={(email) => {
          setUserEmail(email)
          setIsLoggedIn(true)
        }}
      />
    )
  }

  return <DashboardPage userEmail={userEmail} onLogout={() => setIsLoggedIn(false)} />
}
