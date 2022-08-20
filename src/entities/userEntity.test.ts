class UserEntity {
  async getdUserByEmail(email: string) {
    return null;
  }
}

describe("User Entity", () => {
  it("Should return null if no user is found", async () => {
    const sut = new UserEntity();
    const email = "any_email@test.com";
    const user = await sut.getdUserByEmail(email);
    expect(user).toBeNull();
  });
});
