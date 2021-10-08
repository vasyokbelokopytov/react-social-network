import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  selectIsFetching,
} from '../../../redux/selectors/users-selectors';

import { Form, Input, Select, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { FilterType } from '../../../types/types';

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
  const filter = useSelector(selectFilter);
  const isFetching = useSelector(selectIsFetching);
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
      friend: JSON.parse(filter.friend),
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

      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Form.Item name="friend">
          <Select options={friendOptions} style={{ width: 145 }}></Select>
        </Form.Item>

        <Form.Item>
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
