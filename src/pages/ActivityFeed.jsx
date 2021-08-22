import React from "react";

import CallItem from "../CallItem.jsx";
import SearchIcon from "../SearchIcon.jsx";

const ActivityFeed = ({ feed, searchHandler, searchText }) => {
  return (
    <div className="activityFeed">
      <div className="searchOuter">
        <SearchIcon fill="#5ca95c" />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onChange={searchHandler}
          className="search"
          value={searchText}
        />
      </div>
      {feed.length ? (
        feed.map(
          ({ id, number, color, description, time, timePeriod, date }) => (
            <CallItem
              key={id}
              id={id}
              number={number}
              color={color}
              description={description}
              time={time}
              timePeriod={timePeriod}
              date={date}
            />
          )
        )
      ) : (
        <p>No matches found!</p>
      )}
    </div>
  );
};

export default ActivityFeed;
