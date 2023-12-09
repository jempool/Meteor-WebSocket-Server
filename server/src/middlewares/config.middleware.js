import { WebApp } from 'meteor/webapp';

export default function addConfigMiddleware() {
  // Listen to incoming HTTP requests, (server only)
  WebApp.rawConnectHandlers.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    next();
  });
}
