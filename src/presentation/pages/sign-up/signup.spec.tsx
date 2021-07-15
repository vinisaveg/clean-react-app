import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import { Helper, ValidationStub } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const sut = render(<SignUp validation={validationStub} />)

  return {
    sut
  }
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('Signup component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'errorWrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'Campo obrigatorio')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatorio')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatorio')
  })

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
