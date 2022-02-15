import { Options } from '../types';

type Obj = {
  [key: string | number | symbol]: any;
};

export function defaultObjectWithKeysCompare(
  obj: Obj,
  item: Obj,
  key: string | number | symbol
): boolean {
  return String(obj.key) === String(item[key]);
}

export function objectWithKeys(
  groups: any,
  item: { [key: string | number | symbol]: any },
  key: string | number | symbol,
  options: Omit<Options<Obj, Obj>, 'type'>
) {
  const exists = Object.keys(groups).find((_key) => {
    return options.compare!({ key: _key, value: groups[_key] }, item, key);
  });
  const index = options.formatTitle!(item, key);
  if (!exists) {
    return (groups[index] = [item]);
  }
  if (options.maxByGroup && groups[index].length >= options.maxByGroup) return;
  groups[index].push(item);
}
