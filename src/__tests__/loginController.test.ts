import { LoginController } from "../controllers/loginController";

function makeSut() {
  class AuthUseCaseSpy {
    email: string;
    password: string;
    acessToken: string | null;
    async auth(email: string, password: string) {
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
