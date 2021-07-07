import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

const makeSut = (minLength: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value length is invalid', () => {
    const sut = makeSut(5)

    const error = sut.validate(faker.datatype.string(3))

    expect(error).toEqual(new InvalidFieldError('field'))
  })

  test('Should return falsy if value length is valid', () => {
    const sut = makeSut(5)

    const error = sut.validate(faker.datatype.string(5))

    expect(error).toBeFalsy()
  })
})
