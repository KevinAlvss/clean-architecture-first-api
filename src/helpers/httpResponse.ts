export class HttpResponse {
  static badRequest() {
    return {
      statusCode: 400,
    };
  }

  static serverError() {
    return {
      statusCode: 500,
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
    };
  }
}
