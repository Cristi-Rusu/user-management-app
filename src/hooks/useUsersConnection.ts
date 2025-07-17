import { useContext } from "react";
import { UsersConnectionContext } from "../UsersConnectionContext";

const useUsersConnection = () => {
  return useContext(UsersConnectionContext);
};

export { useUsersConnection };
