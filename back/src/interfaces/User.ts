export interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  role: Role;
  id_credential: number;
}

export enum Role {
  ADMIN = "Admin",
  CLIENT = "Client",
  OWNER = "Owner",
}