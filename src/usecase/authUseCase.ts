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

    if (!isValid) return null;

    const acessToken = await this.tokenGenerator.generate(user.id);
    await this.userEntity.updateAccessToken(user.id, acessToken);
    return acessToken;
  }
}
