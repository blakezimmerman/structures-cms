export enum FieldType {
  TextInput,
  Number,
  Checkbox,
  Picture,
  Url
}

export interface Field {
  label: string;
  type: FieldType
}

export type EntryField =
  | EntryTextInput
  | EntryNumber
  | EntryCheckbox
  | EntryPicture
  | EntryUrl

export interface EntryTextInput {
  label: string;
  text: string;
}

export interface EntryNumber {
  label: string;
  number: number;
}

export interface EntryCheckbox {
  label: string;
  checked: boolean;
}

export interface EntryPicture {
  label: string;
  title: string;
  path: string;
}

export interface EntryUrl {
  label: string;
  url: string;
}
