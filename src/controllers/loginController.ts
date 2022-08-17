import { HttpResponse } from "../helpers/httpResponse";

export class LoginController {
  public authUseCase: any;
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  login(httpRequest) {
    if (!httpRequest.body) {
      return HttpResponse.serverError();
    }

    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return HttpResponse.badRequest();
    }

    const accessToken = this.authUseCase.auth(email, password);
    if (!accessToken) {
      return HttpResponse.unauthorized();
    }

    return HttpResponse.success();
  }
}
