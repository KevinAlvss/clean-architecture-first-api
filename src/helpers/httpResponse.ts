import { ServerError, UnauthorizedError } from "./errors";

export class HttpResponse {
  static badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error,
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new ServerError(),
    };
  }

  static success(data) {
    return {
      statusCode: 200,
      body: data,
    };
  }

  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }
}
