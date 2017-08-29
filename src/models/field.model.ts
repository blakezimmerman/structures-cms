export enum FieldType {
  TextInput = 1,
  Number = 2,
  Checkbox = 3,
  TextArea = 4,
  Picture = 5,
  Url = 6
}

export interface Field {
  label: string;
  type: FieldType
}

export interface EntryField {
  type: FieldType;
  label: string;
  payload: string;
}
