export class AuthUseCase {
  userEntity: any;
  encrypter: any;
  tokenGenerator: any;

  constructor(userEntity: any, encrypter: any, tokenGenerator: any) {
    this.userEntity = userEntity;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
  }

  async auth(email: string, password: string) {
    const user = await this.userEntity.load(email);

    if (user && (await this.encrypter.compare(password, user.password))) {
      const acessToken = await this.tokenGenerator.generate(user.id);
      return acessToken;
    }

    return null;
  }
}
