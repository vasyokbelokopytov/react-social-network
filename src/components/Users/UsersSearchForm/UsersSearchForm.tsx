import React, { useEffect } from 'react';

import { Form, Input, Select, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { FilterType } from '../../../types/types';
import { useAppSelector } from '../../../hooks/redux';

type FriendValueType = 'null' | 'true' | 'false';

type OptionsType<value> = Array<{
  value: value;
  label: string;
}>;

type FormType = {
  term: string;
  friend: FriendValueType;
};

type PropsType = {
  onSubmit: (filter: FilterType) => void;
};

export const UsersSearchForm: React.FC<PropsType> = (props) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const filter = useAppSelector((state) => state.users.filter);
  const isFetching = useAppSelector((state) => state.users.isFetching);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form, filter]);

  const friendOptions: OptionsType<FriendValueType> = [
    { value: 'null', label: 'All' },
    { value: 'true', label: 'Only followed' },
    { value: 'false', label: 'Only unfollowed' },
  ];

  const submitHandler = async (filter: FormType) => {
    const normalizedFilter = {
      ...filter,
      friend: isAuth ? JSON.parse(filter.friend) : null,
    };

    props.onSubmit(normalizedFilter);
  };

  return (
    <Form
      form={form}
      name="users"
      onFinish={submitHandler}
      initialValues={{ term: filter.term, friend: String(filter.friend) }}
    >
      <Form.Item name="term">
        <Input placeholder="Search users . . ." />
      </Form.Item>

      <Space
        style={{
          width: '100%',
          justifyContent: isAuth ? 'space-between' : 'flex-end',
        }}
      >
        {isAuth && (
          <Form.Item name="friend" noStyle>
            <Select options={friendOptions} style={{ width: 145 }}></Select>
          </Form.Item>
        )}

        <Form.Item noStyle>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            disabled={isFetching}
            htmlType="submit"
          >
            Search
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
