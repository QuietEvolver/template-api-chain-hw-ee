export default class WordService {
  static getWord(word) {
    return fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICT_API_KEY}`)
      .then(function(response){
        if (!response.ok) {
          const errorMessage = `${response.statusText}`; //${response.status}${response.statusText} 
          //  let response = errorMessage;
          // const errorMessage = `${response[0]}`           
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch (function(error) {
        return error;
      });
  }
}

