import { withArrays } from '../functions';
import { defaultOptions } from '..';
import { testFN } from '../utils-test';

const data = [{ name: 'test2', group: 2 }];
const expected = [data];

describe('withArray', () => {
  test('Deve agrupar o array  [[{...}, ...]]', () => {
    const groups: any[] = [];
    const item = data[0];
    withArrays(groups, item, 'name', defaultOptions);
    expect(groups).toStrictEqual(expected);
  });

  test('Opção "compare"', () => {
    const item = data[0];
    const groups: any = [];
    const { _key, compare } = testFN(
      'name',
      withArrays,
      item,
      groups,
      'arrays'
    );
    expect(groups).toStrictEqual(expected);
    expect(compare).not.toBeCalled();
    expect(_key).toBeFalsy();
  });
});
