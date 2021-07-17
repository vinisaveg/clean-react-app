import faker from 'faker'

import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const field = faker.random.word()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
