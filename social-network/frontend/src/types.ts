export type User = {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  hasAdmin: boolean;
};

export type Message = {
  _id?: string;
  message: string;
  timestamp: string;
  ownerId: string;
  targetId: string;
};

export type Post = {
  _id?: string;
  title: string;
  content: string;
  userId: string;
  timestamp: string;
};

export type Comment = {
  _id?: string;
  ownerId: string;
  content: string;
  timestamp: string;
  targetPostId: string;
};

export type JWTToken = {
  access_token: string;
};

export type JWTTokenResponse = {
  user: User;
  [key: string]: any;
};
