import React, { FunctionComponent, useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'

import { LoginHeader, Input, FormStatus, Footer, SubmitButton } from '@/presentation/components/'

import { FormContext, ApiContext } from '@/presentation/context'
import { Validation } from '../protocols/validation'
import { Authentication } from '@/domain/useCases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: FunctionComponent<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (state.isLoading || state.isFormInvalid) return

    try {
      setState({ ...state, isLoading: true })

      const account = await authentication.auth({ email: state.email, password: state.password })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <SubmitButton text="Entrar" />

          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Criar uma conta
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
