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
  // Get text and url of the hyperlink
  const params = (new URL(info.linkUrl)).searchParams;
  const tweet = params.get('text') + "\n" + params.get('url');

  // Copy tweet to the clipboard
  copyToClipboard(tweet)
});

function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
