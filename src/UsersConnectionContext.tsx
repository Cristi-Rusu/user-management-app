import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { USERS_SOCKET_URL } from "./constants";
import type { User } from "./types/users";
import { fakeUsers } from "./mocks/fakeUsers";

type UsersConnectionContextType = {
  readyState: ReadyState;
  users: User[];
};

const UsersConnectionContext = createContext<UsersConnectionContextType>({
  readyState: ReadyState.UNINSTANTIATED,
  users: [],
});

type UsersConnectionProviderProps = {
  children: ReactNode;
};

const UsersConnectionProvider = ({
  children,
}: UsersConnectionProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const { readyState, lastMessage } = useWebSocket(USERS_SOCKET_URL, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    // Exponential Backoff: attemptNumber will be 0 the first time it attempts to reconnect,
    // so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds
    // until the maximum number of attempts is reached
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
  });

  // isInitialized is only used to mock users until connection issue is solved
  const isInitialized = useRef(false);
  useEffect(() => {
    // mock some data until WebSocket connection issue is solved
    if (!isInitialized.current) {
      isInitialized.current = true;
      setUsers(fakeUsers);
      console.log("Initialization: ", fakeUsers);
    }
    // TODO: implement functionality after connection issue is solved
    // if (lastMessage !== null) {
    // }
  }, [lastMessage]);

  const contextValue = useMemo<UsersConnectionContextType>(
    () => ({
      readyState,
      users,
    }),
    [readyState, users],
  );
  return (
    <UsersConnectionContext value={contextValue}>
      {children}
    </UsersConnectionContext>
  );
};

export { UsersConnectionContext, UsersConnectionProvider };
