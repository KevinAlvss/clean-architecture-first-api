import { InvalidCredentialError } from "../helpers/errors";
import { HttpResponse } from "../helpers/httpResponse";
import { EmailValidator } from "../utils/emailValidator";
import { AuthUseCase } from "../usecase/authUseCase";

interface LoginHttpRequest {
  body: {
    email: string;
    password: string;
  };
}

export class LoginController {
  public emailValidator: EmailValidator;
  public authUseCase: AuthUseCase;
  constructor(authUseCase: AuthUseCase, emailValidator: EmailValidator) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator;
  }

  async login(httpRequest: LoginHttpRequest) {
    try {
      const { email, password } = httpRequest.body;

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidCredentialError());
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
