import { Prisma } from '@prisma/client';

type User = Prisma.UsersGetPayload<{}>;

type ContactInfo = Prisma.ContactInfoGetPayload<{
  include: {
    SocialMediaLinks: true;
  };
}>;

type SocialMediaLinks = Prisma.SocialMediaLinkGetPayload<{}>;

type SessionUser = Omit<User, 'password'>;

type TPost = Prisma.PostsGetPayload<{
  include: {
    Likes: true;
    Comments: {
      include: {
        Replies: true;
      };
    };
  };
}>;

type Comm = Prisma.CommentsGetPayload<{
  include: {
    Replies: true;
  };
}>;

type Reply = Prisma.RepliesGetPayload<{}>;

type BrcsLinks = { value: string; link: string }[];

type Status = 'success' | 'pending' | 'error' | 'warning' | '';

type SelectedText = {
  text: string;
  seIndexes: [number, number];
};

type ReportComment = Prisma.ReportCommentGetPayload<{
  include: {
    Reporters: true;
  };
}>;

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
  date: Date;
};
