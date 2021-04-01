rr = function () {
    var r = [{
        key: 'ctrl+left',
        fn: function () {
          console.log('It WOrks for left')
        }
      },{
        key: 'ctrl+right',
        fn: function () {
          console.log('It WOrks for right')
        }
      }, {
        key: 'ctrl+shift+left',
        fn: function () {
          ki(0, 5)
        }
      }, {
        key: 'ctrl+shift+right',
        fn: function () {
          ki(1, 5)
        }
      }, {
        key: 'shift+O',
        fn: te
      }, {
        key: 'shift+P',
        fn: ne
      }, {
        key: ['up', !0],
        fn: function () {
          lt(0, -1)
        }
      }, {
        key: ['down', !0],
        fn: function () {
          lt(0, 1)
        }
      }, {
        key: ['left', !0],
        fn: function () {
          lt(-1, 0)
        }
      }, {
        key: ['right', !0],
        fn: function () {
          lt(1, 0)
        }
      }, {
        key: 'shift+up',
        fn: function () {
          lt(0, -10)
        }
      }, {
        key: 'shift+down',
        fn: function () {
          lt(0, 10)
        }
      }, {
        key: 'shift+left',
        fn: function () {
          lt(-10, 0)
        }
      }, {
        key: 'shift+right',
        fn: function () {
          lt(10, 0)
        }
      }, {
        key: ['alt+up', !0],
        fn: function () {}
      }, {
        key: ['alt+down', !0],
        fn: function () {}
      }, {
        key: ['alt+left', !0],
        fn: function () {}
      }, {
        key: ['alt+right', !0],
        fn: function () {}
      }, {
        key: ['alt+shift+up', !0],
        fn: function () {}
      }, {
        key: ['alt+shift+down', !0],
        fn: function () {}
      }, {
        key: ['alt+shift+left', !0],
        fn: function () {}
      }, {
        key: ['alt+shift+right', !0],
        fn: function () {}
      }],
    f = {
      '4/Shift+4': '#tools_rect_show',
      '5/Shift+5': '#tools_ellipse_show'
    };
  return {
    setAll: function () {
      var t = {};
      n.each(r, function (r, u) {
        var e, s, h;
        if (u.sel) {
          if (e = n(u.sel), e.length === 0) return !0;
          u.evt && (svgedit.browser.isTouch() && u.evt === 'click' && (u.evt = 'mousedown'), e[u.evt](u.fn), e[u.evt](function () {
            n('#exMenu2').removeClass('show');
            n('.menu2ct').dialog('close')
          }));
          u.parent && n(u.parent + '_show').length !== 0 && (s = n(u.parent), s.length || (s = lr(u.parent.substr(1))), s.append(e), n.isArray(t[u.parent]) || (t[u.parent] = []), t[u.parent].push(u))
        }
        if (u.key) {
          var o, l = !0,
            a = u.fn,
            c = !1;
          n.isArray(u.key) ? (o = u.key[0], u.key.length > 1 && (c = u.key[1]), u.key.length > 2 && (l = u.key[2])) : o = u.key;
          o += '';
          n.each(o.split('/'), function (t, r) {
            n(document).bind('keydown', r, function (n) {
              if (!i.isModalDialogOpen) return a(), c && n.preventDefault(), !1
            })
          });
          u.sel && !u.hidekey && e.attr('title') && (h = e.attr('title').split('[')[0] + ' (' + o + ')', f[o] = u.sel, e.parents('#main_menu').length || (h = h.replace('meta', '⌘'), e.attr('title', h)))
        }
      });
      sf(t);
      n('.attr_changer, #image_url').bind('keydown', 'return', function (t) {
        n(this).change();
        t.preventDefault()
      });
      n(window).bind('keydown', 'tab', function (n) {
        hi === 'canvas' && (n.preventDefault(), ne())
      }).bind('keydown', 'shift+tab', function (n) {
        hi === 'canvas' && (n.preventDefault(), te())
      });
      n('#tool_zoom').dblclick(oh)
    },
    setTitles: function () {
      n.each(f, function (t, i) {
        var r = n(i).parents('#main_menu').length;
        n(i).each(function () {
          var i, f;
          i = r ? n(this).text().split(' [')[0] : this.title.split(' [')[0];
          f = '';
          n.each(t.split('/'), function (n, t) {
            var i = t.split('+'),
              r = '';
            i.length > 1 && (r = i[0] + '+', t = i[1]);
            f += (n ? '/' : '') + r + (u['key_' + t] || t)
          });
          r ? this.lastChild.textContent = i + ' [' + f + ']' : this.title = i + ' [' + f + ']'
        })
      })
    },
    getButtonData: function (t) {
      var i;
      return n.each(r, function (n, r) {
        r.sel === t && (i = r)
      }), i
    }
  }
}();
