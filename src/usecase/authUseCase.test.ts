class AuthUseCase {
  userEntity: UserEntitySpy;
  constructor(userEntity: UserEntitySpy) {
    this.userEntity = userEntity;
  }

  async auth(email: string, password: string) {
    const user = await this.userEntity.load(email);

    if (!user) {
      return null;
    }
  }
}

class UserEntitySpy {
  email: string;
  async load(email: string) {
    this.email = email;
    return null;
  }
}

function makeUserEntitySpy() {
  return new UserEntitySpy();
}

function makeSut() {
  const userEntitySpy = makeUserEntitySpy();
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

  it("Should return null if UserEntity returns null", async () => {
    const { sut } = makeSut();

    const acesstoken = await sut.auth(
      "invalid_email@email.com",
      "any_password"
    );
    expect(acesstoken).toBe(null);
  });
});
