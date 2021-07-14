import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components/'

import Context from '@/presentation/context/form/form-context'

const SignUp: FunctionComponent = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2>Cadastro</h2>

          <Input name="name" type="text" placeholder="Digite seu nome" />

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <Input name="passwordConfirmation" type="password" placeholder="Confirme sua senha" />

          <button className={Styles.submit} type="submit">
            Criar conta
          </button>

          <Link to="/login" className={Styles.link}>
            Ja possui uma conta?
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
