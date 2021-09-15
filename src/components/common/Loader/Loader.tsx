import React from 'react';
import loader from '../../../assets/img/loader.svg';

type PropsType = {
  className?: string;
};

const Loader: React.FC<PropsType> = (props) => {
  return (
    <img
      className={props.className ? props.className : ''}
      src={loader}
      alt="loader"
    />
  );
};

export default Loader;
