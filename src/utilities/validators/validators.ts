export type ValidatorType = (value: undefined | string) => undefined | string;

export const required: ValidatorType = (value) => {
  return value ? undefined : 'Required field';
};

export const maxLength =
  (length: number): ValidatorType =>
  (value) =>
    value && value.length > length ? `Max length is ${length}` : undefined;

export const composeValidators =
  (...validators: Array<ValidatorType>) =>
  (value: undefined | string) =>
    validators.reduce(
      (error: undefined | string, validator) => error || validator(value),
      undefined
    );

export const trim =
  (validator: ValidatorType): ValidatorType =>
  (value) => {
    if (value === undefined) {
      return validator(value);
    }

    return validator(value.trim());
  };
