import { Validation } from '@/presentation/pages/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(fieldName: string, input: object): string {
    const validatorsList = this.validators.filter((validator) => validator.field === fieldName)

    for (const validator of validatorsList) {
      const error = validator.validate(input)

      if (error) return error.message
    }
  }
}
