import validator from "validator";

class EmailValidator {
  isValid(email: string) {
    return validator.isEmail(email);
  }
}

function makeSut() {
  return new EmailValidator();
}

describe("Email Validator", () => {
  it("Should return true if validator returns true", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid("valid_email@email.com");

    expect(isEmailValid).toBe(true);
  });

  it("Should return false if validator returns false", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid("invalid_email.com");

    expect(isEmailValid).toBe(false);
  });
});
