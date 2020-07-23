'use strict';

// 拡張機能がインストールされたときの処理
chrome.runtime.onInstalled.addListener(function(){
  // 親階層のメニューを生成
  const parent_menu = chrome.contextMenus.create({
    title: "ツイートをコピー", 
    contexts:["link"],
    id: "copy-tweet"
  });
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  // ボタンから本文とURLを取得する
  const matches = info.linkUrl.match(/text=([^&]+).?url=([^&]+)/);
  if (matches.length != 3) {
    return;
  }
  
  const text = decodeURIComponent(matches[1].replace(/\+/g, ' '));
  const url = decodeURIComponent(matches[2].replace(/\+/g, ' '));
  const tweet = text + "\n" + url;

  // クリップボードにコピーする
  const elm = document.createElement("textarea");
  document.body.appendChild(elm);
  elm.textContent = tweet;
  elm.select();
  document.execCommand('copy');
  document.body.removeChild(elm);
});
