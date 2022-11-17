// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import WordService from './service/word.js';
import GiphyService from './service/giphy-service.js';

// async function getWord(word) {
//   //fetch > promise .then > response
//   const promise = WordService.getWord(word);
//   promise.then(function (response) {
//     printElements(response);
//   }, function (error) {
//     printError(error);
//   });
// }

// async function getGif(query) {
//   const promise = GiphyService.getGif(query);
//   promise.then(function (response) {
//     printElements(response);
//   }, function (error) {
//     printError(error);
//   });
// // }
// word[0].hwi.prs[0].mw
function getAPIData(word) {
  WordService.getWord(word).then(function (dictResponse) {
    if (dictResponse instanceof Error) {
      const errorMessage = `Error getting data from the dictionary for ${word}`;
      throw new Error(errorMessage);
    }
    printElements(dictResponse);
    return GiphyService.getGif(word);
  }).then(function (giphyResponse) {
    if (giphyResponse instanceof Error) {
      const errorMessage = `There's a problem getting the gif for${word}`;
      throw new Error(errorMessage);
    } 
    displayGif(giphyResponse, word);
  }).catch(function (error) {
    printError(error);
  });
}

function displayGif(response) {
  try {

    console.log(response);
    console.log('test');
    let p = document.getElementById('par');
    p.replaceChildren('');

    response.data.forEach(element => {
      let img = document.createElement('img');
      img.setAttribute('src', element.images.downsized.url);
      p.append(img);
    });
  }
  catch (error) {
    printError(error);
  }
}



function printElements(shortDefinitions) {
  try {
    const shortDef = shortDefinitions[0].shortdef;
    for (const definition of shortDef) {
      document.querySelector("#showResponse").innerText += definition  + "\n\n";
    }
      let wordPro = shortDefinitions[0].hwi.prs; //[0].mw;
    for (const pronunciation of wordPro) {
      document.querySelector("#showResponse").innerText += pronunciation.mw + "\n"
    }
  }
  catch (error) {
    document.querySelector("p#showResponse").innerText += "This is not available."
  }
}

async function getAudio(word) {
  let promise = WordService.getWord(word);
  promise.then(function (response) {
    addAudio(response);// response[0].hwi.prs[0].sound.audio);
  }, function (error) {
    printError(error);
  });
}

function addAudio(response) { // sound
  try {
    let audioWord = response[0].hwi.prs[0].sound.audio;
    let div = document.getElementById("auDiv");
    let audio = document.createElement("audio");
    let src = document.createElement("source");
    const srcTxt = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioWord[0]}/${audioWord}.mp3`;
    src.setAttribute("src", srcTxt);
    src.setAttribute("type", "audio/mp3");
    audio.setAttribute("controls", "");
    audio.append(src);
    div.replaceChildren(audio);
  }
  catch (error) {
    document.querySelector("p#showResponse").innerText = " No audio response."
  }
}

function printError(error) {
  document.querySelector("#showResponse").innerText = `Error: ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  document.getElementById("showResponse").innerText = "";
  const word = document.getElementById("word").value;
  document.getElementById("word").value = null;
  //getWord(word);
  getAudio(word);
  //getGif(query);
  getAPIData(word);
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});

// const bikeModels = apiResponse.bikes.map(function(model) {
//   return model.frame_model;
// });