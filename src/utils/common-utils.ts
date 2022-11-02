import { v1 } from 'uuid';

function isString(value: string): boolean {
  return typeof value === 'string';
}

function isNumber(value: number): boolean {
  return typeof value === 'number';
}

function isUndefined(value: string): boolean {
  return typeof value === 'undefined';
}

function isObject(value: object): boolean {
  return value !== null && typeof value === 'object';
}

function isArray(value: []): boolean {
  return Array.isArray(value);
}

function parseString(value: string): object {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}

function stringifyObject(value: object): string {
  try {
    if (typeof value === 'object') {
      return JSON.stringify(value, undefined, 4);
    }
    return '';
  } catch (error) {
    return '';
  }
}

function isEmpty(value: any): boolean {
  if (isUndefined(value)) {
    return true;
  } else if (isString(value)) {
    return value === '';
  } else if (isArray(value)) {
    return value.length === 0;
  } else if (isObject(value)) {
    return Object.keys(value).length === 0;
  } else {
    return true;
  }
}

function generateId(): string {
  return v1();
}

function sort(data: string[] | number[], order: 'asc' | 'desc'): string[] | number[] {
  let newArr = [];
  if (typeof data[0] === 'number') {
    newArr = data.sort((a, b) => {
      return a > b ? 1 : b > a ? -1 : 0;
    });
  } else {
    newArr = data.sort((a, b) => {
      return a.toString().localeCompare(b.toString());
    });
  }

  if (order === 'desc') {
    newArr = newArr.reverse();
  }

  return newArr;
}

export { isString, isNumber, isUndefined, isObject, isArray, parseString, stringifyObject, isEmpty, generateId, sort };
