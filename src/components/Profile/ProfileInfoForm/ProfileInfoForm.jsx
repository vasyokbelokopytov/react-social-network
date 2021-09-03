import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import styles from './ProfileInfoForm.module.css';

import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import ContactsFormPart from './ContactsFormPart/ContactsFormPart';
import InformationFormPart from './InformationFormPart/InformationFormPart';

const ProfileInfoForm = ({ profile, saveProfile, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveInfo = async (formData) => {
    setIsLoading(true);

    await saveProfile(formData);
    const messages = await saveProfile(formData);

    setIsLoading(false);

    if (!messages) {
      setIsEdit(false);
    }

    return messages ? { [FORM_ERROR]: messages[0] } : undefined;
  };

  return (
    <Form onSubmit={saveInfo} initialValues={profile}>
      {({ handleSubmit, submitError }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Title>Information</Title>
            <InformationFormPart />

            <Title>Contacts</Title>
            <ContactsFormPart />

            <button className={styles.submitButton}>
              Save
              {isLoading && <Loader className={styles.loader} />}
            </button>

            {submitError && (
              <div className={styles.submitError}>{submitError}</div>
            )}
          </form>
        );
      }}
    </Form>
  );
};

export default ProfileInfoForm;
