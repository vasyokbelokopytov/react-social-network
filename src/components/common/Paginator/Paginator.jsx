import React, { useState } from 'react';
import styles from './Paginator.module.css';

const Paginator = (props) => {
  const [currentPortion, setCurrentPortion] = useState(1);

  const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionsCount = pagesCount / props.portionSize;

  const getFirstPortionPage = (currentPortion) => {
    return (currentPortion - 1) * props.portionSize + 1;
  };

  const getLastPortionPage = (currentPortion) => {
    return currentPortion * props.portionSize;
  };

  return (
    <div className={styles.paginator}>
      {currentPortion > 1 && (
        <button
          className={`${styles.button} ${styles.prevButton}`}
          onClick={() => {
            setCurrentPortion(currentPortion - 1);
            props.pageChangeHandler(getLastPortionPage(currentPortion - 1));
          }}
        >
          . . .
        </button>
      )}

      <div className={styles.pageButtons}>
        {pages
          .filter((page) => {
            return (
              page >= getFirstPortionPage(currentPortion) &&
              page <= getLastPortionPage(currentPortion)
            );
          })
          .map((page) => {
            return (
              <button
                className={`${styles.button} ${styles.pageButton} ${
                  page === props.currentPage ? styles.currentPage : ''
                }`}
                key={page}
                onClick={() => props.pageChangeHandler(page)}
              >
                {page}
              </button>
            );
          })}
      </div>

      {currentPortion < portionsCount ? (
        <button
          className={`${styles.button} ${styles.nextButton}`}
          onClick={() => {
            setCurrentPortion(currentPortion + 1);
            props.pageChangeHandler(getFirstPortionPage(currentPortion + 1));
          }}
        >
          . . .
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Paginator;
