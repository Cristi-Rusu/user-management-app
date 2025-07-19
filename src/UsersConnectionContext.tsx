import {
  createContext,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { userFromDTO, type User, type UserDTO } from "./types/users";
import { socket } from "./socket";
import type { ConnectionStatus } from "./types/socket";
import { noop } from "./utils";

export type UsersConnectionContextType = {
  connectionStatus: ConnectionStatus;
  users: User[];
  addUser: (user: UserDTO) => void;
  deleteUser: (user: User) => void;
};

const UsersConnectionContext = createContext<UsersConnectionContextType>({
  connectionStatus: "connecting",
  users: [],
  addUser: noop,
  deleteUser: noop,
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
    startTransition(() => {
      const createdAt = new Date().toISOString();
      setUsers((prev) => [
        userFromDTO(userDTO, { createdAt, idSuffix: createdAt }),
        ...prev,
      ]);
    });
  }, []);

  const onUserDeleted = useCallback((userId: string) => {
    // userId is not currently exposed by the server
    // assume userId is equivalent to the user's email for now
    setUsers((prev) => prev.filter((u) => u.email !== userId));
  }, []);

  const onUsersSync = useCallback((usersDTO: UserDTO[]) => {
    startTransition(() => {
      setUsers(
        usersDTO.map((userDTO, i) => userFromDTO(userDTO, { idSuffix: i })),
      );
    });
  }, []);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.io.on("reconnect_attempt", onReconnectAttempt);
    socket.on("user:added", onUserAdded);
    socket.on("user:deleted", onUserDeleted);
    socket.on("users:sync", onUsersSync);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.io.off("reconnect_attempt", onReconnectAttempt);
      socket.off("user:added", onUserAdded);
      socket.off("user:deleted", onUserDeleted);
      socket.off("users:sync", onUsersSync);
    };
  }, [
    onConnect,
    onDisconnect,
    onReconnectAttempt,
    onUserAdded,
    onUserDeleted,
    onUsersSync,
  ]);

  const addUser = useCallback<UsersConnectionContextType["addUser"]>(
    (userDTO) => {
      socket.emit("user:add", userDTO);
    },
    [],
  );

  const deleteUser = useCallback<UsersConnectionContextType["deleteUser"]>(
    (user) => {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      // userId should be passed to the websocket,
      // but it can not be done because the server does not expose it currently
      socket.emit("user:delete", user.email);
    },
    [],
  );

  const contextValue = useMemo<UsersConnectionContextType>(
    () => ({
      connectionStatus,
      users,
      addUser,
      deleteUser,
    }),
    [connectionStatus, users, addUser, deleteUser],
  );
  return (
    <UsersConnectionContext value={contextValue}>
      {children}
    </UsersConnectionContext>
  );
};

export { UsersConnectionContext, UsersConnectionProvider };
