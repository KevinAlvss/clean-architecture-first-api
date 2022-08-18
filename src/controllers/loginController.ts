import { HttpResponse } from "../helpers/httpResponse";

interface LoginHttpRequest {
  body: {
    email: string;
    password: string;
  };
}

export class LoginController {
  public emailValidator: any;
  public authUseCase: any;
  constructor(authUseCase, emailValidator) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator;
  }

  async login(httpRequest: LoginHttpRequest) {
    try {
      const { email, password } = httpRequest.body;

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest();
      }

      const accessToken = await this.authUseCase.auth(email, password);

      if (!accessToken) {
        return HttpResponse.unauthorized();
      }

      return HttpResponse.success({ accessToken });
    } catch (error) {
      return HttpResponse.serverError();
    }
  }
}
