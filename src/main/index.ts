import { MongoHelper } from "../entities/helpers/mongoHelper";
import { app } from "./config/app";

import { config } from "dotenv";
config();

const mongoHelper = new MongoHelper();

const mongoUrl = process.env.MONGO_URL || "http://localhost:28017";

mongoHelper.connect(mongoUrl).then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
});
