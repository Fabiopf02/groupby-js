import { defaultOptions } from '.';

export function testFN(
  key: string,
  fn: any,
  item: any,
  groups: any,
  type: string
) {
  let _key = '';
  let _item = '';
  let _obj = '';
  const compare = jest.fn((obj1, item1, key) => {
    _key = key;
    _item = item1;
    _obj = obj1;
    return true;
  });
  Object.assign(defaultOptions, { compare, type });
  fn(groups, item, key, defaultOptions);
  return { groups, item, _key, _item, _obj, compare };
}
