import { createContext, type ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { USERS_SOCKET_URL } from "./constants";

const UsersConnectionContext = createContext({
  readyState: ReadyState.UNINSTANTIATED,
});

type UsersConnectionProviderProps = {
  children: ReactNode;
};

const UsersConnectionProvider = ({
  children,
}: UsersConnectionProviderProps) => {
  const { readyState } = useWebSocket(USERS_SOCKET_URL, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    // Exponential Backoff: attemptNumber will be 0 the first time it attempts to reconnect,
    // so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds
    // until the maximum number of attempts is reached
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
  });

  return (
    <UsersConnectionContext value={{ readyState }}>
      {children}
    </UsersConnectionContext>
  );
};

export { UsersConnectionContext, UsersConnectionProvider };
