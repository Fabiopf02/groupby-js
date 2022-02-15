export function validate(
  key: string,
  array: any,
  options?: { [key: string]: any }
) {
  if (!key) {
    throw 'É necessário fornecer uma key válida!';
  }
  if (Object.prototype.toString.call(array) !== '[object Array]') {
    throw `O array de tipo '${Object.prototype.toString.call(
      array
    )}' é inválido`;
  }
  if (
    options?.compare &&
    Object.prototype.toString.call(options.compare) !== '[object Function]'
  ) {
    throw "O valor da opção 'compare' deve ser uma função";
  }
  if (
    options?.formatTitle &&
    Object.prototype.toString.call(options.formatTitle) !== '[object Function]'
  ) {
    throw "O valor da opção 'formatTitle' deve ser uma função";
  }
}