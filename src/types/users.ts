export type UserRole = "Developer" | "Designer" | "Manager" | "Other";

export type UserDTO = {
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
};

export type User = UserDTO & {
  createdAt?: string;
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
  { createdAt }: { createdAt?: string } = {},
): User => {
  const user: User = userDTO;
  if (createdAt) {
    user.createdAt = createdAt;
  }
  return user;
};
