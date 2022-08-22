import { Db } from "mongodb";
import { MongoHelper } from "./helpers/mongoHelper";
import { UserEntity } from "./userEntity";

const mongoHelper = new MongoHelper();

let db: Db;

function makeSut() {
  const userCollection = db.collection("users");
  const sut = new UserEntity(userCollection);
  return {
    sut,
    userCollection,
  };
}

describe("User Entity", () => {
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__);
    db = mongoHelper.getDb();
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  it("Should return null if no user is found", async () => {
    const { sut } = makeSut();

    const email = "invalid_email@test.com";
    const user = await sut.getUserByEmail(email);
    expect(user).toBeNull();
  });

  it("Should return an user if user is found", async () => {
    const { sut, userCollection } = makeSut();
    const email = "valid_email@test.com";

    const insertedUser = await userCollection.insertOne({
      email,
    });

    const user = await sut.getUserByEmail(email);
    expect(user._id).toStrictEqual(insertedUser.insertedId);
  });

  it("Should update user with the given access token", async () => {
    const { sut, userCollection } = makeSut();
    const email = "valid_email@test.com";

    const insertedUser = await userCollection.insertOne({
      email,
    });

    await sut.updateAccessToken(
      JSON.stringify(insertedUser.insertedId),
      "valid_token"
    );

    const user = await userCollection.findOne({
      _id: insertedUser.insertedId,
    });

    expect(user.accessToken).toBe("valid_token");
  });
});
