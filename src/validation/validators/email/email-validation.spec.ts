import faker from 'faker'

import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'

const makeSut = (): EmailValidation => new EmailValidation(faker.random.word())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()

    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()

    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})
