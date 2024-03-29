type User = {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  password: string;
  role: 'admin' | 'user';
};

type ContactInfo = {
  address?: string;
  number?: string;
  contactMail?: string;
  socialMediaLinks?: { label: string; link: string }[];
};

type UserItem = {
  id: string;
  email: string;
  name: string;
  image?: string;
  password?: string;
  contactInfo?: ContactInfo;
  role: 'admin' | 'user';
};

type SessionUser = Omit<User, 'password'>;

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
  likes: { email: string; name: string }[];
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
  replyId: string;
  reporters: {
    name: string;
    email: string;
  }[];
};

type RepCommUI = {
  id: string;
  pathId: {
    postId: string;
    commentId: string;
    replyId: string | null;
  };
  userImage: string;
  username: string;
  comment: string;
  reporters: {
    name: string;
    email: string;
  }[];
  date: number;
};
