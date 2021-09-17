/**
API Spec https://github.com/gothinkster/realworld/tree/main/api
*/
import axios from 'axios';
import { BASE_URL } from 'lib/utils/constants';
import { mutate } from 'swr';

import {
  Errors,
  UserInfo,
  Profile,
  Article,
  Comment,
  CommentDataForCreate,
  ArticleDataForCreate,
  ArticleDataForUpdate,
  ArticleCollection,
} from 'types';

type BaseResponse = {
  data?: any;
  errors?: Errors;
  status?: number;
};

type GetArticlesParams = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};
type Endpoints = {
  getProfile: (username: string) => Promise<BaseResponse & { profile?: Profile }>;
  followUser: (username: string) => Promise<BaseResponse & { profile?: Profile }>;
  unfollowUser: (username: string) => Promise<BaseResponse & { profile?: Profile }>;
  getArticle: (slug: string) => Promise<BaseResponse & { article?: Article }>;
  createArticle: (article: ArticleDataForCreate) => Promise<BaseResponse & { article?: Article }>;
  updateArticle: (slug: string, article: ArticleDataForUpdate) => Promise<BaseResponse & { article?: Article }>;
  deleteArticle: (slug: string) => Promise<BaseResponse>;
  getArticles: (params: GetArticlesParams) => Promise<BaseResponse & { articleCollection?: ArticleCollection }>;
  feedArticles: (limit?: number, offset?: number) => Promise<BaseResponse & { articleCollection?: ArticleCollection }>;

  creatComment: (articleSlug: string, comment: CommentDataForCreate) => Promise<BaseResponse & { comment?: Comment }>;
  deleteComment: (slug: string, id: string) => Promise<BaseResponse>;
  getCommentsFromArticle: (articleSlug: string) => Promise<BaseResponse & { comments?: Comment[] }>;
  favoriteArticle: (slug: string) => Promise<BaseResponse & { article?: Article }>;
  unfavoriteArticle: (slug: string) => Promise<BaseResponse & { article?: Article }>;
  getTags: () => Promise<BaseResponse & { tags?: string[] }>;
};

const getBaseConfig = () => ({ headers: { 'Access-Control-Allow-Origin': '*' } });
/***
 * @throws error when "window.localStorage.getItem('user')" is undefined.
 */
const getAuthorizedConfig = () => {
  const currentUser: any = JSON.parse(window.localStorage.getItem('user')!);
  const token = currentUser!.token;
  return { headers: { Authorization: `Token ${encodeURIComponent(token)}`, 'Access-Control-Allow-Origin': '*' } };
};

/** 
GET /api/profiles/:username
Authentication optional, returns a Profile 
*/
const getProfile: Endpoints['getProfile'] = async (username) => {
  if (typeof username != 'string' || username.length == 0)
    return { errors: { username: ['username cannot be empty'] } };

  try {
    const { data, status } = await axios.get(`${BASE_URL}/profiles/${username}`, getBaseConfig());
    if (status == 200) {
      const profile: Profile = data.profile;
      return { data, status, profile };
    } else return { errors: { message: ['Fail to get profile'] }, data, status };
  } catch (error: any) {
    return { errors: error?.response?.data as Errors };
  }
};

