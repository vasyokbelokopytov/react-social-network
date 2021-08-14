import React, { useState, useEffect } from 'react';
import styles from './InfoItem.module.css';

const InfoItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(props.content);

  useEffect(() => {
    setInputValue(props.content);
  }, [props.content]);

  const edit = () => {
    if (props.editable) {
      setEditMode(true);
      setInputValue(props.content);
    }
  };

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const save = () => {
    setEditMode(false);
    props.updateInfoItem(inputValue);
  };

  const close = () => {
    setEditMode(false);
  };

  return (
    <div className={styles.item}>
      <span
        className={styles.name}
        style={props.editable ? { cursor: 'pointer' } : {}}
        onClick={() => edit()}
      >
        {props.name}:{' '}
      </span>

      <span className={styles.content}>{props.content}</span>

      {props.editable && editMode && (
        <div className={styles.editor}>
          <input
            autoFocus={true}
            className={styles.input}
            value={inputValue}
            onChange={(e) => inputChangeHandler(e)}
          />
          <button className={styles.saveButton} onClick={() => save()}>
            Save
          </button>
          <div className={styles.closeButton} onClick={() => close()}>
            ✖
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoItem;
