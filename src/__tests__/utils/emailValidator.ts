class EmailValidator {
  isValid(email: string) {
    return true;
  }
}

describe("Email Validator", () => {
  it("Should return true if validator returns true", () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("valid_email#email.com");

    expect(isEmailValid).toBe(true);
  });
});
