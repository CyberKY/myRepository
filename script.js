var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = ['red', 'yellow', 'blue']; 
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US'; 
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){ 
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = '背景色を変更するために画面をクリックして、以下に表示されている色を「英語」で言ってください。' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  console.log('色を発言してください。');
}
recognition.onresult = function(event) {
    var color = event.results[0][0].transcript;
    diagnostic.textContent = '色の結果: ' + color + '.'; 
    bg.style.backgroundColor = color;
    console.log('Confidence: ' + event.results[0][0].confidence);
    console.log(event.results);  
  }
  recognition.onspeechend = function() {
    recognition.stop();
  }
  recognition.onnomatch = function(event) {
    diagnostic.textContent = "その色を認識していません。";
  }
  recognition.onerror = function(event) {
    diagnostic.textContent = '認識エラー: ' + event.error;
  }