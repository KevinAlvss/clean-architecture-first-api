export class AuthUseCase {
  userEntity: any;
  encrypter: any;
  tokenGenerator: any;

  constructor({ userEntity, encrypter, tokenGenerator }) {
    this.userEntity = userEntity;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
  }

  async auth(email: string, password: string) {
    const user = await this.userEntity.load(email);

    const isValid =
      user && (await this.encrypter.compare(password, user.password));

    if (isValid) {
      const acessToken = await this.tokenGenerator.generate(user.id);
      return acessToken;
    }

    return null;
  }
}
