import { Typography } from "@mui/material";
import type { User } from "../../../types/users";
import * as S from "./styles";

const AvatarCell = ({ user }: { user: User }) => {
  const { fullName } = user;
  const initials = `${fullName.split(" ")[0][0]}${fullName.split(" ")[1]?.[0] ?? ""}`;
  return (
    <S.CellContainer>
      <S.UserAvatar>
        <Typography variant="body1">{initials}</Typography>
      </S.UserAvatar>
    </S.CellContainer>
  );
};

export { AvatarCell };
