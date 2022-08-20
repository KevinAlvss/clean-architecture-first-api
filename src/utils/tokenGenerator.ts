import jwt from "jsonwebtoken";

export class TokenGenerator {
  secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async generate(id: string) {
    return jwt.sign(id, this.secret);
  }
}
