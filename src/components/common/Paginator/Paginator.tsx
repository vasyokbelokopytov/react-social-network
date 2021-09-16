import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
  currentPage: number;
  portionSize: number;
  totalItemsCount: number;
  pageSize: number;
  pageChangeHandler: (lastPortionPage: number) => void;
};

const Paginator: React.FC<PropsType> = (props) => {
  const [currentPortion, setCurrentPortion] = useState<number>(() => {
    return Math.ceil(props.currentPage / props.portionSize);
  });

  const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionsCount = pagesCount / props.portionSize;

  const getFirstPortionPage = (currentPortion: number) => {
    return (currentPortion - 1) * props.portionSize + 1;
  };

  const getLastPortionPage = (currentPortion: number) => {
    return currentPortion * props.portionSize;
  };

  return (
    <div className={styles.paginator}>
      {currentPortion > 1 && (
        <button
          className={cn(styles.button, styles.prevButton)}
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
                className={cn(styles.button, styles.pageButton, {
                  [styles.currentPage]: page === props.currentPage,
                })}
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
          className={cn(styles.button, styles.nextButton)}
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
