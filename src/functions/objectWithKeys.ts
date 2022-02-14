import { Options } from '../types';

type Obj = {
  [key: string | number | symbol]: any;
};

export function defaultObjectWithKeysCompare(
  obj: Obj,
  item: Obj,
  key: string | number | symbol
): boolean {
  return obj.key === String(item[key]);
}

export function objectWithKeys(
  groups: any,
  item: { [key: string | number | symbol]: any },
  key: string | number | symbol,
  options: Options<Obj, Obj>
): any {
  const exists = Object.keys(groups).find((_key) => {
    return options.compare!(
      { key: _key, value: groups[_key] },
      { key, value: item },
      key
    );
  });
  const index = options.formatTitle!(item, key);
  if (!exists) {
    groups[index] = [item];
    return groups;
  }
  groups[index].push(item);
  return groups;
}
