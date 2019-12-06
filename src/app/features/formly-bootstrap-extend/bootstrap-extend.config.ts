import { ConfigOption, FormlyFieldConfig } from '@ngx-formly/core';
import {
  FormlyFieldInput,
  FormlyFieldCheckbox,
  FormlyFieldRadio,
  FormlyFieldSelect,
  FormlyFieldTextArea,
  FormlyFieldMultiCheckbox,
  FormlyFieldUUID
} from './types/types';
import { FormlyWrapperFormField } from './wrappers/wrappers';
import { FormControl, ValidationErrors } from '@angular/forms';
import { emailRegExp } from './utils/email-regex';
import { FormlyFieldUserSelect } from './types/user-select';

export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldInput,
  FormlyFieldCheckbox,
  FormlyFieldRadio,
  FormlyFieldSelect,
  FormlyFieldTextArea,
  FormlyFieldMultiCheckbox,
  FormlyFieldUUID,
  FormlyFieldUserSelect,

  // wrappers
  FormlyWrapperFormField
];

export function EmailValidator(control: FormControl): ValidationErrors {
  return !control.value || emailRegExp.test(control.value)
    ? null
    : { email: true };
}

export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}

export function EmailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid Email Address`;
}

export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  types: [
    {
      name: 'input',
      component: FormlyFieldInput,
      wrappers: ['form-field']
    },
    {
      name: 'checkbox',
      component: FormlyFieldCheckbox,
      wrappers: ['form-field']
    },
    {
      name: 'radio',
      component: FormlyFieldRadio,
      wrappers: ['form-field']
    },
    {
      name: 'select',
      component: FormlyFieldSelect,
      wrappers: ['form-field']
    },
    {
      name: 'textarea',
      component: FormlyFieldTextArea,
      wrappers: ['form-field']
    },
    {
      name: 'multicheckbox',
      component: FormlyFieldMultiCheckbox,
      wrappers: ['form-field']
    },
    {
      name: 'uuid',
      component: FormlyFieldUUID,
      wrappers: ['form-field']
    },
    {
      name: 'user-select',
      component: FormlyFieldUserSelect,
      wrappers: ['form-field']
    }
  ],
  wrappers: [{ name: 'form-field', component: FormlyWrapperFormField }],
  validators: [{ name: 'email', validation: EmailValidator }],
  validationMessages: [
    { name: 'required', message: 'This field is required' },
    { name: 'email', message: EmailValidatorMessage },
    { name: 'minlength', message: minlengthValidationMessage },
    { name: 'maxlength', message: maxlengthValidationMessage },
    { name: 'min', message: minValidationMessage },
    { name: 'max', message: maxValidationMessage }
  ]
};
