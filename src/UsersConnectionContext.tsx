import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { userFromDTO, userToDTO, type User, type UserDTO } from "./types/users";
import { socket } from "./socket";
import type { ConnectionStatus } from "./types/socket";
import { noop } from "./utils";

type UsersConnectionContextType = {
  connectionStatus: ConnectionStatus;
  users: User[];
  addUser: (user: User) => void;
};

const UsersConnectionContext = createContext<UsersConnectionContextType>({
  connectionStatus: "connecting",
  users: [],
  addUser: noop,
});

type UsersConnectionProviderProps = {
  children: ReactNode;
};

const UsersConnectionProvider = ({
  children,
}: UsersConnectionProviderProps) => {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  const [users, setUsers] = useState<User[]>([]);

  const onConnect = useCallback(() => {
    setConnectionStatus("connected");
    socket.emit("user:request-sync");
  }, []);

  const onDisconnect = useCallback(() => {
    setConnectionStatus("disconnected");
  }, []);

  const onReconnectAttempt = useCallback(() => {
    setConnectionStatus("reconnecting");
  }, []);

  const onUserAdded = useCallback((userDTO: UserDTO) => {
    setUsers((prev) => [
      userFromDTO(userDTO, { createdAt: new Date().toISOString() }),
      ...prev,
    ]);
  }, []);

  const onUsersSync = useCallback((usersDTO: UserDTO[]) => {
    setUsers(
      usersDTO.map((userDTO) =>
        userFromDTO(userDTO, { createdAt: new Date().toISOString() }),
      ),
    );
  }, []);

  // TODO: remove temporary any listener
  type OnAnyEventListener = Parameters<typeof socket.onAny>[0];
  const onAnyEvent = useCallback<OnAnyEventListener>((event, ...args) => {
    console.log(event, args);
  }, []);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.io.on("reconnect_attempt", onReconnectAttempt);
    socket.on("user:added", onUserAdded);
    socket.on("users:sync", onUsersSync);
    socket.onAny(onAnyEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.io.off("reconnect_attempt", onReconnectAttempt);
      socket.off("user:added", onUserAdded);
      socket.off("users:sync", onUsersSync);
      socket.offAny(onAnyEvent);
    };
  }, [
    onConnect,
    onDisconnect,
    onAnyEvent,
    onReconnectAttempt,
    onUserAdded,
    onUsersSync,
  ]);

  const addUser = useCallback((user: User) => {
    socket.emit("user:add", userToDTO(user));
  }, []);

  const contextValue = useMemo<UsersConnectionContextType>(
    () => ({
      connectionStatus,
      users,
      addUser,
    }),
    [connectionStatus, users, addUser],
  );
  return (
    <UsersConnectionContext value={contextValue}>
      {children}
    </UsersConnectionContext>
  );
};

export { UsersConnectionContext, UsersConnectionProvider };
