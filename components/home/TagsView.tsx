import React from 'react';
import styles from 'styles/Home.module.css';
import Link from 'next/link';
type TagsViewProps = { tags: string[]; onTagClick: (tag: string) => void };
export const TagsView: React.FC<TagsViewProps> = ({ tags, onTagClick }) => {
  return (
    <div className={styles.sidebar}>
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags.map((tag, idx) => (
          <Link href="/" passHref key={idx}>
            <a onClick={() => onTagClick(tag)} className="tag-pill tag-default" children={tag} />
          </Link>
        ))}
      </div>
    </div>
  );
};
