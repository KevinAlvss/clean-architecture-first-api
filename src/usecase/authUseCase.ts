export class AuthUseCase {
  userEntity: any;
  encrypter: any;
  tokenGenerator: any;
  updateAccessToken: any;

  constructor({ userEntity, encrypter, tokenGenerator, updateAccessToken }) {
    this.userEntity = userEntity;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessToken = updateAccessToken;
  }

  async auth(email: string, password: string) {
    const user = await this.userEntity.load(email);

    const isValid =
      user && (await this.encrypter.compare(password, user.password));

    if (isValid) {
      const acessToken = await this.tokenGenerator.generate(user.id);
      await this.updateAccessToken.update(user.id, acessToken);
      return acessToken;
    }

    return null;
  }
}
