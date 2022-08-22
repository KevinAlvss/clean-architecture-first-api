import { MongoClient, Db } from "mongodb";

export class MongoHelper {
  private connection: MongoClient;
  private db: Db;

  async connect(uri: any) {
    this.connection = await MongoClient.connect(uri);
    this.db = this.connection.db("cademeudoguinho");
  }

  async disconnect() {
    await this.connection.close();
  }

  getDb() {
    return this.db;
  }
}
