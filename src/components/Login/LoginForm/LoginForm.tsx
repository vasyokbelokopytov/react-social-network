import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../../redux/auth-reducer';
import {
  selectCaptchaUrl,
  selectIsLoggingInProcessing,
  selectLoggingInError,
} from '../../../redux/selectors/auth-selectors';

import { Form, Input, Button, Checkbox, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './LoginForm.module.css';

import { Rule } from 'rc-field-form/lib/interface';

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

type PropsType = {};

export const LoginForm: React.FC<PropsType> = () => {
  const captchaUrl = useSelector(selectCaptchaUrl);
  const isLoading = useSelector(selectIsLoggingInProcessing);
  const loggingInError = useSelector(selectLoggingInError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggingInError) message.error(loggingInError.message);
  }, [loggingInError]);

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
    return dispatch(logIn(email, password, rememberMe, captcha));
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
