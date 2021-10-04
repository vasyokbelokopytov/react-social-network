import React from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  selectIsFetching,
} from '../../../redux/selectors/users-selectors';

import { Input, Select, Space } from 'antd';
import { Button } from 'antd';
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
      onSubmit={submitHandler}
      initialValues={{ term: filter.term, friend: String(filter.friend) }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Field<string> name="term">
              {({ input }) => <Input {...input} />}
            </Field>

            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Field<FriendValueType> name="friend" options={friendOptions}>
                {({ input }) => (
                  <Select
                    {...input}
                    options={friendOptions}
                    style={{ width: 145 }}
                  />
                )}
              </Field>

              <Button
                type="primary"
                icon={<SearchOutlined />}
                disabled={isFetching}
                htmlType="submit"
              >
                Search
              </Button>
            </Space>
          </Space>
        </form>
      )}
    </Form>
  );
};
