import React, { useEffect, useState } from 'react';

import {
  isProfileEditingChanged,
  updateProfile,
} from '../../features/profile/profileSlice';

import { Button, Drawer, Space, Form, Row, Col, Input, Checkbox } from 'antd';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ProfileFormData } from '../../app/types';
import { useErrorMessage } from '../../app/hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { useSuccessMessage } from '../../app/hooks/useSucceedMessage';

export const DescriptionForm: React.FC = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const isEditing = useAppSelector((state) => state.profile.isProfileEditing);
  const isLoading = useAppSelector((state) => state.profile.isProfileUpdating);
  const error = useAppSelector((state) => state.profile.profileUpdatingError);
  const succeedMessage = useAppSelector(
    (state) => state.profile.profileUpdatingSucceedMessage
  );

  const [isLookingForAJob, setIsLookingForAJob] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile) setIsLookingForAJob(profile.lookingForAJob);
    form.resetFields();
  }, [form, profile]);

  useErrorMessage(error);
  useSuccessMessage(succeedMessage);

  const checkboxChangeHandler = (e: CheckboxChangeEvent) => {
    setIsLookingForAJob(e.target.checked);
  };

  const closeHandler = () => {
    form.resetFields();
    dispatch(isProfileEditingChanged(false));
  };

  const submitHandler = (formData: ProfileFormData) => {
    console.log(formData);

    dispatch(updateProfile(formData));
  };

  if (!profile) return null;

  return (
    <Drawer
      title="Edit information"
      width={720}
      onClose={closeHandler}
      visible={isEditing}
      getContainer={false}
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

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              hidden={!isLookingForAJob}
              name="lookingForAJobDescription"
              label="Job description"
            >
              <Input.TextArea
                rows={4}
                placeholder="Describe your dream job . . ."
              />
            </Form.Item>
          </Col>
        </Row>

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
