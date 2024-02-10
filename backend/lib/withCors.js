import { middleware } from "@/pages/api/middleware";

export function withCors(handler) {
  return async (req, res) => {
    // Run the CORS middleware
    await middleware(req, res);

    // Continue with the route handler
    return handler(req, res);
  };
}
