export class AuthUseCase {
  userEntity: any;
  encrypter: any;

  constructor(userEntity: any, encrypter: any) {
    this.userEntity = userEntity;
    this.encrypter = encrypter;
  }

  async auth(email: string, password: string) {
    const user = await this.userEntity.load(email);

    if (!user) {
      return null;
    }

    await this.encrypter.compare(password, user.password);
    return null;
  }
}
