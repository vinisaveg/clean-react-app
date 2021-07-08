import { RequiredFieldValidation } from '@/validation/validators/'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('ValidationBuilder', () => {
  test('Should return a RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
