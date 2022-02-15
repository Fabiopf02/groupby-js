import { Options } from '../types';

type Obj = {
  [key: string | number | symbol]: any;
};

export function defaultWithObjectCompare(
  obj: Obj,
  item: Obj,
  key: string | number | symbol
): boolean {
  return obj.title === item[key];
}

export function withObject(
  groups: any,
  item: { [key: string | number | symbol]: any },
  key: string | number | symbol,
  options: Omit<Options<Obj, Obj>, 'type'>
) {
  const exists = groups.find((group: any) => {
    return options.compare!(group, item, key);
  });
  if (!exists) {
    return groups.push({
      title: options.formatTitle!(item, key),
      items: [item],
    });
  }
  groups[groups.indexOf(exists)].items.push(item);
}
