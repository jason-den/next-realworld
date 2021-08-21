export type FormErrors = {
  [key: string]: string[];
};
export type UserInfo = {
  image?: string;
  username: string;
  bio?: string;
  email: string;
  password?: string;
};

export type FeedType = 'Your Feed' | 'Global Feed';
