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

    this.authUseCase.auth(email, password);
    return HttpResponse.unauthorized();
  }
}
