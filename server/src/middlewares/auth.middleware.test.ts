import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import addAuthMiddleware from "./auth.middleware";

declare const JsonRoutes: {
  sendResult(res: any, options: { code: number; data: any }): void;
  Middleware: {
    use(...args: any[]): void;
  };
};

describe("Auth Middleware", function () {
  let sandbox: sinon.SinonSandbox;
  let jsonRoutesSendResultStub: sinon.SinonStub;
  let jwtVerifyStub: sinon.SinonStub;
  let nextSpy: sinon.SinonSpy;
  let jsonRoutesMiddlewareUseSpy: sinon.SinonSpy;
  let middlewareFunction: Function;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    // Setup spies and stubs
    jwtVerifyStub = sandbox.stub(jwt, "verify");
    nextSpy = sandbox.spy();

    jsonRoutesSendResultStub = sandbox.stub(JsonRoutes, "sendResult");
    jsonRoutesMiddlewareUseSpy = sandbox.stub();
    JsonRoutes.sendResult = jsonRoutesSendResultStub;
    JsonRoutes.Middleware = { use: jsonRoutesMiddlewareUseSpy };

    // Adding the middleware which will call the stub, capturing the function
    addAuthMiddleware();
    middlewareFunction = jsonRoutesMiddlewareUseSpy.args[0][0];
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should call next for auth routes", function () {
    const req = { url: "/auth/login" };
    const res = {};

    middlewareFunction(req, res, nextSpy);
    sandbox.assert.calledOnce(nextSpy);
  });

  it("should call sendResult with 401 if token not provided", function () {
    const req = { url: "/non-auth-route", headers: {} };
    const res = {};

    middlewareFunction(req, res, nextSpy);

    sandbox.assert.calledWith(jsonRoutesSendResultStub, res, {
      code: 401,
      data: "Token not provided",
    });
  });

  it("should call next with user information if token is valid", function (done) {
    const req: any = {
      url: "/non-auth-route",
      headers: { authorization: "Bearer valid-token" },
      user: null,
    };
    const res = {};
    const mockUser = { id: "user-id" };

    jwtVerifyStub.callsFake((token, secret, callback) => {
      callback(null, mockUser);
    });

    middlewareFunction(req, res, function () {
      expect(req.user).to.equal(mockUser);
      done();
    });
  });

  it("should call sendResult with 403 if token is invalid", function () {
    const req = {
      url: "/non-auth-route",
      headers: { authorization: "Bearer invalid-token" },
    };
    const res = {};

    jwtVerifyStub.callsFake((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    middlewareFunction(req, res, nextSpy);

    sandbox.assert.calledWith(jsonRoutesSendResultStub, res, {
      code: 403,
      data: "Invalid token",
    });
  });
});
