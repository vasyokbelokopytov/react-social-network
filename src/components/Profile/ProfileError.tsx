import { Button, Result } from 'antd';
import React from 'react';

interface Props {
  error: string | null;
  isLoading: boolean;
  loadProfile: () => void;
}

export const ProfileError: React.FC<Props> = ({
  error,
  isLoading,
  loadProfile,
}) => {
  return (
    <Result
      status="error"
      title="Unable to load profile"
      subTitle={error}
      extra={[
        <Button
          type="primary"
          key="fetchProfile"
          onClick={loadProfile}
          loading={isLoading}
        >
          Try again
        </Button>,
      ]}
    />
  );
};
