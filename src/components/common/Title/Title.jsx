import React from 'react';
import cn from 'classnames';

import styles from './Title.module.css';

const Title = ({ children, className }) => {
  return (
    <h1 className={cn(styles.title, { [styles.className]: className })}>
      {children}
    </h1>
  );
};

export default Title;
