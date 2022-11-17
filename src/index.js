// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import WordService from './service/word.js';

function getWord(word) {
  let promise = WordService.getWord(word);
  //let wordDef = promise[0].shortdef;

  promise.then(function(shortDefinitions) {
    printElements(shortDefinitions);
  }, function(error) {
    printError(error);
  });
}

function printElements(shortDefinitions) {
  const shortDef = shortDefinitions[0].shortdef;
  for (const definition of shortDef) {
  document.querySelector("#showResponse").innerText += definition + "\n\n";
  }
}

function getAudio(word) {
  let promise = WordService.getWord(word);
  promise.then(function(response) {
    addAudio(response[0].hwi.prs[0].sound.audio);
  }, function(error) {
    printError(error);
  });
}

function addAudio(sound) {
  let div = document.getElementById("auDiv");
  let audio = document.createElement("audio");
  let src = document.createElement("source");
  const srcTxt = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${sound[0]}/${sound}.mp3`
  src.setAttribute("src", srcTxt);
  src.setAttribute("type", "audio/mp3");
  audio.setAttribute("controls","");
  audio.append(src);
  div.replaceChildren(audio);
}

function printError(error) {
  document.querySelector("#showResponse").innerText = error;
}

function handleFormSubmission(event) {
  event.preventDefault();

  document.getElementById("showResponse").innerText = "";
  const word = document.getElementById("word").value;
  document.getElementById("word").value = null;
  getWord(word);
  getAudio(word);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});