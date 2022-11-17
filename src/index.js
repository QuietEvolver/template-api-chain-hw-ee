// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import WordService from './service/word.js';
// import GiphyService from './service/giphy-service.js';

async function getWord(word) { 
  //fetch > promise .then > response
  const promise = WordService.getWord(word);
  promise.then(function (response) {
    printElements(response);
  }, function (error) {
    printError(error);
  });
}

function printElements(shortDefinitions) {
  try {
    const shortDef = shortDefinitions[0].shortdef;
    for (const definition of shortDef) {
      document.querySelector("#showResponse").innerText += definition + "\n\n";
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
  getWord(word);
  getAudio(word);
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});