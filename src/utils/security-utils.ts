import * as CryptoJS from 'crypto-js';
import * as commonUtils from './common-utils';

const secret = process.env.SECRET || '';

function encrypt(text: string, _secret?: string): string {
  return CryptoJS.AES.encrypt(text, _secret || secret).toString();
}

function decrypt(encryptedText: string, _secret?: string): string {
  return CryptoJS.AES.decrypt(encryptedText, _secret || secret).toString(CryptoJS.enc.Utf8);
}

function sanitizeString(str: string): string {
  if (commonUtils.isEmpty(str) || !commonUtils.isString(str)) {
    return str;
  }

  str = str.replace(/[^a-z0-9 \.,_-]/gim, '');
  return str.trim();
}

module.exports = {
  encrypt,
  decrypt,
  sanitizeString,
};
