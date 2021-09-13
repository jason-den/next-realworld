/*
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- 
*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import sample_articles from 'lib/articles.json';
import { Article } from 'types';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const slug = router.query['slug'];
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    setArticle(sample_articles[0] as any);
  }, [slug]);

  const toggleFavorite = (article: Article) => {
    // get the current user
    console.log(article);
  };
  const toggleFollow = (article: Article) => {
    // request change follow/unfollow user
    console.log(article);
  };
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          {article && (
            <div className="article-meta">
              <Link href={'/profile/' + encodeURIComponent(article?.author.username)} passHref>
                <a style={{ color: '#536b53' }}>
                  <img src={article.author?.image} />
                </a>
              </Link>
              <div className="info">
                <Link href={'/profile/' + encodeURIComponent(article.author.username)} passHref>
                  <a className="author">{article.author.username}</a>
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleFollow(article)}>
                <i className="ion-plus-round"></i>
                &nbsp; Follow {article.author.username}
                {/* <span className="counter">(10)</span> */}
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary" onClick={() => toggleFavorite(article)}>
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