/** 
POST /api/profiles/:username/follow 
Authentication required, returns a Profile 
*/
const followUser: Endpoints['followUser'] = async (username) => {
  try {
    const { data, status } = await axios.post(`${BASE_URL}/profiles/${username}/follow`, {}, getAuthorizedConfig());
    return { profile: data.profile, status, data };
  } catch (error) {
    return { errors: { msg: ['followUser - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/** 
DELETE /api/profiles/:username/follow
Authentication required, returns a Profile
*/
const unfollowUser: Endpoints['unfollowUser'] = async (username) => {
  try {
    const { data, status } = await axios.delete(`${BASE_URL}/profiles/${username}/follow`, getAuthorizedConfig());
    return { profile: data.profile, status, data };
  } catch (error) {
    return { errors: { msg: ['unfollowUser - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
GET /api/articles/:slug
No authentication required, will return single article
*/
const getArticle: Endpoints['getArticle'] = async (slug) => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/articles/${slug}`, getBaseConfig());
    return { article: data.article, data, status };
  } catch (error) {
    return { errors: { msg: ['getArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};
/**
 * POST /api/articles
 * Authentication required, will return an Article
 * @todo test
 */
const createArticle: Endpoints['createArticle'] = async (article) => {
  try {
    const { data, status } = await axios.post(`${BASE_URL}/articles`, article, getAuthorizedConfig());
    return { article: data.article as Article, data, status };
  } catch (error) {
    return { errors: { msg: ['createArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
PUT /api/articles/:slug
Authentication required, returns the updated Article
Optional fields: title, description, body
The slug also gets updated when the title is changed
* @todo test
*/
const updateArticle: Endpoints['updateArticle'] = async (slug, article) => {
  try {
    const { data, status } = await axios.put(`${BASE_URL}/articles/${slug}`, article, getAuthorizedConfig());
    return { article: data.article as Article, data, status };
  } catch (error) {
    return { errors: { msg: ['updateArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
Delete Article
DELETE /api/articles/:slug
Authentication required
* @todo test
*/
const deleteArticle: Endpoints['deleteArticle'] = async (slug) => {
  try {
    const { data, status } = await axios.delete(`${BASE_URL}/articles/${slug}`, getAuthorizedConfig());
    return { data, status };
  } catch (error) {
    return { errors: { msg: ['deleteArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/** 
GET /api/articles
Authentication optional, will return multiple articles, ordered by most recent first, provides query parameter

Filter by tag: ?tag=AngularJS
Filter by author: ?author=jake
Favorited by user: ?favorited=jake
Limit number of articles (default is 20): ?limit=20
Offset/skip number of articles (default is 0): ?offset=0
*/
const getArticles: Endpoints['getArticles'] = async (params) => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/articles`, { params });
    return { articleCollection: data, status };
  } catch (error) {
    return { errors: { msg: ['getArticlesError - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
GET /api/articles/feed
Can also take limit and offset query parameters like List Articles
Authentication required, will return multiple articles created by followed users, ordered by most recent first.
* @todo test
*/
const feedArticles: Endpoints['feedArticles'] = async (limit, offset) => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/articles/feed`, {
      params: { limit, offset },
      ...getAuthorizedConfig(),
    });
    return { articleCollection: data, data, status };
  } catch (error) {
    return { errors: { msg: ['feedArticles - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
POST /api/articles/:slug/comments
Authentication required, returns the created Comment
*/
const creatComment: Endpoints['creatComment'] = async (slug, comment) => {
  try {
    currentUser: any = JSON.parse(window.localStorage.getItem('user')!);
    const token = currentUser!.token;
    const { data, status } = await axios.post(`${BASE_URL}/articles/${slug}/comments`, comment, {
      headers: { Authorization: `Token ${encodeURIComponent(token)}`, 'Access-Control-Allow-Origin': '*' },
    });
    return { comment: data.comment as Comment, status, data };
  } catch (error) {
    return { errors: { msg: ['creatComment - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
DELETE /api/articles/:slug/comments/:id
Authentication required
*/
const deleteComment: Endpoints['deleteComment'] = async (slug, id) => {
  try {
    const { data, status } = await axios.delete(`${BASE_URL}/articles/${slug}/comments/${id}`, getAuthorizedConfig());
    return { data, status };
  } catch (error) {
    return { errors: { msg: ['creatComment - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
GET /api/articles/:slug/comments
Authentication optional, returns multiple comments
*/
const getCommentsFromArticle: Endpoints['getCommentsFromArticle'] = async (slug) => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/articles/${slug}/comments`, getBaseConfig());
    return { comments: data.comments, data, status };
  } catch (error) {
    return { errors: { msg: ['getCommentsFromArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
POST /api/articles/:slug/favorite
Authentication required, returns the Article
* @todo test
*/
const favoriteArticle: Endpoints['favoriteArticle'] = async (slug) => {
  try {
    const { data, status } = await axios.post(`${BASE_URL}/articles/${slug}/favorite`, {}, getAuthorizedConfig());
    return { article: data.article as Article, data, status };
  } catch (error) {
    return { errors: { msg: ['favoriteArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
DELETE /api/articles/:slug/favorite
Authentication required, returns the Article
* @todo test
*/
const unfavoriteArticle: Endpoints['unfavoriteArticle'] = async (slug) => {
  try {
    const { data, status } = await axios.delete(`${BASE_URL}/articles/${slug}/favorite`, getAuthorizedConfig());
    return { data, status };
  } catch (error) {
    return { errors: { msg: ['unfavoriteArticle - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

/**
GET /api/tags
No authentication required, returns a List of Tags
* @todo test
*/
const getTags: Endpoints['getTags'] = async () => {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/tags`);
    return { tags: data.tags, data, status };
  } catch (error) {
    return { errors: { msg: ['getTags - ' + (error as any)?.message, JSON.stringify(error)] } };
  }
};

interface Auth {
  login: (email: string, password: string) => Promise<BaseResponse>;
}

export const Auth = {
  login: async (email: string, password: string) => {
    let user = undefined;

    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/users/login`,
        { user: { email, password } },
        getBaseConfig(),
      );
      if (status == 200 && data?.user) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data.user);
        user = data!.user;
        return { user, status };
      }
      return { error: 'Failed to login' };
    } catch (error) {
      return { error };
    }
  },

  signup: async (username: string, email: string, password: string) => {
    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/users`,
        { user: { username, email, password } },
        getBaseConfig(),
      );
      if (status == 200) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data.user);
        return { user: data!.user, status };
      }
      return { errors: [{ message: 'Failed to register' }] };
    } catch (error: any) {
      return { errors: error?.response?.data };
    }
  },
  save: async (user: UserInfo) => {
    try {
      const { data, status } = await axios.put(`${BASE_URL}/user`, { user }, getAuthorizedConfig());
      if (status == 200) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data.user);
        return { user: data!.user, status };
      }
      return { errors: [{ message: 'Failed to update user' }], status };
    } catch (error: any) {
      return { errors: error?.response?.data?.errors, status: error?.response?.status };
    }
  },
};

export const API = {
  getProfile,
  followUser,
  unfollowUser,
  getArticles,
  feedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  creatComment,
  getCommentsFromArticle,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
  getTags,
};
