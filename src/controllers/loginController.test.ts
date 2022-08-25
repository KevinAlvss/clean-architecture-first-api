import { LoginController } from "./loginController";
import { EmailValidator } from "../utils/emailValidator";
import { UserEntity } from "../entities/userEntity";

function makeSut() {
  const authUseCaseSpy = makeAuthUseCase();
  const emailValidatorSpy = makeEmailValidator();
  const sut = new LoginController(authUseCaseSpy, emailValidatorSpy);

  return {
    sut,
    authUseCaseSpy,
    emailValidatorSpy,
  };
}

function makeAuthUseCase() {
  class AuthUseCaseSpy {
    email: string;
    password: string;
    acessToken: string | null;
    userEntity: any;
    encrypter: any;
    tokenGenerator: any;

    constructor({ userEntity, encrypter, tokenGenerator }) {
      this.userEntity = userEntity;
      this.encrypter = encrypter;
      this.tokenGenerator = tokenGenerator;
    }

    async auth(email: string, password: string) {
      this.email = email;
      this.password = password;
      return this.acessToken;
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy({
    encrypter: null,
    tokenGenerator: null,
    userEntity: null,
  });
  authUseCaseSpy.acessToken = "valid_token";
  return authUseCaseSpy;
}

function makeEmailValidator() {
  class EmailValidatorSpy {
    isEmailValid: boolean;
    email: string;

    isValid(email: string) {
      this.email = email;
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(validRegex)) {
        this.isEmailValid = true;
        return this.isEmailValid;
      }

      this.isEmailValid = false;
      return this.isEmailValid;
    }
  }

  return new EmailValidatorSpy();
}

describe("Login Router", () => {
  it("Should call AuthUseCase with correct params", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any@mail.com",
        password: "any_password",
      },
    };

    await sut.login(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  it("Should call EmailValidator with correct params", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any@mail.com",
        password: "any_password",
      },
    };

    await sut.login(httpRequest);
    expect(emailValidatorSpy.email).toBe(httpRequest.body.email);
  });

  it("Should return 401 when invalid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.acessToken = null;
    const httpRequest = {
      body: {
        email: "invalid@mail.com",
        password: "invalid_password",
      },
    };

    const httpResponse = await sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
  });

  it("Should return 400 if an invalid email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "any_password",
      },
    };

    const httpResponse = await sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return 200 when valid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.acessToken = "valid token";
    const httpRequest = {
      body: {
        email: "valid@mail.com",
        password: "valid_password",
      },
    };

    const httpResponse = await sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
