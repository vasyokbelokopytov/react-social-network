import React from 'react';
import { Field } from 'react-final-form';

import styles from './ContactsFormPart.module.css';

import Input from '../../../common/Input/Input';

const ContactsFormPart = () => {
  return (
    <div className={styles.wrapper}>
      <Field<string> name="contacts.facebook">
        {(props) => (
          <Input className={styles.field} title="Facebook" {...props} />
        )}
      </Field>

      <Field<string> name="contacts.website">
        {(props) => (
          <Input className={styles.field} title="Website" {...props} />
        )}
      </Field>

      <Field<string> name="contacts.vk">
        {(props) => <Input className={styles.field} title="Vk" {...props} />}
      </Field>

      <Field<string> name="contacts.twitter">
        {(props) => (
          <Input className={styles.field} title="Twitter" {...props} />
        )}
      </Field>

      <Field<string> name="contacts.instagram">
        {(props) => (
          <Input className={styles.field} title="Instagram" {...props} />
        )}
      </Field>

      <Field<string> name="contacts.youtube">
        {(props) => (
          <Input className={styles.field} title="YouTube" {...props} />
        )}
      </Field>

      <Field<string> name="contacts.github">
        {(props) => (
          <Input className={styles.field} title="Github" {...props} />
        )}
      </Field>

      <Field<string> name="contacts.mainLink">
        {(props) => (
          <Input className={styles.field} title="Main link" {...props} />
        )}
      </Field>
    </div>
  );
};

export default ContactsFormPart;
