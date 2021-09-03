import React, { useState, useEffect } from 'react';
import styles from './UserInfoItem.module.css';

import Loader from '../../../../common/Loader/Loader';
import closeImg from '../../../../../assets/img/close.svg';

const UserInfoItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const save = async () => {
    setIsLoading(true);
    await props.updateInfoItem(inputValue);
    setIsLoading(false);
    setEditMode(false);
  };

  const close = () => {
    setEditMode(false);
  };

  return (
    <div className={styles.item}>
      {(props.content || props.isOwner) && (
        <span
          className={styles.name}
          style={props.editable ? { cursor: 'pointer' } : {}}
          onClick={() => edit()}
        >
          {props.name}
          {': '}
        </span>
      )}

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

          <img
            className={styles.closeButton}
            src={closeImg}
            alt="close"
            onClick={() => close()}
          />

          {isLoading && <Loader className={styles.loader} />}
        </div>
      )}
    </div>
  );
};

export default UserInfoItem;
