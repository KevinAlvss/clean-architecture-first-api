import { Db, MongoClient } from "mongodb";
import { UserEntity } from "./userEntity";

let connection: MongoClient, db: Db;

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
    connection = await MongoClient.connect(global.__MONGO_URI__);
    db = connection.db("cademeudoguinho");
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Should return null if no user is found", async () => {
    const { sut } = makeSut();

    const email = "invalid_email@test.com";
    const user = await sut.getdUserByEmail(email);
    expect(user).toBeNull();
  });

  it("Should return an user if user is found", async () => {
    const { sut, userCollection } = makeSut();
    const email = "valid_email@test.com";

    const insertedUser = await userCollection.insertOne({
      email,
    });

    const user = await sut.getdUserByEmail(email);
    expect(user._id).toStrictEqual(insertedUser.insertedId);
  });
});
