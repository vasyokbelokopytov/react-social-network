import React from 'react';
import loader from '../../../assets/img/loader.svg';

const Loader = (props) => {
  return (
    <img
      className={props.className ? props.className : ''}
      src={loader}
      alt="loader"
    />
  );
};

export default Loader;
