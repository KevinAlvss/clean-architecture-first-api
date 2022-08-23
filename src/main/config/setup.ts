import { Express } from "express";

export function setupApp(app: Express) {
  app.disable("x-powered-by");
}
