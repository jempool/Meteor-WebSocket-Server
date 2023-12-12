import jwt from "jsonwebtoken";

declare const JsonRoutes: any;

export default function addAuthMiddleware() {
  JsonRoutes.Middleware.use(function (req, res, next) {
    const authRoutes = ["/auth/login", "/auth/signup", "/auth/refresh"];

    if (authRoutes.includes(req.url)) {
      next();
    } else {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
            JsonRoutes.sendResult(res, {
              code: 403,
              data: "Invalid token",
            });
          } else {
            req.user = user;
            next();
          }
        });
      } else {
        JsonRoutes.sendResult(res, {
          code: 401,
          data: "Token not provided",
        });
      }
    }
  });
}
