import React from 'react'
import "./CardListSkeleton.scss"
const CardListSkeleton = () => {
    const cardCount = 3;

    return (
      <div className="card-list-skeleton">
        {Array.from({ length: cardCount }).map((_, index) => (
          <div key={index} className="cardList-skeleton">
            
            <div className="card-skeleton-title"></div>
  
            <div className="card-skeleton-large-btn"></div>
  
            <div className="card-skeleton-small-btns">
              <div className="card-skeleton-small-btn"></div>
              <div className="card-skeleton-small-btn"></div>
              <div className="card-skeleton-small-btn"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default CardListSkeleton
