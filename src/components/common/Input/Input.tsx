import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import cn from 'classnames';

import styles from './Input.module.css';

type FieldProps = FieldRenderProps<string, any>;

type OwnProps = {
  className?: string;
  element?: 'input' | 'textarea';
  title?: string;
};

type PropsType = FieldProps & OwnProps;

const Input: React.FC<PropsType> = ({
  className,
  element,
  title,
  input,
  meta,
  ...rest
}: PropsType) => {
  const errorStyles = {
    border: '1px solid rgb(247, 62, 62)',
    transition: 'border 500ms',
  };

  const hasError = meta.touched && (meta.error || meta.submitError);

  return (
    <label
      className={cn(styles.label, { [className ? className : '']: className })}
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
            {...rest}
            style={hasError ? errorStyles : {}}
          />
        )}

        {element === 'textarea' && (
          <textarea
            className={styles.textarea}
            type="text"
            {...input}
            {...rest}
            style={hasError ? errorStyles : {}}
          />
        )}
      </div>
    </label>
  );
};

export default Input;
