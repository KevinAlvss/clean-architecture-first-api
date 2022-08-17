import { HttpResponse } from "../helpers/httpResponse";

export class LoginController {
  login(httpRequest) {
    if (!httpRequest.body) {
      return HttpResponse.serverError();
    }

    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return HttpResponse.badRequest();
    }

    return HttpResponse.success();
  }
}
