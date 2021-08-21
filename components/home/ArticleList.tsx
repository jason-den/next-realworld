import React from 'react';
import Link from 'next/link';

import { Article } from 'types';

export const ArticleList = ({ articles }: { articles: Article[] }) => {
  const toggleFavorite = (article: Article) => {
    // get the current user
    console.log(article);
  };

  return (
    <>
      {articles.map((item, idx) => (
        <div key={idx} className="article-preview">
          <div className="article-meta">
            <Link href={'/profile/' + encodeURIComponent(item.author.username)} passHref>
              <a style={{ color: '#536b53' }}>
                <img src={item.author?.image} />
              </a>
            </Link>
            <div className="info">
              <Link href={'/profile/' + encodeURIComponent(item.author.username)} passHref>
                <a className="author">{item.author.username}</a>
              </Link>
              <span className="date">{item.createdAt}</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={() => toggleFavorite(item)}>
              <i className="ion-heart"></i> {item.favoritesCount}
            </button>
          </div>
          <Link href={'/article/' + item.slug} passHref>
            <a className="preview-link">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <span>Read more...</span>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};
