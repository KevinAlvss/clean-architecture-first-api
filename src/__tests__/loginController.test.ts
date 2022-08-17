import { LoginController } from "../controllers/loginController";

function makeSut() {
  class AuthUseCaseSpy {
    email: string;
    password: string;
    acessToken: string | null;
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.acessToken;
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy();
  authUseCaseSpy.acessToken = "valid token";

  const sut = new LoginController(authUseCaseSpy);

  return {
    sut,
    authUseCaseSpy,
  };
}

describe("Login Router", () => {
  it("Should return 400 if no email is provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return 400 if no password is provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any@mail.com",
      },
    };

    const httpResponse = sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return 500 if httpRequest has no body", () => {
    const { sut } = makeSut();
    const httpResponse = sut.login({});
    expect(httpResponse.statusCode).toBe(500);
  });

  it("Should call AuthUseCase with correct params", () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any@mail.com",
        password: "any_password",
      },
    };

    sut.login(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  it("Should return 401 when invalid credentials are provided", () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.acessToken = null;
    const httpRequest = {
      body: {
        email: "invalid@mail.com",
        password: "invalid_password",
      },
    };

    const httpResponse = sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
  });

  it("Should return 200 when valid credentials are provided", () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.acessToken = "valid token";
    const httpRequest = {
      body: {
        email: "valid@mail.com",
        password: "valid_password",
      },
    };

    const httpResponse = sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
