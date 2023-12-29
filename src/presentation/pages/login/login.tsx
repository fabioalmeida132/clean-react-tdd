import React, { useState } from 'react'
import Styles from './login.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}
const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" placeholder="Digite seu e-mail"/>
          <Input type="password" placeholder="Digite sua senha"/>
          <button className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default Login