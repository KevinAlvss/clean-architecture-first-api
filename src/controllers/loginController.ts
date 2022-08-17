import { HttpResponse } from "../helpers/httpResponse";

interface LoginHttpRequest {
  body: {
    email: string;
    password: string;
  };
}

export class LoginController {
  public authUseCase: any;
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  async login(httpRequest: LoginHttpRequest) {
    try {
      const { email, password } = httpRequest.body;
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
