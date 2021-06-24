import React, { FunctionComponent, useState } from 'react'

import Styles from './login-styles.scss'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components/'

import Context from '@/presentation/context/form/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: FunctionComponent = () => {
  const [state] = useState<StateProps>({ isLoading: false, errorMessage: '' })

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <button data-testid="submit" className={Styles.submit} type="submit" disabled>
            Entrar
          </button>

          <span className={Styles.link}>Criar uma conta</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
