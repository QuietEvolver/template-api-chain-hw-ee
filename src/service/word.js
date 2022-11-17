export default class WordService {
  static getWord(word) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`;

      request.addEventListener("loadend", function() {
        let response; 
        if (this.status === 200) {
          response = JSON.parse(this.responseText);
          resolve(response)
        } else {
          response = this.responseText;
          reject(response);
        }
      });

      request.open("GET", url, true);
      request.send();
    });
  }
}

