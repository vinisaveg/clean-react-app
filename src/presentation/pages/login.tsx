import React, { FunctionComponent } from 'react'

import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Logo from '../components/logo/logo'

const Login: FunctionComponent = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input name="email" type="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>

        <div className={Styles.inputWrap}>
          <input name="password" type="password" placeholder="Digite sua senha" />
          <span className={Styles.status}>🔴</span>
        </div>

        <button className={Styles.submit} type="submit">
          Entrar
        </button>

        <span className={Styles.link}>Criar uma conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}> Erro</span>
        </div>
      </form>

      <footer className={Styles.footer} />
    </div>
  )
}

export default Login
