import { Express } from "express";
import { cors } from "../middlewares/cors";

export function setupApp(app: Express) {
  app.disable("x-powered-by");
  app.use(cors);
}
