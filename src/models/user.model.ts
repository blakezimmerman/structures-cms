export interface User {
  id: string;
  userName: string;
  isAdmin: boolean;
}

export interface UserAccount extends User {
  hashedPassword: string;
}
