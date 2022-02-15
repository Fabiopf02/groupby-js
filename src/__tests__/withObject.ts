import { withObject } from '../functions';
import { defaultOptions } from '..';
import { testFN } from '../utils-test';

const data = [{ name: 'test1', group: 1 }];
const expected = [{ title: 'test1', items: data }];

describe('withObject', () => {
  test('Deve agrupar o array [{title: string, items: []}]', () => {
    const groups: any = [];
    const item = data[0];
    withObject(groups, item, 'name', defaultOptions);
    expect(groups).toStrictEqual(expected);
  });

  test('Opção "compare"', () => {
    const item = data[0];
    const groups: any = [{ title: 'test1', items: [] }];
    const { _item, _key, _obj, compare } = testFN(
      'name',
      withObject,
      item,
      groups,

      'objects'
    );

    expect(groups).toStrictEqual(expected);
    expect(compare).toBeCalled();
    expect(_key).toBe('name');
    expect(_item).toStrictEqual(item);
    expect(_obj).toStrictEqual({ title: item.name, items: [item] });
  });
});
