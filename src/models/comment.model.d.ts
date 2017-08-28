import { User } from './user.model';

export interface Comment {
  comment: string;
  timestamp: Date;
  user: User;
}
