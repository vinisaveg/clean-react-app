import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Styles from './signup-styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components/'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '../protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/useCases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: FunctionComponent<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (
      state.isLoading ||
      state.emailError ||
      state.nameError ||
      state.passwordError ||
      state.passwordConfirmationError
    ) {
      return
    }

    try {
      setState({ ...state, isLoading: true })

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <Input name="name" type="text" placeholder="Digite seu nome" />

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <Input name="passwordConfirmation" type="password" placeholder="Confirme sua senha" />

          <button
            data-testid="submit"
            className={Styles.submit}
            type="submit"
            disabled={
              !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError
            }
          >
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
