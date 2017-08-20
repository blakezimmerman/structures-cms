export interface User {
  _id: string;
  userName: string;
  isAdmin: boolean;
}

export interface UserAccount extends User {
  hashedPassword: string;
}
