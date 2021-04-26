import React from 'react';
import c from './Posts.module.css';

import Item from './Item/Item';

const Posts = () => {
  return (
    <section className={c.posts}>
      <Item
        name="Vasiliy Belokopytov"
        date="20:10 PM · 16.04.20"
        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, eveniet asperiores obcaecati maxime explicabo minima, quas labore aspernatur dolorem consequatur quis dolore commodi, numquam adipisci. Laudantium est impedit at, quasi dignissimos nemo consequuntur animi molestias nesciunt, aspernatur magni consequatur fugiat! Dolore, eligendi? At distinctio rerum inventore corrupti officiis quae quis necessitatibus, fuga aperiam nesciunt ex debitis. Architecto, provident labore! Laboriosam quibusdam architecto tempora perspiciatis. Maxime inventore soluta nobis eius rerum, eos obcaecati. Placeat ab ducimus officia dolor sed ut commodi provident libero et rerum dignissimos cumque repudiandae, vero maiores ad, temporibus natus voluptas odio iste accusantium, a deleniti quo esse."
      />
      <Item name="Zheka Chikalov" date="18:21 PM · 21.04.21" text="Some text" />
      <Item name="Timur Budyukov" date="20:10 PM · 16.04.20" text="А шо" />
    </section>
  );
};

export default Posts;
