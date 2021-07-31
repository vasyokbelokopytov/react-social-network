import React, { useState } from 'react';
import styles from './Checkbox.module.css';
import checkmark from '../../../assets/img/check.svg';

const Checkbox = ({ className, size, onFocus, onBlur, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const newCheckboxStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: props.checked ? '#b9eff6' : 'inherit',
    border: isFocused ? '1px solid #727595' : '',
  };

  const checkmarkStyles = {
    visibility: props.checked ? 'visible' : 'hidden',
  };

  const onFocusHandler = () => {
    setIsFocused(true);
    onFocus();
  };

  const onBlurHandler = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <div className={className}>
      <label className={styles.newCheckbox} style={newCheckboxStyles}>
        <input
          className={styles.oldCheckbox}
          type="checkbox"
          {...props}
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
