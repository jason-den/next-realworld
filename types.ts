export type Errors = {
  [key: string]: string[];
};

export type UserInfo = {
  username: string;
  image?: string;
  token?: string;
  bio?: string;
  email: string;
  password?: string;
};

export type Profile = {
  username: string;
  bio?: string;
  image?: string;
  following: boolean;
};

// Article object for creation
export type ArticleDataForCreate = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};
export type ArticleDataForUpdate = {
  title?: string;
  description?: string;
  body?: string;
  // tagList?: string[]; // seems not providing such feature
};

// Article JSON object from server
export type Article = {
  title: string;
  slug: string;
  body: string;
  createdAt: string; //'2021-08-21T05:17:47.234Z'
  updatedAt: string; //'2021-08-21T05:17:47.234Z'
  tagList: string[];
  description: string;
  author: Profile;
  favorited: boolean;
  favoritesCount: number;
};

export type ArticleCollection = {
  articles: Article[];
  articlesCount: number;
};

export type CommentDataForCreate = {
  body: string;
};
export type Comment = {
  id: number;
  createdAt: string; //'2016-02-18T03:22:56.637Z';
  updatedAt: string; //'2016-02-18T03:22:56.637Z';
  body: string; //'It takes a Jacobian';
  author: Profile;
};
export type Tags = string[];
