import { User } from './user.interface';

export interface DeleteAdminButtonProps {
  admin: User;
  onDeleted: () => void;
}
