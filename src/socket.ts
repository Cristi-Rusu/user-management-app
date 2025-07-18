import { io } from "socket.io-client";
import { USERS_SOCKET_URL } from "./constants";

export const socket = io(USERS_SOCKET_URL);
