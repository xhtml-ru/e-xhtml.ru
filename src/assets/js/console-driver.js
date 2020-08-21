! function () {
  function n(n) {
    for (var t = [].slice.call(n), o = [], c = [], u = 0; u < t.length; u++) e(t[u]) ? (c.push(i(t[u].outerHTML)), o.push(1)) : (c.push(i(t[u])), o.push(r(t[u])));
    return {
      complexities: o,
      stringifiedArguments: c
    }
  }

  function t(n) {
    var t;
    try {
      t = {}.toString.call(n)
    } catch (e) {
      t = c
    }
    return t
  }

  function e(n) {
    return !!(n && "object" == typeof n && "nodeType" in n && 1 === n.nodeType && n.outerHTML)
  }

  function o(n, t) {
    return n.toLowerCase() < t.toLowerCase() ? -1 : 1
  }

  function r(n) {
    if (null == n) return u;
    var e = t(n),
      o;
    if ("[object Number]" === e || "[object Boolean]" === e || "[object String]" === e) return u;
    if ("[object Function]" === e || "[object global]" === e) return a;
    if (e === c) {
      var r = Object.keys(n);
      for (o = 0; o < r.length; o++) {
        var i = n[r[o]];
        if ("[object Function]" === (f = {}.toString.call(i)) || f === c || "[object Array]" === f) return a
      }
      return u
    }
    if ("[object Array]" === e) {
      for (o = 0; o < n.length; o++) {
        var l = n[o],
          f = {}.toString.call(l);
        if ("[object Function]" === f || f === c || "[object Array]" === f) return a
      }
      return u
    }
    return a
  }

  function i(n, e, r) {
    var u, a, l = "",
      f = [];
    if (r = r || "", e = e || [], null === n) return "null";
    if (void 0 === n) return "undefined";
    if ((l = t(n)) === c && (l = "Object"), "[object Number]" === l) return "" + n;
    if ("[object Boolean]" === l) return n ? "true" : "false";
    if ("[object Function]" === l) return n.toString().split("\n  ").join("\n" + r);
    if ("[object String]" === l) return '"' + n.replace(/"/g, "'") + '"';
    for (a = 0; a < e.length; a++)
      if (n === e[a]) return "[circular " + l.slice(1) + ("outerHTML" in n ? " :\n" + n.outerHTML.split("\n").join("\n" + r) : "");
    if (e.push(n), "[object Array]" === l) {
      for (u = 0; u < n.length; u++) f.push(i(n[u], e));
      return "[" + f.join(", ") + "]"
    }
    if (l.match(/Array/)) return l;
    var s = l + " ",
      g = r + "  ";
    if (r.length / 2 < 2) {
      var p = [];
      try {
        for (u in n) p.push(u)
      } catch (b) {}
      for (p.sort(o), u = 0; u < p.length; u++) try {
        f.push(g + p[u] + ": " + i(n[p[u]], e, g))
      } catch (b) {}
    }
    return f.length ? s + "{\n" + f.join(",\n") + "\n" + r + "}" : s + "{}"
  }
  const c = "[object Object]";
  window.__cpConsoleSafeStringify = n;
  const u = 1,
    a = 2
}(),
function () {
  function n() {
    if (window.console)
      for (let n = 0; n < o.length; n++) ! function e() {
        const e = o[n];
        window.console[e] && (window.console[e] = function () {
          t(e, arguments), this.apply(console, arguments)
        }.bind(console[e]))
      }()
  }

  function t(n, t) {
    const e = window.__cpConsoleSafeStringify(t),
      {
        complexities: o,
        stringifiedArguments: r
      } = e,
      i = {
        eXHTML: true,
        type: 'eXHTML-console',
        method: n,
        args: r,
        message: '',
        complexity: Math.max.apply(null, o)
      };
    window.parent.postMessage(i, "*")
  }

  function e(n) {
    const {
      topic: t,
      data: e
    } = "object" == typeof n.data ? n.data : {};
    if (t === 'HUB_EVENTS.CONSOLE_RUN_COMMAND') try {
      const n = window.eval(e.command);
      console.log(n)
    } catch (o) {
      return void console.error(o.message)
    }
  }
  const o = ["clear", "count", "debug", "error", "info", "log", "table", "time", "timeEnd", "warn"];
  n(), window.addEventListener("message", e, !1)
}();