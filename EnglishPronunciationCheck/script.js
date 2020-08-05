if ('speechSynthesis' in window) {
  alert("このブラウザは音声合成に対応しています! ^_^")
} else {
  alert("このブラウザは音声合成に対応していません。 T_T")
}

//chromeブラウザで、Web Recognition APIを使用するための準備
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//Web Recognition APIのインスタンス生成
var SpeechRecognition = new SpeechRecognition();

//Web Synthesis APIのインスタンス生成
var synth = window.speechSynthesis;

//「OK」ボタンが押されたらselectword()関数を呼び出し
function selectword() {
  //各項目の初期化
  document.getElementById("display").innerHTML =""
  document.getElementById("checkword").innerHTML =""
  document.getElementById("recognition").innerHTML =""
  document.getElementById("result").innerHTML =""
  document.getElementById("checkreco").innerHTML =""

  var inputword = document.getElementById("word").value;
  //テキストボックスの入力値による条件分岐
  if (!inputword) {
    inputword = "任意の英単語を入力してください。";
    document.getElementById("display").innerHTML = inputword;
  }else if (!/^[A-Za-z0-9]*$/.test(inputword)) {
    inputword = "半角英数字で入力してください。";
    document.getElementById("display").innerHTML = inputword;
  }else{
    var instraction = "準備ができ次第、「音声認識開始」ボタンをクリックし、<br>入力した以下の英単語を発音してください。";
    document.getElementById("display").innerHTML = instraction;
    document.getElementById("checkword").innerHTML = inputword;
    //音声認識開始ボタンの設置
    var recognition = '<input type="button" onclick="recognition()" value="音声認識開始"></input>'
    document.getElementById("recognition").innerHTML = recognition; 
    }
  }

//音声認識関数
function recognition() {
  //各プロパティの設定
  SpeechRecognition.continuous = false;
  SpeechRecognition.lang = 'en-US'; 
  SpeechRecognition.interimResults = false;
  SpeechRecognition.maxAlternatives = 1;

  //音声認識開始関数
  SpeechRecognition.start();

  //音声認識結果を受け取ったら入力した英単語と比較し、発音が正しいかどうかを判定
  SpeechRecognition.onresult = function(event) {
    var result = event.results[0][0].transcript;　//音声認識結果
    var inputword = document.getElementById("word").value;　//テキストボックス入力値(任意の英単語)
    //発音チェックボタンの設置
    var checkreco = '<input type="button" onclick="procheck()" value="発音チェック"></input>'
    if (result.toUpperCase() == inputword.toUpperCase()) {//大文字小文字を区別しないようにtoUpperCase()を使用
      document.getElementById("result").innerHTML = "音声認識結果 : 「" + result + "」。<br>正しく発音できました。";
      document.getElementById("checkreco").innerHTML = checkreco;  
    }else{
      document.getElementById("result").innerHTML = "音声認識結果 : 「" + result + "」。<br>正しく発音できていません。";
      document.getElementById("checkreco").innerHTML = checkreco;
    }
  }
  //
  SpeechRecognition.onspeechend = function() {
    SpeechRecognition.stop();
  }
  SpeechRecognition.onnomatch = function() {
    document.getElementById("result").innerHTML = "認識していません。";
  }
  SpeechRecognition.onerror = function(event) {
    document.getElementById("result").innerHTML = '認識Error : ' + event.error;
  }
  }

//発音チェック関数
function procheck() {
  var checkword = document.getElementById('word').value; //fucking!! checkwordの中には変数保たれない
  var utterThis = new SpeechSynthesisUtterance(checkword);
  utterThis.lang = 'en-US';
  synth.speak(utterThis); 
}