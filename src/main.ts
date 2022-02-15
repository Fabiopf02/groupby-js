import { defaultOptions, functions, defaultCompare } from './constants';
import { Options, Type, Return, WithObjectReturn } from './types';

import { validate } from './validation';

type Obj = {
  [key: string | number | symbol]: any;
};

/**
 * @description Função para agrupar listas de objetos
 */
export function groupBy<T>(key: keyof T, arrays: T[], options?: Options<Obj, T>): any;
export function groupBy<T, K>(key: keyof T, arrays: T[], options?: Options<Type<K, T>, T>): Return<K, T>;
export function groupBy<T>(
  /**
   * A propriedade de referência dos objetos para agrupamento
   */
  key: any,
  /**
   * A lista de objetos que será agrupada
   */
  array: any[],
  options?: Options<Obj, Obj>,
) {
  validate(key, array, options);

  Object.assign(defaultOptions, options);
  const { type } = defaultOptions;

  if (!options?.compare) {
    defaultOptions.compare = defaultCompare[type];
  }
  const groups = type === 'objectWithKeys' ? ({} as WithObjectReturn<T>) : [];
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
