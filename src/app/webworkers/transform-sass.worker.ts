/// <reference lib="webworker" />
importScripts('/assets/js/sass/sass.sync.js');

addEventListener('message', ({ data }) => {
  try {
    self['Sass'].compile(data, ({text}) => {
      postMessage(text);
    });
  } catch (e) {
    postMessage(data);
  }

});
