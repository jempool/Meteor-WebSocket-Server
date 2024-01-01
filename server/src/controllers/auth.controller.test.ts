import sinon from "sinon";
import { expect } from "chai";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import authController from "./auth.controller";

const user = {
  name: "",
  email: "user@example.com",
  password: "password",
};

describe("Login", function () {
  let jsonRoutesSendResultSpy: sinon.SinonSpy;
  let jwtSignStub: sinon.SinonStub;
  let userServiceStub: sinon.SinonStub;

  beforeEach(function () {
    // Set up stubs and spies
    jsonRoutesSendResultSpy = sinon.spy(global.JsonRoutes, "sendResult");
    jwtSignStub = sinon.stub(jwt, "sign").returns("mockToken" as any);
    userServiceStub = sinon.stub(userService, "getUserByEmail").returns({
      email: "user@example.com",
      password: "hashed-password",
      name: "Test User",
    });
  });

  afterEach(function () {
    jsonRoutesSendResultSpy.restore();
    sinon.restore();
  });

  it("login should authenticate user and return tokens", function () {
    const req = {
      body: {
        email: user.email,
        password: user.password,
      },
    };
    const res = {
      send: sinon.spy(),
      setHeader: sinon.spy(),
      write: sinon.spy(),
      end: sinon.spy(),
    };

    sinon.stub(bcrypt, "compareSync").returns(true);

    authController.login(req, res, () => {});

    sinon.assert.calledOnce(jsonRoutesSendResultSpy);
    const args = jsonRoutesSendResultSpy.firstCall.args;
    expect(args[0].statusCode).equal(200);
    expect(args[1].data).to.have.property("user");
    expect(args[1].data).to.have.property("accessToken");
    expect(args[1].data).to.have.property("refreshToken");
  });

  it("login should fail if credentials do not match", function () {
    const req = {
      body: {
        email: user.email,
        password: user.password,
      },
    };
    const res = {
      send: sinon.spy(),
      setHeader: sinon.spy(),
      write: sinon.spy(),
      end: sinon.spy(),
    };

    sinon.stub(bcrypt, "compareSync").returns(false);

    authController.login(req, res, () => {});

    sinon.assert.calledOnce(jsonRoutesSendResultSpy);
    const args = jsonRoutesSendResultSpy.firstCall.args;
    expect(args[0].statusCode).equal(400);
    expect(args[1].data.message).equal("Incorrect email or password.");
  });
});

describe("Sign Up", function () {
  let jsonRoutesSendResultSpy: sinon.SinonSpy;
  let bcryptCompareSyncStub: sinon.SinonStub;
  let jwtSignStub: sinon.SinonStub;

  beforeEach(function () {
    jsonRoutesSendResultSpy = sinon.spy(global.JsonRoutes, "sendResult");
    jwtSignStub = sinon.stub(jwt, "sign").returns("mockToken" as any);
  });

  afterEach(function () {
    jsonRoutesSendResultSpy.restore();
    sinon.restore();
  });

  it("signup should create new user and return tokens", function () {
    const req = { body: { ...user } };
    const res = {
      send: sinon.spy(),
      setHeader: sinon.spy(),
      write: sinon.spy(),
      end: sinon.spy(),
    };
    const newPassword = "hashed-password";
    user.password = newPassword;

    sinon.stub(userService, "getUserByEmail").returns(null);
    sinon.stub(userService, "addUser").returns(user);
    bcryptCompareSyncStub = sinon.stub(bcrypt, "genSaltSync").returns("salt");
    bcryptCompareSyncStub = sinon.stub(bcrypt, "hashSync").returns(newPassword);

    authController.signup(req, res, () => {});

    sinon.assert.calledOnce(jsonRoutesSendResultSpy);
    const args = jsonRoutesSendResultSpy.firstCall.args;

    expect(args[0].statusCode).equal(200);
    expect(args[1].data).to.have.property("user");
    expect(args[1].data.user.password).equal(newPassword);
    expect(args[1].data).to.have.property("accessToken");
    expect(args[1].data).to.have.property("refreshToken");
  });
});
