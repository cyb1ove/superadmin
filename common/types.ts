
export enum editableFieldsNames {
  name = "name",
  email = "email",
}
  
export enum uneditableFieldsNames {
  data = "data",
}
  
export type InputNames = editableFieldsNames | uneditableFieldsNames;

export type User = {
  [key in InputNames]: string
} & {_id: string}

export type ServerUser = {
  [key in editableFieldsNames]: string
}
