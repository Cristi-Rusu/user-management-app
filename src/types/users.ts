export type UserRole = "developer" | "designer" | "manager" | "other";

export type User = {
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt: string;
};
