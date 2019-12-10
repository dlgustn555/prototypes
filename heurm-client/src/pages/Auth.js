import React, { lazy, Suspense, useEffect, useContext } from "react"
import { Route } from "react-router-dom"
import { AuthContext } from "contexts/AuthContext"
import AuthWrapper from "components/Auth/AuthWrapper"

const Login = lazy(() => import("components/Auth/Login"))
const Register = lazy(() => import("components/Auth/Register"))

const Auth = () => {
  const { update } = useContext(AuthContext)

  useEffect(() => {
    update({ headerVisibility: false })
    return () => {
      update({ headerVisibility: true })
    }
  }, [])

  return (
    <AuthWrapper>
      <Suspense fallback={<></>}>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
      </Suspense>
    </AuthWrapper>
  )
}

export default Auth
