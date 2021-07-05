import React, { FunctionComponent, useState, useEffect } from 'react'

import Styles from './login-styles.scss'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components/'

import Context from '@/presentation/context/form/form-context'
import { Validation } from '../protocols/validation'

type Props = {
  validation: Validation
}

const Login: FunctionComponent<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setState({ ...state, isLoading: true })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <button
            data-testid="submit"
            className={Styles.submit}
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}
          >
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
