import validator from "validator";

export class EmailValidator {
  isEmailValid: boolean;
  email: string;

  isValid(email: string) {
    this.email = email;

    if (validator.isEmail(email)) {
      this.isEmailValid = true;
      return this.isEmailValid;
    }

    this.isEmailValid = false;
    return this.isEmailValid;
  }
}
