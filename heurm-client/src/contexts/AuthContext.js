import React, { useState, createContext } from "react"

export const AuthContext = createContext()
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    headerVisibility: true,
    register: {
      form: {
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
      }
    },
    login: {
      form: {
        email: "",
        password: ""
      }
    }
  })

  const authStore = {
    ...auth,
    update: update => {
      setAuth({ ...auth, ...update })
    }
  }

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  )
}
