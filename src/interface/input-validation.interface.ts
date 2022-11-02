export interface Validation {
  minLength?: number;
  maxLength?: number;
  hasNumber?: boolean;
  hasUpperCase?: boolean;
  hasLowerCase?: boolean;
  hasSpecialCharacter?: boolean;
  }

export interface Response {
  valid: boolean;
  message?: string;
errors?: ErrorList[];
}

export interface ErrorList {
  message: string;
}
