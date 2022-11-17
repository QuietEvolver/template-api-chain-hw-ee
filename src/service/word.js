export default class WordService {
  static async getWord(word) {
    try {
      const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${jsonifiedResponse}`; //${response.status}${response.statusText} 
        // let response = errorMessage;
        // const errorMessage = `${response[0]}`           
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    }
    catch (error) {
      return error;
    }
  }
}

