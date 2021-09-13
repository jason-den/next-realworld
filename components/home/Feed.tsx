import React, { useState, useEffect } from 'react';
import { FeedToggle, DefaultFeedTypes } from 'components/home/FeedToggle';
import { Pagination } from 'components/home/Pagination';
import { ArticleList } from 'components/home/ArticleList';
import sample_articles from 'lib/articles.json';
import { TagsView } from 'components/home/TagsView';
import { Article } from 'types';

// TODO: fetch articles when feed changes
export const Feed = () => {
  const [feedType, setFeedType] = useState('Global Feed');
  useEffect(() => {
    console.log(`TODO: feed change, start fetching data ${feedType}`);

    setArticles(sample_articles as any);
  }, [feedType]);

  const [articles, setArticles] = useState<Article[]>([]);

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
