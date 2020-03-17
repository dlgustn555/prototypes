import React, { useContext } from "react"
import AuthContent from "./AuthContent"
import InputWithLabel from "./InputWithLabel"
import AuthButton from "./AuthButton"
import RightAlignedLink from "./RightAlignedLink"
import { AuthContext } from "contexts/AuthContext"

const Register = () => {
  const { register, update } = useContext(AuthContext)

  const handleChange = e => {
    const { name, value } = e.target
    register.form[name] = value
    update(register)
  }
  return (
    <AuthContent title="회원가입">
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        value={register.form.email}
        onChange={handleChange}
      />
      <InputWithLabel
        label="아이디"
        name="username"
        placeholder="아이디"
        value={register.form.username}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={register.form.password}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        value={register.form.passwordConfirm}
        onChange={handleChange}
      />
      <AuthButton>회원가입</AuthButton>
      <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
    </AuthContent>
  )
}

export default Register
