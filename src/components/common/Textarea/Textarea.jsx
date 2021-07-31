import React from 'react';

import styles from './Textarea.module.css';

const Textarea = ({ className, input, meta, ...props }) => {
  const errorStyles = {
    border: '1px solid rgb(247, 62, 62)',
    transition: 'border 500ms',
  };

  const hasError = meta.touched && meta.error;

  return (
    <div
      className={className ? `${styles.wrapper} ${className}` : styles.wrapper}
    >
      {hasError && <div className={styles.error}>{meta.error}</div>}

      <textarea
        className={styles.textarea}
        style={hasError ? errorStyles : {}}
        {...input}
        {...props}
      />
    </div>
  );
};

export default Textarea;
