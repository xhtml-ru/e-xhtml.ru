/// <reference lib="webworker" />
importScripts('/assets/js/pug/pug.js');

addEventListener('message', ({ data }) => {
  const pug = self['require']('pug');
  try {
    const output = pug.render(data);
    postMessage(output);
  } catch (e) {
    postMessage(data);
  }
});
