import { AuthUseCase } from "./authUseCase";

class UserEntitySpy {
  email: string;
  password: string;
  user: any;

  async load(email: string) {
    this.email = email;
    return this.user;
  }
}

class EncrypterSpy {
  password: string;
  hashedPassword: string;
  isValid: boolean;

  async compare(password: string, hashedPassword: string) {
    this.password = password;
    this.hashedPassword = hashedPassword;
    return this.isValid;
  }
}

class TokenGeneratorSpy {
  userId: string;
  accessToken: string;

  async generate(userId: string) {
    this.userId = userId;
    return this.accessToken;
  }
}

function makeEncrypter() {
  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.isValid = true;
  return encrypterSpy;
}

function makeUserEntity() {
  return new UserEntitySpy();
}

function makeTokenGenerator() {
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  tokenGeneratorSpy.accessToken = "any_token";
  return tokenGeneratorSpy;
}

function makeSut() {
  const userEntitySpy = makeUserEntity();
  userEntitySpy.user = {
    id: "any_id",
    password: "hashedPassword",
  };
  const encrypterSpy = makeEncrypter();
  const tokenGeneratorSpy = makeTokenGenerator();
  const sut = new AuthUseCase({
    userEntity: userEntitySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
  });

  return {
    sut,
    userEntitySpy,
    encrypterSpy,
    tokenGeneratorSpy,
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
    const { sut, encrypterSpy } = makeSut();
    encrypterSpy.isValid = false;

    const acesstoken = await sut.auth(
      "any_email@email.com",
      "invalid_password"
    );
    expect(acesstoken).toBeNull();
  });

  it("Should call  Encrypter with correct values", async () => {
    const { sut, userEntitySpy, encrypterSpy } = makeSut();
    await sut.auth("any_email@email.com", "any_password");

    expect(encrypterSpy.password).toBe("any_password");
    expect(encrypterSpy.hashedPassword).toBe(userEntitySpy.user.password);
  });

  it("Should call TokenGenerator with correct userId", async () => {
    const { sut, userEntitySpy, tokenGeneratorSpy } = makeSut();
    await sut.auth("valid_email@email.com", "valid_password");

    expect(tokenGeneratorSpy.userId).toBe(userEntitySpy.user.id);
  });

  it("Should return access token if correct credentias are provided", async () => {
    const { sut, tokenGeneratorSpy } = makeSut();
    const accessToken = await sut.auth(
      "valid_email@email.com",
      "valid_password"
    );

    expect(accessToken).toBe(tokenGeneratorSpy.accessToken);
  });
});
