export default class WordService {
  static getWord(word) {
    return fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`)
      .then(function(response) {
        if (!response.ok) {
        const errorMessage = `${response.status}${response.statusText}`;
        //  let response =errorMessage;
        throw new Error(errorMessage);
        } else {
        return response.json();
        }
      })
      .catch(function(error){
        return error;
      });
  }
}

