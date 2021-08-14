import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import styles from './LoginForm.module.css';
import Checkbox from '../../common/Checkbox/Checkbox';
import Input from '../../common/Input/Input';

import { required } from '../../../utilities/validators/validators';

const LoginForm = (props) => {
  const logIn = async (data) => {
    const messages = await props.logIn(
      data.email,
      data.password,
      data.rememberMe
    );
    return messages ? { [FORM_ERROR]: messages[0] } : undefined;
  };

  return (
    <Form onSubmit={logIn}>
      {({ handleSubmit, submitError }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name="email" validate={required}>
              {(props) => (
                <Input title="Email" className={styles.field} {...props} />
              )}
            </Field>

            <Field name="password" validate={required}>
              {(props) => (
                <Input
                  title="Password"
                  className={styles.field}
                  type="password"
                  {...props}
                />
              )}
            </Field>

            <div className={styles.bottom}>
              <div className={styles.checkboxWrapper}>
                <Field name="rememberMe" type="checkbox">
                  {(props) => (
                    <Checkbox
                      id="rememberMe"
                      className={styles.checkbox}
                      size={25}
                      {...props.input}
                    />
                  )}
                </Field>

                <label className={styles.checkboxLabel} htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <button className={styles.submitButton}>Log In</button>
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
