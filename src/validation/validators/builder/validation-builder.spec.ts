import faker from 'faker'

import { EmailValidation, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators/'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('ValidationBuilder', () => {
  test('Should return a RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()

    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return a EmailValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()

    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return a MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.datatype.number(5)

    const validations = ValidationBuilder.field(field).min(length).build()

    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.datatype.number(5)

    const validations = ValidationBuilder.field(field).required().email().min(length).build()

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, length)
    ])
  })
})
