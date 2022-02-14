import {
  objectWithKeys,
  withArrays,
  withObject,
  defaultObjectWithKeysCompare,
  defaultWithArraysCompare,
  defaultWithObjectCompare,
} from '../functions';
import { Options } from '../types';

type Obj = {
  [key: string | number | symbol]: any;
};

export const defaultCompare = {
  objects: defaultWithObjectCompare,
  arrays: defaultWithArraysCompare,
  objectWithKeys: defaultObjectWithKeysCompare,
};

/**
 * @default
 */
export const defaultOptions: Options<Obj, Obj> = {
  formatTitle: (obj, key) => obj[key],
  compare: defaultWithObjectCompare,
  type: 'objects',
};

export const functions = {
  objects: withObject,
  arrays: withArrays,
  objectWithKeys: objectWithKeys,
};
