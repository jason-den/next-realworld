import React from 'react';
export const ArticleList = ({ articles }: { articles: any[] }) => {
  return (
    <>
      <p>ArticleList</p>
      {articles.map((item, idx) => (
        <p key={idx}>{JSON.stringify(item)}</p>
      ))}
    </>
  );
};
