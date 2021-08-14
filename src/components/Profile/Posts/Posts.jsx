import React from 'react';
import styles from './Posts.module.css';

import Item from './Item/Item';

const Posts = React.memo((props) => {
  return (
    <section className={styles.posts}>
      {props.posts.map((posts) => {
        return (
          <Item
            key={posts.id}
            name={posts.name}
            date={posts.date}
            text={posts.text}
          />
        );
      })}
    </section>
  );
});

export default Posts;
