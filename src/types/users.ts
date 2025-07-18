export type UserRole = "Developer" | "Designer" | "Manager" | "Other";

export type UserDTO = {
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
};

export type User = UserDTO & {
  createdAt?: string;
  id: string;
};

export const userToDTO = (user: User): UserDTO => {
  const userDTO: UserDTO = {
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    department: user.department,
  };
  return userDTO;
};

export const userFromDTO = (
  userDTO: UserDTO,
  { createdAt, idSuffix }: { createdAt?: string; idSuffix: string | number },
): User => {
  const user: User = {
    id: `${userDTO.email}-${idSuffix}`,
    ...userDTO,
  };
  if (createdAt) {
    user.createdAt = createdAt;
  }
  return user;
};
