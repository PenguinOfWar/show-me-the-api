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

  console.log(tabs[0]);

  var api = isSony ? getLocation(url) : {};

  /* parse the pathname */

  console.log(api.pathname);

  var chunks = api.pathname.replace(/^\/|\/$/g, '').split('/');

  console.log(chunks);

  console.log('Running locale test');

  console.log(chunks[0]);

  var localeTest = /^[a-zA-Z]{2}[-_][a-zA-Z]{2}$/.test(chunks[0]);

  console.log(localeTest);

  var locale = '';

  if (localeTest) {
    locale = chunks.shift();
    console.log(locale);
  }

  /* add api/dynamicmodules to the start of the chunks array */

  chunks.unshift('api/dynamicmodules');
  chunks.unshift(locale);

  console.log(chunks);

  var apiPath = 'https://' + api.hostname + '/' + chunks.join('/');

  console.log(apiPath);

  var message = isSony ? 'Current pro.sony page:' : 'This is not a pro.sony page!';

  var messageElem = document.getElementById('message');
  var hiddenElem = document.getElementById('hidden');
  var linkElem = document.getElementById('link');
  var titleElem = document.getElementById('title');

  messageElem.textContent = message;
  linkElem.href = apiPath;
  titleElem.textContent = title;

  /* show or hide the button and the current link */

  if (isSony) {
    hiddenElem.style.display = 'block';
  } else {
    hiddenElem.style.display = 'none';
  }
});