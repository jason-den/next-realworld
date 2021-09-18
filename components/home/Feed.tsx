import React, { useState, useEffect } from 'react';
import { FeedToggle } from 'components/home/FeedToggle';
import { Pagination } from 'components/home/Pagination';
import { ArticleList } from 'components/home/ArticleList';
import { TagsView } from 'components/home/TagsView';
import { Article } from 'types';
import { API } from 'lib/api';

// TODO: fetch articles when feed changes
export const Feed = () => {
  const [feedType, setFeedType] = useState('Global Feed');
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    if (feedType == 'Global Feed') {
      const { articleCollection, data, errors, status } = await API.getArticles({ limit: 20 });
      if (articleCollection) setArticles(articleCollection.articles);
      else console.log({ data, errors, status, callee: 'Feed-fetchArticles' });
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [feedType]);

  let tags = ['programming', 'javascript', 'emberjs', 'angularjs', 'react', 'mean', 'node', 'rails'];

  return (
    <div className="row">
      <div
        className="col-md-9"
        children={
          <>
            <FeedToggle {...{ feedType, setFeedType }} />
            <ArticleList {...{ articles }} />
            <Pagination />
          </>
        }
      />
      <div className="col-md-3" children={<TagsView tags={tags} onTagClick={(tag: string) => setFeedType(tag)} />} />
    </div>
  );
};
