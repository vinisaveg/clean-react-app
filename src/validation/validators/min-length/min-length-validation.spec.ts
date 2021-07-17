import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value length is invalid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.datatype.string(3) })

    expect(error).toEqual(new InvalidFieldError('field'))
  })

  test('Should return falsy if value length is valid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.datatype.string(6) })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exist on schema', () => {
    const sut = makeSut(faker.random.word())

    const error = sut.validate({ [faker.random.word()]: faker.datatype.string(5) })

    expect(error).toBeFalsy()
  })
})
