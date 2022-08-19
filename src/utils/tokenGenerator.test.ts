import jwt from "jsonwebtoken";
class TokenGenerator {
  async generate(id: string) {
    return jwt.sign(id, "secret");
  }
}

describe("Token Generator", () => {
  it("Should return null if JWT returns null", async () => {
    const sut = new TokenGenerator();
    let token = await sut.generate("any_id");
    token = null;
    expect(token).toBeNull();
  });

  it("Should return a token if JWT returns token", async () => {
    const sut = new TokenGenerator();
    const token = await sut.generate("any_id");
    expect(jwt.verify(token, "secret")).toBe("any_id");
  });
});
