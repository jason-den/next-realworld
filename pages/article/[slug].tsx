/** 
  - Article page (URL: /#/article/article-slug-here )
  - Render markdown from server client side
  - Comments section at bottom of page
  - @todo Delete article button (only shown to article's author)
  - @todo Delete comment button (only shown to comment's author)
  
  * @todo study - scenario React re-rendering on state update (partially update content)
  e.g setArticle({ ...article!, author: profile })
  1. how important is this consideration for early stage / performance tunning stage
  2. on tunning, how, any good and clean way?
*/
import { useRouter } from 'next/dist/client/router';
import React, { useState, useEffect } from 'react';
import { Article, Comment, UserInfo, Profile } from 'types';
import { API } from 'lib/api';
import { useLoginStatus } from 'lib/hooks';
import { DEFAULT_AVATAR_URL } from 'lib/utils/constants';
import Link from 'next/link';

const constants = {
  DEFAULT_AVATAR_URL,
  PLACEHOLDER_TITLE: 'PLACEHOLDER_TITLE',
  PLACEHOLDER_DESCRIPTION: 'PLACEHOLDER_DESCRIPTION',
  PLACEHOLDER_BODY: 'PLACEHOLDER_BODY',

  PLACEHOLDER_USERNAME: 'PLACEHOLDER_USERNAME',
  PLACEHOLDER_BIO: 'PLACEHOLDER_BIO',
  PLACEHOLDER_FOLLOWING: 0,
  PLACEHOLDER_FAVORITE_COUNT: 0,
};

const useArticleFetcher = () => {
  const [article, setArticle] = useState<Article | undefined>(undefined);

  const slug = useRouter().query['slug'];
  const fetchArticle = async () => {
    if (typeof slug !== 'string' || slug.length == 0) return;
    const { article: fetchedArticle, status, errors, data } = await API.getArticle(slug);
    if (fetchedArticle) setArticle(fetchedArticle);
    else console.log({ status, errors, data });
  };
  useEffect(() => {
    fetchArticle();
  }, [slug]);
  return { article, setArticle };
};

const useCommentsFetcher = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const slug = useRouter().query['slug'];

  const fetchComments = async () => {
    if (typeof slug !== 'string' || slug.length === 0) return;
    const { comments, data, errors, status } = await API.getCommentsFromArticle(slug);
    if (comments) setComments(comments);
    if (errors) console.log({ data, errors, status, where: 'fetchComments' });
  };
  useEffect(() => {
    fetchComments();
  }, [slug]);
  return { comments, setComments };
};

/**
 * @todo format date strings
 */
export default function Page() {
  const { article, setArticle } = useArticleFetcher();
  const { comments, setComments } = useCommentsFetcher();
  const { isLogin, user } = useLoginStatus();

  const [commentBody, setCommentBody] = useState<string>('');

  /** @todo display errors on UI */
  const onPostComment = async (e: any) => {
    e.preventDefault();
    if (!article || commentBody.length === 0) return;

    const { comment, data, errors, status } = await API.creatComment(article?.slug, { body: commentBody });
    if (comment) {
      setComments([comment, ...comments]);
      setCommentBody('');
    }
    if (errors) console.log({ data, errors, status, where: 'article/slug - onPostComment' });
  };

  /** @todo test */
  const [loadingToggleFollow, setLoadingToggleFollow] = useState<boolean>(false);
  const onToggleFollow = async () => {
    const author = article?.author;
    if (!user || !author || loadingToggleFollow) return;
    setLoadingToggleFollow(true);
    const toggleFollow = author.following ? API.unfollowUser : API.followUser;
    const { profile, data, errors, status } = await toggleFollow(author.username);
    if (profile) setArticle({ ...article!, author: profile });
    if (errors) console.log({ profile, data, errors, status, where: 'onToggleFollow' });
    setLoadingToggleFollow(false);
  };

  /** @todo test */
  const [loadingToggleFav, setLoadingToggleFav] = useState<boolean>(false);
  const onToggleFav = async () => {
    if (!user || !article || loadingToggleFav) return;
    setLoadingToggleFav(true);
    const toggleFav = article.favorited ? API.favoriteArticle : API.unfavoriteArticle;
    const { article: newArticle, data, errors, status } = await toggleFav(article.slug);
    if (newArticle) setArticle(newArticle);
    if (errors) console.log({ article: newArticle, data, errors, status, where: 'onToggleFav' });
    setLoadingToggleFav(false);
  };

  const renderAuthorCard = () => (
    <div className="article-meta">
      <Link href={`/profile/${article?.author.username}`} passHref>
        <a>
          <img src={article?.author?.image || constants.DEFAULT_AVATAR_URL} />
        </a>
      </Link>
      <div className="info">
        <Link href={`/profile/${article?.author.username}`} passHref>
          <a className="author">{article?.author?.username || constants.PLACEHOLDER_USERNAME}</a>
        </Link>
        <span className="date">{article?.createdAt}</span>
      </div>
      <button
        disabled={loadingToggleFollow}
        onClick={() => onToggleFollow()}
        className="btn btn-sm btn-outline-secondary"
      >
        <i className="ion-plus-round"></i>
        &nbsp; Follow {article?.author?.username || constants.PLACEHOLDER_USERNAME}{' '}
        <span className="counter">({article?.author?.following || constants.PLACEHOLDER_FOLLOWING})</span>
      </button>
      &nbsp;&nbsp;
      <button disabled={loadingToggleFav} onClick={() => onToggleFav()} className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{' '}
        <span className="counter">({article?.favoritesCount || constants.PLACEHOLDER_FAVORITE_COUNT})</span>
      </button>
    </div>
  );

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title || constants.PLACEHOLDER_TITLE}</h1>
          {renderAuthorCard()}
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article?.description || constants.PLACEHOLDER_DESCRIPTION}</p>
            <h2 id="introducing-ionic">{article?.title || constants.PLACEHOLDER_TITLE}</h2>
            <p>{article?.body || constants.PLACEHOLDER_BODY}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">{renderAuthorCard()}</div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {isLogin && (
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    onChange={(e) => setCommentBody(e.target.value)}
                    value={commentBody}
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                  />
                </div>
                <div className="card-footer">
                  <img src={user?.image || constants.DEFAULT_AVATAR_URL} className="comment-author-img" />
                  <button onClick={(e) => onPostComment(e)} className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>
            )}

            {comments.map((comment, idx) => (
              <div key={idx} className="card">
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <Link href={`/profile/${article?.author.username}`} passHref>
                    <a href="" className="comment-author">
                      <img src={comment.author.image || constants.DEFAULT_AVATAR_URL} className="comment-author-img" />
                      &nbsp;
                      {comment.author.username}
                    </a>
                  </Link>
                  <span className="date-posted">{comment.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
