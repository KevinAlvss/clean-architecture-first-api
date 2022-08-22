import { Collection, ObjectId } from "mongodb";

export class UserEntity {
  userCollection: Collection;

  constructor(userCollection: Collection) {
    this.userCollection = userCollection;
  }

  async getUserByEmail(email: string) {
    const user = await this.userCollection.findOne({ email });
    return user;
  }

  async updateAccessToken(userId: string, accessToken: string) {
    await this.userCollection.updateOne(
      {
        _id: new ObjectId(JSON.parse(userId)),
      },
      {
        $set: {
          accessToken,
        },
      }
    );
  }
}
