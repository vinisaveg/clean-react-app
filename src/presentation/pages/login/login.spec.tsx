import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'

import Login from './login'

import { ValidationStub } from '@/presentation/test'
import { Authentication, AuthenticationParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  acount = mockAccountModel()
  params: AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.acount)
  }
}

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)

  return {
    sut,
    authenticationSpy
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', async () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show email error if validation fails', async () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const emailInput = sut.getByTestId('email')

    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if validation fails', async () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const passwordInput = sut.getByTestId('password')

    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if validation succeeds', async () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')

    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if validation succeeds', async () => {
    const { sut } = makeSut()

    const passwordInput = sut.getByTestId('password')

    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({ email, password })
  })
})
