import type { UserDTO } from "./users";

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting";

export type ServerToClientEvents = {
  "user:added": (user: UserDTO) => void;
  "user:deleted": (userId: string) => void;
  "users:sync": (users: UserDTO[]) => void;
};

export type ClientToServerEvents = {
  "user:add": (user: UserDTO) => void;
  "user:delete": (userId: string) => void;
  "user:request-sync": () => void;
};
