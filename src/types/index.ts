export type UserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
  verified?: boolean;
};
