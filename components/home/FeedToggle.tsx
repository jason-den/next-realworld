import React from 'react';
import { useState, useEffect } from 'react';

export const DefaultFeedTypes = ['Your Feed', 'Global Feed'];

type FeedToggleProps = {
  feedType: string;
  setFeedType: React.Dispatch<React.SetStateAction<string>>;
};
export const FeedToggle: React.FC<FeedToggleProps> = ({ feedType, setFeedType }) => {
  const [feedTypes, setFeedTypes] = useState(DefaultFeedTypes);
  const renderFeedString = (feedString: string) => {
    if (undefined === DefaultFeedTypes.find((v) => v == feedString)) return `# ${feedString}`;
    else return feedString;
  };

  useEffect(() => {
    if (undefined === DefaultFeedTypes.find((v) => v == feedType)) {
      setFeedTypes([...DefaultFeedTypes, feedType]);
    } else {
      setFeedTypes(DefaultFeedTypes);
    }
  }, [feedType]);

  return (
    <>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {feedTypes.map((item, idx) => (
            <li className="nav-item" key={idx}>
              <a
                className={'nav-link ' + (feedType == item && 'active')}
                onClick={() => setFeedType(item)}
                children={renderFeedString(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
