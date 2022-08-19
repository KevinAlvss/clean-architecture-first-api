import { Encrypter } from "./encrypter";

function makeSut() {
  return new Encrypter();
}

describe("Encrypter", () => {
  it("Should return true if bcrypt returns true", async () => {
    const sut = makeSut();
    const isValid = await sut.compare(
      "any_value",
      "$2b$04$JESYgW.2GqhFxaieXC1wKOnnahs1L/.SyjLMxYAz0ktYWA.FAHpF2"
    );

    expect(isValid).toBeTruthy();
  });

  it("Should return false if bcrypt returns false", async () => {
    const sut = makeSut();
    const isValid = await sut.compare("any_value", "hashed_value");

    expect(isValid).toBeFalsy();
  });
});
