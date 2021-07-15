import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string, field: string): CompareFieldsValidation =>
  new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()

    const sut = makeSut(faker.random.word(), field)
    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const valueToCompare = faker.random.word()

    const sut = makeSut(valueToCompare, field)
    const error = sut.validate(valueToCompare)

    expect(error).toBeFalsy()
  })
})