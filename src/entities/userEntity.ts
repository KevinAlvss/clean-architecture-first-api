import { Collection } from "mongodb";

export class UserEntity {
  userCollection: Collection;

  constructor(userCollection: Collection) {
    this.userCollection = userCollection;
  }

  async getdUserByEmail(email: string) {
    const user = await this.userCollection.findOne({ email });
    return user;
  }
}
