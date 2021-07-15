import React, { FunctionComponent, useEffect, useState } from 'react'

import Styles from './signup-styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components/'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '../protocols/validation'

type Props = {
  validation: Validation
}

const SignUp: FunctionComponent<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    nameError: '',
    emailError: '',
    passwordError: 'Campo obrigatorio',
    passwordConfirmationError: 'Campo obrigatorio',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })
  }, [state.name, state.email])

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Cadastro</h2>

          <Input name="name" type="text" placeholder="Digite seu nome" />

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <Input name="passwordConfirmation" type="password" placeholder="Confirme sua senha" />

          <button data-testid="submit" className={Styles.submit} type="submit" disabled>
            Criar conta
          </button>

          <span className={Styles.link}>Ja possui uma conta?</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
