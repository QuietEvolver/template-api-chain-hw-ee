import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WordService from './word.js';

function getWord(word) {
  let promise = WordService.getWord(word);

  promise.then(function(shortDefinitions) {
    printElements(shortDefinitions);
  }, function(error) {
    printError(error);
  });
}

function printElements(shortDefinitions) {
  for (const definition of shortDefinitions) {
  document.querySelector("#showResponse").innerText += definition + "\n";
  }
}

function printError(error) {
  document.querySelector("#showResponse").innerText = error;
}

function handleFormSubmission(event) {
  event.preventDefault();

  const word = document.getElementById("word").value;
  document.getElementById("word").value = null;
  getWord(word);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});