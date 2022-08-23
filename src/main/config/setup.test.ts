import request from "supertest";
import { app } from "./app";

describe("App Setup", () => {
  it("Should disable x-powered-by header", async () => {
    app.get("/test-x-powered-by", (req, resp) => {
      resp.send("");
    });

    const response = await request(app).get("/");
    expect(response.header["x-powered-by"]).toBeUndefined();
  });

  it("Should eneable CORS", async () => {
    app.get("/test-cors", (req, resp) => {
      resp.send("");
    });

    const response = await request(app).get("/");
    expect(response.header["access-control-allow-origin"]).toBe("*");
    expect(response.header["access-control-allow-methods"]).toBe("*");
    expect(response.header["access-control-allow-headers"]).toBe("*");
  });
});
