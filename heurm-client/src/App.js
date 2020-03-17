import React, { lazy, Suspense } from "react"
import { Route } from "react-router-dom"
import Header from "./components/Header/Header"
import LoginButton from "./components/Header/LoginButton"
import { AuthProvider } from "contexts/AuthContext"

const Home = lazy(() => import("./pages/Home"))
const Auth = lazy(() => import("./pages/Auth"))

function App() {
  return (
    <div>
      <AuthProvider>
        <Header>
          <LoginButton />
        </Header>
        <Suspense fallback={<>로딩중..</>}>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
        </Suspense>
      </AuthProvider>
    </div>
  )
}

export default App
