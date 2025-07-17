export type UserRole = "Developer" | "Designer" | "Manager" | "Other";

export type User = {
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt?: string;
};
