import { Field } from './field.model';

export interface Structure {
  name: string;
  slug: string;
  description: string;
  fields: Field[];
}
