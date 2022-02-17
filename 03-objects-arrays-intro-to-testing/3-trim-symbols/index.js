/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  if (!size) {
    return string;
  }

  let result = '';
  let prevCh = null;
  let inARow = 1;

  for (let i = 0; i < string.length; i++) {
    if (prevCh !== string[i]) {
      inARow = 1;
    } else {
      inARow++;
    }

    if (inARow <= size) {
      result += string[i];
    }

    prevCh = string[i];
  }

  return result;
}

trimSymbols('eedaaad', 1);
