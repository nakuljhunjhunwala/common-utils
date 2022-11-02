import * as commonUtils from './common-utils';
import { Validation, ErrorList, Response } from '../interface/input-validation.interface';

function minLength(input: string | number, length: number | undefined = 8): boolean {
  input = typeof input === 'number' ? input.toString() : input;
  if (input.length >= length) {
    return true;
  }
  return false;
}

function maxLength(input: string | number, length: number | undefined = 16): boolean {
  input = typeof input === 'number' ? input.toString() : input;
  if (input.length <= length) {
    return true;
  }
  return false;
}

function hasSpecialCharacter(input: string): boolean {
  const specialChar = ['!', '@', '#', '$', '%', '^', '&', '*'];
  let _hasSpecialChar = false;
  for (const char of specialChar) {
    if (input.includes(char)) {
      _hasSpecialChar = true;
      break;
    }
  }
  return _hasSpecialChar;
}

function hasNumber(input: string): boolean {
  const _hasNumber = /\d/;
  return _hasNumber.test(input);
}

function hasUpperCase(input: string = ''): boolean {
  const regexp = /[A-Z]/;
  return regexp.test(input);
}

function hasLowerCase(input: string = ''): boolean {
  const regexp = /[a-z]/;
  return regexp.test(input);
}

function isValidEmail(email: string): boolean {
  const emailExpression =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailExpression.test(email);
}

function validatePasswordPattern(password: string, validation: Validation): Response {
  const errors: ErrorList[] = [];

  const addError = (msg: string): void => {
    errors.push({
      message: msg,
    });

    return;
  };
  if (commonUtils.isEmpty(validation)) {
    validation = {
      minLength: 8,
      maxLength: 16,
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialCharacter: true,
    };
  }

  Object.keys(validation).forEach((func) => {
    switch (func) {
      case 'minLength': {
        const isTrue = minLength(password, validation[func]);
        if (!isTrue) {
          addError(`The length of password is smaller than ${validation[func]}`);
        }
        break;
      }
      case 'maxLength': {
        const isTrue = maxLength(password, validation[func]);
        if (!isTrue) {
          addError(`The length of password is bigger than ${validation[func]}`);
        }
        break;
      }
      case 'hasNumber': {
        const isTrue = hasNumber(password);
        if (validation[func]) {
          if (!isTrue) {
            addError(`Password must contain at least one number`);
          }
        } else {
          if (isTrue) {
            addError(`Password must not contain number`);
          }
        }
        break;
      }
      case 'hasUpperCase': {
        const isTrue = hasUpperCase(password);
        if (validation[func]) {
          if (!isTrue) {
            addError(`Password must contain at least one uppercase char`);
          }
        } else {
          if (isTrue) {
            addError(`Password must not contain uppercase char`);
          }
        }
        break;
      }
      case 'hasLowerCase': {
        const isTrue = hasLowerCase(password);
        if (validation[func]) {
          if (!isTrue) {
            addError(`Password must contain at least one lowercase char`);
          }
        } else {
          if (isTrue) {
            addError(`Password must not contain lowercase char`);
          }
        }
        break;
      }
      case 'hasSpecialCharacter': {
        const isTrue = hasSpecialCharacter(password);
        if (validation[func]) {
          if (!isTrue) {
            addError(`Password must contain at least one special char`);
          }
        } else {
          if (isTrue) {
            addError(`Password must not contain special char`);
          }
        }
        break;
      }
      default:
        break;
    }
  });

  if (errors.length > 0) {
    return {
      valid: false,
      message: errors[0].message,
      errors,
    };
  } else {
    return {
      valid: true,
      message: 'Valid Password',
    };
  }
}

export {
  validatePasswordPattern,
  minLength,
  maxLength,
  isValidEmail,
  hasUpperCase,
  hasSpecialCharacter,
  hasNumber,
  hasLowerCase,
};
