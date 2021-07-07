export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`Campo invalido: ${fieldName}`)
    this.name = 'InvalidFieldError'
  }
}
