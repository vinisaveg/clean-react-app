import React, { FunctionComponent } from 'react'

import Styles from './login-styles.scss'

import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import Formstatus from '@/presentation/components/form-status/form-status'

const Login: FunctionComponent = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>

        <Input name="email" type="email" placeholder="Digite seu e-mail" />

        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button className={Styles.submit} type="submit">
          Entrar
        </button>

        <span className={Styles.link}>Criar uma conta</span>

        <Formstatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
