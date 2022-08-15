class LoginController {
  login(httpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.password) {
      return {
        statusCode: 400,
      };
    }

    return {
      statusCode: 200,
    };
  }
}

function makeSut() {
  return new LoginController();
}

describe("Login Router", () => {
  it("Should return 400 if no email is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it("Should return 400 if no password is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: "any@mail.com",
      },
    };

    const httpResponse = sut.login(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
