import React from 'react';

import { FeedType } from 'types';

type FeedToggleProps = {
  feedType: FeedType;
  setFeedType: React.Dispatch<React.SetStateAction<FeedType>>;
};
export const FeedToggle: React.FC<FeedToggleProps> = ({ feedType, setFeedType }) => {
  return (
    <>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a
              className={'nav-link ' + (feedType == 'Your Feed' && 'active')}
              onClick={() => setFeedType('Your Feed')}
              style={{ cursor: 'pointer' }}
            >
              Your Feed
            </a>
          </li>
          <li className="nav-item">
            <a
              className={'nav-link ' + (feedType == 'Global Feed' && 'active')}
              onClick={() => setFeedType('Global Feed')}
              style={{ cursor: 'pointer' }}
            >
              Global Feed
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
