export interface NewUser {
  userName: string;
  password: string;
}

export interface User {
  userName: string;
  isAdmin: boolean;
}

export interface UserAccount extends User {
  _id: string;
  hashedPassword: string;
}
