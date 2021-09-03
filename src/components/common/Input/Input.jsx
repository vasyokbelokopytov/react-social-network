import React from 'react';

import styles from './Input.module.css';

const Input = ({ className, title, element, input, meta, ...props }) => {
  const errorStyles = {
    border: '1px solid rgb(247, 62, 62)',
    transition: 'border 500ms',
  };

  const hasError = meta.touched && (meta.error || meta.submitError);

  return (
    <label
      className={className ? `${styles.label} ${className}` : styles.label}
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.wrapper}>
        {hasError && (
          <div className={styles.error}>{meta.error || meta.submitError}</div>
        )}
        {(!element || element === 'input') && (
          <input
            className={styles.input}
            type="text"
            {...input}
            {...props}
            style={hasError ? errorStyles : {}}
          />
        )}

        {element === 'textarea' && (
          <textarea
            className={styles.textarea}
            type="text"
            {...input}
            {...props}
            style={hasError ? errorStyles : {}}
          />
        )}
      </div>
    </label>
  );
};

export default Input;
