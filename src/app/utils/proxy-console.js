export function ProxyConsole(source, target) {
  console.log('ProxyConsole')

  if (typeof window === 'undefined') {
    return;
  }
  source = source || window.parent.document.URL;
  target = target || window.parent;

  // console.log('>>>')
  // console.log(window)
  // console.log(window.console)
  // console.log(console)

  function maybeStringify(msg) {
    return typeof msg === 'object' ? JSON.stringify(msg) : msg;
  }


  const oldLog = console.log;
  try {
    console.log = function (message) {
      target.postMessage({
        eXHTML: true,
        type: 'eXHTML-console',
        method: 'log',
        message: maybeStringify(message)
      }, source);
    }
  } catch(e) {
    console.log(e)
  }

  // window.console.__proto__.log = function log(msg) {
  //     return target.postMessage({
  //       eXHTML: true,
  //       type: 'eXHTML-console',
  //       method: 'log',
  //       message: maybeStringify(msg)
  //     }, source);
  // }
/*
  window.console = {
    clear: function() {
      return target.postMessage({
        eXHTML: true,
        type: 'eXHTML-console',
        method: 'clear'
      }, source);
    },
    log: function (msg) {
      return target.postMessage({
        eXHTML: true,
        type: 'eXHTML-console',
        method: 'log',
        message: maybeStringify(msg)
      }, source);
    },
    warn: function (msg) {
      return target.postMessage({
        eXHTML: true,
        type: 'eXHTML-console',
        method: 'warn',
        message: maybeStringify(msg)
      }, source);
    },
    error: function (err) {
      if (err) {
        if (typeof err === 'string') {
          err = err.split(' at ')[0];
        }
        return target.postMessage({
          eXHTML: true,
          type: 'eXHTML-console',
          method: 'error',
          message: maybeStringify(err.message || err)
        }, source);
      }
    }
  }
  */
  console.log('++++')
  console.log(window.console)

  window.onerror = function (error) {
    return console.error(error);
  }
};
