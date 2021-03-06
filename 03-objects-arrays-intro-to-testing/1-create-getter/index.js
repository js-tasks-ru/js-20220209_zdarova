/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathParts = path.split('.');
  return (obj) => {
    let result = obj;
    for (let val of pathParts) {
      result = result[val];
      if (!result) {
        return;
      }
    }
    return result;
  };
}
