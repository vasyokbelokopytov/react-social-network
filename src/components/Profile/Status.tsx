import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsStatusUpdating,
  selectStatus,
  selectStatusFetchingError,
} from '../../redux/selectors/profile-selectors';
import {
  actions as profileActions,
  updateStatus,
} from '../../redux/profile-reducer';

import { Button, Input, Popover, Space, Typography } from 'antd';
import { useErrorMessage } from '../../hooks/useErrorMessage';

type PropsType = { isOwner: boolean };

export const Status: React.FC<PropsType> = ({ isOwner }) => {
  const status = useSelector(selectStatus);
  const statusFetchingError = useSelector(selectStatusFetchingError);
  const isLoading = useSelector(selectIsStatusUpdating);

  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(status ?? '');
  }, [status, isEditing]);

  useErrorMessage(
    statusFetchingError,
    profileActions.statusFetchingErrorChanged,
    false
  );

  const isEditingChangeHandler = (isEditing: boolean) => {
    if (isOwner) {
      setIsEditing(isEditing);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 300) {
      setInputValue(e.target.value);
    }
  };

  const save = () => {
    dispatch(updateStatus(inputValue.trim()));
    setIsEditing(false);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  if (statusFetchingError) return null;

  return (
    <Popover
      visible={isEditing}
      onVisibleChange={isEditingChangeHandler}
      placement="bottomLeft"
      content={
        <Space direction="vertical">
          <Input value={inputValue} onChange={inputChangeHandler} />
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={cancel}>Cancel</Button>
            <Button type="primary" onClick={save} loading={isLoading}>
              Save
            </Button>
          </Space>
        </Space>
      }
      trigger="click"
    >
      <Typography.Text
        type="secondary"
        style={isOwner ? { cursor: 'pointer' } : { cursor: 'default' }}
      >
        {status || (isOwner && 'Your status . . .')}
      </Typography.Text>
    </Popover>
  );
};
