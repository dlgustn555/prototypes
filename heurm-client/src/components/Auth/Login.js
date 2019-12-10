import React, { useContext } from "react"
import AuthContent from "./AuthContent"
import InputWithLabel from "./InputWithLabel"
import AuthButton from "./AuthButton"
import RightAlignedLink from "./RightAlignedLink"
import { AuthContext } from "contexts/AuthContext"
import { localLogin } from "lib/api/auth"

const Login = () => {
  const { login, update } = useContext(AuthContext)

  const handleChange = e => {
    const { name, value } = e.target
    login.form[name] = value
    update(login)
  }

  const handleLogin = async () => {
    const { email, password } = login.form
    console.log(email, password)
    const result = await localLogin({ email, password })
    console.log(result)
  }

  return (
    <AuthContent title="로그인">
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        value={login.form.email}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={login.form.password}
        onChange={handleChange}
      />
      <AuthButton onClick={handleLogin}>로그인</AuthButton>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthContent>
  )
}

export default Login
