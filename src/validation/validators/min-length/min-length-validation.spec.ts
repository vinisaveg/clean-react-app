// import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if value length is invalid', () => {
    const sut = new MinLengthValidation('field', 5)

    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError('field'))
  })
})
