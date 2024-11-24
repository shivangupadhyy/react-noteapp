import React from 'react'
import { auth } from '../firebaseConfig'


export default function Logout() {
  const handleLogout = async () => {
    try {
      await auth.signOut()
      // You might want to use a toast notification instead of an alert in a production app
      alert("Logged out successfully")
    } catch (error) {
      console.error("Error logging out:", error)
      alert("Error logging out. Please try again.")
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      aria-label="Logout"
    >   
      <span>Logout</span>
    </button>
  )
}