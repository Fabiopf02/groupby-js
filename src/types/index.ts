export type WithObjectType = 'objects';
export type WithArrayType = 'arrays';
export type ObjectWithKeysType = 'objectWithKeys';

export type Compare<O, I> = (
  obj: O,
  item: I,
  key: string | number | symbol
) => boolean;

export type Options<O, I> = {
  /**
   * Função para comparar os valores
   * A função padrão irá comparar as propriedades dos objetos pela key passada para {@link groupBy}
   */
  compare?: Compare<O, I>;
  /**
   * Função para formatar os títulos dos grupos para os tipos 'objectWithKeys' e 'objects'
   * `Por padrão utiliza o valor com propriedade 'key' do objeto`
   */
  formatTitle?: (item: I, key: string | number | symbol) => string;
  /**
   * Tipo de agrupamento
   * @description {title: object[], ...} objectWithKeys
   * @description [{title: string, items: object[]}, ...] objects
   * @description [object[]] arrays
   *
   * @default `type = objects`
   */
  type: ObjectWithKeysType | WithArrayType | WithObjectType;
  /**
   * Quantidade máxima de itens por grupo
   */
  maxByGroup?: number;
};

export type WithObjectReturn<T> = {
  title: string;
  items: T[];
};
export type WithArrayReturn<T> = T[];
export type ObjectWithKeysReturn<T> = {
  [key: string]: T[];
};

export type Type<T, K> = T extends WithObjectType
  ? WithObjectReturn<K>
  : T extends WithArrayType
  ? WithArrayReturn<K>
  : T extends ObjectWithKeysType
  ? ObjectWithKeysReturn<K>
  : any;

export type Return<T, K> = T extends WithObjectType
  ? WithObjectReturn<K>[]
  : T extends WithArrayType
  ? WithArrayReturn<K>[]
  : T extends ObjectWithKeysType
  ? ObjectWithKeysReturn<K>
  : any;
