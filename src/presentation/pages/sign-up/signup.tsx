import React, { FunctionComponent, useState } from 'react'

import Styles from './signup-styles.scss'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components/'

import Context from '@/presentation/context/form/form-context'

const SignUp: FunctionComponent = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatorio',
    emailError: 'Campo obrigatorio',
    passwordError: 'Campo obrigatorio',
    passwordConfirmationError: 'Campo obrigatorio',
    mainError: ''
  })
  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state }}>
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
