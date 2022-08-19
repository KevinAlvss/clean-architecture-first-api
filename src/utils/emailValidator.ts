import validator from "validator";

export class EmailValidator {
  isValid(email: string) {
    return validator.isEmail(email);
  }
}
