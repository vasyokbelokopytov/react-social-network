import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../hooks/usePrevious';

import { updateProfile } from '../../redux/profile-reducer';
import { selectUserAuthProfile } from '../../redux/selectors/auth-selectors';
import {
  selectIsProfileUpdating,
  selectProfileUpdatingError,
} from '../../redux/selectors/profile-selectors';

import {
  Button,
  Drawer,
  Space,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  message,
} from 'antd';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ProfileFormDataType } from '../../types/types';

type PropsType = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

export const DescriptionForm: React.FC<PropsType> = ({
  isEditing,
  setIsEditing,
}) => {
  const isLoading = useSelector(selectIsProfileUpdating);
  const prevIsLoading = usePrevious(isLoading);
  const error = useSelector(selectProfileUpdatingError);
  const profile = useSelector(selectUserAuthProfile);
  const [isLookingForAJob, setIsLookingForAJob] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) setIsLookingForAJob(profile.lookingForAJob);
  }, [profile]);

  useEffect(() => {
    if (prevIsLoading && !isLoading && !error) {
      message.success('Update profile succeed!');
      setIsEditing(false);
    } else if (prevIsLoading && !isLoading && error) {
      message.error(error.message);
    }
  }, [prevIsLoading, isLoading, error, setIsEditing]);

  const checkboxChangeHandler = (e: CheckboxChangeEvent) => {
    setIsLookingForAJob(e.target.checked);
  };

  const closeHandler = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const submitHandler = (formData: ProfileFormDataType) => {
    dispatch(updateProfile(formData));
  };

  if (!profile) return null;

  return (
    <Drawer
      title="Edit information"
      width={720}
      onClose={closeHandler}
      visible={isEditing}
    >
      <Form
        form={form}
        layout="vertical"
        name="profile"
        initialValues={profile}
        requiredMark={false}
        onFinish={submitHandler}
        validateTrigger="onBlur"
      >
        <Row gutter={16} align="bottom">
          <Col span={12}>
            <Form.Item
              name="fullName"
              label="Name"
              rules={[
                { required: true, message: 'Please, enter your name!' },
                { whitespace: true, message: 'Name cannot be empty!' },
              ]}
            >
              <Input placeholder="Your name . . ." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lookingForAJob" valuePropName="checked">
              <Checkbox
                checked={isLookingForAJob}
                onChange={checkboxChangeHandler}
              >
                I am looking for a job
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {isLookingForAJob && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="lookingForAJobDescription"
                label="Job description"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Describe your deam job . . ."
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="aboutMe" label="About me">
              <Input.TextArea rows={4} placeholder="Describe yourself . . ." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'mainLink']}
              label="Main Link"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'github']}
              label="Github"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'vk']}
              label="VK"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'instagram']}
              label="Instagram"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'facebook']}
              label="Facebook"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'twitter']}
              label="Twitter"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'youtube']}
              label="YouTube"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['contacts', 'website']}
              label="Your site"
              rules={[{ whitespace: true, message: 'Url cannot be empty!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Space
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="middle"
        >
          <Button onClick={closeHandler} disabled={isLoading}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Save
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
