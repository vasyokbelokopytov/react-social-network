import React, { useState } from 'react';
import styles from './Checkbox.module.css';
import checkmark from '../../../assets/img/check.svg';
import { FieldRenderProps } from 'react-final-form';

type FieldProps = FieldRenderProps<boolean, any>;

type OwnProps = {
  className?: string;
};

type PropsType = FieldProps & OwnProps;

const Checkbox: React.FC<PropsType> = ({
  className,
  input: { value, ...input },
  ...rest
}: PropsType) => {
  const [isFocused, setIsFocused] = useState(false);

  const newCheckboxStyles = {
    backgroundColor: input.checked ? '#b9eff6' : 'inherit',
    border: isFocused ? '1px solid #727595' : '',
  };

  type CheckmarkStylesType = {
    visibility: 'visible' | 'hidden';
  };

  const checkmarkStyles: CheckmarkStylesType = {
    visibility: input.checked ? 'visible' : 'hidden',
  };

  const onFocusHandler = () => {
    setIsFocused(true);
    input.onFocus();
  };

  const onBlurHandler = () => {
    setIsFocused(false);
    input.onBlur();
  };

  return (
    <div className={className}>
      <label className={styles.newCheckbox} style={newCheckboxStyles}>
        <input
          className={styles.oldCheckbox}
          type="checkbox"
          {...input}
          {...rest}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <img
          className={styles.checkmark}
          src={checkmark}
          alt="checkmark"
          style={checkmarkStyles}
        />
      </label>
    </div>
  );
};

export default Checkbox;
