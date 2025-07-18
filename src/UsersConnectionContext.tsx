import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { User } from "./types/users";
import { fakeUsers } from "./mocks/fakeUsers";
import { socket } from "./socket";
import type { ConnectionStatus } from "./types/socket";

type UsersConnectionContextType = {
  connectionStatus: ConnectionStatus;
  users: User[];
};

const UsersConnectionContext = createContext<UsersConnectionContextType>({
  connectionStatus: "connecting",
  users: [],
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
  }, []);

  const onDisconnect = useCallback(() => {
    setConnectionStatus("disconnected");
  }, []);

  const onReconnectAttempt = useCallback(() => {
    setConnectionStatus("reconnecting");
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
    socket.onAny(onAnyEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.io.off("reconnect_attempt", onReconnectAttempt);
      socket.offAny(onAnyEvent);
    };
  }, [onConnect, onDisconnect, onAnyEvent, onReconnectAttempt]);

  // isInitialized is only used to mock users until connection issue is solved
  const isInitialized = useRef(false);
  useEffect(() => {
    // mock some data until WebSocket connection issue is solved
    if (!isInitialized.current) {
      isInitialized.current = true;
      setUsers(fakeUsers);
    }
  }, []);

  const contextValue = useMemo<UsersConnectionContextType>(
    () => ({
      connectionStatus,
      users,
    }),
    [connectionStatus, users],
  );
  return (
    <UsersConnectionContext value={contextValue}>
      {children}
    </UsersConnectionContext>
  );
};

export { UsersConnectionContext, UsersConnectionProvider };
