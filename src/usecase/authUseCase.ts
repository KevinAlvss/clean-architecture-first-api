export class AuthUseCase {
  userEntity: any;
  constructor(userEntity: any) {
    this.userEntity = userEntity;
  }

  async auth(email: string, password: string) {
    const user = await this.userEntity.load(email);

    if (!user) {
      return null;
    }

    return null;
  }
}
