import { EmailValidation, RequiredFieldValidation } from '@/validation/validators/'
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
})
