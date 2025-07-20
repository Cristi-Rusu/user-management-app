import { io, Socket } from "socket.io-client";
import { USERS_SOCKET_URL } from "./constants";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./types/socket";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(USERS_SOCKET_URL);
