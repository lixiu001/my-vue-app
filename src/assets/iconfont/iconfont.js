(window._iconfont_svg_string_2301085 =
  (function (h) {
    var a = (a = document.getElementsByTagName("script"))[a.length - 1],
      l = a.getAttribute("data-injectcss"),
      a = a.getAttribute("data-disable-injectsvg");
    if (!a) {
      var c,
        i,
        o,
        z,
        v,
        m = function (a, l) {
          l.parentNode.insertBefore(a, l);
        };
      if (l && !h.__iconfont__svg__cssinject__) {
        h.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (a) {
          console && console.log(a);
        }
      }
      (c = function () {
        var a,
          l = document.createElement("div");
        (l.innerHTML = h._iconfont_svg_string_2301085),
          (l = l.getElementsByTagName("svg")[0]) &&
            (l.setAttribute("aria-hidden", "true"),
            (l.style.position = "absolute"),
            (l.style.width = 0),
            (l.style.height = 0),
            (l.style.overflow = "hidden"),
            (l = l),
            (a = document.body).firstChild
              ? m(l, a.firstChild)
              : a.appendChild(l));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(c, 0)
            : ((i = function () {
                document.removeEventListener("DOMContentLoaded", i, !1), c();
              }),
              document.addEventListener("DOMContentLoaded", i, !1))
          : document.attachEvent &&
            ((o = c),
            (z = h.document),
            (v = !1),
            p(),
            (z.onreadystatechange = function () {
              "complete" == z.readyState &&
                ((z.onreadystatechange = null), t());
            }));
    }
    function t() {
      v || ((v = !0), o());
    }
    function p() {
      try {
        z.documentElement.doScroll("left");
      } catch (a) {
        return void setTimeout(p, 50);
      }
      t();
    }
  })(window);