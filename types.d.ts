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
  date: string;
  comments: Comm[];
};

type Comm = {
  id: string;
  userImage: string;
  username: string;
  comment: string;
  date: string;
};

type BrcsLinks = { value: string; link: string }[];

type Status = 'success' | 'pending' | 'error' | 'warning' | '';