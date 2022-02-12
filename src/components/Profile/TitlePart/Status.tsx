import React, { useEffect, useState } from 'react';

import { updateStatus } from '../../../features/profile/profileSlice';

import { Button, Input, Popover, Space, Typography } from 'antd';
import { useErrorMessage } from '../../../app/hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/redux';

interface Props {
  isOwner: boolean;
}

export const Status: React.FC<Props> = ({ isOwner }) => {
  const status = useAppSelector((state) => state.profile.status);
  const statusFetchingError = useAppSelector(
    (state) => state.profile.statusFetchingError
  );
  const statusUpdatingError = useAppSelector(
    (state) => state.profile.statusUpdatingError
  );
  const isLoading = useAppSelector((state) => state.profile.isStatusUpdating);

  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputValue(status ?? '');
  }, [status, isEditing]);

  useErrorMessage(statusFetchingError);
  useErrorMessage(statusUpdatingError);

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
