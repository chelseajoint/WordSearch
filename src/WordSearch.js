export default class WordSearch {
  constructor(letterGrid) {
    this.letterGrid = letterGrid;
  }

  find(words) {
    const result = {};
  
    for (const word of words) {
      let start = null;
      let end = null;
  
      for (let row = 0; row < this.letterGrid.length; row++) {
        const rowString = this.letterGrid[row];
        const rowIndex = row + 1;
  
        let index = rowString.indexOf(word);
        if (index !== -1) {
          start = [rowIndex, index + 1];
          end = [rowIndex, index + word.length];
        }
  
        if (!start) {
          index = rowString.split('').reverse().join('').indexOf(word);
          if (index !== -1) {
            start = [rowIndex, rowString.length - index];
            end = [rowIndex, rowString.length - index - word.length + 1];
          }
        }
  
        if (!start) {
          let columnString = '';
          for (let i = 0; i < this.letterGrid.length; i++) {
            columnString += this.letterGrid[i][row];
          }
          index = columnString.indexOf(word);
          if (index !== -1) {
            start = [index + 1, rowIndex];
            end = [index + word.length, rowIndex];
          }
        }
  
        if (!start) {
          let columnString = '';
          for (let i = this.letterGrid.length - 1; i >= 0; i--) {
            columnString += this.letterGrid[i][row];
          }
          index = columnString.indexOf(word);
          if (index !== -1) {
            start = [this.letterGrid.length - index, rowIndex];
            end = [this.letterGrid.length - index - word.length + 1, rowIndex];
          }
        }
  
        if (start) break;
      }
  
      result[word] = start ? { start, end } : undefined;
    }
  
    return result;
  }
  
}
