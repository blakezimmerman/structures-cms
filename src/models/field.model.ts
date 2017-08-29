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

export type EntryField =
  | EntryTextInput
  | EntryNumber
  | EntryCheckbox
  | EntryPicture
  | EntryUrl

export interface EntryTextInput {
  label: string;
  payload: string;
}

export interface EntryNumber {
  label: string;
  payload: string;
}

export interface EntryCheckbox {
  label: string;
  payload: string;
}

export interface EntryPicture {
  label: string;
  payload: string;
}

export interface EntryUrl {
  label: string;
  payload: string;
}
