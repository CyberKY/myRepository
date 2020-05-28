var synth = window.speechSynthesis; //Web音声合成の制御インターフェースであるSpeechSynthesisのインスタンスを生成。このAPIのエントリーポイント

var inputForm = document.querySelector('form'); /*DOM操作で要素取得
※オブジェクトを通じてHTML文書にアクセスするための仕組みを、専門用語で「DOM（Document Object Model）」といいます。
DOMはHTML文書の構造を、オブジェクトをツリー状につなげた構造で表したものです。
JavaScriptでHTML文書を操作することを「DOM（ドム）を操作する」*/
var inputTxt = document.querySelector('.txt');　//DOM操作で要素取得
var voiceSelect = document.querySelector('select');　//DOM操作で要素取得

var pitch = document.querySelector('#pitch'); //DOM操作で要素取得
var pitchValue = document.querySelector('.pitch-value'); //DOM操作で要素取得
var rate = document.querySelector('#rate'); //DOM操作で要素取得
var rateValue = document.querySelector('.rate-value'); //DOM操作で要素取得

var voices = []; //利用可能な音声のリストを格納するための変数

function populateVoiceList() { //デバイスが利用可能な異なる音声オプションで<select>elementを満たすためにpopulateVoiceList()機能を使用
  voices = synth.getVoices().sort(function (a, b) { //synth.getVoicesメソッドは、SpeechSynthesisVoiceオブジェクトによって表されるすべての利用可能な音声のリストを返します。
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
});
var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
/*「?」は、条件 (三項) 演算子。 JavaScript では唯一の3つのオペランドをとる演算子。この演算子は、if文のショートカットとしてよく用いられる。
上記の式の場合、「voiceSelect.selectedIndex < 0」が条件式、trueであれば「0」、falseであれば「voiceSelect.selectedIndex」を返す。*/
voiceSelect.innerHTML = '';
for(i = 0; i < voices.length ; i++) {
  var option = document.createElement('option');
  option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
  if(voices[i].default) {
    option.textContent += ' -- DEFAULT';
  }

  option.setAttribute('data-lang', voices[i].lang);
  option.setAttribute('data-name', voices[i].name);
  voiceSelect.appendChild(option);
}
voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
  if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
  }
  if (inputTxt.value !== '') {
  var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
  }
  utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
  }
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      break;
    }
  }
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  synth.speak(utterThis);
}
}

inputForm.onsubmit = function(event) {
event.preventDefault();

speak();

inputTxt.blur();
}

pitch.onchange = function() {
pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
speak();
}
