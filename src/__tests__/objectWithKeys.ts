import { objectWithKeys } from '../functions';
import { defaultOptions } from '..';
import { testFN } from '../utils-test';

const data = [{ name: 'test1', group: 1 }];
const expected = { test1: data };

describe('objectWithKeys', () => {
  test('Deve agrupar o array {key: [...]}', () => {
    const groups: any = {};
    const item = data[0];
    objectWithKeys(groups, item, 'name', defaultOptions);
    expect(groups).toStrictEqual(expected);
  });

  test('Opção "compare"', () => {
    const item = data[0];
    const groups: any = { test1: [] };
    const { _item, _key, _obj, compare } = testFN('name', objectWithKeys, item, groups, 'objectWithKeys');

    expect(groups).toStrictEqual(expected);
    expect(compare).toBeCalled();
    expect(_key).toBe('name');
    expect(_item).toStrictEqual(item);
    expect(_obj).toStrictEqual({ key: 'test1', value: data });
  });
});
