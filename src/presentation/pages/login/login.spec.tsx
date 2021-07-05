import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'

import Login from './login'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', async () => {
    const { sut, validationStub } = makeSut()

    const errorWrap = sut.getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show email error if validation fails', async () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByTestId('email')

    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if validation fails', async () => {
    const { sut, validationStub } = makeSut()

    const passwordInput = sut.getByTestId('password')

    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if validation succeeds', async () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('email')

    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if validation succeeds', async () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = null

    const passwordInput = sut.getByTestId('password')

    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut, validationStub } = makeSut()

    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('password')
    const passwordInput = sut.getByTestId('password')

    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })
})
