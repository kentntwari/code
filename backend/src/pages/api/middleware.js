import Cors from "cors";

const allowedMethods = process.env.ALLOWED_METHODS.split(",");

const cors = Cors({
  origin: function (origin, callback) {
    if (process.env.ALLOWED_ORIGINS.split(",").indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: allowedMethods,
  optionsSuccessStatus: 200,
});

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

export async function middleware(req, res) {
  await runMiddleware(req, res, cors);
}
