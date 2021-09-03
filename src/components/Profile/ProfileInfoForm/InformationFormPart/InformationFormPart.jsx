import React from 'react';
import { Field } from 'react-final-form';

import styles from './InformationFormPart.module.css';

import Input from '../../../common/Input/Input';
import Checkbox from '../../../common/Checkbox/Checkbox';

const InformationFormPart = () => {
  return (
    <div className={styles.wrapper}>
      <Field name="fullName">
        {(props) => (
          <Input className={styles.field} title="Full name" {...props} />
        )}
      </Field>

      <div className={styles.checkboxWrapper}>
        <Field name="lookingForAJob" type="checkbox">
          {(props) => (
            <Checkbox
              id="lookingForAJob"
              className={styles.checkbox}
              {...props}
            />
          )}
        </Field>

        <label className={styles.checkboxLabel} htmlFor="lookingForAJob">
          I am looking for a job
        </label>
      </div>

      <Field name="lookingForAJobDescription">
        {(props) => (
          <Input
            className={styles.field}
            title="Job description"
            element="textarea"
            {...props}
          />
        )}
      </Field>

      <Field name="aboutMe">
        {(props) => (
          <Input
            className={styles.field}
            title="About me"
            element="textarea"
            {...props}
          />
        )}
      </Field>
    </div>
  );
};

export default InformationFormPart;
