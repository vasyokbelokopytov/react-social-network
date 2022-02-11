import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const history = useHistory();
  const clickHandler = () => {
    history.push('/');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={clickHandler}>
          Back Home
        </Button>
      }
    />
  );
};
