import React from 'react'
import Styles from './login.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" placeholder="Digite seu e-mail"/>
        <Input type="password" placeholder="Digite sua senha"/>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus/>
      </form>
      <Footer/>
    </div>
  )
}

export default Login
