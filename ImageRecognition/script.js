var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var SpeechRecognition = new SpeechRecognition();
var SpeechGrammarList = new SpeechGrammarList();

var animals = ['犬', 'いぬ', 'イヌ', '猫', 'ねこ', 'ネコ', '羊', 'ひつじ', 'ヒツジ', '牛', 'うし', 'ウシ'];
var grammar = '#JSGF V1.0; grammar animals; public <animal> = ' + animals.join(' | ') + ' ;'

SpeechGrammarList.addFromString(grammar, 1);

SpeechRecognition.grammars = SpeechGrammarList;
SpeechRecognition.continuous = false;
SpeechRecognition.lang = 'ja-JP'; 
SpeechRecognition.interimResults = false;
SpeechRecognition.maxAlternatives = 1;

//var animal = document.getElementById('animals');
var diagnostic = document.getElementById('diagnostic');

var animalList= [animals[0], animals[3], animals[6], animals[9]];
document.getElementById('animals').innerHTML = animalList;

function startreco() {
    document.getElementById('result').innerHTML = "";
    document.getElementById('recoresult').innerHTML = "";
    document.getElementById('diagnostic').innerHTML = "";

    SpeechRecognition.start();
  console.log('動物の名前を呼んでください。');
}
SpeechRecognition.onresult = function(event) {
    var aname = event.results[0][0].transcript;
    if (aname == animals[0]) {//} || animals[1] || animals[2]) {
        document.getElementById('result').innerHTML = '<image src = "dog.png" alt = "犬の写真">'; 
        document.getElementById('recoresult').innerHTML = "音声認識結果 : 「" + aname + "」";
    } else if (aname == animals[3]) {//} || animals[4] || animals[5]) {
        document.getElementById('result').innerHTML = '<image src = "cat.png" alt = "猫の写真">'; 
        document.getElementById('recoresult').innerHTML = "音声認識結果 : 「" + aname + "」";
    } else if (aname == animals[6]){//} || animals[7] || animals[8]) {
        document.getElementById('result').innerHTML = '<image src = "sheep.png" alt = "羊の写真">'; 
        document.getElementById('recoresult').innerHTML = "音声認識結果 : 「" + aname + "」";
    } else if (aname == animals[9]){//} || animals[10] || animals[11]) {
        document.getElementById('result').innerHTML = '<image src = "cow.png" alt = "牛の写真">'; 
        document.getElementById('recoresult').innerHTML = "音声認識結果 : 「" + aname + "」";
    } else {
        document.getElementById('result').innerHTML = '残念ですが、現在不在または未確認動物です。';
        document.getElementById('recoresult').innerHTML = "音声認識結果 : 「" + aname + "」";

    }
  }
SpeechRecognition.onspeechend = function() {
    SpeechRecognition.stop();
  }
SpeechRecognition.onnomatch = function() {
    diagnostic.textContent = "未確認動物です。";
  }
SpeechRecognition.onerror = function(event) {
    diagnostic.textContent = '認識エラー: ' + event.error;
  }
