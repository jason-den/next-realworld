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

export type Article = {
  title: string;
  slug: string;
  body: string;
  createdAt: string; //'2021-08-21T05:17:47.234Z'
  updatedAt: string; //'2021-08-21T05:17:47.234Z'
  tagList: [];
  description: string;
  author: {
    username: string;
    bio?: string;
    image: string;
    following: false;
  };
  favorited: false;
  favoritesCount: 0;
};
