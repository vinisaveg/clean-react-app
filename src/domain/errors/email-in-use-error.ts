export class EmailInUseError extends Error {
  constructor() {
    super('Esse e-mail ja esta em uso')
    this.name = 'EmailInUseError'
  }
}
