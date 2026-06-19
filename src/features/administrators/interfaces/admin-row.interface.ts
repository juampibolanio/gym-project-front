import { User } from "./user.interface";

export interface AdminRowProps {
  admin: User;
  isCurrentUser: boolean;
}
