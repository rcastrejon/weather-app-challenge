export class UnexpectedServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnexpectedServiceError"
  }
}
