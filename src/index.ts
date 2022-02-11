interface IOptions {
  compare?: (value1: any, value2: any) => any;
  formatTitle: (value: any) => string;
  type: 'objectWithKeys' | 'objects' | 'arrays';
}

function withObject(
  groups: any,
  item: { [key: string]: any },
  key: string,
  options: IOptions
) {
  const keyValue = item[key];
  const exists = groups.find((group: any) => {
    if (options.compare) {
      return options.compare(group, item);
    }
    return group.title === keyValue;
  });
  if (!exists) {
    return groups.push({ title: options.formatTitle(keyValue), items: [item] });
  }
  groups[groups.indexOf(exists)].items.push(item);
}

function withArrays(
  groups: any,
  item: { [key: string]: any },
  key: string,
  options: IOptions
): any[][] {
  const keyValue = item[key];
  const exists = groups.find((items: any[]) =>
    items.find((_item) => {
      if (options.compare) {
        return options.compare(_item, item);
      }
      return String(keyValue) === _item[key];
    })
  );
  if (!exists) {
    groups.push([item]);
    return groups;
  }
  const index = groups.indexOf(exists);
  groups[index].push(item);
  return groups;
}

function objectWithKeys(
  groups: any,
  item: { [key: string]: any },
  key: string,
  options: IOptions
): any {
  const exists = Object.keys(groups).find((_key) => {
    if (options.compare) {
      return options.compare(
        { key: _key, value: groups[_key] },
        { key, value: item }
      );
    }
    return String(item[key]) === _key;
  });
  if (!exists) {
    groups[options.formatTitle(item[key])] = [item];
    return groups;
  }
  groups[options.formatTitle(item[key])].push(item);
  return groups;
}

const functions = {
  objects: withObject,
  arrays: withArrays,
  objectWithKeys: objectWithKeys,
};

const defaultOptions: IOptions = {
  formatTitle: (value) => value,
  type: 'objects',
};

export function groupBy(key: string, array: any[], options: IOptions) {
  Object.assign(defaultOptions, options);
  const { type } = defaultOptions;
  const groups = type === 'objectWithKeys' ? {} : [];
  const fn = functions[type];

  if (!fn) {
    throw new Error(`O tipo de agrupamento '${type}' não existe!`);
  }

  array.forEach((item) => {
    if (!item[key]) {
      throw new Error(`A key '${key}' informada não existe`);
    }
    fn(groups, item, key, defaultOptions);
  });

  return groups;
}
