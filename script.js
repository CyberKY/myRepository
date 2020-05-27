var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
/*SpeechRecognitionインターフェイスは、認識サービスの制御インターフェイスです。
これは、認識サービスから送信されたSpeechRecognitionEventも扱います。*/
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
/*SpeechGrammarListインターフェースは、認識サービスに認識してほしい言葉または
言葉のパターンを表すSpeechGrammarのリストを表します。*/
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
/*SpeechRecognitionEventインターフェースは、resultイベントおよびnomatch ベントのためのイベントオブジェクトです。
暫定あるいは最終の音声認識結果に関連付けられたすべてのデータを含みます。*/

var colors = ['red', 'yellow', 'blue']; 
//アプリケーションに認識させたい文法(語彙)を定義。
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
//JSpeech Grammar Format (JSGF)という文法形式を使用して、上記の"colors"を定義。

var recognition = new SpeechRecognition();
//アプリケーションへの認識をコントロールするために音声認識インスタンスを定義
var speechRecognitionList = new SpeechGrammarList();
//上記で定義した文法を含めるために、新たなリストのインスタンスを定義

speechRecognitionList.addFromString(grammar, 1);
//上記で新たに作成したspeechRecognitionListに、私たちが定義した文法を追加

recognition.grammars = speechRecognitionList;
//音声認識インスタンスのgrammarsプロパティに作成したspeechRecognitionListを追加
recognition.continuous = false;
/*各認識の継続的な結果を返すか、単一の認識結果だけを返すかを制御します。
デフォルト値はfalse。*/
recognition.lang = 'en-US'; 
/*認識言語の設定。BCP47言語タグの文字列で指定。
ex)日本語:ja-JP,アメリカ英語:en-US,イギリス英語:en-GB,中国語:zh-CN,韓国語:ko-KR
指定されない場合、これはデフォルトで HTML lang 属性の値になります。
どちらも設定されていない場合、ユーザーエージェントの言語設定が使用されます。*/
recognition.interimResults = false;
/*音声認識システムが暫定結果を返す(ture)か、または最終結果を返す(false)かを定義。
デフォルト値はfalse。*/
recognition.maxAlternatives = 1;
/*結果ごとに提供される SpeechRecognitionAlternative の最大数を設定します。
デフォルト値は 1 。*/

var diagnostic = document.querySelector('.output'); //CSSセレクタで要素を取得
var bg = document.querySelector('html'); //CSSセレクタで要素を取得
var hints = document.querySelector('.hints'); //CSSセレクタで要素を取得

var colorHTML= '';
colors.forEach(function(v, i, a){ //forEach関数は、この配列に格納されたデータをループ処理（繰り返し処理）により、一気に処理したい時に使います。
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>'; //[+=]は結合代入演算子。
});
hints.innerHTML = '背景色を変更するために画面をクリックして、以下に表示されている色を「英語」で言ってください。' + colorHTML + '.';

document.body.onclick = function() { //画面がクリックされたときに、音声認識が開始されるようにイベントハンドラを設定。
  recognition.start();
  console.log('色を発言してください。');
}

recognition.onresult = function(event) {
    // SpeechRecognitionEventの結果プロパティは、SpeechRecognitionResultListオブジェクトを返します。
    // SpeechRecognitionResultListオブジェクトは、SpeechRecognitionResultオブジェクトを含みます。
    // SpeechRecognitionResultはゲッターを持っているので、配列のようにアクセスが可能です。
    // 最初の[0]は、最後の位置にあるSpeechRecognitionResultを返します。
    // それぞれのSpeechRecognitionResultオブジェクトは、個々の認識された結果を持っているSpeechRecognitionAlternativeオブジェクトを含みます。
    // これらはゲッターを持っているので、配列のようにアクセスが可能です。
    // 2つ目の[0]は、0の位置にあるSpeechRecognitionAlternativeを返します。
    // そして私たちは、SpeechRecognitionAlternativeオブジェクトのtranscriptプロパティを返します。
    var color = event.results[0][0].transcript;
    diagnostic.textContent = '色の結果: ' + color + '.'; 
    /*通常、テキスト情報を取得・設定する場合は textContent プロパティ、
    HTMLコードを取得・設定する場合は innerHTML プロパティを使用。*/
    bg.style.backgroundColor = color; //背景色を更新
    console.log('Confidence: ' + event.results[0][0].confidence); //コンソールに音声認識システムの認識の正しさの信頼度を表す評価を数値で表示します。
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