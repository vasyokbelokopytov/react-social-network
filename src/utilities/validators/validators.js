export const required = (value) => {
  return value ? undefined : 'Required field';
};

export const maxLength = (length) => (value) =>
  value && value.length > length ? `Max length is ${length}` : undefined;

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export const trim = (validator) => (value) => {
  if (value === undefined) {
    return validator(value);
  }

  return validator(value.trim());
};
