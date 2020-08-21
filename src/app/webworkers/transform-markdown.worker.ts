/// <reference lib="webworker" />
importScripts('/assets/js/markdown/markdown-it.min.js');

addEventListener('message', ({ data }) => {
  const mdHtml = self['markdownit']();
  try {
    const output = mdHtml.render(data);
    postMessage(output);
  } catch (e) {
    postMessage(data);
  }
});
