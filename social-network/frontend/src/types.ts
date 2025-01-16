type User = {
  id: string;
  name: string;
  surname: string;
  username: string;
  //adress and stuff
};

type Message = {
  id?: string;
  messagePosition: number;
  content: string;
  date: string;
  owner: string;
  target: string;
};

type Post = {
    id: string;
    content: string;
    owner: string;
}