import React from 'react';
import styles from './Posts.module.css';

import PostItem from './PostItem/PostItem';
import { PostType } from '../../../types/types';

type PropsType = {
  posts: Array<PostType>;
};

const Posts: React.FC<PropsType> = React.memo((props) => {
  return (
    <section className={styles.posts}>
      {props.posts.map((posts) => {
        return (
          <PostItem
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
