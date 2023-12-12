import { WebApp } from "meteor/webapp";
import { Server } from "socket.io";

import {
  WEBSOCKETS_CHAT_EVENT,
  WEBSOCKETS_TYPING_EVENT,
} from "../utils/constants";
import messageService from "../services/message.service";
import { Message } from "../interfaces/message.interface";

export default function startWebSocketServer() {
  const httpServer = WebApp.httpServer;

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`${new Date()} - New connection ${socket.id}`);

    // Listening for chat event
    socket.on(WEBSOCKETS_CHAT_EVENT, function (data: Message) {
      messageService.addMessage(data);
      io.sockets.emit(WEBSOCKETS_CHAT_EVENT, data);
    });

    // Listening for typing event
    socket.on(WEBSOCKETS_TYPING_EVENT, function (data: Message) {
      io.sockets.emit(WEBSOCKETS_TYPING_EVENT, data);
      socket.broadcast.emit(WEBSOCKETS_TYPING_EVENT, data);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });
}
