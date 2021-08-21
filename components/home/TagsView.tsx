import React from 'react';
import styles from 'styles/Home.module.css';
import Link from 'next/link';

type TagsViewProps = { tags: string[] };
export const TagsView: React.FC<TagsViewProps> = ({ tags }) => {
  return (
    <div className={styles.sidebar}>
      <p>Popular Tags</p>
      {/* className={styles.sidebar_p} */}

      <div className="tag-list">
        {tags.map((tag, idx) => (
          <Link href="" passHref key={idx}>
            <a className="tag-pill tag-default" children={tag} />
          </Link>
        ))}
      </div>
    </div>
  );
};
