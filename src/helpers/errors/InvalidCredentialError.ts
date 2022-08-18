export class InvalidCredentialError extends Error {
  constructor() {
    super("Invalid Credentials");
    this.name = "InvalidCredentialError";
  }
}
