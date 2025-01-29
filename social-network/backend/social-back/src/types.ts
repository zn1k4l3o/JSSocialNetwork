export type ReturnedUser = {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  hasAdmin: boolean;
  _id: string;
};

export class CreatePostDTO {
  title: string;
  content: string;
  timestamp: string;
  userId: string;
}
