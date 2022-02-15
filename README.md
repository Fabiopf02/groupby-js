# groupby-js

#### _Agrupador de array de objetos por propriedade_

## Features

- Agrupar em objetos com 'title' e 'items' -> `<T>{ title: string, items: T[] }[] // Type = WithObjectType`
- Agrupar em objetos `key: value` -> `<T>{ key: T[] } // Type = ObjectWithKeysType`
- Agrupar em  `Array` -> `<T>T[][] // Type = WithArrayType`



## Instalação

```sh
npm i groupby-js
```

## Uso
#### Estrutura da função
```ts
    // Type
    import { groupBy, WithObjectType, WithArrayType, ObjectWithKeysType } from 'groupby-js'
    groupBy<T, WithObjectType | WithArrayType | ObjectWithKeysType>(
        /**
        *   key -> propriedade que será usada para agrupar o array
        */
        key: keyof T | string,
        /**
        *   O array que será agrupado
        *   typescript -> se o tipo T for fornecido, data = T[]
        */
        data: T[],
        {
            /*
            *   Tipo de agrupamento
            *   type='objects' return {title: string, items: T[]}[]
            *   type='arrays' return T[][]
            *   type='objectWithKeys' return {string: T[]}
            *
            *   default: type = 'objects'
            */
            type: 'objects' | 'arrays' | 'objectWithKeys',
            /*
            *   * Opcional *
            *   Por padrão compara a igualdade (=) dos valores da propriedade 'key'
            */
            compare?: (obj, item: T, key: string = param key) => boolean,
            /*
            *   * Opcional *
            *   Por padrão utiliza como 'título' o valor da propriedade 'key'
            *   ** Funciona apenas para type = 'objects' e type = 'objectWithKeys' **
            */
            formatTitle?: (item: T, key: string = param key) => string,
                // obj -> elemento do array já agrupado
                // item -> elemento do array 'data' que será agrupado
                // key -> A mesma key passada para groupBy

            /*
            *   * Opcional *
            *   Quantidade máxima de itens por grupo
            *   -> Deve ser um inteiro maior que zero
            */
            maxByGroup?: number
        })
```
#### Typescript
Para tipagem do retorno e _options_ (_`compare`_ e _`formatTitle`_) no typescript:
```ts
    groupBy<T, K>(key, data, options)
    
    //  T -> Tipo dos objetos em data
        type User = {
            name: string
            age: number
        }
        groupBy<User>(key, [{ name: 'test', age: 20 }], options)
    //  K -> Deve ser fornecido de acordo com 'type' em 'options':
    //       Para type='objects':
                  import { WithObjectType } from 'groupby-js'
                  groupBy<T, WithObjectType>(key, data, { type: 'objects' })
    //       Para type='arrays':
                  import { WithArrayType } from 'groupby-js'
                  groupBy<T, WithArrayType>(key, data, { type: 'arrays' })
    //       Para type='objectWithKeys':
                  import { ObjectWithKeysType } from 'groupby-js'
                  groupBy<T, ObjectWithKeysType>(key, data, { type: 'objectWithKeys' })

```

#### Para _`type='objects'`_
```ts
import { groupBY } from 'groupby-js'
// ou
const { groupBy } = require('groupby-js')

const data = [
    { name: 'test1', group: 'g1' },
    { name: 'test2', group: 'g2' },
    { name: 'test3', group: 'g1' },
]

// javascript
const groups = groupBy('group', data, { type: 'objects', maxByGroup: 1 })

// typescript
import { WithObjectType } from 'groupby-js'

type Data = {
    name: string
    group: string
}
const groups = groupBy<Data, WithObjectType>('group', data, { type: 'objects', maxByGroup: 1 })

console.log(groups)
// retorno
[
    {
        title: 'g1',
        items: [
            { name: 'test1', group: 'g1' },
        ],
    },
    {
        title: 'g2',
        items: [
            { name: 'test2', group: 'g2' },
        ],
    },
]
```
#### Para _`type='arrays'`_
```ts
import { groupBY } from 'groupby-js'
// ou
const { groupBy } = require('groupby-js')

const data = [
    { name: 'test1', group: 'g1' },
    { name: 'test2', group: 'g2' },
    { name: 'test3', group: 'g1' },
]

// javascript
const groups = groupBy('group', data, { type: 'arrays', maxByGroup: 1 })

// typescript
import { WithArrayType } from 'groupby-js'

type Data = {
    name: string
    group: string
}
const groups = groupBy<Data, WithArrayType>('group', data, { type: 'arrays', maxByGroup: 1 })

console.log(groups)
// retorno
[
     [
        { name: 'test1', group: 'g1' },
    ],
    [
        { name: 'test2', group: 'g2' },
    ],
]
```
#### Para _`type='objectWithKeys'`_
```ts
import { groupBY } from 'groupby-js'
// ou
const { groupBy } = require('groupby-js')

const data = [
    { name: 'test1', group: 'g1' },
    { name: 'test2', group: 'g2' },
    { name: 'test3', group: 'g1' },
]

// javascript
const groups = groupBy('group', data, { type: 'objectWithKeys', maxByGroup: 1 })

// typescript
import { ObjectWithKeysType } from 'groupby-js'

type Data = {
    name: string
    group: string
}
const groups = groupBy<Data, ObjectWithKeysType>('group', data, { type: 'objectWithKeys', maxByGroup: 1 })

console.log(groups)
// retorno
[
    'g1': [
        { name: 'test1', group: 'g1' },
    ],
    'g2': [
        { name: 'test2', group: 'g2' },
    ],
]
```

## License

MIT
