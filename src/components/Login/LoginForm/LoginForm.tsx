import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import styles from './LoginForm.module.css';
import Checkbox from '../../common/Checkbox/Checkbox';
import Input from '../../common/Input/Input';
import Loader from '../../common/Loader/Loader';

import { required } from '../../../utilities/validators/validators';
import { FormReturnType } from '../../../types/types';

type PropsType = {
  captchaUrl: string | null;

  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
  ) => FormReturnType;
};

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

const LoginForm: React.FC<PropsType> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logIn = async (formData: FormDataType) => {
    setIsLoading(true);
    const messages = await props.logIn(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
    setIsLoading(false);
    return messages ? { [FORM_ERROR]: messages[0] } : undefined;
  };

  return (
    <Form onSubmit={logIn}>
      {({ handleSubmit, submitError }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field<string>
              component={Input}
              validate={required}
              name="email"
              className={styles.field}
              title="Email"
            />

            <Field<string>
              component={Input}
              validate={required}
              name="password"
              className={styles.field}
              title="Password"
              type="password"
            />

            {props.captchaUrl && (
              <div className={styles.captchaWrapper}>
                <img
                  className={styles.captcha}
                  src={props.captchaUrl}
                  alt="captcha"
                />

                <Field<string>
                  component={Input}
                  name="captcha"
                  validate={required}
                  className={styles.field}
                />
              </div>
            )}

            <div className={styles.bottom}>
              <div className={styles.checkboxWrapper}>
                <Field<boolean>
                  initialValue={false}
                  component={Checkbox}
                  id="rememberMe"
                  className={styles.checkbox}
                  name="rememberMe"
                  type="checkbox"
                />

                <label className={styles.checkboxLabel} htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <button className={styles.submitButton}>
                Log In
                {isLoading && <Loader className={styles.loader} />}
              </button>
            </div>

            {submitError && (
              <div className={styles.submitError}>{submitError}</div>
            )}
          </form>
        );
      }}
    </Form>
  );
};

export default LoginForm;
