import { Express } from "express";

export function setupApp(app: Express) {
  app.disable("x-powered-by");
  app.use((req, resp, next) => {
    resp.set("access-control-allow-origin", "*");
    resp.set("access-control-allow-methods", "*");
    resp.set("access-control-allow-headers", "*");
    next();
  });
}
