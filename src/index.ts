interface IOptions {
  /**
   * Função para comparar os valores
   * A função padrão irá comparar as propriedades dos objetos pela key passada para {@link groupBy}
   */
  compare?: (value1: object, value2: object) => boolean;
  /**
   * Função para formatar os títulos dos grupos para os tipos 'objectWithKeys' e 'objects'
   * `Por padrão utiliza o valor com propriedade 'key' do objeto`
   */
  formatTitle: (item: { [key: string]: any }, key: string) => string;
  /**
   * Tipo de agrupamento
   * @description {title: object[], ...} objectWithKeys
   * @description [{title: string, items: object[]}, ...] objects
   * @description [object[]] arrays
   *
   * @default `type = objects`
   */
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
    return groups.push({
      title: options.formatTitle(item, key),
      items: [item],
    });
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
    groups[options.formatTitle(item, key)] = [item];
    return groups;
  }
  groups[options.formatTitle(item, key)].push(item);
  return groups;
}

const functions = {
  objects: withObject,
  arrays: withArrays,
  objectWithKeys: objectWithKeys,
};

/**
 * @default
 */
const defaultOptions: IOptions = {
  formatTitle: (object, key) => object[key],
  type: 'objects',
};

/**
 * @description Função para agrupar listas de objetos
 */
export function groupBy(
  /**
   * A propriedade de referência dos objetos para agrupamento
   */
  key: string,
  /**
   * A lista de objetos que será agrupada
   */
  array: any[],
  options?: IOptions
) {
  if (!key) {
    throw new Error('É necessário fornecer uma key válida!');
  }
  if (Object.prototype.toString.call(array) !== '[object Array]') {
    throw new Error(
      `O array de tipo '${Object.prototype.toString.call(array)}' é inválido`
    );
  }
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
