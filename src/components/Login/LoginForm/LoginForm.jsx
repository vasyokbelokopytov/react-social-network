import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import styles from './LoginForm.module.css';
import Checkbox from '../../common/Checkbox/Checkbox';
import Input from '../../common/Input/Input';
import Loader from '../../common/Loader/Loader';

import { required } from '../../../utilities/validators/validators';

const LoginForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const logIn = async (data) => {
    setIsLoading(true);
    const messages = await props.logIn(
      data.email,
      data.password,
      data.rememberMe,
      data.captcha
    );
    setIsLoading(false);
    return messages ? { [FORM_ERROR]: messages[0] } : undefined;
  };

  return (
    <Form onSubmit={logIn}>
      {({ handleSubmit, submitError }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name="email" validate={required}>
              {(props) => (
                <Input className={styles.field} title="Email" {...props} />
              )}
            </Field>

            <Field name="password" validate={required}>
              {(props) => (
                <Input
                  className={styles.field}
                  type="password"
                  title="Password"
                  {...props}
                />
              )}
            </Field>

            {props.captchaUrl && (
              <div className={styles.captchaWrapper}>
                <img
                  className={styles.captcha}
                  src={props.captchaUrl}
                  alt="captcha"
                />

                <Field name="captcha" validate={required}>
                  {(props) => <Input className={styles.field} {...props} />}
                </Field>
              </div>
            )}

            <div className={styles.bottom}>
              <div className={styles.checkboxWrapper}>
                <Field name="rememberMe" type="checkbox">
                  {(props) => (
                    <Checkbox
                      id="rememberMe"
                      className={styles.checkbox}
                      {...props}
                    />
                  )}
                </Field>

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
