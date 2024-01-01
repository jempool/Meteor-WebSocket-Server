import { createServer } from "http";
import { Server as HttpServer } from "http";
import { io as clientIo, Socket } from "socket.io-client";
import startWebSocketServer from "./websockets";
import messageService from "../services/message.service";
import { Message } from "../interfaces/message.interface";
import sinon from "sinon";
import deepEqualInAnyOrder from "deep-equal-in-any-order";

import chai from "chai";
chai.use(deepEqualInAnyOrder);

const { expect } = chai;

const incomingMessage: Message = {
  message: "Hello",
  handle: "John",
};

describe("WebSocket Server", () => {
  let httpServer: HttpServer;
  let socketClient: Socket;

  beforeEach((done) => {
    httpServer = createServer();
    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;

      startWebSocketServer(httpServer);

      socketClient = clientIo(`http://localhost:${port}`);
      socketClient.on("connect", () => {
        done();
      });
    });
  });

  afterEach(() => {
    httpServer.close();
    socketClient.close();
  });

  it("should handle chat event", (done) => {
    const addMessage = sinon.spy(messageService, "addMessage");

    socketClient.on("chat", (message) => {
      expect(addMessage.calledOnce).to.be.true;
      expect(message).to.deep.equalInAnyOrder(incomingMessage);
      done();
    });

    socketClient.emit("chat", incomingMessage);
  });

  it("should handle typing event", (done) => {
    socketClient.on("typing", (message) => {
      expect(message).to.deep.equalInAnyOrder(incomingMessage);
      done();
    });

    socketClient.emit("typing", incomingMessage);
  });
});
