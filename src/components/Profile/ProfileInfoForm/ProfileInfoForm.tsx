import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import styles from './ProfileInfoForm.module.css';

import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import ContactsFormPart from './ContactsFormPart/ContactsFormPart';
import InformationFormPart from './InformationFormPart/InformationFormPart';

import closeImg from '../../../assets/img/close.svg';
import { ProfileType, UserContactsType } from '../../../types/types';

type PropsType = {
  profile: ProfileType;
  saveProfile: (profile: ProfileType) => Promise<Array<string> | undefined>;
  setIsEdit: (isEdit: boolean) => void;
};

export type FormDataType = {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: null | string;
  aboutMe: null | string;
  contacts: UserContactsType;
};

const ProfileInfoForm: React.FC<PropsType> = ({
  profile,
  saveProfile,
  setIsEdit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const close = () => {
    setIsEdit(false);
  };

  const saveInfo = async (formData: FormDataType) => {
    const newProfile = {
      ...profile,
      ...formData,
    };
    setIsLoading(true);

    const messages = await saveProfile(newProfile);

    setIsLoading(false);

    if (!messages) {
      setIsEdit(false);
    }

    return messages ? { [FORM_ERROR]: messages[0] } : undefined;
  };

  return (
    <Form onSubmit={saveInfo} initialValues={profile}>
      {({ handleSubmit, submitError, submitting }) => {
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Title>Information</Title>
            <InformationFormPart />

            <Title>Contacts</Title>
            <ContactsFormPart />

            <div className={styles.buttonsWrapper}>
              <img
                className={styles.closeBtn}
                src={closeImg}
                alt="close"
                onClick={close}
              />
              <button className={styles.submitButton} disabled={submitting}>
                Save
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

export default ProfileInfoForm;
