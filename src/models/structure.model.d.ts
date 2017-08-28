import { Field } from './field.model';

export interface Structure {
  _id: string;
  name: string;
  description: string;
  fields: Field[];
  count?: number;
}
