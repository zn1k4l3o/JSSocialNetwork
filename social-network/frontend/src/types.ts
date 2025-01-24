export type User = {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  hasAdmin: boolean;
};

export type Message = {
  id?: string;
  messagePosition: number;
  content: string;
  date: string;
  owner: string;
  target: string;
};

export type Post = {
  id: string;
  content: string;
  owner: string;
};

export type JWTToken = {
  access_token: string;
};

export type JWTTokenResponse = {
  user: User;
  [key: string]: any;
};
