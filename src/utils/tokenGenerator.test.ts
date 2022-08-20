import jwt from "jsonwebtoken";
import { TokenGenerator } from "./tokenGenerator";

function makeSut() {
  return new TokenGenerator("my_secret");
}

describe("Token Generator", () => {
  it("Should return null if JWT returns null", async () => {
    const sut = makeSut();
    let token = await sut.generate("any_id");
    token = null;
    expect(token).toBeNull();
  });

  it("Should return a token if JWT returns token", async () => {
    const sut = makeSut();
    const token = await sut.generate("any_id");
    expect(jwt.verify(token, sut.secret)).toBe("any_id");
  });
});
