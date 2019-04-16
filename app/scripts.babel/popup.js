'use strict';

var getLocation = function getLocation(href) {
  var l = document.createElement('a');
  l.href = href;
  return l;
};

chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
  var url = tabs[0].url;
  var title = tabs[0].title;
  var isSony = url.includes('pro.sony');

  var api = isSony ? getLocation(url) : {};

  /* parse the pathname */

  var chunks = api.pathname.replace(/^\/|\/$/g, '').split('/');
  var chunksOriginal = api.pathname.replace(/^\/|\/$/g, '').split('/');

  var originalLocale = chunksOriginal.shift();

  var localeTest = /^[a-zA-Z]{2}[-_][a-zA-Z]{2}$/.test(chunks[0]);

  var locale = 'xx_XX';

  if (localeTest) {
    chunks.shift();
  }

  /* add api/dynamicmodules to the start of the chunks array */

  chunks.unshift('api/dynamicmodules');
  chunks.unshift(locale);

  chunksOriginal.unshift('api/dynamicmodules');
  chunksOriginal.unshift(originalLocale);

  var apiPath = 'https://' + api.hostname + '/' + chunks.join('/');
  var apiPathWithLocale = 'https://' + api.hostname + '/' + chunksOriginal.join('/');

  var message = isSony ? 'Current pro.sony page:' : 'This is not a pro.sony page!';

  var messageElem = document.getElementById('message');
  var hiddenElem = document.getElementById('hidden');
  var linkElem = document.getElementById('link');
  var titleElem = document.getElementById('title');
  var originalLocaleElem = document.getElementById('originalLocale');

  var linkElemLocalised = document.getElementById('linkLocalised');
  var titleElemLocalised = document.getElementById('titleLocalised');

  messageElem.textContent = message;
  linkElem.href = apiPath;
  titleElem.textContent = title;

  linkElemLocalised.href = apiPathWithLocale;
  titleElemLocalised.textContent = title;

  originalLocaleElem.textContent = originalLocale;

  /* show or hide the button and the current link */

  if (isSony) {
    hiddenElem.style.display = 'block';
  } else {
    hiddenElem.style.display = 'none';
  }
});