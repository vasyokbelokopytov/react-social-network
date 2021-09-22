import React from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../../redux/selectors/users-selectors';
import { FilterType } from '../../../types/types';
import Input from '../../common/Input/Input';

import styles from './UsersSearchForm.module.css';

type FormType = {
  term: string;
  friend: null | boolean;
};

type PropsType = {
  filterChangeHandler: (filter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = (props) => {
  const filter = useSelector(selectFilter);

  const normalizeFilterValues = (
    value: 'null' | 'true' | 'false' | boolean | null
  ) => {
    switch (value) {
      case 'null':
        return null;
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return value;
    }
  };

  const submitHandler = (filter: FormType) => {
    props.filterChangeHandler(filter);
  };

  return (
    <Form
      onSubmit={submitHandler}
      initialValues={{ term: filter.term, friend: filter.friend }}
    >
      {({ handleSubmit, submitting }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field<string> name="term" component={Input} />
          <Field<null | boolean | string>
            name="friend"
            component="select"
            parse={normalizeFilterValues}
          >
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    </Form>
  );
};

export default UsersSearchForm;
