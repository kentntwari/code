import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  origin: "*", // This will allow access to all resources
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error if an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
}
