type User = {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  password: string;
  role: 'admin' | 'user';
};

type UserItem = {
  id: string;
  email: string;
  name: string;
  image?: string;
  password?: string;
  role: 'admin' | 'user';
};

type SessionUser = Omit<User, 'id'> & Omit<User, 'password'>;

type GithubUser = {
  id: string;
  email: string | null;
  name: string;
  image: string;
  role: 'admin' | 'user';
};

type Post = {
  id: string;
  image?: string;
  title: string;
  body: string;
  comments: Comm[];
  date: number;
};

type Reply = {
  id: string;
  userImage: string;
  username: string;
  replyToUser: string;
  reply: string;
  date: number;
};
type Comm = {
  id: string;
  userImage: string;
  username: string;
  comment: string;
  replies: Reply[];
  date: number;
};

type BrcsLinks = { value: string; link: string }[];

type Status = 'success' | 'pending' | 'error' | 'warning' | '';

type SelectedText = {
  text: string;
  seIndexes: [number, number];
};

type ReportComment = {
  id: string;
  postId: string;
  commentId: string;
  reports: number;
  reporters: [
    {
      name: string;
      email: string;
    },
  ];
};
