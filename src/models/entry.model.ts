import { User } from './user.model';
import { EntryField } from './field.model';
import { Comment } from './comment.model';

export interface Entry {
  _id: string;
  type: string;
  title: string;
  blurb: string;
  author: User;
  dateCreated: Date;
  fields: EntryField[];
  comments: Comment[];
}
