import { Typography } from "@mui/material";
import type { User } from "../../../types/users";
import { CellContainer, UserAvatar } from "./styles";

const AvatarCell = ({ user }: { user: User }) => {
  const { fullName } = user;
  const initials = `${fullName.split(" ")[0][0]}${fullName.split(" ")[1]?.[0] ?? ""}`;
  return (
    <CellContainer>
      <UserAvatar>
        <Typography variant="body1">{initials}</Typography>
      </UserAvatar>
    </CellContainer>
  );
};

export { AvatarCell };
