export function cors(req, resp, next) {
  resp.set("access-control-allow-origin", "*");
  resp.set("access-control-allow-methods", "*");
  resp.set("access-control-allow-headers", "*");
  next();
}
