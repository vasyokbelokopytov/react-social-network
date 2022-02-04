import React from 'react';
import { signIn, signingInErrorChanged } from '../../../redux/authSlice';

import { Form, Input, Button, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './LoginForm.module.css';

import { Rule } from 'rc-field-form/lib/interface';
import { useErrorMessage } from '../../../hooks/useErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

type PropsType = {};

export const LoginForm: React.FC<PropsType> = () => {
  const captchaUrl = useAppSelector((state) => state.auth.captcha);
  const isLoading = useAppSelector((state) => state.auth.isSigningIn);
  const loggingInError = useAppSelector((state) => state.auth.signingInError);
  const dispatch = useAppDispatch();

  useErrorMessage(loggingInError, signingInErrorChanged);

  const emailRules: Rule[] = [
    { required: true, message: 'Please, input your E-mail!' },
    { type: 'email', message: 'E-mail is not valid!' },
  ];

  const passwordRules: Rule[] = [
    { required: true, message: 'Please, input your Password!' },
  ];

  const captchaRules: Rule[] = [
    { required: true, message: 'Please, input captcha!' },
  ];

  const submitHandler = ({
    email,
    password,
    rememberMe,
    captcha,
  }: FormDataType) => {
    return dispatch(signIn({ email, password, rememberMe, captcha }));
  };

  return (
    <Form
      className={styles.form}
      name="login"
      initialValues={{ rememberMe: false }}
      validateTrigger="onBlur"
      onFinish={submitHandler}
    >
      <Form.Item name="email" rules={emailRules}>
        <Input
          prefix={<UserOutlined className={styles.fieldIcon} />}
          placeholder="E-mail"
        />
      </Form.Item>

      <Form.Item name="password" rules={passwordRules}>
        <Input.Password
          prefix={<LockOutlined className={styles.fieldIcon} />}
          placeholder="Password"
        />
      </Form.Item>

      {captchaUrl && (
        <Form.Item name="captcha" rules={captchaRules}>
          <div className={styles.captchaWrapper}>
            <img className={styles.captcha} src={captchaUrl} alt="captcha" />
            <Input />
          </div>
        </Form.Item>
      )}

      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Form.Item name="rememberMe" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
