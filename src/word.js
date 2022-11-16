export default class WordService {
  static getWord(word) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${APP_KEY}`
    });
  }

}

