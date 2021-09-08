import React from 'react';
import cn from 'classnames';

import styles from './Title.module.css';

const Title = (props) => {
  return (
    <h1 className={cn(styles.title, { [props.className]: props.className })}>
      {props.children}
    </h1>
  );
};

export default Title;
