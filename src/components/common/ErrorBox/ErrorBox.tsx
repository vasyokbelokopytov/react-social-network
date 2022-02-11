import React, { useEffect, useState } from 'react';
import styles from './ErrorBox.module.css';

import closeImg from '../../assets/img/close.svg';

type PropsType = {
  error: Error;
};

const ErrorBox: React.FC<PropsType> = React.memo((props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsVisible(true);
  }, [props]);

  const close = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={styles.wrapper}
      style={isVisible ? {} : { display: 'none' }}
    >
      <div className={styles.message}>{props.error.message}</div>
      <img
        className={styles.closeBtn}
        src={closeImg}
        alt="close"
        onClick={close}
      />
    </div>
  );
});

export default ErrorBox;
