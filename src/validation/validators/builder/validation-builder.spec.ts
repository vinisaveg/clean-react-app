import { EmailValidation, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators/'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('ValidationBuilder', () => {
  test('Should return a RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return a EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()

    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return a MinLengthValidation', () => {
    const validations = ValidationBuilder.field('any_field').min(5).build()

    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})
