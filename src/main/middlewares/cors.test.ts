import request from "supertest";
import { app } from "../config/app";

describe("CORS Middleware", () => {
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
