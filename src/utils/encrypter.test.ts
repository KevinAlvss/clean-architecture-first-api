class Encrypter {
  async compare(password: string, hashed_password: string) {
    return true;
  }
}

function makeSut() {
  return new Encrypter();
}

describe("Encrypter", () => {
  it("Should return true if bcrypt returns true", async () => {
    const sut = makeSut();
    const isValid = await sut.compare("any_password", "hashed_password");

    expect(isValid).toBeTruthy();
  });
});
