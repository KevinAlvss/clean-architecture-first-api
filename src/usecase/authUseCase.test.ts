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

function makeEncrypter() {
  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.isValid = true;
  return encrypterSpy;
}

function makeUserEntity() {
  return new UserEntitySpy();
}

function makeSut() {
  const userEntitySpy = makeUserEntity();
  userEntitySpy.user = {
    password: "hashedPassword",
  };
  const encrypterSpy = makeEncrypter();
  const sut = new AuthUseCase(userEntitySpy, encrypterSpy);

  return {
    sut,
    userEntitySpy,
    encrypterSpy,
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
});