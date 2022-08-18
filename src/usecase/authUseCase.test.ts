import { AuthUseCase } from "./authUseCase";

class UserEntitySpy {
  email: string;
  user: any;

  async load(email: string) {
    this.email = email;
    return this.user;
  }
}

function makeUserEntitySpy() {
  return new UserEntitySpy();
}

function makeSut() {
  const userEntitySpy = makeUserEntitySpy();
  userEntitySpy.user = "any_user";
  const sut = new AuthUseCase(userEntitySpy);

  return {
    sut,
    userEntitySpy,
  };
}

describe("Auth UseCase", () => {
  it("Should call entity with correct email", async () => {
    const { sut, userEntitySpy } = makeSut();

    await sut.auth("any_email@email.com", "any_password");
    expect(userEntitySpy.email).toBe("any_email@email.com");
  });

  it("Should return null if invalid email is provided", async () => {
    const { sut, userEntitySpy } = makeSut();
    userEntitySpy.user = null;

    const acesstoken = await sut.auth(
      "invalid_email@email.com",
      "any_password"
    );
    expect(acesstoken).toBeNull();
  });

  it("Should return null if invalid password is provided", async () => {
    const { sut } = makeSut();

    const acesstoken = await sut.auth(
      "any_email@email.com",
      "invalid_password"
    );
    expect(acesstoken).toBeNull();
  });
});
