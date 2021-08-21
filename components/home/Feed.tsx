import React, { useState, useEffect } from 'react';
import { FeedToggle } from 'components/home/FeedToggle';
import { Pagination } from 'components/home/Pagination';
import { ArticleList } from 'components/home/ArticleList';
import { FeedType } from 'types';

export const Feed = () => {
  const [feedType, setFeedType] = useState<FeedType>('Global Feed');
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    console.log(`TODO: feed change, start fetching data ${feedType}`);
  }, [feedType]);

  return (
    <>
      <FeedToggle {...{ feedType, setFeedType }} />
      <ArticleList {...{ articles }} />
      <Pagination />
    </>
  );
};
