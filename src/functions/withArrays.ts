import { Options } from '../types';

type Obj = {
  [key: string | number | symbol]: any;
};

export function defaultWithArraysCompare(obj: Obj, item: Obj, key: string | number | symbol): boolean {
  return obj[key] === String(item[key]);
}

export function withArrays(
  groups: any,
  item: { [key: string | number | symbol]: any },
  key: string | number | symbol,
  options: Omit<Options<Obj, Obj>, 'type'>,
) {
  const exists = groups.find((items: any[]) =>
    items.find((_item) => {
      return options.compare!(_item, item, key);
    }),
  );
  if (!exists) {
    groups.push([item]);
    return groups;
  }
  const index = groups.indexOf(exists);
  if (options.maxByGroup && groups[index].length >= options.maxByGroup) return;
  groups[index].push(item);
}
