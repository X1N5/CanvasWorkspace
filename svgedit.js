/* mime: text/plain */
function touchHandler(n) {
  var u = n.changedTouches,
    t = u[0],
    i = "",
    r;
  switch (n.type) {
    case "touchstart":
      i = "mousedown";
      break;
    case "touchmove":
      i = "mousemove";
      break;
    case "touchend":
      i = "mouseup";
      break;
    default:
      return
  }
  r = document.createEvent("MouseEvent");
  r.initMouseEvent(i, !0, !0, window, 1, t.screenX, t.screenY, t.clientX, t.clientY, !1, !1, !1, !1, 0, null);
  u.length < 2 && (t.target.dispatchEvent(r), n.preventDefault())
}
var svgEditor, svgedit;
(function () {
  "use strict";
  "SVGPathSeg" in window || (window.SVGPathSeg = function (n, t, i) {
    this.pathSegType = n;
    this.pathSegTypeAsLetter = t;
    this._owningPathSegList = i
  }, window.SVGPathSeg.prototype.classname = "SVGPathSeg", window.SVGPathSeg.PATHSEG_UNKNOWN = 0, window.SVGPathSeg.PATHSEG_CLOSEPATH = 1, window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2, window.SVGPathSeg.PATHSEG_MOVETO_REL = 3, window.SVGPathSeg.PATHSEG_LINETO_ABS = 4, window.SVGPathSeg.PATHSEG_LINETO_REL = 5, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9, window.SVGPathSeg.PATHSEG_ARC_ABS = 10, window.SVGPathSeg.PATHSEG_ARC_REL = 11, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19, window.SVGPathSeg.prototype._segmentChanged = function () {
    this._owningPathSegList && this._owningPathSegList.segmentChanged(this)
  }, window.SVGPathSegClosePath = function (n) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", n)
  }, window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegClosePath.prototype.toString = function () {
    return "[object SVGPathSegClosePath]"
  }, window.SVGPathSegClosePath.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter
  }, window.SVGPathSegClosePath.prototype.clone = function () {
    return new window.SVGPathSegClosePath(undefined)
  }, window.SVGPathSegMovetoAbs = function (n, t, i) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", n);
    this._x = t;
    this._y = i
  }, window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegMovetoAbs.prototype.toString = function () {
    return "[object SVGPathSegMovetoAbs]"
  }, window.SVGPathSegMovetoAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
  }, window.SVGPathSegMovetoAbs.prototype.clone = function () {
    return new window.SVGPathSegMovetoAbs(undefined, this._x, this._y)
  }, Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegMovetoRel = function (n, t, i) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", n);
    this._x = t;
    this._y = i
  }, window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegMovetoRel.prototype.toString = function () {
    return "[object SVGPathSegMovetoRel]"
  }, window.SVGPathSegMovetoRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
  }, window.SVGPathSegMovetoRel.prototype.clone = function () {
    return new window.SVGPathSegMovetoRel(undefined, this._x, this._y)
  }, Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegLinetoAbs = function (n, t, i) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", n);
    this._x = t;
    this._y = i
  }, window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegLinetoAbs.prototype.toString = function () {
    return "[object SVGPathSegLinetoAbs]"
  }, window.SVGPathSegLinetoAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
  }, window.SVGPathSegLinetoAbs.prototype.clone = function () {
    return new window.SVGPathSegLinetoAbs(undefined, this._x, this._y)
  }, Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegLinetoRel = function (n, t, i) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", n);
    this._x = t;
    this._y = i
  }, window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegLinetoRel.prototype.toString = function () {
    return "[object SVGPathSegLinetoRel]"
  }, window.SVGPathSegLinetoRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
  }, window.SVGPathSegLinetoRel.prototype.clone = function () {
    return new window.SVGPathSegLinetoRel(undefined, this._x, this._y)
  }, Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoCubicAbs = function (n, t, i, r, u, f, e) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", n);
    this._x = t;
    this._y = i;
    this._x1 = r;
    this._y1 = u;
    this._x2 = f;
    this._y2 = e
  }, window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoCubicAbs.prototype.toString = function () {
    return "[object SVGPathSegCurvetoCubicAbs]"
  }, window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoCubicAbs.prototype.clone = function () {
    return new window.SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
  }, Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
    get: function () {
      return this._x1
    },
    set: function (n) {
      this._x1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
    get: function () {
      return this._y1
    },
    set: function (n) {
      this._y1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
    get: function () {
      return this._x2
    },
    set: function (n) {
      this._x2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
    get: function () {
      return this._y2
    },
    set: function (n) {
      this._y2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoCubicRel = function (n, t, i, r, u, f, e) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", n);
    this._x = t;
    this._y = i;
    this._x1 = r;
    this._y1 = u;
    this._x2 = f;
    this._y2 = e
  }, window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoCubicRel.prototype.toString = function () {
    return "[object SVGPathSegCurvetoCubicRel]"
  }, window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoCubicRel.prototype.clone = function () {
    return new window.SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
  }, Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
    get: function () {
      return this._x1
    },
    set: function (n) {
      this._x1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
    get: function () {
      return this._y1
    },
    set: function (n) {
      this._y1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
    get: function () {
      return this._x2
    },
    set: function (n) {
      this._x2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
    get: function () {
      return this._y2
    },
    set: function (n) {
      this._y2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoQuadraticAbs = function (n, t, i, r, u) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", n);
    this._x = t;
    this._y = i;
    this._x1 = r;
    this._y1 = u
  }, window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () {
    return "[object SVGPathSegCurvetoQuadraticAbs]"
  }, window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () {
    return new window.SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1)
  }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
    get: function () {
      return this._x1
    },
    set: function (n) {
      this._x1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
    get: function () {
      return this._y1
    },
    set: function (n) {
      this._y1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoQuadraticRel = function (n, t, i, r, u) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", n);
    this._x = t;
    this._y = i;
    this._x1 = r;
    this._y1 = u
  }, window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function () {
    return "[object SVGPathSegCurvetoQuadraticRel]"
  }, window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function () {
    return new window.SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1)
  }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
    get: function () {
      return this._x1
    },
    set: function (n) {
      this._x1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
    get: function () {
      return this._y1
    },
    set: function (n) {
      this._y1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegArcAbs = function (n, t, i, r, u, f, e, o) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", n);
    this._x = t;
    this._y = i;
    this._r1 = r;
    this._r2 = u;
    this._angle = f;
    this._largeArcFlag = e;
    this._sweepFlag = o
  }, window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegArcAbs.prototype.toString = function () {
    return "[object SVGPathSegArcAbs]"
  }, window.SVGPathSegArcAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
  }, window.SVGPathSegArcAbs.prototype.clone = function () {
    return new window.SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
  }, Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
    get: function () {
      return this._r1
    },
    set: function (n) {
      this._r1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
    get: function () {
      return this._r2
    },
    set: function (n) {
      this._r2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
    get: function () {
      return this._angle
    },
    set: function (n) {
      this._angle = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
    get: function () {
      return this._largeArcFlag
    },
    set: function (n) {
      this._largeArcFlag = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
    get: function () {
      return this._sweepFlag
    },
    set: function (n) {
      this._sweepFlag = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegArcRel = function (n, t, i, r, u, f, e, o) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", n);
    this._x = t;
    this._y = i;
    this._r1 = r;
    this._r2 = u;
    this._angle = f;
    this._largeArcFlag = e;
    this._sweepFlag = o
  }, window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegArcRel.prototype.toString = function () {
    return "[object SVGPathSegArcRel]"
  }, window.SVGPathSegArcRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
  }, window.SVGPathSegArcRel.prototype.clone = function () {
    return new window.SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
  }, Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
    get: function () {
      return this._r1
    },
    set: function (n) {
      this._r1 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
    get: function () {
      return this._r2
    },
    set: function (n) {
      this._r2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
    get: function () {
      return this._angle
    },
    set: function (n) {
      this._angle = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
    get: function () {
      return this._largeArcFlag
    },
    set: function (n) {
      this._largeArcFlag = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
    get: function () {
      return this._sweepFlag
    },
    set: function (n) {
      this._sweepFlag = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegLinetoHorizontalAbs = function (n, t) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", n);
    this._x = t
  }, window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function () {
    return "[object SVGPathSegLinetoHorizontalAbs]"
  }, window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x
  }, window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function () {
    return new window.SVGPathSegLinetoHorizontalAbs(undefined, this._x)
  }, Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegLinetoHorizontalRel = function (n, t) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", n);
    this._x = t
  }, window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegLinetoHorizontalRel.prototype.toString = function () {
    return "[object SVGPathSegLinetoHorizontalRel]"
  }, window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x
  }, window.SVGPathSegLinetoHorizontalRel.prototype.clone = function () {
    return new window.SVGPathSegLinetoHorizontalRel(undefined, this._x)
  }, Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegLinetoVerticalAbs = function (n, t) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", n);
    this._y = t
  }, window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegLinetoVerticalAbs.prototype.toString = function () {
    return "[object SVGPathSegLinetoVerticalAbs]"
  }, window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._y
  }, window.SVGPathSegLinetoVerticalAbs.prototype.clone = function () {
    return new window.SVGPathSegLinetoVerticalAbs(undefined, this._y)
  }, Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegLinetoVerticalRel = function (n, t) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", n);
    this._y = t
  }, window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegLinetoVerticalRel.prototype.toString = function () {
    return "[object SVGPathSegLinetoVerticalRel]"
  }, window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._y
  }, window.SVGPathSegLinetoVerticalRel.prototype.clone = function () {
    return new window.SVGPathSegLinetoVerticalRel(undefined, this._y)
  }, Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoCubicSmoothAbs = function (n, t, i, r, u) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", n);
    this._x = t;
    this._y = i;
    this._x2 = r;
    this._y2 = u
  }, window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () {
    return "[object SVGPathSegCurvetoCubicSmoothAbs]"
  }, window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () {
    return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2)
  }, Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
    get: function () {
      return this._x2
    },
    set: function (n) {
      this._x2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
    get: function () {
      return this._y2
    },
    set: function (n) {
      this._y2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoCubicSmoothRel = function (n, t, i, r, u) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", n);
    this._x = t;
    this._y = i;
    this._x2 = r;
    this._y2 = u
  }, window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () {
    return "[object SVGPathSegCurvetoCubicSmoothRel]"
  }, window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () {
    return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2)
  }, Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
    get: function () {
      return this._x2
    },
    set: function (n) {
      this._x2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
    get: function () {
      return this._y2
    },
    set: function (n) {
      this._y2 = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoQuadraticSmoothAbs = function (n, t, i) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", n);
    this._x = t;
    this._y = i
  }, window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () {
    return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"
  }, window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () {
    return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y)
  }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathSegCurvetoQuadraticSmoothRel = function (n, t, i) {
    window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", n);
    this._x = t;
    this._y = i
  }, window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype), window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () {
    return "[object SVGPathSegCurvetoQuadraticSmoothRel]"
  }, window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () {
    return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
  }, window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () {
    return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y)
  }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
    get: function () {
      return this._x
    },
    set: function (n) {
      this._x = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
    get: function () {
      return this._y
    },
    set: function (n) {
      this._y = n;
      this._segmentChanged()
    },
    enumerable: !0
  }), window.SVGPathElement.prototype.createSVGPathSegClosePath = function () {
    return new window.SVGPathSegClosePath(undefined)
  }, window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (n, t) {
    return new window.SVGPathSegMovetoAbs(undefined, n, t)
  }, window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function (n, t) {
    return new window.SVGPathSegMovetoRel(undefined, n, t)
  }, window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (n, t) {
    return new window.SVGPathSegLinetoAbs(undefined, n, t)
  }, window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function (n, t) {
    return new window.SVGPathSegLinetoRel(undefined, n, t)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (n, t, i, r, u, f) {
    return new window.SVGPathSegCurvetoCubicAbs(undefined, n, t, i, r, u, f)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (n, t, i, r, u, f) {
    return new window.SVGPathSegCurvetoCubicRel(undefined, n, t, i, r, u, f)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (n, t, i, r) {
    return new window.SVGPathSegCurvetoQuadraticAbs(undefined, n, t, i, r)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (n, t, i, r) {
    return new window.SVGPathSegCurvetoQuadraticRel(undefined, n, t, i, r)
  }, window.SVGPathElement.prototype.createSVGPathSegArcAbs = function (n, t, i, r, u, f, e) {
    return new window.SVGPathSegArcAbs(undefined, n, t, i, r, u, f, e)
  }, window.SVGPathElement.prototype.createSVGPathSegArcRel = function (n, t, i, r, u, f, e) {
    return new window.SVGPathSegArcRel(undefined, n, t, i, r, u, f, e)
  }, window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (n) {
    return new window.SVGPathSegLinetoHorizontalAbs(undefined, n)
  }, window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (n) {
    return new window.SVGPathSegLinetoHorizontalRel(undefined, n)
  }, window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (n) {
    return new window.SVGPathSegLinetoVerticalAbs(undefined, n)
  }, window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (n) {
    return new window.SVGPathSegLinetoVerticalRel(undefined, n)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (n, t, i, r) {
    return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, n, t, i, r)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (n, t, i, r) {
    return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, n, t, i, r)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (n, t) {
    return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, n, t)
  }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (n, t) {
    return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, n, t)
  }, "getPathSegAtLength" in window.SVGPathElement.prototype || (window.SVGPathElement.prototype.getPathSegAtLength = function (n) {
    var i, t;
    if (n === undefined || !isFinite(n)) throw "Invalid arguments.";
    if (i = document.createElementNS("http://www.w3.org/2000/svg", "path"), i.setAttribute("d", this.getAttribute("d")), t = i.pathSegList.numberOfItems - 1, t <= 0) return 0;
    do {
      if (i.pathSegList.removeItem(t), n > i.getTotalLength()) break;
      t--
    } while (t > 0);
    return t
  }));
  "SVGPathSegList" in window && "appendItem" in window.SVGPathSegList.prototype || (window.SVGPathSegList = function (n) {
    this._pathElement = n;
    this._list = this._parsePath(this._pathElement.getAttribute("d"));
    this._mutationObserverConfig = {
      attributes: !0,
      attributeFilter: ["d"]
    };
    this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
    this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
  }, window.SVGPathSegList.prototype.classname = "SVGPathSegList", Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
    get: function () {
      return this._checkPathSynchronizedToList(), this._list.length
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
    get: function () {
      return this._pathSegList || (this._pathSegList = new window.SVGPathSegList(this)), this._pathSegList
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
    get: function () {
      return this.pathSegList
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
    get: function () {
      return this.pathSegList
    },
    enumerable: !0
  }), Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
    get: function () {
      return this.pathSegList
    },
    enumerable: !0
  }), window.SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
    this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords())
  }, window.SVGPathSegList.prototype._updateListFromPathMutations = function (n) {
    if (this._pathElement) {
      var t = !1;
      n.forEach(function (n) {
        n.attributeName == "d" && (t = !0)
      });
      t && (this._list = this._parsePath(this._pathElement.getAttribute("d")))
    }
  }, window.SVGPathSegList.prototype._writeListToPath = function () {
    this._pathElementMutationObserver.disconnect();
    this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
    this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
  }, window.SVGPathSegList.prototype.segmentChanged = function () {
    this._writeListToPath()
  }, window.SVGPathSegList.prototype.clear = function () {
    this._checkPathSynchronizedToList();
    this._list.forEach(function (n) {
      n._owningPathSegList = null
    });
    this._list = [];
    this._writeListToPath()
  }, window.SVGPathSegList.prototype.initialize = function (n) {
    return this._checkPathSynchronizedToList(), this._list = [n], n._owningPathSegList = this, this._writeListToPath(), n
  }, window.SVGPathSegList.prototype._checkValidIndex = function (n) {
    if (isNaN(n) || n < 0 || n >= this.numberOfItems) throw "INDEX_SIZE_ERR";
  }, window.SVGPathSegList.prototype.getItem = function (n) {
    return this._checkPathSynchronizedToList(), this._checkValidIndex(n), this._list[n]
  }, window.SVGPathSegList.prototype.insertItemBefore = function (n, t) {
    return this._checkPathSynchronizedToList(), t > this.numberOfItems && (t = this.numberOfItems), n._owningPathSegList && (n = n.clone()), this._list.splice(t, 0, n), n._owningPathSegList = this, this._writeListToPath(), n
  }, window.SVGPathSegList.prototype.replaceItem = function (n, t) {
    return this._checkPathSynchronizedToList(), n._owningPathSegList && (n = n.clone()), this._checkValidIndex(t), this._list[t] = n, n._owningPathSegList = this, this._writeListToPath(), n
  }, window.SVGPathSegList.prototype.removeItem = function (n) {
    this._checkPathSynchronizedToList();
    this._checkValidIndex(n);
    var t = this._list[n];
    return this._list.splice(n, 1), this._writeListToPath(), t
  }, window.SVGPathSegList.prototype.appendItem = function (n) {
    return this._checkPathSynchronizedToList(), n._owningPathSegList && (n = n.clone()), this._list.push(n), n._owningPathSegList = this, this._writeListToPath(), n
  }, window.SVGPathSegList._pathSegArrayAsString = function (n) {
    var t = "",
      i = !0;
    return n.forEach(function (n) {
      i ? (i = !1, t += n._asPathString()) : t += " " + n._asPathString()
    }), t
  }, window.SVGPathSegList.prototype._parsePath = function (n) {
    var t, u, i, f, r, e;
    if (!n || n.length == 0) return [];
    if (t = this, u = function () {
        this.pathSegList = []
      }, u.prototype.appendSegment = function (n) {
        this.pathSegList.push(n)
      }, i = function (n) {
        this._string = n;
        this._currentIndex = 0;
        this._endIndex = this._string.length;
        this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;
        this._skipOptionalSpaces()
      }, i.prototype._isCurrentSpace = function () {
        var n = this._string[this._currentIndex];
        return n <= " " && (n == " " || n == "\n" || n == "\t" || n == "\r" || n == "\f")
      }, i.prototype._skipOptionalSpaces = function () {
        while (this._currentIndex < this._endIndex && this._isCurrentSpace()) this._currentIndex++;
        return this._currentIndex < this._endIndex
      }, i.prototype._skipOptionalSpacesOrDelimiter = function () {
        return this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != "," ? !1 : (this._skipOptionalSpaces() && this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "," && (this._currentIndex++, this._skipOptionalSpaces()), this._currentIndex < this._endIndex)
      }, i.prototype.hasMoreData = function () {
        return this._currentIndex < this._endIndex
      }, i.prototype.peekSegmentType = function () {
        var n = this._string[this._currentIndex];
        return this._pathSegTypeFromChar(n)
      }, i.prototype._pathSegTypeFromChar = function (n) {
        switch (n) {
          case "Z":
          case "z":
            return window.SVGPathSeg.PATHSEG_CLOSEPATH;
          case "M":
            return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
          case "m":
            return window.SVGPathSeg.PATHSEG_MOVETO_REL;
          case "L":
            return window.SVGPathSeg.PATHSEG_LINETO_ABS;
          case "l":
            return window.SVGPathSeg.PATHSEG_LINETO_REL;
          case "C":
            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
          case "c":
            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
          case "Q":
            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
          case "q":
            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
          case "A":
            return window.SVGPathSeg.PATHSEG_ARC_ABS;
          case "a":
            return window.SVGPathSeg.PATHSEG_ARC_REL;
          case "H":
            return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
          case "h":
            return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
          case "V":
            return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
          case "v":
            return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
          case "S":
            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
          case "s":
            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
          case "T":
            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
          case "t":
            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
          default:
            return window.SVGPathSeg.PATHSEG_UNKNOWN
        }
      }, i.prototype._nextCommandHelper = function (n, t) {
        return (n == "+" || n == "-" || n == "." || n >= "0" && n <= "9") && t != window.SVGPathSeg.PATHSEG_CLOSEPATH ? t == window.SVGPathSeg.PATHSEG_MOVETO_ABS ? window.SVGPathSeg.PATHSEG_LINETO_ABS : t == window.SVGPathSeg.PATHSEG_MOVETO_REL ? window.SVGPathSeg.PATHSEG_LINETO_REL : t : window.SVGPathSeg.PATHSEG_UNKNOWN
      }, i.prototype.initialCommandIsMoveTo = function () {
        if (!this.hasMoreData()) return !0;
        var n = this.peekSegmentType();
        return n == window.SVGPathSeg.PATHSEG_MOVETO_ABS || n == window.SVGPathSeg.PATHSEG_MOVETO_REL
      }, i.prototype._parseNumber = function () {
        var n = 0,
          f = 0,
          e = 1,
          o = 0,
          s = 1,
          h = 1,
          c = this._currentIndex,
          i, r, u, t;
        if (this._skipOptionalSpaces(), this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+" ? this._currentIndex++ : this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-" && (this._currentIndex++, s = -1), this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != ".") return undefined;
        for (i = this._currentIndex; this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9";) this._currentIndex++;
        if (this._currentIndex != i)
          for (r = this._currentIndex - 1, u = 1; r >= i;) f += u * (this._string.charAt(r--) - "0"), u *= 10;
        if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
          if (this._currentIndex++, this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
          while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") e *= 10, o += (this._string.charAt(this._currentIndex) - "0") / e, this._currentIndex += 1
        }
        if (this._currentIndex != c && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m") {
          if (this._currentIndex++, this._string.charAt(this._currentIndex) == "+" ? this._currentIndex++ : this._string.charAt(this._currentIndex) == "-" && (this._currentIndex++, h = -1), this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
          while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") n *= 10, n += this._string.charAt(this._currentIndex) - "0", this._currentIndex++
        }
        return (t = f + o, t *= s, n && (t *= Math.pow(10, h * n)), c == this._currentIndex) ? undefined : (this._skipOptionalSpacesOrDelimiter(), t)
      }, i.prototype._parseArcFlag = function () {
        if (this._currentIndex >= this._endIndex) return undefined;
        var n = !1,
          t = this._string.charAt(this._currentIndex++);
        if (t == "0") n = !1;
        else if (t == "1") n = !0;
        else return undefined;
        return this._skipOptionalSpacesOrDelimiter(), n
      }, i.prototype.parseSegment = function () {
        var r = this._string[this._currentIndex],
          i = this._pathSegTypeFromChar(r),
          n;
        if (i == window.SVGPathSeg.PATHSEG_UNKNOWN) {
          if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN || (i = this._nextCommandHelper(r, this._previousCommand), i == window.SVGPathSeg.PATHSEG_UNKNOWN)) return null
        } else this._currentIndex++;
        this._previousCommand = i;
        switch (i) {
          case window.SVGPathSeg.PATHSEG_MOVETO_REL:
            return new window.SVGPathSegMovetoRel(t, this._parseNumber(), this._parseNumber());
          case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
            return new window.SVGPathSegMovetoAbs(t, this._parseNumber(), this._parseNumber());
          case window.SVGPathSeg.PATHSEG_LINETO_REL:
            return new window.SVGPathSegLinetoRel(t, this._parseNumber(), this._parseNumber());
          case window.SVGPathSeg.PATHSEG_LINETO_ABS:
            return new window.SVGPathSegLinetoAbs(t, this._parseNumber(), this._parseNumber());
          case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
            return new window.SVGPathSegLinetoHorizontalRel(t, this._parseNumber());
          case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
            return new window.SVGPathSegLinetoHorizontalAbs(t, this._parseNumber());
          case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
            return new window.SVGPathSegLinetoVerticalRel(t, this._parseNumber());
          case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
            return new window.SVGPathSegLinetoVerticalAbs(t, this._parseNumber());
          case window.SVGPathSeg.PATHSEG_CLOSEPATH:
            return this._skipOptionalSpaces(), new window.SVGPathSegClosePath(t);
          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
            return n = {
              x1: this._parseNumber(),
              y1: this._parseNumber(),
              x2: this._parseNumber(),
              y2: this._parseNumber(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegCurvetoCubicRel(t, n.x, n.y, n.x1, n.y1, n.x2, n.y2);
          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
            return n = {
              x1: this._parseNumber(),
              y1: this._parseNumber(),
              x2: this._parseNumber(),
              y2: this._parseNumber(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegCurvetoCubicAbs(t, n.x, n.y, n.x1, n.y1, n.x2, n.y2);
          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
            return n = {
              x2: this._parseNumber(),
              y2: this._parseNumber(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegCurvetoCubicSmoothRel(t, n.x, n.y, n.x2, n.y2);
          case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
            return n = {
              x2: this._parseNumber(),
              y2: this._parseNumber(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegCurvetoCubicSmoothAbs(t, n.x, n.y, n.x2, n.y2);
          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
            return n = {
              x1: this._parseNumber(),
              y1: this._parseNumber(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegCurvetoQuadraticRel(t, n.x, n.y, n.x1, n.y1);
          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
            return n = {
              x1: this._parseNumber(),
              y1: this._parseNumber(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegCurvetoQuadraticAbs(t, n.x, n.y, n.x1, n.y1);
          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
            return new window.SVGPathSegCurvetoQuadraticSmoothRel(t, this._parseNumber(), this._parseNumber());
          case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
            return new window.SVGPathSegCurvetoQuadraticSmoothAbs(t, this._parseNumber(), this._parseNumber());
          case window.SVGPathSeg.PATHSEG_ARC_REL:
            return n = {
              x1: this._parseNumber(),
              y1: this._parseNumber(),
              arcAngle: this._parseNumber(),
              arcLarge: this._parseArcFlag(),
              arcSweep: this._parseArcFlag(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegArcRel(t, n.x, n.y, n.x1, n.y1, n.arcAngle, n.arcLarge, n.arcSweep);
          case window.SVGPathSeg.PATHSEG_ARC_ABS:
            return n = {
              x1: this._parseNumber(),
              y1: this._parseNumber(),
              arcAngle: this._parseNumber(),
              arcLarge: this._parseArcFlag(),
              arcSweep: this._parseArcFlag(),
              x: this._parseNumber(),
              y: this._parseNumber()
            }, new window.SVGPathSegArcAbs(t, n.x, n.y, n.x1, n.y1, n.arcAngle, n.arcLarge, n.arcSweep);
          default:
            throw "Unknown path seg type.";
        }
      }, f = new u, r = new i(n), !r.initialCommandIsMoveTo()) return [];
    while (r.hasMoreData()) {
      if (e = r.parseSegment(), !e) return [];
      f.appendSegment(e)
    }
    return f.pathSegList
  })
})(),
function (n) {
  function t(t) {
    if (typeof t.data == "string") {
      var r = t.handler,
        i = t.data.toLowerCase().split(" ");
      t.handler = function (t) {
        var o, h;
        if (this === t.target || !/textarea|select/i.test(t.target.nodeName) && t.target.type !== "text") {
          var f = t.type !== "keypress" && n.hotkeys.specialKeys[t.which],
            s = String.fromCharCode(t.which).toLowerCase(),
            u = "",
            e = {};
          for (t.altKey && f !== "alt" && (u += "alt+"), t.ctrlKey && f !== "ctrl" && (u += "ctrl+"), t.metaKey && !t.ctrlKey && f !== "meta" && (u += "meta+"), t.shiftKey && f !== "shift" && (u += "shift+"), f ? e[u + f] = !0 : (e[u + s] = !0, e[u + n.hotkeys.shiftNums[s]] = !0, u === "shift+" && (e[n.hotkeys.shiftNums[s]] = !0)), o = 0, h = i.length; o < h; o++)
            if (e[i[o]]) return r.apply(this, arguments)
        }
      }
    }
  }
  n.hotkeys = {
    version: "0.8",
    specialKeys: {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      191: "/",
      224: "meta",
      219: "[",
      221: "]"
    },
    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": '"',
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    }
  };
  n.each(["keydown", "keyup", "keypress"], function () {
    n.event.special[this] = {
      add: t
    }
  })
}(jQuery),
function ($, n) {
  function h(n) {
    return typeof n == "string"
  }

  function e(n) {
    var t = w.call(arguments, 1);
    return function () {
      return n.apply(this, t.concat(w.call(arguments)))
    }
  }

  function st(n) {
    return n.replace(/^[^#]*#?(.*)$/, "$1")
  }

  function ht(n) {
    return n.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
  }

  function ut(e, s, c, a, v) {
    var b, y, w, k, d;
    return a !== t ? (w = c.match(e ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/), d = w[3] || "", v === 2 && h(a) ? y = a.replace(e ? it : tt, "") : (k = i(w[2]), a = h(a) ? i[e ? r : u](a) : a, y = v === 2 ? a : v === 1 ? $.extend({}, a, k) : $.extend({}, k, a), y = o(y), e && (y = y.replace(rt, l))), b = w[1] + (e ? "#" : y || !w[1] ? "?" : "") + y + d) : b = s(c !== t ? c : n[p][f]), b
  }

  function ft(n, f, e) {
    return f === t || typeof f == "boolean" ? (e = f, f = o[n ? r : u]()) : f = h(f) ? f.replace(n ? it : tt, "") : f, i(f, e)
  }

  function et(n, i, r, u) {
    return h(r) || typeof r == "object" || (u = r, r = i, i = t), this.each(function () {
      var f = $(this),
        t = i || d()[(this.nodeName || "").toLowerCase()] || "",
        e = t && f.attr(t) || "";
      f.attr(t, o[n](e, r, u))
    })
  }
  var t, w = Array.prototype.slice,
    l = decodeURIComponent,
    o = $.param,
    s, i, a, v = $.bbq = $.bbq || {},
    b, k, d, g = $.event.special,
    nt = "hashchange",
    u = "querystring",
    r = "fragment",
    y = "elemUrlAttr",
    p = "location",
    f = "href",
    c = "src",
    tt = /^.*\?|#.*$/g,
    it = /^.*\#/,
    rt, ot = {};
  o[u] = e(ut, 0, ht);
  o[r] = s = e(ut, 1, st);
  s.noEscape = function (n) {
    n = n || "";
    var t = $.map(n.split(""), encodeURIComponent);
    rt = new RegExp(t.join("|"), "g")
  };
  s.noEscape(",/");
  $.deparam = i = function (n, i) {
    var r = {},
      u = {
        "true": !0,
        "false": !1,
        "null": null
      };
    return $.each(n.replace(/\+/g, " ").split("&"), function (n, f) {
      var v = f.split("="),
        s = l(v[0]),
        e, a = r,
        c = 0,
        o = s.split("]["),
        h = o.length - 1;
      if (/\[/.test(o[0]) && /\]$/.test(o[h]) ? (o[h] = o[h].replace(/\]$/, ""), o = o.shift().split("[").concat(o), h = o.length - 1) : h = 0, v.length === 2)
        if (e = l(v[1]), i && (e = e && !isNaN(e) ? +e : e === "undefined" ? t : u[e] !== t ? u[e] : e), h)
          for (; c <= h; c++) s = o[c] === "" ? a.length : o[c], a = a[s] = c < h ? a[s] || (o[c + 1] && isNaN(o[c + 1]) ? {} : []) : e;
        else $.isArray(r[s]) ? r[s].push(e) : r[s] = r[s] !== t ? [r[s], e] : e;
      else s && (r[s] = i ? t : "")
    }), r
  };
  i[u] = e(ft, 0);
  i[r] = a = e(ft, 1);
  $[y] || ($[y] = function (n) {
    return $.extend(ot, n)
  })({
    a: f,
    base: f,
    iframe: c,
    img: c,
    input: c,
    form: "action",
    link: f,
    script: c
  });
  d = $[y];
  $.fn[u] = e(et, u);
  $.fn[r] = e(et, r);
  v.pushState = b = function (i, r) {
    h(i) && /^#/.test(i) && r === t && (r = 2);
    var u = i !== t,
      e = s(n[p][f], u ? i : {}, u ? r : 2);
    n[p][f] = e + (/#/.test(e) ? "" : "#")
  };
  v.getState = k = function (n, i) {
    return n === t || typeof n == "boolean" ? a(n) : a(i)[n]
  };
  v.removeState = function (n) {
    var i = {};
    n !== t && (i = k(), $.each($.isArray(n) ? n : arguments, function (n, t) {
      delete i[t]
    }));
    b(i, 2)
  };
  g[nt] = $.extend(g[nt], {
    add: function (n) {
      function f(n) {
        var f = n[r] = s();
        n.getState = function (n, r) {
          return n === t || typeof n == "boolean" ? i(f, n) : i(f, r)[n]
        };
        u.apply(this, arguments)
      }
      var u;
      if ($.isFunction(n)) return u = n, f;
      u = n.handler;
      n.handler = f
    }
  })
}(jQuery, this),
function ($, n) {
  function u(t) {
    return t = t || n[i][r], t.replace(/^[^#]*#?(.*)$/, "$1")
  }
  var f, e = $.event.special,
    i = "location",
    t = "hashchange",
    r = "href",
    o = "on" + t in n;
  $[t + "Delay"] = 100;
  e[t] = $.extend(e[t], {
    setup: function () {
      if (o) return !1;
      $(f.start)
    },
    teardown: function () {
      if (o) return !1;
      $(f.stop)
    }
  });
  f = function () {
    function c() {
      e = h = function (n) {
        return n
      };
      is_old_ie && (o = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow, h = function () {
        return u(o.document[i][r])
      }, e = function (n, t) {
        if (n !== t) {
          var r = o.document;
          r.open().close();
          r[i].hash = "#" + n
        }
      }, e(u()))
    }
    var s = {},
      f, o, e, h;
    return s.start = function () {
      if (!f) {
        var o = u();
        e || c(),
          function s() {
            var l = u(),
              c = h(o);
            l !== o ? (e(o = l, c), $(n).trigger(t)) : c !== o && (n[i][r] = n[i][r].replace(/#.*/, "") + "#" + c);
            f = setTimeout(s, $[t + "Delay"])
          }()
      }
    }, s.stop = function () {
      o || (f && clearTimeout(f), f = 0)
    }, s
  }()
}(jQuery, this),
function ($, n, t) {
  function o(n) {
    return n = n || location.href, "#" + n.replace(/^[^#]*#?(.*)$/, "$1")
  }
  var i = "hashchange",
    s = document,
    r, u = $.event.special,
    f = s.documentMode,
    e = "on" + i in n && (f === t || f > 7);
  $.fn[i] = function (n) {
    return n ? this.bind(i, n) : this.trigger(i)
  };
  $.fn[i].delay = 50;
  u[i] = $.extend(u[i], {
    setup: function () {
      if (e) return !1;
      $(r.start)
    },
    teardown: function () {
      if (e) return !1;
      $(r.stop)
    }
  });
  r = function () {
    function s() {
      var f = o(),
        t = c(u);
      f !== u ? (h(u = f, t), $(n).trigger(i)) : t !== u && (location.href = location.href.replace(/#.*/, "") + t);
      r = setTimeout(s, $.fn[i].delay)
    }
    var f = {},
      r, u = o(),
      e = function (n) {
        return n
      },
      h = e,
      c = e;
    return f.start = function () {
      r || s()
    }, f.stop = function () {
      r && clearTimeout(r);
      r = t
    }, f
  }()
}(jQuery, this),
function () {
  function n(n, r, u) {
    var f, o, e;
    if (n = document.createElementNS(t.svg, n), i)
      for (f in r) n.setAttribute(f, r[f]);
    else
      for (f in r) o = r[f], e = n[f], e && e.constructor === "SVGLength" ? e.baseVal.value = o : n.setAttribute(f, o);
    return u && u.appendChild(n), n
  }
  var t = {
      svg: "http://www.w3.org/2000/svg",
      xlink: "http://www.w3.org/1999/xlink"
    },
    i;
  window.console || (window.console = new function () {
    this.log = function () {};
    this.dir = function () {}
  });
  $.jGraduate = {
    Paint: function (n) {
      if (n = n || {}, this.alpha = isNaN(n.alpha) ? 100 : n.alpha, n.copy) {
        this.type = n.copy.type;
        this.alpha = n.copy.alpha;
        this.radialGradient = this.linearGradient = this.solidColor = null;
        switch (this.type) {
          case "solidColor":
            this.solidColor = n.copy.solidColor;
            break;
          case "linearGradient":
            this.linearGradient = n.copy.linearGradient.cloneNode(!0);
            break;
          case "radialGradient":
            this.radialGradient = n.copy.radialGradient.cloneNode(!0)
        }
      } else n.linearGradient ? (this.type = "linearGradient", this.radialGradient = this.solidColor = null, this.linearGradient = n.linearGradient.cloneNode(!0)) : n.radialGradient ? (this.type = "radialGradient", this.linearGradient = this.solidColor = null, this.radialGradient = n.radialGradient.cloneNode(!0)) : n.solidColor ? (this.type = "solidColor", this.solidColor = n.solidColor) : (this.type = "none", this.radialGradient = this.linearGradient = this.solidColor = null)
    }
  };
  jQuery.fn.jGraduateDefaults = {
    paint: new $.jGraduate.Paint,
    window: {
      pickerTitle: "Drag markers to pick a paint"
    },
    images: {
      clientPath: "images/"
    },
    newstop: "inverse"
  };
  i = navigator.userAgent.indexOf("Gecko/") >= 0;
  jQuery.fn.jGraduate = function (i) {
    var r = arguments;
    return this.each(function () {
      function nt(t, i, r, f, s) {
        var h = s || n("stop", {
            "stop-color": i,
            "stop-opacity": r,
            offset: t
          }, e),
          c;
        return s ? (i = s.getAttribute("stop-color"), r = s.getAttribute("stop-opacity"), t = s.getAttribute("offset")) : e.appendChild(h), r === null && (r = 1), s = n("path", {
          d: "M-6.2,0.9c3.6-4,6.7-4.3,6.7-12.4c-0.2,7.9,3.1,8.8,6.5,12.4c3.5,3.8,2.9,9.6,0,12.3c-3.1,2.8-10.4,2.7-13.2,0C-9.6,9.9-9.4,4.4-6.2,0.9z",
          fill: "url(#jGraduate_trans)",
          transform: "translate(" + (10 + t * o) + ", 26)"
        }, ui), c = n("path", {
          d: "M-6.2,0.9c3.6-4,6.7-4.3,6.7-12.4c-0.2,7.9,3.1,8.8,6.5,12.4c3.5,3.8,2.9,9.6,0,12.3c-3.1,2.8-10.4,2.7-13.2,0C-9.6,9.9-9.4,4.4-6.2,0.9z",
          fill: i,
          "fill-opacity": r,
          transform: "translate(" + (10 + t * o) + ", 26)",
          stroke: "#000",
          "stroke-width": 1.5
        }, ui), $(c).mousedown(function (n) {
          return li(this), yt = it, ft.mousemove(ai).mouseup(ur), pt = fi.offset(), n.preventDefault(), !1
        }).data("stop", h).data("bg", s).dblclick(function () {
          $("div.jGraduate_LightBox").show();
          for (var f = this, n = +h.getAttribute("stop-opacity") || 1, t = h.getAttribute("stop-color") || 1, r = (parseFloat(n) * 255).toString(16); r.length < 2;) r = "0" + r;
          i = t.substr(1) + r;
          $("#" + u + "_jGraduate_stopPicker").css({
            left: 100,
            bottom: 15
          }).jPicker({
            window: {
              title: "Pick the start color and opacity for the gradient"
            },
            images: {
              clientPath: l.images.clientPath
            },
            color: {
              active: i,
              alphaSupport: !0
            }
          }, function (i) {
            t = i.val("hex") ? "#" + i.val("hex") : "none";
            n = i.val("a") !== null ? i.val("a") / 256 : 1;
            f.setAttribute("fill", t);
            f.setAttribute("fill-opacity", n);
            h.setAttribute("stop-color", t);
            h.setAttribute("stop-opacity", n);
            $("div.jGraduate_LightBox").hide();
            $("#" + u + "_jGraduate_stopPicker").hide()
          }, null, function () {
            $("div.jGraduate_LightBox").hide();
            $("#" + u + "_jGraduate_stopPicker").hide()
          })
        }), $(e).find("stop").each(function () {
          var u = $(this),
            r, n;
          if (+this.getAttribute("offset") > t) return i || (r = this.getAttribute("stop-color"), n = this.getAttribute("stop-opacity"), h.setAttribute("stop-color", r), c.setAttribute("fill", r), h.setAttribute("stop-opacity", n === null ? 1 : n), c.setAttribute("fill-opacity", n === null ? 1 : n)), u.before(h), !1
        }), f && li(c), h
      }

      function li(n) {
        it && it.setAttribute("stroke", "#000");
        n.setAttribute("stroke", "blue");
        it = n;
        it.parentNode.appendChild(it)
      }

      function ur() {
        if (ft.unbind("mousemove", ai), ct.getAttribute("display") !== "none") {
          ct.setAttribute("display", "none");
          var n = $(it),
            t = n.data("stop");
          n = n.data("bg");
          $([it, t, n]).remove()
        }
        yt = null
      }

      function ht() {
        var n = wt ? "rotate(" + wt + "," + ei + "," + oi + ") " : "";
        ot === 1 && ut === 1 ? e.removeAttribute("gradientTransform") : e.setAttribute("gradientTransform", n + "translate(" + -ei * (ot - 1) + "," + -oi * (ut - 1) + ") scale(" + ot + "," + ut + ")")
      }

      function ai(n) {
        var t = n.pageX - pt.left,
          i, r;
        n = n.pageY - pt.top;
        t = t < 10 ? 10 : t > o + 10 ? o + 10 : t;
        i = "translate(" + t + ", 26)";
        n < -60 || n > 130 ? (ct.setAttribute("display", "block"), ct.setAttribute("transform", i)) : ct.setAttribute("display", "none");
        yt.setAttribute("transform", i);
        $.data(yt, "bg").setAttribute("transform", i);
        $.data(yt, "stop").setAttribute("offset", (t - 10) / o);
        r = 0;
        $(e).find("stop").each(function () {
          var n = this.getAttribute("offset"),
            t = $(this);
          n < r && (t.prev().before(t), g = $(e).find("stop"));
          r = n
        })
      }
      var f = $(this),
        l = $.extend(!0, {}, jQuery.fn.jGraduateDefaults, i),
        u = f.attr("id"),
        y = "#" + f.attr("id") + " ",
        ii, ri, p, ft, vi, c, w, h, tt, k, et, s, si, d, ir, rr, st, hi, ci, ni, ti;
      if (y) {
        ii = function () {
          switch (f.paint.type) {
            case "radialGradient":
              f.paint.linearGradient = null;
              break;
            case "linearGradient":
              f.paint.radialGradient = null;
              break;
            case "solidColor":
              f.paint.radialGradient = f.paint.linearGradient = null
          }
          $.isFunction(f.okCallback) && f.okCallback(f.paint);
          f.hide()
        };
        ri = function () {
          $.isFunction(f.cancelCallback) && f.cancelCallback();
          f.hide()
        };
        $.extend(!0, f, {
          paint: new $.jGraduate.Paint({
            copy: l.paint
          }),
          okCallback: $.isFunction(r[1]) && r[1] || null,
          cancelCallback: $.isFunction(r[2]) && r[2] || null
        });
        f.position();
        p = null;
        ft = $(window);
        f.paint.type == "none" && (f.paint = $.jGraduate.Paint({
          solidColor: "ffffff"
        }));
        f.addClass("jGraduate_Picker");
        f.html('<ul class="jGraduate_tabs"><li class="jGraduate_tab_color jGraduate_tab_current" data-type="col">Solid Color<\/li><li class="jGraduate_tab_lingrad" data-type="lg">Linear Gradient<\/li><li class="jGraduate_tab_radgrad" data-type="rg">Radial Gradient<\/li><\/ul><div class="jGraduate_colPick"><\/div><div class="jGraduate_gradPick"><\/div><div class="jGraduate_LightBox"><\/div><div id="' + u + '_jGraduate_stopPicker" class="jGraduate_stopPicker"><\/div>');
        vi = $(y + "> .jGraduate_colPick");
        c = $(y + "> .jGraduate_gradPick");
        c.html('<div id="' + u + '_jGraduate_Swatch" class="jGraduate_Swatch"><h2 class="jGraduate_Title">' + l.window.pickerTitle + '<\/h2><div id="' + u + '_jGraduate_GradContainer" class="jGraduate_GradContainer"><\/div><div id="' + u + '_jGraduate_StopSlider" class="jGraduate_StopSlider"><\/div><\/div><div class="jGraduate_Form jGraduate_Points jGraduate_lg_field"><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">Begin Point<\/label><div class="jGraduate_Form_Section"><label>x:<\/label><input type="text" id="' + u + '_jGraduate_x1" size="3" title="Enter starting x value between 0.0 and 1.0"/><label> y:<\/label><input type="text" id="' + u + '_jGraduate_y1" size="3" title="Enter starting y value between 0.0 and 1.0"/><\/div><\/div><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">End Point<\/label><div class="jGraduate_Form_Section"><label>x:<\/label><input type="text" id="' + u + '_jGraduate_x2" size="3" title="Enter ending x value between 0.0 and 1.0"/><label> y:<\/label><input type="text" id="' + u + '_jGraduate_y2" size="3" title="Enter ending y value between 0.0 and 1.0"/><\/div><\/div><\/div><div class="jGraduate_Form jGraduate_Points jGraduate_rg_field"><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">Center Point<\/label><div class="jGraduate_Form_Section"><label>x:<\/label><input type="text" id="' + u + '_jGraduate_cx" size="3" title="Enter x value between 0.0 and 1.0"/><label> y:<\/label><input type="text" id="' + u + '_jGraduate_cy" size="3" title="Enter y value between 0.0 and 1.0"/><\/div><\/div><div class="jGraduate_StopSection"><label class="jGraduate_Form_Heading">Focal Point<\/label><div class="jGraduate_Form_Section"><label>Match center: <input type="checkbox" checked="checked" id="' + u + '_jGraduate_match_ctr"/><\/label><br/><label>x:<\/label><input type="text" id="' + u + '_jGraduate_fx" size="3" title="Enter x value between 0.0 and 1.0"/><label> y:<\/label><input type="text" id="' + u + '_jGraduate_fy" size="3" title="Enter y value between 0.0 and 1.0"/><\/div><\/div><\/div><div class="jGraduate_StopSection jGraduate_SpreadMethod"><label class="jGraduate_Form_Heading">Spread method<\/label><div class="jGraduate_Form_Section"><select class="jGraduate_spreadMethod"><option value=pad selected>Pad<\/option><option value=reflect>Reflect<\/option><option value=repeat>Repeat<\/option><\/select><\/div><\/div><div class="jGraduate_Form"><div class="jGraduate_Slider jGraduate_RadiusField jGraduate_rg_field"><label class="prelabel">Radius:<\/label><div id="' + u + '_jGraduate_Radius" class="jGraduate_SliderBar jGraduate_Radius" title="Click to set radius"><img id="' + u + '_jGraduate_RadiusArrows" class="jGraduate_RadiusArrows" src="' + l.images.clientPath + 'rangearrows2.gif"><\/div><label><input type="text" id="' + u + '_jGraduate_RadiusInput" size="3" value="100"/>%<\/label><\/div><div class="jGraduate_Slider jGraduate_EllipField jGraduate_rg_field"><label class="prelabel">Ellip:<\/label><div id="' + u + '_jGraduate_Ellip" class="jGraduate_SliderBar jGraduate_Ellip" title="Click to set Ellip"><img id="' + u + '_jGraduate_EllipArrows" class="jGraduate_EllipArrows" src="' + l.images.clientPath + 'rangearrows2.gif"><\/div><label><input type="text" id="' + u + '_jGraduate_EllipInput" size="3" value="0"/>%<\/label><\/div><div class="jGraduate_Slider jGraduate_AngleField jGraduate_rg_field"><label class="prelabel">Angle:<\/label><div id="' + u + '_jGraduate_Angle" class="jGraduate_SliderBar jGraduate_Angle" title="Click to set Angle"><img id="' + u + '_jGraduate_AngleArrows" class="jGraduate_AngleArrows" src="' + l.images.clientPath + 'rangearrows2.gif"><\/div><label><input type="text" id="' + u + '_jGraduate_AngleInput" size="3" value="0"/>deg<\/label><\/div><div class="jGraduate_Slider jGraduate_OpacField"><label class="prelabel">Opac:<\/label><div id="' + u + '_jGraduate_Opac" class="jGraduate_SliderBar jGraduate_Opac" title="Click to set Opac"><img id="' + u + '_jGraduate_OpacArrows" class="jGraduate_OpacArrows" src="' + l.images.clientPath + 'rangearrows2.gif"><\/div><label><input type="text" id="' + u + '_jGraduate_OpacInput" size="3" value="100"/>%<\/label><\/div><\/div><div class="jGraduate_OkCancel"><input type="button" id="' + u + '_jGraduate_Ok" class="jGraduate_Ok" value="OK"/><input type="button" id="' + u + '_jGraduate_Cancel" class="jGraduate_Cancel" value="Cancel"/><\/div>');
        var o = 256,
          yi = +o,
          pi = +o,
          a, e, bt, v = {};
        $(".jGraduate_SliderBar").width(145);
        w = $("#" + u + "_jGraduate_GradContainer")[0];
        h = n("svg", {
          id: u + "_jgraduate_svg",
          width: o,
          height: o,
          xmlns: t.svg
        }, w);
        a = a || f.paint.type;
        var b = e = f.paint[a],
          at = f.paint.alpha,
          kt = a === "solidColor";
        switch (a) {
          case "solidColor":
          case "linearGradient":
            if (kt || (e.id = u + "_lg_jgraduate_grad", b = e = h.appendChild(e)), n("radialGradient", {
                id: u + "_rg_jgraduate_grad"
              }, h), a === "linearGradient") break;
          case "radialGradient":
            kt || (e.id = u + "_rg_jgraduate_grad", b = e = h.appendChild(e));
            n("linearGradient", {
              id: u + "_lg_jgraduate_grad"
            }, h)
        }
        if (kt)
          if (b = e = $("#" + u + "_lg_jgraduate_grad")[0], p = f.paint[a], nt(0, "#" + p, 1), tt = typeof l.newstop, tt === "string") switch (l.newstop) {
            case "same":
              nt(1, "#" + p, 1);
              break;
            case "inverse":
              for (tt = "", k = 0; k < 6; k += 2) p.substr(k, 2), et = (255 - parseInt(p.substr(k, 2), 16)).toString(16), et.length < 2 && (et = 0 + et), tt += et;
              nt(1, "#" + tt, 1);
              break;
            case "white":
              nt(1, "#ffffff", 1);
              break;
            case "black":
              nt(1, "#000000", 1)
          } else tt === "object" && nt(1, l.newstop.color || "#" + p, "opac" in l.newstop ? l.newstop.opac : 1);
        p = parseFloat(b.getAttribute("x1") || 0);
        tt = parseFloat(b.getAttribute("y1") || 0);
        k = parseFloat(b.getAttribute("x2") || 1);
        et = parseFloat(b.getAttribute("y2") || 0);
        var dt = parseFloat(b.getAttribute("cx") || .5),
          gt = parseFloat(b.getAttribute("cy") || .5),
          wi = parseFloat(b.getAttribute("fx") || dt),
          bi = parseFloat(b.getAttribute("fy") || gt);
        bt = n("rect", {
          id: u + "_jgraduate_rect",
          x: 0,
          y: 0,
          width: yi,
          height: pi,
          fill: "url(#" + u + "_jgraduate_grad)",
          "fill-opacity": at / 100
        }, h);
        var ki = $("<div/>").attr({
            "class": "grad_coord jGraduate_lg_field",
            title: "Begin Stop"
          }).text(1).css({
            top: tt * o,
            left: p * o
          }).data("coord", "start").appendTo(w),
          fr = ki.clone().text(2).css({
            top: et * o,
            left: k * o
          }).attr("title", "End stop").data("coord", "end").appendTo(w),
          di = $("<div/>").attr({
            "class": "grad_coord jGraduate_rg_field",
            title: "Center stop"
          }).text("C").css({
            top: gt * o,
            left: dt * o
          }).data("coord", "center").appendTo(w),
          vt = di.clone().text("F").css({
            top: bi * o,
            left: wi * o,
            display: "none"
          }).attr("title", "Focus point").data("coord", "focus").appendTo(w);
        vt[0].id = u + "_jGraduate_focusCoord";
        $(y + " .grad_coord");
        $.each(["x1", "y1", "x2", "y2", "cx", "cy", "fx", "fy"], function (n, t) {
          var r = e.getAttribute(t),
            i = isNaN(t[1]);
          r || (r = i ? "0.5" : t === "x2" ? "1.0" : "0.0");
          v[t] = $("#" + u + "_jGraduate_" + t).val(r).change(function () {
            isNaN(parseFloat(this.value)) || this.value < 0 ? this.value = 0 : this.value > 1 && (this.value = 1);
            t[0] === "f" && !d || (i && a === "radialGradient" || !i && a === "linearGradient") && e.setAttribute(t, this.value);
            var n = i ? t[0] === "c" ? di : vt : t[1] === "1" ? ki : fr,
              r = t.indexOf("x") >= 0 ? "left" : "top";
            n.css(r, this.value * o)
          }).change()
        });
        var g, ui, fi = $("#" + u + "_jGraduate_StopSlider"),
          it, rt, yt, ct = n("path", {
            d: "m9.75,-6l-19.5,19.5m0,-19.5l19.5,19.5",
            fill: "none",
            stroke: "#D00",
            "stroke-width": 5,
            display: "none"
          }, rt),
          pt, ot = 1,
          ut = 1,
          wt = 0,
          ei = dt,
          oi = gt;
        rt = n("svg", {
          width: "100%",
          height: 45
        }, fi[0]);
        w = n("pattern", {
          width: 16,
          height: 16,
          patternUnits: "userSpaceOnUse",
          id: "jGraduate_trans"
        }, rt);
        n("image", {
          width: 16,
          height: 16
        }, w).setAttributeNS(t.xlink, "xlink:href", l.images.clientPath + "map-opacity.png");
        $(rt).click(function (n) {
          if (pt = fi.offset(), n.target.tagName !== "path") {
            var t = n.pageX - pt.left - 8;
            t = t < 10 ? 10 : t > o + 10 ? o + 10 : t;
            nt(t / o, 0, 0, !0);
            n.stopPropagation()
          }
        });
        $(rt).mouseover(function () {
          rt.appendChild(ct)
        });
        ui = n("g", {}, rt);
        n("line", {
          x1: 10,
          y1: 15,
          x2: o + 10,
          y2: 15,
          "stroke-width": 2,
          stroke: "#000"
        }, rt);
        var gi = c.find(".jGraduate_spreadMethod").change(function () {
            e.setAttribute("spreadMethod", $(this).val())
          }),
          lt = null,
          nr = function (n) {
            var t = n.pageX - si.left,
              i = n.pageY - si.top,
              u, r;
            t = t < 0 ? 0 : t > o ? o : t;
            i = i < 0 ? 0 : i > o ? o : i;
            lt.css("left", t).css("top", i);
            t = t / yi;
            i = i / pi;
            u = lt.data("coord");
            r = e;
            switch (u) {
              case "start":
                v.x1.val(t);
                v.y1.val(i);
                r.setAttribute("x1", t);
                r.setAttribute("y1", i);
                break;
              case "end":
                v.x2.val(t);
                v.y2.val(i);
                r.setAttribute("x2", t);
                r.setAttribute("y2", i);
                break;
              case "center":
                v.cx.val(t);
                v.cy.val(i);
                r.setAttribute("cx", t);
                r.setAttribute("cy", i);
                ei = t;
                oi = i;
                ht();
                break;
              case "focus":
                v.fx.val(t);
                v.fy.val(i);
                r.setAttribute("fx", t);
                r.setAttribute("fy", i);
                ht()
            }
            n.preventDefault()
          },
          tr = function () {
            lt = null;
            ft.unbind("mousemove", nr).unbind("mouseup", tr)
          };
        if (g = e.getElementsByTagNameNS(t.svg, "stop"), s < 2) {
          for (; s < 2;) e.appendChild(document.createElementNS(t.svg, "stop")), ++s;
          g = e.getElementsByTagNameNS(t.svg, "stop")
        }
        for (s = g.length, k = 0; k < s; k++) nt(0, 0, 0, 0, g[k]);
        if (gi.val(e.getAttribute("spreadMethod") || "pad"), d = !1, bt.setAttribute("fill-opacity", at / 100), $("#" + u + " div.grad_coord").mousedown(function (n) {
            n.preventDefault();
            lt = $(this);
            lt.offset();
            si = lt.parent().offset();
            ft.mousemove(nr).mouseup(tr)
          }), $("#" + u + "_jGraduate_Ok").bind("click", function () {
            f.paint.type = a;
            f.paint[a] = e.cloneNode(!0);
            f.paint.solidColor = null;
            ii()
          }), $("#" + u + "_jGraduate_Cancel").bind("click", function () {
            ri()
          }), a === "radialGradient" && (d ? vt.show() : (vt.hide(), v.fx.val(""), v.fy.val(""))), $("#" + u + "_jGraduate_match_ctr")[0].checked = !d, $("#" + u + "_jGraduate_match_ctr").change(function () {
            var n, t, i;
            d = !this.checked;
            vt.toggle(d);
            v.fx.val("");
            v.fy.val("");
            n = e;
            d ? (t = ir || .5, i = rr || .5, n.setAttribute("fx", t), n.setAttribute("fy", i), v.fx.val(t), v.fy.val(i)) : (ir = n.getAttribute("fx"), rr = n.getAttribute("fy"), n.removeAttribute("fx"), n.removeAttribute("fy"))
          }), g = e.getElementsByTagNameNS(t.svg, "stop"), s = g.length, s < 2) {
          for (; s < 2;) e.appendChild(document.createElementNS(t.svg, "stop")), ++s;
          g = e.getElementsByTagNameNS(t.svg, "stop")
        }
        for (at = c = 0, a === "radialGradient" && (h = e.gradientTransform.baseVal, h.numberOfItems === 2 ? (s = h.getItem(0), h = h.getItem(1), s.type === 2 && h.type === 3 && (s = h.matrix, s.a !== 1 ? c = Math.round(-(1 - s.a) * 100) : s.d !== 1 && (c = Math.round((1 - s.d) * 100)))) : h.numberOfItems === 3 && (w = h.getItem(0), s = h.getItem(1), h = h.getItem(2), w.type === 4 && s.type === 2 && h.type === 3 && (at = Math.round(w.angle), s = h.matrix, s.a !== 1 ? c = Math.round(-(1 - s.a) * 100) : s.d !== 1 && (c = Math.round((1 - s.d) * 100))))), c = {
            radius: {
              handle: "#" + u + "_jGraduate_RadiusArrows",
              input: "#" + u + "_jGraduate_RadiusInput",
              val: (e.getAttribute("r") || .5) * 100
            },
            opacity: {
              handle: "#" + u + "_jGraduate_OpacArrows",
              input: "#" + u + "_jGraduate_OpacInput",
              val: f.paint.alpha || 100
            },
            ellip: {
              handle: "#" + u + "_jGraduate_EllipArrows",
              input: "#" + u + "_jGraduate_EllipInput",
              val: c
            },
            angle: {
              handle: "#" + u + "_jGraduate_AngleArrows",
              input: "#" + u + "_jGraduate_AngleInput",
              val: at
            }
          }, $.each(c, function (n, t) {
            var i = $(t.handle);
            i.mousedown(function (r) {
              var u = i.parent();
              st = {
                type: n,
                elem: i,
                input: $(t.input),
                parent: u,
                offset: u.offset()
              };
              ft.mousemove(hi).mouseup(ci);
              r.preventDefault()
            });
            $(t.input).val(t.val).change(function () {
              var t = +this.value,
                r = 0,
                u = a === "radialGradient";
              switch (n) {
                case "radius":
                  u && e.setAttribute("r", t / 100);
                  r = Math.pow(t / 100, .4) / 2 * 145;
                  break;
                case "opacity":
                  f.paint.alpha = t;
                  bt.setAttribute("fill-opacity", t / 100);
                  r = t * 1.45;
                  break;
                case "ellip":
                  if (ot = ut = 1, t === 0) {
                    r = 72.5;
                    break
                  }
                  t > 99.5 && (t = 99.5);
                  t > 0 ? ut = 1 - t / 100 : ot = -(t / 100) - 1;
                  r = 145 * ((t + 100) / 2) / 100;
                  u && ht();
                  break;
                case "angle":
                  wt = t;
                  r = wt / 180;
                  r += .5;
                  r *= 145;
                  u && ht()
              }
              r > 145 ? r = 145 : r < 0 && (r = 0);
              i.css({
                "margin-left": r - 5
              })
            }).change()
          }), hi = function (n) {
            var t = n.pageX - st.offset.left - parseInt(st.parent.css("border-left-width")),
              i;
            t > 145 && (t = 145);
            t <= 0 && (t = 0);
            i = t - 5;
            t /= 145;
            switch (st.type) {
              case "radius":
                t = Math.pow(t * 2, 2.5);
                t > .98 && t < 1.02 && (t = 1);
                t <= .01 && (t = .01);
                e.setAttribute("r", t);
                break;
              case "opacity":
                f.paint.alpha = parseInt(t * 100);
                bt.setAttribute("fill-opacity", t);
                break;
              case "ellip":
                ut = ot = 1;
                t < .5 ? (t /= .5, ot = t <= 0 ? .01 : t) : t > .5 && (t /= .5, t = 2 - t, ut = t <= 0 ? .01 : t);
                ht();
                t -= 1;
                ut === t + 1 && (t = Math.abs(t));
                break;
              case "angle":
                t -= .5;
                wt = t *= 180;
                ht();
                t /= 100
            }
            st.elem.css({
              "margin-left": i
            });
            t = Math.round(t * 100);
            st.input.val(t);
            n.preventDefault()
          }, ci = function () {
            ft.unbind("mousemove", hi).unbind("mouseup", ci);
            st = null
          }, c = (f.paint.alpha * 255 / 100).toString(16); c.length < 2;) c = "0" + c;
        c = c.split(".")[0];
        p = f.paint.solidColor == "none" ? "" : f.paint.solidColor + c;
        kt || (p = g[0].getAttribute("stop-color"));
        $.extend($.fn.jPicker.defaults.window, {
          alphaSupport: !0,
          effects: {
            type: "show",
            speed: 0
          }
        });
        vi.jPicker({
          window: {
            title: l.window.pickerTitle
          },
          images: {
            clientPath: l.images.clientPath
          },
          color: {
            active: p,
            alphaSupport: !0
          }
        }, function (n) {
          f.paint.type = "solidColor";
          f.paint.alpha = n.val("ahex") ? Math.round(n.val("a") / 255 * 100) : 100;
          f.paint.solidColor = n.val("hex") ? n.val("hex") : "none";
          f.paint.radialGradient = null;
          ii()
        }, null, function () {
          ri()
        });
        ni = $(y + " .jGraduate_tabs li");
        ni.click(function () {
          var n, t, i;
          ni.removeClass("jGraduate_tab_current");
          $(this).addClass("jGraduate_tab_current");
          $(y + " > div").hide();
          n = $(this).attr("data-type");
          $(y + " .jGraduate_gradPick").show();
          n === "rg" || n === "lg" ? ($(".jGraduate_" + n + "_field").show(), $(".jGraduate_" + (n === "lg" ? "rg" : "lg") + "_field").hide(), $("#" + u + "_jgraduate_rect")[0].setAttribute("fill", "url(#" + u + "_" + n + "_jgraduate_grad)"), a = n === "lg" ? "linearGradient" : "radialGradient", $("#" + u + "_jGraduate_OpacInput").val(f.paint.alpha).change(), t = $("#" + u + "_" + n + "_jgraduate_grad")[0], e !== t && (i = $(e).find("stop"), $(t).empty().append(i), e = t, t = gi.val(), e.setAttribute("spreadMethod", t)), d = n === "rg" && e.getAttribute("fx") != null && !(dt == wi && gt == bi), $("#" + u + "_jGraduate_focusCoord").toggle(d), d && ($("#" + u + "_jGraduate_match_ctr")[0].checked = !1)) : ($(y + " .jGraduate_gradPick").hide(), $(y + " .jGraduate_colPick").show())
        });
        $(y + " > div").hide();
        ni.removeClass("jGraduate_tab_current");
        switch (f.paint.type) {
          case "linearGradient":
            ti = $(y + " .jGraduate_tab_lingrad");
            break;
          case "radialGradient":
            ti = $(y + " .jGraduate_tab_radgrad");
            break;
          default:
            ti = $(y + " .jGraduate_tab_color")
        }
        f.show();
        setTimeout(function () {
          ti.addClass("jGraduate_tab_current").click()
        }, 10)
      } else alert("Container element must have an id attribute to maintain unique id strings for sub-elements.")
    })
  }
}();
$.fn.SpinButton = function (n) {
  return this.each(function () {
    this.repeating = !1;
    this.spinCfg = {
      min: n && !isNaN(parseFloat(n.min)) ? Number(n.min) : null,
      max: n && !isNaN(parseFloat(n.max)) ? Number(n.max) : null,
      step: n && n.step ? Number(n.step) : 1,
      stepfunc: n && n.stepfunc ? n.stepfunc : !1,
      page: n && n.page ? Number(n.page) : 10,
      upClass: n && n.upClass ? n.upClass : "up",
      downClass: n && n.downClass ? n.downClass : "down",
      reset: n && n.reset ? n.reset : this.value,
      delay: n && n.delay ? Number(n.delay) : 500,
      interval: n && n.interval ? Number(n.interval) : 100,
      anglemode: n && n.anglemode ? n.anglemode : !1,
      _btn_width: 20,
      _direction: null,
      _delay: null,
      _repeat: null,
      callback: n && n.callback ? n.callback : null
    };
    this.spinCfg.smallStep = n && n.smallStep ? n.smallStep : this.spinCfg.step / 2;
    this.adjustValue = function (n) {
      var t;
      t = isNaN(this.value) || this.value === "" ? this.spinCfg.reset : $.isFunction(this.spinCfg.stepfunc) ? this.spinCfg.stepfunc(this, n) : Number((Number(this.value) + Number(n)).toFixed(5));
      this.spinCfg.anglemode ? (t < 0 && (t = 360 + t % 360), t > 360 && (t = t % 360)) : (this.spinCfg.min !== null && (t = Math.max(t, this.spinCfg.min)), this.spinCfg.max !== null && (t = Math.min(t, this.spinCfg.max)));
      this.value = t;
      $.isFunction(this.spinCfg.callback) && this.spinCfg.callback(this)
    };
    $(this).addClass(n && n.spinClass ? n.spinClass : "spin-button").mousemove(function (n) {
      var u = n.pageX || n.x,
        f = n.pageY || n.y,
        t = n.target || n.srcElement,
        r = svgEditor.tool_scale || 1,
        e = $(t).outerHeight() / 2,
        i = u > $(t).offset().left + t.offsetWidth * r - this.spinCfg._btn_width ? f < $(t).offset().top + e * r ? 1 : -1 : 0;
      if (i !== this.spinCfg._direction) {
        switch (i) {
          case 1:
            $(this).removeClass(this.spinCfg.downClass).addClass(this.spinCfg.upClass);
            break;
          case -1:
            $(this).removeClass(this.spinCfg.upClass).addClass(this.spinCfg.downClass);
            break;
          default:
            $(this).removeClass(this.spinCfg.upClass).removeClass(this.spinCfg.downClass)
        }
        this.spinCfg._direction = i
      }
    }).mouseout(function () {
      $(this).removeClass(this.spinCfg.upClass).removeClass(this.spinCfg.downClass);
      this.spinCfg._direction = null;
      window.clearInterval(this.spinCfg._repeat);
      window.clearTimeout(this.spinCfg._delay)
    }).mousedown(function (n) {
      if (n.button === 0 && this.spinCfg._direction != 0) {
        var t = this,
          r = n.shiftKey ? t.spinCfg.smallStep : t.spinCfg.step,
          i = function () {
            t.adjustValue(t.spinCfg._direction * r)
          };
        i();
        t.spinCfg._delay = window.setTimeout(function () {
          i();
          t.spinCfg._repeat = window.setInterval(i, t.spinCfg.interval)
        }, t.spinCfg.delay)
      }
    }).mouseup(function () {
      window.clearInterval(this.spinCfg._repeat);
      window.clearTimeout(this.spinCfg._delay)
    }).keydown(function (n) {
      switch (n.keyCode) {
        case 38:
          this.adjustValue(this.spinCfg.step);
          break;
        case 40:
          this.adjustValue(-this.spinCfg.step);
          break;
        case 33:
          this.adjustValue(this.spinCfg.page);
          break;
        case 34:
          this.adjustValue(-this.spinCfg.page)
      }
    }).keypress(function (n) {
      if (this.repeating) switch (n.keyCode) {
        case 38:
          this.adjustValue(this.spinCfg.step);
          break;
        case 40:
          this.adjustValue(-this.spinCfg.step);
          break;
        case 33:
          this.adjustValue(this.spinCfg.page);
          break;
        case 34:
          this.adjustValue(-this.spinCfg.page)
      } else this.repeating = !0
    }).keyup(function (n) {
      this.repeating = !1;
      switch (n.keyCode) {
        case 38:
        case 40:
        case 33:
        case 34:
        case 13:
          this.adjustValue(0)
      }
    }).bind("mousewheel", function (n) {
      n.wheelDelta >= 120 ? this.adjustValue(this.spinCfg.step) : n.wheelDelta <= -120 && this.adjustValue(-this.spinCfg.step);
      n.preventDefault()
    }).change(function () {
      this.adjustValue(0)
    });
    this.addEventListener && this.addEventListener("DOMMouseScroll", function (n) {
      n.detail > 0 ? this.adjustValue(-this.spinCfg.step) : n.detail < 0 && this.adjustValue(this.spinCfg.step);
      n.preventDefault()
    }, !1)
  })
};
jQuery && function () {
  var t = $(window),
    n = $("#workarea");
  $.extend($.fn, {
    contextMenu: function (i, r) {
      return i.menu == undefined ? !1 : (i.inSpeed == undefined && (i.inSpeed = 150), i.outSpeed == undefined && (i.outSpeed = 75), i.inSpeed == 0 && (i.inSpeed = -1), i.outSpeed == 0 && (i.outSpeed = -1), $(this).each(function () {
        var f = $(this),
          e = $(f).offset(),
          u = $("#" + i.menu);
        u.addClass("contextMenu");
        $(this).bind("mousedown", function (o) {
          var s = o;
          $(this).mouseup(function (o) {
            var l = $(this);
            if (l.unbind("mouseup"), s.button === 2 || i.allowLeft || s.ctrlKey && svgedit.browser.isMac()) {
              if (o.stopPropagation(), $(".contextMenu").hide(), f.hasClass("disabled")) return !1;
              var h = o.pageX,
                c = o.pageY,
                a = t.width() - u.width(),
                v = t.height() - u.height();
              h > a - 15 && (h = a - 15);
              c > v - 30 && (c = v - 30);
              n.unbind("click");
              u.css({
                top: c,
                left: h
              }).fadeIn(i.inSpeed);
              u.find("A").mouseover(function () {
                u.find("LI.hover").removeClass("hover");
                $(this).parent().addClass("hover")
              }).mouseout(function () {
                u.find("LI.hover").removeClass("hover")
              });
              n.keypress(function (t) {
                switch (t.keyCode) {
                  case 38:
                    u.find("LI.hover").length ? (u.find("LI.hover").removeClass("hover").prevAll("LI:not(.disabled)").eq(0).addClass("hover"), u.find("LI.hover").length || u.find("LI:last").addClass("hover")) : u.find("LI:last").addClass("hover");
                    break;
                  case 40:
                    u.find("LI.hover").length == 0 ? u.find("LI:first").addClass("hover") : (u.find("LI.hover").removeClass("hover").nextAll("LI:not(.disabled)").eq(0).addClass("hover"), u.find("LI.hover").length || u.find("LI:first").addClass("hover"));
                    break;
                  case 13:
                    u.find("LI.hover A").trigger("click");
                    break;
                  case 27:
                    n.trigger("click")
                }
              });
              u.find("A").unbind("mouseup");
              u.find("LI:not(.disabled) A").mouseup(function (t) {
                return t.which != 1 ? !1 : (n.unbind("click").unbind("keypress"), $(".contextMenu").hide(), r && r($(this).attr("href").substr(1), $(l), {
                  x: h - e.left,
                  y: c - e.top,
                  docX: h,
                  docY: c
                }), !1)
              });
              setTimeout(function () {
                n.click(function () {
                  return n.unbind("click").unbind("keypress"), u.fadeOut(i.outSpeed), !1
                })
              }, 0)
            }
          })
        });
        $(f).add($("UL.contextMenu")).bind("contextmenu", function () {
          return !1
        })
      }), $(this))
    },
    disableContextMenuItems: function (n) {
      return n == undefined ? ($(this).find("LI").addClass("disabled"), $(this)) : ($(this).each(function () {
        var i, t;
        if (n != undefined)
          for (i = n.split(","), t = 0; t < i.length; t++) $(this).find('A[href="' + i[t] + '"]').parent().addClass("disabled")
      }), $(this))
    },
    enableContextMenuItems: function (n) {
      return n == undefined ? ($(this).find("LI.disabled").removeClass("disabled"), $(this)) : ($(this).each(function () {
        var i, t;
        if (n != undefined)
          for (i = n.split(","), t = 0; t < i.length; t++) $(this).find('A[href="' + i[t] + '"]').parent().removeClass("disabled")
      }), $(this))
    },
    disableContextMenu: function () {
      return $(this).each(function () {
        $(this).addClass("disabled")
      }), $(this)
    },
    enableContextMenu: function () {
      return $(this).each(function () {
        $(this).removeClass("disabled")
      }), $(this)
    },
    destroyContextMenu: function () {
      return $(this).each(function () {
        $(this).unbind("mousedown").unbind("mouseup")
      }), $(this)
    }
  })
}(jQuery);
svgedit = svgedit || {},
  function () {
    var i;
    if (svgedit.browser || (svgedit.browser = {}), i = function () {
        return !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
      }(), svgedit.browser.supportsSvg = function () {
        return i
      }, svgedit.browser.supportsSvg()) {
      var n = "http://www.w3.org/2000/svg",
        t = navigator.userAgent,
        r = document.createElementNS(n, "svg"),
        u = !!window.opera,
        f = t.indexOf("AppleWebKit") >= 0,
        e = t.indexOf("Gecko/") >= 0,
        o = t.indexOf("MSIE") >= 0,
        s = t.indexOf("Chrome/") >= 0,
        h = t.indexOf("Windows") >= 0,
        c = t.indexOf("Macintosh") >= 0,
        l = "ontouchstart" in window,
        a = $("body").hasClass("Mobile"),
        v = function () {
          return !!r.querySelector
        }(),
        y = function () {
          return !!document.evaluate
        }(),
        p = function () {
          var t = document.createElementNS(n, "path"),
            i, r;
          t.setAttribute("d", "M0,0 10,10");
          i = t.pathSegList;
          r = t.createSVGPathSegMovetoAbs(5, 5);
          try {
            return i.replaceItem(r, 0), !0
          } catch (u) {}
          return !1
        }(),
        w = function () {
          var t = document.createElementNS(n, "path"),
            i, r;
          t.setAttribute("d", "M0,0 10,10");
          i = t.pathSegList;
          r = t.createSVGPathSegMovetoAbs(5, 5);
          try {
            return i.insertItemBefore(r, 0), !0
          } catch (u) {}
          return !1
        }(),
        b = function () {
          var i = document.createElementNS(n, "svg"),
            r = document.createElementNS(n, "svg"),
            t, u;
          return document.documentElement.appendChild(i), r.setAttribute("x", 5), i.appendChild(r), t = document.createElementNS(n, "text"), t.textContent = "a", r.appendChild(t), u = t.getStartPositionOfChar(0).x, document.documentElement.removeChild(i), u === 0
        }(),
        k = function () {
          var i = document.createElementNS(n, "svg"),
            t, r;
          return document.documentElement.appendChild(i), t = document.createElementNS(n, "path"), t.setAttribute("d", "M0,0 C0,0 10,10 10,0"), i.appendChild(t), r = t.getBBox(), document.documentElement.removeChild(i), r.height > 4 && r.height < 5
        }(),
        d = function () {
          var i = document.createElementNS(n, "svg"),
            r, u, t, f;
          return document.documentElement.appendChild(i), r = document.createElementNS(n, "path"), r.setAttribute("d", "M0,0 10,0"), u = document.createElementNS(n, "path"), u.setAttribute("d", "M5,0 15,0"), t = document.createElementNS(n, "g"), t.appendChild(r), t.appendChild(u), i.appendChild(t), f = t.getBBox(), document.documentElement.removeChild(i), f.width == 15
        }(),
        g = function () {
          return u
        }(),
        nt = function () {
          var i = document.createElementNS(n, "rect"),
            r, t;
          return i.setAttribute("x", .1), r = i.cloneNode(!1), t = r.getAttribute("x").indexOf(",") == -1, t || $.alert("NOTE: This version of Opera is known to contain bugs in SVG-edit.\n\t\tPlease upgrade to the <a href='http://opera.com'>latest version<\/a> in which the problems have been fixed."), t
        }(),
        tt = function () {
          var t = document.createElementNS(n, "rect");
          return t.setAttribute("style", "vector-effect:non-scaling-stroke"), t.style.vectorEffect === "non-scaling-stroke"
        }(),
        it = function () {
          var u = document.createElementNS(n, "rect"),
            t = u.transform.baseVal,
            i = r.createSVGTransform();
          return t.appendItem(i), t.getItem(0) == i
        }();
      svgedit.browser.isOpera = function () {
        return u
      };
      svgedit.browser.isWebkit = function () {
        return f
      };
      svgedit.browser.isGecko = function () {
        return e
      };
      svgedit.browser.isIE = function () {
        return o
      };
      svgedit.browser.isChrome = function () {
        return s
      };
      svgedit.browser.isWindows = function () {
        return h
      };
      svgedit.browser.isMac = function () {
        return c
      };
      svgedit.browser.isTouch = function () {
        return l && a
      };
      svgedit.browser.supportsSelectors = function () {
        return v
      };
      svgedit.browser.supportsXpath = function () {
        return y
      };
      svgedit.browser.supportsPathReplaceItem = function () {
        return p
      };
      svgedit.browser.supportsPathInsertItemBefore = function () {
        return w
      };
      svgedit.browser.supportsPathBBox = function () {
        return k
      };
      svgedit.browser.supportsHVLineContainerBBox = function () {
        return d
      };
      svgedit.browser.supportsGoodTextCharPos = function () {
        return b
      };
      svgedit.browser.supportsEditableText = function () {
        return g
      };
      svgedit.browser.supportsGoodDecimals = function () {
        return nt
      };
      svgedit.browser.supportsNonScalingStroke = function () {
        return tt
      };
      svgedit.browser.supportsNativeTransformLists = function () {
        return it
      }
    } else window.location = "browser-not-supported.html"
  }();
svgedit = svgedit || {},
  function () {
    function i(n) {
      var t = n.matrix,
        i = "",
        f, u, r;
      switch (n.type) {
        case 1:
          i = "matrix(" + [t.a, t.b, t.c, t.d, t.e, t.f].join(",") + ")";
          break;
        case 2:
          i = "translate(" + t.e + "," + t.f + ")";
          break;
        case 3:
          i = t.a == t.d ? "scale(" + t.a + ")" : "scale(" + t.a + "," + t.d + ")";
          break;
        case 4:
          f = 0;
          u = 0;
          n.angle != 0 && (r = 1 - t.a, u = (r * t.f + t.b * t.e) / (r * r + t.b * t.b), f = (t.e - t.b * u) / r);
          i = "rotate(" + n.angle + " " + f + "," + u + ")"
      }
      return i
    }
    var t, n;
    svgedit.transformlist || (svgedit.transformlist = {});
    t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    n = {};
    svgedit.transformlist.SVGTransformList = function (n) {
      this._elem = n || null;
      this._xforms = [];
      this._update = function () {
        for (var r = "", f = t.createSVGMatrix(), u, n = 0; n < this.numberOfItems; ++n) u = this._list.getItem(n), r += i(u) + " ";
        this._elem.setAttribute("transform", r)
      };
      this._list = this;
      this._init = function () {
        var u = this._elem.getAttribute("transform");
        if (u)
          for (var s = /\s*((scale|matrix|rotate|translate)\s*\(.*?\))\s*,?\s*/, r = !0; r;)
            if (r = u.match(s), u = u.replace(s, ""), r && r[1]) {
              var l = r[1],
                h = l.split(/\s*\(/),
                i = h[0],
                e = h[1].match(/\s*(.*?)\s*\)/);
              e[1] = e[1].replace(/(\d)-/g, "$1 -");
              var f = e[1].split(/[, ]+/),
                a = "abcdef".split(""),
                c = t.createSVGMatrix();
              $.each(f, function (n, t) {
                f[n] = parseFloat(t);
                i == "matrix" && (c[a[n]] = f[n])
              });
              var o = t.createSVGTransform(),
                v = "set" + i.charAt(0).toUpperCase() + i.slice(1),
                n = i == "matrix" ? [c] : f;
              i == "scale" && n.length == 1 ? n.push(n[0]) : i == "translate" && n.length == 1 ? n.push(0) : i == "rotate" && n.length == 1 && (n.push(0), n.push(0));
              o[v].apply(o, n);
              this._list.appendItem(o)
            }
      };
      this._removeFromOtherLists = function () {
        return
      };
      this.numberOfItems = 0;
      this.clear = function () {
        this.numberOfItems = 0;
        this._xforms = []
      };
      this.initialize = function (n) {
        this.numberOfItems = 1;
        this._removeFromOtherLists(n);
        this._xforms = [n]
      };
      this.getItem = function (n) {
        if (n < this.numberOfItems && n >= 0) return this._xforms[n];
        throw {
          code: 1
        };
      };
      this.insertItemBefore = function (n, t) {
        var u = null,
          r, i, f;
        if (t >= 0)
          if (t < this.numberOfItems) {
            for (this._removeFromOtherLists(n), r = new Array(this.numberOfItems + 1), i = 0; i < t; ++i) r[i] = this._xforms[i];
            for (r[i] = n, f = i + 1; i < this.numberOfItems; ++f, ++i) r[f] = this._xforms[i];
            this.numberOfItems++;
            this._xforms = r;
            u = n;
            this._list._update()
          } else u = this._list.appendItem(n);
        return u
      };
      this.replaceItem = function (n, t) {
        var i = null;
        return t < this.numberOfItems && t >= 0 && (this._removeFromOtherLists(n), this._xforms[t] = n, i = n, this._list._update()), i
      };
      this.removeItem = function (n) {
        var u, i, t, r;
        if (n < this.numberOfItems && n >= 0) {
          for (u = this._xforms[n], i = new Array(this.numberOfItems - 1), t = 0; t < n; ++t) i[t] = this._xforms[t];
          for (r = t; r < this.numberOfItems - 1; ++r, ++t) i[r] = this._xforms[t + 1];
          return this.numberOfItems--, this._xforms = i, this._list._update(), u
        }
        throw {
          code: 1
        };
      };
      this.appendItem = function (n) {
        return this._removeFromOtherLists(n), this._xforms.push(n), this.numberOfItems++, this._list._update(), n
      }
    };
    svgedit.transformlist.resetListMap = function () {
      n = {}
    };
    svgedit.transformlist.removeElementFromListMap = function (t) {
      t.id && n[t.id] && delete n[t.id]
    };
    svgedit.transformlist.getTransformList = function (t) {
      var i, r;
      if (svgedit.browser.supportsNativeTransformLists()) {
        if (t.transform) return t.transform.baseVal;
        if (t.gradientTransform) return t.gradientTransform.baseVal;
        if (t.patternTransform) return t.patternTransform.baseVal
      } else return i = t.id, i || (i = "temp"), r = n[i], r && i != "temp" || (n[i] = new svgedit.transformlist.SVGTransformList(t), n[i]._init(), r = n[i]), r;
      return null
    }
  }();
svgedit = svgedit || {},
  function () {
    svgedit.math || (svgedit.math = {});
    var n = 1e-14,
      t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgedit.math.transformPoint = function (n, t, i) {
      return {
        x: i.a * n + i.c * t + i.e,
        y: i.b * n + i.d * t + i.f
      }
    };
    svgedit.math.isIdentity = function (n) {
      return n.a === 1 && n.b === 0 && n.c === 0 && n.d === 1 && n.e === 0 && n.f === 0
    };
    svgedit.math.matrixMultiply = function () {
      for (var i = arguments, r = i.length, t = i[r - 1], u; r-- > 1;) u = i[r - 1], t = u.multiply(t);
      return Math.abs(t.a) < n && (t.a = 0), Math.abs(t.b) < n && (t.b = 0), Math.abs(t.c) < n && (t.c = 0), Math.abs(t.d) < n && (t.d = 0), Math.abs(t.e) < n && (t.e = 0), Math.abs(t.f) < n && (t.f = 0), t
    };
    svgedit.math.hasMatrixTransform = function (n) {
      var t, i;
      if (!n) return !1;
      for (t = n.numberOfItems; t--;)
        if (i = n.getItem(t), i.type == 1 && !svgedit.math.isIdentity(i.matrix)) return !0;
      return !1
    };
    svgedit.math.transformBox = function (n, t, i, r, u) {
      var f = {
          x: n,
          y: t
        },
        e = {
          x: n + i,
          y: t
        },
        o = {
          x: n + i,
          y: t + r
        },
        s = {
          x: n,
          y: t + r
        },
        v = svgedit.math.transformPoint;
      f = v(f.x, f.y, u);
      var h = f.x,
        l = f.x,
        c = f.y,
        a = f.y;
      return e = v(e.x, e.y, u), h = Math.min(h, e.x), l = Math.max(l, e.x), c = Math.min(c, e.y), a = Math.max(a, e.y), s = v(s.x, s.y, u), h = Math.min(h, s.x), l = Math.max(l, s.x), c = Math.min(c, s.y), a = Math.max(a, s.y), o = v(o.x, o.y, u), h = Math.min(h, o.x), l = Math.max(l, o.x), c = Math.min(c, o.y), a = Math.max(a, o.y), {
        tl: f,
        tr: e,
        bl: s,
        br: o,
        aabox: {
          x: h,
          y: c,
          width: l - h,
          height: a - c
        }
      }
    };
    svgedit.math.transformListToTransform = function (n, i, r) {
      var i, r, e, f, u, o;
      if (n == null) return t.createSVGTransformFromMatrix(t.createSVGMatrix());
      for (i = i == undefined ? 0 : i, r = r == undefined ? n.numberOfItems - 1 : r, i = parseInt(i), r = parseInt(r), i > r && (e = r, r = i, i = e), f = t.createSVGMatrix(), u = i; u <= r; ++u) o = u >= 0 && u < n.numberOfItems ? n.getItem(u).matrix : t.createSVGMatrix(), f = svgedit.math.matrixMultiply(f, o);
      return t.createSVGTransformFromMatrix(f)
    };
    svgedit.math.getMatrix = function (n) {
      var t = svgedit.transformlist.getTransformList(n);
      return svgedit.math.transformListToTransform(t).matrix
    };
    svgedit.math.snapToAngle = function (n, t, i, r) {
      var o = Math.PI / 4,
        u = i - n,
        f = r - t,
        h = Math.atan2(f, u),
        s = Math.sqrt(u * u + f * f),
        e = Math.round(h / o) * o,
        c = n + s * Math.cos(e),
        l = t + s * Math.sin(e);
      return {
        x: c,
        y: l,
        a: e
      }
    };
    svgedit.math.rectsIntersect = function (n, t) {
      return t.x < n.x + n.width && t.x + t.width > n.x && t.y < n.y + n.height && t.y + t.height > n.y
    };
    svgedit.math.snaptoHVLine = function (n, t) {
      var i = n,
        r = t;
      return Math.abs(n) > Math.abs(t) ? r = 0 : i = 0, {
        dx: i,
        dy: r
      }
    }
  }();
svgedit = svgedit || {},
  function () {
    var t, n, f;
    svgedit.units || (svgedit.units = {});
    var i = ["x", "x1", "cx", "rx", "width"],
      r = ["y", "y1", "cy", "ry", "height"],
      u = $.merge(["r", "radius"], i);
    $.merge(u, r);
    n = {
      px: 1
    };
    svgedit.units.init = function (i) {
      var o, f, r, e, u;
      t = i;
      o = "http://www.w3.org/2000/svg";
      f = document.createElementNS(o, "svg");
      document.body.appendChild(f);
      r = document.createElementNS(o, "rect");
      r.setAttribute("width", "1em");
      r.setAttribute("height", "1ex");
      r.setAttribute("x", "1in");
      f.appendChild(r);
      e = r.getBBox();
      document.body.removeChild(f);
      u = e.x;
      n.em = e.width;
      n.ex = e.height;
      n["in"] = u;
      n.cm = u / 2.54;
      n.mm = u / 25.4;
      n.pt = u / 72;
      n.pc = u / 6;
      n["%"] = 0
    };
    svgedit.units.getTypeMap = function () {
      return n
    };
    svgedit.units.shortFloat = function (n) {
      var i = t.getRoundDigits();
      if (isNaN(n)) {
        if ($.isArray(n)) return svgedit.units.shortFloat(n[0]) + "," + svgedit.units.shortFloat(n[1])
      } else return +(+n).toFixed(i);
      return parseFloat(n).toFixed(i) - 0
    };
    svgedit.units.convertUnit = function (i, r) {
      return r = r || t.getBaseUnit(), svgedit.units.shortFloat(i / n[r])
    };
    svgedit.units.setUnitAttr = function (n, t, i) {
      if (!isNaN(i)) var r = n.getAttribute(t);
      n.setAttribute(t, i)
    };
    f = {
      line: ["x1", "x2", "y1", "y2"],
      circle: ["cx", "cy", "r"],
      ellipse: ["cx", "cy", "rx", "ry"],
      foreignObject: ["x", "y", "width", "height"],
      rect: ["x", "y", "width", "height"],
      image: ["x", "y", "width", "height"],
      use: ["x", "y", "width", "height"],
      text: ["x", "y"]
    };
    svgedit.units.convertAttrs = function (i) {
      var c = i.tagName,
        s = t.getBaseUnit(),
        e = f[c],
        h, r, o, u;
      if (e)
        for (h = e.length, r = 0; r < h; r++) o = e[r], u = i.getAttribute(o), u && (isNaN(u) || i.setAttribute(o, u / n[s] + s))
    };
    svgedit.units.convertToNum = function (u, f) {
      var h, e;
      if (!isNaN(f)) return +f;
      if (f.substr(-1) === "%") {
        var e = f.substr(0, f.length - 1) / 100,
          o = t.getWidth(),
          s = t.getHeight();
        return i.indexOf(u) >= 0 ? e * o : r.indexOf(u) >= 0 ? e * s : e * Math.sqrt(o * o + s * s) / Math.sqrt(2)
      }
      return h = f.substr(-2), e = f.substr(0, f.length - 2), e * n[h]
    };
    svgedit.units.isValidUnit = function (i, r, f) {
      var e = !1,
        o, s;
      if (u.indexOf(i) >= 0) isNaN(r) ? (r = r.toLowerCase(), $.each(n, function (n) {
        if (!e) {
          var t = new RegExp("^-?[\\d\\.]+" + n + "$");
          t.test(r) && (e = !0)
        }
      })) : e = !0;
      else {
        if (i == "id") {
          o = !1;
          try {
            s = t.getElement(r);
            o = s == null || s === f
          } catch (h) {}
          return o
        }
        e = !0
      }
      return e
    }
  }();
svgedit = svgedit || {},
  function () {
    function o(n) {
      var i, r, u, f, e;
      if (svgedit.browser.supportsHVLineContainerBBox()) try {
        return n.getBBox()
      } catch (o) {}
      return i = $.data(n, "ref"), r = null, i ? (u = $(i).children().clone().attr("visibility", "hidden"), $(t).append(u), r = u.filter("line, path")) : r = $(n).find("line, path"), f = !1, r.length ? (r.each(function () {
        var n = this.getBBox();
        n.width && n.height || (f = !0)
      }), f ? (e = i ? u : $(n).children(), ret = getStrokedBBox(e)) : ret = n.getBBox()) : ret = n.getBBox(), i && u.remove(), ret
    }
    svgedit.utilities || (svgedit.utilities = {});
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      u = "http://www.w3.org/2000/svg",
      r = "http://www.w3.org/1999/xlink",
      s = "http://www.w3.org/XML/1998/namespace",
      h = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(","),
      i = null,
      f = null,
      e = null,
      t = null;
    svgedit.utilities.init = function (n) {
      i = n;
      f = n.getDOMDocument();
      e = n.getDOMContainer();
      t = n.getSVGRoot()
    };
    svgedit.utilities.toXml = function (n) {
      return $("<p/>").text(n).html()
    };
    svgedit.utilities.fromXml = function (n) {
      return $("<p/>").html(n).text()
    };
    svgedit.utilities.encode64 = function (t) {
      if (t = svgedit.utilities.convertToXMLReferences(t), window.btoa) return window.btoa(t);
      var i = new Array(Math.floor((t.length + 2) / 3) * 4),
        s, r, u, c, l, h, f, e = 0,
        o = 0;
      do s = t.charCodeAt(e++), r = t.charCodeAt(e++), u = t.charCodeAt(e++), c = s >> 2, l = (s & 3) << 4 | r >> 4, h = (r & 15) << 2 | u >> 6, f = u & 63, isNaN(r) ? h = f = 64 : isNaN(u) && (f = 64), i[o++] = n.charAt(c), i[o++] = n.charAt(l), i[o++] = n.charAt(h), i[o++] = n.charAt(f); while (e < t.length);
      return i.join("")
    };
    svgedit.utilities.decode64 = function (t) {
      if (window.atob) return window.atob(t);
      var i = "",
        o, s, h = "",
        c, f, r, e = "",
        u = 0;
      t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      do c = n.indexOf(t.charAt(u++)), f = n.indexOf(t.charAt(u++)), r = n.indexOf(t.charAt(u++)), e = n.indexOf(t.charAt(u++)), o = c << 2 | f >> 4, s = (f & 15) << 4 | r >> 2, h = (r & 3) << 6 | e, i = i + String.fromCharCode(o), r != 64 && (i = i + String.fromCharCode(s)), e != 64 && (i = i + String.fromCharCode(h)), o = s = h = "", c = f = r = e = ""; while (u < t.length);
      return unescape(i)
    };
    svgedit.utilities.convertToXMLReferences = function (n) {
      for (var r = "", i, t = 0; t < n.length; t++) i = n.charCodeAt(t), i < 128 ? r += n[t] : i > 127 && (r += "&#" + i + ";");
      return r
    };
    svgedit.utilities.text2xml = function (n) {
      var i, t;
      n.indexOf("<svg:svg") >= 0 && (n = n.replace(/<(\/?)svg:/g, "<$1").replace("xmlns:svg", "xmlns"));
      try {
        t = window.DOMParser ? new DOMParser : new ActiveXObject("Microsoft.XMLDOM");
        t.async = !1
      } catch (r) {
        throw new Error("XML Parser could not be instantiated");
      }
      try {
        i = t.loadXML ? t.loadXML(n) ? t : !1 : t.parseFromString(n, "text/xml")
      } catch (r) {
        throw new Error("Error parsing XML string");
      }
      return i
    };
    svgedit.utilities.bboxToObj = function (n) {
      return {
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height
      }
    };
    svgedit.utilities.walkTree = function (n, t) {
      if (n && n.nodeType == 1) {
        t(n);
        for (var i = n.childNodes.length; i--;) svgedit.utilities.walkTree(n.childNodes.item(i), t)
      }
    };
    svgedit.utilities.walkTreePost = function (n, t) {
      if (n && n.nodeType == 1) {
        for (var i = n.childNodes.length; i--;) svgedit.utilities.walkTree(n.childNodes.item(i), t);
        t(n)
      }
    };
    svgedit.utilities.getUrlFromAttr = function (n) {
      if (n) {
        if (n.indexOf('url("') === 0) return n.substring(5, n.indexOf('"', 6));
        if (n.indexOf("url('") === 0) return n.substring(5, n.indexOf("'", 6));
        if (n.indexOf("url(") === 0) return n.substring(4, n.indexOf(")"))
      }
      return null
    };
    svgedit.utilities.getHref = function (n) {
      return n.getAttributeNS(r, "href")
    };
    svgedit.utilities.setHref = function (n, t) {
      n.setAttributeNS(r, "xlink:href", t)
    };
    svgedit.utilities.findDefs = function (n) {
      var n = i.getSVGContent().documentElement,
        t = n.getElementsByTagNameNS(u, "defs");
      return t.length > 0 ? t[0] : n.insertBefore(n.ownerDocument.createElementNS(u, "defs"), n.firstChild.nextSibling)
    };
    svgedit.utilities.getPathBBox = function (n) {
      var o = n.pathSegList,
        nt = o.numberOfItems,
        f, r, t, c, l, a, v;
      if (o.numberOfItems < 1) return n.getBBox();
      var i = [
          [],
          []
        ],
        b = o.getItem(0),
        u = [b.x, b.y];
      for (f = 0; f < nt; f++)
        if (r = o.getItem(f), typeof r.x != "undefined")
          if (f > 0 && (i[0].push(u[0]), i[1].push(u[1])), r.x1) {
            var s = [r.x1, r.y1],
              y = [r.x2, r.y2],
              p = [r.x, r.y];
            for (t = 0; t < 2; t++) {
              var w = function (n) {
                  return Math.pow(1 - n, 3) * u[t] + 3 * Math.pow(1 - n, 2) * n * s[t] + 3 * (1 - n) * Math.pow(n, 2) * y[t] + Math.pow(n, 3) * p[t]
                },
                e = 6 * u[t] - 12 * s[t] + 6 * y[t],
                h = -3 * u[t] + 9 * s[t] - 9 * y[t] + 3 * p[t],
                k = 3 * s[t] - 3 * u[t];
              if (h == 0) {
                if (e == 0) continue;
                c = -k / e;
                0 < c && c < 1 && i[t].push(w(c));
                continue
              }(l = Math.pow(e, 2) - 4 * k * h, l < 0) || (a = (-e + Math.sqrt(l)) / (2 * h), 0 < a && a < 1 && i[t].push(w(a)), v = (-e - Math.sqrt(l)) / (2 * h), 0 < v && v < 1 && i[t].push(w(v)))
            }
            u = p
          } else i[0].push(r.x), i[1].push(r.y), u = [r.x, r.y];
      i[0].push(u[0]);
      i[1].push(u[1]);
      var d = Math.min.apply(null, i[0]),
        tt = Math.max.apply(null, i[0]) - d,
        g = Math.min.apply(null, i[1]),
        it = Math.max.apply(null, i[1]) - g;
      return {
        x: d,
        y: g,
        width: tt,
        height: it
      }
    };
    svgedit.utilities.getBBox = function (n) {
      var r = n || i.geSelectedElements()[0],
        t, f, u, e;
      if (n.nodeType != 1) return null;
      t = null;
      f = r.nodeName;
      switch (f) {
        case "text":
          if (r.textContent === "") r.textContent = "a", t = r.getBBox(), r.textContent = "";
          else try {
            t = r.getBBox()
          } catch (a) {}
          var s = Math.round(t.width),
            c = Math.round(t.height),
            l = {
              x: t.x,
              y: t.y,
              width: s,
              height: c
            };
          t = l;
          break;
        case "path":
          if (svgedit.browser.supportsPathBBox()) try {
            t = r.getBBox()
          } catch (a) {} else t = svgedit.utilities.getPathBBox(r);
          break;
        case "g":
        case "a":
          t = o(r);
          break;
        default:
          if (f === "use" && (t = o(r, !0)), f === "use") t || (t = r.getBBox()), u = {}, u.width = t.width, u.height = t.height, u.x = t.x + parseFloat(r.getAttribute("x") || 0), u.y = t.y + parseFloat(r.getAttribute("y") || 0), t = u;
          else if (~h.indexOf(f)) try {
            t = r.getBBox()
          } catch (a) {
            if (e = $(r).closest("foreignObject"), e.length) try {
              t = e[0].getBBox()
            } catch (a) {
              t = null
            } else t = null
          }
      }
      return t && (t = svgedit.utilities.bboxToObj(t)), t
    };
    svgedit.utilities.getRotationAngle = function (n, t) {
      var o = n || i.getSelectedElements()[0],
        f = svgedit.transformlist.getTransformList(o),
        e, r, u;
      if (!f) return 0;
      for (e = f.numberOfItems, r = 0; r < e; ++r)
        if (u = f.getItem(r), u.type == 4) return t ? u.angle * Math.PI / 180 : u.angle;
      return 0
    };
    svgedit.utilities.getElem = svgedit.browser.supportsSelectors() ? function (n) {
      return t.querySelector("#" + n)
    } : svgedit.browser.supportsXpath() ? function (n) {
      return f.evaluate('svg:svg[@id="svgroot"]//svg:*[@id="' + n + '"]', e, function () {
        return "http://www.w3.org/2000/svg"
      }, 9, null).singleNodeValue
    } : function (n) {
      return $(t).find("[id=" + n + "]")[0]
    };
    svgedit.utilities.assignAttributes = function (n, i, u, f) {
      var h, e, o;
      u || (u = 0);
      h = null;
      svgedit.browser.isOpera() || t.suspendRedraw(u);
      for (e in i) o = e.substr(0, 4) === "xml:" ? s : e.substr(0, 6) === "xlink:" ? r : null, o ? n.setAttributeNS(o, e, i[e]) : f ? svgedit.units.setUnitAttr(n, e, i[e]) : n.setAttribute(e, i[e]);
      svgedit.browser.isOpera() || t.unsuspendRedraw(h)
    };
    svgedit.utilities.cleanupElement = function (n) {
      var f = t.suspendRedraw(60),
        r = {
          "fill-opacity": 1,
          "stop-opacity": 1,
          opacity: 1,
          "stroke-dasharray": "none",
          "stroke-linejoin": "miter",
          "stroke-linecap": "butt",
          "stroke-opacity": 1,
          "stroke-width": 1,
          rx: 0,
          ry: 0
        },
        i, u;
      for (i in r) u = r[i], n.getAttribute(i) == u && n.removeAttribute(i);
      t.unsuspendRedraw(f)
    }
  }();
svgedit = svgedit || {},
  function () {
    var i, r, u;
    svgedit.sanitize || (svgedit.sanitize = {});
    var f = "http://www.w3.org/1999/xlink",
      t = "http://www.w3.org/2000/xmlns/",
      e = "http://svg-edit.googlecode.com",
      n = {};
    n[f] = "xlink";
    n["http://www.w3.org/XML/1998/namespace"] = "xml";
    n[t] = "xmlns";
    n[e] = "se";
    n["http://www.w3.org/1999/xhtml"] = "xhtml";
    n["http://www.w3.org/1998/Math/MathML"] = "mathml";
    i = {};
    $.each(n, function (n, t) {
      i[t] = n
    });
    r = {
      a: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "xlink:href", "xlink:title"],
      circle: ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "r", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "fcm-line-type", "ss"],
      clipPath: ["class", "clipPathUnits", "id"],
      defs: [],
      style: ["type"],
      desc: [],
      ellipse: ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
      feGaussianBlur: ["class", "color-interpolation-filters", "id", "requiredFeatures", "stdDeviation"],
      filter: ["class", "color-interpolation-filters", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "requiredFeatures", "width", "x", "xlink:href", "y"],
      foreignObject: ["class", "font-size", "height", "id", "opacity", "requiredFeatures", "style", "transform", "width", "x", "y"],
      g: ["class", "clip-path", "clip-rule", "id", "display", "fill", "fill-opacity", "fill-rule", "filter", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "font-family", "font-size", "font-style", "font-weight", "text-anchor", "data-fcm-pattr"],
      image: ["class", "clip-path", "clip-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:href", "xlink:title", "y", "preserveAspectRatio"],
      line: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "x1", "x2", "y1", "y2"],
      linearGradient: ["class", "id", "gradientTransform", "gradientUnits", "requiredFeatures", "spreadMethod", "systemLanguage", "x1", "x2", "xlink:href", "y1", "y2"],
      marker: ["id", "class", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "systemLanguage", "viewBox"],
      mask: ["class", "height", "id", "maskContentUnits", "maskUnits", "width", "x", "y"],
      metadata: ["class", "id"],
      path: ["class", "clip-path", "clip-rule", "d", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "fcm-line-type", "data-rsparams", "data-fcm-dashtype", "data-fcm-pattr", "data-fcm-usescan"],
      pattern: ["class", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:href", "y"],
      polygon: ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "id", "class", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
      polyline: ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
      radialGradient: ["class", "cx", "cy", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "requiredFeatures", "spreadMethod", "systemLanguage", "xlink:href"],
      rect: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "width", "x", "y"],
      stop: ["class", "id", "offset", "requiredFeatures", "stop-color", "stop-opacity", "style", "systemLanguage"],
      svg: ["class", "clip-path", "clip-rule", "filter", "id", "height", "mask", "preserveAspectRatio", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xmlns", "xmlns:se", "xmlns:xlink", "y"],
      "switch": ["class", "id", "requiredFeatures", "systemLanguage"],
      symbol: ["class", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "opacity", "preserveAspectRatio", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "viewBox"],
      text: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "transform", "x", "xml:space", "y", "fcm-line-type", "letter-spacing", "data-fcm-dashtype"],
      textPath: ["class", "id", "method", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "transform", "xlink:href"],
      title: [],
      tspan: ["class", "clip-path", "clip-rule", "dx", "dy", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "rotate", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "textLength", "transform", "x", "xml:space", "y"],
      use: ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "transform", "width", "x", "xlink:href", "y"],
      annotation: ["encoding"],
      "annotation-xml": ["encoding"],
      maction: ["actiontype", "other", "selection"],
      math: ["class", "id", "display", "xmlns"],
      menclose: ["notation"],
      merror: [],
      mfrac: ["linethickness"],
      mi: ["mathvariant"],
      mmultiscripts: [],
      mn: [],
      mo: ["fence", "lspace", "maxsize", "minsize", "rspace", "stretchy"],
      mover: [],
      mpadded: ["lspace", "width", "height", "depth", "voffset"],
      mphantom: [],
      mprescripts: [],
      mroot: [],
      mrow: ["xlink:href", "xlink:type", "xmlns:xlink"],
      mspace: ["depth", "height", "width"],
      msqrt: [],
      mstyle: ["displaystyle", "mathbackground", "mathcolor", "mathvariant", "scriptlevel"],
      msub: [],
      msubsup: [],
      msup: [],
      mtable: ["align", "columnalign", "columnlines", "columnspacing", "displaystyle", "equalcolumns", "equalrows", "frame", "rowalign", "rowlines", "rowspacing", "width"],
      mtd: ["columnalign", "columnspan", "rowalign", "rowspan"],
      mtext: [],
      mtr: ["columnalign", "rowalign"],
      munder: [],
      munderover: [],
      none: [],
      semantics: []
    };
    u = {};
    $.each(r, function (n, r) {
      var f = {};
      $.each(r, function (n, r) {
        if (r.indexOf(":") >= 0) {
          var u = r.split(":");
          f[u[1]] = i[u[0]]
        } else f[r] = r == "xmlns" ? t : null
      });
      u[n] = f
    });
    svgedit.sanitize.getNSMap = function () {
      return n
    };
    svgedit.sanitize.sanitizeSvg = function (i) {
      var nt, h, y, p, w, tt, k, d, a, g, v, o;
      if ((i.nodeType == 3 && (i.nodeValue = i.nodeValue.replace(/^\s+|\s+$/g, ""), i.nodeValue.length || i.parentNode.removeChild(i)), i.nodeType == 1) && (nt = i.ownerDocument, h = i.parentNode, nt && h))
        if (y = r[i.nodeName], p = u[i.nodeName], y != undefined) {
          for (w = [], o = i.attributes.length; o--;) {
            var s = i.attributes.item(o),
              c = s.nodeName.toLowerCase(),
              b = s.localName.toLowerCase(),
              l = s.namespaceURI;
            if (p.hasOwnProperty(b) && l == p[b] && l != t || l == t && n[s.nodeValue] || (c.indexOf("se:") == 0 && w.push([c, s.nodeValue]), i.removeAttributeNS(l, b)), svgedit.browser.isGecko()) switch (c) {
              case "transform":
              case "gradientTransform":
              case "patternTransform":
                tt = s.nodeValue.replace(/(\d)-/g, "$1 -");
                i.setAttribute(c, tt)
            }
            if (c == "style") {
              for (k = s.nodeValue.split(";"), d = k.length; d--;) a = k[d].split(":"), y.indexOf(a[0]) >= 0 && i.setAttribute(a[0], a[1]);
              i.removeAttribute("style")
            }
          }
          if ($.each(w, function (n, t) {
              i.setAttributeNS(e, t[0], t[1])
            }), g = svgedit.utilities.getHref(i), g && ["filter", "linearGradient", "pattern", "radialGradient", "textPath", "use"].indexOf(i.nodeName) >= 0 && g[0] != "#" && (svgedit.utilities.setHref(i, ""), i.removeAttributeNS(f, "href")), i.nodeName == "use" && !svgedit.utilities.getHref(i)) {
            h.removeChild(i);
            return
          }
          for ($.each(["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"], function (n, t) {
              var r = i.getAttribute(t);
              r && (r = svgedit.utilities.getUrlFromAttr(r), r && r[0] !== "#" && (i.setAttribute(t, ""), i.removeAttribute(t)))
            }), o = i.childNodes.length; o--;) svgedit.sanitize.sanitizeSvg(i.childNodes.item(o))
        } else {
          for (v = []; i.hasChildNodes();) v.push(h.insertBefore(i.firstChild, i));
          for (h.removeChild(i), o = v.length; o--;) svgedit.sanitize.sanitizeSvg(v[o])
        }
    }
  }();
svgedit = svgedit || {},
  function () {
    svgedit.history || (svgedit.history = {});
    svgedit.history.HistoryEventTypes = {
      BEFORE_APPLY: "before_apply",
      AFTER_APPLY: "after_apply",
      BEFORE_UNAPPLY: "before_unapply",
      AFTER_UNAPPLY: "after_unapply"
    };
    svgedit.history.MoveElementCommand = function (n, t, i, r) {
      this.elem = n;
      this.text = r ? "Move " + n.tagName + " to " + r : "Move " + n.tagName;
      this.oldNextSibling = t;
      this.oldParent = i;
      this.newNextSibling = n.nextSibling;
      this.newParent = n.parentNode
    };
    svgedit.history.MoveElementCommand.type = function () {
      return "svgedit.history.MoveElementCommand"
    };
    svgedit.history.MoveElementCommand.prototype.type = svgedit.history.MoveElementCommand.type;
    svgedit.history.MoveElementCommand.prototype.getText = function () {
      return this.text
    };
    svgedit.history.MoveElementCommand.prototype.apply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
      this.elem = this.newParent.insertBefore(this.elem, this.newNextSibling);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    };
    svgedit.history.MoveElementCommand.prototype.unapply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
      this.elem = this.oldParent.insertBefore(this.elem, this.oldNextSibling);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.MoveElementCommand.prototype.elements = function () {
      return [this.elem]
    };
    svgedit.history.InsertElementCommand = function (n, t) {
      this.elem = n;
      this.text = n.tagName === "g" ? "Group Elements|" + n.id : t || "Create " + n.tagName;
      this.parent = n.parentNode;
      this.nextSibling = this.elem.nextSibling
    };
    svgedit.history.InsertElementCommand.type = function () {
      return "svgedit.history.InsertElementCommand"
    };
    svgedit.history.InsertElementCommand.prototype.type = svgedit.history.InsertElementCommand.type;
    svgedit.history.InsertElementCommand.prototype.getText = function () {
      return this.text
    };
    svgedit.history.InsertElementCommand.prototype.apply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
      this.elem = this.parent.insertBefore(this.elem, this.nextSibling);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    };
    svgedit.history.InsertElementCommand.prototype.unapply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
      this.parent = this.elem.parentNode;
      this.elem = this.elem.parentNode.removeChild(this.elem);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.InsertElementCommand.prototype.elements = function () {
      return [this.elem]
    };
    svgedit.history.RemoveElementCommand = function (n, t, i, r) {
      this.elem = n;
      this.text = r || "Delete " + n.tagName;
      this.nextSibling = t;
      this.parent = i;
      svgedit.transformlist.removeElementFromListMap(n)
    };
    svgedit.history.RemoveElementCommand.type = function () {
      return "svgedit.history.RemoveElementCommand"
    };
    svgedit.history.RemoveElementCommand.prototype.type = svgedit.history.RemoveElementCommand.type;
    svgedit.history.RemoveElementCommand.prototype.getText = function () {
      return this.text
    };
    svgedit.history.RemoveElementCommand.prototype.apply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
      svgedit.transformlist.removeElementFromListMap(this.elem);
      this.parent = this.elem.parentNode;
      this.elem = this.parent.removeChild(this.elem);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    };
    svgedit.history.RemoveElementCommand.prototype.unapply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
      svgedit.transformlist.removeElementFromListMap(this.elem);
      this.nextSibling == null && window.console && console.log("Error: reference element was lost");
      this.parent.insertBefore(this.elem, this.nextSibling);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.RemoveElementCommand.prototype.elements = function () {
      return [this.elem]
    };
    svgedit.history.ChangeElementCommand = function (n, t, i) {
      this.elem = n;
      this.text = i ? "Change " + n.tagName + " " + i : "Change " + n.tagName;
      this.newValues = {};
      this.oldValues = t;
      for (var r in t) this.newValues[r] = r == "#text" ? n.textContent : r == "#href" ? svgedit.utilities.getHref(n) : n.getAttribute(r)
    };
    svgedit.history.ChangeElementCommand.type = function () {
      return "svgedit.history.ChangeElementCommand"
    };
    svgedit.history.ChangeElementCommand.prototype.type = svgedit.history.ChangeElementCommand.type;
    svgedit.history.ChangeElementCommand.prototype.getText = function () {
      return this.text
    };
    svgedit.history.ChangeElementCommand.prototype.apply = function (n) {
      var r, t, u;
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
      r = !1;
      for (t in this.newValues) this.newValues[t] ? t == "#text" ? this.elem.textContent = this.newValues[t] : t == "#href" ? svgedit.utilities.setHref(this.elem, this.newValues[t]) : this.elem.setAttribute(t, this.newValues[t]) : t == "#text" ? this.elem.textContent = "" : (this.elem.setAttribute(t, ""), this.elem.removeAttribute(t)), t == "transform" && (r = !0);
      if (!r && (u = svgedit.utilities.getRotationAngle(this.elem), u)) {
        var i = elem.getBBox(),
          e = i.x + i.width / 2,
          o = i.y + i.height / 2,
          f = ["rotate(", u, " ", e, ",", o, ")"].join("");
        f != elem.getAttribute("transform") && elem.setAttribute("transform", f)
      }
      return svgedit.transformlist.removeElementFromListMap(this.elem), n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this), !0
    };
    svgedit.history.ChangeElementCommand.prototype.unapply = function (n) {
      var r, t, u;
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
      r = !1;
      for (t in this.oldValues) this.oldValues[t] ? t == "#text" ? this.elem.textContent = this.oldValues[t] : t == "#href" ? svgedit.utilities.setHref(this.elem, this.oldValues[t]) : this.elem.setAttribute(t, this.oldValues[t]) : t == "#text" ? this.elem.textContent = "" : (this.elem.setAttribute(t, ""), this.elem.removeAttribute(t)), t == "transform" && (r = !0);
      if (!r && (u = svgedit.utilities.getRotationAngle(this.elem), u)) {
        var i = this.elem.getBBox(),
          e = i.x + i.width / 2,
          o = i.y + i.height / 2,
          f = ["rotate(", u, " ", e, ",", o, ")"].join("");
        f != this.elem.getAttribute("transform") && this.elem.setAttribute("transform", f)
      }
      return svgedit.transformlist.removeElementFromListMap(this.elem), n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this), !0
    };
    svgedit.history.ChangeElementCommand.prototype.elements = function () {
      return [this.elem]
    };
    svgedit.history.BatchCommand = function (n) {
      this.text = n || "Batch Command";
      this.stack = []
    };
    svgedit.history.BatchCommand.type = function () {
      return "svgedit.history.BatchCommand"
    };
    svgedit.history.BatchCommand.prototype.type = svgedit.history.BatchCommand.type;
    svgedit.history.BatchCommand.prototype.getText = function () {
      return this.text
    };
    svgedit.history.BatchCommand.prototype.apply = function (n) {
      var i, t;
      for (n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this), i = this.stack.length, t = 0; t < i; ++t) this.stack[t].apply(n);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this)
    };
    svgedit.history.BatchCommand.prototype.unapply = function (n) {
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
      for (var t = this.stack.length - 1; t >= 0; t--) this.stack[t].unapply(n);
      n && n.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this)
    };
    svgedit.history.BatchCommand.prototype.elements = function () {
      for (var i = [], r = this.stack.length, n, t; r--;)
        for (n = this.stack[r].elements(), t = n.length; t--;) i.indexOf(n[t]) == -1 && i.push(n[t]);
      return i
    };
    svgedit.history.BatchCommand.prototype.addSubCommand = function (n) {
      this.stack.push(n)
    };
    svgedit.history.BatchCommand.prototype.isEmpty = function () {
      return this.stack.length == 0
    };
    svgedit.history.UndoManager = function (n) {
      this.handler_ = n || null;
      this.undoStackPointer = 0;
      this.undoStack = [];
      this.undoChangeStackPointer = -1;
      this.undoableChangeStack = []
    };
    svgedit.history.UndoManager.prototype.resetUndoStack = function () {
      this.undoStack = [];
      this.undoStackPointer = 0
    };
    svgedit.history.UndoManager.prototype.getUndoStackSize = function () {
      return this.undoStackPointer
    };
    svgedit.history.UndoManager.prototype.getRedoStackSize = function () {
      return this.undoStack.length - this.undoStackPointer
    };
    svgedit.history.UndoManager.prototype.getNextUndoCommandText = function () {
      return this.undoStackPointer > 0 ? this.undoStack[this.undoStackPointer - 1].getText() : ""
    };
    svgedit.history.UndoManager.prototype.getNextRedoCommandText = function () {
      return this.undoStackPointer < this.undoStack.length ? this.undoStack[this.undoStackPointer].getText() : ""
    };
    svgedit.history.UndoManager.prototype.undo = function () {
      if (this.undoStackPointer > 0) {
        var n = this.undoStack[--this.undoStackPointer];
        n.unapply(this.handler_)
      }
    };
    svgedit.history.UndoManager.prototype.redo = function () {
      if (this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) {
        var n = this.undoStack[this.undoStackPointer++];
        n.apply(this.handler_)
      }
    };
    svgedit.history.UndoManager.prototype.addCommandToHistory = function (n) {
      this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0 && (this.undoStack = this.undoStack.splice(0, this.undoStackPointer));
      this.undoStack.push(n);
      this.undoStackPointer = this.undoStack.length
    };
    svgedit.history.UndoManager.prototype.insertCommandToLastHistory = function (n) {
      if (this.undoStackPointer > 0) {
        var t = this.undoStack[this.undoStackPointer - 1];
        t.addSubCommand(n);
        this.undoStack[this.undoStackPointer - 1] = t
      } else this.addCommandToHistory(n)
    };
    svgedit.history.UndoManager.prototype.beginUndoableChange = function (n, t) {
      for (var e = ++this.undoChangeStackPointer, i = t.length, u = new Array(i), f = new Array(i), r; i--;)(r = t[i], r != null) && (f[i] = r, u[i] = n === "#text" ? r.textContent : r.getAttribute(n));
      this.undoableChangeStack[e] = {
        attrName: n,
        oldValues: u,
        elements: f
      }
    };
    svgedit.history.UndoManager.prototype.finishUndoableChange = function () {
      for (var e = this.undoChangeStackPointer--, i = this.undoableChangeStack[e], u = i.elements.length, n = i.attrName, o = new svgedit.history.BatchCommand("Change " + n), t, r, f; u--;)(t = i.elements[u], t != null) && (r = {}, r[n] = i.oldValues[u], f = t.getAttribute(n), n === "#text" && (f = t.textContent), r[n] != f && o.addSubCommand(new svgedit.history.ChangeElementCommand(t, r, n)));
      return this.undoableChangeStack[e] = null, o
    }
  }();
svgedit = svgedit || {},
  function () {
    svgedit.select || (svgedit.select = {});
    var n, r, t, i;
    i = svgedit.browser.isTouch() ? 10 : 4;
    svgedit.select.Selector = function (t, i) {
      this.id = t;
      this.selectedElement = i;
      this.locked = !0;
      this.selectorGroup = n.createSVGElement({
        element: "g",
        attr: {
          id: "selectorGroup" + this.id
        }
      });
      this.selectorRect = this.selectorGroup.appendChild(n.createSVGElement({
        element: "path",
        attr: {
          id: "selectedBox" + this.id,
          fill: "none",
          stroke: "#22C",
          "stroke-width": "1",
          "stroke-dasharray": "5,5",
          style: "pointer-events:none"
        }
      }));
      this.gripCoords = {
        nw: null,
        n: null,
        ne: null,
        e: null,
        se: null,
        s: null,
        sw: null,
        w: null
      };
      this.reset(this.selectedElement)
    };
    svgedit.select.Selector.prototype.reset = function (n) {
      this.locked = !0;
      this.selectedElement = n;
      this.resize();
      this.selectorGroup.setAttribute("display", "inline")
    };
    svgedit.select.Selector.prototype.updateGripCursors = function (n) {
      var i = [],
        r = Math.round(n / 45),
        f, u;
      r < 0 && (r += 8);
      for (u in t.selectorGrips) i.push(u);
      while (r > 0) i.push(i.shift()), r--;
      f = 0;
      for (u in t.selectorGrips) t.selectorGrips[u].setAttribute("style", "cursor:" + i[f] + "-resize"), f++
    };
    svgedit.select.Selector.prototype.showGrips = function (n, i) {
      var u = n ? "inline" : "none",
        r;
      t.selectorGripsGroup.setAttribute("display", u);
      i ? t.selectorGripsGroup.setAttribute("data-mode", "rotate") : t.selectorGripsGroup.removeAttribute("data-mode");
      r = this.selectedElement;
      this.hasGrips = n;
      r && n && (this.selectorGroup.appendChild(t.selectorGripsGroup), this.reset(r), this.updateGripCursors(svgedit.utilities.getRotationAngle(r)))
    };
    svgedit.select.Selector.prototype.resize = function () {
      var gt = this.selectorRect,
        a = t,
        st = a.selectorGrips,
        c = this.selectedElement,
        ht = c.getAttribute("stroke-width"),
        s = n.currentZoom(),
        o = 1 / s,
        it, ct, k, v, rt, w, ut, b, bt, kt, dt, tt, ot;
      c.getAttribute("stroke") === "none" || isNaN(ht) || (o += ht / 2);
      it = c.tagName;
      it === "text" && (o += 2 / s);
      ct = svgedit.transformlist.getTransformList(c);
      k = svgedit.math.transformListToTransform(ct).matrix;
      k.e *= s;
      k.f *= s;
      v = svgedit.utilities.getBBox(c);
      it !== "g" || $.data(c, "gsvg") || (rt = n.getStrokedBBox(c.childNodes), rt && (v = rt));
      var lt = v.x,
        at = v.y,
        vt = v.width,
        yt = v.height,
        v = {
          x: lt,
          y: at,
          width: vt,
          height: yt
        };
      o *= s;
      var r = svgedit.math.transformBox(lt * s, at * s, vt * s, yt * s, k),
        l = r.aabox,
        u = l.x - o,
        f = l.y - o,
        e = l.width + o * 2,
        h = l.height + o * 2,
        pt = u + e / 2,
        wt = f + h / 2;
      if (n.showSelectedObjInfo(l.x, l.y, l.width, l.height), w = svgedit.utilities.getRotationAngle(c), w) {
        ut = n.svgRoot().createSVGTransform();
        ut.setRotate(-w, pt, wt);
        b = ut.matrix;
        r.tl = svgedit.math.transformPoint(r.tl.x, r.tl.y, b);
        r.tr = svgedit.math.transformPoint(r.tr.x, r.tr.y, b);
        r.bl = svgedit.math.transformPoint(r.bl.x, r.bl.y, b);
        r.br = svgedit.math.transformPoint(r.br.x, r.br.y, b);
        var d = r.tl,
          g = d.x,
          nt = d.y,
          ft = d.x,
          et = d.y,
          y = Math.min,
          p = Math.max;
        g = y(g, y(r.tr.x, y(r.bl.x, r.br.x))) - o;
        nt = y(nt, y(r.tr.y, y(r.bl.y, r.br.y))) - o;
        ft = p(ft, p(r.tr.x, p(r.bl.x, r.br.x))) + o;
        et = p(et, p(r.tr.y, p(r.bl.y, r.br.y))) + o;
        u = g;
        f = nt;
        e = ft - g;
        h = et - nt
      }
      bt = n.svgRoot().suspendRedraw(100);
      kt = "M" + u + "," + f + " L" + (u + e) + "," + f + " " + (u + e) + "," + (f + h) + " " + u + "," + (f + h) + "z";
      gt.setAttribute("d", kt);
      dt = w ? "rotate(" + [w, pt, wt].join(",") + ")" : "";
      this.selectorGroup.setAttribute("transform", dt);
      this.gripCoords = {
        nw: [u, f],
        ne: [u + e, f],
        sw: [u, f + h],
        se: [u + e, f + h],
        n: [u + e / 2, f],
        w: [u, f + h / 2],
        e: [u + e, f + h / 2],
        s: [u + e / 2, f + h]
      };
      for (tt in this.gripCoords) ot = this.gripCoords[tt], st[tt].setAttribute("cx", ot[0]), st[tt].setAttribute("cy", ot[1]);
      a.rotateGripConnector.setAttribute("x1", u + e / 2);
      a.rotateGripConnector.setAttribute("y1", f);
      a.rotateGripConnector.setAttribute("x2", u + e / 2);
      a.rotateGripConnector.setAttribute("y2", f - i * 5);
      a.rotateGrip.setAttribute("cx", u + e / 2);
      a.rotateGrip.setAttribute("cy", f - i * 5);
      n.svgRoot().unsuspendRedraw(bt)
    };
    svgedit.select.SelectorManager = function () {
      this.selectorParentGroup = null;
      this.rubberBandBox = null;
      this.snapPointBox = null;
      this.selectors = [];
      this.selectorMap = {};
      this.selectorGrips = {
        nw: null,
        n: null,
        ne: null,
        e: null,
        se: null,
        s: null,
        sw: null,
        w: null
      };
      this.selectorGripsGroup = null;
      this.rotateGripConnector = null;
      this.rotateGrip = null;
      this.initGroup()
    };
    svgedit.select.SelectorManager.prototype.initGroup = function () {
      var t, u;
      this.selectorParentGroup && this.selectorParentGroup.parentNode && this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup);
      this.selectorParentGroup = n.createSVGElement({
        element: "g",
        attr: {
          id: "selectorParentGroup"
        }
      });
      this.selectorGripsGroup = n.createSVGElement({
        element: "g",
        attr: {
          display: "none"
        }
      });
      this.selectorParentGroup.appendChild(this.selectorGripsGroup);
      n.svgRoot().appendChild(this.selectorParentGroup);
      this.selectorMap = {};
      this.selectors = [];
      this.rubberBandBox = null;
      for (t in this.selectorGrips) u = n.createSVGElement({
        element: "circle",
        attr: {
          id: "selectorGrip_resize_" + t,
          fill: "#22C",
          r: i,
          style: "cursor:" + t + "-resize",
          "stroke-width": 2,
          "pointer-events": "all",
          "class": "selectorGrip_resize"
        }
      }), $.data(u, "dir", t), $.data(u, "type", "resize"), this.selectorGrips[t] = this.selectorGripsGroup.appendChild(u);
      if (this.rotateGripConnector = this.selectorGripsGroup.appendChild(n.createSVGElement({
          element: "line",
          attr: {
            id: "selectorGrip_rotateconnector",
            stroke: "#22C",
            "stroke-width": "1"
          }
        })), this.rotateGrip = this.selectorGripsGroup.appendChild(n.createSVGElement({
          element: "circle",
          attr: {
            id: "selectorGrip_rotate",
            fill: "lime",
            r: i,
            stroke: "#22C",
            "stroke-width": 2,
            style: "cursor:url(" + r.imgPath + "rotate.cur), auto;"
          }
        })), $.data(this.rotateGrip, "type", "rotate"), !$("#canvasBackground").length) {
        var f = r.dimensions,
          e = n.createSVGElement({
            element: "svg",
            attr: {
              id: "canvasBackground",
              width: f[0],
              height: f[1],
              x: 0,
              y: 0,
              overflow: "visible",
              style: "pointer-events:none"
            }
          }),
          o = n.createSVGElement({
            element: "rect",
            attr: {
              width: "100%",
              height: "100%",
              x: 0,
              y: 0,
              "stroke-width": 1,
              stroke: "#000",
              fill: "#FFF",
              style: "pointer-events:none"
            }
          });
        e.appendChild(o);
        n.svgRoot().insertBefore(e, n.svgContent())
      }
    };
    svgedit.select.SelectorManager.prototype.requestSelector = function (n) {
      var i, t;
      if (n == null) return null;
      if (i = this.selectors.length, typeof this.selectorMap[n.id] == "object") return this.selectorMap[n.id].locked = !0, this.selectorMap[n.id];
      for (t = 0; t < i; ++t)
        if (this.selectors[t] && !this.selectors[t].locked) return this.selectors[t].locked = !0, this.selectors[t].reset(n), this.selectorMap[n.id] = this.selectors[t], this.selectors[t];
      return this.selectors[i] = new svgedit.select.Selector(i, n), this.selectorParentGroup.appendChild(this.selectors[i].selectorGroup), this.selectorMap[n.id] = this.selectors[i], this.selectors[i]
    };
    svgedit.select.SelectorManager.prototype.releaseSelector = function (n) {
      var r, t, i;
      if (n != null)
        for (r = this.selectors.length, t = this.selectorMap[n.id], i = 0; i < r; ++i)
          if (this.selectors[i] && this.selectors[i] == t) {
            t.locked == !1 && console.log("WARNING! selector was released but was already unlocked");
            delete this.selectorMap[n.id];
            t.locked = !1;
            t.selectedElement = null;
            t.showGrips(!1);
            try {
              t.selectorGroup.setAttribute("display", "none")
            } catch (u) {}
            break
          }
    };
    svgedit.select.SelectorManager.prototype.getRubberBandBox = function () {
      return this.rubberBandBox || (this.rubberBandBox = this.selectorParentGroup.appendChild(n.createSVGElement({
        element: "rect",
        attr: {
          id: "selectorRubberBand",
          fill: "#22C",
          "fill-opacity": .15,
          stroke: "#22C",
          "stroke-width": .5,
          display: "none",
          style: "pointer-events:none"
        }
      }))), this.rubberBandBox
    };
    svgedit.select.SelectorManager.prototype.getPointSnapBox = function () {
      return this.snapPointBox || (this.snapPointBox = this.selectorParentGroup.appendChild(n.createSVGElement({
        element: "rect",
        attr: {
          id: "selectorPointSnap",
          fill: "#22C",
          "fill-opacity": .15,
          stroke: "#22C",
          "stroke-width": .5,
          display: "none",
          style: "pointer-events:none"
        }
      }))), this.snapPointBox
    };
    svgedit.select.init = function (i, u) {
      r = i;
      n = u;
      t = new svgedit.select.SelectorManager
    };
    svgedit.select.getSelectorManager = function () {
      return t
    }
  }();
svgedit = svgedit || {},
  function () {
    svgedit.draw || (svgedit.draw = {});
    var t = "http://www.w3.org/2000/svg",
      r = "http://svg-edit.googlecode.com",
      u = "http://www.w3.org/2000/xmlns/",
      f = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use".split(","),
      n = {
        LET_DOCUMENT_DECIDE: 0,
        ALWAYS_RANDOMIZE: 1,
        NEVER_RANDOMIZE: 2
      },
      i = n.LET_DOCUMENT_DECIDE;
    svgedit.draw.Layer = function (n, t) {
      this.name_ = n;
      this.group_ = t
    };
    svgedit.draw.Layer.prototype.getName = function () {
      return this.name_
    };
    svgedit.draw.Layer.prototype.getGroup = function () {
      return this.group_
    };
    svgedit.draw.randomizeIds = function (t, r) {
      i = t == !1 ? n.NEVER_RANDOMIZE : n.ALWAYS_RANDOMIZE;
      i != n.ALWAYS_RANDOMIZE || r.getNonce() ? i == n.NEVER_RANDOMIZE && r.getNonce() && r.clearNonce() : r.setNonce(Math.floor(Math.random() * 100001))
    };
    svgedit.draw.Drawing = function (u, f) {
      if (!u || !u.tagName || !u.namespaceURI || u.tagName != "svg" || u.namespaceURI != t) throw "Error: svgedit.draw.Drawing instance initialized without a <svg> element";
      this.svgElem_ = u;
      this.obj_num = 0;
      this.idPrefix = f || "svg_";
      this.releasedNums = [];
      this.all_layers = [];
      this.current_layer = null;
      this.nonce_ = "";
      var e = this.svgElem_.getAttributeNS(r, "nonce");
      !e || i == n.NEVER_RANDOMIZE ? i == n.ALWAYS_RANDOMIZE && this.setNonce(Math.floor(Math.random() * 100001)) : this.nonce_ = e
    };
    svgedit.draw.Drawing.prototype.getElem_ = function (n) {
      return this.svgElem_.querySelector ? this.svgElem_.querySelector("#" + n) : $(this.svgElem_).find("[id=" + n + "]")[0]
    };
    svgedit.draw.Drawing.prototype.getSvgElem = function () {
      return this.svgElem_
    };
    svgedit.draw.Drawing.prototype.getNonce = function () {
      return this.nonce_
    };
    svgedit.draw.Drawing.prototype.setNonce = function (n) {
      this.svgElem_.setAttributeNS(u, "xmlns:se", r);
      this.svgElem_.setAttributeNS(r, "se:nonce", n);
      this.nonce_ = n
    };
    svgedit.draw.Drawing.prototype.clearNonce = function () {
      this.nonce_ = ""
    };
    svgedit.draw.Drawing.prototype.getId = function () {
      return this.nonce_ ? this.idPrefix + this.nonce_ + "_" + this.obj_num : this.idPrefix + this.obj_num
    };
    svgedit.draw.Drawing.prototype.getNextId = function () {
      var i = this.obj_num,
        n = !1,
        t;
      for (this.releasedNums.length > 0 ? (this.obj_num = this.releasedNums.pop(), n = !0) : this.obj_num++, t = this.getId(); this.getElem_(t);) n && (this.obj_num = i, n = !1), this.obj_num++, t = this.getId();
      return n && (this.obj_num = i), t
    };
    svgedit.draw.Drawing.prototype.releaseId = function (n) {
      var i = this.idPrefix + (this.nonce_ ? this.nonce_ + "_" : ""),
        t;
      return typeof n != "string" || n.indexOf(i) != 0 ? !1 : (t = parseInt(n.substr(i.length)), typeof t != "number" || t <= 0 || this.releasedNums.indexOf(t) != -1) ? !1 : (this.releasedNums.push(t), !0)
    };
    svgedit.draw.Drawing.prototype.getNumLayers = function () {
      return this.all_layers.length
    };
    svgedit.draw.Drawing.prototype.hasLayer = function (n) {
      for (var t = 0; t < this.getNumLayers(); t++)
        if (this.all_layers[t][0] == n) return !0;
      return !1
    };
    svgedit.draw.Drawing.prototype.getLayerName = function (n) {
      return n >= 0 && n < this.getNumLayers() ? this.all_layers[n][0] : ""
    };
    svgedit.draw.Drawing.prototype.getCurrentLayer = function () {
      return this.current_layer
    };
    svgedit.draw.Drawing.prototype.getCurrentLayerName = function () {
      for (var n = 0; n < this.getNumLayers(); ++n)
        if (this.all_layers[n][1] == this.current_layer) return this.getLayerName(n);
      return ""
    };
    svgedit.draw.Drawing.prototype.setCurrentLayer = function (n) {
      for (var t = 0; t < this.getNumLayers(); ++t)
        if (n == this.getLayerName(t)) return this.current_layer != this.all_layers[t][1] && (this.current_layer.setAttribute("style", "pointer-events:none"), this.current_layer = this.all_layers[t][1], this.current_layer.setAttribute("style", "pointer-events:all")), !0;
      return !1
    };
    svgedit.draw.Drawing.prototype.deleteCurrentLayer = function () {
      if (this.current_layer && this.getNumLayers() > 1) {
        var n = this.current_layer.parentNode,
          i = this.current_layer.nextSibling,
          t = n.removeChild(this.current_layer);
        return this.identifyLayers(), t
      }
      return null
    };
    svgedit.draw.Drawing.prototype.identifyLayers = function () {
      var n, u, y, s, r, h, a, o;
      this.all_layers = [];
      var v = this.svgElem_.childNodes.length,
        e = [],
        c = [],
        i = null,
        l = !1;
      for (r = 0; r < v; ++r) n = this.svgElem_.childNodes.item(r), n && n.nodeType == 1 && (n.tagName == "g" ? (l = !0, u = $("title", n).text() || "Mat", !u && svgedit.browser.isOpera() && n.querySelectorAll && (u = $(n.querySelectorAll("title")).text() || "Mat"), u ? (c.push(u), this.all_layers.push([u, n]), i = n, svgedit.utilities.walkTree(n, function (n) {
        n.setAttribute("style", "pointer-events:inherit")
      }), i.setAttribute("style", "pointer-events:none")) : e.push(n)) : ~f.indexOf(n.nodeName) && (y = svgedit.utilities.getBBox(n), e.push(n)));
      if (s = this.svgElem_.ownerDocument, e.length > 0 || !l) {
        for (r = 1; c.indexOf("Layer " + r) >= 0;) r++;
        for (h = "Mat", i = s.createElementNS(t, "g"), a = s.createElementNS(t, "title"), a.textContent = h, o = 0; o < e.length; ++o) i.appendChild(e[o]);
        this.svgElem_.appendChild(i);
        this.all_layers.push([h, i])
      }
      svgedit.utilities.walkTree(i, function (n) {
        n.setAttribute("style", "pointer-events:inherit")
      });
      this.current_layer = i;
      this.current_layer.setAttribute("style", "pointer-events:all")
    };
    svgedit.draw.Drawing.prototype.createLayer = function (n) {
      var r = this.svgElem_.ownerDocument,
        i = r.createElementNS(t, "g"),
        u = r.createElementNS(t, "title");
      return u.textContent = n, i.appendChild(u), this.svgElem_.appendChild(i), this.identifyLayers(), i
    };
    svgedit.draw.Drawing.prototype.getLayerVisibility = function (n) {
      for (var i = null, t = 0; t < this.getNumLayers(); ++t)
        if (this.getLayerName(t) == n) {
          i = this.all_layers[t][1];
          break
        } return i ? i.getAttribute("display") != "none" : !1
    };
    svgedit.draw.Drawing.prototype.setLayerVisibility = function (n, t) {
      var i, r, u;
      if (typeof t != "boolean") return null;
      for (i = null, r = 0; r < this.getNumLayers(); ++r)
        if (this.getLayerName(r) == n) {
          i = this.all_layers[r][1];
          break
        } return i ? (u = i.getAttribute("display"), u || (u = "inline"), i.setAttribute("display", t ? "inline" : "none"), i) : null
    };
    svgedit.draw.Drawing.prototype.getLayerOpacity = function (n) {
      for (var r, i, t = 0; t < this.getNumLayers(); ++t)
        if (this.getLayerName(t) == n) return r = this.all_layers[t][1], i = r.getAttribute("opacity"), i || (i = "1.0"), parseFloat(i);
      return null
    };
    svgedit.draw.Drawing.prototype.setLayerOpacity = function (n, t) {
      var i, r;
      if (typeof t == "number" && !(t < 0) && !(t > 1))
        for (i = 0; i < this.getNumLayers(); ++i)
          if (this.getLayerName(i) == n) {
            r = this.all_layers[i][1];
            r.setAttribute("opacity", t);
            break
          }
    }
  }();
svgedit = svgedit || {},
  function () {
    var f, t, n, e;
    svgedit.path || (svgedit.path = {});
    var i = "http://www.w3.org/2000/svg",
      s = {
        pathNodeTooltip: "Drag node to move it. Double-click node to change segment type",
        pathCtrlPtTooltip: "Drag control point to adjust curve properties"
      },
      h = {
        2: ["x", "y"],
        4: ["x", "y"],
        6: ["x", "y", "x1", "y1", "x2", "y2"],
        8: ["x", "y", "x1", "y1"],
        10: ["x", "y", "r1", "r2", "angle", "largeArcFlag", "sweepFlag"],
        12: ["x"],
        14: ["y"],
        16: ["x", "y", "x2", "y2"],
        18: ["x", "y"]
      },
      u = [],
      o;
    o = svgedit.browser.isTouch() ? 6 : 4;
    f = !0;
    t = {};
    svgedit.path.setLinkControlPoints = function (n) {
      f = n
    };
    svgedit.path.path = null;
    n = null;
    svgedit.path.init = function (t) {
      n = t;
      u = [0, "ClosePath"];
      $.each(["Moveto", "Lineto", "CurvetoCubic", "CurvetoQuadratic", "Arc", "LinetoHorizontal", "LinetoVertical", "CurvetoCubicSmooth", "CurvetoQuadraticSmooth"], function (n, t) {
        u.push(t + "Abs");
        u.push(t + "Rel")
      })
    };
    svgedit.path.insertItemBefore = function (n, t, i) {
      var u = n.pathSegList,
        f, e, o, r;
      if (svgedit.browser.supportsPathInsertItemBefore()) {
        u.insertItemBefore(t, i);
        return
      }
      for (f = u.numberOfItems, e = [], r = 0; r < f; r++) o = u.getItem(r), e.push(o);
      for (u.clear(), r = 0; r < f; r++) r == i && u.appendItem(t), u.appendItem(e[r])
    };
    svgedit.path.ptObjToArr = function (n, t) {
      for (var r = h[n], u = r.length, f = Array(u), i = 0; i < u; i++) f[i] = t[r[i]];
      return f
    };
    svgedit.path.getGripPt = function (t, i) {
      var r = {
          x: i ? i.x : t.item.x,
          y: i ? i.y : t.item.y
        },
        u = t.path,
        f;
      return u.matrix && (f = svgedit.math.transformPoint(r.x, r.y, u.matrix), r = f), r.x *= n.getCurrentZoom(), r.y *= n.getCurrentZoom(), r
    };
    svgedit.path.getPointFromGrip = function (t, i) {
      var r = {
          x: t.x,
          y: t.y
        },
        t;
      return i.matrix && (t = svgedit.math.transformPoint(r.x, r.y, i.imatrix), r.x = t.x, r.y = t.y), r.x /= n.getCurrentZoom(), r.y /= n.getCurrentZoom(), r
    };
    svgedit.path.addPointGrip = function (n, t, r) {
      var e = svgedit.path.getGripContainer(),
        u = svgedit.utilities.getElem("pathpointgrip_" + n),
        f;
      return u || (u = document.createElementNS(i, "circle"), svgedit.utilities.assignAttributes(u, {
        id: "pathpointgrip_" + n,
        display: "none",
        r: o,
        fill: "#0FF",
        stroke: "#00F",
        "stroke-width": 2,
        style: "pointer-events:all",
        "xlink:title": s.pathNodeTooltip
      }), u = e.appendChild(u), f = $("#pathpointgrip_" + n), f.dblclick(function () {
        svgedit.path.path && svgedit.path.path.setSegType()
      })), t && r && svgedit.utilities.assignAttributes(u, {
        cx: t,
        cy: r,
        display: "inline"
      }), u
    };
    svgedit.path.getGripContainer = function () {
      var n = svgedit.utilities.getElem("pathpointgrip_container"),
        t;
      return n || (t = svgedit.utilities.getElem("selectorParentGroup"), n = t.appendChild(document.createElementNS(i, "g")), n.id = "pathpointgrip_container"), n
    };
    svgedit.path.addCtrlGrip = function (n) {
      var t = svgedit.utilities.getElem("ctrlpointgrip_" + n);
      return t ? t : (t = document.createElementNS(i, "circle"), svgedit.utilities.assignAttributes(t, {
        id: "ctrlpointgrip_" + n,
        display: "none",
        r: o,
        fill: "#0FF",
        stroke: "#55F",
        "stroke-width": 1,
        style: "pointer-events:all",
        "class": "ctrlpoint",
        "xlink:title": s.pathCtrlPtTooltip
      }), svgedit.path.getGripContainer().appendChild(t), t)
    };
    svgedit.path.getCtrlLine = function (n) {
      var t = svgedit.utilities.getElem("ctrlLine_" + n);
      return t ? t : (t = document.createElementNS(i, "line"), svgedit.utilities.assignAttributes(t, {
        id: "ctrlLine_" + n,
        stroke: "#555",
        "stroke-width": 1,
        "class": "ctrlpoint",
        style: "pointer-events:none"
      }), svgedit.path.getGripContainer().appendChild(t), t)
    };
    svgedit.path.getPointGrip = function (n, t) {
      var u = n.index,
        r = svgedit.path.addPointGrip(u),
        i;
      return t && (i = svgedit.path.getGripPt(n), svgedit.utilities.assignAttributes(r, {
        cx: i.x,
        cy: i.y,
        display: "inline"
      })), r
    };
    svgedit.path.getControlPoints = function (n) {
      var i = n.item,
        f = n.index,
        t;
      if (!("x1" in i) || !("x2" in i)) return null;
      var r = {},
        l = svgedit.path.getGripContainer(),
        c = svgedit.path.path.segs[f - 1].item,
        e = [c, i];
      for (t = 1; t < 3; t++) {
        var o = f + "c" + t,
          s = r["c" + t + "_line"] = svgedit.path.getCtrlLine(o),
          u = svgedit.path.getGripPt(n, {
            x: i["x" + t],
            y: i["y" + t]
          }),
          h = svgedit.path.getGripPt(n, {
            x: e[t - 1].x,
            y: e[t - 1].y
          });
        svgedit.utilities.assignAttributes(s, {
          x1: u.x,
          y1: u.y,
          x2: h.x,
          y2: h.y,
          display: "inline"
        });
        r["c" + t + "_line"] = s;
        pointGrip = r["c" + t] = svgedit.path.addCtrlGrip(o);
        svgedit.utilities.assignAttributes(pointGrip, {
          cx: u.x,
          cy: u.y,
          display: "inline"
        });
        r["c" + t] = pointGrip
      }
      return r
    };
    svgedit.path.replacePathSeg = function (n, t, i, r) {
      var e = r || svgedit.path.path.elem,
        a = "createSVGPathSeg" + u[n],
        s = e[a].apply(e, i),
        l, f;
      if (svgedit.browser.supportsPathReplaceItem()) e.pathSegList.numberOfItems > t && e.pathSegList.replaceItem(s, t);
      else {
        var o = e.pathSegList,
          h = o.numberOfItems,
          c = [];
        for (f = 0; f < h; f++) l = o.getItem(f), c.push(l);
        for (o.clear(), f = 0; f < h; f++) f == t ? o.appendItem(s) : o.appendItem(c[f])
      }
    };
    svgedit.path.getSegSelector = function (n, t) {
      var s = n.index,
        r = svgedit.utilities.getElem("segline_" + s),
        h, o, f, e, u;
      if (r || (h = svgedit.path.getGripContainer(), r = document.createElementNS(i, "path"), svgedit.utilities.assignAttributes(r, {
          id: "segline_" + s,
          display: "none",
          fill: "none",
          stroke: "#0FF",
          "stroke-width": 2,
          style: "pointer-events:none",
          d: "M0,0 0,0"
        }), h.appendChild(r)), t) {
        if (o = n.prev, !o) return r.setAttribute("display", "none"), r;
        for (u = svgedit.path.getGripPt(o), svgedit.path.replacePathSeg(2, 0, [u.x, u.y], r), f = svgedit.path.ptObjToArr(n.type, n.item, !0), e = 0; e < f.length; e += 2) u = svgedit.path.getGripPt(n, {
          x: f[e],
          y: f[e + 1]
        }), f[e] = u.x, f[e + 1] = u.y;
        svgedit.path.replacePathSeg(n.type, 1, f, r)
      }
      return r
    };
    svgedit.path.smoothControlPoints = this.smoothControlPoints = function (t, i, r) {
      var s = t.x - r.x,
        h = t.y - r.y,
        c = i.x - r.x,
        l = i.y - r.y,
        o, u, a, v;
      if ((s != 0 || h != 0) && (c != 0 || l != 0)) {
        var f = Math.atan2(h, s),
          e = Math.atan2(l, c),
          w = Math.sqrt(s * s + h * h),
          b = Math.sqrt(c * c + l * l),
          y = n.getSVGRoot().createSVGPoint(),
          p = n.getSVGRoot().createSVGPoint();
        return f < 0 && (f += 2 * Math.PI), e < 0 && (e += 2 * Math.PI), o = Math.abs(f - e), u = Math.abs(Math.PI - o) / 2, f - e > 0 ? (a = o < Math.PI ? f + u : f - u, v = o < Math.PI ? e - u : e + u) : (a = o < Math.PI ? f - u : f + u, v = o < Math.PI ? e + u : e - u), y.x = w * Math.cos(a) + r.x, y.y = w * Math.sin(a) + r.y, p.x = b * Math.cos(v) + r.x, p.y = b * Math.sin(v) + r.y, [y, p]
      }
      return undefined
    };
    svgedit.path.Segment = function (n, t) {
      this.selected = !1;
      this.index = n;
      this.item = t;
      this.type = t.pathSegType;
      this.ctrlpts = [];
      this.ptgrip = null;
      this.segsel = null
    };
    svgedit.path.Segment.prototype.showCtrlPts = function (n) {
      for (var t in this.ctrlpts) this.ctrlpts[t].setAttribute("display", n ? "inline" : "none")
    };
    svgedit.path.Segment.prototype.selectCtrls = function (n) {
      $("#ctrlpointgrip_" + this.index + "c1, #ctrlpointgrip_" + this.index + "c2").attr("fill", n ? "#0FF" : "#EEE")
    };
    svgedit.path.Segment.prototype.show = function (n) {
      this.ptgrip && (this.ptgrip.setAttribute("display", n ? "inline" : "none"), this.segsel.setAttribute("display", n ? "inline" : "none"), this.showCtrlPts(n))
    };
    svgedit.path.Segment.prototype.select = function (n) {
      this.ptgrip && (this.ptgrip.setAttribute("stroke", n ? "#0FF" : "#00F"), this.segsel.setAttribute("display", n ? "inline" : "none"), this.ctrlpts && this.selectCtrls(n), this.selected = n)
    };
    svgedit.path.Segment.prototype.addGrip = function () {
      this.ptgrip = svgedit.path.getPointGrip(this, !0);
      this.ctrlpts = svgedit.path.getControlPoints(this, !0);
      this.segsel = svgedit.path.getSegSelector(this, !0)
    };
    svgedit.path.Segment.prototype.update = function (n) {
      if (this.ptgrip) {
        var t = svgedit.path.getGripPt(this);
        svgedit.utilities.assignAttributes(this.ptgrip, {
          cx: t.x,
          cy: t.y
        });
        svgedit.path.getSegSelector(this, !0);
        this.ctrlpts && (n && (this.item = svgedit.path.path.elem.pathSegList.getItem(this.index), this.type = this.item.pathSegType), svgedit.path.getControlPoints(this))
      }
    };
    svgedit.path.Segment.prototype.move = function (n, t) {
      var i = this.item,
        u, r, f, e;
      u = this.ctrlpts ? [i.x += n, i.y += t, i.x1, i.y1, i.x2 += n, i.y2 += t] : [i.x += n, i.y += t];
      svgedit.path.replacePathSeg(this.type, this.index, u);
      this.next && this.next.ctrlpts && (r = this.next.item, f = [r.x, r.y, r.x1 += n, r.y1 += t, r.x2, r.y2], svgedit.path.replacePathSeg(this.next.type, this.next.index, f));
      this.mate && (i = this.mate.item, e = [i.x += n, i.y += t], svgedit.path.replacePathSeg(this.mate.type, this.mate.index, e));
      this.update(!0);
      this.next && this.next.update(!0)
    };
    svgedit.path.Segment.prototype.setLinked = function (n) {
      var t, u, r, i, f;
      if (n == 2) {
        if (u = 1, t = this.next, !t) return;
        r = this.item
      } else {
        if (u = 2, t = this.prev, !t) return;
        r = t.item
      }
      i = t.item;
      i["x" + u] = r.x + (r.x - this.item["x" + n]);
      i["y" + u] = r.y + (r.y - this.item["y" + n]);
      f = [i.x, i.y, i.x1, i.y1, i.x2, i.y2];
      svgedit.path.replacePathSeg(t.type, t.index, f);
      t.update(!0)
    };
    svgedit.path.Segment.prototype.moveCtrl = function (n, t, i) {
      var r = this.item,
        u;
      r["x" + n] += t;
      r["y" + n] += i;
      u = [r.x, r.y, r.x1, r.y1, r.x2, r.y2];
      svgedit.path.replacePathSeg(this.type, this.index, u);
      this.update(!0)
    };
    svgedit.path.Segment.prototype.setType = function (n, t) {
      svgedit.path.replacePathSeg(n, this.index, t);
      this.type = n;
      this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
      this.showCtrlPts(n === 6);
      this.ctrlpts = svgedit.path.getControlPoints(this);
      this.update(!0)
    };
    svgedit.path.Path = function (n) {
      if (!n || n.tagName !== "path") throw "svgedit.path.Path constructed without a <path> element";
      this.elem = n;
      this.segs = [];
      this.selected_pts = [];
      svgedit.path.path = this;
      this.init()
    };
    svgedit.path.Path.prototype.init = function () {
      var o, e, h, s, i, u, n, r;
      for ($(svgedit.path.getGripContainer()).find("*").attr("display", "none"), o = this.elem.pathSegList, e = o.numberOfItems, this.segs = [], this.selected_pts = [], this.first_seg = null, n = 0; n < e; n++) h = o.getItem(n), s = new svgedit.path.Segment(n, h), s.path = this, this.segs.push(s);
      for (i = this.segs, u = null, n = 0; n < e; n++) {
        var t = i[n],
          f = n + 1 >= e ? null : i[n + 1],
          c = n - 1 < 0 ? null : i[n - 1];
        t.type === 2 ? (c && c.type !== 1 && (r = i[u], r.next = i[u + 1], r.next.prev = r, r.addGrip()), u = n) : f && f.type === 1 ? (t.next = i[u + 1], t.next.prev = t, t.mate = i[u], t.addGrip(), this.first_seg == null && (this.first_seg = t)) : f ? t.type !== 1 && (t.addGrip(), f && f.type !== 2 && (t.next = f, t.next.prev = t)) : t.type !== 1 && (r = i[u], r.next = i[u + 1], r.next.prev = r, r.addGrip(), t.addGrip(), this.first_seg || (this.first_seg = i[u]))
      }
      return this
    };
    svgedit.path.Path.prototype.eachSeg = function (n) {
      for (var r = this.segs.length, i, t = 0; t < r; t++)
        if (i = n.call(this.segs[t], t), i === !1) break
    };
    svgedit.path.Path.prototype.addSeg = function (n) {
      var t = this.segs[n],
        i, f, r, u, w;
      if (t.prev) {
        i = t.prev;
        switch (t.item.pathSegType) {
          case 4:
            r = (t.item.x + i.item.x) / 2;
            u = (t.item.y + i.item.y) / 2;
            f = this.elem.createSVGPathSegLinetoAbs(r, u);
            break;
          case 6:
            var e = (i.item.x + t.item.x1) / 2,
              o = (t.item.x1 + t.item.x2) / 2,
              s = (t.item.x2 + t.item.x) / 2,
              h = (e + o) / 2,
              c = (o + s) / 2,
              r = (h + c) / 2,
              l = (i.item.y + t.item.y1) / 2,
              a = (t.item.y1 + t.item.y2) / 2,
              v = (t.item.y2 + t.item.y) / 2,
              y = (l + a) / 2,
              p = (a + v) / 2,
              u = (y + p) / 2;
            f = this.elem.createSVGPathSegCurvetoCubicAbs(r, u, e, l, h, y);
            w = [t.item.x, t.item.y, c, p, s, v];
            svgedit.path.replacePathSeg(t.type, n, w)
        }
        svgedit.path.insertItemBefore(this.elem, f, n)
      }
    };
    svgedit.path.Path.prototype.deleteSeg = function (n, t) {
      var i = this.segs[n],
        u, r, f, o, e;
      if (i) return u = this.elem.pathSegList, r = t, i.show(!1), f = i.next, i.mate ? (e = [f.item.x, f.item.y], svgedit.path.replacePathSeg(2, f.index, e), svgedit.path.replacePathSeg(4, i.index, e), u.removeItem(i.mate.index), r.mate = i.mate.index + 1, r.shift = n - 1, r.bShift = !0) : i.prev ? r.bShift ? (u.removeItem(n - 1), r.shift -= 1) : u.removeItem(n) : (o = i.item, e = [f.item.x, f.item.y], svgedit.path.replacePathSeg(2, i.next.index, e), r.bShift ? (u.removeItem(n - 1), r.shift -= 1) : u.removeItem(n)), r
    };
    svgedit.path.Path.prototype.subpathIsClosed = function (n) {
      var t = !1;
      return svgedit.path.path.eachSeg(function (i) {
        return i <= n ? !0 : this.type === 2 ? !1 : this.type === 1 ? (t = !0, !1) : void 0
      }), t
    };
    svgedit.path.Path.prototype.removePtFromSelection = function (n) {
      var t = this.selected_pts.indexOf(n);
      t != -1 && (this.segs[n].select(!1), this.selected_pts.splice(t, 1))
    };
    svgedit.path.Path.prototype.clearSelection = function () {
      this.eachSeg(function () {
        this.select(!1)
      });
      this.selected_pts = []
    };
    svgedit.path.Path.prototype.storeD = function () {
      this.last_d = this.elem.getAttribute("d")
    };
    svgedit.path.Path.prototype.show = function (n) {
      return this.eachSeg(function () {
        this.show(n)
      }), n && this.selectPt(this.first_seg.index), this
    };
    svgedit.path.Path.prototype.movePts = function (n, t) {
      for (var i = this.selected_pts.length, r; i--;) r = this.segs[this.selected_pts[i]], r.move(n, t)
    };
    svgedit.path.Path.prototype.moveCtrl = function (n, t) {
      var i = this.segs[this.selected_pts[0]];
      i.moveCtrl(this.dragctrl, n, t);
      f && i.setLinked(this.dragctrl)
    };
    svgedit.path.Path.prototype.setSegType = function (n) {
      var e, s, h, u;
      for (this.storeD(), e = this.selected_pts.length; e--;) {
        var y = this.selected_pts[e],
          t = this.segs[y],
          o = t.prev;
        if (o && (n || (s = "Toggle Path Segment Type", h = t.type, n = h == 6 ? 4 : 6), t.type != n)) {
          n = +n;
          var i = t.item.x,
            r = t.item.y,
            c = o.item.x,
            l = o.item.y,
            f;
          switch (n) {
            case 6:
              if (t.olditem) u = t.olditem, f = [i, r, u.x1, u.y1, u.x2, u.y2];
              else {
                var a = i - c,
                  v = r - l,
                  p = c + a / 3,
                  w = l + v / 3,
                  b = i - a / 3,
                  k = r - v / 3;
                f = [i, r, p, w, b, k]
              }
              break;
            case 4:
              f = [i, r];
              t.olditem = t.item
          }
          t.setType(n, f)
        }
      }
      svgedit.path.path.endChanges(s)
    };
    svgedit.path.Path.prototype.selectPt = function (n, t) {
      this.clearSelection();
      n == null && this.eachSeg(function (t) {
        this.prev && (n = t)
      });
      this.addPtsToSelection(n);
      t && (this.dragctrl = t, f && this.segs[n].setLinked(t))
    };
    svgedit.path.Path.prototype.update = function () {
      var n = this.elem;
      return svgedit.utilities.getRotationAngle(n) ? (this.matrix = svgedit.math.getMatrix(n), this.imatrix = this.matrix.inverse()) : (this.matrix = null, this.imatrix = null), this.eachSeg(function (t) {
        this.item = n.pathSegList.getItem(t);
        this.update()
      }), this
    };
    svgedit.path.getPath_ = function (n) {
      var i = t[n.id];
      return i || (i = t[n.id] = new svgedit.path.Path(n)), i
    };
    svgedit.path.removePath_ = function (n) {
      n in t && delete t[n]
    };
    e = function (n, t, i, u, f, e, o) {
      return dx = n - i, dy = t - u, r = Math.sqrt(dx * dx + dy * dy), theta = Math.atan2(dy, dx) + f, dx = r * Math.cos(theta) + i, dy = r * Math.sin(theta) + u, dx -= e, dy -= o, r = Math.sqrt(dx * dx + dy * dy), theta = Math.atan2(dy, dx) - f, {
        x: (r * Math.cos(theta) + e) / 1,
        y: (r * Math.sin(theta) + o) / 1
      }
    };
    svgedit.path.recalcRotatedPath = function () {
      var u = svgedit.path.path.elem,
        t = svgedit.utilities.getRotationAngle(u, !0),
        y, h, n, p, w, l, b, g;
      if (t) {
        var f = svgedit.utilities.getBBox(u),
          c = svgedit.path.path.oldbbox,
          o = c.x + c.width / 2,
          s = c.y + c.height / 2,
          i = f.x + f.width / 2,
          r = f.y + f.height / 2,
          a = i - o,
          v = r - s,
          k = Math.sqrt(a * a + v * v),
          d = Math.atan2(v, a) + t;
        for (i = k * Math.cos(d) + o, r = k * Math.sin(d) + s, y = u.pathSegList, h = y.numberOfItems; h;)(h -= 1, n = y.getItem(h), p = n.pathSegType, p != 1) && (w = e(n.x, n.y, o, s, t, i, r), l = [w.x, w.y], n.x1 != null && n.x2 != null && (c_vals1 = e(n.x1, n.y1, o, s, t, i, r), c_vals2 = e(n.x2, n.y2, o, s, t, i, r), l.splice(l.length, 0, c_vals1.x, c_vals1.y, c_vals2.x, c_vals2.y)), svgedit.path.replacePathSeg(p, h, l));
        f = svgedit.utilities.getBBox(u);
        b = svgroot.createSVGTransform();
        g = svgedit.transformlist.getTransformList(u);
        b.setRotate(t * 180 / Math.PI, i, r);
        g.replaceItem(b, 0)
      }
    };
    svgedit.path.clearData = function () {
      t = {}
    }
  }();
window.console || (window.console = {}, window.console.log = function () {}, window.console.dir = function () {});
window.opera && (window.console.log = function (n) {
    opera.postError(n)
  }, window.console.dir = function () {}),
  function () {
    var n = jQuery.fn.attr,
      t = "http://www.w3.org/2000/svg";
    jQuery.fn.attr = function (i, r) {
      var l = this.length,
        e, f, o, s, h, c, u;
      if (!l) return n.apply(this, arguments);
      for (e = 0; e < l; e++)
        if (f = this[e], f.namespaceURI === t)
          if (r !== undefined) f.setAttribute(i, r);
          else {
            if ($.isArray(i)) {
              for (o = i.length, s = {}; o--;) h = i[o], u = f.getAttribute(h), (u || u === "0") && (u = isNaN(u) ? u : +u), s[h] = u;
              return s
            }
            if (typeof i == "object")
              for (c in i) f.setAttribute(c, i[c]);
            else return u = f.getAttribute(i), (u || u === "0") && (u = isNaN(u) ? u : +u), u
          }
      else return n.apply(this, arguments);
      return this
    }
  }();
$.SvgCanvas = function (n, t) {
    function te(n, t) {
      for (var i = svgedit.utilities.getBBox(n), s, o, r, f, e = 0; e < 2; e++)
        if (s = e === 0 ? "fill" : "stroke", o = n.getAttribute(s), o && o.indexOf("url(") === 0 && (r = di(o), r.tagName === "linearGradient")) {
          var h = r.getAttribute("x1") || 0,
            c = r.getAttribute("y1") || 0,
            l = r.getAttribute("x2") || 1,
            a = r.getAttribute("y2") || 0;
          h = i.width * h + i.x;
          c = i.height * c + i.y;
          l = i.width * l + i.x;
          a = i.height * a + i.y;
          var v = st(h, c, t),
            y = st(l, a, t),
            u = {};
          u.x1 = (v.x - i.x) / i.width;
          u.y1 = (v.y - i.y) / i.height;
          u.x2 = (y.x - i.x) / i.width;
          u.y2 = (y.y - i.y) / i.height;
          f = r.cloneNode(!0);
          $(f).attr(u);
          f.id = b();
          ii().appendChild(f);
          n.setAttribute(s, "url(#" + f.id + ")")
        }
    }
    var ft = "http://www.w3.org/2000/svg",
      tu = "http://www.w3.org/1999/xlink",
      iu = "http://svg-edit.googlecode.com",
      af = "http://www.w3.org/1999/xhtml",
      vf = "http://www.w3.org/1998/Math/MathML",
      k = {
        show_outside_canvas: !0,
        selectNew: !0,
        dimensions: [640, 480],
        rhinestone_size: {
          "6": 3.779528,
          "10": 5.291339,
          "16": 7.370079,
          "20": 8.88189
        },
        rhinestone_offset: 1.511811
      },
      e, pu, rr, ai, h, du, c, ar, tr, tf, pr, di, br, ir, gi, sr, hf, wi, ei, pt, gr, nu;
    t && $.extend(k, t);
    var li = k.dimensions,
      u = this,
      bt = n.ownerDocument,
      f = bt.importNode(svgedit.utilities.text2xml('<svg id="svgroot" xmlns="' + ft + '" xlinkns="' + tu + '" width="' + li[0] + '" height="' + li[1] + '" x="' + li[0] + '" y="' + li[1] + '" overflow="visible"><defs><filter id="canvashadow" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/><feOffset in="blur" dx="5" dy="5" result="offsetBlur"/><feMerge><feMergeNode in="offsetBlur"/><feMergeNode in="SourceGraphic"/><\/feMerge><\/filter><\/defs><\/svg>').documentElement, !0);
    n.appendChild(f);
    e = bt.createElementNS(ft, "svg");
    pu = u.clearSvgContentElement = function () {
      while (e.firstChild) e.removeChild(e.firstChild);
      $(e).attr({
        id: "svgcontent",
        width: li[0],
        height: li[1],
        x: li[0],
        y: li[1],
        overflow: k.show_outside_canvas ? "visible" : "hidden",
        xmlns: ft,
        "xmlns:se": iu,
        "xmlns:xlink": tu
      }).appendTo(f);
      var n = bt.createComment(" Created with SVG-edit - http://svg-edit.googlecode.com/ ");
      e.appendChild(n)
    };
    pu();
    rr = "obj_";
    u.setIdPrefix = function (n) {
      rr = n
    };
    u.current_drawing_ = new svgedit.draw.Drawing(e, rr);
    var rt = u.getCurrentDrawing = function () {
        return u.current_drawing_
      },
      r = 1,
      dt = null,
      ur = {
        shape: {
          fill: (k.initFill.color == "none" ? "" : "#") + k.initFill.color,
          fill_paint: null,
          fill_opacity: k.initFill.opacity,
          stroke: "#" + k.initStroke.color,
          stroke_paint: null,
          stroke_opacity: k.initStroke.opacity,
          stroke_width: k.initStroke.width,
          stroke_dasharray: "none",
          stroke_linejoin: "miter",
          stroke_linecap: "butt",
          opacity: k.initOpacity,
          ss: "10"
        }
      };
    ur.text = $.extend(!0, {}, ur.shape);
    $.extend(ur.text, {
      fill: "#000000",
      stroke_width: 0,
      font_size: 24,
      font_family: "serif"
    });
    var s = ur.shape,
      i = new Array(1),
      bi = new Array(1),
      oi = navigator.userAgent.indexOf("Firefox");
    oi >= 0 && (cutEd = navigator.userAgent.length, oi = parseInt(navigator.userAgent.substring(oi + 8, cutEd)));
    var wu = $(n).hasClass("mobile"),
      it = this.addSvgElementFromJson = function (n) {
        var t = svgedit.utilities.getElem(n.attr.id),
          i = rt().getCurrentLayer();
        return t && n.element != t.tagName && (i.removeChild(t), t = null), t || (t = bt.createElementNS(ft, n.element), i && (dt || i).appendChild(t)), n.curStyles && svgedit.utilities.assignAttributes(t, {
          fill: s.fill,
          stroke: s.stroke,
          "stroke-width": s.stroke_width,
          "stroke-dasharray": s.stroke_dasharray,
          "stroke-linejoin": s.stroke_linejoin,
          "stroke-linecap": s.stroke_linecap,
          "stroke-opacity": s.stroke_opacity,
          "fill-opacity": s.fill_opacity,
          opacity: s.opacity / 2,
          style: "pointer-events:inherit"
        }, 100), svgedit.utilities.assignAttributes(t, n.attr, 100), svgedit.utilities.cleanupElement(t), t
      },
      tt = u.getTransformList = svgedit.transformlist.getTransformList,
      st = svgedit.math.transformPoint,
      at = u.matrixMultiply = svgedit.math.matrixMultiply,
      hi = u.hasMatrixTransform = svgedit.math.hasMatrixTransform,
      g = u.transformListToTransform = svgedit.math.transformListToTransform,
      hr = svgedit.math.snapToAngle,
      yf = svgedit.math.snaptoHVLine,
      bu = svgedit.math.getMatrix;
    svgedit.units.init({
      getBaseUnit: function () {
        return k.baseUnit
      },
      getElement: svgedit.utilities.getElem,
      getHeight: function () {
        return e.getAttribute("height") / r
      },
      getWidth: function () {
        return e.getAttribute("width") / r
      },
      getRoundDigits: function () {
        return ki.round_digits
      }
    });
    ai = u.convertToNum = svgedit.units.convertToNum;
    svgedit.utilities.init({
      getDOMDocument: function () {
        return bt
      },
      getDOMContainer: function () {
        return n
      },
      getSVGRoot: function () {
        return f
      },
      getSelectedElements: function () {
        return i
      },
      getSVGContent: function () {
        return e
      }
    });
    var cr = u.getUrlFromAttr = svgedit.utilities.getUrlFromAttr,
      vi = u.getHref = svgedit.utilities.getHref,
      yi = u.setHref = svgedit.utilities.setHref,
      pf = svgedit.utilities.getPathBBox,
      ie = u.getBBox = svgedit.utilities.getBBox,
      gt = u.getRotationAngle = svgedit.utilities.getRotationAngle,
      et = u.getElem = svgedit.utilities.getElem,
      v = u.assignAttributes = svgedit.utilities.assignAttributes,
      ku = this.cleanupElement = svgedit.utilities.cleanupElement,
      fr = svgedit.sanitize.getNSMap(),
      wf = u.sanitizeSvg = svgedit.sanitize.sanitizeSvg,
      fi = svgedit.history.MoveElementCommand,
      ut = svgedit.history.InsertElementCommand,
      wt = svgedit.history.RemoveElementCommand,
      vt = svgedit.history.ChangeElementCommand,
      l = svgedit.history.BatchCommand;
    u.undoMgr = new svgedit.history.UndoManager({
      handleHistoryEvent: function (n, t) {
        var i = svgedit.history.HistoryEventTypes,
          c, f, l, r, s, a, h;
        if (n == i.BEFORE_UNAPPLY || n == i.BEFORE_APPLY) {
          if (n == i.BEFORE_UNAPPLY && dt && t.text && t.text.indexOf("Group Elements|") == 0)
            for (c = t.text.split("|")[1], f = dt; f;) {
              if (f.id == c) {
                u.leaveContext();
                break
              }
              f = f.parentElement
            }
          u.clearSelection()
        } else(n == i.AFTER_APPLY || n == i.AFTER_UNAPPLY) && (l = t.elements(), u.pathActions.clear(), o("changed", l), r = t.type(), s = n == i.AFTER_APPLY, r == fi.type() ? (a = s ? t.newParent : t.oldParent, a == e && u.identifyLayers()) : r == ut.type() || r == wt.type() ? (t.parent == e && u.identifyLayers(), r == ut.type() ? s && ar(t.elem) : s || ar(t.elem), t.elem.tagName === "path" && svgedit.path.removePath_(t.elem.id), t.elem.tagName === "use" && vu(t.elem)) : r == vt.type() && (t.elem.tagName == "title" && t.elem.parentNode.parentNode == e && u.identifyLayers(), h = s ? t.newValues : t.oldValues, h.stdDeviation && u.setBlurOffsets(t.elem.parentNode, h.stdDeviation)))
      }
    });
    h = function (n) {
      u.undoMgr.addCommandToHistory(n)
    };
    du = function (n) {
      u.undoMgr.insertCommandToLastHistory(n)
    };
    svgedit.select.init(k, {
      createSVGElement: function (n) {
        return u.addSvgElementFromJson(n)
      },
      svgRoot: function () {
        return f
      },
      svgContent: function () {
        return e
      },
      currentZoom: function () {
        return r
      },
      getStrokedBBox: function (n) {
        return u.getStrokedBBox([n])
      },
      showSelectedObjInfo: function (n, t, i, u) {
        var f = i / r,
          e = u / r,
          s = n / r,
          h = t / r,
          c;
        f = svgedit.units.convertUnit(f);
        e = svgedit.units.convertUnit(e);
        s = svgedit.units.convertUnit(s);
        h = svgedit.units.convertUnit(h);
        c = {
          x: s,
          y: h,
          width: f,
          height: e
        };
        o("updateStatusPanel", c)
      }
    });
    c = this.selectorManager = svgedit.select.getSelectorManager();
    svgedit.path.init({
      getCurrentZoom: function () {
        return r
      },
      getSVGRoot: function () {
        return f
      }
    });
    svgedit.utilities.snapToGrid = function (n) {
      var t = k.snappingStep,
        i = k.baseUnit;
      return i !== "px" && (t *= svgedit.units.getTypeMap()[i]), Math.round(n / t) * t
    };
    var w = svgedit.utilities.snapToGrid,
      er = {
        exportNoBlur: "Blurred elements will appear as un-blurred",
        exportNoforeignObject: "foreignObject elements will not appear",
        exportNoDashArray: "Strokes will appear filled",
        exportNoText: "Text may not appear as expected"
      },
      gu = "a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use",
      nf = ["clip-path", "fill", "filter", "marker-end", "marker-mid", "marker-start", "mask", "stroke"],
      lr = $.data,
      ru = document.createElementNS(ft, "animate");
    $(ru).attr({
      attributeName: "opacity",
      begin: "indefinite",
      dur: 1,
      fill: "freeze"
    }).appendTo(f);
    ar = function (n) {
        var f = $(n).attr(nf),
          e, t, i, o, r, u, s;
        for (e in f) t = f[e], t && t.indexOf("url(") === 0 && (i = cr(t).substr(1), o = et(i), o || (ii().appendChild(su[i]), delete su[i]));
        if (r = n.getElementsByTagName("*"), r.length)
          for (u = 0, s = r.length; u < s; u++) ar(r[u])
      },
      function () {}();
    var vr = {},
      uu = k.imgPath + "logo.png",
      yr = [],
      ki = {
        round_digits: 5
      },
      ot = !1,
      ct = null,
      d = "select",
      ri = "none",
      or = {},
      ui = ur.text,
      ni = s,
      fu = null,
      ht = null,
      nr = null,
      lt = [],
      eu = {},
      ou = null,
      su = {};
    u.clipBoard = [];
    tr = this.runExtensions = function (n, t, i) {
      var r = !1;
      return i && (r = []), $.each(eu, function (u, f) {
        n in f && (i ? r.push(f[n](t)) : r = f[n](t))
      }), r
    };
    this.addExtension = function (n, t) {
      var i;
      n in eu ? console.log('Cannot add extension "' + n + '", an extension by that name already exists"') : (i = $.isFunction(t) ? t($.extend(u.getPrivateMethods(), {
        svgroot: f,
        svgcontent: e,
        nonce: rt().getNonce(),
        selectorManager: c
      })) : t, eu[n] = i, o("extension_added", i))
    };
    tf = this.round = function (n) {
      return parseInt(n * r) / r
    };
    pr = this.getIntersectionList = function (n) {
      var f, i, e, o, t, u;
      if (ht == null) return null;
      f = dt || rt().getCurrentLayer();
      lt.length || (lt = bf(f));
      i = null;
      try {
        i = f.getIntersectionList(n, null)
      } catch (s) {}
      if (i == null || typeof i.item != "function") {
        if (i = [], n) t = n;
        else {
          t = ht.getBBox();
          e = {};
          for (o in t) e[o] = t[o] / r;
          t = e
        }
        for (u = lt.length; u--;) t.width && t.width && svgedit.math.rectsIntersect(t, lt[u].bbox) && i.push(lt[u].elem)
      }
      return i
    };
    getStrokedBBox = this.getStrokedBBox = function (n) {
      var f, t;
      if (n || (n = wr()), !n.length) return !1;
      if (f = function (n) {
          var t, f, i, e, o, s;
          try {
            if (t = svgedit.utilities.getBBox(n), f = svgedit.utilities.getRotationAngle(n), (f && f % 180 || svgedit.math.hasMatrixTransform(svgedit.transformlist.getTransformList(n))) && (i = !1, e = ["ellipse", "path", "line", "polyline", "polygon"], e.indexOf(n.tagName) >= 0 ? t = i = u.convertToPath(n, !0) : n.tagName == "rect" && (o = n.getAttribute("rx"), s = n.getAttribute("ry"), (o || s) && (t = i = u.convertToPath(n, !0))), !i)) {
              var c = n.cloneNode(!0),
                r = document.createElementNS(ft, "g"),
                h = n.parentNode;
              h.appendChild(r);
              r.appendChild(c);
              t = svgedit.utilities.bboxToObj(r.getBBox());
              h.removeChild(r)
            }
            return t
          } catch (l) {
            return console.log(n, l), null
          }
        }, $.each(n, function () {
          t || this.parentNode && (t = f(this))
        }), t == null) return null;
      var e = t.x + t.width,
        o = t.y + t.height,
        i = t.x,
        r = t.y,
        s = function (n) {
          var t = n.getAttribute("stroke-width"),
            i = 0;
          return n.getAttribute("stroke") == "none" || isNaN(t) || (i += t / 2), i
        },
        h = [];
      return $.each(n, function (n, t) {
        var u = f(t),
          e;
        u && (e = s(t), i = Math.min(i, u.x - e), r = Math.min(r, u.y - e), h.push(u))
      }), $.each(n, function (n, t) {
        var i = h[n],
          r;
        i && t.nodeType == 1 && (r = s(t), e = Math.max(e, i.x + i.width + r), o = Math.max(o, i.y + i.height + r))
      }), {
        x: i,
        y: r,
        width: e - i,
        height: o - r
      }
    };
    var wr = this.getVisibleElements = function (n) {
        n || (n = $(e).children());
        var t = [];
        return $(n).children().each(function (n, i) {
          try {
            i.getBBox() && t.push(i)
          } catch (r) {}
        }), t.reverse()
      },
      bf = this.getVisibleElementsAndBBoxes = function (n) {
        n || (n = $(e).children());
        var t = [];
        return $(n).children().each(function (n, i) {
          try {
            i.id != "data-fotimg" && i.getBBox() && t.push({
              elem: i,
              bbox: getStrokedBBox([i])
            })
          } catch (r) {}
        }), t.reverse()
      },
      rf = this.getVisibleAllPathElementsAndBBoxes = function (n, t) {
        n || (n = $(e).children());
        var i = [];
        return $(n).children().each(function (n, r) {
          var u, f, s, e, o;
          try {
            if (u = t, r.tagName == "path" && r.getBBox() && (f = getStrokedBBox([r]), r.getAttribute("transform") != null && (e = tt(r), u = u ? at(u, g(e).matrix) : g(e).matrix), t && (s = svgedit.math.transformBox(f.x, f.y, f.width, f.height, t), f = s.aabox), i.push({
                elem: r,
                bbox: f,
                matrix: u
              })), r.tagName == "g")
              for (r.getAttribute("transform") != null && (e = tt(r), u = u ? at(u, g(e).matrix) : g(e).matrix), o = rf(r, u), n = 0; n < o.length; n++) i.push(o[n])
          } catch (h) {}
        }), i.reverse()
      },
      uf = this.groupSvgElem = function (n) {
        var t = document.createElementNS(ft, "g");
        n.parentNode.replaceChild(t, n);
        $(t).append(n).data("gsvg", n)[0].id = b()
      },
      pi = function (n) {
        var t = document.createElementNS(n.namespaceURI, n.nodeName),
          f, i, r, e, u;
        for ($.each(n.attributes, function (n, i) {
            i.localName != "-moz-math-font-style" && t.setAttributeNS(i.namespaceURI, i.nodeName.toLowerCase(), i.nodeValue)
          }), t.removeAttribute("id"), t.id = b(), n.nodeName == "path" && (f = p.convertPath(n), t.setAttribute("d", f)), i = 0; i < n.childNodes.length; i++) {
          r = n.childNodes[i];
          switch (r.nodeType) {
            case 1:
              e = pi(r);
              t.appendChild(e);
              break;
            case 3:
              t.tagName == "text" && (t.textContent = r.nodeValue)
          }
        }
        return $(n).data("gsvg") ? $(t).data("gsvg", t.firstChild) : $(n).data("symbol") ? (u = $(n).data("symbol"), $(t).data("ref", u).data("symbol", u)) : t.tagName == "image" && dr(t), t
      },
      si, b, o;
    (function (n) {
      var t = {};
      si = n.getId = function () {
        return rt().getId()
      };
      b = n.getNextId = function () {
        return rt().getNextId()
      };
      o = n.call = function (n, i) {
        if (t[n]) return t[n](this, i)
      };
      n.bind = function (n, i) {
        var r = t[n];
        return t[n] = i, r
      }
    })(u);
    this.prepareSvg = function (n) {
      var r, t, u, i;
      for (this.sanitizeSvg(n.documentElement), r = n.getElementsByTagNameNS(ft, "path"), t = 0, u = r.length; t < u; ++t) i = r[t], i.setAttribute("d", p.convertPath(i)), p.fixEnd(i)
    };
    di = this.getRefElem = function (n) {
      return et(cr(n).substr(1))
    };
    br = function (n) {
      if (!svgedit.browser.isGecko()) return n;
      var t = n.cloneNode(!0);
      return n.parentNode.insertBefore(t, n), n.parentNode.removeChild(n), c.releaseSelector(n), i[0] = t, c.requestSelector(t).showGrips(!0), t
    };
    this.setRotationAngle = function (n, t, r) {
      var p, l, h, a, k, v;
      n = parseFloat(n);
      var u = r ? r : i[0],
        y = u.getAttribute("transform"),
        s = svgedit.utilities.getBBox(u),
        w = s.x + s.width / 2,
        b = s.y + s.height / 2,
        e = tt(u);
      e.numberOfItems > 0 && (p = e.getItem(0), p.type == 4 && e.removeItem(0));
      n != 0 ? (l = st(w, b, g(e).matrix), h = f.createSVGTransform(), h.setRotate(n, l.x, l.y), e.numberOfItems ? e.insertItemBefore(h, 0) : e.appendItem(h)) : e.numberOfItems == 0 && (u.setAttribute("transform", ""), u.removeAttribute("transform"));
      t || (a = u.getAttribute("transform"), a == null && u.setAttribute("transform", "rotate(0)"), y == null ? u.removeAttribute("transform") : u.setAttribute("transform", y), pt("transform", a, i), o("changed", i));
      k = et("pathpointgrip_container");
      v = c.requestSelector(u);
      v.resize();
      v.updateGripCursors(n)
    };
    var hu = this.recalculateAllSelectedDimensions = function () {
        for (var f = ri == "none" ? "position" : "size", r = new l(f), n = i.length, t, u; n--;)(t = i[n], t != null) && (ct = n < bi.length ? bi[n] : null, u = yt(t), bi[n] = t.getAttribute("transform"), u && r.addSubCommand(u));
        r.isEmpty() || (h(r), o("changed", i))
      },
      ff = [0, "z", "M", "m", "L", "l", "C", "c", "Q", "q", "A", "a", "H", "h", "V", "v", "S", "s", "T", "t"],
      kf = function (n) {
        console.log([n.a, n.b, n.c, n.d, n.e, n.f])
      },
      kr = this.remapElement = function (n, t, i) {
        var h = function (n, t) {
            return st(n, t, i)
          },
          p = function (n) {
            return i.a * n
          },
          d = function (n) {
            return i.d * n
          },
          ti = k.gridSnapping && n.parentNode.parentNode.localName === "svg",
          ft = function () {
            if (ti)
              for (var i in t) t[i] = w(t[i]);
            v(n, t, 1e3, !0)
          },
          et, wt, s, bt, kt, dt, gt, rt, ct, lt, y, nt, it, l, ut, vt, yt, o, pt, a, e, u, r, c;
        for (box = svgedit.utilities.getBBox(n), u = 0; u < 2; u++) c = u === 0 ? "fill" : "stroke", et = n.getAttribute(c), et && et.indexOf("url(") === 0 && (i.a < 0 || i.d < 0) && (wt = di(et), s = wt.cloneNode(!0), i.a < 0 && (bt = s.getAttribute("x1"), kt = s.getAttribute("x2"), s.setAttribute("x1", -(bt - 1)), s.setAttribute("x2", -(kt - 1))), i.d < 0 && (dt = s.getAttribute("y1"), gt = s.getAttribute("y2"), s.setAttribute("y1", -(dt - 1)), s.setAttribute("y2", -(gt - 1))), s.id = b(), ii().appendChild(s), n.setAttribute(c, "url(#" + s.id + ")"));
        rt = n.tagName;
        (rt === "g" || rt === "text" || rt === "use") && (i.a == 1 && i.b == 0 && i.c == 0 && i.d == 1 && (i.e != 0 || i.f != 0) ? (ct = g(n).matrix, lt = at(ct.inverse(), i, ct), t.x = parseFloat(t.x) + lt.e, t.y = parseFloat(t.y) + lt.f) : (y = tt(n), nt = f.createSVGTransform(), nt.setMatrix(at(g(y).matrix, i)), y.clear(), y.appendItem(nt)));
        switch (rt) {
          case "foreignObject":
          case "rect":
          case "image":
            rt === "image" && (i.a < 0 || i.d < 0) ? (y = tt(n), nt = f.createSVGTransform(), nt.setMatrix(at(g(y).matrix, i)), y.clear(), y.appendItem(nt)) : (l = h(t.x, t.y), t.width = p(t.width), t.height = d(t.height), t.x = l.x + Math.min(0, t.width), t.y = l.y + Math.min(0, t.height), t.width = Math.abs(t.width), t.height = Math.abs(t.height));
            ft();
            break;
          case "ellipse":
            it = h(t.cx, t.cy);
            t.cx = it.x;
            t.cy = it.y;
            t.rx = p(t.rx);
            t.ry = d(t.ry);
            t.rx = Math.abs(t.rx);
            t.ry = Math.abs(t.ry);
            ft();
            break;
          case "circle":
            it = h(t.cx, t.cy);
            t.cx = it.x;
            t.cy = it.y;
            var ot = svgedit.math.transformBox(box.x, box.y, box.width, box.height, i),
              ri = ot.tr.x - ot.tl.x,
              ui = ot.bl.y - ot.tl.y;
            t.r = Math.min(ri / 2, ui / 2);
            t.r && (t.r = Math.abs(t.r));
            ft();
            break;
          case "line":
            l = h(t.x1, t.y1);
            ut = h(t.x2, t.y2);
            t.x1 = l.x;
            t.y1 = l.y;
            t.x2 = ut.x;
            t.y2 = ut.y;
          case "text":
          case "use":
            ft();
            break;
          case "g":
            vt = $(n).data("gsvg");
            vt && v(vt, t, 1e3, !0);
            break;
          case "polyline":
          case "polygon":
            for (e = t.points.length, u = 0; u < e; ++u) o = t.points[u], o = h(o.x, o.y), t.points[u].x = o.x, t.points[u].y = o.y;
            for (e = t.points.length, yt = "", u = 0; u < e; ++u) o = t.points[u], yt += o.x + "," + o.y + " ";
            n.setAttribute("points", yt);
            break;
          case "path":
            for (pt = n.pathSegList, e = pt.numberOfItems, t.d = new Array(e), u = 0; u < e; ++u) r = pt.getItem(u), t.d[u] = {
              type: r.pathSegType,
              x: r.x,
              y: r.y,
              x1: r.x1,
              y1: r.y1,
              x2: r.x2,
              y2: r.y2,
              r1: r.r1,
              r2: r.r2,
              angle: r.angle,
              largeArcFlag: r.largeArcFlag,
              sweepFlag: r.sweepFlag
            };
            var e = t.d.length,
              ni = t.d[0],
              ht = h(ni.x, ni.y);
            for (t.d[0].x = ht.x, t.d[0].y = ht.y, u = 1; u < e; ++u)
              if (r = t.d[u], c = r.type, c % 2 == 0) {
                var fi = r.x != undefined ? r.x : ht.x,
                  ei = r.y != undefined ? r.y : ht.y,
                  o = h(fi, ei),
                  l = h(r.x1, r.y1),
                  ut = h(r.x2, r.y2);
                r.x = o.x;
                r.y = o.y;
                r.x1 = l.x;
                r.y1 = l.y;
                r.x2 = ut.x;
                r.y2 = ut.y;
                r.r1 = p(r.r1);
                r.r2 = d(r.r2)
              } else r.x = p(r.x), r.y = d(r.y), r.x1 = p(r.x1), r.y1 = d(r.y1), r.x2 = p(r.x2), r.y2 = d(r.y2), r.r1 = p(r.r1), r.r2 = d(r.r2);
            for (a = "", e = t.d.length, u = 0; u < e; ++u) {
              r = t.d[u];
              c = r.type;
              a += ff[c];
              switch (c) {
                case 13:
                case 12:
                  a += r.x + " ";
                  break;
                case 15:
                case 14:
                  a += r.y + " ";
                  break;
                case 3:
                case 5:
                case 19:
                case 2:
                case 4:
                case 18:
                  a += r.x + "," + r.y + " ";
                  break;
                case 7:
                case 6:
                  a += r.x1 + "," + r.y1 + " " + r.x2 + "," + r.y2 + " " + r.x + "," + r.y + " ";
                  break;
                case 9:
                case 8:
                  a += r.x1 + "," + r.y1 + " " + r.x + "," + r.y + " ";
                  break;
                case 11:
                case 10:
                  a += r.r1 + "," + r.r2 + " " + r.angle + " " + +r.largeArcFlag + " " + +r.sweepFlag + " " + r.x + "," + r.y + " ";
                  break;
                case 17:
                case 16:
                  a += r.x2 + "," + r.y2 + " " + r.x + "," + r.y + " "
              }
            }
            n.setAttribute("d", a)
        }
      },
      df = function (n, t, i) {
        var r = di(n).firstChild,
          e = tt(r),
          u = f.createSVGTransform();
        u.setTranslate(t, i);
        e.appendItem(u);
        yt(r)
      },
      yt = this.recalculateDimensions = function (n) {
        var t, h, et, ar, gi, lt, nr, fi, ei, wr, br, fr, pi, wi, or, nu, sr, b, k, e, rt, o, kt, w, pt, a, it, v, r, ki, si, ci, tu, iu, ru, uu, d, ti, ii, s, ri, lr, u, c, i, ui, oi, ut;
        if (n == null) return null;
        if (t = tt(n), t && t.numberOfItems > 0) {
          for (h = t.numberOfItems; h--;) a = t.getItem(h), a.type === 0 ? t.removeItem(h) : a.type === 1 ? svgedit.math.isIdentity(a.matrix) && t.removeItem(h) : a.type === 4 && a.angle === 0 && t.removeItem(h);
          if (t.numberOfItems === 1 && gt(n)) return null
        }
        if (!t || t.numberOfItems == 0) return n.setAttribute("transform", ""), n.removeAttribute("transform"), null;
        if (t) {
          for (h = t.numberOfItems, et = []; h--;) a = t.getItem(h), a.type === 1 ? et.push([a.matrix, h]) : et.length && (et = []);
          et.length === 2 && (ar = f.createSVGTransformFromMatrix(at(et[1][0], et[0][0])), t.removeItem(et[0][1]), t.removeItem(et[1][1]), t.insertItemBefore(ar, et[1][1]));
          h = t.numberOfItems;
          h >= 2 && t.getItem(h - 2).type === 1 && t.getItem(h - 1).type === 2 && (gi = f.createSVGTransform(), i = at(t.getItem(h - 2).matrix, t.getItem(h - 1).matrix), gi.setMatrix(i), t.removeItem(h - 2), t.removeItem(h - 2), t.appendItem(gi))
        }
        switch (n.tagName) {
          case "line":
          case "polyline":
          case "polygon":
          case "path":
          case "circle":
          case "g":
            break;
          case "text":
            if (t.numberOfItems === 2 && t.getItem(0).type === 1 && t.getItem(0).type === 4) return null;
            break;
          default:
            if (t.numberOfItems === 1 && t.getItem(0).type === 1 || t.numberOfItems === 2 && t.getItem(0).type === 1 && t.getItem(0).type === 4) return null
        }
        var li = $(n).data("gsvg"),
          dt = new l("Transform"),
          y = {},
          ot = null,
          ni = [];
        switch (n.tagName) {
          case "line":
            ni = ["x1", "y1", "x2", "y2"];
            break;
          case "circle":
            ni = ["cx", "cy", "r"];
            break;
          case "ellipse":
            ni = ["cx", "cy", "rx", "ry"];
            break;
          case "foreignObject":
          case "rect":
          case "image":
            ni = ["width", "height", "x", "y"];
            break;
          case "use":
          case "text":
            ni = ["x", "y"];
            break;
          case "polygon":
          case "polyline":
            for (ot = {}, ot.points = n.getAttribute("points"), ti = n.points, ii = ti.numberOfItems, y.points = new Array(ii), s = 0; s < ii; ++s) ri = ti.getItem(s), y.points[s] = {
              x: ri.x,
              y: ri.y
            };
            break;
          case "path":
            ot = {};
            ot.d = n.getAttribute("d");
            y.d = n.getAttribute("d")
        }
        if (ni.length ? (y = $(n).attr(ni), $.each(y, function (n, t) {
            y[n] = ai(n, t)
          })) : li && (y = {
            x: $(li).attr("x") || 0,
            y: $(li).attr("y") || 0
          }), ot == null && (ot = $.extend(!0, {}, y), $.each(ot, function (n, t) {
            ot[n] = ai(n, t)
          })), ot.transform = ct ? ct : "", (n.tagName != "g" || li) && n.tagName != "a") {
          if (n.tagName != "circle" && (u = svgedit.utilities.getBBox(n), !u && n.tagName != "path")) return null;
          if (i = f.createSVGMatrix(), w = gt(n), w) {
            n.tagName == "circle" && (u = svgedit.utilities.getBBox(n));
            var nt = {
                x: u.x + u.width / 2,
                y: u.y + u.height / 2
              },
              p = st(u.x + u.width / 2, u.y + u.height / 2, g(t).matrix),
              lt = w * Math.PI / 180;
            for (pt = Math.abs(lt) > 1e-10 ? Math.sin(lt) / (1 - Math.cos(lt)) : 2 / lt, s = 0; s < t.numberOfItems; ++s)
              if (a = t.getItem(s), a.type == 4) {
                it = a.matrix;
                nt.y = (pt * it.e + it.f) / 2;
                nt.x = (it.e - pt * it.f) / 2;
                t.removeItem(s);
                break
              }
          }
          if (v = 0, r = t.numberOfItems, svgedit.browser.isWebkit() || (ki = n.getAttribute("fill"), ki && ki.indexOf("url(") === 0 && (si = di(ki), ci = "pattern", si.tagName !== ci && (ci = "gradient"), tu = si.getAttribute(ci + "Units"), tu === "userSpaceOnUse" && (i = g(t).matrix, iu = tt(si), ru = g(iu).matrix, i = at(i, ru), uu = "matrix(" + [i.a, i.b, i.c, i.d, i.e, i.f].join(",") + ")", si.setAttribute(ci + "Transform", uu)))), r >= 3 && t.getItem(r - 2).type == 3 && t.getItem(r - 3).type == 2 && t.getItem(r - 1).type == 2) v = 3, i = g(t, r - 3, r - 1).matrix, t.removeItem(r - 1), t.removeItem(r - 2), t.removeItem(r - 3);
          else if (r == 4 && t.getItem(r - 1).type == 1) v = 3, i = g(t).matrix, d = f.createSVGTransform(), d.setMatrix(i), t.clear(), t.appendItem(d), i = f.createSVGMatrix();
          else if ((r == 1 || r > 1 && t.getItem(1).type != 3) && t.getItem(0).type == 2) {
            v = 2;
            var ou = t.getItem(0).matrix,
              fu = g(t, 1).matrix,
              su = fu.inverse();
            i = at(su, ou, fu);
            t.removeItem(0)
          } else {
            if (r != 1 || t.getItem(0).type != 1 || w) return v = 4, w && (u = svgedit.utilities.getBBox(n), p = st(u.x + u.width / 2, u.y + u.height / 2, g(t).matrix), c = f.createSVGTransform(), c.setRotate(w, p.x, p.y), t.numberOfItems ? t.insertItemBefore(c, 0) : t.appendItem(c)), t.numberOfItems == 0 && (n.setAttribute("transform", ""), n.removeAttribute("transform")), null;
            i = g(t).matrix;
            switch (n.tagName) {
              case "line":
                y = $(n).attr(["x1", "y1", "x2", "y2"]);
              case "polyline":
              case "polygon":
                if (y.points = n.getAttribute("points"), y.points)
                  for (ti = n.points, ii = ti.numberOfItems, y.points = new Array(ii), s = 0; s < ii; ++s) ri = ti.getItem(s), y.points[s] = {
                    x: ri.x,
                    y: ri.y
                  };
              case "path":
                y.d = n.getAttribute("d");
                v = 1;
                t.clear()
            }
          }
          if (lr = !0, n.tagName == "circle" && n.parentNode.nodeName == "g" && n.parentNode.firstChild && n.parentNode.firstChild.nodeName == "path" && n.parentNode.firstChild.getAttribute("data-rsparamsRun") && (n.setAttribute("data-rscircle", "true"), lr = !1), (v == 1 || v == 2 || v == 3) && lr && kr(n, y, i), v == 2) w && (u = svgedit.utilities.getBBox(n), p = st(u.x + u.width / 2, u.y + u.height / 2, g(t).matrix), c = f.createSVGTransform(), c.setRotate(w, p.x, p.y), t.numberOfItems ? t.insertItemBefore(c, 0) : t.appendItem(c));
          else if (v == 3 && w) {
            i = g(t).matrix;
            ui = f.createSVGTransform();
            ui.setRotate(w, nt.x, nt.y);
            oi = ui.matrix;
            ut = f.createSVGTransform();
            ut.setRotate(w, p.x, p.y);
            var hr = ut.matrix.inverse(),
              cr = i.inverse(),
              bi = at(cr, hr, oi, i);
            kr(n, y, bi);
            w && (t.numberOfItems ? t.insertItemBefore(ut, 0) : t.appendItem(ut))
          }
        } else {
          var u = svgedit.utilities.getBBox(n),
            nt = {
              x: u.x + u.width / 2,
              y: u.y + u.height / 2
            },
            p = st(u.x + u.width / 2, u.y + u.height / 2, g(t).matrix),
            i = f.createSVGMatrix(),
            ht = gt(n);
          if (ht)
            for (lt = ht * Math.PI / 180, pt = Math.abs(lt) > 1e-10 ? Math.sin(lt) / (1 - Math.cos(lt)) : 2 / lt, s = 0; s < t.numberOfItems; ++s)
              if (a = t.getItem(s), a.type == 4) {
                it = a.matrix;
                nt.y = (pt * it.e + it.f) / 2;
                nt.x = (it.e - pt * it.f) / 2;
                t.removeItem(s);
                break
              } var wt = 0,
            bt = 0,
            v = 0,
            r = t.numberOfItems;
          if (r && (nr = t.getItem(0).matrix), r >= 3 && t.getItem(r - 2).type == 3 && t.getItem(r - 3).type == 2 && t.getItem(r - 1).type == 2) {
            v = 3;
            for (var vr = t.getItem(r - 3).matrix, yr = t.getItem(r - 2).matrix, tr = t.getItem(r - 1).matrix, b = n.childNodes, k = b.length; k--;)
              if (e = b.item(k), wt = 0, bt = 0, e.nodeType == 1) {
                if (o = tt(e), !o) continue;
                var i = g(o).matrix,
                  w = gt(e),
                  rt = ct,
                  yi = [];
                if (ct = e.getAttribute("transform"), w || hi(o)) d = f.createSVGTransform(), d.setMatrix(at(vr, yr, tr, i)), o.clear(), o.appendItem(d), yi.push(d);
                else {
                  fi = at(i.inverse(), tr, i);
                  ei = f.createSVGMatrix();
                  ei.e = -fi.e;
                  ei.f = -fi.f;
                  var pr = at(ei.inverse(), i.inverse(), vr, yr, tr, i, fi.inverse()),
                    ir = f.createSVGTransform(),
                    rr = f.createSVGTransform(),
                    ur = f.createSVGTransform();
                  ir.setTranslate(fi.e, fi.f);
                  rr.setScale(pr.a, pr.d);
                  ur.setTranslate(ei.e, ei.f);
                  o.appendItem(ur);
                  o.appendItem(rr);
                  o.appendItem(ir);
                  yi.push(ur);
                  yi.push(rr);
                  yi.push(ir)
                }
                dt.addSubCommand(yt(e));
                ct = rt
              } t.removeItem(r - 1);
            t.removeItem(r - 2);
            t.removeItem(r - 3)
          } else if (r >= 3 && t.getItem(r - 1).type == 1) v = 3, i = g(t).matrix, d = f.createSVGTransform(), d.setMatrix(i), t.clear(), t.appendItem(d);
          else if ((r == 1 || r > 1 && t.getItem(1).type != 3) && t.getItem(0).type == 2) {
            if (v = 2, wr = g(t).matrix, t.removeItem(0), br = g(t).matrix.inverse(), fr = at(br, wr), wt = fr.e, bt = fr.f, wt != 0 || bt != 0) {
              for (var b = n.childNodes, k = b.length, er = []; k--;)
                if (e = b.item(k), e.nodeType == 1 && (e.getAttribute("clip-path") && (pi = e.getAttribute("clip-path"), er.indexOf(pi) === -1 && (df(pi, wt, bt), er.push(pi))), rt = ct, ct = e.getAttribute("transform"), o = tt(e), o)) {
                  kt = f.createSVGTransform();
                  kt.setTranslate(wt, bt);
                  o.numberOfItems ? o.insertItemBefore(kt, 0) : o.appendItem(kt);
                  dt.addSubCommand(yt(e));
                  for (var dr = n.getElementsByTagNameNS(ft, "use"), eu = "#" + e.id, gr = dr.length; gr--;) wi = dr.item(gr), eu == vi(wi) && (or = f.createSVGTransform(), or.setTranslate(-wt, -bt), tt(wi).insertItemBefore(or, 0), dt.addSubCommand(yt(wi)));
                  ct = rt
                } er = [];
              ct = rt
            }
          } else {
            if (r != 1 || t.getItem(0).type != 1 || ht) return ht && (c = f.createSVGTransform(), c.setRotate(ht, p.x, p.y), t.numberOfItems ? t.insertItemBefore(c, 0) : t.appendItem(c)), t.numberOfItems == 0 && (n.setAttribute("transform", ""), n.removeAttribute("transform")), null;
            v = 1;
            for (var i = t.getItem(0).matrix, b = n.childNodes, k = b.length; k--;)
              if (e = b.item(k), e.nodeType == 1) {
                if (rt = ct, ct = e.getAttribute("transform"), o = tt(e), !o) continue;
                nu = at(i, g(o).matrix);
                sr = f.createSVGTransform();
                sr.setMatrix(nu);
                o.clear();
                o.appendItem(sr, 0);
                dt.addSubCommand(yt(e));
                ct = rt
              } t.clear()
          }
          if (v == 2) ht && (p = {
            x: nt.x + nr.e,
            y: nt.y + nr.f
          }, c = f.createSVGTransform(), c.setRotate(ht, p.x, p.y), t.numberOfItems ? t.insertItemBefore(c, 0) : t.appendItem(c));
          else if (v == 3) {
            i = g(t).matrix;
            ui = f.createSVGTransform();
            ui.setRotate(ht, nt.x, nt.y);
            oi = ui.matrix;
            ut = f.createSVGTransform();
            ut.setRotate(ht, p.x, p.y);
            var hr = ut.matrix.inverse(),
              cr = i.inverse(),
              bi = at(cr, hr, oi, i);
            if (wt = bi.e, bt = bi.f, wt != 0 || bt != 0)
              for (b = n.childNodes, k = b.length; k--;) e = b.item(k), e.nodeType == 1 && (rt = ct, ct = e.getAttribute("transform"), o = tt(e), kt = f.createSVGTransform(), kt.setTranslate(wt, bt), o.numberOfItems ? o.insertItemBefore(kt, 0) : o.appendItem(kt), dt.addSubCommand(yt(e)), ct = rt);
            ht && (t.numberOfItems ? t.insertItemBefore(ut, 0) : t.appendItem(ut))
          }
        }
        return t.numberOfItems == 0 && (n.setAttribute("transform", ""), n.removeAttribute("transform")), dt.addSubCommand(new vt(n, ot)), dt
      },
      a = null,
      nt = this.clearSelection = function (n) {
        var u, t, r;
        if (i[0] != null)
          for (u = i.length, t = 0; t < u; ++t) {
            if (r = i[t], r == null) break;
            c.releaseSelector(r);
            i[t] = null
          }
        n || o("selected", i)
      },
      gf = this.chkSelectedElements = function (n, t) {
        var e;
        for (t == null && (t = {
            path: 0,
            circle: 0,
            image: 0,
            text: 0,
            strokeColor: null,
            fillColor: null,
            dashType: null,
            cutType: null,
            stoneSize: null,
            fontType: null,
            letterSpacing: null
          }), n == null && (n = i), e = 0; e < n.length; e++) {
          var r = null,
            f = "def",
            u = n[e];
          if (u == null) break;
          u.nodeName != "g" && u.nodeName != "image" && (r = u.getAttribute("stroke"), r == null && (r = "none"), t.strokeColor == null ? t.strokeColor = r : t.strokeColor != r && (t.strokeColor = f), r = u.getAttribute("fill"), r == null && (r = "none"), t.fillColor == null ? t.fillColor = r : t.fillColor != r && (t.fillColor = f), r = u.getAttribute("fcm-line-type"), r == null && (r = 3), t.cutType == null ? t.cutType = r : t.cutType != r && (t.cutType = f), u.nodeName != "circle" && (r = u.getAttribute("data-fcm-dashtype"), r == null && (r = 0), t.dashType == null ? t.dashType = r : t.dashType != r && (t.dashType = f)));
          u.nodeName == "path" ? t.path = t.path + 1 : u.nodeName == "circle" ? (t.circle++, r = u.getAttribute("ss"), t.stoneSize == null ? t.stoneSize = r : t.stoneSize != r && (t.stoneSize = f)) : u.nodeName == "image" ? t.image++ : u.nodeName == "text" ? (t.text++, r = u.getAttribute("font-family"), t.fontType == null ? t.fontType = r : t.fontType != r && (t.fontType = f), r = u.getAttribute("letter-spacing"), r == null && (r = 0), t.letterSpacing == null ? t.letterSpacing = r : t.letterSpacing != r && (t.letterSpacing = f)) : u.nodeName == "g" && (t = gf(u.childNodes, t))
        }
        return t
      },
      cu = function (n, t) {
        if (n == null) return !1;
        if (n.nodeName == "g" && n.firstChild && n.firstChild.nodeName == "path" && n.firstChild.getAttribute("data-rsparams") != null) return t ? !1 : !0;
        if (n && n.nodeType == 1) {
          if (n.nodeName == "circle") return !0;
          for (var i = n.childNodes.length; i--;)
            if (cu(n.childNodes.item(i), !1)) return !0
        }
        return !1
      },
      lu = this.IsContainsRhinestone = function (n, t) {
        var u, f, r;
        if (n == null) {
          for (u = i.length, f = i.length >= 2 && i[1] != null ? !1 : t, r = 0; r < u; ++r)
            if (cu(i[r], f)) return !0
        } else return cu(n, t);
        return !1
      },
      ef = this.IsContainsOutline = function (n) {
        var u, t, r;
        if (n == null)
          for (u = i.length, t = 0; t < u; t++) {
            if (i[t] == null) break;
            if (ef(i[t])) return !0
          } else if (n && n.nodeType == 1) {
            if (n.nodeName == "path" || n.nodeName == "text" || n.nodeName == "circle") return !0;
            for (r = n.childNodes.length; r--;)
              if (ef(n.childNodes.item(r))) return !0
          } return !1
      },
      ti = this.addToSelection = function (n, t) {
        var u, e, r, h, s, l, f;
        if (n.length != 0) {
          for (u = 0; u < i.length;) {
            if (i[u] == null) break;
            ++u
          }
          for (e = n.length; e--;)(r = n[e], r && svgedit.utilities.getBBox(r)) && (r.tagName === "a" && r.childNodes.length === 1 && (r = r.firstChild), i.indexOf(r) == -1 && (i[u] = r, u++, h = c.requestSelector(r), i[1] != null && h.showGrips(!1)));
          if (o("selected", i), u != 0) {
            for (t || i.length == 1 || i.length > 1 && i[1] == null ? (s = lu(i[0], !0), i[0].tagName === "g" && s ? c.requestSelector(i[0]).showGrips(!0, !0) : c.requestSelector(i[0]).showGrips(!s)) : c.requestSelector(i[0]).showGrips(!1), i.sort(function (n, t) {
                return n && t && n.compareDocumentPosition ? 3 - (t.compareDocumentPosition(n) & 6) : n == null && t == null ? 0 : n == null ? 1 : t == null ? -1 : 0
              }); i[0] == null;) i.shift(0);
            for (l = i.length, f = 0; f < l; f++) i[f] != null && (bi[f] = i[f].getAttribute("transform"))
          }
        }
      },
      ci = this.selectOnly = function (n, t) {
        nt(!0);
        ti(n, t)
      },
      ne = this.removeFromSelection = function (n) {
        var u, r, t, f;
        if (i[0] != null && n.length != 0) {
          for (u = new Array(i.length), j = 0, len = i.length, r = 0; r < len; ++r) t = i[r], t && (n.indexOf(t) == -1 ? (u[j] = t, j++) : c.releaseSelector(t));
          i = u;
          i[0] != null && (i.length == 1 || i.length > 1 && i[1] == null ? (f = lu(i[0], !0), i[0].tagName === "g" && f ? c.requestSelector(i[0]).showGrips(!0, !0) : c.requestSelector(i[0]).showGrips(!f)) : c.requestSelector(i[0]).showGrips(!1));
          o("selected", i)
        }
      };
    this.selectAllInCurrentLayer = function () {
      eventAnalyticsRec("Editor", "selectAllInCurrentLayer");
      var n = rt().getCurrentLayer();
      n && (d = "select", ci($(dt || n).children().filter(function (n, t) {
        return t.id !== "data-fotimg"
      })))
    };
    ir = this.getMouseTarget = function (t) {
        var i, r, u;
        if (t == null) return null;
        if (i = t.target, i.correspondingUseElement && (i = i.correspondingUseElement), [vf, af].indexOf(i.namespaceURI) >= 0 && i.id != "svgcanvas")
          while (i.nodeName != "foreignObject")
            if (i = i.parentNode, !i) return f;
        if (r = rt().getCurrentLayer(), [f, n, e, r].indexOf(i) >= 0) return f;
        if (u = $(i), u.closest("#selectorParentGroup").length) return c.selectorParentGroup;
        while (i.parentNode !== (dt || r)) {
          if (!i.parentNode) return f;
          i = i.parentNode
        }
        return i
      },
      function () {
        var wt = null,
          l = null,
          g = null,
          at = null,
          vt = null,
          pt = null,
          bt = {},
          t = {
            minx: null,
            miny: null,
            maxx: null,
            maxy: null
          },
          ii = !1,
          ft = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            len: 0
          },
          yt = {
            cp_x: 0,
            cp_y: 0,
            len: 0
          };
        n.addEventListener("touchstart", function (n) {
          var i, u, t;
          if (!ii && n.touches.length == 2) {
            i = (n.touches[0].pageX + n.touches[1].pageX) * .5;
            u = (n.touches[0].pageY + n.touches[1].pageY) * .5;
            ft.x1 = n.touches[0].pageX;
            ft.y1 = n.touches[0].pageY;
            ft.x2 = n.touches[1].pageX;
            ft.y2 = n.touches[1].pageY;
            var f = $("#workarea"),
              o = Math.round(f.width() / 2),
              s = Math.round(f.height() / 2);
            a = e.getScreenCTM();
            a = a.inverse();
            t = st(i, u, a);
            yt.cp_x = t.x;
            yt.cp_y = t.y;
            yt.len = ft.len = Math.sqrt(Math.pow(n.touches[0].pageX - n.touches[0].pageX, 2) + Math.pow(n.touches[1].pageY - n.touches[0].pageY, 2));
            yt.prevZoom = r;
            ot = !1;
            d == "multiselect" && (d = "select");
            n.preventDefault();
            ii = !0
          }
        }, !1);
        n.addEventListener("touchmove", function (n) {
          var i, f;
          if (ii && n.touches.length == 2) {
            var e = (n.touches[0].pageX + n.touches[1].pageX) * .5,
              s = (n.touches[0].pageY + n.touches[1].pageY) * .5,
              t = Math.sqrt(Math.pow(n.touches[1].pageX - n.touches[0].pageX, 2) + Math.pow(n.touches[1].pageY - n.touches[0].pageY, 2)),
              u = t / yt.len;
            console.log("zoom:" + r + " -> " + yt.prevZoom * u);
            Math.abs(t - ft.len) < 5 ? (i = $("#workarea")[0], i.scrollLeft -= e - (ft.x1 + ft.x2) * .5, i.scrollTop -= s - (ft.y1 + ft.y2) * .5) : (f = {
              width: 0,
              height: 0,
              x: yt.cp_x,
              y: yt.cp_y,
              zoom: yt.prevZoom * u
            }, o("zoomed", f));
            ft.x1 = n.touches[0].pageX;
            ft.y1 = n.touches[0].pageY;
            ft.x2 = n.touches[1].pageX;
            ft.y2 = n.touches[1].pageY;
            ft.len = t;
            n.preventDefault()
          }
        }, !1);
        n.addEventListener("touchend", function (n) {
          ii = !1;
          n.preventDefault()
        }, !1);
        var fi = {
            x: 0,
            y: 0
          },
          li = function (n, t, i) {
            var y, w, u, b, s, f, l, h, o;
            for (a || (a = e.getScreenCTM(), oi >= 20 && (y = parseFloat(e.getAttribute("x")), w = parseFloat(e.getAttribute("y")), oi >= 23 && (a = a.translate(y, w)), a = a.scale(r)), a = a.inverse()), u = st(n, t, a), b = dt || rt().getCurrentLayer(), lt = rf(b), s = 5 / r, nr == null && (nr = c.getPointSnapBox()), v(nr, {
                display: "none"
              }), f = lt.length; f--;)
              if (lt[f].elem.tagName === "path" && (l = null, lt[f].matrix && (l = lt[f].matrix), lt[f].bbox.x - s <= u.x && u.x <= lt[f].bbox.x + lt[f].bbox.width + s && lt[f].bbox.y - s <= u.y && u.y <= lt[f].bbox.y + lt[f].bbox.height + s))
                for (h = 0; h < lt[f].elem.pathSegList.numberOfItems; h++)
                  if (o = lt[f].elem.pathSegList.getItem(h), l && (o = st(o.x, o.y, l)), o.x - s <= u.x && u.x <= o.x + s && o.y - s <= u.y && u.y <= o.y + s) {
                    if (d == "pathedit") {
                      if (p.closed_subpath && h == 0) continue;
                      if (lt[f].elem == svgedit.path.path.elem && $.inArray(h, svgedit.path.path.selected_pts) >= 0) {
                        i && (fi.x = o.x - u.x, fi.y = o.y - u.y);
                        continue
                      }
                    }
                    v(nr, {
                      x: o.x * r - 5,
                      y: o.y * r - 5,
                      width: 10,
                      height: 10,
                      display: "inline"
                    }, 100);
                    u.x = o.x;
                    u.y = o.y;
                    i || (u.x -= fi.x, u.y -= fi.y);
                    break
                  } return u
          },
          pi = function (n) {
            var ft, bi, ki, et, lt, si, ci, ut, yt, ai, dt, ni, vi, ii, di, rt, pi, fi, ur, wi, fr, gi;
            if (!u.spaceKey && n.button !== 1 && (ft = n.button === 2, !ot || d != "fhpath")) {
              n.altKey && svgCanvas.cloneSelectedElements(0, 0);
              a = e.getScreenCTM();
              oi >= 20 && (bi = parseFloat(e.getAttribute("x")), ki = parseFloat(e.getAttribute("y")), oi >= 23 && (a = a.translate(bi, ki)), a = a.scale(r));
              a = a.inverse();
              var ei = st(n.pageX, n.pageY, a),
                nr = ei.x * r,
                rr = ei.y * r;
              if (n.preventDefault(), ft) {
                if (d === "path") {
                  p.clear(!0);
                  nt(!0);
                  svgCanvas.setMode("select");
                  return
                }
                svgCanvas.setMode("select");
                ou = ei
              }
              var h = nr / r,
                y = rr / r,
                o = ir(n);
              o.tagName === "a" && o.childNodes.length === 1 && (o = o.firstChild);
              et = at = l = h;
              lt = vt = g = y;
              k.gridSnapping && (h = w(h), y = w(y), l = w(l), g = w(g));
              o == c.selectorParentGroup && i[0] != null && (ft || (si = n.target, ci = lr(si, "type"), ci == "rotate" ? d = "rotate" : ci == "resize" && (d = "resize", ri = lr(si, "dir"))), o = i[0]);
              ct = o.getAttribute("transform");
              ut = tt(o);
              switch (d) {
                case "select":
                  if (ot = !0, ri = "none", ft && (ot = !1), o != f) {
                    if (i.indexOf(o) == -1 && (n.shiftKey || nt(!0), ti([o]), fu = o, p.clear()), !ft)
                      for (rt = 0; rt < i.length; ++rt) i[rt] != null && (yt = tt(i[rt]), yt.numberOfItems ? yt.insertItemBefore(f.createSVGTransform(), 0) : yt.appendItem(f.createSVGTransform()))
                  } else ft || (nt(), d = "multiselect", ht == null && (ht = c.getRubberBandBox()), at *= r, vt *= r, v(ht, {
                    x: at,
                    y: vt,
                    width: 0,
                    height: 0,
                    display: "inline"
                  }, 100));
                  break;
                case "zoom":
                  ot = !0;
                  ht == null && (ht = c.getRubberBandBox());
                  v(ht, {
                    x: et * r,
                    y: et * r,
                    width: 0,
                    height: 0,
                    display: "inline"
                  }, 100);
                  break;
                case "resize":
                  if (ot = !0, l = h, g = y, bt = svgedit.utilities.getBBox($("#selectedBox0")[0]), ai = {}, $.each(bt, function (n, t) {
                      ai[n] = t / r
                    }), bt = ai, dt = gt(o) ? 1 : 0, hi(ut)) ut.insertItemBefore(f.createSVGTransform(), dt), ut.insertItemBefore(f.createSVGTransform(), dt), ut.insertItemBefore(f.createSVGTransform(), dt);
                  else if (ut.appendItem(f.createSVGTransform()), ut.appendItem(f.createSVGTransform()), ut.appendItem(f.createSVGTransform()), svgedit.browser.supportsNonScalingStroke())
                    for (ni = svgedit.browser.isWebkit(), ni && (vi = function (n) {
                        var t = n.getAttributeNS(null, "stroke");
                        n.removeAttributeNS(null, "stroke");
                        setTimeout(function () {
                          n.setAttributeNS(null, "stroke", t)
                        }, 0)
                      }), o.style.vectorEffect = "non-scaling-stroke", ni && vi(o), ii = o.getElementsByTagName("*"), di = ii.length, rt = 0; rt < di; rt++) ii[rt].style.vectorEffect = "non-scaling-stroke", ni && vi(ii[rt]);
                  break;
                case "fhellipse":
                case "fhrect":
                case "fhpath":
                  ot = !0;
                  wt = et + "," + lt + " ";
                  fi = s.stroke_width == 0 ? 1 : s.stroke_width;
                  it({
                    element: "polyline",
                    curStyles: !0,
                    attr: {
                      points: wt,
                      id: b(),
                      fill: "none",
                      opacity: s.opacity / 2,
                      "stroke-linecap": "round",
                      style: "pointer-events:none"
                    }
                  });
                  t.minx = et;
                  t.maxx = et;
                  t.miny = lt;
                  t.maxy = lt;
                  break;
                case "image":
                  ot = !0;
                  pi = it({
                    element: "image",
                    attr: {
                      x: h,
                      y: y,
                      width: 0,
                      height: 0,
                      id: b(),
                      opacity: s.opacity / 2,
                      style: "pointer-events:inherit"
                    }
                  });
                  yi(pi, uu);
                  dr(pi);
                  break;
                case "square":
                case "rect":
                  ot = !0;
                  l = h;
                  g = y;
                  it({
                    element: "rect",
                    curStyles: !0,
                    attr: {
                      x: h,
                      y: y,
                      width: 0,
                      height: 0,
                      id: b(),
                      opacity: s.opacity / 2
                    }
                  });
                  break;
                case "line":
                  ot = !0;
                  fi = s.stroke_width == 0 ? 1 : s.stroke_width;
                  it({
                    element: "line",
                    curStyles: !0,
                    attr: {
                      x1: h,
                      y1: y,
                      x2: h,
                      y2: y,
                      id: b(),
                      stroke: s.stroke,
                      "stroke-width": fi,
                      "stroke-dasharray": s.stroke_dasharray,
                      "stroke-linejoin": s.stroke_linejoin,
                      "stroke-linecap": s.stroke_linecap,
                      "stroke-opacity": s.stroke_opacity,
                      fill: "none",
                      opacity: s.opacity / 2,
                      style: "pointer-events:none"
                    }
                  });
                  break;
                case "circle":
                  ot = !0;
                  it({
                    element: "circle",
                    curStyles: !0,
                    attr: {
                      cx: h,
                      cy: y,
                      r: 0,
                      id: b(),
                      opacity: s.opacity / 2
                    }
                  });
                  break;
                case "ellipse":
                  ot = !0;
                  it({
                    element: "ellipse",
                    curStyles: !0,
                    attr: {
                      cx: h,
                      cy: y,
                      rx: 0,
                      ry: 0,
                      id: b(),
                      opacity: s.opacity / 2
                    }
                  });
                  break;
                case "text":
                  ot = !0;
                  ur = it({
                    element: "text",
                    curStyles: !0,
                    attr: {
                      x: h,
                      y: y,
                      id: b(),
                      fill: ui.fill,
                      "stroke-width": ui.stroke_width,
                      "font-size": ui.font_size,
                      "font-family": ui.font_family,
                      "text-anchor": "middle",
                      "xml:space": "preserve",
                      opacity: s.opacity
                    }
                  });
                  break;
                case "path":
                case "pathedit":
                  wi = li(n.pageX, n.pageY, !0);
                  l = wi.x * r;
                  g = wi.y * r;
                  try {
                    fr = svgedit.path.path.elem.pathSegList.numberOfItems
                  } catch (er) {}
                  p.mouseDown(n, o, l, g);
                  ot = !0;
                  break;
                case "textedit":
                  l *= r;
                  g *= r;
                  kt.mouseDown(n, o, l, g);
                  ot = !0;
                  break;
                case "rotate":
                  ot = !0;
                  u.undoMgr.beginUndoableChange("transform", i);
                  break;
                case "rssingle":
                  if (pt) break;
                  setTimeout(function () {
                    pt = !1
                  }, 500);
                  pt = !0;
                  ot = !0;
                  it({
                    element: "circle",
                    curStyles: !0,
                    attr: {
                      cx: h,
                      cy: y,
                      id: b(),
                      r: k.rhinestone_size[s.ss] + k.rhinestone_offset,
                      ss: s.ss,
                      "fcm-line-type": 3,
                      opacity: s.opacity / 2
                    }
                  })
              }
              gi = tr("mouseDown", {
                event: n,
                start_x: l,
                start_y: g,
                selectedElements: i
              }, !0);
              $.each(gi, function (n, t) {
                t && t.started && (ot = !0)
              })
            }
          },
          wi = function (n) {
            var e, s, ar, ui, it, ki, b, h, wr, br, kr, dr, ir, rr, ur, fr, er, ou, ru, oi, or, sr, ft, cu, nt, uu;
            if ((ot || d != "path" || li(n.pageX, n.pageY, !1), ot) && n.button !== 1 && !u.spaceKey) {
              var it = i[0],
                fu = st(n.pageX, n.pageY, a),
                cr = fu.x * r,
                lr = fu.y * r,
                lt = et(si()),
                rt = x = cr / r,
                ut = y = lr / r;
              k.gridSnapping && (x = w(x), y = w(y));
              n.preventDefault();
              switch (d) {
                case "select":
                  if (i[0] !== null && (e = x - l, s = y - g, k.gridSnapping && (e = w(e), s = w(s)), n.shiftKey && (ft = hr(l, g, x, y), x = ft.x, y = ft.y, ar = yf(e, s), e = ar.dx, s = ar.dy), e != 0 || s != 0)) {
                    for (ui = i.length, h = 0; h < ui; ++h) {
                      if (it = i[h], it == null) break;
                      ki = f.createSVGTransform();
                      b = tt(it);
                      ki.setTranslate(e, s);
                      b.numberOfItems ? b.replaceItem(ki, 0) : b.appendItem(ki);
                      c.requestSelector(it).resize()
                    }
                    o("transition", i)
                  }
                  break;
                case "multiselect":
                  rt *= r;
                  ut *= r;
                  v(ht, {
                    x: Math.min(at, rt),
                    y: Math.min(vt, ut),
                    width: Math.abs(rt - at),
                    height: Math.abs(ut - vt)
                  }, 100);
                  var vr = [],
                    yr = [],
                    ci = pr(),
                    ui = i.length;
                  for (h = 0; h < ui; ++h) wr = ci.indexOf(i[h]), wr == -1 ? vr.push(i[h]) : ci[wr] = null;
                  for (ui = ci.length, h = 0; h < ui; ++h) ci[h] && yr.push(ci[h]);
                  vr.length > 0 && u.removeFromSelection(vr);
                  yr.length > 0 && ti(yr);
                  break;
                case "resize":
                  var b = tt(it),
                    eu = hi(b),
                    dt = eu ? bt : svgedit.utilities.getBBox(it),
                    di = dt.x,
                    gi = dt.y,
                    ni = dt.width,
                    ii = dt.height,
                    e = x - l,
                    s = y - g;
                  k.gridSnapping && (e = w(e), s = w(s), ii = w(ii), ni = w(ni));
                  nt = gt(it);
                  nt && (br = Math.sqrt(e * e + s * s), kr = Math.atan2(s, e) - nt * Math.PI / 180, e = br * Math.cos(kr), s = br * Math.sin(kr));
                  ri.indexOf("n") == -1 && ri.indexOf("s") == -1 && (s = 0);
                  ri.indexOf("e") == -1 && ri.indexOf("w") == -1 && (e = 0);
                  var ai = 0,
                    vi = 0,
                    nr = ii ? (ii + s) / ii : 1,
                    yi = ni ? (ni + e) / ni : 1;
                  ri.indexOf("n") >= 0 && (nr = ii ? (ii - s) / ii : 1, vi = ii);
                  ri.indexOf("w") >= 0 && (yi = ni ? (ni - e) / ni : 1, ai = ni);
                  dr = !1;
                  (ri === "nw" || ri === "ne" || ri === "se" || ri === "sw") && (dr = !0);
                  var gr = f.createSVGTransform(),
                    nu = f.createSVGTransform(),
                    tu = f.createSVGTransform();
                  k.gridSnapping && (di = w(di), ai = w(ai), gi = w(gi), vi = w(vi));
                  gr.setTranslate(-(di + ai), -(gi + vi));
                  (dr || n.shiftKey) && (yi == 1 ? yi = nr : nr = yi);
                  nu.setScale(yi, nr);
                  tu.setTranslate(di + ai, gi + vi);
                  eu ? (ir = nt ? 1 : 0, b.replaceItem(gr, 2 + ir), b.replaceItem(nu, 1 + ir), b.replaceItem(tu, 0 + ir)) : (rr = b.numberOfItems, b.replaceItem(tu, rr - 3), b.replaceItem(nu, rr - 2), b.replaceItem(gr, rr - 1));
                  c.requestSelector(it).resize();
                  o("transition", i);
                  break;
                case "zoom":
                  rt *= r;
                  ut *= r;
                  v(ht, {
                    x: Math.min(at * r, rt),
                    y: Math.min(vt * r, ut),
                    width: Math.abs(rt - at * r),
                    height: Math.abs(ut - vt * r)
                  }, 100);
                  break;
                case "text":
                  v(lt, {
                    x: x,
                    y: y
                  }, 1e3);
                  break;
                case "line":
                  ur = null;
                  window.opera || f.suspendRedraw(1e3);
                  k.gridSnapping && (x = w(x), y = w(y));
                  fr = x;
                  er = y;
                  n.shiftKey && (ft = hr(l, g, fr, er), fr = ft.x, er = ft.y);
                  lt.setAttributeNS(null, "x2", fr);
                  lt.setAttributeNS(null, "y2", er);
                  window.opera || f.unsuspendRedraw(ur);
                  break;
                case "foreignObject":
                case "square":
                case "rect":
                case "image":
                  var hu = d == "square" || n.shiftKey,
                    fi = Math.abs(x - l),
                    ei = Math.abs(y - g),
                    pi, wi;
                  hu ? (fi = ei = Math.max(fi, ei), pi = l < x ? l : l - fi, wi = g < y ? g : g - ei) : (pi = Math.min(l, x), wi = Math.min(g, y));
                  k.gridSnapping && (fi = w(fi), ei = w(ei), pi = w(pi), wi = w(wi));
                  v(lt, {
                    width: fi,
                    height: ei,
                    x: pi,
                    y: wi
                  }, 1e3);
                  break;
                case "circle":
                  var bi = $(lt).attr(["cx", "cy"]),
                    ct = bi.cx,
                    yt = bi.cy,
                    iu = Math.sqrt((x - ct) * (x - ct) + (y - yt) * (y - yt));
                  k.gridSnapping && (iu = w(iu));
                  lt.setAttributeNS(null, "r", iu);
                  break;
                case "ellipse":
                  var bi = $(lt).attr(["cx", "cy"]),
                    ct = bi.cx,
                    yt = bi.cy;
                  ur = null;
                  window.opera || f.suspendRedraw(1e3);
                  k.gridSnapping && (x = w(x), ct = w(ct), y = w(y), yt = w(yt));
                  lt.setAttributeNS(null, "rx", Math.abs(x - ct));
                  ou = Math.abs(n.shiftKey ? x - ct : y - yt);
                  lt.setAttributeNS(null, "ry", ou);
                  window.opera || f.unsuspendRedraw(ur);
                  break;
                case "fhellipse":
                case "fhrect":
                  t.minx = Math.min(rt, t.minx);
                  t.maxx = Math.max(rt, t.maxx);
                  t.miny = Math.min(ut, t.miny);
                  t.maxy = Math.max(ut, t.maxy);
                case "fhpath":
                  wt += +rt + "," + ut + " ";
                  lt.setAttributeNS(null, "points", wt);
                  break;
                case "path":
                case "pathedit":
                  ru = li(n.pageX, n.pageY, !1);
                  x = ru.x * r;
                  y = ru.y * r;
                  k.gridSnapping && (x = w(x), y = w(y), l = w(l), g = w(g));
                  n.shiftKey && (oi = svgedit.path.path, oi ? (or = oi.dragging ? oi.dragging[0] : l, sr = oi.dragging ? oi.dragging[1] : g) : (or = l, sr = g), ft = hr(or, sr, x, y), x = ft.x, y = ft.y);
                  ht && ht.getAttribute("display") !== "none" && (rt *= r, ut *= r, v(ht, {
                    x: Math.min(at * r, rt),
                    y: Math.min(vt * r, ut),
                    width: Math.abs(rt - at * r),
                    height: Math.abs(ut - vt * r)
                  }, 100));
                  try {
                    cu = svgedit.path.path.elem.pathSegList.numberOfItems
                  } catch (au) {}
                  p.mouseMove(x, y);
                  break;
                case "textedit":
                  x *= r;
                  y *= r;
                  kt.mouseMove(cr, lr);
                  break;
                case "rotate":
                  var dt = svgedit.utilities.getBBox(it),
                    ct = dt.x + dt.width / 2,
                    yt = dt.y + dt.height / 2,
                    lu = bu(it),
                    su = st(ct, yt, lu);
                  ct = su.x;
                  yt = su.y;
                  nt = (Math.atan2(yt - y, ct - x) * (180 / Math.PI) - 90) % 360;
                  k.gridSnapping && (nt = w(nt));
                  n.shiftKey && (uu = 45, nt = Math.round(nt / uu) * uu);
                  u.setRotationAngle(nt < -180 ? 360 + nt : nt, !0);
                  o("transition", i);
                  break;
                case "rssingle":
                  clearTimeout(pt);
                  pt = null
              }
              tr("mouseMove", {
                event: n,
                mouse_x: cr,
                mouse_y: lr,
                selected: it
              })
            }
          },
          ei = !1,
          ai = function (n) {
            var ri, oi, l, e, hi, g, yt, li, nt, gt, w, ti, wi, ii, ai, b, pt, wt;
            if ((nr && v(nr, {
                display: "none"
              }), n.button !== 2) && (ri = fu, fu = null, ot)) {
              if (wu) {
                if (ei) {
                  vi(n);
                  ei = !1;
                  return
                }
                ei = !0;
                setTimeout(function () {
                  ei = !1
                }, 270)
              }
              var fi = st(n.pageX, n.pageY, a),
                tt = fi.x * r,
                ft = fi.y * r,
                yi = tt / r,
                pi = ft / r,
                f = et(si()),
                y = !1,
                bt = yi,
                dt = pi;
              ot = !1;
              switch (d) {
                case "resize":
                  i[0].firstChild && i[0].firstChild.nodeName == "path" && (oi = i[0].firstChild.getAttribute("data-rsparams"), oi && i[0].firstChild.setAttribute("data-rsparamsRun", "true"));
                case "multiselect":
                  ht != null && (ht.setAttribute("display", "none"), lt = []);
                  d = "select";
                case "select":
                  if (i[0] != null) {
                    if (i.length == 1 || i.length > 1 && i[1] == null) {
                      l = i[0];
                      switch (l.tagName) {
                        case "g":
                        case "use":
                        case "image":
                        case "foreignObject":
                          break;
                        default:
                          e = l.getAttribute("fill");
                          e != null && e != "" && (ni.fill = e);
                          e = l.getAttribute("fill-opacity");
                          e != null && e != "" && (ni.fill_opacity = e);
                          e = l.getAttribute("stroke");
                          e != null && e != "" && (ni.stroke = e);
                          e = l.getAttribute("stroke-opacity");
                          e != null && e != "" && (ni.stroke_opacity = e);
                          e = l.getAttribute("stroke-width");
                          e != null && e != "" && (ni.stroke_width = e);
                          e = l.getAttribute("stroke-dasharray");
                          e != null && e != "" && (ni.stroke_dasharray = e);
                          e = l.getAttribute("stroke-linejoin");
                          e != null && e != "" && (ni.stroke_linejoin = e);
                          e = l.getAttribute("stroke-linecap");
                          e != null && e != "" && (ni.stroke_linecap = e)
                      }
                      l.tagName == "text" && (ui.font_size = l.getAttribute("font-size"), ui.font_family = l.getAttribute("font-family"));
                      lu(l, !0) ? l.tagName === "g" ? c.requestSelector(l).showGrips(!0, !0) : c.requestSelector(l).showGrips(!1) : c.requestSelector(l).showGrips(!0)
                    }
                    if (hu(), bt != at || dt != vt)
                      for (hi = i.length, g = 0; g < hi; ++g) {
                        if (i[g] == null) break;
                        i[g].firstChild || c.requestSelector(i[g]).resize()
                      } else b = ir(n), n.shiftKey ? ri != b && u.removeFromSelection([b]) : i[0].nodeName === "path" && i[1] == null && p.select(i[0]);
                    svgedit.browser.supportsNonScalingStroke() && (yt = i[0], yt && (yt.removeAttribute("style"), svgedit.utilities.walkTree(yt, function (n) {
                      n.removeAttribute("style")
                    })))
                  }
                  return;
                case "zoom":
                  ht != null && ht.setAttribute("display", "none");
                  li = n.shiftKey ? .5 : 2;
                  o("zoomed", {
                    x: Math.min(at, bt),
                    y: Math.min(vt, dt),
                    width: Math.abs(bt - at),
                    height: Math.abs(dt - vt),
                    factor: li
                  });
                  return;
                case "fhpath":
                  nt = f.getAttribute("points");
                  gt = nt.indexOf(",");
                  y = gt >= 0 ? nt.indexOf(",", gt + 1) >= 0 : nt.indexOf(" ", nt.indexOf(" ") + 1) >= 0;
                  y && (f = p.smoothPolylineIntoPath(f));
                  break;
                case "line":
                  w = $(f).attr(["x1", "x2", "y1", "y2"]);
                  y = w.x1 != w.x2 || w.y1 != w.y2;
                  break;
                case "foreignObject":
                case "square":
                case "rect":
                case "image":
                  w = $(f).attr(["width", "height"]);
                  y = w.width != 0 || w.height != 0 || d === "image";
                  break;
                case "circle":
                  y = f.getAttribute("r") != 0;
                  break;
                case "ellipse":
                  w = $(f).attr(["rx", "ry"]);
                  y = w.rx != null || w.ry != null;
                  break;
                case "fhellipse":
                  t.maxx - t.minx > 0 && t.maxy - t.miny > 0 && (f = it({
                    element: "ellipse",
                    curStyles: !0,
                    attr: {
                      cx: (t.minx + t.maxx) / 2,
                      cy: (t.miny + t.maxy) / 2,
                      rx: (t.maxx - t.minx) / 2,
                      ry: (t.maxy - t.miny) / 2,
                      id: si()
                    }
                  }), o("changed", [f]), y = !0);
                  break;
                case "fhrect":
                  t.maxx - t.minx > 0 && t.maxy - t.miny > 0 && (f = it({
                    element: "rect",
                    curStyles: !0,
                    attr: {
                      x: t.minx,
                      y: t.miny,
                      width: t.maxx - t.minx,
                      height: t.maxy - t.miny,
                      id: si()
                    }
                  }), o("changed", [f]), y = !0);
                  break;
                case "text":
                  y = !0;
                  ci([f]);
                  kt.start(f);
                  break;
                case "path":
                  f = null;
                  ot = !0;
                  ti = p.mouseUp(n, f, tt, ft);
                  f = ti.element;
                  y = ti.keep;
                  break;
                case "pathedit":
                  y = !0;
                  f = null;
                  try {
                    wi = svgedit.path.path.elem.pathSegList.numberOfItems
                  } catch (bi) {}
                  p.mouseUp(n);
                  break;
                case "textedit":
                  y = !1;
                  f = null;
                  kt.mouseUp(n, tt, ft);
                  break;
                case "rotate":
                  y = !0;
                  f = null;
                  d = "select";
                  ii = u.undoMgr.finishUndoableChange();
                  ii.isEmpty() || h(ii);
                  hu();
                  o("changed", i);
                  break;
                case "rssingle":
                  y = f.getAttribute("r") != 0
              }
              if (ai = tr("mouseUp", {
                  event: n,
                  mouse_x: tt,
                  mouse_y: ft
                }, !0), $.each(ai, function (n, t) {
                  t && (y = t.keep || y, f = t.element, ot = t.started || ot)
                }), y || f == null) {
                if (f != null) {
                  if (u.addedNew = !0, !1 && svgedit.units.convertAttrs(f), pt = .2, ru.beginElement && f.getAttribute("opacity") != s.opacity) {
                    wt = $(ru).clone().attr({
                      to: s.opacity,
                      dur: pt
                    }).appendTo(f);
                    try {
                      wt[0].beginElement()
                    } catch (bi) {}
                  } else pt = 0;
                  setTimeout(function () {
                    wt && wt.remove();
                    f.setAttribute("opacity", s.opacity);
                    f.setAttribute("style", "pointer-events:inherit");
                    ku(f);
                    d === "path" ? (p.toEditMode(f), p.toSelectMode(f)) : k.selectNew && ci([f], !0);
                    h(new ut(f));
                    o("changed", [f])
                  }, pt * 1e3)
                }
              } else {
                for (rt().releaseId(si()), f.parentNode.removeChild(f), f = null, b = n.target; b.parentNode.parentNode.tagName == "g";) b = b.parentNode;
                d == "path" && drawn_path || b.parentNode.id == "selectorParentGroup" || b.id == "svgcanvas" || b.id == "svgroot" || (u.setMode("select"), ci([b], !0))
              }
              ct = null
            }
          },
          vi = function (n) {
            var o = n.target,
              r = o.parentNode,
              t, i, e;
            n.shiftKey || n.altKey || r !== dt && ((t = ir(n), i = t.tagName, i === "g" && t.firstChild && t.firstChild.nodeName === "path" && t.firstChild.getAttribute("data-rsparams")) || (i === "text" && d !== "textedit" && (wu ? $("#dlgedittext").dialog("open") : (nt(!0), ti([t], !0), e = st(n.pageX, n.pageY, a), kt.select(t, e.x, e.y))), (i === "g" || i === "a") && gt(t) && (t = u.regroupElement(t), nt(!0)), dt && sr(), (r.tagName === "g" || r.tagName === "a") && r !== rt().getCurrentLayer() && t !== c.selectorParentGroup && t !== f) && hf(t))
          },
          bi = function (n) {
            return n.preventDefault(), !1
          };
        $(n).mousedown(pi).mousemove(wi).click(bi).dblclick(vi).mouseup(ai);
        $(window).mouseup(ai);
        $(n).bind("mousewheel DOMMouseScroll", function (n) {
          var u, f, i, t;
          n.shiftKey && (n.preventDefault(), a = e.getScreenCTM(), oi >= 20 && (u = parseFloat(e.getAttribute("x")), f = parseFloat(e.getAttribute("y")), oi >= 23 && (a = a.translate(u, f)), a = a.scale(r)), a = a.inverse(), i = st(n.pageX, n.pageY, a), t = {
            x: i.x,
            y: i.y,
            width: 0,
            height: 0
          }, n.wheelDelta ? n.wheelDelta >= 120 ? t.factor = 2 : n.wheelDelta <= -120 && (t.factor = .5) : n.detail && (n.detail > 0 ? t.factor = .5 : n.detail < 0 && (t.factor = 2)), t.factor) && o("zoomed", t)
        })
      }();
    var dr = function (n) {
        $(n).click(function (n) {
          n.preventDefault()
        })
      },
      kt = u.textActions = function () {
        function k(n) {
          var f = t.value === "",
            i, r, u;
          if ($(t).focus(), !arguments.length)
            if (f) n = 0;
            else {
              if (t.selectionEnd !== t.selectionStart) return;
              n = t.selectionEnd
            }(n >= s.length && (n = s.length - 1), n < 0) || (i = s[n], f || t.setSelectionRange(n, n), e = et("text_cursor"), e || (e = document.createElementNS(ft, "line"), v(e, {
              id: "text_cursor",
              stroke: "#333",
              "stroke-width": 1
            }), e = et("selectorParentGroup").appendChild(e)), b || (b = setInterval(function () {
              var n = e.getAttribute("display") === "none";
              e.setAttribute("display", n ? "inline" : "none")
            }, 600)), r = y(i.x, h.y), u = y(i.x, h.y + h.height), v(e, {
              x1: r.x,
              y1: r.y,
              x2: u.x,
              y2: u.y,
              visibility: "visible",
              display: "inline"
            }), l && l.setAttribute("d", "M0,0 10,10"))
        }

        function g(n, i, r) {
          var u, f;
          if (n === i) {
            k(i);
            return
          }
          r || t.setSelectionRange(n, i);
          l = et("text_selectblock");
          l || (l = document.createElementNS(ft, "path"), v(l, {
            id: "text_selectblock",
            fill: "green",
            opacity: .5,
            style: "pointer-events:none"
          }), et("selectorParentGroup").appendChild(l));
          u = s[n];
          f = s[i];
          e.setAttribute("visibility", "hidden");
          var o = y(u.x, h.y),
            c = y(u.x + (f.x - u.x), h.y),
            a = y(u.x, h.y + h.height),
            p = y(u.x + (f.x - u.x), h.y + h.height),
            w = "M" + o.x + "," + o.y + " L" + c.x + "," + c.y + " " + p.x + "," + p.y + " " + a.x + "," + a.y + "z";
          v(l, {
            d: w,
            display: "inline"
          })
        }

        function ut(t, i) {
          var u = f.createSVGPoint(),
            r, e, o;
          return (u.x = t, u.y = i, s.length == 1) ? 0 : (r = n.getCharNumAtPosition(u), r < 0 ? (r = s.length - 2, t <= s[0].x && (r = 0)) : r >= s.length - 2 && (r = s.length - 2), e = s[r], o = e.x + e.width / 2, t > o && r++, r)
        }

        function ot(n, t) {
          k(ut(n, t))
        }

        function ht(n, i, r) {
          var u = t.selectionStart,
            f = ut(n, i),
            e = Math.min(u, f),
            o = Math.max(u, f);
          g(e, o, !r)
        }

        function w(n, t) {
          var i = {
              x: n,
              y: t
            },
            u;
          return i.x /= r, i.y /= r, p && (u = st(i.x, i.y, p.inverse()), i.x = u.x, i.y = u.y), i
        }

        function y(n, t) {
          var i = {
              x: n,
              y: t
            },
            u;
          return p && (u = st(i.x, i.y, p), i.x = u.x, i.y = u.y), i.x *= r, i.y *= r, i
        }

        function ct(t) {
          g(0, n.textContent.length);
          $(this).unbind(t)
        }

        function lt(t) {
          if (rt && n) {
            var u = st(t.pageX, t.pageY, a),
              s = u.x * r,
              h = u.y * r,
              f = w(s, h),
              i = ut(f.x, f.y),
              e = n.textContent,
              c = e.substr(0, i).replace(/[a-z0-9]+$/i, "").length,
              o = e.substr(i).match(/^[a-z0-9]+/i),
              l = (o ? o[0].length : 0) + i;
            g(c, l);
            $(t.target).click(ct);
            setTimeout(function () {
              $(t.target).unbind("click", ct)
            }, 300)
          }
        }
        var n, t, e, l, b, s = [],
          h, p, tt, it, rt;
        return {
          select: function (t, i, r) {
            n = t;
            kt.toEditMode(i, r)
          },
          start: function (t) {
            n = t;
            kt.toEditMode()
          },
          mouseDown: function (n, i, r, u) {
            var f = w(r, u);
            t.focus();
            ot(f.x, f.y);
            tt = r;
            it = u
          },
          mouseMove: function (n, t) {
            var i = w(n, t);
            ht(i.x, i.y)
          },
          mouseUp: function (t, i, r) {
            var u = w(i, r);
            ht(u.x, u.y, !0);
            t.target !== n && i < tt + 2 && i > tt - 2 && r < it + 2 && r > it - 2 && kt.toSelectMode(!0)
          },
          setCursor: k,
          toEditMode: function (t, i) {
            var u, r;
            rt = !1;
            d = "textedit";
            c.requestSelector(n).showGrips(!1);
            u = c.requestSelector(n).selectorRect;
            kt.init();
            $(n).css("cursor", "text");
            arguments.length ? (r = w(t, i), ot(r.x, r.y)) : k();
            setTimeout(function () {
              rt = !0
            }, 300)
          },
          toSelectMode: function (i) {
            d = "select";
            clearInterval(b);
            b = null;
            l && $(l).attr("display", "none");
            e && $(e).attr("visibility", "hidden");
            $(n).css("cursor", "move");
            n && i && (nt(), $(n).css("cursor", "move"), o("selected", [n]), ti([n], !0));
            n && !n.textContent.length && (u.undoMgr.undo(), ti([n], !1), u.deleteSelectedElements(), n = !1);
            $(t).blur();
            n = !1
          },
          setInputElem: function (n) {
            t = n
          },
          clear: function () {
            d == "textedit" && kt.toSelectMode()
          },
          init: function () {
            var e, o, f, a;
            if (n) {
              n.parentNode || (n = i[0], c.requestSelector(n).showGrips(!1));
              var v = n.textContent,
                l = v.length,
                y = n.getAttribute("transform");
              for (h = svgedit.utilities.getBBox(n), p = y ? bu(n) : null, s = Array(l), t.focus(), $(n).unbind("dblclick", lt).dblclick(lt), l || (f = {
                  x: h.x + h.width / 2,
                  width: 0
                }), e = 0; e < l; e++) o = n.getStartPositionOfChar(e), f = n.getEndPositionOfChar(e), svgedit.browser.supportsGoodTextCharPos() || (a = u.contentW * r, o.x -= a, f.x -= a, o.x /= r, f.x /= r), s[e] = {
                x: o.x,
                y: h.y,
                width: f.x - o.x,
                height: h.height
              };
              s.push({
                x: f.x,
                width: 0
              });
              g(t.selectionStart, t.selectionEnd, !0)
            }
          }
        }
      }(),
      p = u.pathActions = function () {
        function ut(n) {
          n.setAttribute("d", p.convertPath(n))
        }
        var e = !1,
          a, y, f;
        svgedit.path.Path.prototype.endChanges = function (n) {
          svgedit.browser.isWebkit() && ut(this.elem);
          var t = new vt(this.elem, {
            d: this.last_d
          }, n);
          h(t);
          o("changed", [this.elem])
        };
        svgedit.path.Path.prototype.addPtsToSelection = function (n) {
          var r, t, u, f, i;
          for ($.isArray(n) || (n = [n]), t = 0; t < n.length; t++) r = n[t], i = this.segs[r], i.ptgrip && this.selected_pts.indexOf(r) == -1 && r >= 0 && this.selected_pts.push(r);
          for (this.selected_pts.sort(), t = this.selected_pts.length, u = new Array(t); t--;) f = this.selected_pts[t], i = this.segs[f], i.select(!0), u[t] = i.ptgrip;
          p.canDeleteNodes = !0;
          p.closed_subpath = this.subpathIsClosed(this.selected_pts[0]);
          o("selected", u)
        };
        var a = null,
          t = null,
          rt = !1,
          ct = function (n) {
            var r = n.points,
              s = r.numberOfItems,
              i, u, o, a;
            if (s >= 4) {
              var f = r.getItem(0),
                h = null,
                t = [];
              for (t.push(["M", f.x, ",", f.y, " C"].join("")), i = 1; i <= s - 4; i += 3) {
                var e = r.getItem(i),
                  c = r.getItem(i + 1),
                  l = r.getItem(i + 2);
                h && (u = svgedit.path.smoothControlPoints(h, e, f), u && u.length == 2 && (o = t[t.length - 1].split(","), o[2] = u[0].x, o[3] = u[0].y, t[t.length - 1] = o.join(","), e = u[1]));
                t.push([e.x, e.y, c.x, c.y, l.x, l.y].join(","));
                f = l;
                h = c
              }
              for (t.push("L"); i < s; ++i) a = r.getItem(i), t.push([a.x, a.y].join(","));
              t = t.join(" ");
              n = it({
                element: "path",
                curStyles: !0,
                attr: {
                  id: si(),
                  d: t,
                  fill: "none"
                }
              })
            }
            return n
          };
        return {
          mouseDown: function (i, u, f, o) {
            var oi, ct, vt, ti, ii, ri, wt, g, rt, st, nt, ut, bt;
            if (d === "path") {
              mouse_x = f;
              mouse_y = o;
              var h = mouse_x / r,
                l = mouse_y / r,
                a = et("path_stretch_line");
              if (y = [h, l], k.gridSnapping && (h = w(h), l = w(l), mouse_x = w(mouse_x), mouse_y = w(mouse_y)), a || (a = document.createElementNS(ft, "path"), v(a, {
                  id: "path_stretch_line",
                  stroke: "#22C",
                  "stroke-width": "0.5",
                  fill: "none"
                }), a = et("selectorParentGroup").appendChild(a)), a.setAttribute("display", "inline"), oi = null, t) {
                for (var tt = t.pathSegList, lt = tt.numberOfItems, at = 6 / r, kt = !1; lt;) {
                  lt--;
                  var dt = tt.getItem(lt),
                    gt = dt.x,
                    ni = dt.y;
                  if (h >= gt - at && h <= gt + at && l >= ni - at && l <= ni + at) {
                    kt = !0;
                    break
                  }
                }
                if (nt = si(), svgedit.path.removePath_(nt), ct = et(nt), vt = tt.numberOfItems, kt) {
                  if (lt == 0 && vt >= 2) {
                    var yt = tt.getItem(0).x,
                      pt = tt.getItem(0).y,
                      g = a.pathSegList.getItem(1);
                    rt = g.pathSegType === 4 ? t.createSVGPathSegLinetoAbs(yt, pt) : t.createSVGPathSegCurvetoCubicAbs(yt, pt, g.x1 / r, g.y1 / r, yt, pt);
                    ti = t.createSVGPathSegClosePath();
                    tt.appendItem(rt);
                    tt.appendItem(ti)
                  } else if (vt < 2) return !1;
                  if ($(a).remove(), element = ct, t = null, ot = !1, e) return svgedit.path.path.matrix && kr(ct, {}, svgedit.path.path.matrix.inverse()), ii = ct.getAttribute("d"), ri = $(svgedit.path.path.elem).attr("d"), $(svgedit.path.path.elem).attr("d", ri + ii), $(ct).remove(), svgedit.path.path.matrix && svgedit.path.recalcRotatedPath(), svgedit.path.path.init(), p.toEditMode(svgedit.path.path.elem), svgedit.path.path.selectPt(), !1
                } else {
                  if (!$.contains(n, ir(i))) return console.log("Clicked outside canvas"), !1;
                  var ui = t.pathSegList.numberOfItems,
                    fi = t.pathSegList.getItem(ui - 1),
                    hi = fi.x,
                    ci = fi.y;
                  i.shiftKey && (wt = hr(hi, ci, h, l), h = wt.x, l = wt.y);
                  g = a.pathSegList.getItem(1);
                  rt = g.pathSegType === 4 ? t.createSVGPathSegLinetoAbs(h, l) : t.createSVGPathSegCurvetoCubicAbs(h, l, g.x1 / r, g.y1 / r, g.x2 / r, g.y2 / r);
                  t.pathSegList.appendItem(rt);
                  h *= r;
                  l *= r;
                  a.setAttribute("d", ["M", h, l, h, l].join(" "));
                  st = ui;
                  e && (st += svgedit.path.path.segs.length);
                  svgedit.path.addPointGrip(st, h, l)
                }
              } else d_attr = "M" + h + "," + l + " ", t = it({
                element: "path",
                curStyles: !0,
                attr: {
                  d: d_attr,
                  id: b(),
                  opacity: s.opacity / 2
                }
              }), a.setAttribute("d", ["M", mouse_x, mouse_y, mouse_x, mouse_y].join(" ")), st = e ? svgedit.path.path.segs.length : 0, svgedit.path.addPointGrip(st, mouse_x, mouse_y);
              return
            }
            if (svgedit.path.path) {
              if (svgedit.path.path.storeD(), nt = i.target.id, nt.substr(0, 14) == "pathpointgrip_") ut = svgedit.path.path.cur_pt = parseInt(nt.substr(14)), svgedit.path.path.dragging = [f, o], bt = svgedit.path.path.segs[ut], i.shiftKey ? bt.selected ? svgedit.path.path.removePtFromSelection(ut) : svgedit.path.path.addPtsToSelection(ut) : ((svgedit.path.path.selected_pts.length <= 1 || !bt.selected) && svgedit.path.path.clearSelection(), svgedit.path.path.addPtsToSelection(ut));
              else if (nt.indexOf("ctrlpointgrip_") == 0) {
                svgedit.path.path.dragging = [f, o];
                var ei = nt.split("_")[1].split("c"),
                  ut = ei[0] - 0,
                  li = ei[1] - 0;
                svgedit.path.path.selectPt(ut, li)
              }
              svgedit.path.path.dragging || (ht == null && (ht = c.getRubberBandBox()), v(ht, {
                x: f * r,
                y: o * r,
                width: 0,
                height: 0,
                display: "inline"
              }, 100))
            }
          },
          mouseMove: function (n, i) {
            var o, e, a, p, nt, l, u, tt, it;
            if (rt = !0, d === "path") {
              if (!t) return;
              if (o = t.pathSegList, e = o.numberOfItems - 1, y) {
                a = svgedit.path.addCtrlGrip("1c1");
                p = svgedit.path.addCtrlGrip("0c2");
                a.setAttribute("cx", n);
                a.setAttribute("cy", i);
                a.setAttribute("display", "inline");
                var w = y[0],
                  b = y[1],
                  at = o.getItem(e),
                  ct = n / r,
                  lt = i / r,
                  k = w + (w - ct),
                  g = b + (b - lt);
                if (p.setAttribute("cx", k * r), p.setAttribute("cy", g * r), p.setAttribute("display", "inline"), nt = svgedit.path.getCtrlLine(1), v(nt, {
                    x1: n,
                    y1: i,
                    x2: k * r,
                    y2: g * r,
                    display: "inline"
                  }), e === 0) f = [n, i];
                else {
                  var c = o.getItem(e - 1),
                    s = c.x,
                    h = c.y;
                  c.pathSegType === 6 ? (s += s - c.x2, h += h - c.y2) : f && (s = f[0] / r, h = f[1] / r);
                  svgedit.path.replacePathSeg(6, e, [w, b, s, h, k, g], t)
                }
              } else l = et("path_stretch_line"), l && (u = o.getItem(e), u.pathSegType === 6 ? (tt = u.x + (u.x - u.x2), it = u.y + (u.y - u.y2), svgedit.path.replacePathSeg(6, 1, [n, i, tt * r, it * r, n, i], l)) : f ? svgedit.path.replacePathSeg(6, 1, [n, i, f[0], f[1], n, i], l) : svgedit.path.replacePathSeg(4, 1, [n, i], l));
              return
            }
            if (svgedit.path.path.dragging) {
              var ut = svgedit.path.getPointFromGrip({
                  x: svgedit.path.path.dragging[0],
                  y: svgedit.path.path.dragging[1]
                }, svgedit.path.path),
                ft = svgedit.path.getPointFromGrip({
                  x: n,
                  y: i
                }, svgedit.path.path),
                ot = ft.x - ut.x,
                st = ft.y - ut.y;
              svgedit.path.path.dragging = [n, i];
              svgedit.path.path.dragctrl ? svgedit.path.path.moveCtrl(ot, st) : svgedit.path.path.movePts(ot, st)
            } else svgedit.path.path.selected_pts = [], svgedit.path.path.eachSeg(function () {
              var n = this;
              if (n.next || n.prev) {
                var f = n.item,
                  r = ht.getBBox(),
                  t = svgedit.path.getGripPt(n),
                  u = {
                    x: t.x,
                    y: t.y,
                    width: 0,
                    height: 0
                  },
                  i = svgedit.math.rectsIntersect(r, u);
                this.select(i);
                i && svgedit.path.path.selected_pts.push(n.index)
              }
            })
          },
          mouseUp: function (n, i, r, u) {
            var e, s, h;
            if (d === "path") return y = null, t ? f && (e = Math.abs(r - f[0]), s = Math.abs(u - f[1]), e < 2 && s < 2 && (f = null)) : (i = et(si()), ot = !1, f = null), {
              keep: !0,
              element: i
            };
            svgedit.path.path.dragging ? (h = svgedit.path.path.cur_pt, svgedit.path.path.dragging = !1, svgedit.path.path.dragctrl = !1, svgedit.path.path.update(), rt && svgedit.path.path.endChanges("Move path point(s)"), n.shiftKey || rt || svgedit.path.path.selectPt(h)) : ht && ht.getAttribute("display") != "none" ? (ht.setAttribute("display", "none"), ht.getAttribute("width") <= 2 && ht.getAttribute("height") <= 2 && p.toSelectMode(n.target), o("updateContextPanel")) : p.toSelectMode(n.target);
            rt = !1
          },
          toEditMode: function (n) {
            svgedit.path.path = svgedit.path.getPath_(n);
            d = "pathedit";
            nt();
            svgedit.path.path.show(!0).update();
            svgedit.path.path.oldbbox = svgedit.utilities.getBBox(svgedit.path.path.elem);
            e = !1
          },
          toSelectMode: function (n) {
            var t = n == svgedit.path.path.elem;
            d = "select";
            svgedit.path.path.show(!1);
            a = !1;
            nt();
            svgedit.path.path.matrix && svgedit.path.recalcRotatedPath();
            t && (o("selected", [n]), ti([n], !0))
          },
          addSubPath: function (n) {
            n ? (d = "path", e = !0) : (p.clear(!0), p.toEditMode(svgedit.path.path.elem))
          },
          select: function (n) {
            a === n ? (p.toEditMode(n), d = "pathedit") : a = n
          },
          reorient: function () {
            var n = i[0],
              r, t, u;
            n && (r = gt(n), r != 0) && (t = new l("Reorient path"), u = {
              d: n.getAttribute("d"),
              transform: n.getAttribute("transform")
            }, t.addSubCommand(new vt(n, u)), nt(), this.resetOrientation(n), h(t), svgedit.path.getPath_(n).show(!1).matrix = null, this.clear(), ti([n], !0), o("changed", i))
          },
          clear: function () {
            if (a = null, t) {
              var n = et(si());
              $(et("path_stretch_line")).remove();
              $(n).remove();
              $(et("pathpointgrip_container")).find("*").attr("display", "none");
              t = f = null;
              ot = !1
            } else d == "pathedit" && this.toSelectMode(svgedit.path.path.elem);
            svgedit.path.path && svgedit.path.path.init().show(!1)
          },
          resetOrientation: function (n) {
            var u, f, e, s, t, i, o, r;
            if (n == null || n.nodeName != "path") return !1;
            for (u = tt(n), f = g(u).matrix, u.clear(), n.setAttribute("transform", ""), n.removeAttribute("transform"), e = n.pathSegList, s = e.numberOfItems, t = 0; t < s; ++t)(i = e.getItem(t), o = i.pathSegType, o != 1) && (r = [], $.each(["", 1, 2], function (n, t) {
              var e = i["x" + t],
                o = i["y" + t],
                u;
              e !== undefined && o !== undefined && (u = st(e, o, f), r.splice(r.length, 0, u.x, u.y))
            }), svgedit.path.replacePathSeg(o, t, r, n));
            te(n, f)
          },
          zoomChange: function () {
            if (d == "pathedit") {
              try {
                var n = svgedit.path.path.elem.pathSegList.numberOfItems
              } catch (t) {}
              svgedit.path.path.update()
            }
          },
          getNodePoint: function () {
            var t = svgedit.path.path.selected_pts.length ? svgedit.path.path.selected_pts[0] : 1,
              n = svgedit.path.path.segs[t];
            return {
              x: n.item.x,
              y: n.item.y,
              type: n.type
            }
          },
          getSelectedNodeType: function () {
            for (var u = svgedit.path.path.selected_pts, i = u.length, n = 0, r, t; i--;) {
              if (r = svgedit.path.path.selected_pts[i], t = svgedit.path.path.segs[r], n == 0) {
                n = t.type;
                continue
              }
              if (n != t.type) return -1
            }
            return n == 0 ? -1 : n
          },
          getSelectedNodeLength: function () {
            return svgedit.path.path.selected_pts.length
          },
          linkControlPoints: function (n) {
            svgedit.path.setLinkControlPoints(n)
          },
          clonePathNode: function () {
            var t;
            svgedit.path.path.storeD();
            for (var i = svgedit.path.path.selected_pts, u = svgedit.path.path.segs, n = i.length, r = []; n--;) t = i[n], svgedit.path.path.addSeg(t), r.push(t + n), r.push(t + n + 1);
            svgedit.path.path.init().clearSelection();
            svgedit.path.path.endChanges("Clone path node(s)")
          },
          opencloseSubPath: function () {
            var a = svgedit.path.path.selected_pts,
              s, h, y, u, p, c, e, l, t;
            if (a.length === 1) {
              svgedit.path.path.storeD();
              var f = svgedit.path.path.elem,
                n = f.pathSegList,
                v = n.numberOfItems,
                i = a[0],
                r = null,
                o = null;
              if (svgedit.path.path.eachSeg(function (n) {
                  return (this.type === 2 && n <= i && (o = this.item), n <= i) ? !0 : this.type === 2 ? (r = n, !1) : this.type === 1 ? (r = !1, !1) : void 0
                }), r == null && (r = svgedit.path.path.segs.length - 1), r !== !1) {
                s = f.createSVGPathSegLinetoAbs(o.x, o.y);
                h = f.createSVGPathSegClosePath();
                r == svgedit.path.path.segs.length - 1 ? (n.appendItem(s), n.appendItem(h)) : (svgedit.path.insertItemBefore(f, h, r), svgedit.path.insertItemBefore(f, s, r));
                svgedit.path.path.init().selectPt(r + 1);
                svgedit.path.path.endChanges("OpenClose path node(s)");
                return
              }
              if (y = svgedit.path.path.segs[i], y.mate) {
                n.removeItem(i);
                n.removeItem(i);
                svgedit.path.path.init().selectPt(i - 1);
                svgedit.path.path.endChanges("OpenClose path node(s)");
                return
              }
              for (t = 0; t < n.numberOfItems; t++)
                if (c = n.getItem(t), c.pathSegType === 2) u = t;
                else if (t === i) n.removeItem(u);
              else if (c.pathSegType === 1 && i < t) {
                p = t;
                n.removeItem(t);
                break
              }
              for (v = n.numberOfItems, e = i - u - 1, e < 0 && (e = 0); e--;) svgedit.path.insertItemBefore(f, n.getItem(u), p), v < n.numberOfItems && n.removeItem(u);
              l = n.getItem(u);
              svgedit.path.replacePathSeg(2, u, [l.x, l.y]);
              t = i;
              svgedit.path.path.init().selectPt(0);
              svgedit.path.path.endChanges("OpenClose path node(s)")
            }
          },
          deletePathNode: function () {
            var t, n, i, f;
            if (p.canDeleteNodes) {
              svgedit.path.path.storeD();
              var e = svgedit.path.path.selected_pts,
                r = e.length,
                o = p.closed_subpath ? 2 : 1;
              if (!(r >= svgedit.path.path.elem.pathSegList.numberOfItems - o)) {
                for (t = function () {
                    var i = svgedit.path.path.elem.pathSegList,
                      n = i.numberOfItems,
                      r = function (n, t) {
                        while (t--) i.removeItem(n)
                      },
                      u, e, o, f;
                    if (n <= 1) return !0;
                    while (n--)
                      if (u = i.getItem(n), u.pathSegType === 1) {
                        if (e = i.getItem(n - 1), o = i.getItem(n - 2), e.pathSegType === 2) {
                          r(n - 1, 2);
                          t();
                          break
                        } else if (o.pathSegType === 2) {
                          r(n - 2, 3);
                          t();
                          break
                        }
                      } else if (u.pathSegType === 2 && n > 0)
                      if (f = i.getItem(n - 1).pathSegType, f === 2) {
                        r(n - 1, 1);
                        t();
                        break
                      } else if (f === 1 && i.numberOfItems - 1 === n) {
                      r(n, 1);
                      t();
                      break
                    }
                    return !1
                  }, n = {
                    mate: null,
                    shift: null,
                    bShift: !1
                  }; r--;) {
                  if (i = e[r], n.bShift && n.mate == i && (i = n.shift, t(), svgedit.path.path.init(), n.bShift = !1, n.mate == n.shift)) break;
                  n = svgedit.path.path.deleteSeg(i, n)
                }
                if (t(), svgedit.path.path.elem.pathSegList.numberOfItems <= 1) {
                  svgedit.path.path.endChanges("Delete path node(s)");
                  u.undoMgr.undo();
                  p.toSelectMode(svgedit.path.path.elem);
                  u.deleteSelectedElements();
                  return
                }
                svgedit.path.path.init();
                svgedit.path.path.clearSelection();
                window.opera && (f = $(svgedit.path.path.elem), f.attr("d", f.attr("d")));
                svgedit.path.path.endChanges("Delete path node(s)")
              }
            }
          },
          smoothPolylineIntoPath: ct,
          setSegType: function (n) {
            svgedit.path.path.setSegType(n)
          },
          moveNode: function (n, t) {
            var u = svgedit.path.path.selected_pts,
              r, i;
            u.length && (svgedit.path.path.storeD(), r = svgedit.path.path.segs[u[0]], i = {
              x: 0,
              y: 0
            }, i[n] = t - r.item[n], r.move(i.x, i.y), svgedit.path.path.endChanges("Move path point"))
          },
          fixEnd: function (n) {
            for (var u = n.pathSegList, o = u.numberOfItems, i, r, f, e, t = 0; t < o; ++t)
              if (r = u.getItem(t), r.pathSegType === 2 && (i = r), r.pathSegType === 1 && (f = u.getItem(t - 1), f.x != i.x || f.y != i.y)) {
                e = n.createSVGPathSegLinetoAbs(i.x, i.y);
                svgedit.path.insertItemBefore(n, e, t);
                p.fixEnd(n);
                break
              } svgedit.browser.isWebkit() && ut(n)
          },
          convertPath: function (n, t) {
            for (var p = n.pathSegList, k = p.numberOfItems, i = 0, r = 0, w = "", y = null, a = 0; a < k; ++a) {
              var e = p.getItem(a),
                u = e.x || 0,
                f = e.y || 0,
                s = e.x1 || 0,
                h = e.y1 || 0,
                c = e.x2 || 0,
                l = e.y2 || 0,
                b = e.pathSegType,
                v = ff[b]["to" + (t ? "Lower" : "Upper") + "Case"](),
                o = function (n, t, i) {
                  var t = t ? " " + t.join(" ") : "",
                    i = i ? " " + svgedit.units.shortFloat(i) : "";
                  $.each(n, function (t, i) {
                    n[t] = svgedit.units.shortFloat(i)
                  });
                  w += v + n.join(" ") + t + i
                };
              switch (b) {
                case 1:
                  w += "z";
                  break;
                case 12:
                  u -= i;
                case 13:
                  t ? (i += u, v = "l") : (u += i, i = u, v = "L");
                  o([
                    [u, r]
                  ]);
                  break;
                case 14:
                  f -= r;
                case 15:
                  t ? (r += f, v = "l") : (f += r, r = f, v = "L");
                  o([
                    [i, f]
                  ]);
                  break;
                case 2:
                case 4:
                case 18:
                  u -= i;
                  f -= r;
                case 5:
                case 3:
                  y && p.getItem(a - 1).pathSegType === 1 && !t && (i = y[0], r = y[1]);
                case 19:
                  t ? (i += u, r += f) : (u += i, f += r, i = u, r = f);
                  b === 3 && (y = [i, r]);
                  o([
                    [u, f]
                  ]);
                  break;
                case 6:
                  u -= i;
                  s -= i;
                  c -= i;
                  f -= r;
                  h -= r;
                  l -= r;
                case 7:
                  t ? (i += u, r += f) : (u += i, s += i, c += i, f += r, h += r, l += r, i = u, r = f);
                  o([
                    [s, h],
                    [c, l],
                    [u, f]
                  ]);
                  break;
                case 8:
                  u -= i;
                  s -= i;
                  f -= r;
                  h -= r;
                case 9:
                  t ? (i += u, r += f) : (u += i, s += i, f += r, h += r, i = u, r = f);
                  o([
                    [s, h],
                    [u, f]
                  ]);
                  break;
                case 10:
                  u -= i;
                  f -= r;
                case 11:
                  t ? (i += u, r += f) : (u += i, f += r, i = u, r = f);
                  o([
                    [e.r1, e.r2]
                  ], [e.angle, e.largeArcFlag ? 1 : 0, e.sweepFlag ? 1 : 0], [u, f]);
                  break;
                case 16:
                  u -= i;
                  c -= i;
                  f -= r;
                  l -= r;
                case 17:
                  t ? (i += u, r += f) : (u += i, c += i, f += r, l += r, i = u, r = f);
                  o([
                    [c, l],
                    [u, f]
                  ])
              }
            }
            return w
          }
        }
      }(),
      of = this.removeUnusedDefElems = function () {
        var u = e.getElementsByTagNameNS(ft, "defs"),
          n, o, i, s, r, h, t, c;
        if (!u || !u.length) return 0;
        var f = [],
          l = 0,
          a = ["fill", "stroke", "filter", "marker-start", "marker-mid", "marker-end"],
          y = a.length,
          v = e.getElementsByTagNameNS(ft, "*"),
          p = v.length;
        for (n = 0; n < p; n++) {
          for (o = v[n], i = 0; i < y; i++) s = cr(o.getAttribute(a[i])), s && f.push(s.substr(1));
          r = vi(o);
          r && r.indexOf("#") === 0 && f.push(r.substr(1))
        }
        for (h = $(u).find("linearGradient, radialGradient, filter, marker, svg, symbol"), defelem_ids = [], n = h.length; n--;) t = h[n], c = t.id, f.indexOf(c) < 0 && (su[c] = t, t.parentNode.removeChild(t), l++);
        return l
      };
    this.svgCanvasToString = function () {
      for (var n, t; of () > 0;);
      return p.clear(!0), $.each(e.childNodes, function (n, t) {
        n && t.nodeType === 8 && t.data.indexOf("Created with") >= 0 && e.insertBefore(t, e.firstChild)
      }), dt && sr(), n = [], $(e).find("g:data(gsvg)").each(function () {
        for (var i = this.attributes, r = i.length, u, t = 0; t < r; t++)(i[t].nodeName == "id" || i[t].nodeName == "style") && r--;
        r <= 0 && (u = this.firstChild, n.push(u), $(this).replaceWith(u))
      }), t = this.svgToString(e, 0), n.length && $(n).each(function () {
        uf(this)
      }), t
    };
    this.svgToString = function (n, t, i) {
      var r = [],
        v = svgedit.utilities.toXml,
        o = k.baseUnit,
        it = new RegExp("^-?[\\d\\.]+" + o + "$"),
        h, e, l, s, g, y, nt, f, tt, w, b, c, d, u;
      if (n) {
        if (n.id == "data-fotimg") return r.join("");
        if (i && n.nodeName == "image") return ne([n]), r.join("");
        for (ku(n), h = n.attributes, l = n.childNodes, u = 0; u < t; u++) r.push(" ");
        if (r.push("<"), r.push(n.nodeName), n.id === "svgcontent")
          for (s = wi(), g = "", o !== "px" && (s.w = svgedit.units.convertUnit(s.w, o) + o, s.h = svgedit.units.convertUnit(s.h, o) + o), r.push(' width="' + s.w + '" height="' + s.h + '"' + g + ' xmlns="' + ft + '"'), y = {}, $(n).find("*").andSelf().each(function () {
              var n = this;
              $.each(this.attributes, function (n, t) {
                var i = t.namespaceURI;
                i && !y[i] && fr[i] !== "xmlns" && fr[i] !== "xml" && (y[i] = !0, r.push(" xmlns:" + fr[i] + '="' + i + '"'))
              })
            }), u = h.length, nt = ["width", "height", "xmlns", "x", "y", "viewBox", "id", "overflow", "OVERFLOW"]; u--;)(e = h.item(u), f = v(e.nodeValue), e.nodeName.indexOf("xmlns:") !== 0) && f != "" && nt.indexOf(e.localName) == -1 && (!e.namespaceURI || fr[e.namespaceURI]) && (r.push(" "), r.push(e.nodeName), r.push('="'), r.push(f), r.push('"'));
        else {
          if (n.nodeName === "defs" && !n.firstChild) return;
          for (tt = ["-moz-math-font-style", "_moz-math-font-style"], u = h.length - 1; u >= 0; u--) {
            e = h.item(u);
            var a = e.localName.toLowerCase(),
              rt = e.nodeName.toLowerCase(),
              f = v(e.nodeValue);
            if (!(tt.indexOf(a) >= 0) && f != "") {
              if (f.indexOf("pointer-events") === 0) continue;
              if (a === "class" && f.indexOf("se_") === 0) continue;
              r.push(" ");
              a === "d" && (f = p.convertPath(n, !0));
              isNaN(f) ? it.test(f) && (f = svgedit.units.shortFloat(f) + o) : f = svgedit.units.shortFloat(f);
              ki.apply && n.nodeName === "image" && a === "href" && ki.images && ki.images === "embed" && (w = vr[f], w && (f = w));
              (!e.namespaceURI || e.namespaceURI == ft || fr[e.namespaceURI]) && (r.push(rt), r.push('="'), r.push(f), r.push('"'))
            }
          }
        }
        if (n.hasChildNodes()) {
          for (r.push(">"), t++, b = !1, u = 0; u < l.length; u++) {
            c = l.item(u);
            switch (c.nodeType) {
              case 1:
                r.push("\n");
                r.push(this.svgToString(l.item(u), t, i));
                break;
              case 3:
                d = c.nodeValue.replace(/^\s+|\s+$/g, "");
                d != "" && (b = !0, r.push(v(d) + ""));
                break;
              case 4:
                r.push("\n");
                r.push(new Array(t + 1).join(" "));
                r.push("<![CDATA[");
                r.push(c.nodeValue);
                r.push("]\]>");
                break;
              case 8:
                r.push("\n");
                r.push(new Array(t + 1).join(" "));
                r.push("<!--");
                r.push(c.data);
                r.push("-->")
            }
          }
          if (t--, !b)
            for (r.push("\n"), u = 0; u < t; u++) r.push(" ");
          r.push("<\/");
          r.push(n.nodeName);
          r.push(">")
        } else r.push("/>")
      }
      return r.join("")
    };
    this.embedImage = function (n, t) {
      $(new Image).load(function () {
        var i = document.createElement("canvas"),
          r;
        i.width = this.width;
        i.height = this.height;
        i.getContext("2d").drawImage(this, 0, 0);
        try {
          r = ";svgedit_url=" + encodeURIComponent(n);
          r = i.toDataURL().replace(";base64", r + ";base64");
          vr[n] = r
        } catch (u) {
          vr[n] = !1
        }
        uu = n;
        t && t(vr[n])
      }).attr("src", n)
    };
    this.setGoodImage = function (n) {
      uu = n
    };
    this.open = function () {};
    this.save = function (n) {
      nt();
      n && $.extend(ki, n);
      ki.apply = !0;
      var t = this.svgCanvasToString();
      o("saved", t)
    };
    this.fcmExport = function () {
      nt();
      var n = this.svgCanvasToString();
      o("fcmexported", n)
    };
    this.pdfExport = function () {
      nt();
      var n = this.svgCanvasToString();
      o("pdfexported", n)
    };
    this.countPiece = function () {
      nt();
      var n = this.svgCanvasToString();
      o("countPiece", n)
    };
    this.rasterExport = function () {
      var i;
      nt();
      var n = [],
        t = {
          feGaussianBlur: er.exportNoBlur,
          foreignObject: er.exportNoforeignObject,
          "[stroke-dasharray]": er.exportNoDashArray
        },
        r = $(e);
      "font" in $("<canvas>")[0].getContext("2d") || (t.text = er.exportNoText);
      $.each(t, function (t, i) {
        r.find(t).length && n.push(i)
      });
      i = this.svgCanvasToString();
      o("exported", {
        svg: i,
        issues: n
      })
    };
    this.getSvgString = function () {
      return ki.apply = !1, this.svgCanvasToString()
    };
    this.randomizeIds = function () {
      arguments.length > 0 && arguments[0] == !1 ? svgedit.draw.randomizeIds(!1, rt()) : svgedit.draw.randomizeIds(!0, rt())
    };
    var au = this.uniquifyElems = function (n) {
        var t = {},
          l = ["filter", "linearGradient", "pattern", "radialGradient", "symbol", "textPath", "use"],
          i, u, r, f, e, o, s, h, c;
        svgedit.utilities.walkTree(n, function (n) {
          var r, i;
          n.nodeType == 1 && (n.id && (n.id in t || (t[n.id] = {
            elem: null,
            attrs: [],
            hrefs: []
          }), t[n.id].elem = n), $.each(nf, function (i, r) {
            var f = n.getAttributeNode(r),
              e, u;
            f && (e = svgedit.utilities.getUrlFromAttr(f.value), u = e ? e.substr(1) : null, u && (u in t || (t[u] = {
              elem: null,
              attrs: [],
              hrefs: []
            }), t[u].attrs.push(f)))
          }), r = svgedit.utilities.getHref(n), r && l.indexOf(n.nodeName) >= 0 && (i = r.substr(1), i && (i in t || (t[i] = {
            elem: null,
            attrs: [],
            hrefs: []
          }), t[i].hrefs.push(n))))
        });
        for (i in t)
          if (i && (u = t[i].elem, u)) {
            for (r = b(), u.id = r, f = t[i].attrs, e = f.length; e--;) o = f[e], o.ownerElement.setAttribute(o.name, "url(#" + r + ")");
            for (s = t[i].hrefs, h = s.length; h--;) c = s[h], svgedit.utilities.setHref(c, "#" + r)
          }
      },
      vu = this.setUseData = function (n) {
        var t = $(n);
        n.tagName !== "use" && (t = t.find("use"));
        t.each(function () {
          var t = vi(this).substr(1),
            n = et(t);
          n && ($(this).data("ref", n), (n.tagName == "symbol" || n.tagName == "svg") && $(this).data("symbol", n).data("ref", n))
        })
      },
      yu = this.convertGradients = function (n) {
        var t = $(n).find("linearGradient, radialGradient");
        !t.length && svgedit.browser.isWebkit() && (t = $(n).find("*").filter(function () {
          return this.tagName.indexOf("Gradient") >= 0
        }));
        t.each(function () {
          var i = this,
            u, t, n, r;
          if ($(i).attr("gradientUnits") === "userSpaceOnUse") {
            if (u = $(e).find('[fill="url(#' + i.id + ')"],[stroke="url(#' + i.id + ')"]'), !u.length) return;
            if (t = svgedit.utilities.getBBox(u[0]), !t) return;
            if (i.tagName === "linearGradient") {
              if (n = $(i).attr(["x1", "y1", "x2", "y2"]), r = i.gradientTransform.baseVal, r && r.numberOfItems > 0) {
                var f = g(r).matrix,
                  o = st(n.x1, n.y1, f),
                  s = st(n.x2, n.y2, f);
                n.x1 = o.x;
                n.y1 = o.y;
                n.x2 = s.x;
                n.y2 = s.y;
                i.removeAttribute("gradientTransform")
              }
              $(i).attr({
                x1: (n.x1 - t.x) / t.width,
                y1: (n.y1 - t.y) / t.height,
                x2: (n.x2 - t.x) / t.width,
                y2: (n.y2 - t.y) / t.height
              });
              i.removeAttribute("gradientUnits")
            }
          }
        })
      },
      sf = this.convertToGroup = function (n) {
        var r, u, c, g, y, nt, p, s, w, k, it, a, et, v, ot, d;
        if (n || (n = i[0]), r = $(n), u = new l, r.data("gsvg")) g = n.firstChild, y = $(g).attr(["x", "y"]), $(n.firstChild.firstChild).unwrap(), $(n).removeData("gsvg"), nt = tt(n), p = f.createSVGTransform(), p.setTranslate(y.x, y.y), nt.appendItem(p), yt(n), o("selected", [n]);
        else if (r.data("symbol")) {
          n = r.data("symbol");
          c = r.attr("transform");
          s = r.attr(["x", "y"]);
          w = n.getAttribute("viewBox");
          w && (k = w.split(" "), s.x -= +k[0], s.y -= +k[1]);
          c += " translate(" + (s.x || 0) + "," + (s.y || 0) + ")";
          it = r.prev();
          u.addSubCommand(new wt(r[0], r[0].nextSibling, r[0].parentNode));
          r.remove();
          var st = $(e).find("use:data(symbol)").length,
            t = bt.createElementNS(ft, "g"),
            rt = n.childNodes;
          for (a = 0; a < rt.length; a++) t.appendChild(rt[a].cloneNode(!0));
          svgedit.browser.isGecko() && (et = $(ii()).children("linearGradient,radialGradient,pattern").clone(), $(t).append(et));
          c && t.setAttribute("transform", c);
          v = n.parentNode;
          au(t);
          svgedit.browser.isGecko() && $(ii()).append($(t).find("linearGradient,radialGradient,pattern"));
          t.id = b();
          it.after(t);
          v && (st || (ot = n.nextSibling, v.removeChild(n), u.addSubCommand(new wt(n, ot, v))), u.addSubCommand(new ut(t)));
          vu(t);
          svgedit.browser.isGecko() ? yu(ii()) : yu(t);
          svgedit.utilities.walkTreePost(t, function (n) {
            try {
              yt(n)
            } catch (t) {
              console.log(t)
            }
          });
          $(t).find(gu).each(function () {
            this.id || (this.id = b())
          });
          ci([t]);
          d = gr(t, !0);
          d && u.addSubCommand(d);
          h(u)
        } else console.log("Unexpected element to ungroup:", n)
      };
    this.setSvgString = function (n) {
      var a, i, v, t, y, p, r, w;
      try {
        a = svgedit.utilities.text2xml(n);
        this.prepareSvg(a);
        var s = new l("Change Source"),
          d = e.nextSibling,
          g = f.removeChild(e);
        s.addSubCommand(new wt(g, d, f));
        e = bt.importNode(a.documentElement, !0);
        f.appendChild(e);
        i = $(e);
        u.current_drawing_ = new svgedit.draw.Drawing(e, rr);
        v = rt().getNonce();
        v ? o("setnonce", v) : o("unsetnonce");
        i.find("image").each(function () {
          var r = this,
            n, t, i;
          dr(r);
          n = vi(this);
          n.indexOf("data:") === 0 && (t = n.match(/svgedit_url=(.*?);/), t && (i = decodeURIComponent(t[1]), $(new Image).load(function () {
            r.setAttributeNS(tu, "xlink:href", i)
          }).attr("src", i)));
          u.embedImage(n)
        });
        i.find("svg").each(function () {
          if (!$(this).closest("defs").length) {
            au(this);
            var n = this.parentNode;
            n.childNodes.length === 1 && n.nodeName === "g" ? ($(n).data("gsvg", this), n.id = n.id || b()) : uf(this)
          }
        });
        svgedit.browser.isGecko() && i.find("linearGradient, radialGradient, pattern").appendTo(ii());
        vu(i);
        yu(i[0]);
        svgedit.utilities.walkTreePost(e, function (n) {
          try {
            yt(n)
          } catch (t) {
            console.log(t)
          }
        });
        t = {
          id: "svgcontent",
          overflow: k.show_outside_canvas ? "visible" : "hidden"
        };
        y = !1;
        i.attr("viewBox") ? (p = i.attr("viewBox").split(" "), t.width = p[2], t.height = p[3]) : $.each(["width", "height"], function (n, r) {
          var u = i.attr(r);
          u || (u = "100%");
          (u + "").substr(-1) === "%" ? y = !0 : t[r] = ai(r, u)
        });
        gi();
        i.children().find(gu).each(function () {
          this.id || (this.id = b())
        });
        y && (r = getStrokedBBox(), t.width = r.width + r.x, t.height = r.height + r.y);
        t.width <= 0 && (t.width = 100);
        t.height <= 0 && (t.height = 100);
        i.attr(t);
        this.contentW = t.width;
        this.contentH = t.height;
        s.addSubCommand(new ut(e));
        w = i.attr(["width", "height"]);
        s.addSubCommand(new vt(f, w));
        svgedit.transformlist.resetListMap();
        nt();
        svgedit.path.clearData();
        f.appendChild(c.selectorParentGroup);
        h(s);
        o("changed", [e])
      } catch (tt) {
        return console.log(tt), !1
      }
      return !0
    };
    this.importSvgString = function (n) {
      var f, y, c, p, i, s, st, w, u, t, et, ot, k, v, d, r;
      try {
        if (f = svgedit.utilities.encode64(n.length + n).substr(0, 32), y = !1, or[f] && $(or[f].symbol).parents("#svgroot").length && (y = !0), c = new l("Import SVG"), y) t = or[f].symbol, u = or[f].xform;
        else {
          p = svgedit.utilities.text2xml(n);
          this.prepareSvg(p);
          i = bt.importNode(p.documentElement, !0);
          au(i);
          var g = ai("width", i.getAttribute("width")),
            tt = ai("height", i.getAttribute("height")),
            it = i.getAttribute("viewBox"),
            a = it ? it.split(" ") : [0, 0, g, tt];
          for (s = 0; s < 4; ++s) a[s] = +a[s];
          for (st = +e.getAttribute("width"), w = +e.getAttribute("height"), u = tt > g ? "scale(" + w / 3 / a[3] + ")" : "scale(" + w / 3 / a[2] + ")", u = "translate(0) " + u + " translate(0)", t = bt.createElementNS(ft, "symbol"), et = ii(), svgedit.browser.isGecko() && $(i).find("linearGradient, radialGradient, pattern").appendTo(et); i.firstChild;) ot = i.firstChild, t.appendChild(ot);
          for (k = i.attributes, v = 0; v < k.length; v++) d = k[v], t.setAttribute(d.nodeName.toLowerCase(), d.nodeValue);
          t.id = b();
          or[f] = {
            symbol: t,
            xform: u
          };
          ii().appendChild(t);
          c.addSubCommand(new ut(t))
        }
        r = bt.createElementNS(ft, "use");
        r.id = b();
        yi(r, "#" + t.id);
        (dt || rt().getCurrentLayer()).appendChild(r);
        c.addSubCommand(new ut(r));
        nt();
        r.setAttribute("transform", u);
        yt(r);
        $(r).data("symbol", t).data("ref", t);
        ti([r]);
        h(c);
        o("changed", [e])
      } catch (ht) {
        return console.log(ht), !1
      }
      return !0
    };
    gi = u.identifyLayers = function () {
      sr();
      rt().identifyLayers()
    };
    this.createLayer = function (n) {
      var t = new l("Create Layer"),
        i = rt().createLayer(n);
      t.addSubCommand(new ut(i));
      h(t);
      nt();
      o("changed", [i])
    };
    this.cloneLayer = function (n) {
      var s = new l("Duplicate Layer"),
        t = bt.createElementNS(ft, "g"),
        c = bt.createElementNS(ft, "title"),
        r, f, i, e;
      for (c.textContent = n, t.appendChild(c), r = rt().getCurrentLayer(), $(r).after(t), f = r.childNodes, i = 0; i < f.length; i++)(e = f[i], e.localName != "title") && t.appendChild(pi(e));
      nt();
      gi();
      s.addSubCommand(new ut(t));
      h(s);
      u.setCurrentLayer(n);
      o("changed", [t])
    };
    this.deleteCurrentLayer = function () {
      var n = rt().getCurrentLayer(),
        r = n.nextSibling,
        i = n.parentNode,
        t;
      return (n = rt().deleteCurrentLayer(), n) ? (t = new l("Delete Layer"), t.addSubCommand(new wt(n, r, i)), h(t), nt(), o("changed", [i]), !0) : !1
    };
    this.setCurrentLayer = function (n) {
      var t = rt().setCurrentLayer(svgedit.utilities.toXml(n));
      return t && nt(), t
    };
    this.renameCurrentLayer = function (n) {
      var r = rt(),
        f, e, s, c, t, i;
      if (r.current_layer) {
        if (f = r.current_layer, !u.setCurrentLayer(n)) {
          for (e = new l("Rename Layer"), t = 0; t < r.getNumLayers(); ++t)
            if (r.all_layers[t][1] == f) break;
          for (s = r.getLayerName(t), r.all_layers[t][0] = svgedit.utilities.toXml(n), c = f.childNodes.length, t = 0; t < c; ++t)
            if (i = f.childNodes.item(t), i && i.tagName == "title") {
              while (i.firstChild) i.removeChild(i.firstChild);
              return i.textContent = n, e.addSubCommand(new vt(i, {
                "#text": s
              })), h(e), o("changed", [f]), !0
            }
        }
        r.current_layer = f
      }
      return !1
    };
    this.setCurrentLayerPosition = function (n) {
      var t = rt(),
        i, r, f;
      if (t.current_layer && n >= 0 && n < t.getNumLayers()) {
        for (i = 0; i < t.getNumLayers(); ++i)
          if (t.all_layers[i][1] == t.current_layer) break;
        if (i == t.getNumLayers()) return !1;
        if (i != n) return r = null, f = t.current_layer.nextSibling, n > i ? n < t.getNumLayers() - 1 && (r = t.all_layers[n + 1][1]) : r = t.all_layers[n][1], e.insertBefore(t.current_layer, r), h(new fi(t.current_layer, f, e)), gi(), u.setCurrentLayer(t.getLayerName(n)), !0
      }
      return !1
    };
    this.setLayerVisibility = function (n, t) {
      var i = rt(),
        f = i.getLayerVisibility(n),
        r = i.setLayerVisibility(n, t),
        u;
      if (r) u = f ? "inline" : "none", h(new vt(r, {
        display: u
      }, "Layer Visibility"));
      else return !1;
      return r == i.getCurrentLayer() && (nt(), p.clear()), !0
    };
    this.moveSelectedToLayer = function (n) {
      for (var u = null, f = rt(), r, s, c, t = 0; t < f.getNumLayers(); ++t)
        if (f.getLayerName(t) == n) {
          u = f.all_layers[t][1];
          break
        } if (!u) return !1;
      for (var e = new l("Move Elements to Layer"), o = i, t = o.length; t--;)(r = o[t], r) && (s = r.nextSibling, c = r.parentNode, u.appendChild(r), e.addSubCommand(new fi(r, s, c)));
      return h(e), !0
    };
    this.mergeLayer = function (n) {
      var r = new l("Merge Layer"),
        t = rt(),
        u = $(t.current_layer).prev()[0],
        i, f, s;
      if (u) {
        var c = t.current_layer.childNodes,
          v = c.length,
          a = t.current_layer.nextSibling;
        for (r.addSubCommand(new wt(t.current_layer, a, e)); t.current_layer.firstChild;) {
          if (i = t.current_layer.firstChild, i.localName == "title") {
            f = i.nextSibling;
            r.addSubCommand(new wt(i, f, t.current_layer));
            t.current_layer.removeChild(i);
            continue
          }
          s = i.nextSibling;
          u.appendChild(i);
          r.addSubCommand(new fi(i, s, t.current_layer))
        }
        return e.removeChild(t.current_layer), n || (nt(), gi(), o("changed", [e]), h(r)), t.current_layer = u, r
      }
    };
    this.mergeAllLayers = function () {
      var t = new l("Merge all Layers"),
        n = rt();
      for (n.current_layer = n.all_layers[n.getNumLayers() - 1][1]; $(e).children("g").length > 1;) t.addSubCommand(u.mergeLayer(!0));
      nt();
      gi();
      o("changed", [e]);
      h(t)
    };
    sr = this.leaveContext = function () {
      var r = yr.length,
        t, n, i;
      if (r) {
        for (t = 0; t < r; t++) n = yr[t], i = lr(n, "orig_opac"), i !== 1 ? n.setAttribute("opacity", i) : n.removeAttribute("opacity"), n.setAttribute("style", "pointer-events: inherit");
        yr = [];
        nt(!0);
        o("contextset", null)
      }
      dt = null
    };
    hf = this.setContext = function (n) {
      sr();
      typeof n == "string" && (n = et(n));
      dt = n;
      $(n).parentsUntil("#svgcontent").andSelf().siblings().each(function () {
        var n = this.getAttribute("opacity") || 1;
        lr(this, "orig_opac", n);
        this.setAttribute("opacity", n * .33);
        this.setAttribute("style", "pointer-events: none");
        yr.push(this)
      });
      nt();
      o("contextset", dt)
    };
    this.clear = function () {
      p.clear();
      nt();
      u.clearSvgContentElement();
      u.current_drawing_ = new svgedit.draw.Drawing(e, rr);
      u.createLayer("");
      u.undoMgr.resetUndoStack();
      c.initGroup();
      ht = c.getRubberBandBox();
      o("cleared")
    };
    this.linkControlPoints = p.linkControlPoints;
    this.getContentElem = function () {
      return e
    };
    this.getRootElem = function () {
      return f
    };
    this.getSelectedElems = function () {
      return i
    };
    wi = this.getResolution = function () {
      var n = e.getAttribute("width") / r,
        t = e.getAttribute("height") / r;
      return {
        w: n,
        h: t,
        zoom: r
      }
    };
    this.getZoom = function () {
      return r
    };
    this.getVersion = function () {
      return "svgcanvas.js ($Rev: 2199 $)"
    };
    this.setUiStrings = function (n) {
      $.extend(er, n.notification)
    };
    this.setConfig = function (n) {
      $.extend(k, n)
    };
    this.getTitle = function (n) {
      var r, t;
      if (n = n || i[0], n) {
        for (n = $(n).data("gsvg") || $(n).data("symbol") || n, r = n.childNodes, t = 0; t < r.length; t++)
          if (r[t].nodeName == "title") return r[t].textContent;
        return ""
      }
    };
    this.setGroupTitle = function (n) {
      var r = i[0],
        u, f, e, t;
      r = $(r).data("gsvg") || r;
      u = $(r).children("title");
      f = new l("Set Label");
      n.length ? u.length ? (t = u[0], f.addSubCommand(new vt(t, {
        "#text": t.textContent
      })), t.textContent = n) : (t = bt.createElementNS(ft, "title"), t.textContent = n, $(r).prepend(t), f.addSubCommand(new ut(t))) : (e = u.nextSibling, f.addSubCommand(new wt(u[0], e, r)), u.remove());
      h(f)
    };
    this.getDocumentTitle = function () {
      return u.getTitle(e)
    };
    this.setDocumentTitle = function (n) {
      for (var r = e.childNodes, t = !1, u = "", f = new l("Change Image Title"), i = 0; i < r.length; i++)
        if (r[i].nodeName == "title") {
          t = r[i];
          u = t.textContent;
          break
        } t || (t = bt.createElementNS(ft, "title"), e.insertBefore(t, e.firstChild));
      n.length ? t.textContent = n : t.parentNode.removeChild(t);
      f.addSubCommand(new vt(t, {
        "#text": u
      }));
      h(f)
    };
    this.getEditorNS = function (n) {
      return n && e.setAttribute("xmlns:se", iu), iu
    };
    this.setResolution = function (n, t) {
      var w = wi(),
        c = w.w,
        a = w.h,
        i, s, v, y, p, b, k;
      if (n == "fit")
        if (s = getStrokedBBox(), s) i = new l("Fit Canvas to Content"), v = wr(), ti(v), y = [], p = [], $.each(v, function () {
          y.push(s.x * -1);
          p.push(s.y * -1)
        }), b = u.moveSelectedElements(y, p, !0), i.addSubCommand(b), nt(), n = Math.round(s.width), t = Math.round(s.height);
        else return !1;
      return (n != c || t != a) && (k = f.suspendRedraw(1e3), i || (i = new l("Change Image Dimensions")), n = ai("width", n), t = ai("height", t), e.setAttribute("width", n), e.setAttribute("height", t), this.contentW = n, this.contentH = t, i.addSubCommand(new vt(e, {
        width: c,
        height: a
      })), e.setAttribute("viewBox", [0, 0, n / r, t / r].join(" ")), i.addSubCommand(new vt(e, {
        viewBox: ["0 0", c, a].join(" ")
      })), h(i), u.undoMgr.resetUndoStack(), f.unsuspendRedraw(k), o("changed", [e])), !0
    };
    this.getOffset = function () {
      return $(e).attr(["x", "y"])
    };
    this.setBBoxZoom = function (n, t, f) {
      var o = .85,
        e, h = function (n) {
          if (!n) return !1;
          var r = Math.round(t / n.width * 100 * o) / 100,
            e = Math.round(f / n.height * 100 * o) / 100,
            i = Math.min(r, e);
          return u.setZoom(i), {
            zoom: i,
            bbox: n
          }
        },
        c, l, s;
      if (typeof n == "object") return (e = n, e.width == 0 || e.height == 0) ? (c = e.zoom ? e.zoom : r * e.factor, u.setZoom(c), {
        zoom: r,
        bbox: e
      }) : h(e);
      switch (n) {
        case "selection":
          if (!i[0]) return;
          l = $.map(i, function (n) {
            if (n) return n
          });
          e = getStrokedBBox(l);
          break;
        case "init":
          s = wi();
          o = .7;
          e = {
            width: s.w,
            height: s.h,
            x: 0,
            y: 0
          };
          var a = Math.round(t / e.width * 100 * o) / 100,
            v = Math.round(f / e.height * 100 * o) / 100,
            y = Math.min(a, v);
          y < .25 && (o = .9);
          break;
        case "canvas":
          s = wi();
          o = .9;
          e = {
            width: s.w,
            height: s.h,
            x: 0,
            y: 0
          };
          break;
        case "content":
          e = getStrokedBBox();
          break;
        case "layer":
          e = getStrokedBBox(wr(rt().getCurrentLayer()));
          break;
        default:
          return
      }
      return h(e)
    };
    this.setZoom = function (n) {
      var t = wi();
      e.setAttribute("viewBox", "0 0 " + t.w / n + " " + t.h / n);
      r = n;
      $.each(i, function (n, t) {
        t && c.requestSelector(t).resize()
      });
      p.zoomChange();
      tr("zoomChanged", n)
    };
    this.getMode = function () {
      return d
    };
    this.setMode = function (n) {
      $("#tool_zoom").unbind("touchstart");
      p.clear(!0);
      kt.clear();
      ni = i[0] && i[0].nodeName == "text" ? ui : s;
      d = n
    };
    this.getColor = function (n) {
      return ni[n]
    };
    this.setColor = function (n, t, r) {
      var f, e, u;
      for (s[n] = t, ni[n + "_paint"] = {
          type: "solidColor"
        }, f = [], e = i.length; e--;) u = i[e], u && (u.tagName == "g" ? svgedit.utilities.walkTree(u, function (n) {
        n.nodeName != "g" && f.push(n)
      }) : n == "fill" ? u.tagName != "polyline" && u.tagName != "line" && f.push(u) : f.push(u), yt(u));
      f.length > 0 && (r ? ei(n, t, f) : (pt(n, t, f), o("changed", f)))
    };
    var ii = function () {
        var n = e.getElementsByTagNameNS(ft, "defs");
        return n.length > 0 ? n = n[0] : (n = bt.createElementNS(ft, "defs"), e.firstChild ? e.insertBefore(n, e.firstChild.nextSibling) : e.appendChild(n)), n
      },
      cf = this.setGradient = function (n) {
        var f;
        if (ni[n + "_paint"] && ni[n + "_paint"].type != "solidColor") {
          var t = u[n + "Grad"],
            i = lf(t),
            r = ii();
          i ? t = i : (f = t, t = r.appendChild(bt.importNode(t, !0)), t.id = b());
          u.setColor(n, "url(#" + t.id + ")")
        }
      },
      lf = function (n) {
        for (var l = ii(), s = $(l).find("linearGradient, radialGradient"), h = s.length, e = ["r", "cx", "cy", "fx", "fy"], t, r, o, i, u, f; h--;) {
          if (t = s[h], n.tagName == "linearGradient") {
            if (n.getAttribute("x1") != t.getAttribute("x1") || n.getAttribute("y1") != t.getAttribute("y1") || n.getAttribute("x2") != t.getAttribute("x2") || n.getAttribute("y2") != t.getAttribute("y2")) continue
          } else {
            var a = $(n).attr(e),
              v = $(t).attr(e),
              c = !1;
            if ($.each(e, function (n, t) {
                a[t] != v[t] && (c = !0)
              }), c) continue
          }
          if (r = n.getElementsByTagNameNS(ft, "stop"), o = t.getElementsByTagNameNS(ft, "stop"), r.length == o.length) {
            for (i = r.length; i--;)
              if (u = r[i], f = o[i], u.getAttribute("offset") != f.getAttribute("offset") || u.getAttribute("stop-opacity") != f.getAttribute("stop-opacity") || u.getAttribute("stop-color") != f.getAttribute("stop-color")) break;
            if (i == -1) return t
          }
        }
        return null
      };
    this.setPaint = function (n, t) {
      var i = new $.jGraduate.Paint(t);
      this.setPaintOpacity(n, i.alpha / 100, !0);
      ni[n + "_paint"] = i;
      switch (i.type) {
        case "solidColor":
          this.setColor(n, i.solidColor != "none" ? "#" + i.solidColor : "none");
          break;
        case "linearGradient":
        case "radialGradient":
          u[n + "Grad"] = i[i.type];
          cf(n)
      }
    };
    this.getStrokeWidth = function () {
      return ni.stroke_width
    };
    this.setStrokeWidth = function (n) {
      var t, f, r;
      if (n == 0 && ["line", "path"].indexOf(d) >= 0) {
        u.setStrokeWidth(1);
        return
      }
      for (ni.stroke_width = n, t = [], f = i.length; f--;) r = i[f], r && (r.tagName == "g" ? svgedit.utilities.walkTree(r, function (n) {
        n.nodeName != "g" && t.push(n)
      }) : t.push(r));
      t.length > 0 && (pt("stroke-width", n, t), o("changed", i))
    };
    this.setStrokeAttr = function (n, t) {
      var r, f, u;
      for (s[n.replace("-", "_")] = t, r = [], f = i.length; f--;) u = i[f], u && (u.tagName == "g" ? svgedit.utilities.walkTree(u, function (n) {
        n.nodeName != "g" && r.push(n)
      }) : r.push(u));
      r.length > 0 && (pt(n, t, r), o("changed", i))
    };
    this.getStyle = function () {
      return s
    };
    this.getOpacity = function () {
      return s.opacity
    };
    this.setOpacity = function (n) {
      s.opacity = n;
      pt("opacity", n)
    };
    this.getFillOpacity = function () {
      return s.fill_opacity
    };
    this.getStrokeOpacity = function () {
      return s.stroke_opacity
    };
    this.setPaintOpacity = function (n, t, i) {
      s[n + "_opacity"] = t;
      i ? ei(n + "-opacity", t) : pt(n + "-opacity", t)
    };
    this.getBlur = function (n) {
        var i = 0,
          r, t;
        return n && (r = n.getAttribute("filter"), r && (t = et(n.id + "_blur"), t && (i = t.firstChild.getAttribute("stdDeviation")))), i
      },
      function () {
        function f() {
          var i = u.undoMgr.finishUndoableChange();
          t.addSubCommand(i);
          h(t);
          t = null;
          n = null
        }
        var t = null,
          n = null,
          r = !1;
        u.setBlurNoUndo = function (t) {
          if (!n) {
            u.setBlur(t);
            return
          }
          if (t === 0) ei("filter", ""), r = !0;
          else {
            var f = i[0];
            r && ei("filter", "url(#" + f.id + "_blur)");
            svgedit.browser.isWebkit() && (console.log("e", f), f.removeAttribute("filter"), f.setAttribute("filter", "url(#" + f.id + "_blur)"));
            ei("stdDeviation", t, [n.firstChild]);
            u.setBlurOffsets(n, t)
          }
        };
        u.setBlurOffsets = function (n, t) {
          t > 3 ? v(n, {
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, 100) : svgedit.browser.isWebkit() || (n.removeAttribute("x"), n.removeAttribute("y"), n.removeAttribute("width"), n.removeAttribute("height"))
        };
        u.setBlur = function (r, e) {
          var o, h, s, a, c;
          if (t) {
            f();
            return
          }
          if (o = i[0], h = o.id, n = et(h + "_blur"), r -= 0, s = new l, n ? r === 0 && (n = null) : (a = it({
              element: "feGaussianBlur",
              attr: {
                "in": "SourceGraphic",
                stdDeviation: r
              }
            }), n = it({
              element: "filter",
              attr: {
                id: h + "_blur"
              }
            }), n.appendChild(a), ii().appendChild(n), s.addSubCommand(new ut(n))), c = {
              filter: o.getAttribute("filter")
            }, r === 0) {
            o.removeAttribute("filter");
            s.addSubCommand(new vt(o, c));
            return
          }
          pt("filter", "url(#" + h + "_blur)");
          s.addSubCommand(new vt(o, c));
          u.setBlurOffsets(n, r);
          t = s;
          u.undoMgr.beginUndoableChange("stdDeviation", [n ? n.firstChild : null]);
          e && (u.setBlurNoUndo(r), f())
        }
      }();
    this.getBold = function () {
      var n = i[0];
      return n != null && n.tagName == "text" && i[1] == null ? n.getAttribute("font-weight") == "bold" : !1
    };
    this.setBold = function (n) {
      var t = i[0];
      t != null && t.tagName == "text" && i[1] == null && pt("font-weight", n ? "bold" : "normal");
      i[0].textContent || kt.setCursor()
    };
    this.getItalic = function () {
      var n = i[0];
      return n != null && n.tagName == "text" && i[1] == null ? n.getAttribute("font-style") == "italic" : !1
    };
    this.setItalic = function (n) {
      var t = i[0];
      t != null && t.tagName == "text" && i[1] == null && pt("font-style", n ? "italic" : "normal");
      i[0].textContent || kt.setCursor()
    };
    this.getFontFamily = function () {
      return ui.font_family
    };
    this.setFontFamily = function (n) {
      ui.font_family = n;
      pt("font-family", n);
      i[0] && !i[0].textContent && kt.setCursor();
      o("updateContextPanel")
    };
    this.setFontColor = function (n) {
      ui.fill = n;
      pt("fill", n)
    };
    this.getFontSize = function () {
      return ui.fill
    };
    this.getFontSize = function () {
      return ui.font_size
    };
    this.setFontSize = function (n) {
      ui.font_size = n;
      pt("font-size", n);
      i[0].textContent || kt.setCursor()
    };
    this.getText = function () {
      var n = i[0];
      return n == null ? "" : n.textContent
    };
    this.setTextContent = function (n, t) {
      t ? ei("#text", n) : pt("#text", n);
      kt.init(n);
      kt.setCursor()
    };
    this.setImageURL = function (n) {
      var t = i[0],
        r;
      if (t) {
        var f = $(t).attr(["width", "height"]),
          u = !f.width || !f.height,
          e = vi(t);
        if (e !== n) u = !0;
        else if (!u) return;
        r = new l("Change Image URL");
        yi(t, n);
        r.addSubCommand(new vt(t, {
          "#href": e
        }));
        u ? $(new Image).load(function () {
          var n = $(t).attr(["width", "height"]);
          $(t).attr({
            width: this.width,
            height: this.height
          });
          c.requestSelector(t).resize();
          r.addSubCommand(new vt(t, n));
          h(r);
          o("changed", [t])
        }).attr("src", n) : h(r)
      }
    };
    this.setLinkURL = function (n) {
      var t = i[0],
        r, u, f;
      if (t) {
        if (t.tagName !== "a")
          if (r = $(t).parents("a"), r.length) t = r[0];
          else return;
        (u = vi(t), u !== n) && (f = new l("Change Link URL"), yi(t, n), f.addSubCommand(new vt(t, {
          "#href": u
        })), h(f))
      }
    };
    this.setRectRadius = function (n) {
      var t = i[0],
        r;
      t != null && t.tagName == "rect" && (r = t.getAttribute("rx"), r != n && (t.setAttribute("rx", n), t.setAttribute("ry", n), h(new vt(t, {
        rx: r,
        ry: r
      }, "Radius")), o("changed", [t])))
    };
    this.makeHyperlink = function (n) {
      u.groupSelectedElements("a", n)
    };
    this.removeHyperlink = function () {
      u.ungroupSelectedElement()
    };
    this.setSegType = function (n) {
      p.setSegType(n)
    };
    this.convertToPath = function (n, t) {
      var yt, g, ot, a, rt, ct, ft, w, at, vt, ht;
      if (n == null) {
        yt = i;
        $.each(i, function (n, t) {
          t && u.convertToPath(t)
        });
        return
      }
      t || (g = new l("Convert element to Path"));
      ot = t ? {} : {
        fill: s.fill,
        "fill-opacity": s.fill_opacity,
        stroke: s.stroke,
        "stroke-width": s.stroke_width,
        "stroke-dasharray": s.stroke_dasharray,
        "stroke-linejoin": s.stroke_linejoin,
        "stroke-linecap": s.stroke_linecap,
        "stroke-opacity": s.stroke_opacity,
        opacity: s.opacity,
        visibility: "hidden"
      };
      $.each(["marker-start", "marker-end", "marker-mid", "filter", "clip-path"], function () {
        n.getAttribute(this) && (ot[this] = n.getAttribute(this))
      });
      a = it({
        element: "path",
        attr: ot
      });
      rt = n.getAttribute("transform");
      rt && a.setAttribute("transform", rt);
      ct = n.id;
      ft = n.parentNode;
      n.nextSibling ? ft.insertBefore(a, n) : ft.appendChild(a);
      var d = "",
        st = function (n) {
          $.each(n, function (n, t) {
            var u = t[0],
              r = t[1],
              i;
            for (d += u, i = 0; i < r.length; i += 2) d += r[i] + "," + r[i + 1] + " "
          })
        },
        c = 1.81;
      switch (n.tagName) {
        case "ellipse":
        case "circle":
          var w = $(n).attr(["rx", "ry", "cx", "cy"]),
            v = w.cx,
            y = w.cy,
            r = w.rx,
            f = w.ry;
          n.tagName == "circle" && (r = f = $(n).attr("r"));
          st([
            ["M", [v - r, y]],
            ["C", [v - r, y - f / c, v - r / c, y - f, v, y - f]],
            ["C", [v + r / c, y - f, v + r, y - f / c, v + r, y]],
            ["C", [v + r, y + f / c, v + r / c, y + f, v, y + f]],
            ["C", [v - r / c, y + f, v - r, y + f / c, v - r, y]],
            ["Z", []]
          ]);
          break;
        case "path":
          d = n.getAttribute("d");
          break;
        case "line":
          w = $(n).attr(["x1", "y1", "x2", "y2"]);
          d = "M" + w.x1 + "," + w.y1 + "L" + w.x2 + "," + w.y2;
          break;
        case "polyline":
        case "polygon":
          d = "M" + n.getAttribute("points");
          break;
        case "rect":
          var lt = $(n).attr(["rx", "ry"]),
            r = lt.rx,
            f = lt.ry,
            et = n.getBBox(),
            e = et.x,
            o = et.y,
            b = et.width,
            k = et.height,
            c = 4 - c;
          r || f ? st([
            ["M", [e, o + f]],
            ["C", [e, o + f / c, e + r / c, o, e + r, o]],
            ["L", [e + b - r, o]],
            ["C", [e + b - r / c, o, e + b, o + f / c, e + b, o + f]],
            ["L", [e + b, o + k - f]],
            ["C", [e + b, o + k - f / c, e + b - r / c, o + k, e + b - r, o + k]],
            ["L", [e + r, o + k]],
            ["C", [e + r / c, o + k, e, o + k - f / c, e, o + k - f]],
            ["L", [e, o + f]],
            ["Z", []]
          ]) : st([
            ["M", [e, o]],
            ["L", [e + b, o]],
            ["L", [e + b, o + k]],
            ["L", [e, o + k]],
            ["L", [e, o]],
            ["Z", []]
          ]);
          break;
        default:
          a.parentNode.removeChild(a)
      }
      if (d && a.setAttribute("d", d), t) {
        p.resetOrientation(a);
        ht = !1;
        try {
          ht = a.getBBox()
        } catch (pt) {}
        return a.parentNode.removeChild(a), ht
      }
      rt && (at = tt(a), hi(at) && p.resetOrientation(a));
      vt = n.nextSibling;
      g.addSubCommand(new wt(n, vt, ft));
      g.addSubCommand(new ut(a));
      nt();
      n.parentNode.removeChild(n);
      a.setAttribute("id", ct);
      a.removeAttribute("visibility");
      ti([a], !0);
      h(g)
    };
    ei = function (n, t, e) {
      var it = f.suspendRedraw(1e3),
        rt, o, h, ht, v, s, l, b;
      if (d == "pathedit") {
        try {
          rt = svgedit.path.path.elem.pathSegList.numberOfItems
        } catch (at) {}
        p.moveNode(n, t)
      }
      for (var e = e || i, y = e.length, ut = ["g", "polyline", "path"], ft = ["transform", "opacity", "filter"]; y--;)
        if (o = e[y], o != null) {
          if (d === "textedit" && n !== "#text" && o.textContent.length && kt.toSelectMode(o), (n === "x" || n === "y") && ut.indexOf(o.tagName) >= 0) {
            var w = getStrokedBBox([o]),
              et = n === "x" ? t - w.x : 0,
              ot = n === "y" ? t - w.y : 0;
            u.moveSelectedElements(et * r, ot * r, !0);
            continue
          }
          if (o.tagName === "g" && ft.indexOf(n) >= 0, h = n === "#text" ? o.textContent : o.getAttribute(n), h == null && (h = ""), h !== String(t)) {
            if (n == "#text" ? (ht = svgedit.utilities.getBBox(o).width, o.textContent = t, /rotate/.test(o.getAttribute("transform")) && (o = br(o))) : n == "#href" ? yi(o, t) : n == "transform" ? (h == "" && o.setAttribute(n, "rotate(0)"), t ? o.setAttribute(n.toLowerCase(), t) : o.removeAttribute("transform")) : o.setAttribute(n.toLowerCase(), t), svgedit.browser.isGecko() && o.nodeName === "text" && /rotate/.test(o.getAttribute("transform")) && ((t + "").indexOf("url") === 0 || ["font-size", "font-family", "x", "y"].indexOf(n) >= 0 && o.textContent) && (o = br(o)), i.indexOf(o) >= 0) {
              if (!o.parentNode) return;
              c.requestSelector(o).resize()
            }
            if (v = gt(o), v != 0 && n != "transform")
              for (s = tt(o), l = s.numberOfItems; l--;)
                if (b = s.getItem(l), b.type == 4) {
                  s.removeItem(l);
                  var a = svgedit.utilities.getBBox(o),
                    k = st(a.x + a.width / 2, a.y + a.height / 2, g(s).matrix),
                    ct = k.x,
                    lt = k.y,
                    nt = f.createSVGTransform();
                  nt.setRotate(v, ct, lt);
                  s.insertItemBefore(nt, l);
                  break
                }
          }
        } f.unsuspendRedraw(it)
    };
    pt = this.changeSelectedAttribute = function (n, t, r) {
      var r = r || i,
        e, f;
      u.undoMgr.beginUndoableChange(n, r);
      e = r.length;
      ei(n, t, r);
      f = u.undoMgr.finishUndoableChange();
      f.isEmpty() || h(f)
    };
    this.deleteSelectedElements = function () {
      for (var f = new l("Delete Elements"), v = i.length, e = [], u, n, t, s, a, r = 0; r < v; ++r) {
        if (u = i[r], u == null) break;
        n = u.parentNode;
        t = u;
        c.releaseSelector(t);
        svgedit.path.removePath_(t.id);
        n.tagName === "a" && n.childNodes.length === 1 && (t = n, n = n.parentNode);
        s = t.nextSibling;
        a = n.removeChild(t);
        e.push(u);
        i[r] = null;
        f.addSubCommand(new wt(a, s, n))
      }
      f.isEmpty() || h(f);
      o("changed", e);
      nt()
    };
    this.cutSelectedElements = function () {
      for (var f = new l("Cut Elements"), y = i.length, e = [], t, s, r, a, v, n = 0; n < y; ++n) {
        if (t = i[n], t == null) break;
        s = t.parentNode;
        r = t;
        c.releaseSelector(r);
        svgedit.path.removePath_(r.id);
        a = r.nextSibling;
        v = s.removeChild(r);
        e.push(t);
        i[n] = null;
        f.addSubCommand(new wt(v, a, s))
      }
      f.isEmpty() || h(f);
      o("changed", e);
      nt();
      u.clipBoard = e
    };
    this.copySelectedElements = function () {
      for (var r = [], e = i.length, t, f, n = 0; n < e; n++)(t = i[n], t) && (f = pi(t), r.push(f));
      u.clipBoard = r
    };
    this.pasteElements = function (n, t, i) {
      var p = u.clipBoard,
        a = p.length,
        r, s, e, f, v, y, k;
      if (a) {
        for (r = [], s = new l("Paste elements"); a--;)(e = p[a], e) && (f = pi(e), f.removeAttribute("opacity"), et(e.id) || (f.id = e.id), r.push(f), (dt || rt().getCurrentLayer()).appendChild(f), s.addSubCommand(new ut(f)));
        if (ci(r), n !== "in_place") {
          n ? n === "point" && (v = t, y = i) : (v = ou.x, y = ou.y);
          var c = getStrokedBBox(r),
            d = v - (c.x + c.width / 2),
            g = y - (c.y + c.height / 2),
            w = [],
            b = [];
          $.each(r, function () {
            w.push(d);
            b.push(g)
          });
          k = u.moveSelectedElements(w, b, !1);
          s.addSubCommand(k)
        }
        h(s);
        o("changed", r)
      }
    };
    this.groupSelectedElements = function (n) {
      var r, e, o, t, c, a;
      n || (n = "g");
      r = "";
      switch (n) {
        case "a":
          r = "Make hyperlink";
          e = "";
          arguments.length > 1 && (e = arguments[1]);
          break;
        default:
          n = "g";
          r = "Group Elements"
      }
      var s = b(),
        u = new l(r + "|" + s),
        f = it({
          element: n,
          attr: {
            id: s
          }
        });
      for (n === "a" && yi(f, e), u.addSubCommand(new ut(f)), o = i.length; o--;)(t = i[o], t != null) && (t.parentNode.tagName === "a" && t.parentNode.childNodes.length === 1 && (t = t.parentNode), c = t.nextSibling, a = t.parentNode, f.appendChild(t), u.addSubCommand(new fi(t, c, a)));
      u.isEmpty() || h(u);
      ci([f], !0)
    };
    gr = this.pushGroupProperties = function (n, t) {
      for (var rt = n.childNodes, ni = rt.length, ut = n.getAttribute("transform"), v = tt(n), ti = g(v).matrix, y = new l("Push group properties"), h = 0, ft = gt(n), c = $(n).attr(["filter", "opacity"]), e, p, i, ri, et, o, ot, ht, r, a, k, nt, it, s, h = 0; h < ni; h++)
        if ((i = rt[h], ct = i.getAttribute("transform"), i.nodeType === 1) && (c.opacity !== null && c.opacity !== 1 && (ri = i.getAttribute("opacity") || 1, et = Math.round((i.getAttribute("opacity") || 1) * c.opacity * 100) / 100, pt("opacity", et, [i])), c.filter && (o = this.getBlur(i), ot = o, p || (p = this.getBlur(n)), o ? o = +p + +o : o === 0 && (o = p), ot ? e = di(i.getAttribute("filter")) : e ? (e = pi(e), ii().appendChild(e)) : e = di(c.filter), ht = e.firstChild.tagName === "feGaussianBlur" ? "blur" : "filter", e.id = i.id + "_" + ht, pt("filter", "url(#" + e.id + ")", [i]), o && (pt("stdDeviation", o, [e.firstChild]), u.setBlurOffsets(e, o))), r = tt(i), ~i.tagName.indexOf("Gradient") && (r = null), r) && i.tagName !== "defs" && v.numberOfItems) {
          if (ft && v.numberOfItems == 1) {
            var ui = v.getItem(0).matrix,
              lt = f.createSVGMatrix(),
              d = gt(i);
            d && (lt = r.getItem(0).matrix);
            var w = svgedit.utilities.getBBox(i),
              fi = g(r).matrix,
              wt = st(w.x + w.width / 2, w.y + w.height / 2, fi),
              bt = ft + d,
              b = f.createSVGTransform();
            b.setRotate(bt, wt.x, wt.y);
            a = at(ui, lt, b.matrix.inverse());
            d && r.removeItem(0);
            bt && (r.numberOfItems ? r.insertItemBefore(b, 0) : r.appendItem(b));
            (a.e || a.f) && (k = f.createSVGTransform(), k.setTranslate(a.e, a.f), r.numberOfItems ? r.insertItemBefore(k, 0) : r.appendItem(k))
          } else {
            nt = i.getAttribute("transform");
            s = {};
            s.transform = nt ? nt : "";
            var kt = f.createSVGTransform(),
              dt = g(r).matrix,
              ei = dt.inverse(),
              oi = at(ei, ti, dt);
            kt.setMatrix(oi);
            r.appendItem(kt)
          }
          it = yt(i);
          it && y.addSubCommand(it)
        } return ut && (s = {}, s.transform = ut, n.setAttribute("transform", ""), n.removeAttribute("transform"), y.addSubCommand(new vt(n, s))), ct = null, t && !y.isEmpty() ? y : void 0
    };
    this.regroupElement = function (n) {
      var i, o, a, v, e, t, f, r;
      if (n.tagName === "g") {
        i = new l("Regroup Elements");
        o = gr(n, !0);
        o && i.addSubCommand(o);
        for (var s = n.parentNode, y = n.nextSibling, c = new Array(n.childNodes.length), u = 0; n.firstChild;) {
          var t = n.firstChild,
            f = t.nextSibling,
            r = t.parentNode;
          if (t.tagName === "title") {
            a = t.nextSibling;
            i.addSubCommand(new wt(t, a, r));
            r.removeChild(t);
            continue
          }
          c[u++] = t = s.insertBefore(t, y);
          i.addSubCommand(new fi(t, f, r))
        }
        for (v = n.nextSibling, n = s.removeChild(n), i.addSubCommand(new wt(n, v, s)), e = it({
            element: "g",
            attr: {
              id: b()
            }
          }), i.addSubCommand(new ut(e)), u = c.length; u--;)(t = c[u], t != null) && (f = t.nextSibling, r = t.parentNode, e.appendChild(t), i.addSubCommand(new fi(t, f, r)));
        return i.isEmpty() || h(i), e
      }
      return n
    };
    this.ungroupSelectedElement = function () {
      var n = i[0],
        u, f, r, e, a, v, y;
      if ($(n).data("gsvg") || $(n).data("symbol")) {
        sf(n);
        return
      }
      if (n.tagName === "use") {
        u = et(vi(n).substr(1));
        $(n).data("symbol", u).data("ref", u);
        sf(n);
        return
      }
      if (f = $(n).parents("a"), f.length && (n = f[0]), n.tagName === "g" || n.tagName === "a") {
        r = new l("Ungroup Elements");
        e = gr(n, !0);
        e && r.addSubCommand(e);
        for (var o = n.parentNode, p = n.nextSibling, c = new Array(n.childNodes.length), w = 0; n.firstChild;) {
          var t = n.firstChild,
            b = t.nextSibling,
            s = t.parentNode;
          if (t.tagName === "title") {
            a = t.nextSibling;
            r.addSubCommand(new wt(t, a, s));
            s.removeChild(t);
            continue
          }
          c[w++] = t = o.insertBefore(t, p);
          t.getAttribute("data-rsparams") && (v = {
            "data-rsparams": t.getAttribute("data-rsparams"),
            "fcm-line-type": t.getAttribute("fcm-line-type")
          }, t.removeAttribute("data-rsparams"), t.setAttribute("fcm-line-type", 3), r.addSubCommand(new vt(t, v)));
          r.addSubCommand(new fi(t, b, s))
        }
        nt();
        y = n.nextSibling;
        n = o.removeChild(n);
        r.addSubCommand(new wt(n, y, o));
        r.isEmpty() || h(r);
        ti(c)
      }
    };
    this.moveToTopSelectedElement = function () {
      var t = i[0];
      if (t != null) {
        var n = t,
          u = n.parentNode,
          r = n.nextSibling;
        n = n.parentNode.appendChild(n);
        r != n.nextSibling && (h(new fi(n, r, u, "top")), o("changed", [n]))
      }
    };
    this.moveToBottomSelectedElement = function () {
      var r = i[0];
      if (r != null) {
        var n = r,
          f = n.parentNode,
          u = n.nextSibling,
          t = n.parentNode.firstChild;
        t.tagName == "title" && (t = t.nextSibling);
        t.tagName == "defs" && (t = t.nextSibling);
        n = n.parentNode.insertBefore(n, t);
        u != n.nextSibling && (h(new fi(n, u, f, "bottom")), o("changed", [n]))
      }
    };
    this.moveUpDownSelected = function (n) {
      var r = i[0],
        u, e, f;
      if (r && (lt = [], f = $(pr(getStrokedBBox([r]))).toArray(), n == "Down" && f.reverse(), $.each(f, function () {
          if (!e) {
            this == r && (e = !0);
            return
          }
          return u = this, !1
        }), u)) {
        var t = r,
          c = t.parentNode,
          s = t.nextSibling;
        $(u)[n == "Down" ? "before" : "after"](t);
        s != t.nextSibling && (h(new fi(t, s, c, "Move " + n)), o("changed", [t]))
      }
    };
    this.moveSelectedElements = function (n, t, u) {
      var s, a, y, p;
      n.constructor != Array && (n /= r, t /= r);
      for (var u = u || !0, v = new l("position"), e = i.length; e--;) s = i[e], s != null && (ct = e < bi.length ? bi[e] : null, a = f.createSVGTransform(), y = tt(s), n.constructor == Array ? a.setTranslate(n[e], t[e]) : a.setTranslate(n, t), y.numberOfItems ? y.insertItemBefore(a, 0) : y.appendItem(a), p = yt(s), p && v.addSubCommand(p), bi[e] = s.getAttribute("transform"), c.requestSelector(s).resize());
      if (!v.isEmpty()) return u && h(v), o("changed", i), v
    };
    this.cloneSelectedElements = function (n, t) {
      for (var e = new l("Clone Elements"), o = i.length, f, u, r = 0; r < o; ++r)
        if (u = i[r], u == null) break;
      for (f = i.slice(0, r), this.clearSelection(!0), r = f.length; r--;) u = f[r] = pi(f[r]), (dt || rt().getCurrentLayer()).appendChild(u), e.addSubCommand(new ut(u));
      e.isEmpty() || (ti(f.reverse()), this.moveSelectedElements(n, t, !1), h(e))
    };
    this.alignSelectedElements = function (n, t) {
      var f = [],
        o = Number.MAX_VALUE,
        s = Number.MIN_VALUE,
        h = Number.MAX_VALUE,
        c = Number.MIN_VALUE,
        a = Number.MIN_VALUE,
        v = Number.MIN_VALUE,
        w = i.length,
        k, y, p, r, b, e;
      if (w) {
        for (k = new l("align"), r = 0; r < w; ++r) {
          if (i[r] == null) break;
          b = i[r];
          f[r] = getStrokedBBox([b]);
          switch (t) {
            case "smallest":
              ((n == "l" || n == "c" || n == "r") && (a == Number.MIN_VALUE || a > f[r].width) || (n == "t" || n == "m" || n == "b") && (v == Number.MIN_VALUE || v > f[r].height)) && (o = f[r].x, h = f[r].y, s = f[r].x + f[r].width, c = f[r].y + f[r].height, a = f[r].width, v = f[r].height);
              break;
            case "largest":
              ((n == "l" || n == "c" || n == "r") && (a == Number.MIN_VALUE || a < f[r].width) || (n == "t" || n == "m" || n == "b") && (v == Number.MIN_VALUE || v < f[r].height)) && (o = f[r].x, h = f[r].y, s = f[r].x + f[r].width, c = f[r].y + f[r].height, a = f[r].width, v = f[r].height);
              break;
            default:
              f[r].x < o && (o = f[r].x);
              f[r].y < h && (h = f[r].y);
              f[r].x + f[r].width > s && (s = f[r].x + f[r].width);
              f[r].y + f[r].height > c && (c = f[r].y + f[r].height)
          }
        }
        for (t == "page" && (o = 0, h = 0, s = u.contentW, c = u.contentH), y = new Array(w), p = new Array(w), r = 0; r < w; ++r) {
          if (i[r] == null) break;
          b = i[r];
          e = f[r];
          y[r] = 0;
          p[r] = 0;
          switch (n) {
            case "l":
              y[r] = o - e.x;
              break;
            case "c":
              y[r] = (o + s) / 2 - (e.x + e.width / 2);
              break;
            case "r":
              y[r] = s - (e.x + e.width);
              break;
            case "t":
              p[r] = h - e.y;
              break;
            case "m":
              p[r] = (h + c) / 2 - (e.y + e.height / 2);
              break;
            case "b":
              p[r] = c - (e.y + e.height)
          }
        }
        this.moveSelectedElements(y, p)
      }
    };
    this.contentW = wi().w;
    this.contentH = wi().h;
    this.updateCanvas = function (n, t) {
      var i, u;
      f.setAttribute("width", n);
      f.setAttribute("height", t);
      f.setAttribute("x", n);
      f.setAttribute("y", t);
      var a = $("#canvasBackground")[0],
        h = e.getAttribute("x"),
        l = e.getAttribute("y"),
        o = n / 2 - this.contentW * r / 2,
        s = t / 2 - this.contentH * r / 2;
      return v(e, {
        width: this.contentW * r,
        height: this.contentH * r,
        x: o,
        y: s,
        viewBox: "0 0 " + this.contentW + " " + this.contentH
      }), v(a, {
        width: e.getAttribute("width"),
        height: e.getAttribute("height"),
        x: o,
        y: s
      }), i = et("background_image"), i && (u = i.getAttribute("data-matid"), u == "7" ? v(i, {
        x: "-17%",
        y: "-62.85%",
        width: "244.366197%",
        height: "443.405319%"
      }) : u == "6" ? v(i, {
        x: "-39.2%",
        y: "-41.6%",
        width: "396.148936%",
        height: "293.521831%"
      }) : u == "5" ? v(i, {
        x: "-8.85%",
        y: "-28.13%",
        width: "127.106227%",
        height: "198.476667%"
      }) : u == "4" ? v(i, {
        x: "-11.50%",
        y: "-21.64%",
        width: "165.238095%",
        height: "152.674359%"
      }) : u == "3" ? v(i, {
        x: "-8.30%",
        y: "-28.945%",
        width: "119.2745%",
        height: "204.3139%"
      }) : u == "2" ? v(i, {
        x: "-11.840%",
        y: "-20.275%",
        width: "170.1417%",
        height: "143.2303%"
      }) : u == "1" ? v(i, {
        x: "-8.140%",
        y: "-9.785%",
        width: "116.995%",
        height: "119.56%"
      }) : v(i, {
        x: "-8.140%",
        y: "-20.260%",
        width: "116.995%",
        height: "140.515%"
      })), c.selectorParentGroup.setAttribute("transform", "translate(" + o + "," + s + ")"), {
        x: o,
        y: s,
        old_x: h,
        old_y: l,
        d_x: o - h,
        d_y: s - l
      }
    };
    this.setBackground = function (n, t) {
      var r = et("canvasBackground"),
        u = $(r).find("rect")[0],
        i = et("background_image");
      u.setAttribute("fill", n);
      t ? (i || (i = bt.createElementNS(ft, "image"), v(i, {
        id: "background_image",
        width: "100%",
        height: "100%",
        preserveAspectRatio: "xMinYMin",
        style: "pointer-events:none"
      })), yi(i, t), r.appendChild(i)) : i && i.parentNode.removeChild(i)
    };
    this.setMatImage = function (n, t) {
      var o = f.suspendRedraw(1e3),
        u = et("canvasBackground"),
        r = $(u).find("rect")[0],
        i = et("background_image"),
        e;
      if (t) {
        if (i) {
          if (e = vi(i), t == e) return;
          i.parentNode.removeChild(i)
        }
        i = bt.createElementNS(ft, "image");
        n == 7 ? v(i, {
          id: "background_image",
          x: "-17%",
          y: "-62.85%",
          width: "244.366197%",
          height: "443.405319%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "7"
        }) : n == 6 ? v(i, {
          id: "background_image",
          x: "-39.2%",
          y: "-41.6%",
          width: "396.148936%",
          height: "293.521831%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "6"
        }) : n == 5 ? v(i, {
          id: "background_image",
          x: "-8.85%",
          y: "-28.13%",
          width: "127.106227%",
          height: "198.476667%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "5"
        }) : n == 4 ? v(i, {
          id: "background_image",
          x: "-11.50%",
          y: "-21.64%",
          width: "165.238095%",
          height: "152.674359%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "4"
        }) : n == 3 ? v(i, {
          id: "background_image",
          x: "-8.30%",
          y: "-28.945%",
          width: "119.2745%",
          height: "204.3139%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "3"
        }) : n == 2 ? v(i, {
          id: "background_image",
          x: "-11.840%",
          y: "-20.275%",
          width: "170.1417%",
          height: "143.2303%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "2"
        }) : n == 1 ? v(i, {
          id: "background_image",
          x: "-8.140%",
          y: "-9.875%",
          width: "116.995%",
          height: "119.56%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "1"
        }) : v(i, {
          id: "background_image",
          x: "-8.140%",
          y: "-20.260%",
          width: "116.995%",
          height: "140.515%",
          preserveAspectRatio: "xMidYMid",
          style: "pointer-events:none;",
          "data-matid": "0"
        });
        yi(i, t);
        u.insertBefore(i, r);
        r.setAttribute("fill", "none");
        r.setAttribute("stroke", "#FF0000");
        r.setAttribute("stroke-dasharray", "3");
        f.unsuspendRedraw(o)
      } else i && i.parentNode.removeChild(i), r.setAttribute("fill", "#FFFFFF"), r.setAttribute("stroke", "#000000"), r.removeAttribute("stroke-dasharray")
    };
    this.cycleElement = function (n) {
      var e = i[0],
        f = !1,
        r = wr(dt || rt().getCurrentLayer()),
        u, t;
      if (r.length) {
        if (e == null) t = n ? r.length - 1 : 0, f = r[t];
        else
          for (u = r.length; u--;)
            if (r[u] == e) {
              t = n ? u - 1 : u + 1;
              t >= r.length ? t = 0 : t < 0 && (t = r.length - 1);
              f = r[t];
              break
            } ci([f], !0);
        o("selected", i)
      }
    };
    this.clear();
    this.getPrivateMethods = function () {
      return {
        addCommandToHistory: h,
        setGradient: cf,
        addSvgElementFromJson: it,
        assignAttributes: v,
        BatchCommand: l,
        call: o,
        ChangeElementCommand: vt,
        copyElem: pi,
        ffClone: br,
        findDefs: ii,
        findDuplicateGradient: lf,
        getElem: et,
        getId: si,
        getIntersectionList: pr,
        getMouseTarget: ir,
        getNextId: b,
        getPathBBox: pf,
        getUrlFromAttr: cr,
        hasMatrixTransform: hi,
        identifyLayers: gi,
        InsertElementCommand: ut,
        isIdentity: svgedit.math.isIdentity,
        logMatrix: kf,
        matrixMultiply: at,
        MoveElementCommand: fi,
        preventClickDefault: dr,
        recalculateAllSelectedDimensions: hu,
        recalculateDimensions: yt,
        remapElement: kr,
        RemoveElementCommand: wt,
        removeUnusedDefElems: of ,
        round: tf,
        runExtensions: tr,
        sanitizeSvg: wf,
        SVGEditTransformList: svgedit.transformlist.SVGTransformList,
        toString: toString,
        transformBox: svgedit.math.transformBox,
        transformListToTransform: g,
        transformPoint: st,
        walkTree: svgedit.utilities.walkTree
      }
    };
    this.getSizeScreenToDoc = function (n, t) {
      return {
        width: n * r,
        height: t * r
      }
    };
    this.getPointScreenToCanvas = function (n, t) {
      var f, o, u, i;
      return a = e.getScreenCTM(), oi >= 20 && (f = parseFloat(e.getAttribute("x")), o = parseFloat(e.getAttribute("y")), oi >= 23 && (a = a.translate(f, o)), a = a.scale(r)), a = a.inverse(), u = st(n, t, a), i = u.x * r, y = u.y * r, k.gridSnapping && (i = w(i), y = w(y)), {
        x: i,
        y: y
      }
    };
    this.getSelectedSVGString = function (n) {
      for (var r = "", u = i.length, t; u--;)(t = i[u], t != null) && (r += this.svgToString(t, 0, n));
      return r
    };
    this.insertRhineStoneElements = function (n, t, r, u) {
      var et = f.suspendRedraw(1e3),
        v = new l("rhinestone-1"),
        rt, ft, k, s, a, d, p, w, tt, e, g, o, y;
      if (r)
        if (r === "selected")
          for (rt = i.length, ft = [], e = 0; e < rt; ++e) {
            if (k = i[e], k == null) break;
            s = k.parentNode;
            a = k;
            c.releaseSelector(a);
            svgedit.path.removePath_(a.id);
            s.tagName === "a" && s.childNodes.length === 1 && (a = s, s = s.parentNode);
            d = a.nextSibling;
            p = s.removeChild(a);
            ft.push(k);
            i[e] = null;
            v.addSubCommand(new wt(p, d, s))
          } else s = r.parentNode, a = r, c.releaseSelector(a), svgedit.path.removePath_(a.id), d = a.nextSibling, p = s.removeChild(a), svgedit.utilities.walkTree(p, function (n) {
            n.removeAttribute("data-rscircle")
          }), v.addSubCommand(new wt(p, d, s));
      for (w = null, tt = new Array(1), e = 0; e < n.length; e++)
        if (n[e].element == "g") {
          for (w = it({
              element: "g",
              attr: {
                id: b()
              }
            }), u && this.setRotationAngle(u, !0, w), v.addSubCommand(new ut(w)), g = 0; g < n[e].elements.length; g++) o = n[e].elements[g], y = o.element === "path" ? it({
            element: o.element,
            curStyles: !1,
            attr: {
              id: b(),
              d: o.d,
              "stroke-width": o.stroke_width,
              stroke: o.stroke_color,
              fill: o.fill_color,
              "fcm-line-type": o.fcmline_type,
              "data-fcm-dashtype": o.fcm_dashtype,
              "data-rsparams": o.dataRsparams
            }
          }) : it({
            element: o.element,
            curStyles: !1,
            attr: {
              id: b(),
              r: o.r.toFixed(6),
              cx: o.cx,
              cy: o.cy,
              "stroke-width": o.stroke_width,
              stroke: o.stroke_color,
              fill: o.fill_color,
              ss: o.ss,
              "fcm-line-type": o.fcmline_type,
              "data-fcm-dashtype": o.fcm_dashtype
            }
          }), w.appendChild(y), v.addSubCommand(new ut(y));
          nt(!0);
          tt.push(w)
        } else n[e].element == "circle" && (y = it({
          element: n[e].element,
          curStyles: !1,
          attr: {
            id: b(),
            r: n[e].r.toFixed(6),
            cx: n[e].cx,
            cy: n[e].cy,
            ss: n[e].ss,
            "stroke-width": n[e].stroke_width,
            stroke: n[e].stroke_color,
            fill: n[e].fill_color,
            "fcm-line-type": n[e].fcmline_type,
            "data-fcm-dashtype": n[e].fcm_dashtype
          }
        }), v.addSubCommand(new ut(y)));
      v.isEmpty() || (t ? du(v) : h(v));
      ti(tt);
      f.unsuspendRedraw(et)
    };
    this.importMyProjectCore = function (n) {
      for (var e = new l("Import MyProject"), o = [], i, r, u, f, t = 0; t < n.childNodes.length; t++)
        if (i = n.childNodes[t], i.tagName == "g") {
          for (r = 0; r < i.childNodes.length; r++)
            if (u = i.childNodes[r], u.nodeType == 1) {
              if (u.nodeName == "title") continue;
              f = pi(u);
              rt().getCurrentLayer().appendChild(f);
              e.addSubCommand(new ut(f));
              o.push(f)
            } break
        } e.isEmpty() || (this.clearSelection(!0), ti(o), h(e))
    };
    nu = !1;
    this.importPatternCore = function (n, t, u, e) {
      var w, ft, k, ot, s, d, c, nt, g, rt, et;
      if (!nu) {
        e && (t *= r, u *= r);
        setTimeout(function () {
          nu = !1
        }, 500);
        nu = !0;
        svgCanvas.setMode("select");
        var v = new l("importPattern"),
          s = null,
          y = null,
          st = parseInt(n.attr("data-cat")),
          a = n.find("path,circle");
        if (a.length > 0)
          for (a.length > 1 && (y = it({
              element: "g",
              attr: {
                id: b()
              }
            }), v.addSubCommand(new ut(y))), c = 0; c < a.length; c++) a[c].nodeName == "path" ? (w = a.eq(c).attr("d"), s = it({
            element: "path",
            curStyles: !1,
            attr: {
              x: t,
              y: u,
              id: b(),
              d: w,
              fill: "none",
              stroke: "#000000",
              "stroke-width": 2
            }
          }), st == 9 && (ft = a.eq(c).attr("stroke-width"), s.setAttribute("stroke", "#4755F5"), ft == "3" && s.setAttribute("fcm-line-type", 2), ft == "2" && (s.setAttribute("fcm-line-type", 6), s.setAttribute("fill", "#4755F5"))), /[a-z]/.test(w) && (w = p.convertPath(s), s.setAttribute("d", w), p.fixEnd(s))) : (k = a.eq(c), s = it({
            element: "circle",
            curStyles: !1,
            attr: {
              id: b(),
              r: k.attr("r").toFixed(6),
              cx: k.attr("cx"),
              cy: k.attr("cy"),
              fill: "#ff409f",
              stroke: "#000000",
              "stroke-width": 2,
              ss: k.attr("ss")
            }
          })), y && s && y.appendChild(s), v.addSubCommand(new ut(s));
        else ot = n.find("text"), s = it({
          element: "text",
          curStyles: !1,
          attr: {
            x: 0,
            y: 190,
            id: b(),
            "font-size": 200,
            "font-family": ot.attr("font-family"),
            "text-anchor": "start",
            "xml:space": "preserve",
            fill: "none",
            stroke: "#000000",
            "stroke-width": 2
          }
        }), s.textContent = "text", v.addSubCommand(new ut(s));
        for (d = null, d = y ? [y] : [s], t.constructor != Array && (t /= r, u /= r), c = d.length; c--;) nt = d[c], nt != null && (g = f.createSVGTransform(), rt = tt(nt), t.constructor == Array ? g.setTranslate(t[c], u[c]) : g.setTranslate(t, u), rt.numberOfItems ? rt.insertItemBefore(g, 0) : rt.appendItem(g), et = yt(nt), et && v.addSubCommand(et));
        v.isEmpty() || (ci(d, !0), o("changed", i), h(v))
      }
    };
    this.insertFOTTemplateImage = function (n, t, i, r, u, f, e) {
      var c, l, a, y, v, p, w;
      if (r |= 0, u |= 0, f == 0 ? (c = t, l = i) : (c = t * 96 / f, l = i * 96 / e), a = svgCanvas.addSvgElementFromJson({
          element: "image",
          attr: {
            x: r,
            y: u,
            width: c,
            height: l,
            id: "data-fotimg",
            style: "pointer-events:inherit",
            preserveAspectRatio: "none"
          }
        }), a != null) {
        var s = a,
          k = s.parentNode,
          b = s.nextSibling,
          h = s.parentNode.firstChild;
        h.tagName == "title" && (h = h.nextSibling);
        h.tagName == "defs" && (h = h.nextSibling);
        s = s.parentNode.insertBefore(s, h);
        b != s.nextSibling && o("changed", [s])
      }
      return y = n, f != 0 && (v = document.createElement("canvas"), p = new Image, p.src = n, w = v.getContext("2d"), v.width = c, v.height = l, w.drawImage(p, 0, 0, t, i, 0, 0, c, l), y = v.toDataURL()), svgCanvas.setHref(a, y), a
    };
    this.insertImageElements = function (n, t, i, r, u, f, e) {
      var o, s, c, p;
      r |= 0;
      u |= 0;
      f == 0 ? (o = t, s = i) : (o = t * 96 / f, s = i * 96 / e);
      var v = new l("insertImageElems"),
        a = svgCanvas.addSvgElementFromJson({
          element: "image",
          attr: {
            x: r,
            y: u,
            width: o,
            height: s,
            id: svgCanvas.getNextId(),
            style: "pointer-events:inherit",
            preserveAspectRatio: "none"
          }
        }),
        y = n;
      return f != 0 ? (c = document.createElement("canvas"), p = new Image, p.src = n, setTimeout(function () {
        var n = c.getContext("2d");
        c.width = o;
        c.height = s;
        n.drawImage(p, 0, 0, t, i, 0, 0, o, s);
        y = c.toDataURL();
        svgCanvas.setHref(a, y)
      }, 500)) : svgCanvas.setHref(a, y), v.addSubCommand(new ut(a)), v.isEmpty() || h(v), a
    };
    this.insertImagetraceResult = function (n, t, i, r) {
      for (var o = new l("insertImageTraceElems"), s, e, c, a, u = 0; u < n.length; u++) s = {
        id: b(),
        d: n[u].d,
        "stroke-width": n[u].stroke_width,
        stroke: n[u].stroke_color,
        fill: n[u].fill_color,
        "fcm-line-type": n[u].fcmline_type,
        "data-fcm-dashtype": n[u].fcm_dashtype
      }, r && (s["data-fcm-usescan"] = !0), e = it({
        element: n[u].element,
        curStyles: !1,
        attr: s
      }), (t != 0 || i != 0) && (c = f.createSVGTransform(), c.setTranslate(t, i), a = tt(e), a.appendItem(c), yt(e)), o.addSubCommand(new ut(e));
      o.isEmpty() || h(o)
    };
    this.insertConvetedElements = function (n, t, r) {
      var a = new l("insertConvElems-1"),
        ft, rt, d, v, k, et, p, y, g, f, tt, e, w, s;
      if (t) {
        for (ft = i.length, rt = [], f = 0; f < ft; ++f) {
          if (d = i[f], d == null) break;
          v = d.parentNode;
          k = d;
          c.releaseSelector(k);
          svgedit.path.removePath_(k.id);
          v.tagName === "a" && v.childNodes.length === 1 && (k = v, v = v.parentNode);
          et = k.nextSibling;
          y = v.removeChild(k);
          rt.push(d);
          i[f] = null;
          a.addSubCommand(new wt(y, et, v))
        }
        o("changed", rt);
        nt()
      } else if (r) {
        for (p = [], f = i.length; f--;) y = i[f], y && (y.tagName == "g" ? svgedit.utilities.walkTree(y, function (n) {
          n.nodeName != "g" && n.getAttribute("data-rsparams") == null && p.push(n)
        }) : p.push(y));
        p.length > 0 && (u.undoMgr.beginUndoableChange("fcm-line-type", p), ei("fcm-line-type", 2, p), a.addSubCommand(u.undoMgr.finishUndoableChange()), o("changed", p))
      }
      for (g = null, f = 0; f < n.length; f++)
        if (n[f].element == "g")
          for (g = it({
              element: "g",
              attr: {
                id: b()
              }
            }), n[f].fcm_piece_attr && g.setAttribute("data-fcm-pattr", n[f].fcm_piece_attr), a.addSubCommand(new ut(g)), tt = 0; tt < n[f].elements.length; tt++) e = n[f].elements[tt], s = null, e.element == "path" ? (w = {
            id: b(),
            d: e.d,
            "stroke-width": e.stroke_width,
            stroke: e.stroke_color,
            fill: e.fill_color,
            "fcm-line-type": e.fcmline_type,
            "data-fcm-dashtype": e.fcm_dashtype
          }, e.fcm_usescan && e.fcm_usescan == "true" && (w["data-fcm-usescan"] = !0), s = it({
            element: e.element,
            curStyles: !1,
            attr: w
          })) : e.element == "circle" && (s = it({
            element: e.element,
            curStyles: !1,
            attr: {
              id: b(),
              r: e.r.toFixed(6),
              cx: e.cx,
              cy: e.cy,
              "stroke-width": e.stroke_width,
              stroke: e.stroke_color,
              fill: e.fill_color,
              "fcm-line-type": e.fcmline_type,
              "data-fcm-dashtype": e.fcm_dashtype,
              ss: e.ss
            }
          })), e.fcm_piece_attr && s.setAttribute("data-fcm-pattr", e.fcm_piece_attr), s && (g.appendChild(s), a.addSubCommand(new ut(s)));
        else n[f].element == "path" ? (w = {
          id: b(),
          d: n[f].d,
          "stroke-width": n[f].stroke_width,
          stroke: n[f].stroke_color,
          fill: n[f].fill_color,
          "fcm-line-type": n[f].fcmline_type,
          "data-fcm-dashtype": n[f].fcm_dashtype
        }, n[f].fcm_usescan && n[f].fcm_usescan == "true" && (w["data-fcm-usescan"] = !0), s = it({
          element: n[f].element,
          curStyles: !1,
          attr: w
        }), n[f].fcm_piece_attr && s.setAttribute("data-fcm-pattr", n[f].fcm_piece_attr), a.addSubCommand(new ut(s))) : n[f].element == "circle" && (s = it({
          element: n[f].element,
          curStyles: !1,
          attr: {
            id: b(),
            r: n[f].r.toFixed(6),
            cx: n[f].cx,
            cy: n[f].cy,
            "stroke-width": n[f].stroke_width,
            stroke: n[f].stroke_color,
            fill: n[f].fill_color,
            "fcm-line-type": n[f].fcmline_type,
            "data-fcm-dashtype": n[f].fcm_dashtype,
            ss: n[f].ss
          }
        }), a.addSubCommand(new ut(s)));
      a.isEmpty() || h(a)
    };
    this.setRhineStoneSize = function (n) {
      s.ss = n;
      var t = new l("SetRhineStoneSize");
      u.undoMgr.beginUndoableChange("ss", i);
      ei("ss", n, i);
      t.addSubCommand(u.undoMgr.finishUndoableChange());
      u.undoMgr.beginUndoableChange("r", i);
      ei("r", k.rhinestone_size[s.ss] + k.rhinestone_offset, i);
      t.addSubCommand(u.undoMgr.finishUndoableChange());
      t.isEmpty() || h(t)
    };
    this.setFCMCuttype = function (n) {
      for (var t = [], u = i.length, r, f; u--;) r = i[u], r && (r.tagName == "g" ? svgedit.utilities.walkTree(r, function (n) {
        n.nodeName != "g" && n.getAttribute("data-rsparams") == null && t.push(n)
      }) : t.push(r));
      return f = 0, t.length > 0 && (pt("fcm-line-type", n, t), o("changed", t)), f
    };
    this.setFCMDatatype = function (n, t) {
      for (var r = [], f = i.length, u; f--;) u = i[f], u && (u.tagName == "g" ? svgedit.utilities.walkTree(u, function (n) {
        n.nodeName != "g" && n.getAttribute("data-rsparams") == null && r.push(n)
      }) : r.push(u));
      r.length > 0 && (pt(n, t, r), o("changed", r))
    };
    this.setFontSpacing = function (n) {
      pt("letter-spacing", n)
    };
    this.flipSelectedElements = function (n) {
      var y = i.length,
        et, v, t, s, w, a, b, rt, ut, ft;
      if (!(y > 1) || i[1] == null) {
        for (et = f.suspendRedraw(1e3), v = new l("Flip"); y--;)
          if (t = i[y], t != null) {
            ct = t.getAttribute("transform");
            s = tt(t);
            w = hi(s);
            w ? (a = svgedit.utilities.getBBox($("#selectedBox" + y)[0]), b = {}, $.each(a, function (n, t) {
              b[n] = t / r
            }), a = b) : a = svgedit.utilities.getBBox(t);
            var ot = a.x,
              st = a.y,
              ht = a.width,
              lt = a.height,
              at = ht,
              vt = lt,
              k = f.createSVGTransform(),
              d = f.createSVGTransform(),
              g = f.createSVGTransform(),
              p = 0,
              nt = 0,
              it = 0,
              e = gt(t);
            e && (p = 1);
            d.setScale(-1, 1);
            nt = ht / 2;
            it = lt / 2;
            e = -e;
            n || (e += 180);
            e < -180 && (e = 360 + e);
            e = e % 360;
            k.setTranslate(-(ot + nt), -(st + it));
            g.setTranslate(ot + nt, st + it);
            w ? (s.insertItemBefore(k, p), s.insertItemBefore(d, p), s.insertItemBefore(g, p)) : (s.appendItem(g), s.appendItem(d), s.appendItem(k));
            rt = yt(t);
            rt && v.addSubCommand(rt);
            u.undoMgr.beginUndoableChange("transform", [t]);
            ut = t.getAttribute("transform");
            u.setRotationAngle(e, !0, t);
            ft = t.getAttribute("transform");
            ft == null && t.setAttribute("transform", "rotate(0)");
            ut == null ? t.removeAttribute("transform") : t.setAttribute("transform", ut);
            ei("transform", ft, [t]);
            v.addSubCommand(u.undoMgr.finishUndoableChange());
            c.requestSelector(t).resize()
          } return f.unsuspendRedraw(et), v.isEmpty() ? void 0 : (h(v), o("changed", i), v)
      }
    };
    this.getBBoxForResize = function (n) {
      var r = n,
        e, o, i, v, u;
      if (r != null) {
        if (e = tt(r), o = hi(e), o) {
          var t = svgedit.utilities.getBBox(r),
            e = tt(r),
            y = gt(r),
            s = f.createSVGTransform();
          s.setRotate(-y, t.x + t.width / 2, t.y + t.height / 2);
          var p = g(e).matrix,
            w = at(s.matrix, p),
            h = t.x,
            c = t.y,
            l = t.width,
            a = t.height;
          i = {
            x: h,
            y: c,
            width: l,
            height: a
          };
          v = svgedit.math.transformBox(h, c, l, a, w);
          u = v.aabox;
          i.x = u.x;
          i.y = u.y;
          i.width = u.width;
          i.height = u.height
        } else i = svgedit.utilities.getBBox(r);
        return i
      }
      return null
    };
    this.resizeSelectedElementsByScale = function (n, t) {
      var vt = f.suspendRedraw(1e3),
        a = new l("Resize By Scale"),
        r = i[0],
        u, w, e, rt, st, s, nt, at;
      if (r != null) {
        if (ct = r.getAttribute("transform"), u = tt(r), w = hi(u), w) {
          var v = svgedit.utilities.getBBox(r),
            u = tt(r),
            y = gt(r),
            it;
          y && (it = u.getItem(0), u.removeItem(0));
          rt = g(u).matrix;
          y && u.insertItemBefore(it, 0);
          var ut = v.x,
            ft = v.y,
            et = v.width,
            ot = v.height;
          e = {
            x: ut,
            y: ft,
            width: et,
            height: ot
          };
          st = svgedit.math.transformBox(ut, ft, et, ot, rt);
          s = st.aabox;
          e.x = s.x;
          e.y = s.y;
          e.width = s.width;
          e.height = s.height
        } else e = svgedit.utilities.getBBox(r);
        var ht = e.x,
          lt = e.y,
          b = f.createSVGTransform(),
          k = f.createSVGTransform(),
          d = f.createSVGTransform(),
          p = 0,
          y = gt(r);
        y && (p = 1);
        k.setScale(n, t);
        b.setTranslate(-ht, -lt);
        d.setTranslate(ht, lt);
        w ? (u.insertItemBefore(b, p), u.insertItemBefore(k, p), u.insertItemBefore(d, p)) : (u.appendItem(d), u.appendItem(k), u.appendItem(b));
        nt = yt(r);
        nt && a.addSubCommand(nt);
        r.firstChild && r.firstChild.nodeName == "path" && (at = r.firstChild.getAttribute("data-rsparams"), at && r.firstChild.setAttribute("data-rsparamsRun", "true"));
        c.requestSelector(r).resize()
      }
      return f.unsuspendRedraw(vt), a.isEmpty() ? void 0 : (h(a), o("changed", i), a)
    };
    this.resizeSelectedElements = function (n, t, r) {
      var ui = f.suspendRedraw(1e3),
        w = new l("Flip"),
        u = i[0],
        e, it, s, ht, wt, p, et, ti, ii, y, ot, ri;
      if (u != null) {
        if (ct = u.getAttribute("transform"), e = tt(u), it = hi(e), it) {
          var b = svgedit.utilities.getBBox(u),
            e = tt(u),
            d = gt(u),
            st;
          d && (st = e.getItem(0), e.removeItem(0));
          ht = g(e).matrix;
          d && e.insertItemBefore(st, 0);
          var lt = b.x,
            at = b.y,
            vt = b.width,
            pt = b.height;
          s = {
            x: lt,
            y: at,
            width: vt,
            height: pt
          };
          wt = svgedit.math.transformBox(lt, at, vt, pt, ht);
          p = wt.aabox;
          s.x = p.x;
          s.y = p.y;
          s.width = p.width;
          s.height = p.height
        } else s = svgedit.utilities.getBBox(u);
        var bt = s.x,
          kt = s.y,
          a = s.width,
          v = s.height,
          rt = f.createSVGTransform(),
          ut = f.createSVGTransform(),
          ft = f.createSVGTransform(),
          nt = 0,
          dt = 0,
          ni = 0,
          d = gt(u);
        d && (nt = 1);
        et = k.baseUnit == "in" ? .9 : .3;
        t ? (sy = v ? t / v : 1, ti = Math.abs(t - v), ii < et && (sx = 1)) : sy = 1;
        n ? (sx = a ? n / a : 1, ii = Math.abs(n - a), ti < et && (sy = 1)) : sx = 1;
        r && (sx == 1 ? (sx = sy, y = a * sx, a <= 3 ? sx = 1 : sx < 1 && y < 7.56 ? sy = sx = 7.56 / a : sx > 1 && y > 2267.717 && (sy = sx = 2267.717 / a)) : sy == 1 ? (sy = sx, y = v * sy, v <= 3 ? sy = 1 : sy < 1 && y < 7.56 ? sy = sx = 7.56 / v : sy > 1 && y > 2267.717 && (sy = sx = 2267.717 / v)) : sx = sy = Math.max(sx, sy));
        ut.setScale(sx, sy);
        rt.setTranslate(-(bt + dt), -(kt + ni));
        ft.setTranslate(bt + dt, kt + ni);
        it ? (e.insertItemBefore(rt, nt), e.insertItemBefore(ut, nt), e.insertItemBefore(ft, nt)) : (e.appendItem(ft), e.appendItem(ut), e.appendItem(rt));
        ot = yt(u);
        ot && w.addSubCommand(ot);
        u.firstChild && u.firstChild.nodeName == "path" && (ri = u.firstChild.getAttribute("data-rsparams"), ri && u.firstChild.setAttribute("data-rsparamsRun", "true"));
        c.requestSelector(u).resize()
      }
      return f.unsuspendRedraw(ui), w.isEmpty() ? void 0 : (h(w), o("changed", i), w)
    };
    this.calcRhinestoneCounts = function () {
      var n = {
        SS6: 0,
        SS10: 0,
        SS16: 0,
        SS20: 0
      };
      return svgedit.utilities.walkTree(e, function (t) {
        if (t.nodeName == "circle") {
          var i = t.getAttribute("ss");
          switch (i) {
            case "6":
              n.SS6++;
              break;
            case "10":
              n.SS10++;
              break;
            case "16":
              n.SS16++;
              break;
            case "20":
              n.SS20++
          }
        }
      }), n
    };
    this.resetUndoMgr = function () {
      u.undoMgr.resetUndoStack();
      o("updateContextPanel")
    }
  },
  function () {
    var n = document.getElementById("svgcanvas");
    n.addEventListener("touchstart", touchHandler, !0);
    n.addEventListener("touchmove", touchHandler, !0);
    n.addEventListener("touchend", touchHandler, !0);
    n.addEventListener("touchcancel", touchHandler, !0);
    window.svgEditor || (window.svgEditor = function (n) {
      function y(i, r) {
        var f = t.setSvgString(i) !== !1;
        r = r || n.noop;
        f ? r(!0) : n.alert(u.notification.errorLoadingSVG, function () {
          r(!1)
        })
      }
      var t, i = {},
        b = !1,
        p = 0,
        a, k = {
          lang: "en",
          iconsize: "m",
          bkgd_color: "#FFF",
          bkgd_url: "",
          img_save: "embed"
        },
        o = {},
        r = {
          canvasName: "default",
          canvas_expansion: 3,
          dimensions: [33638.16, 68436.96],
          initFill: {
            color: "FFFFFF",
            opacity: 1
          },
          initStroke: {
            width: 2,
            color: "000000",
            opacity: 1
          },
          initOpacity: 1,
          imgPath: fcmhost + "/SVGEdit/images/",
          langPath: fcmhost + "/SVGEdit/locale/",
          extPath: fcmhost + "/SVGEdit/extensions/",
          jGraduatePath: fcmhost + "/SVGEdit/jgraduate/images/",
          extensions: [],
          initTool: "select",
          wireframe: !1,
          colorPickerCSS: null,
          gridSnapping: !1,
          gridColor: "#000",
          baseUnit: "in",
          snappingStep: 10,
          showRulers: !1,
          selectNew: !0
        },
        u = i.uiStrings = {
          common: {
            ok: "OK",
            cancel: "Cancel",
            key_up: "Up",
            key_down: "Down",
            key_backspace: "Backspace",
            key_del: "Del"
          },
          layers: {
            layer: "Layer"
          },
          notification: {
            invalidAttrValGiven: "Invalid value given",
            noContentToFitTo: "No content to fit to",
            dupeLayerName: "There is already a layer named that!",
            enterUniqueLayerName: "Please enter a unique layer name",
            enterNewLayerName: "Please enter the new layer name",
            layerHasThatName: "Layer already has that name",
            QmoveElemsToLayer: 'Move selected elements to layer "%s"?',
            QwantToClear: "Do you want to clear the drawing?\nThis will also erase your undo history!",
            QwantToOpen: "Do you want to open a new file?\nThis will also erase your undo history!",
            QerrorsRevertToSource: "There were parsing errors in your SVG source.\nRevert back to original SVG source?",
            QignoreSourceChanges: "Ignore changes made to SVG source?",
            featNotSupported: "Feature not supported",
            enterNewImgURL: "Enter the new image URL",
            defsFailOnSave: "NOTE: Due to a bug in your browser, this image may appear wrong (missing gradients or elements). It will however appear correct once actually saved.",
            loadingImage: "Loading image, please wait...",
            saveFromBrowser: 'Select "Save As..." in your browser to save this image as a %s file.',
            noteTheseIssues: "Also note the following issues: ",
            unsavedChanges: "There are unsaved changes.",
            enterNewLinkURL: "Enter the new hyperlink URL",
            errorLoadingSVG: "Error: Unable to load SVG data",
            URLloadFail: "Unable to load from URL",
            retrieving: 'Retrieving "%s" ...'
          }
        },
        d = {},
        f, w;
      i.curConfig = r;
      i.tool_scale = 1;
      i.original_title = "";
      i.isModalDialogOpen = !1;
      i.openDialog = function () {
        i.isModalDialogOpen = !0;
        n(".showscroll").addClass("noscroll")
      };
      i.closeDialog = function () {
        i.isModalDialogOpen = !1;
        n(".showscroll").removeClass("noscroll")
      };
      f = null;
      n.pref = function (n, t) {
        var r, e;
        t && (o[n] = t);
        n = "svg-edit-" + n;
        var u = location.hostname,
          h = u && u.indexOf(".") >= 0,
          f = typeof t != "undefined",
          i = !1;
        try {
          window.localStorage && (i = localStorage)
        } catch (s) {
          console.log(s)
        }
        try {
          window.globalStorage && h && (i = globalStorage[u])
        } catch (s) {
          console.log(s)
        }
        if (i) {
          if (f) i.setItem(n, t);
          else if (i.getItem(n)) return i.getItem(n) + ""
        } else if (window.widget)
          if (f) widget.setPreferenceForKey(t, n);
          else return widget.preferenceForKey(n);
        else if (f) r = new Date, r.setTime(r.getTime() + 31536e6), t = encodeURIComponent(t), document.cookie = n + "=" + t + "; expires=" + r.toUTCString();
        else return e = document.cookie.match(new RegExp(n + "=([^;]+)")), e ? decodeURIComponent(e[1]) : ""
      };
      i.setConfig = function (t) {
        n.each(t, function (t, i) {
          t in k && n.pref(t, i)
        });
        n.extend(!0, r, t);
        t.extensions && (r.extensions = t.extensions)
      };
      i.setCustomHandlers = function (r) {
        i.ready(function () {
          r.open && (n('#tool_open > input[type="file"]').remove(), n("#tool_open").show(), t.open = r.open);
          r.save && (i.show_save_warning = !1, t.bind("saved", r.save));
          r.fcmsave && t.bind("fcmexported", r.fcmsave);
          r.pngsave && t.bind("exported", r.pngsave);
          d = r
        })
      };
      i.randomizeIds = function () {
        t.randomizeIds(arguments)
      };
      i.init = function () {
        function pi(i, r) {
          var u = i.id,
            f = u.split("_"),
            e = f[0],
            o = f[1];
          r && t.setStrokeAttr("stroke-" + e, o);
          pr();
          pu("#cur_" + e, u, 20);
          n(i).addClass("current").siblings().removeClass("current")
        }

        function yu(i, r) {
          n.pref("bkgd_color", i);
          n.pref("bkgd_url", r);
          t.setBackground(i, r)
        }

        function so() {
          var i = t.getHref(s);
          i = i.indexOf("data:") === 0 ? "" : i;
          n.prompt(u.notification.enterNewImgURL, i, function (n) {
            n && lf(n)
          })
        }

        function lo() {
          t.deleteCurrentLayer() && (v(), it(), n("#layerlist tr.layer").removeClass("layersel"), n("#layerlist tr.layer:first").addClass("layersel"))
        }

        function sl() {
          var i = t.getCurrentDrawing().getCurrentLayerName() + " copy";
          n.prompt(u.notification.enterUniqueLayerName, i, function (i) {
            if (i) {
              if (t.getCurrentDrawing().hasLayer(i)) {
                n.alert(u.notification.dupeLayerName);
                return
              }
              t.cloneLayer(i);
              v();
              it()
            }
          })
        }

        function hl() {
          n("#layerlist tr.layersel").index() !== t.getCurrentDrawing().getNumLayers() - 1 && (t.mergeLayer(), v(), it())
        }

        function ao(i) {
          var r = n("#layerlist tr.layersel").index(),
            u = t.getCurrentDrawing().getNumLayers();
          (r > 0 || r < u - 1) && (r += i, t.setCurrentLayerPosition(u - r - 1), it())
        }

        function ll(n, t) {
          var i, r, u;
          return (eventAnalyticsRec("Editor", "spinZoom"), i = parseInt(n.value), r = 100, i === 0 && (r = 100), u = i + t, t === 0) ? i : (i < 50 && t === 50 ? r = 50 : i > 50 && i < 100 && t === -50 ? r = 50 : t > 0 ? r = Math.floor(i / 50) * 50 + t : t < 0 && (r = Math.ceil(i / 50) * 50 + t), r.toFixed(0))
        }

        function gu(i, u) {
          var nt, tt, d, o, ft, wt, g, s, h, lt, et, ot, f, a, st;
          u || (u = t.getZoom());
          i || (i = n("#svgcanvas"));
          var v = 3e4,
            at = t.getContentElem(),
            vt = svgedit.units.getTypeMap(),
            yt = vt[r.baseUnit];
          for (nt = 0; nt < 2; nt++) {
            var p = nt === 0,
              ht = p ? "x" : "y",
              w = p ? "width" : "height",
              it = at.getAttribute(ht) - 0,
              ct = n("#ruler_" + ht + " canvas:first");
            $hcanv = ct.clone();
            ct.replaceWith($hcanv);
            var c = $hcanv[0],
              l = i[w](),
              rt = l;
            c.parentNode.style[w] = rt + "px";
            var ut = 0,
              y, e = c.getContext("2d");
            if (e.fillStyle = "rgb(200,0,0)", e.fillRect(0, 0, c.width, c.height), $hcanv.siblings().remove(), l >= v) {
              for (s = parseInt(l / v) + 1, y = Array(s), y[0] = e, f = 1; f < s; f++) c[w] = v, tt = c.cloneNode(!0), c.parentNode.appendChild(tt), y[f] = tt.getContext("2d");
              tt[w] = l % v;
              l = v
            }
            c[w] = l;
            var b = yt * u,
              pt = 50 / b,
              k = 1;
            for (f = 0; f < ni.length; f++)
              if (s = ni[f], k = s, pt <= s) break;
            for (d = k * b, e.font = "9px sans-serif", o = it / b % k * b, ft = o - d; o < rt; o += d) {
              if (ft += d, wt = o - it, g = Math.round(o) + .5, p ? (e.moveTo(g, 15), e.lineTo(g, 0)) : (e.moveTo(15, g), e.lineTo(0, g)), s = (ft - it) / b, k >= 1 ? h = Math.round(s) : (lt = (k + "").split(".")[1].length, h = s.toFixed(lt) - 0), h !== 0 && h !== 1e3 && h % 1e3 == 0 && (h = h / 1e3 + "K"), p) e.fillText(h, o + 2, 8);
              else
                for (et = (h + "").split(""), f = 0; f < et.length; f++) e.fillText(et[f], 1, o + 9 + f * 9);
              for (ot = d / 10, f = 1; f < 10; f++) {
                if (a = Math.round(o + ot * f) + .5, y && a > l) {
                  if (ut++, e.stroke(), ut >= y.length) {
                    f = 10;
                    o = rt;
                    continue
                  }
                  e = y[ut];
                  o -= v;
                  a = Math.round(o + ot * f) + .5
                }
                st = f % 2 ? 12 : 10;
                p ? (e.moveTo(a, 15), e.lineTo(a, st)) : (e.moveTo(15, a), e.lineTo(st, a))
              }
            }
            e.strokeStyle = "#000";
            e.stroke()
          }
        }
        var ur, af, pt, ar, vr, yi, wr, ih, g, si, wi, vc, uu, at, bt, be, kt, ke, no, to, pu, gi, wo, rr, bo, ko, du, ts, is, ut, ni, ti, rs;
        (function () {
          var n = window.opener,
            t;
          if (n) try {
            t = n.document.createEvent("Event");
            t.initEvent("svgEditorReady", !0, !0);
            n.document.documentElement.dispatchEvent(t)
          } catch (i) {
            console.log(i)
          }
        })(),
        function () {
          var t, u, f, o, e;
          n.pref("unit") && (r.baseUnit = n.pref("unit"));
          t = n.deparam.querystring(!0);
          n.isEmptyObject(t) ? (o = "svgedit-" + i.curConfig.canvasName, e = window.localStorage.getItem(o), e && i.loadFromString(e)) : (t.dimensions && (t.dimensions = t.dimensions.split(",")), t.extensions && (t.extensions = t.extensions.split(",")), t.bkgd_color && (t.bkgd_color = "#" + t.bkgd_color), svgEditor.setConfig(t), u = t.source, f = n.param.querystring(), u || f.indexOf("source=data:") >= 0 && (u = f.match(/source=(data:[^&]*)/)[1]), u ? u.indexOf("data:") === 0 ? (u = u.replace(/ /g, "+"), i.loadFromDataURI(u)) : i.loadFromString(u) : f.indexOf("paramurl=") !== -1 ? svgEditor.loadFromURL(f.substr(9)) : t.url && svgEditor.loadFromURL(t.url))
        }();
        ur = function () {
          n.each(r.extensions, function () {
            var t = this;
            n.getScript(r.extPath + t, function (n) {
              if (!n) {
                var i = document.createElement("script");
                i.src = r.extPath + t;
                document.querySelector("head").appendChild(i)
              }
            })
          });
          var t = [];
          n("#lang_select option").each(function () {
            t.push(this.value)
          })
        };
        document.location.protocol === "file:" ? setTimeout(ur, 100) : ur();
        i.canvas = t = new n.SvgCanvas(document.getElementById("svgcanvas"), r);
        i.show_save_warning = !1;
        var nf = ["rgba(255,255,255,0)", "#FFFFFF", "#000000", "#800000", "#FF0000", "#FF403F", "#FF8080", "#FFAAAA", "#FFD5D5", "#AD8065", "#CBAC97", "#DDC8B6", "#FFBF80", "#FF9F40", "#D56A00", "#804000", "#FF8000", "#5D3200", "#B79860", "#CAB280", "#D59F00", "#FFDF80", "#FFBF00", "#806000", "#AA8000", "#5C4600", "#FFF100", "#5A5A00", "#AAAA00", "#D5D500", "#D9EC9D", "#80AA00", "#CFFF40", "#9FD500", "#408000", "#9FFF40", "#52DA3F", "#008000", "#00AA00", "#00FF00", "#AAFFAA", "#D5FFD5", "#008040", "#00AA55", "#005A2F", "#00D59F", "#40FFCF", "#008060", "#00AA80", "#AAFFEA", "#005B46", "#005959", "#008080", "#00AAAA", "#00D5D5", "#40FFFF", "#00445A", "#0080AA", "#AAEAFF", "#006080", "#00BFFF", "#00A1E9", "#00305B", "#0080FF", "#004080", "#001E96", "#000080", "#0000FF", "#8080FF", "#AAAAFF", "#D5D5FF", "#BF80FF", "#6A00D5", "#5500AA", "#D5AAFF", "#42005A", "#CF40FF", "#600080", "#8000AA", "#800080", "#AA00AA", "#D500D5", "#AA0080", "#800060", "#FF00BF", "#FF80DF", "#5A002F", "#FFAAD5", "#FF0080", "#AA0055", "#FFD5EA", "#D5006A", "#FF409F", "#F89EBB", "#CC0041", "#F24F82", "#CC0C2F", "#2D2D2D", "#555555", "#7F7F7F", "#BFBFBF", "#E8E8E8"],
          us = navigator.platform.indexOf("Mac") >= 0,
          fs = navigator.userAgent.indexOf("AppleWebKit") >= 0,
          dt = us ? "meta+" : "ctrl+",
          ft = t.pathActions,
          rt = t.undoMgr,
          wl = svgedit.utilities,
          tf = r.imgPath + "logo.png",
          c = n("#workarea"),
          ht = n("#cmenu_canvas"),
          bl = n("#cmenu_layers"),
          fr = null,
          rf = 1,
          er = "crosshair",
          uf = "crosshair",
          hi = "toolbars",
          ff = "",
          nt = {
            fill: null,
            stroke: null
          };
        (function () {
          n("#dialog_container").draggable({
            cancel: "#dialog_content, #dialog_buttons *",
            containment: "window"
          });
          var f = n("#dialog_box"),
            t = n("#dialog_buttons"),
            r = function (i, r, e, o) {
              var h, s;
              n("#dialog_content").html("<p>" + r.replace(/\n/g, "<\/p><p>") + "<\/p>").toggleClass("prompt", i === "prompt");
              t.empty();
              h = n('<input type="button" value="' + u.common.ok + '">').appendTo(t);
              i !== "alert" && n('<input type="button" value="' + u.common.cancel + '">').appendTo(t).click(function () {
                f.hide();
                e(!1)
              });
              i === "prompt" && (s = n('<input type="text">').prependTo(t), s.val(o || ""), s.bind("keydown", "return", function () {
                h.click()
              }));
              i === "process" && h.hide();
              f.show();
              h.click(function () {
                f.hide();
                var n = i === "prompt" ? s.val() : !0;
                e && e(n)
              }).focus();
              i === "prompt" && s.focus()
            };
          n.alert = function (n, t) {
            r("alert", n, t)
          };
          n.confirm = function (n, t) {
            r("confirm", n, t)
          };
          n.process_cancel = function (n, t) {
            r("process", n, t)
          };
          n.prompt = function (n, t, i) {
            r("prompt", n, i, t)
          };
          n.sccv_alert = function (t, r, f, e) {
            f && eventAnalyticsRec("Error", e, "error", t);
            var o = r ? "#common-warning" : "#common-alert";
            n(o + "-text").html(t);
            n(o).dialog({
              autoOpen: !0,
              modal: !0,
              resizable: !1,
              buttons: [{
                text: u.common.ok,
                click: function () {
                  n(this).dialog("close")
                }
              }],
              show: {
                effect: "fade",
                duration: "fast"
              },
              hide: {
                effect: "fade",
                duration: "fast"
              },
              open: i.openDialog,
              close: i.closeDialog
            })
          }
        })();
        var et = function () {
            var i = n(".tool_button_current");
            i.length && i[0].id !== "tool_select" && (i.removeClass("tool_button_current").addClass("tool_button").removeClass("ui-state-active"), n("#tool_select").addClass("tool_button_current").removeClass("tool_button").addClass("ui-state-active"), n("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all} #svgcanvas svg{cursor:default}"));
            t.setMode("select");
            c.css("cursor", "auto")
          },
          es = function (t, i) {
            if (n("#path_node_panel").toggle(t), n("#tools_bottom_2,#tools_bottom_3").toggle(!t), t) n(".tool_button_current").removeClass("tool_button_current").addClass("tool_button").removeClass("ui-state-active"), n("#tool_select").addClass("tool_button_current").removeClass("tool_button").addClass("ui-state-active"), n("#tool_select_icon").removeClass("E1-B").addClass("E1-K2"), n("#styleoverrides").text("#svgcanvas svg *{cursor:default;pointer-events:all} #svgcanvas svg{cursor:default}"), b = !1, i.length && (s = typeof i[0] != "undefined" ? i[0] : null);
            else {
              n("#tool_select_icon").removeClass("E1-K2").addClass("E1-B");
              var r = n(".tool_button_current");
              r.length && (r[0].id === "tool_fhpath" || r[0].id === "menu_rssingle") ? n("#styleoverrides").text("#svgcanvas svg{cursor:default}") : n("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all} #svgcanvas svg{cursor:default}")
            }
          },
          ii = !1,
          s = null,
          b = !1,
          ct = !1,
          ri = !1,
          ui = !1,
          or = "",
          os = n("title:first").text(),
          vt = !1,
          fi = !1,
          sr = !1,
          ci = !1,
          ef = !1,
          ss = function (t, i) {
            h(!0);
            i = '<?xml version="1.0"?>\n' + i;
            n.ajax({
              async: !0,
              type: "POST",
              url: "CountPiece",
              data: AddAntiForgeryToken({
                svgdata: encodeURI(i)
              })
            }).success(function (t) {
              if (t[0].bSuccess) {
                t[0].bWarning && console.log(t[0].message);
                var i = t[1];
                n("#objcount-data").text(i[1]);
                n("#objcount-dlg").dialog("open")
              } else n.sccv_alert(t[0].message), eventAnalyticsRec("ErrorS99", "countPieceHandler");
              e()
            }).error(function () {
              n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
              e()
            })
          },
          hs = function (r, u) {
            l === null && (i.show_save_warning = !1, h(!0), u = '<?xml version="1.0"?>\n' + u, n.ajax({
              async: !0,
              type: "POST",
              url: "SaveSVG",
              data: AddAntiForgeryToken({
                cmd: "svg_save",
                uniqueCode: i.curConfig.uniqueCode,
                title: n("#canvas_title").val(),
                svgdata: encodeURI(u),
                matid: wt(),
                config: JSON.stringify({
                  baseUnit: i.curConfig.baseUnit,
                  showRuler: i.curConfig.showRulers,
                  canvasprojectinfo: i.curConfig.canvasprojectinfo
                })
              })
            }).success(function (u) {
              var f = u[0],
                o = u[1];
              if (f.bSuccess) {
                f.bWarning && console.log(f.message);
                var c = o[0],
                  s = o[1],
                  h = o[2];
                (c === "Saved" || c === "Redirect") && (t.resetUndoMgr(), n("#save-confirm").dialog({
                  close: function (t) {
                    t.preventDefault();
                    i.closeDialog();
                    var u = n("#canvas_title");
                    (u.val() === "" && n("#canvas_title").val(h), i.original_title = u.val(), h === i.curConfig.uniqueCode && (location.pathname + location.search).indexOf(s) >= 0) || (typeof r.history != "undefined" && history.replaceState && typeof history.state != "undefined" ? history.replaceState(null, null, s) : r.location.href = s, i.curConfig.uniqueCode = h)
                  },
                  open: i.openDialog
                }).dialog("open"))
              } else n.sccv_alert(u[0].message), eventAnalyticsRec("ErrorS99", "saveHandler", "click", i.curConfig.uniqueCode);
              e()
            }).error(function () {
              n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
              e()
            }))
          },
          cs = function (t, r) {
            h(!0);
            r = '<?xml version="1.0"?>\n' + r;
            var o = n("#canvas_title").val(),
              f = o.replace(/[^a-z0-9\_\-\,\(\)]+/gi, "_");
            f === "" && (f = "Untitled");
            n.ajax({
              async: !0,
              type: "POST",
              url: "DownloadFCM",
              data: AddAntiForgeryToken({
                output_svg: encodeURI(r),
                filename: f,
                uniqueCode: i.curConfig.uniqueCode,
                matID: wt()
              })
            }).success(function (t) {
              var r = t[0],
                s = t[1],
                h = t[2],
                f = t[3],
                c = t[4],
                o;
              r instanceof Object ? r.bSuccess ? (n("#dlbyte").text((parseFloat(h) / 1024).toFixed(1)), o = "download_fcm/" + f, n("#dlref").text(s).attr("href", o), e(), openDownloadWindow(i.downloadurl + "?dlAccessKey=" + f, svgEditor.uiStrings.sccv.download_title), r.bWarning && n.sccv_alert(r.message, !0)) : (n("#errmes").text(r.message), e(), n("#download-error").dialog({
                buttons: [{
                  text: u.common.close,
                  click: function () {
                    n("#download-error").dialog("close")
                  }
                }],
                close: i.closeDialog,
                open: i.openDialog
              }).dialog("open"), eventAnalyticsRec("ErrorS99", "downloadFCMHandler", "click", i.curConfig.uniqueCode)) : (n.sccv_alert(svgEditor.uiStrings.notification.ServerError, undefined, !0, "errorClickFCMDownload"), e())
            }).error(function () {
              n.sccv_alert(svgEditor.uiStrings.notification.ServerError, undefined, !0, "errorClickFCMDownload");
              e()
            })
          },
          ls = function (t, r) {
            h(!0);
            r = '<?xml version="1.0"?>\n' + r;
            var o = n("#canvas_title").val(),
              f = o.replace(/[^a-z0-9\_\-\,\(\)]+/gi, "_");
            f === "" && (f = "Untitled");
            n.ajax({
              async: !0,
              type: "POST",
              url: "DownloadPDF",
              data: AddAntiForgeryToken({
                output_svg: encodeURI(r),
                filename: f,
                uniqueCode: i.curConfig.uniqueCode,
                matID: wt()
              })
            }).success(function (t) {
              var r = t[0],
                o = t[1],
                s = t[2],
                h = t[3],
                c = t[4],
                f;
              r instanceof Object ? r.bSuccess ? (n("#pdfdlbyte").text((parseFloat(s) / 1024).toFixed(1)), f = "download_pdf/" + h, n("#pdfdlref").text(o).attr("href", f), e(), n("#pdfdownload-confirm").dialog({
                autoOpen: !0,
                width: Math.min(550, screen.width - 14),
                buttons: [{
                  text: u.common.close,
                  click: function () {
                    n("#pdfdownload-confirm").dialog("close")
                  }
                }],
                close: function () {
                  n("#fcmdlfreme").remove();
                  i.closeDialog()
                },
                open: i.openDialog
              })) : (n("#errmes").text(r.message), e(), n("#download-error").dialog({
                buttons: [{
                  text: u.common.close,
                  click: function () {
                    n("#download-error").dialog("close")
                  }
                }],
                close: function () {
                  i.isModalDialogOpen = !1
                },
                open: function () {
                  i.isModalDialogOpen = !0
                }
              }).dialog("open"), eventAnalyticsRec("ErrorS99", "downloadPDFHandler", "click", i.curConfig.uniqueCode)) : (n.sccv_alert(svgEditor.uiStrings.notification.ServerError), e())
            }).error(function () {
              n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
              e()
            })
          },
          as = function (i, r) {
            var e = r.issues,
              f;
            n("#export_canvas").length || n("<canvas>", {
              id: "export_canvas"
            }).hide().appendTo("body");
            f = n("#export_canvas")[0];
            f.width = t.contentW;
            f.height = t.contentH;
            canvg(f, r.svg, {
              renderCallback: function () {
                var o = f.toDataURL("image/png"),
                  r, t, i;
                fr.location.href = o;
                r = n.pref("export_notice_done");
                r !== "all" && (t = u.notification.saveFromBrowser.replace("%s", "PNG"), e.length && (i = "\n • ", t += "\n\n" + u.notification.noteTheseIssues + i + e.join(i)), n.pref("export_notice_done", "all"), fr.alert(t))
              }
            })
          },
          li = !1,
          hr = function () {
            li = !0
          },
          ai = function () {
            li = !1
          },
          of = function (n, i) {
            var r, u;
            li || (r = t.getMode(), r === "select" && et(), u = r === "pathedit", i.length === 0 ? s = null : (s = (i.length === 1 || i[1] === null) && typeof i[0] != "undefined" ? i[0] : null, b = i.length >= 2 && i[1] !== null), es(u, i), v(), t.runExtensions("selectedChanged", {
              elems: i,
              selectedElement: s,
              multiselected: b
            }))
          },
          vs = function (i, r) {
            var e = t.getMode(),
              f = r[0],
              u;
            if (f) {
              if (b = r.length >= 2 && r[1] !== null, !b) switch (e) {
                case "rotate":
                  u = t.getRotationAngle(f);
                  u = u < 0 ? u + 360 : u;
                  u = u.toFixed(1);
                  n("#angle").val(u);
                  n("#tool_reorient").toggleClass("disabled", u === 0)
              }
              t.runExtensions("elementTransition", {
                elems: r
              })
            }
          },
          ys = function (n, r) {
            var c, o, f, u, l, a;
            if (!li) {
              for (c = t.getMode(), c === "select" && et(), o = 0; o < r.length; ++o) f = r[o], f && f.tagName === "svg" ? (it(), ut()) : f && s && s.parentNode === null && (s = f);
              i.show_save_warning = !0;
              v();
              s && c === "select" && (nt.fill.update(), nt.stroke.update());
              s && s.firstChild && s.firstChild.nodeName === "path" && (u = s.firstChild.getAttribute("data-rsparams"), u && s.firstChild.getAttribute("data-rsparamsRun") === "true" && (vt = !0, u = u.split("|"), s.firstChild.removeAttribute("data-rsparamsRun"), l = t.getRotationAngle(s), a = t.svgToString(s.firstChild), h(!0), oe({
                cmd: "wsRizard",
                ss: u[0],
                mode: u[1],
                parm1: u[2],
                parm2: u[3],
                parm3: u[4],
                parm4: u[5],
                parm5: u[6],
                parm6: u[7],
                svgdata: encodeURI(a)
              }, function () {
                vt = !1;
                ai();
                e()
              }, !0, s, l, function () {
                svgedit.utilities.walkTree(s, function (n) {
                  n.removeAttribute("data-rscircle")
                });
                kr();
                t.resetUndoMgr()
              })));
              t.runExtensions("elementChanged", {
                elems: r
              })
            }
          },
          yt = i.zoomChanged = t.zoomChanged = function (i, r, u) {
            var s = 15,
              y = t.getResolution(),
              h = c,
              p = n("#svgcanvas").position(),
              l = !1,
              o, v;
            if (r === "canvas_t" && (r = "canvas", l = !0), o = t.setBBoxZoom(r, h.width() - s, h.height() - s), o) {
              var f = o.zoom,
                e = o.bbox,
                a = !1;
              if (f < .25) {
                oi({
                  value: 25
                });
                return
              }
              f > 10 && (oi({
                value: 1e3
              }), f = 10, a = !0);
              v = f * 100;
              n("#zoom").val(v.toFixed(0));
              u ? ut() : a ? ut(!1, {
                x: e.x * f,
                y: e.y * f
              }) : ut(!1, {
                x: e.x * f + e.width * f / 2,
                y: e.y * f + e.height * f / 2
              });
              fu(f);
              !l && t.getMode() === "zoom" && e.width && et();
              ue()
            }
          };
        n("#cur_context_panel").delegate("a", "click", function () {
          var i = n(this);
          return i.attr("data-root") ? t.leaveContext() : t.setContext(i.text()), t.clearSelection(), !1
        });
        var ps = function (i, r) {
            var u = "",
              f;
            r ? (f = "", u += '<a href="#" data-root="y">' + t.getCurrentDrawing().getCurrentLayerName() + "<\/a>", n(r).parentsUntil("#svgcontent > g").andSelf().each(function () {
              this.id && (f += " > " + this.id, u += this !== r ? ' > <a href="#">' + this.id + "<\/a>" : " > " + this.id)
            }), or = f) : or = null;
            n("#cur_context_panel").toggle(!!r).html(u);
            vu()
          },
          ws = function () {
            nt.fill.prep();
            nt.stroke.prep()
          },
          cr = {},
          sf = function (t) {
            n.each(t, function (i, r) {
              var h = n(i).children(),
                f = i + "_show",
                u = n(f),
                o = !1,
                s, e;
              h.addClass("tool_button").unbind("click mousedown mouseup").each(function (i) {
                var e = r[i],
                  s;
                cr[e.sel] = e.fn;
                e.isDefault && (o = i);
                s = function (i) {
                  var r = e,
                    s, h, o;
                  if (i.type === "keydown" && (s = n(r.parent + "_show").hasClass("tool_button_current"), h = n(r.parent + "_show").attr("data-curopt"), n.each(t[e.parent], function (n, u) {
                      u.sel === h && (r = i.shiftKey && s ? t[e.parent][n + 1] || t[e.parent][0] : u)
                    })), n(this).hasClass("disabled")) return !1;
                  g(f) && r.fn();
                  o = null;
                  o = r.icon ? n.getSvgIcon(r.icon, !0) : n(r.sel).children().eq(0).clone();
                  o[0].setAttribute("width", u.width());
                  o[0].setAttribute("height", u.height());
                  u.children(":not(.flyout_arrow_horiz)").remove();
                  u.append(o).attr("data-curopt", r.sel)
                };
                n(this).mouseup(s);
                e.key && n(document).bind("keydown", e.key[0] + " shift+" + e.key[0], s)
              });
              o ? u.attr("data-curopt", r[o].sel) : u.attr("data-curopt") || u.attr("data-curopt", r[0].sel);
              e = n(f).position();
              n(i).css({
                left: e.left + 34,
                top: e.top + 40
              });
              u.mousedown(function (t) {
                if (u.hasClass("disabled")) return !1;
                var r = n(i),
                  f = e.left + 34,
                  o = r.width() * -1,
                  h = r.data("shown_popop") ? 200 : 0;
                s = setTimeout(function () {
                  u.data("isLibrary") ? r.css("left", f).show() : r.css("left", o).show().animate({
                    left: f
                  }, 150);
                  r.data("shown_popop", !0)
                }, h);
                t.preventDefault()
              }).mouseup(function () {
                clearTimeout(s);
                var t = n(this).attr("data-curopt");
                if (u.data("isLibrary") && n(f.replace("_show", "")).is(":visible")) {
                  g(f, !0);
                  return
                }
                g(f) && t in cr && cr[t]()
              })
            });
            cf()
          },
          lr = function (t, i) {
            return n("<div>", {
              "class": "tools_flyout",
              id: t
            }).appendTo("#svg_editor").append(i)
          },
          hf = function () {
            n(".tools_flyout").each(function () {
              var t = n("#" + this.id + "_show"),
                i = t.offset(),
                r = t.outerWidth();
              n(this).css({
                left: (i.left + r) * rf,
                top: i.top
              })
            })
          },
          cf = function () {
            n(".tools_flyout").each(function () {
              var i = n("#" + this.id + "_show"),
                t;
              i.data("isLibrary") || (t = [], n(this).children().each(function () {
                t.push(this.title)
              }), i[0].title = t.join(" / "))
            })
          },
          vi, bs = function (t, i) {
            function v() {
              vi && (clearTimeout(vi), vi = null);
              h || (vi = setTimeout(function () {
                h = !0;
                ro(o.iconsize)
              }, 50))
            }
            var s = !1,
              h = !1,
              f = !0,
              c = function () {
                i.callback && !s && f && (s = !0, i.callback())
              },
              l = [];
            if (i.context_tools && n.each(i.context_tools, function (t, i) {
                var e = i.container_id ? ' id="' + i.container_id + '"' : "",
                  r = n("#" + i.panel),
                  o, s, u, h, c, a, y, v, f;
                r.length || (r = n("<div>", {
                  id: i.panel
                }).appendTo("#tools_top"));
                switch (i.type) {
                  case "tool_button":
                    o = '<div class="tool_button">' + i.id + "<\/div>";
                    s = n(o).appendTo(r);
                    i.events && n.each(i.events, function (t, i) {
                      n(s).bind(t, i)
                    });
                    break;
                  case "select":
                    u = "<label" + e + '><select id="' + i.id + '">';
                    n.each(i.options, function (n, t) {
                      var r = n === i.defval ? " selected" : "";
                      u += '<option value="' + n + '"' + r + ">" + t + "<\/option>"
                    });
                    u += "<\/select><\/label>";
                    h = n(u).appendTo(r).find("select");
                    n.each(i.events, function (t, i) {
                      n(h).bind(t, i)
                    });
                    break;
                  case "button-select":
                    c = '<div id="' + i.id + '" class="dropdown toolset" title="' + i.title + '"><div id="cur_' + i.id + '" class="icon_label"><\/div><button><\/button><\/div>';
                    a = n('<ul id="' + i.id + '_opts"><\/ul>').appendTo("#option_lists");
                    i.colnum && a.addClass("optcols" + i.colnum);
                    y = n(c).appendTo(r).children();
                    l.push({
                      elem: "#" + i.id,
                      list: "#" + i.id + "_opts",
                      title: i.title,
                      callback: i.events.change,
                      cur: "#cur_" + i.id
                    });
                    break;
                  case "input":
                    v = "<label" + e + '><span id="' + i.id + '_label">' + i.label + ':<\/span><input id="' + i.id + '" title="' + i.title + '" size="' + (i.size || "4") + '" value="' + (i.defval || "") + '" type="text"/><\/label>';
                    f = n(v).appendTo(r).find("input");
                    i.spindata && f.SpinButton(i.spindata);
                    i.events && n.each(i.events, function (n, t) {
                      f.bind(n, t)
                    })
                }
              }), i.buttons) {
              var a = {},
                r = {},
                u = i.svgicons,
                e = {};
              n.each(i.buttons, function (t, i) {
                for (var nt, c = i.id, it = t, b, p, l, f, o, s, k, tt, h, v, d; n("#" + c).length;) c = i.id + "_" + ++it;
                u ? (a[c] = i.icon, b = i.svgicon ? i.svgicon : i.id, i.type === "app_menu" ? r["#" + c + " > div"] = b : r["#" + c] = b) : nt = n('<img src="' + i.icon + '">');
                switch (i.type) {
                  case "mode_flyout":
                  case "mode":
                    p = "tool_button";
                    l = "#tools_left";
                    break;
                  case "context":
                    p = "tool_button";
                    l = "#" + i.panel;
                    n(l).length || n("<div>", {
                      id: i.panel
                    }).appendTo("#tools_top");
                    break;
                  case "app_menu":
                    p = "";
                    l = "#main_menu ul"
                }
                if (f = n(i.list || i.type === "app_menu" ? "<li/>" : "<div/>").attr("id", c).attr("title", i.title).addClass(p), i.includeWith || i.list) {
                  if (i.list) f.addClass("push_button"), n("#" + i.list + "_opts").append(f), i.isDefault && (n("#cur_" + i.list).append(f.children().clone()), tt = i.svgicon ? i.svgicon : i.id, r["#cur_" + i.list] = tt);
                  else if (i.includeWith) {
                    var y = i.includeWith,
                      o = n(y.button),
                      s = o.parent();
                    o.parent().hasClass("tools_flyout") || (h = o[0].id.replace("tool_", "tools_"), v = o.clone().attr("id", h + "_show").append(n("<div>", {
                      "class": "flyout_arrow_horiz"
                    })), o.before(v), s = lr(h, o));
                    d = rr.getButtonData(y.button);
                    y.isDefault && (r["#" + h + "_show"] = i.id);
                    var k = e["#" + s[0].id] = [{
                        sel: "#" + c,
                        fn: i.events.click,
                        icon: i.id,
                        key: i.key,
                        isDefault: i.includeWith ? i.includeWith.isDefault : 0
                      }, d],
                      w = "position" in y ? y.position : "last",
                      rt = s.children().length;
                    !isNaN(w) && w >= 0 && w < rt ? s.children().eq(w).before(f) : (s.append(f), k.reverse())
                  }
                } else "position" in i ? n(l).children().eq(i.position).before(f) : f.appendTo(l), i.type === "mode_flyout" ? (o = n(f), s = o.parent(), o.parent().hasClass("tools_flyout") || (h = o[0].id.replace("tool_", "tools_"), v = o.clone().attr("id", h + "_show").append(n("<div>", {
                  "class": "flyout_arrow_horiz"
                })), o.before(v), s = lr(h, o), s.data("isLibrary", !0), v.data("isLibrary", !0)), r["#" + h + "_show"] = i.id, k = e["#" + s[0].id] = [{
                  sel: "#" + c,
                  fn: i.events.click,
                  icon: i.id,
                  isDefault: !0
                }, d]) : i.type === "app_menu" && f.append("<div>").append(i.title);
                u || f.append(nt);
                i.list || n.each(i.events, function (t, r) {
                  t === "click" ? i.type === "mode" ? (i.includeWith ? f.bind(t, r) : f.bind(t, function () {
                    g(f) && r()
                  }), i.key && (n(document).bind("keydown", i.key, r), i.title && f.attr("title", i.title + " [" + i.key + "]"))) : f.bind(t, r) : f.bind(t, r)
                });
                sf(e)
              });
              n.each(l, function () {
                si(this.elem, this.list, this.callback, {
                  seticon: !0
                })
              });
              u && (f = !1);
              n.svgIcons(u, {
                w: 24,
                h: 24,
                id_match: !1,
                no_img: !fs,
                fallback: a,
                placement: r,
                callback: function () {
                  o.iconsize && o.iconsize !== "m" && v();
                  f = !0;
                  c()
                }
              })
            }
            c()
          },
          ei = function (i, r, u) {
            var e = null,
              f;
            return i ? i.indexOf("url(#") === 0 ? (f = t.getRefElem(i), f = f ? f.cloneNode(!0) : n("#" + u + "_color defs *")[0], e = {
              alpha: r
            }, e[f.tagName] = f) : e = i.indexOf("#") === 0 ? {
              alpha: r,
              solidColor: i.substr(1)
            } : {
              alpha: r,
              solidColor: "none"
            } : e = {
              alpha: 1,
              solidColor: "none"
            }, new n.jGraduate.Paint(e)
          },
          kl = function () {
            var t, u, r, e, f, i;
            if (s !== null) switch (s.tagName) {
              case "use":
              case "image":
              case "foreignObject":
                break;
              case "g":
              case "a":
                for (t = null, u = s.getElementsByTagName("*"), r = 0, e = u.length; r < e; r++) f = u[r].getAttribute("stroke-width"), r === 0 ? t = f : t !== f && (t = null);
                n("#stroke_width").val(t === null ? "" : t);
                nt.fill.update(!0);
                nt.stroke.update(!0);
                break;
              default:
                nt.fill.update(!0);
                nt.stroke.update(!0);
                n("#stroke_width").val(s.getAttribute("stroke-width") || 1);
                n("#stroke_style").val(s.getAttribute("stroke-dasharray") || "none");
                i = s.getAttribute("stroke-linejoin") || "miter";
                n("#linejoin_" + i).length !== 0 && pi(n("#linejoin_" + i)[0]);
                i = s.getAttribute("stroke-linecap") || "butt";
                n("#linecap_" + i).length !== 0 && pi(n("#linecap_" + i)[0])
            }
          },
          lf = i.setImageURL = function (i) {
            i || (i = tf);
            t.setImageURL(i);
            n("#image_url").val(i);
            i.indexOf("data:") === 0 ? (n("#image_url").hide(), n("#change_image_url").show()) : (t.embedImage(i, function (t) {
              t ? n("#url_notice").hide() : n("#url_notice").show();
              tf = i
            }), n("#image_url").show(), n("#change_image_url").hide())
          },
          dl = function (t) {
            var i = Math.min(Math.max(12 + t.value.length * 6, 50), 300);
            n(t).width(i)
          },
          v = function () {
            var f = s,
              ii, y, c, lt, tt, k, d, l, at, et, ot, p, w, ri, fi, oi, h, vt, v, yt, ut, e, st, pt, ct, wt, i, bt;
            typeof f == "undefined" && (f = null);
            f === null || f.parentNode || (f = null);
            var si = t.getCurrentDrawing().getCurrentLayerName(),
              kt = t.getMode(),
              dt = r.baseUnit !== "px" ? r.baseUnit : null,
              gt = t.IsContainsOutline(f),
              ni = t.IsContainsRhinestone(f, !0),
              ti = kt === "pathedit",
              g = n("#cmenu_canvas li");
            if (n("#nonselectd_panel,#selected_panel, #multiselected_panel, #g_panel, #rect_panel, #circle_panel,                    #ellipse_panel, #line_panel, #text_panel, #image_panel, #container_panel, #use_panel, #a_panel").hide(), nt.fill.hide(), nt.stroke.hide(), n("#fcmdashtypemenu").hide(), g.disableContextMenuItems("#delete,#cut,#copy,#group,#ungroup,#duplicate,#marge,#divide,#rmoverlap,#subtract,#rswizard,#offset,#move_front,#move_up,#move_down,#move_back"), n("#menu_cut,#menu_copy,#menu_delete,.menu_aligns,.menu_flips,.menu_order,#tool_group,#tool_ungroup,#tool_clone,.menu_modoverlap,#menu_offsetwiz,#menu_rswiz").addClass("ui-state-disabled"), n("#tool_delete,#menu_edittext").prop("disabled", !0), n("#tool_rswiz,.modovarlap, #tool_offset").addClass("disabled"), n("#showObjPosSize,#fcmdathtype_panel").hide(), n("#font_family-button>.ui-selectmenu-text, #circle_ss-button>.ui-selectmenu-text, #fcmdashtypebtn").css("visibility", "visible"), ii = n("#objsize_keepaspect").prop("checked"), ii ? n("#objsize_aspectline").addClass("on") : n("#objsize_aspectline").removeClass("on"), f !== null) {
              if (y = f.nodeName, c = t.getRotationAngle(f), c = c < 0 ? c + 360 : c, c = c.toFixed(1), n("#angle").val(c), lt = t.getBlur(f), n("#blur").val(lt), n("#blur_slider").slider("option", "value", lt), t.addedNew && y === "image" && t.getHref(f).indexOf("data:") !== 0 && so(), ti || kt === "pathedit") {
                ot = ft.getSelectedNodeLength();
                n("#tool_node_clone,#tool_node_delete").toggleClass("disabled", ot === 0);
                n("#tool_openclose_path").toggleClass("disabled", ot !== 1);
                ft.closed_subpath ? n("#tool_openclose_path_icon").removeClass("E1-P").addClass("E1-O") : n("#tool_openclose_path_icon").removeClass("E1-O").addClass("E1-P");
                p = n("#seg_type");
                w = ft.getSelectedNodeType();
                ot === 0 || w !== -1 && w !== 6 && w !== 4 ? (p.selectmenu("disable"), n("#tool_node_clone").toggleClass("disabled", !0)) : w === -1 ? p.selectmenu("enable") : (p.selectmenu("enable"), ri = p.val(), w !== parseInt(ri, 10) && (p.val(w), p.selectmenu("refresh")));
                rt.getUndoStackSize() > 0 ? (n("#tool_undo").removeClass("disabled"), n("#menu_undo").removeClass("ui-state-disabled")) : (n("#tool_undo").addClass("disabled"), n("#menu_undo").addClass("ui-state-disabled"));
                rt.getRedoStackSize() > 0 ? (n("#tool_redo").removeClass("disabled"), n("#menu_redo").removeClass("ui-state-disabled")) : (n("#tool_redo").addClass("disabled"), n("#menu_redo").addClass("ui-state-disabled"));
                return
              }
              nt.fill.update(!0);
              nt.stroke.update(!0);
              n("#selected_panel").show();
              ["line", "circle", "ellipse"].indexOf(y) >= 0 ? n("#xy_panel").hide() : (["g", "polyline", "path"].indexOf(y) >= 0 ? (l = t.getStrokedBBox([f]), l && (e = l.x, tt = l.y)) : (e = f.getAttribute("x"), tt = f.getAttribute("y")), dt && (e = svgedit.units.convertUnit(e), tt = svgedit.units.convertUnit(tt)), n("#selected_x").val(e || 0), n("#selected_y").val(tt || 0), n("#xy_panel").show());
              y !== "image" && (y !== "g" || gt) ? n("#color_panel,#fcmlinetype_panel").show() : n("#color_panel,#fcmlinetype_panel").hide();
              ["g", "path", "text", "image"].indexOf(y) >= 0 ? (l = t.getBBoxForResize(f), k = l.width, d = l.height, dt && (k = svgedit.units.convertUnit(k), d = svgedit.units.convertUnit(d)), r.baseUnit === "in" ? (at = "&Prime;", et = 2) : (at = u.common.mm, et = 1), k = k.toFixed(et), d = d.toFixed(et), n("#objwidth").val(k || 0), n("#objheight").val(d || 0), n("#objsize_panel .objunit").html(at), ni ? n("#objsize_panel,#objsize_scale_panel").hide() : n("#objsize_panel,#objsize_scale_panel").show(), n("#objsizerot_panel").show()) : n("#objsizerot_panel").hide();
              var ui = {
                  g: [],
                  a: [],
                  rect: ["rx", "width", "height"],
                  image: ["width", "height"],
                  circle: ["cx", "cy", "r", "ss"],
                  ellipse: ["cx", "cy", "rx", "ry"],
                  line: ["x1", "y1", "x2", "y2"],
                  text: [],
                  use: []
                },
                o = f.tagName,
                it = null;
              if (o === "a" && (it = t.getHref(f), n("#g_panel").show()), f.parentNode.tagName === "a" && (n(f).siblings().length || (n("#a_panel").show(), it = t.getHref(f.parentNode))), n("#tool_make_link, #tool_make_link").toggle(!it), it && n("#link_url").val(it), ui[o] && (fi = ui[o], n("#" + o + "_panel").show(), n.each(fi, function (t, i) {
                  var u = f.getAttribute(i),
                    e;
                  r.baseUnit !== "px" && f[i] && (e = f[i].baseVal.value, u = svgedit.units.convertUnit(e));
                  n("#" + o + "_" + i).val(u || 0);
                  o === "circle" && i === "ss" && n("#" + o + "_" + i).selectmenu("refresh")
                }), o === "text" && (n("#text_panel").css("display", "inline"), t.getItalic() ? n("#tool_italic").addClass("push_button_pressed").removeClass("tool_button") : n("#tool_italic").removeClass("push_button_pressed").addClass("tool_button"), t.getBold() ? n("#tool_bold").addClass("push_button_pressed").removeClass("tool_button") : n("#tool_bold").removeClass("push_button_pressed").addClass("tool_button"), n("#font_family").val(f.getAttribute("font-family")).selectmenu("refresh"), a = n("#font_family option:selected").attr("data-validate"), n("#text").val(f.textContent), oi = parseInt(f.getAttribute("letter-spacing")) || 0, n("#text_letter-spacing").val(oi), t.addedNew && setTimeout(function () {
                  n("#text").focus().select()
                }, 100), n("#menu_edittext").prop("disabled", !1))), o === "g" ? n("#tool_ungroup").removeClass("ui-state-disabled") : n("#tool_ungroup").addClass("ui-state-disabled"), o !== "g" && b ? n("#tool_group").removeClass("ui-state-disabled") : n("#tool_group").addClass("ui-state-disabled"), g[(o === "g" ? "en" : "dis") + "ableContextMenuItems"]("#ungroup"), g[(o === "g" || !b ? "dis" : "en") + "ableContextMenuItems"]("#group"), h = 3, vt = f.getAttribute("fcm-line-type"), vt && (h = parseInt(vt)), v = 0, yt = f.getAttribute("data-fcm-dashtype"), yt && (v = parseInt(yt)), ut = [], o === "g")
                for (svgedit.utilities.walkTree(f, function (n) {
                    n.nodeName !== "g" && n.getAttribute("data-rsparams") === null && ut.push(n)
                  }), e = 0; e < ut.length && (v > -1 || h > -1); e++) h > -1 && (st = 3, pt = ut[e].getAttribute("fcm-line-type"), pt && (st = parseInt(pt)), e === 0 ? h = st : h !== st && (h = -1)), v > -1 && (ct = 0, wt = ut[e].getAttribute("data-fcm-dashtype"), wt && (ct = parseInt(wt)), e === 0 ? v = ct : v !== ct && (v = -1));
              if ((h & 4) == 4 ? (n("#fcmlinetype_drawfill").prop("checked", !0), h -= 4) : n("#fcmlinetype_drawfill").prop("checked", !1), n("input[name='fcmlinetype']").val([h]), n("#fcmdashtype").attr("data-dashtype", v), ni || (n("#tool_rswiz").removeClass("disabled"), n("#menu_rswiz").removeClass("ui-state-disabled"), t.IsContainsRhinestone(f, !1) || (n("#fcmdathtype_panel").show(), n(".modovarlap,#tool_offset").removeClass("disabled"), n(".menu_modoverlap,#menu_offsetwiz").removeClass("ui-state-disabled"))), gt || (n(".modovarlap,#tool_offset,#tool_rswiz").addClass("disabled"), n(".menu_modoverlap,#menu_offsetwiz,#menu_rswiz").addClass("ui-state-disabled")), n("#menu_cut,#menu_copy,#menu_paste,#menu_delete,.menu_flips,.menu_order,#tool_clone").removeClass("ui-state-disabled"), n("#tool_delete").prop("disabled", !1), g.enableContextMenuItems("#move_front,#move_up,#move_down,#move_back"), n("#showObjPosSize").show(), i = t.chkSelectedElements(), i.circle === 1 && (n("#fcmdathtype_panel").hide(), i.path === 0 && i.text === 0 && i.image === 0)) {
                n("#circle_panel").show();
                switch (i.stoneSize) {
                  case "6":
                  case "10":
                  case "16":
                  case "20":
                    n("#circle_ss-button>.ui-selectmenu-text").css("visibility", "visible");
                    break;
                  default:
                    n("#circle_ss-button>.ui-selectmenu-text").css("visibility", "hidden")
                }
              }
            } else if (b) {
              if (n("#multiselected_panel").show(), g.enableContextMenuItems("#group").disableContextMenuItems("#ungroup,#move_front,#move_up,#move_down,#move_back"), n("#tool_group").removeClass("ui-state-disabled"), n("#tool_ungroup,.menu_flips,.menu_order").addClass("ui-state-disabled"), t.IsContainsRhinestone(null, !0) || (n("#tool_rswiz").removeClass("disabled"), n("#menu_rswiz").removeClass("ui-state-disabled"), t.IsContainsRhinestone(null, !1) || (n("#fcmdathtype_panel").show(), n(".modovarlap,#tool_offset").removeClass("disabled"), n(".menu_modoverlap,#menu_offsetwiz").removeClass("ui-state-disabled"))), t.IsContainsOutline(null) || (n(".modovarlap,#tool_offset,#tool_rswiz").addClass("disabled"), n(".menu_modoverlap,#menu_offsetwiz,#menu_rswiz").addClass("ui-state-disabled")), n("#menu_cut,#menu_copy,#menu_delete,.menu_aligns,#tool_clone").removeClass("ui-state-disabled"), n("#tool_delete").prop("disabled", !1), n("#showObjPosSize").hide(), i = t.chkSelectedElements(), i.path + i.text + i.circle > 0 && (n("#selected_panel").show(), n("#objsize_panel").hide(), n("#objsizerot_panel").hide(), n("#color_panel,#fcmlinetype_panel").show(), i.strokeColor && nt.stroke.setPaint(ei(i.strokeColor === "def" ? null : i.strokeColor, 1, nt.stroke.type)), i.fillColor && nt.fill.setPaint(ei(i.fillColor === "def" ? null : i.fillColor, 1, nt.stroke.type)), i.cutType && n("input[name='fcmlinetype']").val([i.cutType === "def" ? -1 : i.cutType]), i.dashType && n("#fcmdashtypebtn>.ui-button-text").css("visibility", i.dashType === "def" ? "hidden" : "visible"), i.path === 0 && i.circle === 0 && i.image === 0 && (n("#text_panel").show(), i.fontType && n("#font_family-button>.ui-selectmenu-text").css("visibility", i.fontType === "def" ? "hidden" : "visible")), i.circle > 0 && (n("#fcmdathtype_panel").hide(), i.path === 0 && i.text === 0 && i.image === 0 && (n("#circle_panel").show(), i.stoneSize)))) {
                bt = "";
                switch (i.stoneSize) {
                  case "6":
                  case "10":
                  case "16":
                  case "20":
                    bt = "SS" + i.stoneSize;
                    n("#circle_ss").val(i.stoneSize);
                    break;
                  default:
                    n("#circle_ss").val("")
                }
                n("#circle_ss-button>.ui-selectmenu-text").text(bt).css("visibility", i.stoneSize === "def" ? "hidden" : "visible")
              }
            } else n("#nonselectd_panel").show();
            rt.getUndoStackSize() > 0 ? (n("#tool_undo").removeClass("disabled"), n("#menu_undo").removeClass("ui-state-disabled")) : (n("#tool_undo").addClass("disabled"), n("#menu_undo").addClass("ui-state-disabled"));
            rt.getRedoStackSize() > 0 ? (n("#tool_redo").removeClass("disabled"), n("#menu_redo").removeClass("ui-state-disabled")) : (n("#tool_redo").addClass("disabled"), n("#menu_redo").addClass("ui-state-disabled"));
            t.addedNew = !1;
            f && !ti || b ? (n("#selLayerNames").removeAttr("disabled").val(si), t.IsContainsRhinestone(null, !0) || (ht.enableContextMenuItems("#rswizard"), t.IsContainsRhinestone(null, !1) || ht.enableContextMenuItems("#marge,#divide,#rmoverlap,#subtract,#offset")), t.IsContainsOutline(null) || ht.disableContextMenuItems("#rswizard,#marge,#divide,#rmoverlap,#subtract,#offset"), ht.enableContextMenuItems("#delete,#cut,#copy,#duplicate")) : n("#selLayerNames").attr("disabled", "disabled");
            t.clipBoard.length ? (n("#menu_paste").removeClass("ui-state-disabled"), ht.enableContextMenuItems("#paste,#paste_in_place")) : (n("#menu_paste").addClass("ui-state-disabled"), ht.disableContextMenuItems("#paste,#paste_in_place"))
          },
          ks = function (t, i) {
            var f, e, o;
            r.baseUnit === "in" ? (f = "&Prime;", e = i.width.toFixed(2), o = i.height.toFixed(2)) : (f = u.common.mm, e = i.width.toFixed(1), o = i.height.toFixed(1));
            f = "<span class='objunit'>" + f + "<\/span>&nbsp;";
            n("#showObjPosSize").html(" <span class='sncicon size_icon'><\/span> <span class='sncicon size_height'><\/span>" + o + f + " <span class='sncicon size_width'><\/span>" + e + f)
          };
        n("#text").focus(function () {
          ii = !0
        });
        n("#text").blur(function () {
          ii && (ii = !1, t.textActions.toSelectMode(!0))
        });
        t.bind("selected", of );
        t.bind("transition", vs);
        t.bind("changed", ys);
        t.bind("saved", hs);
        t.bind("exported", as);
        t.bind("zoomed", yt);
        t.bind("contextset", ps);
        t.bind("extension_added", bs);
        t.bind("fcmexported", cs);
        t.bind("updateContextPanel", v);
        t.bind("updateStatusPanel", ks);
        t.bind("pdfexported", ls);
        t.bind("countPiece", ss);
        t.textActions.setInputElem(n("#text")[0]);
        pt = '<div class="palette_item" data-rgb="none"><\/div>';
        n.each(nf, function (n, t) {
          pt += '<div class="palette_item" style="background-color: ' + t + ';" data-rgb="' + t + '"><\/div>'
        });
        n("#palette").append(pt);
        af = ["#FFF", "#888", "#000"];
        pt = "";
        n.each(af, function () {
          pt += '<div class="color_block" style="background-color:' + this + ';"><\/div>'
        });
        n("#bg_blocks").append(pt);
        ar = n("#bg_blocks div");
        vr = "cur_background";
        ar.each(function () {
          var t = n(this);
          t.click(function () {
            ar.removeClass(vr);
            n(this).addClass(vr)
          })
        });
        n.pref("bkgd_color") ? yu(n.pref("bkgd_color"), n.pref("bkgd_url")) : n.pref("bkgd_url") && yu(k.bkgd_color, n.pref("bkgd_url"));
        o.showMatImage = n.pref("showMatImage") === "false" ? !1 : !0;
        n.pref("img_save") && (o.img_save = n.pref("img_save"), n("#image_save_opts input").val([o.img_save]));
        var gl = function (n) {
            t.setRectRadius(n.value)
          },
          na = function (n) {
            t.setFontSize(n.value)
          },
          ta = function (n) {
            var i = n.value;
            i === 0 && s && ["line", "polyline"].indexOf(s.nodeName) >= 0 && (i = n.value = 1);
            t.setStrokeWidth(i)
          },
          ds = function (i) {
            var r = parseFloat(i.target.value);
            r %= 360;
            r = r > 180 ? r - 360 : r;
            r = r.toFixed(1);
            t.setRotationAngle(r);
            n("#tool_reorient").toggleClass("disabled", i.target.value.parseFloat() === 0)
          };
        n("#objsize_keepaspect").change(function () {
          n(this).prop("checked") ? n("#objsize_aspectline").addClass("on") : n("#objsize_aspectline").removeClass("on")
        });
        yi = "100.0";
        n("#objsize_keepaspect_sc").change(function () {
          n(this).prop("checked") ? (n("#objsize_aspectline_sc").addClass("on"), n("#objheight_sc,#objwidth_sc").val(yi)) : n("#objsize_aspectline_sc").removeClass("on")
        });
        var yr = !1,
          gs = function () {
            yr = !0
          },
          vf = null,
          yf = function (i) {
            clearTimeout(vf);
            yr && (i.type !== "touchspin" || i.namespace !== "on.stopspin") || (yr = !1, vf = setTimeout(function () {
              var r = parseFloat(n("#" + i.target.id).val()),
                u = n("#objsize_keepaspect").prop("checked");
              r = r / svgedit.units.convertUnit(1);
              i.target.id === "objwidth" ? t.resizeSelectedElements(r, null, u) : i.target.id === "objheight" && t.resizeSelectedElements(null, r, u)
            }, 610))
          },
          oi = function (n) {
            var u = n.value / 100,
              r, i;
            if (u < .25) {
              n.value = 25;
              return
            }
            r = t.getZoom();
            i = c;
            yt(window, {
              width: 0,
              height: 0,
              x: Math.floor((i[0].scrollLeft + i.width() / 2) / r),
              y: Math.floor((i[0].scrollTop + i.height() / 2) / r),
              zoom: u
            }, !0)
          },
          nh = function (i, r) {
            r === null && (r = i.value);
            n("#group_opacity").val(r);
            i && i.handle || n("#opac_slider").slider("option", "value", r);
            t.setOpacity(r / 100)
          },
          pf = function (i, r, u) {
            r === null && (r = i.value);
            n("#blur").val(r);
            var f = !1;
            i && i.handle || (n("#blur_slider").slider("option", "value", r), f = !0);
            u ? t.setBlurNoUndo(r) : t.setBlur(r, f)
          },
          th = function (n) {
            t.changeSelectedAttribute("letter-spacing", n.target.value);
            v()
          },
          pr = function () {
            window.opera && n("<p/>").hide().appendTo("body").remove()
          };
        n("#stroke_style").change(function () {
          t.setStrokeAttr("stroke-dasharray", n(this).val());
          pr()
        });
        n("#stroke_linejoin").change(function () {
          t.setStrokeAttr("stroke-linejoin", n(this).val());
          pr()
        });
        n("select").change(function () {
          n(this).blur()
        });
        wr = !1;
        n("#selLayerNames").change(function () {
          var i = this.options[this.selectedIndex].value,
            f = u.notification.QmoveElemsToLayer.replace("%s", i),
            r = function (n) {
              n && (wr = !0, t.moveSelectedToLayer(i), t.clearSelection(), it())
            };
          i && (wr ? r(!0) : n.confirm(f, r))
        });
        n("#font_family").selectmenu({
          change: function (i, r) {
            var h = r.item.value,
              e, o, f;
            if (a = n("#font_family option:selected").attr("data-validate"), e = n("#text").val(), o = new RegExp(a), e.search(o) !== -1) {
              n.sccv_alert(u.notification.invalidFontSelect);
              f = s.getAttribute("font-family");
              f && (this.value = f);
              return
            }
            t.setFontFamily(this.value)
          }
        }).selectmenu("menuWidget").css("height", "200px").parent().removeClass("ui-front");
        n("#seg_type").selectmenu({
          width: "auto",
          change: function (n, i) {
            t.setSegType(i.item.value)
          }
        }).selectmenu("menuWidget").parent().removeClass("ui-front");
        n("#text").keyup(function () {
          var n = this.value,
            r = new RegExp(a),
            i;
          n.search(r) !== -1 && (t.setTextContent(n, !0), i = new RegExp(a, "g"), ii = !1, alert(u.notification.ContainsInvalidCharacter), ii = !0, n = n.replace(i, ""), this.value = n, t.setTextContent(n, !0));
          t.setTextContent(this.value)
        });
        ih = i.okdlgText = function () {
          var i = n("#dlgtext").val(),
            r, f;
          return i === "" ? (t.deleteSelectedElements(), v(), !0) : (r = new RegExp(a), i.search(r) !== -1) ? (f = new RegExp(a, "g"), alert(u.notification.ContainsInvalidCharacter), i = i.replace(f, ""), n("#dlgtext").val(i), !1) : (t.textActions.start(s), t.setTextContent(i), t.textActions.toSelectMode(!0), v(), !0)
        };
        n("#image_url").change(function () {
          lf(this.value)
        });
        n("#link_url").change(function () {
          this.value.length ? t.setLinkURL(this.value) : t.removeHyperlink()
        });
        n("#g_title").change(function () {
          t.setGroupTitle(this.value)
        });
        n("#circle_ss").selectmenu({
          width: "auto",
          change: function (i, r) {
            t.setRhineStoneSize(r.item.value);
            n("#circle_ss-button>.ui-selectmenu-text").css("visibility", "visible")
          }
        }).selectmenu("menuWidget").parent().removeClass("ui-front");
        n('input[name="fcmlinetype"]:radio').change(function () {
          value = n(this).val();
          n("#fcmlinetype_drawfill").prop("checked") && (value = parseInt(value) + 4);
          t.setFCMCuttype(value)
        });
        n("#fcmlinetype_drawfill").click(function () {
          var r = n(this).prop("checked"),
            i = n("input[name='fcmlinetype']:checked").val();
          i = parseInt(i);
          r && (i += 4);
          t.setFCMCuttype(i)
        });
        n("#fcmdashtypemenu li").click(function () {
          var i = n(this).attr("data-dashtype");
          n("#fcmdashtype").attr("data-dashtype", i);
          t.setFCMDatatype("data-fcm-dashtype", i)
        });
        n("#text_letter-spacing").change(function () {
          t.setFontSpacing(this.value)
        });
        n(".attr_changer").change(function () {
          var i = this.getAttribute("data-attr"),
            f = this.value,
            h = svgedit.units.isValidUnit(i, f, s),
            o, e;
          if (!h) return n.sccv_alert(u.notification.invalidAttrValGiven), this.value = s.getAttribute(i), !1;
          i !== "id" && (isNaN(f) ? f = t.convertToNum(i, f) : r.baseUnit !== "px" && (o = svgedit.units.getTypeMap(), (s[i] || t.getMode() === "pathedit" || i === "x" || i === "y") && (f *= o[r.baseUnit])));
          i === "id" ? (e = s, t.clearSelection(), e.id = f, t.addToSelection([e], !0)) : t.changeSelectedAttribute(i, f);
          this.blur()
        });
        n("#palette").mouseover(function () {
          var t = n('<input type="hidden">');
          n(this).append(t);
          t.focus().remove()
        });
        n(".palette_item").mousedown(function (i) {
          var e = i.button === 2,
            f = i.shiftKey || e,
            o = f ? "stroke" : "fill",
            r = n(this).attr("data-rgb"),
            u = null;
          r === "none" || r === "transparent" || r === "initial" ? (r = "none", u = new n.jGraduate.Paint) : u = new n.jGraduate.Paint({
            alpha: 100,
            solidColor: r.substr(1)
          });
          nt[o].setPaint(u);
          f ? (t.setColor("stroke", r), r !== "none" && t.getStrokeOpacity() !== 1 && t.setPaintOpacity("stroke", 1)) : (t.setColor("fill", r), r !== "none" && t.getFillOpacity() !== 1 && t.setPaintOpacity("fill", 1))
        }).bind("contextmenu", function (n) {
          n.preventDefault()
        });
        n("#toggle_stroke_tools").on("click", function () {
          n("#tools_bottom").toggleClass("expanded")
        });
        g = function (t, i) {
            if (n("#tool_zoom").unbind("touchstart"), n(t).hasClass("disabled")) return !1;
            if (n(t).parent().hasClass("tools_flyout")) return !0;
            var r = r || "normal";
            return i || n(".tools_flyout").fadeOut(r), n("#styleoverrides").text(""), c.css("cursor", "auto"), n(".tool_button_current").removeClass("tool_button_current").addClass("tool_button"), n(t).addClass("tool_button_current").removeClass("tool_button"), !0
          },
          function () {
            var r = null,
              u = null,
              e = c[0],
              i = !1,
              f = !1;
            n("#svgcanvas").bind("mousemove mouseup", function (n) {
              if (i !== !1) return e.scrollLeft -= n.clientX - r, e.scrollTop -= n.clientY - u, r = n.clientX, u = n.clientY, n.type === "mouseup" && (i = !1), !1
            }).mousedown(function (n) {
              if (n.button === 1 || f === !0 || t.getMode() === "pan") return i = !0, r = n.clientX, u = n.clientY, !1
            });
            n(window).mouseup(function () {
              i = !1
            });
            n(document).bind("keydown", "space", function (n) {
              t.spaceKey = f = !0;
              n.preventDefault()
            }).bind("keyup", "space", function (n) {
              n.preventDefault();
              t.spaceKey = f = !1
            }).bind("keydown", "shift", function () {
              t.getMode() === "zoom" && c.css("cursor", uf)
            }).bind("keyup", "shift", function () {
              t.getMode() === "zoom" && c.css("cursor", er)
            })
          }(),
          function () {
            var r = n("#main_icon"),
              s = n("#main_icon span"),
              t = n("#main_menu"),
              i = !1,
              f = 0,
              e = !0,
              o = !1,
              h = function () {
                t.fadeOut(200)
              },
              u;
            n(window).mouseup(function (u) {
              i || (r.removeClass("buttondown"), u.target.tagName !== "INPUT" ? t.fadeOut(200) : o || (o = !0, n(u.target).click(function () {
                t.css("margin-left", "-9999px").show()
              })));
              i = !1
            }).mousedown(function () {
              n("#cmenu_canvas").fadeOut(250)
            });
            s.bind("mousedown", function () {
              if (r.hasClass("buttondown")) r.removeClass("buttondown").addClass("buttonup"), t.fadeOut(200);
              else return r.addClass("buttondown").removeClass("buttonup"), t.css("margin-left", 0).show(), f || (f = t.height()), t.css("height", 0).animate({
                height: f
              }, 200), i = !0, !1
            }).hover(function () {
              i = !0
            }).mouseout(function () {
              i = !1
            });
            u = n("#main_menu li");
            u.mouseover(function () {
              e = n(this).css("background-color") === "rgba(0, 0, 0, 0)";
              u.unbind("mouseover");
              e && u.mouseover(function () {
                this.style.backgroundColor = "#FFC"
              }).mouseout(function () {
                return this.style.backgroundColor = "transparent", !0
              })
            })
          }();
        i.addDropDown = function (t, i, r) {
          var f, u, e;
          n(t).length !== 0 && (f = n(t).find("button"), u = n(t).find("ul").attr("id", n(t)[0].id + "-list"), r || n("#option_lists").append(u), e = !1, r && n(t).addClass("dropup"), u.find("li").bind("mouseup", i), n(window).mouseup(function () {
            e || (f.removeClass("down"), u.hide());
            e = !1
          }), f.bind("mousedown", function () {
            if (f.hasClass("down")) f.removeClass("down"), u.hide();
            else {
              if (f.addClass("down"), !r) {
                var i = n(t).position();
                u.css({
                  top: i.top + 24,
                  left: i.left - 10
                })
              }
              u.show();
              e = !0
            }
          }).hover(function () {
            e = !0
          }).mouseout(function () {
            e = !1
          }))
        };
        si = function (t, i, r, u) {
          var e = n(t),
            i = n(i),
            f = !1,
            o = u.dropUp,
            s;
          o && n(t).addClass("dropup");
          i.find("li").bind("mouseup", function () {
            u.seticon && (pu("#cur_" + e[0].id, n(this).children()), n(this).addClass("current").siblings().removeClass("current"));
            r.apply(this, arguments)
          });
          n(window).mouseup(function () {
            f || (e.removeClass("down"), i.hide(), i.css({
              top: 0,
              left: 0
            }));
            f = !1
          });
          s = i.height();
          n(t).bind("mousedown", function () {
            var r = n(t).offset();
            if (o ? (r.top -= i.height(), r.left += 8) : r.top += n(t).height(), n(i).offset(r), e.hasClass("down")) e.removeClass("down"), i.hide(), i.css({
              top: 0,
              left: 0
            });
            else return e.addClass("down"), i.show(), f = !0, !1
          }).hover(function () {
            f = !0
          }).mouseout(function () {
            f = !1
          });
          u.multiclick && i.mousedown(function () {
            f = !0
          })
        };
        n("#opac_slider").slider({
          start: function () {
            n("#opacity_dropdown li:not(.special)").hide()
          },
          stop: function () {
            n("#opacity_dropdown li").show();
            n(window).mouseup()
          },
          slide: function (n, t) {
            nh(t)
          }
        });
        i.addDropDown("#blur_dropdown", n.noop);
        wi = !1;
        n("#blur_slider").slider({
          max: 10,
          step: .1,
          stop: function (t, i) {
            wi = !1;
            pf(i);
            n("#blur_dropdown li").show();
            n(window).mouseup()
          },
          start: function () {
            wi = !0
          },
          slide: function (n, t) {
            pf(t, null, wi)
          }
        });
        i.addDropDown("#zoom_dropdown", function () {
          var t = n(this),
            i = t.attr("data-val");
          i ? yt(window, i) : oi({
            value: parseInt(t.text())
          })
        });
        si("#stroke_linecap", "#linecap_opts", function () {
          pi(this, !0)
        }, {
          dropUp: !0
        });
        si("#stroke_linejoin", "#linejoin_opts", function () {
          pi(this, !0)
        }, {
          dropUp: !0
        });
        si("#tool_position", "#position_opts", function () {
            var n = this.id.replace("tool_pos", "").charAt(0);
            t.alignSelectedElements(n, "page")
          }, {
            multiclick: !0
          }),
          function () {
            var i, r = function () {
              n(i).blur()
            };
            n("#svg_editor").find("button, select, input:not(#text)").focus(function () {
              i = this;
              hi = "toolbars";
              c.mousedown(r)
            }).blur(function () {
              hi = "canvas";
              c.unbind("mousedown", r);
              t.getMode() === "textedit" && n("#text").focus()
            })
          }();
        var rh = function () {
            g("#tool_select") && (t.setMode("select"), n("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all}, #svgcanvas svg{cursor:default}"))
          },
          uh = function () {
            g("#tool_pan") && (t.setMode("pan"), n("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all}, #svgcanvas svg{cursor:default}"))
          },
          fh = function () {
            eventAnalyticsRec("Editor", "clickFHPath");
            g("#tool_fhpath") && (t.setMode("fhpath"), g("#tool_fhpath"), t.clearSelection(), n("#styleoverrides").text("#svgcanvas svg{cursor:default}"))
          },
          ia = function () {
            g("#tool_line") && (t.setMode("line"), t.clearSelection())
          },
          ra = function () {
            g("#tool_square") && (t.setMode("square"), t.clearSelection())
          },
          ua = function () {
            g("#tool_rect") && (t.setMode("rect"), t.clearSelection())
          },
          fa = function () {
            g("#tool_fhrect") && (t.setMode("fhrect"), t.clearSelection())
          },
          ea = function () {
            g("#tool_circle") && (t.setMode("circle"), t.clearSelection())
          },
          oa = function () {
            g("#tool_ellipse") && (t.setMode("ellipse"), t.clearSelection())
          },
          sa = function () {
            g("#tool_fhellipse") && (t.setMode("fhellipse"), t.clearSelection())
          },
          ha = function () {
            g("#tool_image") && (t.setMode("image"), t.clearSelection())
          },
          eh = function () {
            eventAnalyticsRec("Editor", "clickZoom");
            g("#tool_zoom") && (t.setMode("zoom"), g("#tool_zoom"), c.css("cursor", er));
            n("#tool_zoom").one("touchstart", function () {
              return yt(window, "canvas"), n(this).unbind("touchstart"), !1
            })
          },
          oh = function () {
            g("#tool_zoom") && (yt(window, "canvas"), et())
          },
          ca = function () {
            g("#tool_text") && (t.setMode("text"), t.clearSelection())
          },
          sh = function () {
            eventAnalyticsRec("Editor", "clickPath");
            g("#tool_path") && (t.setMode("path"), g("#tool_path"), t.clearSelection(), n("#styleoverrides").text("#pathpointgrip_container * {cursor:pointer;pointer-events:all},  #svgcanvas svg{cursor:default}"), n("#showhideCtrlStl").empty(), n("#tool_showctlpnt").prop("checked", !1))
          },
          wf = function () {
            eventAnalyticsRec("Editor", "deleteSelected");
            (s !== null || b) && (t.deleteSelectedElements(), v())
          },
          bf = function () {
            eventAnalyticsRec("Editor", "cutSelected");
            (s !== null || b) && (t.cutSelectedElements(), v())
          },
          kf = function () {
            eventAnalyticsRec("Editor", "copySelected");
            (s !== null || b) && (t.copySelectedElements(), v())
          },
          hh = function () {
            eventAnalyticsRec("Editor", "pasteInCenter");
            var n = t.getZoom(),
              i = (c[0].scrollLeft + c.width() / 2) / n - t.contentW,
              r = (c[0].scrollTop + c.height() / 2) / n - t.contentH;
            t.pasteElements("point", i, r)
          },
          df = function () {
            eventAnalyticsRec("Editor", "moveToTopSelected");
            s !== null && t.moveToTopSelectedElement()
          },
          gf = function () {
            eventAnalyticsRec("Editor", "moveToBottomSelected");
            s !== null && t.moveToBottomSelectedElement()
          },
          bi = function (n) {
            eventAnalyticsRec("Editor", "moveUpDownSelected" + n);
            s !== null && t.moveUpDownSelected(n)
          },
          ch = function () {
            s !== null && t.convertToPath()
          },
          lh = function () {
            s !== null && ft.reorient()
          },
          ah = function () {
            (s !== null || b) && n.prompt(u.notification.enterNewLinkURL, "http://", function (n) {
              n && t.makeHyperlink(n)
            })
          },
          lt = function (n, i) {
            if (s !== null || b) {
              if (r.gridSnapping) {
                var u = t.getZoom() * r.snappingStep;
                n *= u;
                i *= u
              }
              t.moveSelectedElements(n, i)
            }
          },
          vh = function () {
            var t = !n("#tool_node_link").hasClass("active");
            t ? n("#tool_node_link").addClass("active") : n("#tool_node_link").removeClass("active");
            ft.linkControlPoints(t)
          },
          yh = function () {
            ft.getNodePoint() && ft.clonePathNode()
          },
          ph = function () {
            ft.getNodePoint() && ft.deletePathNode()
          },
          wh = function () {
            var t = n("#tool_add_subpath"),
              i = !t.hasClass("ui-state-active");
            i ? t.addClass("ui-state-active") : t.removeClass("ui-state-active");
            ft.addSubPath(i)
          },
          bh = function () {
            ft.opencloseSubPath()
          },
          kh = function () {
            var i = n("#showhideCtrlStl"),
              t;
            i.length ? i.text().length ? (i.empty(), n("#tool_showctlpnt").prop("checked", !1).show()) : (t = ".ctrlpoint { display: none; }", n("#showhideCtrlStl").text(t), n("#tool_showctlpnt").prop("checked", !0)) : (i = n('<style id="showhideCtrlStl"><\/style>').appendTo("head"), t = ".ctrlpoint { display: none; }", n("#showhideCtrlStl").text(t), n("#tool_showctlpnt").prop("checked", !0));
            n("#tool_showctlpnt+label").hide().show()
          },
          ne = function () {
            t.cycleElement(1)
          },
          te = function () {
            t.cycleElement(0)
          },
          ki = function (n, i) {
            if (s !== null && !b) {
              n || (i *= -1);
              var r = t.getRotationAngle(s),
                u = r + i;
              t.setRotationAngle(u);
              v()
            }
          },
          dh = function () {
            eventAnalyticsRec("Editor", "clickClear");
            var n = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
            if (n && (rt.getUndoStackSize() === 0 && (typeof r.canvasprojectinfo == "undefined" || r.canvasprojectinfo === null || r.uniqueCode !== "new") && (i.show_save_warning = !1), !r.no_save_warning && i.show_save_warning))
              if (window.confirm(u.notification.unsavedChangesMes)) i.show_save_warning = !1, location.href = "Index?uniqueCode=new";
              else return;
            location.href = "Index?uniqueCode=new"
          },
          la = function () {
            return t.setBold(!t.getBold()), v(), !1
          },
          aa = function () {
            return t.setItalic(!t.getItalic()), v(), !1
          },
          br = function (r) {
            var u, f;
            r && (i.curConfig.uniqueCode = "new", u = n("#canvas_title").val(), i.original_title === u && n("#canvas_title").val(""));
            f = {
              images: o.img_save,
              round_digits: 6
            };
            t.save(f)
          },
          ie = function (r) {
            var f, e;
            if (r) eventAnalyticsRec("Editor", "clickSaveAnother"), br(!0);
            else if (eventAnalyticsRec("Editor", "clickSaveOverwrite"), f = n("#canvas_title").val(), i.curConfig.uniqueCode !== "new" && i.original_title !== f) {
              n("#save-confirm-titlechg").dialog({
                autoOpen: !0,
                buttons: [{
                  id: "ct_save_1",
                  text: u.sccv.overwrite_project,
                  click: function () {
                    br(!1);
                    i.original_title = f;
                    n(this).dialog("close")
                  }
                }, {
                  id: "ct_save_2",
                  text: u.sccv.saveas_project,
                  click: function () {
                    br(!0);
                    i.original_title = f;
                    n(this).dialog("close")
                  }
                }, {
                  id: "ct_save_3",
                  text: u.common.cancel,
                  click: function () {
                    n(this).dialog("close")
                  }
                }],
                close: i.closeDialog,
                open: i.openDialog
              });
              return
            }
            e = {
              images: o.img_save,
              round_digits: 6
            };
            t.save(e)
          },
          gh = function () {
            eventAnalyticsRec("Editor", "clickFCMDownload");
            t.fcmExport()
          },
          nc = function () {
            eventAnalyticsRec("Sticker", "clickPDFDownload");
            fe();
            t.pdfExport()
          },
          tc = function () {
            eventAnalyticsRec("Editor", "clickCountPiece");
            t.countPiece()
          },
          ic = function () {
            if (!d.pngsave) {
              var i = u.notification.loadingImage;
              fr = window.open("data:text/html;charset=utf-8,<title>" + i + "<\/title><h1>" + i + "<\/h1>")
            }
            window.canvg ? t.rasterExport() : n.getScript(fcmhost + "/SVGEdit/canvg/rgbcolor.js", function () {
              n.getScript(fcmhost + "/SVGEdit/canvg/canvg.js", function () {
                t.rasterExport()
              })
            })
          },
          va = function () {
            t.open()
          },
          rc = function () {},
          kr = function () {
            eventAnalyticsRec("Editor", "clickUndo");
            rt.getUndoStackSize() > 0 && (hr(), et(), rt.undo(), it(), ai(), t.clearSelection())
          },
          dr = function () {
            eventAnalyticsRec("Editor", "clickRedo");
            rt.getRedoStackSize() > 0 && (hr(), et(), rt.redo(), it(), ai(), t.clearSelection())
          },
          re = function () {
            eventAnalyticsRec("Editor", "clickGroup");
            b && t.groupSelectedElements()
          },
          uc = function () {
            eventAnalyticsRec("Editor", "clickUnGroup");
            s && t.ungroupSelectedElement()
          },
          fc = function () {
            b ? t.groupSelectedElements() : s && t.ungroupSelectedElement()
          },
          ec = function () {
            eventAnalyticsRec("Editor", "clickClone");
            t.cloneSelectedElements(20, 20)
          },
          oc = function () {
            eventAnalyticsRec("Editor", "clickAlign");
            var i = this.id.replace("tool_align", "").charAt(0);
            t.alignSelectedElements(i, n("#align_relative_to").val())
          },
          sc = function (i) {
            var r = t.getResolution();
            i = i ? r.zoom * i : 1;
            n("#zoom").val(i * 100);
            t.setZoom(i);
            ue();
            ut(!0)
          },
          ue = function () {
            au()
          },
          fe = function () {
            n("#tool_wireframe").prop("checked") && gr();
            n("#tool_wireframe2").prop("checked") && nu()
          },
          gr = function () {
            var r, i;
            eventAnalyticsRec("View", "clickWireframe");
            c.hasClass("wireframe2") && nu();
            $chk = n("#tool_wireframe");
            r = c.hasClass("wireframe");
            r ? c.removeClass("wireframe") : c.addClass("wireframe");
            $chk.prop("checked", !r);
            i = n("#wireframe_rules");
            i.length ? i.empty() : i = n('<style id="wireframe_rules"><\/style>').appendTo("head");
            t.clearSelection();
            au()
          },
          nu = function () {
            var r, i;
            eventAnalyticsRec("View", "clickWireframe2");
            c.hasClass("wireframe") && gr();
            $chk = n("#tool_wireframe2");
            r = c.hasClass("wireframe2");
            r ? c.removeClass("wireframe2") : c.addClass("wireframe2");
            $chk.prop("checked", !r);
            i = n("#wireframe_rules");
            i.length ? i.empty() : i = n('<style id="wireframe_rules"><\/style>').appendTo("head");
            t.clearSelection();
            au()
          },
          wt = function () {
            var n = t.getResolution();
            return (n.w = n.w.toFixed(0), n.h = n.h.toFixed(0), n.w === "1121" && n.h === "1129") ? 0 : n.w === "1121" && n.h === "2281" ? 1 : n.w === "771" && n.h === "1100" ? 2 : n.w === "1100" && n.h === "771" ? 3 : n.w === "794" && n.h === "1032" ? 4 : n.w === "1032" && n.h === "794" ? 5 : n.w === "355" && n.h === "537" ? 6 : n.w === "537" && n.h === "355" ? 7 : void 0
          },
          st = function (n) {
            var i = 1121.272,
              r = 1129.323;
            n === 1 ? (i = 1121.272, r = 1129.323) : n === 2 ? (i = 1121.272, r = 2281.323) : n === 3 ? (i = 771.023, r = 1099.842) : n === 4 ? (i = 1099.842, r = 771.023) : n === 5 ? (i = 793.701, r = 1031.811) : n === 6 ? (i = 1031.811, r = 793.701) : n === 7 ? (i = 355.275, r = 536.693) : n === 8 && (i = 536.693, r = 355.275);
            t.setResolution(i, r);
            v();
            ut()
          },
          ya = function () {
            t.importPatternCore(n(this), p * 10, p * 10);
            p++
          },
          ee = function () {
            var e, f, i, o;
            eventAnalyticsRec("Rhinestone", "showRSWizard");
            (s !== null || b) && !vt && !t.IsContainsRhinestone(null, !0) && t.IsContainsOutline() && (vt = !0, r.baseUnit === "in" ? n("#rs_ptn1_space,#rs_ptn2_h_space,#rs_ptn2_v_space,#rs_ptn3_h_space,#rs_ptn3_v_space,#rs_ptn4_space,#rs_ptn5_h_space,#rs_ptn5_v_space").slider({
              max: .4,
              min: .02,
              step: .01,
              slide: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value.toFixed(2) + u.common.inch)
              },
              change: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value.toFixed(2) + u.common.inch)
              },
              value: .04
            }) : n("#rs_ptn1_space,#rs_ptn2_h_space,#rs_ptn2_v_space,#rs_ptn3_h_space,#rs_ptn3_v_space,#rs_ptn4_space,#rs_ptn5_h_space,#rs_ptn5_v_space").slider({
              max: 10,
              min: .3,
              step: .1,
              slide: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value.toFixed(1) + u.common.mm)
              },
              change: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value.toFixed(1) + u.common.mm)
              },
              value: 1
            }), n("#rs_ptn2_d_angle,#rs_ptn4_d_angle,#rs_ptn5_d_angle").slider({
              max: 359,
              min: 0,
              step: 1,
              slide: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value + u.common.degrees)
              },
              change: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value + u.common.degrees)
              },
              value: 0
            }), n("#rs_ptn2_s_angle").slider({
              max: 135,
              min: 45,
              step: 1,
              slide: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value + u.common.degrees)
              },
              change: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value + u.common.degrees)
              },
              value: 90
            }), n("#rs_ptn4_step").slider({
              max: 50,
              min: 2,
              step: 1,
              slide: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value + u.common.steps)
              },
              change: function (t, i) {
                n("#" + t.target.id + "_amount").html(i.value + u.common.steps)
              },
              value: 6
            }), e = "#" + n('input[name="rs_ptns"]:checked').attr("id") + "_option", n(e).show(), s && s.firstChild && s.firstChild.nodeName === "path" && (f = s.firstChild.getAttribute("data-rsparams"), f && (i = f.split("|"), n("#rs_wiz_ss").val(i[0]).selectmenu("refresh"), o = n("#rs_ptn_" + i[1]).prop("checked", !0).button("refresh").change(), n("#rs_ptn_1").is(":checked") ? r.baseUnit === "in" ? n("#rs_ptn1_space").slider("value", parseFloat(i[2]) / 25.4) : n("#rs_ptn1_space").slider("value", parseFloat(i[2])) : n("#rs_ptn_2").is(":checked") ? (r.baseUnit === "in" ? (n("#rs_ptn2_h_space").slider("value", parseFloat(i[2]) / 25.4), n("#rs_ptn2_v_space").slider("value", parseFloat(i[3]) / 25.4)) : (n("#rs_ptn2_h_space").slider("value", parseFloat(i[2])), n("#rs_ptn2_v_space").slider("value", parseFloat(i[3]))), n("#rs_ptn2_d_angle").slider("value", parseInt(i[4])), n("#rs_ptn2_s_angle").slider("value", parseInt(i[5]))) : n("#rs_ptn_3").is(":checked") ? r.baseUnit === "in" ? (n("#rs_ptn3_h_space").slider("value", parseFloat(i[2]) / 25.4), n("#rs_ptn3_v_space").slider("value", parseFloat(i[3]) / 25.4)) : (n("#rs_ptn3_h_space").slider("value", parseFloat(i[2])), n("#rs_ptn3_v_space").slider("value", parseFloat(i[3]))) : n("#rs_ptn_4").is(":checked") ? (r.baseUnit === "in" ? n("#rs_ptn4_space").slider("value", parseFloat(i[2]) / 25.4) : n("#rs_ptn4_space").slider("value", parseFloat(i[2])), n("#rs_ptn4_step").slider("value", parseInt(i[3])), n("#rs_ptn4_d_angle").slider("value", parseInt(i[4]))) : n("#rs_ptn_5").is(":checked") && (r.baseUnit === "in" ? (n("#rs_ptn5_h_space").slider("value", parseFloat(i[2]) / 25.4), n("#rs_ptn5_v_space").slider("value", parseFloat(i[3]) / 25.4)) : (n("#rs_ptn5_h_space").slider("value", parseFloat(i[2])), n("#rs_ptn5_v_space").slider("value", parseFloat(i[3]))), n("#rs_ptn5_d_angle").slider("value", parseInt(i[4]))))), n("#rs_wiz").dialog("open"))
          };
        n('input[name="rs_ptns"]').change(function () {
          n(".ptn_option").hide();
          var t = "#" + n('input[name="rs_ptns"]:checked').attr("id") + "_option";
          n(t).show()
        });
        var hc = i.onOKRSWizard = function () {
            var f, c = null,
              i = null,
              u = null,
              o = null,
              l = null,
              a = null,
              v = null,
              h, y, p;
            if (c = n("#rs_wiz_ss").val(), n("#rs_ptn_1").is(":checked") ? (f = 1, i = r.baseUnit === "in" ? n("#rs_ptn1_space").slider("value") * 25.4 : n("#rs_ptn1_space").slider("value")) : n("#rs_ptn_2").is(":checked") ? (f = 2, r.baseUnit === "in" ? (i = n("#rs_ptn2_h_space").slider("value") * 25.4, u = n("#rs_ptn2_v_space").slider("value") * 25.4) : (i = n("#rs_ptn2_h_space").slider("value"), u = n("#rs_ptn2_v_space").slider("value")), o = n("#rs_ptn2_d_angle").slider("value"), l = n("#rs_ptn2_s_angle").slider("value")) : n("#rs_ptn_3").is(":checked") ? (f = 3, r.baseUnit === "in" ? (i = n("#rs_ptn3_h_space").slider("value") * 25.4, u = n("#rs_ptn3_v_space").slider("value") * 25.4) : (i = n("#rs_ptn3_h_space").slider("value"), u = n("#rs_ptn3_v_space").slider("value"))) : n("#rs_ptn_4").is(":checked") ? (f = 4, i = r.baseUnit === "in" ? n("#rs_ptn4_space").slider("value") * 25.4 : n("#rs_ptn4_space").slider("value"), u = n("#rs_ptn4_step").slider("value"), o = n("#rs_ptn4_d_angle").slider("value")) : n("#rs_ptn_5").is(":checked") && (f = 5, r.baseUnit === "in" ? (i = n("#rs_ptn5_h_space").slider("value") * 25.4, u = n("#rs_ptn5_v_space").slider("value") * 25.4) : (i = n("#rs_ptn5_h_space").slider("value"), u = n("#rs_ptn5_v_space").slider("value")), o = n("#rs_ptn5_d_angle").slider("value")), a = 0, v = "outward", s !== null || b) {
              if (y = 0, s && s.tagName === "g" && s.firstChild && s.firstChild.nodeName === "path" && s.firstChild.getAttribute("data-rsparams")) y = t.getRotationAngle(s), h = t.svgToString(s.firstChild);
              else if (h = t.getSelectedSVGString(!0), h === "") {
                e();
                n.sccv_alert(svgEditor.uiStrings.notification.NoPath);
                return
              }
              p = "mode:" + f + ",ss:" + c + ",parms:[" + [i, u, o, l, a, v].join(",") + "]";
              eventAnalyticsRec("Rhinestone", "clickOkRsWizard", "click", p);
              oe({
                cmd: "wsRizard",
                ss: c,
                mode: f,
                parm1: i,
                parm2: u,
                parm3: o,
                parm4: l,
                parm5: a,
                parm6: v,
                svgdata: encodeURI(h)
              }, function () {
                n("#rs_wiz_ok").parent().removeClass("spinsmall");
                n("#rs_wiz_ok").attr("disabled", !1).removeClass("ui-state-disabled");
                vt = !1;
                n("#rs_wiz").dialog("close")
              }, !1, "selected", y);
              n("#rs_wiz_ok").attr("disabled", !0).addClass("ui-state-disabled");
              n("#rs_wiz_ok").parent().addClass("spinsmall")
            }
          },
          cc = i.onCancelRSWizard = function () {
            f !== null && f.abort();
            vt = !1;
            n("#rs_wiz").dialog("close")
          },
          oe = i.ExecRSCore = function (i, r, u, e, o, s) {
            hr();
            f = n.ajax({
              async: !0,
              type: "POST",
              url: "handleRSWizard",
              data: AddAntiForgeryToken(i),
              dataType: "json"
            }).success(function (i) {
              vt === !0 && (i[0].bSuccess ? t.insertRhineStoneElements(i[1], u, e, o) : (n.sccv_alert(i[0].message), eventAnalyticsRec("ErrorS99", "execRSCore")))
            }).error(function (t) {
              t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
              s && s()
            }).complete(function () {
              f = null;
              r();
              ai(); of (null, t.getSelectedElems());
              v()
            })
          },
          tt = null,
          tu = !0,
          lc = function (n) {
            n.preventDefault();
            iu.apply(this)
          },
          iu = function () {
            var r, i, u;
            n("#stwiz_inputtext").attr("disabled", !1);
            n("#stwiz_setText,#stwiz_zoomin,#stwiz_zoomreal,#stwiz_zoomout").button("option", "disabled", !1);
            n(".templateimage.active").removeClass("active");
            r = n(this);
            r.addClass("active");
            i = n(this).attr("data-template");
            u = ru(i, null, !0);
            n("#stwiz_inputtext").val(u);
            for (var f = i.split("|"), e = parseInt(f[1]), o = parseInt(f[2]), t = .25; t > .125;) {
              if (e * t < 390) break;
              t -= .0625
            }
            while (t > .125) {
              if (o * t < 240) break;
              t -= .0625
            }
            n("#stwiz_canvas").attr("data-zoom", t).css({
              transform: "scale(" + t + ")",
              "-webkit-transform": "scale(" + t + ")",
              "-o-transform": "scale(" + t + ")"
            });
            n("#stwiz_preview").scrollTop(0).scrollLeft(0);
            t *= 400;
            n("#stwiz_zoomval").text(t + "%")
          },
          ac = function () {
            if (eventAnalyticsRec("Sticker", "showSTWizard"), fe(), tt === null) f = n.ajax({
              async: !0,
              type: "POST",
              url: "GetStickerList",
              dataType: "json"
            }).success(function (t) {
              if (t[0].bSuccess) {
                var i = t[1];
                tt = i;
                n(".stwiz_templateBox").children().remove();
                n.each(i, function (t, i) {
                  var r = n("#" + i.image_category),
                    u = n("<li class='templateimage'>");
                  u.addClass(i.image_category).attr("data-template", t + "|" + i.image_width + "|" + i.image_height).css("background-position", i.background_position).attr("data-category", i.image_category).click(lc).appendTo(r)
                });
                n("#stwiz").dialog("open");
                n("#stwiz_accordion").accordion()
              } else n.sccv_alert(t[0].message), eventAnalyticsRec("ErrorS99", "showSTWizard")
            }).error(function (t) {
              t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
            }).complete(function () {
              f = null
            });
            else {
              n("#stwiz").dialog("open");
              var t = n(".templateimage.active");
              t.size() > 0 && typeof iu != "undefined" && iu.apply(t)
            }
          },
          se = "",
          ru = function (t, i, f) {
            var y = .25,
              s = t.split("|"),
              l = n("#stwiz_canvas"),
              e, c, v;
            l.prop({
              width: s[1],
              height: s[2]
            }).css("opacity", "0");
            n("#stwiz_preview_frame").css({
              width: s[1],
              height: s[2],
              cursor: "move"
            });
            e = l[0].getContext("2d");
            e.clearRect(0, 0, s[1], s[2]);
            var o = s[0],
              h = f ? tt[o].deftext : i,
              p = n("#fdlist span[data-fontname='" + tt[o].font + "']").attr("data-enablechar"),
              w = new RegExp(p);
            h.search(w) !== -1 ? (n.sccv_alert(u.notification.ContainsInvalidCharacter), h = se, n("#stwiz_inputtext").val(h)) : se = h;
            var a = r.baseUnit === "in" ? "&Prime;" : a = u.common.mm,
              b = svgedit.units.convertUnit(s[1] * y).toFixed(2),
              k = svgedit.units.convertUnit(s[2] * y).toFixed(2),
              d = n("<div class='image_wiz_imgparam'><span class='sncicon size_width'><\/span>" + b + a + "<\/div>"),
              g = n("<div class='image_wiz_imgparam'><span class='sncicon size_height'><\/span>" + k + a + "<\/div>");
            return n("#stwiz_size").empty().append(g).append(d), c = new Image, c.src = "../../STData/" + o, v = setTimeout(function () {
              n("#stwiz_preview").addClass("spinsmall")
            }, 500), c.onload = function () {
              var t, i;
              if (clearTimeout(v), n("#stwiz_preview").removeClass("spinsmall"), e.drawImage(c, 0, 0, s[1], s[2]), h && h !== "") {
                t = tt[o].text_height;
                e.textAlign = "center";
                e.font = t + "pt " + tt[o].font;
                e.fillStyle = tt[o].fontcolor;
                i = e.measureText(h);
                e.save();
                var r = Math.min(i.width, tt[o].text_width),
                  u = tt[o].text_x - r * .5 + r * .5,
                  f = tt[o].text_y - t + t * .5;
                e.translate(u, f);
                e.rotate(tt[o].text_rotate * Math.PI / 180);
                e.translate(-u, -f);
                e.fillText(h, tt[o].text_x, tt[o].text_y, tt[o].text_width);
                e.restore()
              }
              l.clearQueue().animate({
                opacity: "1"
              }, {
                duration: 300,
                queue: !0
              });
              tu = !1
            }, c.onerror = function () {
              clearTimeout(v);
              n("#stwiz_preview").removeClass("spinsmall");
              n.sccv_alert(u.notification.ServerError);
              tu = !0
            }, h
          };
        n("#stwiz_setText").button({
          disabled: !0
        }).click(function () {
          var t = n(".templateimage.active").first().attr("data-template"),
            i = n("#stwiz_inputtext").val();
          ru(t, i, !1)
        });
        n("#stwiz_inputtext").keypress(function (t) {
          if (t.keyCode === 13) {
            var i = n(".templateimage.active").first().attr("data-template"),
              r = n(this).val();
            ru(i, r, !1)
          }
        });
        n("#stwiz_zoomset").buttonset();
        n("#stwiz_zoomin").button({
          text: !1,
          disabled: !0
        }).click(function () {
          var i = n("#stwiz_canvas"),
            t = parseFloat(i.attr("data-zoom")) + .0625;
          t = t > 1 ? 1 : t;
          t = t.toFixed(4);
          i.attr("data-zoom", t).css({
            transform: "scale(" + t + ")",
            "-webkit-transform": "scale(" + t + ")",
            "-o-transform": "scale(" + t + ")"
          });
          t *= 400;
          n("#stwiz_zoomval").text(t + "%")
        }).css("padding", "0").append("<span />").children("span").addClass("sncicon zoomin stwiz_preview").removeClass("ui-button-text");
        n("#stwiz_zoomreal").button({
          text: !1,
          disabled: !0
        }).click(function () {
          n("#stwiz_canvas").attr("data-zoom", .25).css({
            transform: "scale(0.25)",
            "-webkit-transform": "scale(0.25)",
            "-o-transform": "scale(0.25)"
          });
          n("#stwiz_zoomval").text("100%")
        }).css("padding", "0").append("<span />").children("span").addClass("sncicon zoomreal stwiz_preview").removeClass("ui-button-text");
        n("#stwiz_zoomout").button({
          text: !1,
          disabled: !0
        }).click(function () {
          var i = n("#stwiz_canvas"),
            t = parseFloat(i.attr("data-zoom")) - .0625;
          t = t < .125 ? .125 : t;
          t = t.toFixed(4);
          i.attr("data-zoom", t).css({
            transform: "scale(" + t + ")",
            "-webkit-transform": "scale(" + t + ")",
            "-o-transform": "scale(" + t + ")"
          });
          t *= 400;
          n("#stwiz_zoomval").text(t + "%")
        }).css("padding", "0").append("<span />").children("span").addClass("sncicon zoomout stwiz_preview").removeClass("ui-button-text");
        n("#stwiz_preview_frame").mousedown(function (t) {
          var i = t.pageX,
            r = t.pageY,
            u = 0,
            f = 0;
          n(document).on("mousemove.stwiz_preview_frame", function (t) {
            var e, o, s;
            return u = i - t.pageX, i = t.pageX, f = r - t.pageY, r = t.pageY, e = n("#stwiz_preview"), o = e.scrollTop(), e.scrollTop(o + f), s = e.scrollLeft(), e.scrollLeft(s + u), !1
          }).one("mouseup", function () {
            n(document).off("mousemove.stwiz_preview_frame")
          });
          return !1
        });
        vc = i.okSTWizard = function () {
          if (!tu) {
            var r = n("#stwiz_accordion .active"),
              u = r.attr("data-category"),
              f = r.attr("data-template").split("|")[0];
            eventAnalyticsRec("Sticker", "clickOkStWizard", "click", u + "-" + f);
            var i = n("#stwiz_canvas"),
              e = i[0].toDataURL("image/png"),
              o = t.insertImageElements(e, i.prop("width") * .25, i.prop("height") * .25, 25, 25, 0, 0);
            t.selectOnly([o]);
            v()
          }
        };
        uu = function () {
          eventAnalyticsRec("Editor", "showOffsetWizard");
          (s !== null || b) && !fi && !t.IsContainsRhinestone() && t.IsContainsOutline() && (fi = !0, r.baseUnit === "in" ? (n("#offset_wiz_space").slider({
            value: .2,
            min: .04,
            max: 1.2,
            step: .04,
            slide: function (t, i) {
              n("#" + t.target.id + "_amount").html(i.value + u.common.inch)
            }
          }), n("#offset_wiz_space").slider("option", "value", .2), n("#offset_wiz_space_amount").html(n("#offset_wiz_space").slider("value") + u.common.inch)) : (n("#offset_wiz_space").slider({
            value: 5,
            min: 1,
            max: 30,
            step: 1,
            slide: function (t, i) {
              n("#" + t.target.id + "_amount").html(i.value + u.common.mm)
            }
          }), n("#offset_wiz_space_amount").html(n("#offset_wiz_space").slider("value") + u.common.mm)), n("#offset_wiz").dialog("open"))
        };
        n('input[name="offset_wiz_dir"]').change(function () {
          n('input[name="offset_wiz_dir"]:checked').val() === "outward" ? (n("#offset_wiz_outline_only").prop("disabled", !1).next().removeClass("disabled"), n("#offset_wiz_base").attr("data-dir", "outward")) : (n("#offset_wiz_outline_only").prop("disabled", !0).next().addClass("disabled"), n("#offset_wiz_base").attr("data-dir", "inward"))
        });
        var pa = i.onOKOffsetWizard = function () {
            var h = null,
              u = null,
              c = null,
              e = null,
              o;
            if (h = r.baseUnit === "in" ? n("#offset_wiz_space").slider("value") * 25.4 : n("#offset_wiz_space").slider("value"), u = n('input[name="offset_wiz_dir"]:checked').val(), c = n('input[name="offset_wiz_type"]:checked').val(), e = n("#offset_wiz_outline_only").is(":checked"), u !== "outward" && (e = !1), s !== null || b) {
              if (o = t.getSelectedSVGString(!0), o === "") {
                n.sccv_alert(svgEditor.uiStrings.notification.NoPath);
                return
              }
              f = n.ajax({
                async: !0,
                type: "POST",
                url: "handleCreateOffsetLine",
                data: AddAntiForgeryToken({
                  cmd: "create_offsetline",
                  spacing: h,
                  count: 1,
                  direction: u,
                  cornertype: c,
                  outeronly: e,
                  svgdata: encodeURI(o)
                }),
                dataType: "json"
              }).success(function (r) {
                if (fi === !0)
                  if (r[0].bSuccess) {
                    i.show_save_warning = !0;
                    offset_baseline = n('input[name="offset_wiz_base"]:checked').val();
                    var u = offset_baseline === "del" ? !0 : !1,
                      f = offset_baseline === "draw" ? !0 : !1;
                    t.insertConvetedElements(r[1], u, f);
                    v()
                  } else n.sccv_alert(r[0].message), eventAnalyticsRec("ErrorS99", "onOKOffsetWizard")
              }).error(function (t) {
                t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
              }).complete(function () {
                f = null;
                n("#offset_wiz_ok").parent().removeClass("spinsmall");
                n("#offset_wiz_ok").attr("disabled", !1).removeClass("ui-state-disabled");
                fi = !1;
                n("#offset_wiz").dialog("close")
              });
              n("#offset_wiz_ok").attr("disabled", !0).addClass("ui-state-disabled");
              n("#offset_wiz_ok").parent().addClass("spinsmall")
            }
          },
          wa = i.onCancelOffsetWizard = function () {
            f !== null && f.abort();
            fi = !1;
            n("#offset_wiz").dialog("close")
          },
          he = function () {
            if (eventAnalyticsRec("Editor", "onMergePath"), (s !== null || b) && l === null && !t.IsContainsRhinestone() && t.IsContainsOutline()) {
              et();
              h(!0);
              var r = t.getSelectedSVGString(!0);
              if (r === "") {
                e();
                n.sccv_alert(svgEditor.uiStrings.notification.NoPath);
                return
              }
              n.ajax({
                async: !0,
                type: "POST",
                url: "handleMergePath",
                data: AddAntiForgeryToken({
                  cmd: "marge_path",
                  svgdata: encodeURI(r)
                }),
                dataType: "json"
              }).success(function (r) {
                r[0].bSuccess ? (i.show_save_warning = !0, t.insertConvetedElements(r[1], !0), v()) : (n.sccv_alert(r[0].message), eventAnalyticsRec("ErrorS99", "onMergePath"));
                e()
              }).error(function () {
                n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
                e()
              })
            }
          },
          ce = function () {
            if (eventAnalyticsRec("Editor", "onDividePath"), (s !== null || b) && l === null && !t.IsContainsRhinestone() && t.IsContainsOutline()) {
              et();
              h(!0);
              var r = t.getSelectedSVGString(!0);
              if (r === "") {
                e();
                n.sccv_alert(svgEditor.uiStrings.notification.NoPath);
                return
              }
              n.ajax({
                async: !0,
                type: "POST",
                url: "handleDividePath",
                data: AddAntiForgeryToken({
                  cmd: "divide_path",
                  svgdata: encodeURI(r)
                }),
                dataType: "json"
              }).success(function (r) {
                r[0].bSuccess ? (i.show_save_warning = !0, t.insertConvetedElements(r[1], !0), v()) : (n.sccv_alert(r[0].message), eventAnalyticsRec("ErrorS99", "onDividePath"));
                e()
              }).error(function () {
                n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
                e()
              })
            }
          },
          le = function () {
            if (eventAnalyticsRec("Editor", "onRemoveOverlapPath"), (s !== null || b) && l === null && !t.IsContainsRhinestone() && t.IsContainsOutline()) {
              et();
              h(!0);
              var r = t.getSelectedSVGString(!0);
              if (r === "") {
                e();
                n.sccv_alert(svgEditor.uiStrings.notification.NoPath);
                return
              }
              n.ajax({
                async: !0,
                type: "POST",
                url: "handleRemoveOverlapPath",
                data: AddAntiForgeryToken({
                  cmd: "rmoverlap_path",
                  svgdata: encodeURI(r)
                }),
                dataType: "json"
              }).success(function (r) {
                r[0].bSuccess ? (i.show_save_warning = !0, t.insertConvetedElements(r[1], !0), v()) : (n.sccv_alert(r[0].message), eventAnalyticsRec("ErrorS99", "onRemoveOverlapPath"));
                e()
              }).error(function () {
                n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
                e()
              })
            }
          },
          ae = function () {
            if (eventAnalyticsRec("Editor", "onSubtractOverlapPath"), (s !== null || b) && l === null && !t.IsContainsRhinestone() && t.IsContainsOutline()) {
              et();
              h(!0);
              var r = t.getSelectedSVGString(!0);
              if (r === "") {
                e();
                n.sccv_alert(svgEditor.uiStrings.notification.NoPath);
                return
              }
              n.ajax({
                async: !0,
                type: "POST",
                url: "handleSubtractOverlapPath",
                data: AddAntiForgeryToken({
                  cmd: "subtract_path",
                  svgdata: encodeURI(r)
                }),
                dataType: "json"
              }).success(function (r) {
                r[0].bSuccess ? (i.show_save_warning = !0, t.insertConvetedElements(r[1], !0), v()) : (n.sccv_alert(r[0].message), eventAnalyticsRec("ErrorS99", "onSubtractOverlapPath"));
                e()
              }).error(function () {
                n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
                e()
              })
            }
          },
          ba = i.onOKResizeScale = function () {
            var i, r, u = !1,
              f, e;
            return (i = parseFloat(n("#objheight_sc").val()), isNaN(i) && (i = 100, u = !0), r = parseFloat(n("#objwidth_sc").val()), isNaN(r) && (r = 100, u = !0), r < 0 || i < 0 || u) ? (n.sccv_alert(svgEditor.uiStrings.notification.invalidAttrValGiven), !1) : (f = r * .01, e = i * .01, t.resizeSelectedElementsByScale(f, e), !0)
          },
          ka = i.onOpenResizeScale = function () {
            n("#objheight_sc,#objwidth_sc").val("100.0");
            yi = "100.0"
          },
          fu = function () {
            return
          },
          yc = function () {
            var u = !n("#view_grid").hasClass("push_button_pressed"),
              i = !n("#tool_viewgrid_icon").hasClass("ui-icon-check");
            i ? (r.showGrid = showGrid = !0, n("#tool_viewgrid_icon").addClass("ui-icon-check").removeClass("ui-icon-none"), n("#canvasGrid").attr("display", "normal"), fu(t.getZoom())) : (r.showGrid = showGrid = !1, n("#tool_viewgrid_icon").removeClass("ui-icon-check").addClass("ui-icon-none"), n("#canvasGrid").attr("display", "none"))
          },
          pc = function () {
            var u = !n("#snap_grid").hasClass("push_button_pressed"),
              i = !n("#tool_snapgrid_icon").hasClass("ui-icon-check");
            i ? (r.gridSnapping = !0, n("#tool_snapgrid_icon").addClass("ui-icon-check").removeClass("ui-icon-none")) : (r.gridSnapping = !1, n("#tool_snapgrid_icon").removeClass("ui-icon-check").addClass("ui-icon-none"));
            t.setConfig(r)
          },
          wc = function () {
            var u = !n("#show_ruler").hasClass("push_button_pressed"),
              i = !n("#tool_showruler_icon").hasClass("ui-icon-check");
            i ? (r.showRulers = !0, n("#tool_showruler_icon").addClass("ui-icon-check").removeClass("ui-icon-none")) : (r.showRulers = !1, n("#tool_showruler_icon").removeClass("ui-icon-check").addClass("ui-icon-none"));
            n("#rulers").toggle(r.showRulers);
            r.showRulers && gu();
            t.setConfig(r)
          },
          ve = {
            "in": {
              min: .08,
              max: 600,
              step: .25,
              decimals: 2,
              forcestepdivisibility: "none",
              buttonup_txt: "",
              buttondown_txt: ""
            },
            mm: {
              min: 2,
              max: 600,
              step: 1,
              decimals: 1,
              forcestepdivisibility: "none",
              buttonup_txt: "",
              buttondown_txt: ""
            }
          },
          ye = function (i) {
            eventAnalyticsRec("View", "clickSetUnit");
            r.baseUnit = i;
            t.setConfig(r);
            try {
              n.pref("unit", r.baseUnit)
            } catch (u) {
              console.log(u)
            }
            r.showGrid && fu(t.getZoom());
            n("#objwidth,#objheight").trigger("touchspin.updatesettings", ve[i]);
            ut();
            v()
          },
          bc = function () {
            eventAnalyticsRec("View", "clickShowMatImage");
            var i = wt(),
              r = fcmhost + "/Content/images/Mat" + i + ".svg",
              u = n("#tool_showmat").prop("checked");
            u ? (o.showMatImage = !1, n("#tool_showmat").prop("checked", !1), r = null) : (o.showMatImage = !0, n("#tool_showmat").prop("checked", !0));
            try {
              n.pref("showMatImage", o.showMatImage)
            } catch (f) {
              console.log(f)
            }
            t.setMatImage(i, r)
          },
          kc = function () {
            eventAnalyticsRec("Rhinestone", "clickRSSingle");
            g("#menu_rssingle") && (n("#circle_panel").show(), t.setMode("rssingle"), g("#menu_rssingle"), t.clearSelection(), n("#styleoverrides").text("#svgcanvas svg{cursor:default}"))
          },
          dc = function () {
            eventAnalyticsRec("Rhinestone", "clickShowRhineStoneCount");
            ef = !0;
            var i = t.calcRhinestoneCounts();
            n("#rs_countSS6").text(i.SS6);
            n("#rs_countSS10").text(i.SS10);
            n("#rs_countSS16").text(i.SS16);
            n("#rs_countSS20").text(i.SS20);
            n("#rs_count_wiz").dialog("open")
          },
          da = i.closeRhineStoneCount = function () {
            ef = !1
          },
          eu = function (t) {
            var i, h, c, l;
            if (!t[0].bSuccess) {
              n.sccv_alert(t[0].message);
              return
            }
            i = t[1];
            n("#image_wiz_preview").empty();
            n("#image_wiz_prop").empty();
            var a = r.baseUnit === "mm" ? 0 : 2,
              v = svgedit.units.convertUnit(i[4]).toFixed(a),
              y = svgedit.units.convertUnit(i[5]).toFixed(a),
              f = 300,
              e, o, s;
            i[1] > i[2] ? (e = i[1] > f ? f : i[1] > 0 ? i[1] : f, s = e / i[1], o = i[2] * s) : (o = i[2] > f ? f : i[2] > 0 ? i[2] : f, s = o / i[2], e = i[1] * s);
            h = r.baseUnit === "in" ? "&Prime;" : u.common.mm;
            c = n("<img id='img_org'>");
            l = n("<div id='image_wiz_mask'><\/div>");
            c.attr("src", i[3]);
            var p = n("<span id='image_wiz_mask_icon_' class='sncicon akawaku'><\/span>"),
              w = n("<div class='image_wiz_imgparam' id='image_wiz_imgwidth' data-value='" + i[1] + "'> <span class='sncicon size_width'><\/span>" + v + h + "<\/div>"),
              b = n("<div class='image_wiz_imgparam' id='image_wiz_imgheight' data-value='" + i[2] + "'><span class='sncicon size_height'><\/span>" + y + h + "<\/div>"),
              k = n("<div id='image_wiz_imgcontenttype' style='display:none' data-value='" + i[0] + "'><\/div>"),
              d = n("<div id='image_wiz_vwratio' style='display:none' data-value='" + s + "'><\/div>"),
              g = n("<div id='image_wiz_hdpi' style='display:none' data-value='" + i[6] + "'><\/div>"),
              nt = n("<div id='image_wiz_vdpi' style='display:none' data-value='" + i[7] + "'><\/div>");
            n("#image_wiz_preview").append(c).append(l).css("width", e).css("height", o);
            n("#image_wiz_prop").append(p).append(b).append(w).append(k).append(d).append(g).append(nt);
            l.css("width", e - 4).css("height", o - 4).resizable({
              handles: "all",
              containment: "parent",
              minWidth: 10,
              minHeight: 10
            }).draggable({
              containment: "parent",
              cursor: "move"
            }).resize(function () {
              var t = r.baseUnit === "in" ? "&Prime;" : u.common.mm;
              var i = r.baseUnit === "mm" ? 0 : 2,
                f = parseFloat(n("#image_wiz_vwratio").attr("data-value")),
                e = parseFloat(n("#image_wiz_hdpi").attr("data-value")) / 96,
                o = parseFloat(n("#image_wiz_vdpi").attr("data-value")) / 96,
                s = "<span class='sncicon size_width'><\/span>" + svgedit.units.convertUnit(n(this).outerWidth() / f / e).toFixed(i) + t,
                h = "<span class='sncicon size_height'><\/span>" + svgedit.units.convertUnit(n(this).outerHeight() / f / o).toFixed(i) + t;
              n("#image_wiz_imgwidth").html(s);
              n("#image_wiz_imgheight").html(h)
            })
          },
          ot = !1,
          w = {
            x: 0,
            y: 0,
            bSel: 0
          },
          ou = function () {
            if (!b && s && s.tagName === "image") {
              w.x = parseFloat(s.getAttribute("x"));
              w.y = parseFloat(s.getAttribute("y"));
              var i = s.getAttribute("width"),
                r = s.getAttribute("height"),
                t = s.getAttribute("xlink:href"),
                u = s.getAttribute("transform");
              f = n.ajax("ImageTraceFile2", {
                type: "post",
                data: AddAntiForgeryToken({
                  top: w.y,
                  left: w.x,
                  width: i,
                  height: r,
                  imgsrc: t,
                  transform: u
                }),
                dataType: "json",
                success: function (i) {
                  if (!i[0].bSuccess) {
                    n.sccv_alert(i[0].message);
                    eventAnalyticsRec("ErrorS99", "showImageTraceWizard", "click", t);
                    return
                  }
                  w.bSel = !0;
                  eu(i);
                  var r = i[1];
                  w.x = r[8];
                  w.y = r[9]
                },
                error: function (t) {
                  t.statusText !== "abort" && (n.sccv_alert(svgEditor.uiStrings.notification.ServerError), n("#image_wiz_preview").empty(), n("#image_wiz_prop").empty(), w = {
                    x: 0,
                    y: 0,
                    bSel: 0
                  })
                },
                complete: function () {
                  n("#image_wiz_file")[0].reset();
                  n("#image_wiz_colors").val(5);
                  ot = !1;
                  f = null;
                  n("#tool_image_wiz_preview").parent().removeClass("spinsmall");
                  n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !1).removeClass("ui-state-disabled")
                }
              })
            } else w.bSel && (n("#image_wiz_preview").empty(), n("#image_wiz_prop").empty(), w = {
              x: 0,
              y: 0,
              bSel: 0
            });
            sr = !0;
            eventAnalyticsRec("Editor", "showNITWizard");
            n("#image_wiz").dialog("open");
            n('input[name="image_wiz_type"]').change();
            n("#image_wiz_mode").controlgroup({
              classes: {
                "ui-controlgroup": "image_wiz_mode_button"
              }
            })
          };
        n("div.filebtn").button();
        n("#image_wiz_s2c").button().click(function () {
          f = n.ajax("ImageTraceFileFromSNC", {
            type: "post",
            processData: !1,
            contentType: !1,
            dataType: "json",
            success: function (t) {
              if (t[0].bSuccess) w = {
                x: 0,
                y: 0,
                bSel: 0
              }, n("#imagefile_name").text(svgEditor.uiStrings.notification.s2c_selected), eu(t);
              else {
                n.sccv_alert(t[0].message);
                eventAnalyticsRec("ErrorS99", "imagefileFromSNC");
                return
              }
            },
            error: function (t) {
              t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
            },
            complete: function () {
              ot = !0;
              f = null;
              n("#tool_image_wiz_preview").parent().removeClass("spinsmall");
              n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !1).removeClass("ui-state-disabled")
            }
          });
          n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !0).addClass("ui-state-disabled");
          n("#tool_image_wiz_preview").parent().addClass("spinsmall")
        });
        n("#imagefile").change(function () {
          var r = n(this)[0],
            t, i;
          if (r.files.length === 1) {
            if (t = r.files[0], t.type.match(/image\/(?:x-)?png/) === null && t.type !== "image/gif" && t.type !== "image/jpeg" && t.type.match(/image\/(?:x-ms-|x-)?bmp/) === null) {
              n.sccv_alert(u.notification.invalidFileType);
              return
            }
            n("#imagefile_name").text(t.name);
            i = new FileReader;
            i.onload = function (i) {
              if (i.loaded > 5e6) {
                n.sccv_alert(u.notification.ImageFileSizeTooLarge);
                return
              }
              var r = new FormData(n("#image_wiz_file")[0]);
              ot = !1;
              f = n.ajax("ImageTraceFile", {
                type: "post",
                processData: !1,
                contentType: !1,
                data: r,
                dataType: "json",
                success: function (i) {
                  if (!i[0].bSuccess) {
                    n.sccv_alert(i[0].message);
                    eventAnalyticsRec("ErrorS99", "imagefileUploaded", "click", t.name);
                    return
                  }
                  var r = i[1];
                  w = {
                    x: 0,
                    y: 0,
                    bSel: 0
                  };
                  eu(i);
                  ot = r[8]
                },
                error: function (t) {
                  t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
                },
                complete: function () {
                  f = null;
                  n("#tool_image_wiz_preview").parent().removeClass("spinsmall");
                  n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !1).removeClass("ui-state-disabled")
                }
              });
              n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !0).addClass("ui-state-disabled");
              n("#tool_image_wiz_preview").parent().addClass("spinsmall")
            };
            i.onerror = function (t) {
              n.sccv_alert(svgEditor.uiStrings.notification.CannotReadFile + " - " + t.target.error.name)
            };
            i.readAsDataURL(t)
          }
        });
        n('input[name="image_wiz_type"]').change(function () {
          n('input[name="image_wiz_type"]:checked').val() === "1" ? n("#image_wiz_rmbkgd").prop("disabled", !0).next().addClass("disabled") : n("#image_wiz_rmbkgd").prop("disabled", !1).next().removeClass("disabled")
        });
        var pe = function (t, i) {
            var s = n("#image_wiz_preview #img_org"),
              u;
            if (s.length === 1 && f === null) {
              var l = n("#image_wiz_imgwidth").attr("data-value"),
                a = n("#image_wiz_imgheight").attr("data-value"),
                v = n("#image_wiz_imgcontenttype").attr("data-value"),
                h = n('input[name="image_wiz_type"]:checked').val(),
                y = h === "1" ? !0 : n("#image_wiz_rmbkgd").is(":checked"),
                u = parseInt(n("#image_wiz_colors").val());
              isNaN(u) && (u = 5);
              u = Math.max(2, Math.min(20, u));
              n("#image_wiz_colors").val(u);
              var p = n("#image_wiz_hdpi").attr("data-value"),
                w = n("#image_wiz_vdpi").attr("data-value"),
                e = n("#image_wiz_vwratio").attr("data-value"),
                r = {
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0
                },
                o = n("#image_wiz_mask"),
                c = o.position();
              r.top = c.top;
              r.left = c.left;
              r.width = o.outerWidth();
              r.height = o.outerHeight();
              r.top = r.top / e;
              r.left = r.left / e;
              r.width = r.width / e;
              r.height = r.height / e;
              f = n.ajax({
                async: !0,
                type: "POST",
                url: t,
                data: AddAntiForgeryToken({
                  type: h,
                  imageType: v,
                  width: l,
                  height: a,
                  imagedata: s.attr("src"),
                  mask_top: r.top,
                  mask_left: r.left,
                  mask_width: r.width,
                  mask_height: r.height,
                  image_hdpi: p,
                  image_vdpi: w,
                  bIsRemoveBG: y,
                  maxcolors: u,
                  bUseSNCScan: ot
                }),
                dataType: "json",
                success: i,
                error: function (t) {
                  t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
                },
                complete: function () {
                  f = null;
                  n("#tool_image_wiz_preview").parent().removeClass("spinsmall");
                  n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !1).removeClass("ui-state-disabled").removeClass("ui-state-hover").removeClass("ui-state-focus")
                }
              });
              n("#tool_image_wiz_preview,#tool_image_wiz_save").attr("disabled", !0).addClass("ui-state-disabled");
              n("#tool_image_wiz_preview").parent().addClass("spinsmall")
            }
          },
          ga = i.onPreviewImageTraceWizard = function () {
            pe("PreviewImageTrace", function (t) {
              if (t[0].bSuccess) {
                n("#image_wiz_preview #img_org").hide();
                var i = n("#image_wiz_preview #img_preview");
                i.length === 0 && (i = n("<img id='img_preview'>"), n("#image_wiz_preview").prepend(i));
                i.attr("src", t[1])
              } else n.sccv_alert(t[0].message), eventAnalyticsRec("ErrorS99", "onPreviewImageTraceWizard")
            })
          },
          nv = i.onOKImageTraceWizard = function (t) {
            n("#imgtrc_pasteImgdlg").dialog({
              autoOpen: !0,
              modal: !0,
              buttons: [{
                text: svgEditor.uiStrings.common.yes,
                click: function () {
                  we(t, !0);
                  n(this).dialog("close")
                }
              }, {
                text: svgEditor.uiStrings.common.no,
                click: function () {
                  we(t, !1);
                  n(this).dialog("close")
                }
              }]
            })
          },
          we = function (r, u) {
            pe("ExecImageTrace", function (f) {
              var e;
              if (f[0].bSuccess) {
                if (i.show_save_warning = !0, f[2] ? t.insertImagetraceResult(f[1], w.x + f[2].offsetX, w.y + f[2].offsetY, f[2].bUseScan) : t.insertImagetraceResult(f[1], w.x, w.y, !1), t.clearSelection(), v(), u) {
                  if (e = n("#img_org"), e.length !== 1) return;
                  var s = n("#image_wiz_imgwidth").attr("data-value"),
                    h = n("#image_wiz_imgheight").attr("data-value"),
                    c = n("#image_wiz_hdpi").attr("data-value"),
                    l = n("#image_wiz_vdpi").attr("data-value"),
                    o = n("#data-fotimg");
                  o.length > 0 && o.remove();
                  o = t.insertFOTTemplateImage(e.attr("src"), s, h, 0, 0, c, l)
                }
              } else n.sccv_alert(f[0].message), eventAnalyticsRec("ErrorS99", "onOkImageTraceWizard");
              sr = !1;
              r.dialog("close")
            })
          },
          tv = i.onCancelImageTraceWizard = function () {
            f !== null && f.abort();
            sr = !1;
            n("#image_wiz").dialog("close")
          };
        n(".expdlg_close").button().click(function () {
          n("#" + n(this).attr("data-target")).dialog("close")
        });
        at = !1;
        bt = function (t) {
          var i = n("#fot_wiz").dialog("widget").find(".ui-dialog-buttonset");
          t ? i.addClass("spinsmall") : i.removeClass("spinsmall")
        };
        n(".fot_zoomout,.fot_zoomin").click(function () {
          if (!n(this).hasClass("disabled")) {
            var t = parseFloat(fotbasic_scale);
            n(this).hasClass("fot_zoomout") ? (t -= .05, t < .15 && (t = fotbasic_scale)) : n(this).hasClass("fot_zoomin") && (t += .05, t > 3 && (t = fotbasic_scale));
            fotbasic_scale = t;
            n("#fot_wiz_edit *,#fot_wiz_preview,#fot_wiz_adv_edit *,#fot_wiz_adv_preview").css({
              "transform-origin": "top left",
              transform: "scale(" + fotbasic_scale + ")"
            });
            drawMask()
          }
        });
        n("#fot_bsc_opnHlp").click(function () {
          n("#fot_bsc_expdlg").dialog("open")
        });
        n("#fot_adv_opnHlp").click(function () {
          n("#fot_adv_expdlg").dialog("open")
        });
        n("#fot_opnHlp").click(function () {
          at ? n("#fot_adv_expdlg").dialog("open") : n("#fot_bsc_expdlg").dialog("open")
        });
        be = function () {
          svgEditor.uiStrings.fot.fotEnable ? n("#imgtrc_select").dialog("open") : ou()
        };
        kt = {
          onlyOuterEdge: !0,
          smoothLvl: 1
        };
        n("#imgtrc_fot").button().click(function () {
          n("#imgtrc_select").dialog("close");
          ke()
        });
        n("#imgtrc_trc").click(function () {
          n("#imgtrc_select").dialog("close");
          ou()
        });
        n(".goToNormalTrcBtn").click(function () {
          n("#fot_wiz,#trc_selimg_dlg").dialog("close");
          ou()
        });
        n("#show_selimgdlg").button().click(function () {
          n("#trc_selimg_dlg").dialog("open")
        });
        n(".fot_option_btn").click(function () {
          n(this).hasClass("negative") || n("#fot_option_dlg").dialog("open")
        });
        ke = function () {
          var t = !0,
            r;
          if (!b && s && s.tagName === "image") {
            w.x = Number(s.getAttribute("x"));
            w.y = Number(s.getAttribute("y"));
            var u = s.getAttribute("width"),
              e = s.getAttribute("height"),
              i = s.getAttribute("xlink:href"),
              o = s.getAttribute("transform");
            n(".fot_wiz_nxtonly,.fot_wiz_prvonly").addClass("disabled");
            f = n.ajax("ImageTraceFile2", {
              type: "post",
              data: AddAntiForgeryToken({
                top: w.y,
                left: w.x,
                width: u,
                height: e,
                imgsrc: i,
                transform: o
              }),
              dataType: "json",
              success: function (t) {
                if (!t[0].bSuccess) {
                  n.sccv_alert(t[0].message);
                  eventAnalyticsRec("ErrorS99", "showFOTWizard", "click", i);
                  return
                }
                w.bSel = !0;
                su(t)
              },
              error: function (t) {
                t.statusText !== "abort" && (n.sccv_alert(svgEditor.uiStrings.notification.ServerError), w = {
                  x: 0,
                  y: 0,
                  bSel: 0
                })
              },
              complete: function () {
                n(".fot_wiz_nxtonly").removeClass("disabled");
                ot = !1;
                f = null
              }
            });
            t = !1
          } else w.bSel && (w = {
            x: 0,
            y: 0,
            bSel: 0
          });
          r = n("#fotimg_org");
          r.length !== 1 && n(".fot_wiz_nxtonly,.fot_wiz_prvonly").addClass("disabled");
          n("#fot_wiz_btn_modechg").html(svgEditor.uiStrings.fot.pro);
          n("#fot_wiz_advance,#fot_wiz_btn_ok").hide();
          n("#fot_wiz_basic,#fot_wiz_foottextBsc").show();
          n("#selimgframe").css("visibility", "visible");
          initAdvModeMask();
          at = !1;
          eventAnalyticsRec("Editor", "showEITWizard");
          n("#fot_wiz").dialog("open");
          t && n("#trc_selimg_dlg").dialog("open")
        };
        n("#fot_wiz_s2c").button().click(function () {
          f = n.ajax("ImageTraceFileFromSNC", {
            type: "post",
            processData: !1,
            contentType: !1,
            dataType: "json",
            success: function (t) {
              if (t[0].bSuccess) w = {
                x: 0,
                y: 0,
                bSel: 0
              }, n("#fotfile_name").text(svgEditor.uiStrings.notification.s2c_selected), su(t);
              else {
                n.sccv_alert(t[0].message);
                eventAnalyticsRec("ErrorS99", "fotimgfileFromSNC");
                return
              }
            },
            error: function (t) {
              t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
            },
            complete: function () {
              n(".fot_wiz_nxtonly").removeClass("disabled");
              ot = !0;
              f = null;
              bt(!1)
            }
          });
          bt(!0)
        });
        n("#fotimgfile").change(function () {
          var r = n(this)[0],
            t, i;
          if (r.files.length === 1) {
            if (t = r.files[0], t.type.match(/image\/(?:x-)?png/) === null && t.type !== "image/gif" && t.type !== "image/jpeg" && t.type.match(/image\/(?:x-ms-|x-)?bmp/) === null) {
              n.sccv_alert(u.notification.invalidFileType);
              return
            }
            n("#fotfile_name").text(t.name);
            i = new FileReader;
            i.onload = function (i) {
              if (i.loaded > 5e6) {
                n.sccv_alert(u.notification.ImageFileSizeTooLarge);
                n("#fotimgfile").val("");
                return
              }
              n(".fot_wiz_nxtonly,.fot_wiz_prvonly").addClass("disabled");
              var r = new FormData(n("#fot_wiz_file")[0]);
              ot = !1;
              f = n.ajax("ImageTraceFile", {
                type: "post",
                processData: !1,
                contentType: !1,
                data: r,
                dataType: "json",
                success: function (i) {
                  if (!i[0].bSuccess) {
                    n.sccv_alert(i[0].message);
                    eventAnalyticsRec("ErrorS99", "fotimgfileUploaded", "click", t.name);
                    return
                  }
                  w = {
                    x: 0,
                    y: 0,
                    bSel: 0
                  };
                  su(i);
                  var r = i[1];
                  ot = r[8]
                },
                error: function (t) {
                  t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
                },
                complete: function () {
                  n(".fot_wiz_nxtonly").removeClass("disabled");
                  f = null;
                  bt(!1);
                  n("#fotimgfile").val("")
                }
              });
              bt(!0)
            };
            i.onerror = function (t) {
              n.sccv_alert(svgEditor.uiStrings.notification.CannotReadFile + " - " + t.target.error.name)
            };
            i.readAsDataURL(t)
          }
        });
        var de = !1,
          ge = !1,
          iv = i.onFOTModeChange = function () {
            if (at) n("#fot_backStep1dlg").dialog("open");
            else {
              if (n("#fotimg_preview").length === 0 && nl(), !ge) {
                var t = n.pref("fotadv_hide") === "1" ? !0 : !1;
                t || (n("#fot_adv_expdlg").dialog("open"), ge = !0)
              }
              n("#fot_wiz_btn_modechg").html(svgEditor.uiStrings.fot.basic);
              n("#fot_wiz_basic,#fot_wiz_foottextBsc").hide();
              n("#selimgframe").css("visibility", "hidden");
              n("#fot_wiz_advance,#fot_wiz_btn_ok").show();
              at = !0
            }
            syncScroll()
          },
          gc = function () {
            n("#fot_wiz_btn_modechg").html(svgEditor.uiStrings.fot.pro);
            n("#fot_wiz_advance,#fot_wiz_btn_ok").hide();
            n("#fot_wiz_basic,#fot_wiz_foottextBsc").show();
            n("#selimgframe").css("visibility", "visible");
            initAdvModeMask();
            at = !1;
            syncScroll()
          };
        n("#fot_adv_showPlv").click(function () {
          if (!n(this).hasClass("negative")) {
            var t = n(this).hasClass("active");
            t ? (n("#fot_adv_mask").css("visibility", "visible"), n(this).removeClass("active"), n(".fot_adv_toolbarbtn:not(#fot_adv_showPlv)").removeClass("negative")) : (n("#fot_adv_mask").css("visibility", "hidden"), n(this).addClass("active"), n(".fot_adv_toolbarbtn:not(#fot_adv_showPlv)").addClass("negative"))
          }
        });
        var su = function (t) {
            var i, o, f, e;
            if (!t[0].bSuccess) {
              n.sccv_alert(t[0].message);
              return
            }
            if (i = t[1], i[1] < 50 || i[2] < 50) {
              n.sccv_alert(u.fot.ErrS53);
              return
            }
            if (i[1] > 3e3 || i[2] > 3e3) {
              n.sccv_alert(u.fot.ErrS54);
              return
            }
            n("#fotimg_org,#fotimg_adv_preview,#fotimg_adv,#fotimg_preview").remove();
            n("#fot_wiz_preview,#fot_wiz_prop").empty();
            o = r.baseUnit === "in" ? "&Prime;" : u.common.mm;
            f = n("<img id='fotimg_org'>");
            f.load(function () {
              n("#fot_wiz_edit").prepend(f);
              initBasicModeMask(!0);
              n("#trc_selimg_dlg").dialog("close")
            });
            f.attr("src", i[3]);
            var s = n("<div id='fotimage_wiz_imgwidth' style='display:none' data-value='" + i[1] + "'><\/div>"),
              h = n("<div id='fotimage_wiz_imgheight' style='display:none' data-value='" + i[2] + "'><\/div>"),
              c = n("<div id='fotimage_wiz_imgcontenttype' style='display:none' data-value='" + i[0] + "'><\/div>"),
              l = n("<div id='fotimage_wiz_hdpi' style='display:none' data-value='" + i[6] + "'><\/div>"),
              a = n("<div id='fotimage_wiz_vdpi' style='display:none' data-value='" + i[7] + "'><\/div>");
            n("#fot_wiz_prop").append(h).append(s).append(c).append(l).append(a);
            de || (e = n.pref("fotbsc_hide") === "1" ? !0 : !1, e || (n("#fot_bsc_expdlg").dialog("open"), de = !0))
          },
          hu = function (t, i, r) {
            var u = n("#fotimg_org");
            if (u.length === 1 && f === null) {
              var o = n("#fotimage_wiz_imgwidth").attr("data-value"),
                s = n("#fotimage_wiz_imgheight").attr("data-value"),
                h = n("#fotimage_wiz_imgcontenttype").attr("data-value"),
                c = n("#fotimage_wiz_hdpi").attr("data-value"),
                l = n("#fotimage_wiz_vdpi").attr("data-value"),
                a = kt.onlyOuterEdge,
                v = kt.smoothLvl,
                e = {
                  imageType: h,
                  width: o,
                  height: s,
                  imgdata: u.attr("src"),
                  image_hdpi: c,
                  image_vdpi: l,
                  mpX: fotBClickListX,
                  mpY: fotBClickListY,
                  bUseSNCScan: ot,
                  bTraceInside: !a,
                  iSmoothingLevel: v,
                  mode: i
                };
              (i === 2 || i === 3) && (e.maskdata = getAdvEditMask());
              f = n.ajax({
                async: !0,
                type: "POST",
                url: t,
                data: AddAntiForgeryToken(e),
                traditional: !0,
                dataType: "json",
                success: r,
                error: function (t) {
                  t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
                },
                complete: function () {
                  f = null;
                  bt(!1)
                }
              });
              bt(!0)
            }
          },
          cu, di = 0,
          lu = function (r) {
            var u = at ? 3 : 1;
            hu("ExecFOT", u, function (u) {
              if (u[0].bSuccess) {
                if (i.show_save_warning = !0, di === 1) {
                  if ($img = n("#fotimg_org"), $img.length !== 1) return;
                  var f = n("#fotimage_wiz_imgwidth").attr("data-value"),
                    e = n("#fotimage_wiz_imgheight").attr("data-value"),
                    o = n("#fotimage_wiz_hdpi").attr("data-value"),
                    s = n("#fotimage_wiz_vdpi").attr("data-value");
                  $pimg = n("#data-fotimg");
                  $pimg.length > 0 && $pimg.remove();
                  $pimg = t.insertFOTTemplateImage($img.attr("src"), f, e, 0, 0, o, s);
                  di = 0
                }
                u[2] ? t.insertImagetraceResult(u[1], w.x + u[2].offsetX, w.y + u[2].offsetY, u[2].bUseScan) : t.insertImagetraceResult(u[1], w.x, w.y, !1);
                t.clearSelection();
                v();
                r.dialog("close")
              } else n.sccv_alert(u[0].message), eventAnalyticsRec("ErrorS99", "onOKFOTWizard")
            })
          },
          rv = i.onOKFOTWizard = function (t) {
            cu = t;
            w.bSel ? lu(t) : n("#fot_pasteImgdlg").dialog("open")
          },
          nl = i.onPreviewFOTWizard = function () {
            at ? hu("ExecFOT", 2, function (t) {
              t[0].bSuccess ? n("#fotimg_adv").attr("src", t[1]) : (n.sccv_alert(t[0].message), eventAnalyticsRec("ErrorS99", "onPreviewFOTWizard"))
            }) : hu("ExecFOT", 0, function (t) {
              var i, r;
              t[0].bSuccess ? (i = n("#fot_wiz_edit #fotimg_preview"), i.length === 0 && (i = n("<img id='fotimg_preview'>"), i.css({
                position: "absolute",
                "transform-origin": "0 0",
                transform: n("#fotimg_org").css("transform")
              }), i.insertAfter("#fotimg_org")), i.attr("src", t[1]), n("#fot_wiz_edit_frame").trigger("scroll"), n("#fotimg_adv").remove(), r = n("<img id='fotimg_adv'>"), r.attr("src", t[1]).css({
                position: "absolute",
                "transform-origin": "top left",
                transform: "scale(" + fotbasic_scale + ")"
              }), n("#fot_wiz_adv_edit").append(r), n(".fot_wiz_prvonly").removeClass("disabled"), t[0].bWarning && n.sccv_alert(t[0].message, !0)) : (n.sccv_alert(t[0].message), eventAnalyticsRec("ErrorS99", "onPreviewFOTWizard"))
            })
          },
          uv = i.onCancelFOTWizard = function (n) {
            f !== null && f.abort();
            n.dialog("close")
          },
          tl = function () {
            var t = n(this),
              i = t.attr("data-val");
            i ? (eventAnalyticsRec("View", "clickZoomCommand", "click", i), yt(window, i)) : (eventAnalyticsRec("View", "clickZoomCommand", "click", parseInt(t.text())), oi({
              value: parseInt(t.text())
            }))
          },
          il = function () {
            eventAnalyticsRec("Editor", "clickImportFCM");
            ci = !0;
            n("#import_wiz").dialog("open")
          };
        n("#importfile").change(function () {
          var f = n(this)[0],
            i, t, r, u, e;
          if (f.files.length === 1) {
            if (i = f.files[0].name, t = n("#import_wiz_dxfopt"), n("#importfile_name").text(i), !i) {
              t.hide();
              return
            }
            if (r = i.split("."), u = r.length, u === 0) {
              t.hide();
              return
            }
            e = r[u - 1];
            e.toLowerCase() === "dxf" ? t.show() : t.hide()
          }
        });
        var fv = i.onOKImportWizard = function () {
            var h = n("#importfile").val(),
              c, l, s, r, e, o, a;
            if (h) {
              if (c = h.split("."), l = c.length, l === 0) {
                n.sccv_alert(u.notification.invalidFileType);
                return
              }
              s = c[l - 1];
              s.toLowerCase() === "fcm" || s.toLowerCase() === "svg" || s.toLowerCase() === "dxf" ? (r = new FormData(n("#import_wiz_file")[0]), r.append("uploadfile.exist", !0), r.append("matid", wt()), r.append("dxfunit", n('#import_wiz_dxfopt input[name="dxfunit"]:checked')), e = parseFloat(n("#dxfscale_up").val()), o = parseFloat(n("#dxfscale_bottom").val()), (isNaN(e) || e <= 0) && (e = 1, n("#dxfscale_up").val(e)), (isNaN(o) || o <= 0) && (o = 1, n("#dxfscale_bottom").val(o)), a = e / o, r.append("dxfscale", a), f = n.ajax("ImportVectorData", {
                type: "post",
                processData: !1,
                contentType: !1,
                data: r,
                dataType: "json",
                success: function (r) {
                  ci === !0 && (r[0].bSuccess ? (i.show_save_warning = !0, t.insertConvetedElements(r[1], !1), v(), r[0].bWarning && n.sccv_alert(r[0].message, !0)) : (n.sccv_alert(r[0].message), eventAnalyticsRec("ErrorS99", "onOKImportWizard", "click", h)))
                },
                error: function (t) {
                  t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
                },
                complete: function (t) {
                  n("#import_wiz_ok").parent().removeClass("spinsmall");
                  n("#import_wiz_ok").attr("disabled", !1).removeClass("ui-state-disabled");
                  t.responseJSON[0].bSuccess && (ci = !1, n("#import_wiz").dialog("close"))
                }
              }), n("#import_wiz_ok").attr("disabled", !0).addClass("ui-state-disabled"), n("#import_wiz_ok").parent().addClass("spinsmall")) : n.sccv_alert(u.notification.invalidFileType);
              n(this).val(null)
            }
          },
          ev = i.onCancelImportWizard = function () {
            f !== null && f.abort();
            ci = !1;
            n("#import_wiz").dialog("close")
          },
          rl = function () {
            eventAnalyticsRec("Editor", "clickFlipV");
            t.flipSelectedElements(!1)
          },
          ul = function () {
            eventAnalyticsRec("Editor", "clickFlipH");
            t.flipSelectedElements(!0)
          };
        n("#canvas_title").change(function () {
          t.setDocumentTitle(this.value)
        }).keyup(function () {
          var t = this.value;
          t !== "" && (t.match(/^[a-zA-Z0-9\-\_\(\)\,\ ]+$/) || (n.sccv_alert(u.notification.ContainsInvalidCharacter), t = t.replace(/[^a-zA-Z0-9\-\_\(\)\,\ ]/g, ""), this.value = t))
        });
        no = function () {
          eventAnalyticsRec("Sticker", "showImagePasteWizard");
          n("#importimg_wiz").dialog("open")
        };
        to = function () {
          eventAnalyticsRec("Editor", "togglePropatyPanel");
          var t = n("#propertyPanel"),
            i = t.dialog("isOpen");
          i ? t.dialog("close") : t.dialog("open")
        };
        n("#importimgfile").change(function () {
          var t = n(this)[0],
            i = "";
          t.files.length === 1 && (i = t.files[0].name);
          n("#importimgfile_name").text(i)
        });
        var ov = i.onOKImagePasteWizard = function (i) {
            var o = n("#importimgfile")[0],
              r, e;
            if (o.files.length !== 1) {
              i && i();
              return
            }
            if (r = o.files[0], r.type.match(/image\/(?:x-)?png/) === null && r.type !== "image/gif" && r.type !== "image/jpeg" && r.type.match(/image\/(?:x-ms-|x-)?bmp/) === null) {
              n.sccv_alert(u.notification.invalidFileType);
              i && i();
              return
            }
            e = new FileReader;
            e.onload = function (e) {
              if (e.loaded > 2e6) {
                n.sccv_alert(u.notification.ImageFileSizeTooLarge);
                i && i();
                return
              }
              var o = new FormData(n("#importimg_wiz_file")[0]);
              f = n.ajax("ImageTraceFile", {
                type: "post",
                processData: !1,
                contentType: !1,
                data: o,
                dataType: "json",
                success: function (u) {
                  if (!u[0].bSuccess) {
                    n.sccv_alert(u[0].message);
                    eventAnalyticsRec("ErrorS99", "onOKImagePasteWizard", "click", r.name);
                    i && i();
                    return
                  }
                  var f = u[1],
                    e = t.insertImageElements(f[3], f[1], f[2], 10, 10, f[6], f[7]);
                  t.selectOnly([e]);
                  n("#importimg_wiz").dialog("close");
                  v()
                },
                error: function (t) {
                  t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError);
                  i && i()
                },
                complete: function () {
                  f = null;
                  n("#importimg_wiz_btnOK").parent().removeClass("spinsmall")
                }
              });
              n("#importimg_wiz_btnOK").parent().addClass("spinsmall")
            };
            e.onerror = function (t) {
              n.sccv_alert(svgEditor.uiStrings.notification.CannotReadFile + " - " + t.target.error.name)
            };
            e.readAsDataURL(r);
            return
          },
          sv = i.onCancelImagePasteWizard = function () {
            f !== null && f.abort();
            n("#importimg_wiz").dialog("close")
          },
          au = function () {
            var t;
            n("#wireframe_rules").text(c.hasClass("wireframe") ? "#workarea.wireframe #svgcontent * { stroke-width: 1px; }" : "");
            t = "#workarea.wireframe2 #svgcontent * { stroke-width: 1px; }";
            n("#wireframe_rules").text(c.hasClass("wireframe2") ? t : "")
          },
          hv = function (i, r) {
            if (!ct) {
              ct = !0;
              n("#save_output_btns").toggle(!!r);
              n("#tool_source_back").toggle(!r);
              var u = ff = t.getSvgString();
              n("#svg_source_textarea").val(u);
              n("#svg_source_editor").fadeIn();
              io();
              n("#svg_source_textarea").focus()
            }
          };
        n("#svg_docprops_container, #svg_prefs_container, #rs_wiz_container").draggable({
          cancel: "button,fieldset",
          containment: "window"
        });
        var cv = function () {
            if (!ri) {
              ri = !0;
              n("#image_save_opts input").val([o.img_save]);
              var i = t.getResolution();
              r.baseUnit !== "px" && (i.w = svgedit.units.convertUnit(i.w) + r.baseUnit, i.h = svgedit.units.convertUnit(i.h) + r.baseUnit);
              i.h === 1129.323 ? n("#resolution")[0].selectedIndex = 0 : i.h === 2281.323 && (n("#resolution")[0].selectedIndex = 1);
              n("#canvas_width").val(i.w);
              n("#canvas_height").val(i.h);
              n("#canvas_title").val(t.getDocumentTitle());
              n("#svg_docprops").show()
            }
          },
          lv = function () {
            if (!ui) {
              ui = !0;
              n("#main_menu").hide();
              var i = n("#bg_blocks div"),
                t = "cur_background",
                u = n.pref("bkgd_color"),
                f = n.pref("bkgd_url");
              i.each(function () {
                var i = n(this),
                  r = i.css("background-color") === u;
                i.toggleClass(t, r);
                r && n("#canvas_bg_url").removeClass(t)
              });
              u || i.eq(0).addClass(t);
              f && n("#canvas_bg_url").val(f);
              n("grid_snapping_step").attr("value", r.snappingStep);
              r.gridSnapping === !0 ? n("#grid_snapping_on").attr("checked", "checked") : n("#grid_snapping_on").removeAttr("checked");
              n("#svg_prefs").show()
            }
          },
          io = function () {
            var t = n("#svg_source_container").height() - 80;
            n("#svg_source_textarea").css("height", t)
          },
          fl = function () {
            if (ct) {
              var i = function () {
                t.clearSelection();
                wu();
                sc();
                it();
                vu();
                ws()
              };
              t.setSvgString(n("#svg_source_textarea").val()) ? i() : n.confirm(u.notification.QerrorsRevertToSource, function (n) {
                if (!n) return !1;
                i()
              });
              et()
            }
          },
          vu = function (i) {
            i = i || t.getDocumentTitle();
            var r = os + (i ? ": " + i : "");
            n("title:first").text(r)
          },
          av = function () {
            var s = n("#canvas_title").val();
            vu(s);
            t.setDocumentTitle(s);
            var i = n("#canvas_width"),
              r = i.val(),
              f = n("#canvas_height"),
              e = f.val();
            if (r !== "fit" && !svgedit.units.isValidUnit("width", r)) return n.alert(u.notification.invalidAttrValGiven), i.parent().addClass("error"), !1;
            if (i.parent().removeClass("error"), e !== "fit" && !svgedit.units.isValidUnit("height", e)) return n.alert(u.notification.invalidAttrValGiven), f.parent().addClass("error"), !1;
            if (f.parent().removeClass("error"), !t.setResolution(r, e)) return n.alert(u.notification.noContentToFitTo), !1;
            o.img_save = n("#image_save_opts :checked").val();
            n.pref("img_save", o.img_save);
            ut();
            fo()
          },
          el = function () {
            var f = n("#bg_blocks div.cur_background").css("background-color") || "#FFF",
              u;
            yu(f, n("#canvas_bg_url").val());
            u = n("#lang_select").val();
            u !== o.lang && i.putLocale(u);
            ro(n("#iconsize").val());
            r.gridSnapping = n("#grid_snapping_on")[0].checked;
            r.snappingStep = n("#grid_snapping_step").val();
            r.showRulers = n("#show_rulers")[0].checked;
            n("#rulers").toggle(r.showRulers);
            r.showRulers && gu();
            r.baseUnit = n("#base_unit").val();
            t.setConfig(r);
            ut();
            eo()
          };
        pu = i.setIcon = function (t, i) {
          var r = typeof i == "string" ? n.getSvgIcon(i, !0) : i.clone();
          if (!r) {
            console.log("NOTE: Icon image missing: " + i);
            return
          }
          n(t).empty().append(r)
        };
        gi = function () {
          var i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
            n = document.getElementsByTagName("script")[0],
            t;
          for (t in n.style)
            if (i.test(t)) return t.match(i)[0];
          return "WebkitOpacity" in n.style ? "Webkit" : "KhtmlOpacity" in n.style ? "Khtml" : ""
        }();
        var ol = function (t, i) {
            var u = "-" + gi.toLowerCase() + "-",
              r = ["top", "left", "bottom", "right"];
            t.each(function () {
              for (var u = n(this), s = u.outerWidth() * (i - 1), h = u.outerHeight() * (i - 1), t, f, o, e = 0; e < 4; e++) t = r[e], f = u.data("orig_margin-" + t), f === null && (f = parseInt(u.css("margin-" + t)), u.data("orig_margin-" + t, f)), o = f * i, t === "right" ? o += s : t === "bottom" && (o += h), u.css("margin-" + t, o)
            })
          },
          ro = i.setIconSize = function (t, r) {
            var a, h, v, e, f, s;
            if (t !== o.size || r) {
              console.log("size", t);
              var c = "#tools_top .toolset, #editor_panel > *, #history_panel > *,                #main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,                #g_panel > *, #tool_font_size > *, .tools_flyout",
                l = n(c),
                u = 1;
              typeof t == "number" ? u = t : (a = {
                s: .75,
                m: 1,
                l: 1.25,
                xl: 1.5
              }, u = a[t]);
              i.tool_scale = rf = u;
              hf();
              h = l.parents(":hidden");
              h.css("visibility", "hidden").show();
              ol(l, u);
              h.css("visibility", "visible").hide();
              n.pref("iconsize", t);
              n("#iconsize").val(t);
              v = {
                "#tools_top": {
                  left: 50,
                  height: 72
                },
                "#tools_left": {
                  width: 31,
                  top: 74
                },
                "div#workarea": {
                  left: 38,
                  top: 74
                }
              };
              e = n("#tool_size_rules");
              e.length ? e.empty() : e = n('<style id="tool_size_rules"><\/style>').appendTo("head");
              t !== "m" && (f = "", n.each(v, function (i, r) {
                i = "#svg_editor " + i.replace(/,/g, ", #svg_editor");
                f += i + "{";
                n.each(r, function (n, i) {
                  var r;
                  typeof i == "number" ? r = i * u + "px" : (i[t] || i.all) && (r = i[t] || i.all);
                  f += n + ":" + r + ";"
                });
                f += "}"
              }), s = "-" + gi.toLowerCase() + "-", f += c + "{" + s + "transform: scale(" + u + ");} #svg_editor div.toolset .toolset {" + s + "transform: scale(1); margin: 1px !important;} #svg_editor .ui-slider {" + s + "transform: scale(" + 1 / u + ");}", e.text(f));
              hf()
            }
          },
          uo = function () {
            if (n("#dialog_box").hide(), !ct && !ri && !ui) {
              or && t.leaveContext();
              return
            }
            ct ? ff !== n("#svg_source_textarea").val() ? n.confirm(u.notification.QignoreSourceChanges, function (n) {
              n && wu()
            }) : wu() : ri ? fo() : ui && eo();
            nr()
          },
          wu = function () {
            n("#svg_source_editor").hide();
            ct = !1;
            n("#svg_source_textarea").blur()
          },
          fo = function () {
            n("#svg_docprops").hide();
            n("#canvas_width,#canvas_height").removeAttr("disabled");
            n("#resolution")[0].selectedIndex = 0;
            n("#image_save_opts input").val([o.img_save]);
            ri = !1
          },
          eo = function () {
            n("#svg_prefs").hide();
            ui = !1
          },
          oo = {
            width: n(window).width(),
            height: n(window).height()
          },
          nr = n.noop,
          tr;
        svgedit.browser.isIE() && function () {
          nr = function () {
            c[0].scrollLeft === 0 && c[0].scrollTop === 0 && (c[0].scrollLeft = tr.left, c[0].scrollTop = tr.top)
          };
          tr = {
            left: c[0].scrollLeft,
            top: c[0].scrollTop
          };
          n(window).resize(nr);
          svgEditor.ready(function () {
            setTimeout(function () {
              nr()
            }, 500)
          });
          c.scroll(function () {
            tr = {
              left: c[0].scrollLeft,
              top: c[0].scrollTop
            }
          })
        }();
        n(window).resize(function () {
            ct && io();
            n.each(oo, function (t, i) {
              var r = n(window)[t]();
              c[0]["scroll" + (t === "width" ? "Left" : "Top")] -= (r - i) / 2;
              oo[t] = r
            })
          }),
          function () {
            c.scroll(function () {
              n("#ruler_x").length !== 0 && (n("#ruler_x")[0].scrollLeft = c[0].scrollLeft);
              n("#ruler_y").length !== 0 && (n("#ruler_y")[0].scrollTop = c[0].scrollTop)
            })
          }();
        n("#url_notice").click(function () {
          n.alert(this.title)
        });
        n("#change_image_url").click(so),
          function () {
            var i = ["clear", "open", "save", "source", "delete", "delete_multi", "paste", "clone", "clone_multi", "move_top", "move_bottom"],
              r = "",
              t = "tool_button_current";
            n.each(i, function (n, t) {
              r += "#tool_" + t + (n !== i.length - 1 ? "," : "")
            });
            n(r).mousedown(function () {
              n(this).addClass(t)
            }).bind("mousedown mouseout", function () {
              n(this).removeClass(t)
            });
            n("#tool_undo, #tool_redo").mousedown(function () {
              n(this).hasClass("disabled") || n(this).addClass(t)
            }).bind("mousedown mouseout", function () {
              n(this).removeClass(t)
            })
          }();
        var ho = function (i) {
            var u = i.attr("id") === "stroke_color" ? "stroke" : "fill",
              f = nt[u].paint,
              e = u === "stroke" ? "Pick a Stroke Paint and Opacity" : "Pick a Fill Paint and Opacity",
              o = i.offset();
            n("#color_picker").draggable({
              cancel: ".jGraduate_tabs, .jGraduate_colPick, .jGraduate_gradPick, .jPicker",
              containment: "window"
            }).css(r.colorPickerCSS || {
              left: o.left + 50,
              bottom: 100
            }).jGraduate({
              paint: f,
              window: {
                pickerTitle: e
              },
              images: {
                clientPath: r.jGraduatePath
              },
              newstop: "inverse"
            }, function (i) {
              f = new n.jGraduate.Paint(i);
              nt[u].setPaint(f);
              t.setPaint(u, f);
              n("#color_picker").hide()
            }, function () {
              n("#color_picker").hide()
            })
          },
          co = function (i, u) {
            var f = r[u === "fill" ? "initFill" : "initStroke"];
            n(i).spectrum({
              color: "#f00",
              showPaletteOnly: !0,
              showPalette: !0,
              palette: nf,
              change: function (n) {
                var i;
                i = n.getAlpha() === 0 ? "none" : n.toHexString(!0);
                t.setColor(u, i);
                i !== "none" && t.getFillOpacity() !== 1 && t.setPaintOpacity(u, 1)
              }
            });
            this.type = u;
            this.hide = function () {
              n(i).spectrum("hide")
            };
            this.setPaint = function (r, u) {
              this.paint = r;
              var e = "none",
                f = r.type,
                o = r.alpha / 100;
              switch (f) {
                case "solidColor":
                  e = r[f] !== "none" ? "#" + r[f] : "rgba(255,255,255,0)";
                  break;
                case "linearGradient":
                case "radialGradient":
                  this.defs.removeChild(this.grad)
              }
              n(i).spectrum("set", e);
              u && (t.setColor(this.type, paintColor, !0), t.setPaintOpacity(this.type, paintOpacity, !0))
            };
            this.update = function (n) {
              var i, u, y, l, f, r, a, h, o;
              if (s) {
                i = this.type;
                switch (s.tagName) {
                  case "use":
                  case "image":
                  case "foreignObject":
                    return;
                  case "g":
                  case "a":
                    var e = null,
                      v = 0,
                      c = [];
                    for (svgedit.utilities.walkTree(s, function (n) {
                        n.nodeName !== "g" && n.nodeName !== "image" && n.getAttribute("data-rsparams") === null && c.push(n)
                      }), u = 0, y = c.length; u < y; u++) {
                      if (l = c[u], l.getAttribute("data-rsparams") !== null) {
                        u === 0 && (v = 1);
                        continue
                      }
                      if (f = l.getAttribute(i), f.indexOf("#") === 0 && (f = f.toUpperCase()), u === v) e = f;
                      else if (e !== f) {
                        e = null;
                        break
                      }
                    }
                    if (e === null) {
                      o = ei(a, 1, i);
                      this.setPaint(o);
                      return
                    }
                    h = e;
                    r = 1;
                    break;
                  default:
                    r = parseFloat(s.getAttribute(i + "-opacity"));
                    isNaN(r) && (r = 1);
                    a = i === "fill" ? "black" : "none";
                    h = s.getAttribute(i) || a
                }
                n && (t.setColor(i, h, !0), t.setPaintOpacity(i, r, !0));
                r *= 100;
                o = ei(h, r, i);
                this.setPaint(o)
              }
            };
            this.prep = function () {
              var n = this.paint.type
            }
          },
          vv = function (i, u) {
            var e = r[u === "fill" ? "initFill" : "initStroke"],
              o = (new DOMParser).parseFromString('<svg xmlns="http://www.w3.org/2000/svg"><rect width="16.5" height="16.5"                    fill="#' + e.color + '" opacity="' + e.opacity + '"/>                    <defs><linearGradient id="gradbox_"/><\/defs><\/svg>', "text/xml"),
              f = o.documentElement;
            f = n(i)[0].appendChild(document.importNode(f, !0));
            f.setAttribute("width", 16.5);
            this.rect = f.firstChild;
            this.defs = f.getElementsByTagName("defs")[0];
            this.grad = this.defs.firstChild;
            this.paint = new n.jGraduate.Paint({
              solidColor: e.color
            });
            this.type = u;
            this.setPaint = function (n, i) {
              var f;
              this.paint = n;
              var u = "none",
                r = n.type,
                e = n.alpha / 100;
              switch (r) {
                case "solidColor":
                  u = n[r] !== "none" ? "#" + n[r] : n[r];
                  break;
                case "linearGradient":
                case "radialGradient":
                  this.defs.removeChild(this.grad);
                  this.grad = this.defs.appendChild(n[r]);
                  f = this.grad.id = "gradbox_" + this.type;
                  u = "url(#" + f + ")"
              }
              this.rect.setAttribute("fill", u);
              this.rect.setAttribute("opacity", e);
              i && (t.setColor(this.type, paintColor, !0), t.setPaintOpacity(this.type, paintOpacity, !0))
            };
            this.update = function (n) {
              var i, f, o, e, c, l, h, r, a, u, v;
              if (s) {
                i = this.type;
                switch (s.tagName) {
                  case "use":
                  case "image":
                  case "foreignObject":
                    return;
                  case "g":
                  case "a":
                    for (f = null, o = s.getElementsByTagName("*"), e = 0, c = o.length; e < c; e++)
                      if (l = o[e], h = l.getAttribute(i), e === 0) f = h;
                      else if (f !== h) {
                      f = null;
                      break
                    }
                    if (f === null) {
                      u = null;
                      return
                    }
                    u = f;
                    r = 1;
                    break;
                  default:
                    r = parseFloat(s.getAttribute(i + "-opacity"));
                    isNaN(r) && (r = 1);
                    a = i === "fill" ? "black" : "none";
                    u = s.getAttribute(i) || a
                }
                n && (t.setColor(i, u, !0), t.setPaintOpacity(i, r, !0));
                r *= 100;
                v = ei(u, r, i);
                this.setPaint(v)
              }
            };
            this.prep = function () {
              var r = this.paint.type,
                i;
              switch (r) {
                case "linearGradient":
                case "radialGradient":
                  i = new n.jGraduate.Paint({
                    copy: this.paint
                  });
                  t.setPaint(u, i)
              }
            }
          };
        nt.fill = new co("#fill_color2", "fill");
        nt.stroke = new co("#stroke_color2", "stroke"),
          function () {
            var t = "-" + gi.toLowerCase() + "-zoom-",
              n = t + "in";
            c.css("cursor", n);
            c.css("cursor") === n && (er = n, uf = t + "out");
            c.css("cursor", "auto")
          }();
        n("#fill_color, #tool_fill .icon_label").click(function () {
          ho(n("#fill_color"))
        });
        n("#stroke_color, #tool_stroke .icon_label").click(function () {
          ho(n("#stroke_color"))
        });
        n("#group_opacityLabel").click(function () {
          n("#opacity_dropdown button").mousedown();
          n(window).mouseup()
        });
        n("#zoomLabel").click(function () {
          n("#zoom_dropdown button").mousedown();
          n(window).mouseup()
        });
        n("#tool_move_top").mousedown(function (t) {
          n("#tools_stacking").show();
          t.preventDefault()
        });
        n(".layer_button").mousedown(function () {
          n(this).addClass("layer_buttonpressed")
        }).mouseout(function () {
          n(this).removeClass("layer_buttonpressed")
        }).mouseup(function () {
          n(this).removeClass("layer_buttonpressed")
        });
        n(".push_button").mousedown(function () {
          n(this).hasClass("disabled") || n(this).addClass("push_button_pressed").removeClass("push_button")
        }).mouseout(function () {
          n(this).removeClass("push_button_pressed").addClass("push_button")
        }).mouseup(function () {
          n(this).removeClass("push_button_pressed").addClass("push_button")
        });
        n("#layer_new").click(function () {
          var r = t.getCurrentDrawing().getNumLayers(),
            i;
          do i = u.layers.layer + " " + ++r; while (t.getCurrentDrawing().hasLayer(i));
          n.prompt(u.notification.enterUniqueLayerName, i, function (i) {
            if (i) {
              if (t.getCurrentDrawing().hasLayer(i)) {
                n.alert(u.notification.dupeLayerName);
                return
              }
              t.createLayer(i);
              v();
              it()
            }
          })
        });
        n("#layer_delete").click(lo);
        n("#layer_up").click(function () {
          ao(-1)
        });
        n("#layer_down").click(function () {
          ao(1)
        });
        n("#layer_rename").click(function () {
          var r = n("#layerlist tr.layersel").prevAll().length,
            i = n("#layerlist tr.layersel td.layername").text();
          n.prompt(u.notification.enterNewLayerName, "", function (r) {
            if (r) {
              if (i === r || t.getCurrentDrawing().hasLayer(r)) {
                n.alert(u.notification.layerHasThatName);
                return
              }
              t.renameCurrentLayer(r);
              it()
            }
          })
        });
        var bu = 300,
          cl = 150,
          gt = -1,
          ir = !1,
          ku = !1,
          vo = function (t) {
            var f, e;
            if (ku && gt !== -1) {
              ir = !0;
              var i = gt - t.pageX,
                u = n("#sidepanels"),
                r = parseInt(u.css("width"));
              (r + i > bu ? (i = bu - r, r = bu) : r + i < 2 && (i = 2 - r, r = 2), i !== 0) && (gt -= i, f = n("#layerpanel"), c.css("right", parseInt(c.css("right")) + i), u.css("width", parseInt(u.css("width")) + i), f.css("width", parseInt(f.css("width")) + i), e = n("#ruler_x"), e.css("right", parseInt(e.css("right")) + i))
            }
          };
        n("#sidepanel_handle").mousedown(function (t) {
          gt = t.pageX;
          n(window).mousemove(vo);
          ku = !1;
          setTimeout(function () {
            ku = !0
          }, 20)
        }).mouseup(function () {
          ir || yo();
          gt = -1;
          ir = !1
        });
        n(window).mouseup(function () {
          gt = -1;
          ir = !1;
          n("#svg_editor").unbind("mousemove", vo)
        });
        var yo = function (t) {
            var r = parseInt(n("#sidepanels").css("width")),
              i = (r > 2 || t ? 2 : cl) - r,
              u = n("#sidepanels"),
              f = n("#layerpanel"),
              e = n("#ruler_x");
            c.css("right", parseInt(c.css("right")) + i);
            u.css("width", parseInt(u.css("width")) + i);
            f.css("width", parseInt(f.css("width")) + i);
            e.css("right", parseInt(e.css("right")) + i)
          },
          po = function (n) {
            for (var r = new Array(t.getCurrentDrawing().getNumLayers()), i = 0; i < r.length; ++i) r[i] = t.getCurrentDrawing().getLayerName(i);
            if (n)
              for (i = 0; i < r.length; ++i) r[i] !== n && t.getCurrentDrawing().setLayerOpacity(r[i], .5);
            else
              for (i = 0; i < r.length; ++i) t.getCurrentDrawing().setLayerOpacity(r[i], 1)
          },
          it = function () {
            var u = n("#layerlist tbody"),
              e = n("#selLayerNames"),
              i, r, c, s;
            u.empty();
            e.empty();
            for (var h = t.getCurrentDrawing().getCurrentLayerName(), o = t.getCurrentDrawing().getNumLayers(), f = undefined; o--;) i = t.getCurrentDrawing().getLayerName(o), r = '<tr class="layer', i === h && (r += " layersel"), r += '">', r += t.getCurrentDrawing().getLayerVisibility(i) ? '<td class="layervis"/><td class="layername" >' + i + "<\/td><\/tr>" : '<td class="layervis layerinvis"/><td class="layername" >' + i + "<\/td><\/tr>", u.append(r), e.append('<option value="' + i + '">' + i + "<\/option>");
            for (f !== undefined && (c = f.clone(), n("td.layervis", u).append(f.clone())), n("#layerlist td.layername").mouseup(function (i) {
                n("#layerlist tr.layer").removeClass("layersel");
                var r = n(this.parentNode);
                r.addClass("layersel");
                t.setCurrentLayer(this.textContent);
                i.preventDefault()
              }).mouseover(function () {
                n(this).css({
                  "font-style": "italic",
                  color: "blue"
                });
                po(this.textContent)
              }).mouseout(function () {
                n(this).css({
                  "font-style": "normal",
                  color: "black"
                });
                po()
              }), n("#layerlist td.layervis").click(function () {
                var r = n(this.parentNode).prevAll().length,
                  u = n("#layerlist tr.layer:eq(" + r + ") td.layername").text(),
                  i = n(this).hasClass("layerinvis");
                t.setLayerVisibility(u, i);
                i ? n(this).removeClass("layerinvis") : n(this).addClass("layerinvis")
              }), s = 5 - n("#layerlist tr.layer").size(); s-- > 0;) u.append('<tr><td style="color:white">_<\/td><td/><\/tr>')
          };
        it();
        wo = function () {
          c.css("line-height", c.height() + "px")
        };
        n(window).bind("load resize", wo);
        n("#resolution").change(function () {
          var i = n("#canvas_width,#canvas_height"),
            t = this.value.split("x");
          n("#canvas_width").val(t[0]);
          n("#canvas_height").val(t[1]);
          i.removeAttr("disabled")
        });
        n("input,select").attr("autocomplete", "off");
        rr = function () {
          var r = [{
              sel: "#tool_select",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSelect");
                rh()
              },
              evt: "click",
              key: ["V", !0]
            }, {
              sel: "#tool_pan",
              fn: uh,
              evt: "click"
            }, {
              sel: "#tool_fhpath",
              fn: fh,
              evt: "click",
              key: ["Q", !0]
            }, {
              sel: "#tool_path",
              fn: sh,
              evt: "click",
              key: ["P", !0]
            }, {
              sel: "#tool_zoom",
              fn: eh,
              evt: "click",
              key: ["Z", !0]
            }, {
              sel: "#tool_clear,#menu_clear",
              fn: dh,
              evt: "click",
              key: ["N", !0]
            }, {
              sel: "#tool_save,#menu_save",
              fn: function () {
                ct ? fl() : ie(!1)
              },
              evt: "click",
              key: ["S", !0]
            }, {
              sel: "#menu_saveas",
              fn: function () {
                ie(!0)
              },
              evt: "click"
            }, {
              sel: ".tool_dlpdf",
              fn: nc,
              evt: "click"
            }, {
              sel: "#menu_countp",
              fn: tc,
              evt: "click"
            }, {
              sel: "#tool_fcmDL,#menu_fcmDL",
              fn: gh,
              evt: "click"
            }, {
              sel: "#tool_export",
              fn: ic,
              evt: "click"
            }, {
              sel: "#tool_import",
              fn: rc,
              evt: "click"
            }, {
              sel: "#tool_wireframe+label",
              fn: gr,
              evt: "click"
            }, {
              sel: "#tool_wireframe2+label",
              fn: nu,
              evt: "click"
            }, {
              sel: "#tool_source_cancel,#svg_source_overlay,#tool_docprops_cancel,#tool_prefs_cancel",
              fn: uo,
              evt: "click",
              key: ["esc", !1, !1],
              hidekey: !0
            }, {
              sel: "#tool_prefs_save",
              fn: el,
              evt: "click"
            }, {
              sel: "#tool_delete,#tool_delete_multi,#menu_delete",
              fn: wf,
              evt: "click",
              key: ["del/backspace", !0]
            }, {
              sel: "#tool_reorient",
              fn: lh,
              evt: "click"
            }, {
              sel: "#tool_node_link",
              fn: vh,
              evt: "click"
            }, {
              sel: "#tool_node_clone",
              fn: yh,
              evt: "click"
            }, {
              sel: "#tool_node_delete",
              fn: ph,
              evt: "click"
            }, {
              sel: "#tool_openclose_path",
              fn: bh,
              evt: "click"
            }, {
              sel: "#tool_showctlpnt+label",
              fn: kh,
              evt: "click"
            }, {
              sel: "#tool_add_subpath",
              fn: wh,
              evt: "click"
            }, {
              sel: "#menu_bmf",
              fn: df,
              evt: "click",
              key: "ctrl+shift+]"
            }, {
              sel: "#menu_bmb",
              fn: gf,
              evt: "click",
              key: "ctrl+shift+["
            }, {
              sel: "#menu_bf",
              fn: function () {
                bi("Up")
              },
              evt: "click",
              key: "ctrl+]"
            }, {
              sel: "#menu_bb",
              fn: function () {
                bi("Down")
              },
              evt: "click",
              key: "ctrl+["
            }, {
              sel: "#tool_topath",
              fn: ch,
              evt: "click"
            }, {
              sel: "#tool_make_link,#tool_make_link_multi",
              fn: ah,
              evt: "click"
            }, {
              sel: "#tool_undo,#menu_undo",
              fn: kr,
              evt: "click"
            }, {
              sel: "#tool_redo,#menu_redo",
              fn: dr,
              evt: "click"
            }, {
              sel: "#tool_clone,#tool_clone_multi",
              fn: ec,
              evt: "click",
              key: ["D", !0]
            }, {
              sel: "#tool_group",
              fn: re,
              evt: "click"
            }, {
              sel: "#tool_ungroup",
              fn: uc,
              evt: "click"
            }, {
              sel: "#tool_unlink_use",
              fn: re,
              evt: "click"
            }, {
              sel: "[id^=tool_align]",
              fn: oc,
              evt: "click"
            }, {
              sel: "#copy_save_done",
              fn: uo,
              evt: "click"
            }, {
              sel: "#tool_mat12+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(1)");
                st(1)
              },
              evt: "click"
            }, {
              sel: "#tool_mat24+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(2)");
                st(2)
              },
              evt: "click"
            }, {
              sel: "#tool_matA4p+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(3)");
                st(3)
              },
              evt: "click"
            }, {
              sel: "#tool_matA4l+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(4)");
                st(4)
              },
              evt: "click"
            }, {
              sel: "#tool_matLTp+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(5)");
                st(5)
              },
              evt: "click"
            }, {
              sel: "#tool_matLTl+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(6)");
                st(6)
              },
              evt: "click"
            }, {
              sel: "#tool_matPCp+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(7)");
                st(7)
              },
              evt: "click"
            }, {
              sel: "#tool_matPCl+label",
              fn: function () {
                eventAnalyticsRec("Editor", "clickSetMat(8)");
                st(8)
              },
              evt: "click"
            }, {
              sel: "#menu_rswiz,#tool_rswiz",
              fn: function () {
                return ee(), !1
              },
              evt: "click"
            }, {
              sel: "#tool_rs_wiz_save",
              fn: hc,
              evt: "click"
            }, {
              sel: "#tool_rs_wiz_cancel",
              fn: cc,
              evt: "click"
            }, {
              sel: "#menu_merge,#tool_marge",
              fn: function () {
                return he(), !1
              },
              evt: "click"
            }, {
              sel: "#menu_divide,#tool_divide",
              fn: function () {
                return ce(), !1
              },
              evt: "click"
            }, {
              sel: "#menu_rmlap,#tool_rmoverlap",
              fn: function () {
                return le(), !1
              },
              evt: "click"
            }, {
              sel: "#menu_subtract,#tool_subtract",
              fn: function () {
                return ae(), !1
              },
              evt: "click"
            }, {
              sel: "#menu_offsetwiz,#tool_offset",
              fn: function () {
                return uu(), !1
              },
              evt: "click"
            }, {
              sel: "#tool_showmat+label",
              fn: bc,
              evt: "click"
            }, {
              sel: "#view_grid",
              fn: yc,
              evt: "click"
            }, {
              sel: "#snap_grid",
              fn: pc,
              evt: "click"
            }, {
              sel: "#show_ruler",
              fn: wc,
              evt: "click"
            }, {
              sel: "#unit_inch+label",
              fn: function () {
                ye("in")
              },
              evt: "click"
            }, {
              sel: "#unit_mm+label",
              fn: function () {
                ye("mm")
              },
              evt: "click"
            }, {
              sel: "#menu_rssingle",
              fn: kc,
              evt: "click"
            }, {
              sel: "#menu_import,#tool_importvec",
              fn: il,
              evt: "click"
            }, {
              sel: "#menu_imagetrace,#tool_imagetrace",
              fn: be,
              evt: "click"
            }, {
              sel: ".menu_zoom",
              fn: tl,
              evt: "click"
            }, {
              sel: "#menu_flipv",
              fn: rl,
              evt: "click"
            }, {
              sel: "#menu_fliph",
              fn: ul,
              evt: "click"
            }, {
              sel: "#menu_selall",
              fn: function () {
                t.selectAllInCurrentLayer()
              },
              evt: "click",
              key: "A"
            }, {
              sel: "#menu_rscount",
              fn: dc,
              evt: "click"
            }, {
              sel: "#menu_stwiz,#tool_stwiz",
              fn: function () {
                return ac(), !1
              },
              evt: "click"
            }, {
              sel: ".menu_importImage",
              fn: no,
              evt: "click"
            }, {
              sel: "#menu_edittext",
              fn: function () {
                n("#dlgedittext").dialog("open");
                eventAnalyticsRec("Editor", "editText")
              },
              evt: "click"
            }, {
              sel: "#tool_prop,#menu_prop+label",
              fn: to,
              evt: "click"
            }, {
              key: "ctrl+left",
              fn: function () {
                ki(0, 1)
              }
            }, {
              key: "ctrl+right",
              fn: function () {
                ki(1, 1)
              }
            }, {
              key: "ctrl+shift+left",
              fn: function () {
                ki(0, 5)
              }
            }, {
              key: "ctrl+shift+right",
              fn: function () {
                ki(1, 5)
              }
            }, {
              key: "shift+O",
              fn: te
            }, {
              key: "shift+P",
              fn: ne
            }, {
              key: ["up", !0],
              fn: function () {
                lt(0, -1)
              }
            }, {
              key: ["down", !0],
              fn: function () {
                lt(0, 1)
              }
            }, {
              key: ["left", !0],
              fn: function () {
                lt(-1, 0)
              }
            }, {
              key: ["right", !0],
              fn: function () {
                lt(1, 0)
              }
            }, {
              key: "shift+up",
              fn: function () {
                lt(0, -10)
              }
            }, {
              key: "shift+down",
              fn: function () {
                lt(0, 10)
              }
            }, {
              key: "shift+left",
              fn: function () {
                lt(-10, 0)
              }
            }, {
              key: "shift+right",
              fn: function () {
                lt(10, 0)
              }
            }, {
              key: ["alt+up", !0],
              fn: function () {}
            }, {
              key: ["alt+down", !0],
              fn: function () {}
            }, {
              key: ["alt+left", !0],
              fn: function () {}
            }, {
              key: ["alt+right", !0],
              fn: function () {}
            }, {
              key: ["alt+shift+up", !0],
              fn: function () {}
            }, {
              key: ["alt+shift+down", !0],
              fn: function () {}
            }, {
              key: ["alt+shift+left", !0],
              fn: function () {}
            }, {
              key: ["alt+shift+right", !0],
              fn: function () {}
            }, {
              key: ["G", !0],
              fn: fc
            }, {
              key: dt + "z",
              fn: kr
            }, {
              key: dt + "shift+z",
              fn: dr
            }, {
              key: dt + "y",
              fn: dr
            }, {
              sel: "#menu_cut",
              evt: "click",
              key: dt + "x",
              fn: bf
            }, {
              sel: "#menu_copy",
              evt: "click",
              key: dt + "c",
              fn: kf
            }, {
              sel: "#menu_paste",
              evt: "click",
              key: dt + "v",
              fn: hh
            }],
            f = {
              "4/Shift+4": "#tools_rect_show",
              "5/Shift+5": "#tools_ellipse_show"
            };
          return {
            setAll: function () {
              var t = {};
              n.each(r, function (r, u) {
                var e, s, h;
                if (u.sel) {
                  if (e = n(u.sel), e.length === 0) return !0;
                  u.evt && (svgedit.browser.isTouch() && u.evt === "click" && (u.evt = "mousedown"), e[u.evt](u.fn), e[u.evt](function () {
                    n("#exMenu2").removeClass("show");
                    n(".menu2ct").dialog("close")
                  }));
                  u.parent && n(u.parent + "_show").length !== 0 && (s = n(u.parent), s.length || (s = lr(u.parent.substr(1))), s.append(e), n.isArray(t[u.parent]) || (t[u.parent] = []), t[u.parent].push(u))
                }
                if (u.key) {
                  var o, l = !0,
                    a = u.fn,
                    c = !1;
                  n.isArray(u.key) ? (o = u.key[0], u.key.length > 1 && (c = u.key[1]), u.key.length > 2 && (l = u.key[2])) : o = u.key;
                  o += "";
                  n.each(o.split("/"), function (t, r) {
                    n(document).bind("keydown", r, function (n) {
                      if (!i.isModalDialogOpen) return a(), c && n.preventDefault(), !1
                    })
                  });
                  u.sel && !u.hidekey && e.attr("title") && (h = e.attr("title").split("[")[0] + " (" + o + ")", f[o] = u.sel, e.parents("#main_menu").length || (h = h.replace("meta", "⌘"), e.attr("title", h)))
                }
              });
              sf(t);
              n(".attr_changer, #image_url").bind("keydown", "return", function (t) {
                n(this).change();
                t.preventDefault()
              });
              n(window).bind("keydown", "tab", function (n) {
                hi === "canvas" && (n.preventDefault(), ne())
              }).bind("keydown", "shift+tab", function (n) {
                hi === "canvas" && (n.preventDefault(), te())
              });
              n("#tool_zoom").dblclick(oh)
            },
            setTitles: function () {
              n.each(f, function (t, i) {
                var r = n(i).parents("#main_menu").length;
                n(i).each(function () {
                  var i, f;
                  i = r ? n(this).text().split(" [")[0] : this.title.split(" [")[0];
                  f = "";
                  n.each(t.split("/"), function (n, t) {
                    var i = t.split("+"),
                      r = "";
                    i.length > 1 && (r = i[0] + "+", t = i[1]);
                    f += (n ? "/" : "") + r + (u["key_" + t] || t)
                  });
                  r ? this.lastChild.textContent = i + " [" + f + "]" : this.title = i + " [" + f + "]"
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
        rr.setAll();
        i.ready(function () {
          var c, l;
          n("#fot_option_dlg").dialog({
            autoOpen: !1,
            modal: !0,
            resizable: !1,
            width: 410,
            buttons: [{
              text: svgEditor.uiStrings.common.ok,
              click: function () {
                kt.onlyOuterEdge = n("#fot_trcinside1").prop("checked");
                kt.smoothLvl = n('#fotsm_radio input[name="fotsmlvl"]:checked').val();
                n(this).dialog("close")
              }
            }, {
              text: svgEditor.uiStrings.common.cancel,
              click: function () {
                n(this).dialog("close")
              }
            }],
            open: function () {
              n("#fot_trcinside1").prop("checked", kt.onlyOuterEdge);
              n("#fotsm_radio input").val([kt.smoothLvl])
            }
          });
          n("#fot_backStep1dlg").dialog({
            autoOpen: !1,
            modal: !0,
            buttons: [{
              text: svgEditor.uiStrings.common.ok,
              click: function () {
                gc();
                n(this).dialog("close")
              }
            }, {
              text: svgEditor.uiStrings.common.cancel,
              click: function () {
                n(this).dialog("close")
              }
            }]
          });
          n("#fot_pasteImgdlg").dialog({
            autoOpen: !1,
            modal: !0,
            buttons: [{
              text: svgEditor.uiStrings.common.yes,
              click: function () {
                di = 1;
                lu(cu);
                n(this).dialog("close")
              }
            }, {
              text: svgEditor.uiStrings.common.no,
              click: function () {
                di = 2;
                lu(cu);
                n(this).dialog("close")
              }
            }]
          });
          n("#fot_bsc_expdlg").dialog({
            autoOpen: !1,
            modal: !0,
            resizable: !1,
            width: 410,
            dialogClass: "dlgWhiteBar",
            open: function () {
              n("#fotbsc_hide_chk").prop("checked", n.pref("fotbsc_hide") === "1")
            },
            close: function () {
              var t = n("#fotbsc_hide_chk").prop("checked");
              try {
                n.pref("fotbsc_hide", t ? 1 : 0)
              } catch (i) {
                console.log(i)
              }
            }
          });
          n("#fot_adv_expdlg").dialog({
            autoOpen: !1,
            modal: !0,
            resizable: !1,
            width: 410,
            dialogClass: "dlgWhiteBar",
            open: function () {
              n("#fotadv_hide_chk").prop("checked", n.pref("fotadv_hide") === "1")
            },
            close: function () {
              var t = n("#fotadv_hide_chk").prop("checked");
              try {
                n.pref("fotadv_hide", t ? 1 : 0)
              } catch (i) {
                console.log(i)
              }
            }
          });
          var f, e = r.initTool,
            o = n("#tools_left, #svg_editor .tools_flyout"),
            s = o.find("#tool_" + e),
            h = o.find("#" + e);
          f = s.length ? s : h.length ? h : n("#tool_select");
          f.click().mouseup();
          r.wireframe && n("#tool_wireframe+label").click();
          r.showlayers && yo();
          n("#rulers").toggle(!!r.showRulers);
          r.showRulers && (n("#show_rulers")[0].checked = !0);
          r.gridSnapping && (n("#grid_snapping_on")[0].checked = !0);
          r.baseUnit && n("#base_unit").val(r.baseUnit);
          r.snappingStep && n("#grid_snapping_step").val(r.snappingStep);
          st(1);
          yt(window, "init");
          t.undoMgr.resetUndoStack();
          v();
          c = n.pref("iosmsg_hide") === "1" ? !0 : !1;
          l = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
          !c && l ? n("#iOSunload-confirm").dialog({
            autoOpen: !0,
            modal: !0,
            resizable: !1,
            buttons: [{
              text: u.common.ok,
              click: function () {
                n(this).dialog("close")
              }
            }],
            show: {
              effect: "fade",
              duration: "fast"
            },
            hide: {
              effect: "fade",
              duration: "fast"
            },
            close: function () {
              i.closeDialog();
              var t = n("#iOSunload-confirm-hidechk").prop("checked");
              try {
                n.pref("iosmsg_hide", t ? 1 : 0)
              } catch (r) {
                console.log(r)
              }
            },
            open: i.openDialog
          }) : n("#iOSunload-confirm").hide()
        });
        n("#objwidth,#objheight").TouchSpin(ve[r.baseUnit]).on("change", yf).on("touchspin.on.startspin", gs).on("touchspin.on.stopspin", yf);
        n("#angle").TouchSpin({
          min: -360,
          max: 360,
          step: 1,
          forcestepdivisibility: "none",
          decimals: 1,
          buttondown_txt: "",
          buttonup_txt: ""
        }).on("change", ds);
        n("#objwidth_sc,#objheight_sc").TouchSpin({
          min: 5,
          max: 2e3,
          step: 10,
          forcestepdivisibility: "none",
          decimals: 1,
          buttondown_txt: "",
          buttonup_txt: ""
        }).on("change", function (t) {
          var i = n("#objsize_keepaspect_sc").prop("checked"),
            r = yi = t.target.value;
          i && n("#objwidth_sc,#objheight_sc").val(r)
        });
        n("#zoom").SpinButton({
          min: 25,
          max: 1e3,
          step: 50,
          stepfunc: ll,
          callback: oi
        }).val(t.getZoom() * 100);
        n("#text_letter-spacing").TouchSpin({
          min: -30,
          max: 360,
          step: 1,
          buttondown_txt: "",
          buttonup_txt: ""
        }).on("change", th);
        if (bo = i.importPatternCoreFromServer = function (i, r, u, f) {
            h();
            n.ajax({
              async: !0,
              type: "POST",
              url: "GetInternalContentData",
              data: AddAntiForgeryToken({
                contentsid: i
              })
            }).success(function (e) {
              if (!e[0].bSuccess) {
                n.sccv_alert(e[0].message);
                eventAnalyticsRec("ErrorS99", "importPatternCoreFromServer", "click", i);
                return
              }
              var o = e[1],
                s = o[0].viewBox.split(" "),
                h = t.getSizeScreenToDoc(s[2] + 500, s[3] + 500),
                c = '<svg xmlns="http://www.w3.org/2000/svg" width="' + h.width + '" height="' + h.height + '" viewBox="' + o[0].viewBox + '">' + o[0].content + "<\/svg>",
                l = (new DOMParser).parseFromString(c, "text/xml"),
                a = n(l.documentElement);
              t.importPatternCore(a, r, u, f)
            }).error(function () {
              n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
            }).complete(function () {
              e()
            })
          }, ko = i.importMyProjectFromServer = function (r, u) {
            h();
            n.ajax({
              async: !0,
              type: "POST",
              url: "GetMyProjectData",
              data: AddAntiForgeryToken({
                uniqueCode: r
              })
            }).success(function (r) {
              var e, f;
              if (!r[0].bSuccess) {
                n.sccv_alert(r[0].message);
                eventAnalyticsRec("ErrorS99", "importMyProjectFromServer");
                return
              }
              var o = r[1],
                s = decodeURI(o),
                h = (new DOMParser).parseFromString(s, "text/xml"),
                c = n(h.documentElement);
              t.importMyProjectCore(c[0]);
              e = wt();
              f = parseInt(u);
              f === 1 && e !== f && n.sccv_alert(svgEditor.uiStrings.notification.myprojDefMat, !0);
              i.confirmFirefox()
            }).error(function () {
              n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
            }).complete(function () {
              e()
            })
          }, n("#workarea").droppable({
            accept: ".box, .box2",
            tolerance: "pointer",
            drop: function (i, r) {
              var u = n(r.draggable.context),
                c = r.position.left,
                l = r.position.top,
                f = t.getPointScreenToCanvas(c, l),
                o = u.attr("data-svg"),
                e = u.attr("data-ucode"),
                s = u.attr("data-id"),
                h = u.attr("data-categoryname");
              e ? (eventAnalyticsRec("Editor", "importMyProject", "click", e), ko(e, u.attr("data-matid"))) : o ? (eventAnalyticsRec("Editor", "importItem", "click", h + "-" + s), bo(o, f.x, f.y)) : (eventAnalyticsRec("Editor", "importItem", "click", h + "-" + s), t.importPatternCore(u, f.x, f.y))
            }
          }).mousedown(function () {
            n("#zoom, #canvas_title").blur()
          }), n("#workarea").contextMenu({
            menu: "cmenu_canvas",
            inSpeed: 0
          }, function (i) {
            switch (i) {
              case "delete":
                wf();
                break;
              case "cut":
                bf();
                break;
              case "copy":
                kf();
                break;
              case "paste":
                t.pasteElements();
                break;
              case "paste_in_place":
                t.pasteElements("in_place");
                break;
              case "group":
                eventAnalyticsRec("Editor", "clickGroup");
                t.groupSelectedElements();
                break;
              case "ungroup":
                eventAnalyticsRec("Editor", "clickUnGroup");
                t.ungroupSelectedElement();
                break;
              case "move_front":
                df();
                break;
              case "move_up":
                bi("Up");
                break;
              case "move_down":
                bi("Down");
                break;
              case "move_back":
                gf();
                break;
              case "duplicate":
                eventAnalyticsRec("Editor", "clickClone");
                t.cloneSelectedElements(20, 20);
                break;
              case "marge":
                he();
                break;
              case "divide":
                ce();
                break;
              case "rmoverlap":
                le();
                break;
              case "subtract":
                ae();
                break;
              case "rswizard":
                ee();
                break;
              case "offset":
                uu();
                break;
              case "prop":
                eventAnalyticsRec("Editor", "togglePropatyPanel");
                var r = n("#propertyPanel"),
                  u = r.dialog("isOpen");
                u || r.dialog("open");
                break;
              default:
                svgedit.contextmenu && svgedit.contextmenu.hasCustomHandler(i) && svgedit.contextmenu.getCustomHandler(i).call()
            }
            t.clipBoard.length && (ht.enableContextMenuItems("#paste,#paste_in_place"), n("#menu_paste").removeClass("ui-state-disabled"))
          }), du = function (n) {
            switch (n) {
              case "dupe":
                sl();
                break;
              case "delete":
                lo();
                break;
              case "merge_down":
                hl();
                break;
              case "merge_all":
                t.mergeAllLayers();
                v();
                it()
            }
          }, n("#layerlist").contextMenu({
            menu: "cmenu_layers",
            inSpeed: 0
          }, du), n("#layer_moreopts").contextMenu({
            menu: "cmenu_layers",
            inSpeed: 0,
            allowLeft: !0
          }, du), n(".contextMenu li").mousedown(function (n) {
            n.preventDefault()
          }), n('a:not("#sccv_about")').click(function () {
            var t = n(this),
              f = t.attr("href"),
              e = t.attr("target"),
              o = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
            if (o && f && f.indexOf("#") < 0 && !e && (rt.getUndoStackSize() === 0 && (typeof r.canvasprojectinfo == "undefined" || r.canvasprojectinfo === null || r.uniqueCode !== "new") && (i.show_save_warning = !1), !r.no_save_warning && i.show_save_warning)) {
              if (window.confirm(u.notification.unsavedChangesMes)) {
                i.show_save_warning = !1;
                return
              }
              return !1
            }
          }), n("#cmenu_canvas li").disableContextMenu().enableContextMenuItems("#prop"), n("#menu_paste").addClass("ui-state-disabled"), ht.enableContextMenuItems("#delete,#cut,#copy"), window.onbeforeunload = function () {
            return rt.getUndoStackSize() === 0 && (typeof r.canvasprojectinfo == "undefined" || r.canvasprojectinfo === null || r.uniqueCode !== "new") && (i.show_save_warning = !1), !r.no_save_warning && i.show_save_warning ? u.notification.unsavedChanges : void 0
          }, i.openPrep = function (t) {
            n("#main_menu").hide();
            rt.getUndoStackSize() === 0 ? t(!0) : n.confirm(u.notification.QwantToOpen, t)
          }, window.FileReader) {
          var go = null,
            ns = function (i) {
              var r, e;
              (i.stopPropagation(), i.preventDefault(), n("#exfunc_mark #enable_st").length !== 0) && (n("#workarea").removeAttr("style"), n("#main_menu").hide(), r = null, r = i.type === "drop" ? i.dataTransfer.files[0] : this.files[0], r && (r.type.indexOf("image") !== -1 ? r.type.indexOf("svg") !== -1 ? n.sccv_alert(u.notification.invalidFileType) : (e = new FileReader, go = r, e.onload = function (i) {
                if (i.loaded > 2e6) {
                  n.sccv_alert(u.notification.ImageFileSizeTooLarge);
                  return
                }
                var e = new FormData;
                e.append("__RequestVerificationToken", n("input[name=__RequestVerificationToken]").val());
                e.append("filedata", go);
                f = n.ajax("ImageTraceFile", {
                  type: "post",
                  processData: !1,
                  contentType: !1,
                  data: e,
                  dataType: "json",
                  success: function (i) {
                    if (!i[0].bSuccess) {
                      n.sccv_alert(i[0].message);
                      eventAnalyticsRec("ErrorS99", "imageTraceOnInit", "click", r.name);
                      return
                    }
                    var u = i[1],
                      f = t.insertImageElements(u[3], u[1], u[2], 10, 10, u[6], u[7]);
                    t.selectOnly([f]);
                    v()
                  },
                  error: function (t) {
                    t.statusText !== "abort" && n.sccv_alert(svgEditor.uiStrings.notification.ServerError)
                  },
                  complete: function () {
                    f = null
                  }
                })
              }, e.onerror = function (t) {
                n.sccv_alert(u.notification.CannotReadFile + " - " + t.target.error.name)
              }, e.readAsDataURL(r)) : n.sccv_alert(u.notification.invalidFileType)))
            },
            al = function (n) {
              n.stopPropagation();
              n.preventDefault()
            },
            vl = function (n) {
              n.stopPropagation();
              n.preventDefault()
            },
            yl = function (n) {
              n.stopPropagation();
              n.preventDefault()
            };
          c[0].addEventListener("dragenter", al, !1);
          c[0].addEventListener("dragover", vl, !1);
          c[0].addEventListener("dragleave", yl, !1);
          c[0].addEventListener("drop", ns, !1);
          ts = n('<input type="file">').change(function () {
            var r = this;
            i.openPrep(function (i) {
              if (i && (t.clear(), r.files.length === 1)) {
                var u = new FileReader;
                u.onload = function (n) {
                  y(n.target.result);
                  ut()
                };
                u.onerror = function (t) {
                  n.sccv_alert(svgEditor.uiStrings.notification.CannotReadFile + " - " + t.target.error.name)
                };
                u.readAsText(r.files[0])
              }
            })
          });
          n("#tool_open").show().prepend(ts);
          is = n('<input type="file">').change(ns);
          n("#tool_import").show().prepend(is)
        }
        for (ut = i.updateCanvas = function (i, u) {
            var e = c.width(),
              s = c.height(),
              l = e,
              a = s,
              p = t.getZoom(),
              h = c,
              v = n("#svgcanvas"),
              b = {
                x: h[0].scrollLeft + Math.round(l / 2),
                y: h[0].scrollTop + Math.round(a / 2)
              },
              k = r.canvas_expansion,
              d, w, f, tt;
            e = Math.max(l, t.contentW * p * k);
            s = Math.max(a, t.contentH * p * k);
            e === l && s === a ? c.css("overflow", "hidden") : c.css("overflow", "scroll");
            d = v.height() / 2;
            w = v.width() / 2;
            v.width(e).height(s);
            var it = s / 2,
              g = e / 2,
              y = t.updateCanvas(e, s),
              nt = g / w,
              rt = e / 2 - l / 2,
              ut = s / 2 - a / 2;
            if (u) u.x += y.x, u.y += y.y;
            else {
              var ft = b.x - w,
                et = g + ft * nt,
                ot = b.y - d,
                st = it + ot * nt;
              u = {
                x: et,
                y: st
              }
            }
            i ? t.contentW > h.width() ? (c[0].scrollLeft = y.x - 10, c[0].scrollTop = y.y - 10) : (h[0].scrollLeft = rt, h[0].scrollTop = ut) : (h[0].scrollLeft = u.x - l / 2, h[0].scrollTop = u.y - a / 2);
            r.showRulers ? (gu(v, p), c.scroll(), n("#tool_showruler_icon").addClass("ui-icon-check").removeClass("ui-icon-none")) : n("#tool_showruler_icon").removeClass("ui-icon-check").addClass("ui-icon-none");
            f = wt();
            f === 0 && n("#tool_mat12").prop("checked", !0);
            f === 1 && n("#tool_mat24").prop("checked", !0);
            f === 2 && n("#tool_matA4p").prop("checked", !0);
            f === 3 && n("#tool_matA4l").prop("checked", !0);
            f === 4 && n("#tool_matLTp").prop("checked", !0);
            f === 5 && n("#tool_matLTl").prop("checked", !0);
            f === 6 && n("#tool_matPCp").prop("checked", !0);
            f === 7 && n("#tool_matPCl").prop("checked", !0);
            n(".tool_unit").removeClass("ui-icon-check").addClass("ui-icon-none");
            r.baseUnit === "in" ? n("#unit_inch").prop("checked", !0) : r.baseUnit === "mm" && n("#unit_mm").prop("checked", !0);
            o.showMatImage ? (n("#tool_showmat").prop("checked", !0), f !== undefined && (tt = fcmhost + "/Content/images/Mat" + f + ".svg", t.setMatImage(f, tt))) : n("#tool_showmat").prop("checked", !1)
          }, ni = [], ti = .1; ti < 1e5; ti *= 10) ni.push(1 * ti), ni.push(2 * ti), ni.push(5 * ti);
        ut(!0);
        try {
          rs = function (n) {
            var i, t, r, u;
            if (window.JSON && JSON.stringify) return JSON.stringify(n);
            if (i = arguments.callee, typeof n == "boolean" || typeof n == "number") return n + "";
            if (typeof n == "string") return '"' + n.replace(/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function (n) {
              return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
            }) + '"';
            if (n.length) {
              for (t = 0; t < n.length; t++) n[t] = i(n[t]);
              return "[" + n.join(",") + "]"
            }
            r = [];
            for (u in n) r.push(i(u) + ":" + i(n[u]));
            return "{" + r.join(",") + "}"
          };
          window.addEventListener("message", function (e) {
            if (typeof e.data == "string") {
              var cbid = parseInt(e.data.substr(0, e.data.indexOf(";")));
              try {
                e.source.postMessage("SVGe" + cbid + ";" + rs(eval(e.data)), "*")
              } catch (err) {
                e.source.postMessage("SVGe" + cbid + ";error:" + err.message, "*")
              }
            }
          }, !1)
        } catch (pl) {
          window.embed_error = pl
        }
        n(function () {
          window.svgCanvas = t;
          t.ready = svgEditor.ready
        });
        i.setLang = function (i, r) {
          var f;
          if (n.pref("lang", i), n("#lang_select").val(i), r) {
            var s = r.notification,
              e = n("#layerlist tr.layersel td.layername").text(),
              o = e === u.common.layer + " 1";
            n.extend(u, r);
            t.setUiStrings(r);
            rr.setTitles();
            o && (t.renameCurrentLayer(u.common.layer + " 1"), it());
            t.runExtensions("langChanged", i);
            cf();
            f = {
              "#stroke_color": "#tool_stroke .icon_label, #tool_stroke .color_block",
              "#fill_color": "#tool_fill label, #tool_fill .color_block",
              "#linejoin_miter": "#cur_linejoin",
              "#linecap_butt": "#cur_linecap"
            };
            n.each(f, function (t, i) {
              n(i).attr("title", n(t)[0].title)
            });
            n("#multiselected_panel div[id^=tool_align]").each(function () {
              n("#tool_pos" + this.id.substr(10))[0].title = this.title
            })
          }
        }
      };
      i.confirmFirefox = function () {
        navigator.userAgent.indexOf("Firefox") !== -1 && n("#svgcontent text").length > 0 && n("#firefox-confirm").dialog("open")
      };
      w = [];
      i.ready = function (n) {
        b ? n() : w.push(n)
      };
      i.runCallbacks = function () {
        n.each(w, function () {
          this()
        });
        b = !0
      };
      i.loadFromString = function (n) {
        i.ready(function () {
          y(n)
        })
      };
      i.disableUI = function () {};
      i.loadFromURL = function (t, r) {
        r || (r = {});
        var e = r.cache,
          f = r.callback;
        i.ready(function () {
          n.ajax({
            url: t,
            dataType: "text",
            cache: !!e,
            success: function (n) {
              y(n, f)
            },
            error: function (t, i, r) {
              t.status !== 404 && t.responseText ? y(t.responseText, f) : n.alert(u.notification.URLloadFail + ": \n" + r + "", f)
            }
          })
        })
      };
      i.loadFromDataURI = function (n) {
        i.ready(function () {
          y(decodeURI(n), function () {
            i.confirmFirefox();
            t.resetUndoMgr()
          })
        })
      };
      i.addExtension = function () {
        var i = arguments;
        n(function () {
          t && t.addExtension.apply(this, i)
        })
      };
      i.setDocumentTitle = function (n) {
        t && t.setDocumentTitle(n)
      };
      var v = null,
        c = function (n) {
          n.hasClass("dragready") && n.draggable("destroy").unbind("click.once").removeClass("dragready");
          v = null
        },
        s = null;
      n("#importPanel").scroll(function () {
        s !== null && (clearTimeout(s), s = null);
        v !== null && c(v)
      });
      i.setMyProjectItem = function (r, u, f) {
        var e, o = svgedit.browser.isTouch(),
          h;
        if (e = n("<img src=" + f.thumbpath + ">").css("width", u.width).css("height", u.height), h = function () {
            var i = n("<div>"),
              r = t.getSizeScreenToDoc(100, 100);
            return i.css("width", r.width + "px").css("height", r.height + "px").css("border", "1px dashed blue"), i
          }, r.append(e).attr("data-ucode", f.contentId).attr("data-matid", f.matID), o) {
          r.click(function () {
            var t = n(this);
            c(t);
            i.importMyProjectFromServer(t.attr("data-ucode"), t.attr("data-matid"))
          });
          r.on("touchstart mousedown", function (t) {
            s === null && (v = r, s = setTimeout(function () {
              r.draggable({
                appendTo: "body",
                helper: "clone",
                stop: function () {
                  c(n(this))
                }
              }).addClass("dragready");
              r.trigger(t);
              s = null
            }, 200))
          });
          r.on("touchend mouseup", function () {
            clearTimeout(s);
            s = null;
            c(r)
          })
        } else r.draggable({
          appendTo: "body",
          helper: "clone"
        }).click(function () {
          eventAnalyticsRec("Editor", "importMyProject", "click", n(this).attr("data-ucode"));
          i.importMyProjectFromServer(n(this).attr("data-ucode"), n(this).attr("data-matid"))
        })
      };
      i.setImportItem = function (r, u, f) {
        var o, h = svgedit.browser.isTouch(),
          l, e;
        if (f.thumbnail === null)
          if (l = (new DOMParser).parseFromString('<svg xmlns="http://www.w3.org/2000/svg" width="' + u.width + '" height="' + u.height + '" viewBox="' + f.viewBox + '">' + f.content + "<\/svg>", "text/xml"), o = l.documentElement, e = function () {
              var u = n("<div>"),
                i = n(this).find("svg").clone(),
                e = i.attr("viewBox").split(" "),
                r = t.getSizeScreenToDoc(e[2], e[3]),
                f;
              return u.css("width", r.width + "px").css("height", r.height + "px"), i.attr("width", r.width + "px").attr("height", r.height + "px"), f = i.find("text"), f && f.text("text"), u.append(i), u
            }, r.append(o), h) {
            r.click(function () {
              c(n(this));
              t.importPatternCore(n(this), 10, 10, !0)
            });
            r.on("touchstart mousedown", function (t) {
              s === null && (v = r, s = setTimeout(function () {
                r.draggable({
                  appendTo: "body",
                  helper: e,
                  stop: function () {
                    c(n(this))
                  }
                }).addClass("dragready");
                r.trigger(t);
                s = null
              }, 200))
            });
            r.on("touchend mouseup", function () {
              clearTimeout(s);
              s = null;
              c(r)
            })
          } else r.draggable({
            appendTo: "body",
            helper: e
          }).click(function () {
            eventAnalyticsRec("Editor", "importItem", "click", n(this).attr("data-categoryname") + "-" + n(this).attr("data-id"));
            t.importPatternCore(n(this), 10, 10, !0)
          });
        else if (o = n("<img src=" + f.thumbnail + ">").css("width", u.width).css("height", u.height), e = function () {
            var i = n("<div>"),
              r = n(this).attr("data-viewbox").split(" "),
              u = t.getSizeScreenToDoc(r[2], r[3]);
            return i.css("width", u.width + "px").css("height", u.height + "px").css("border", "1px dashed blue"), i
          }, r.append(o).attr("data-viewbox", f.viewBox).attr("data-svg", f.dataid), h) {
          r.click(function () {
            c(n(this));
            i.importPatternCoreFromServer(n(this).attr("data-svg"), 10, 10, !0)
          });
          r.on("touchstart mousedown", function (t) {
            s === null && (v = r, s = setTimeout(function () {
              r.draggable({
                appendTo: "body",
                helper: e,
                stop: function () {
                  c(n(this))
                }
              }).addClass("dragready");
              r.trigger(t);
              s = null
            }, 200))
          });
          r.on("touchend mouseup", function () {
            clearTimeout(s);
            s = null;
            c(r)
          })
        } else r.draggable({
          appendTo: "body",
          helper: e
        }).click(function () {
          eventAnalyticsRec("Editor", "importItem", "click", n(this).attr("data-categoryname") + "-" + n(this).attr("data-id"));
          i.importPatternCoreFromServer(n(this).attr("data-svg"), 10, 10, !0)
        })
      };
      var l = null,
        h = i.showProgressbar = function (t) {
          l = setTimeout(function () {
            n("#progressbar").slideDown(100)
          }, 250);
          t && n("#pre_fade").css("opacity", "0").show()
        },
        e = i.hideProgressbar = function () {
          clearTimeout(l);
          l = null;
          n("#progressbar").slideUp(100);
          n("#pre_fade").hide()
        };
      return i
    }(jQuery));
    $(svgEditor.init)
  }();
svgEditor = function (n, t) {
  function r(t, i, r) {
    var h = n("#svg_editor").parent(),
      u, f, c, e, o, s;
    for (u in i)
      if (f = i[u], f || console.log(u), r && (u = "#" + u), c = h.find(u), c.length) {
        e = h.find(u)[0];
        switch (t) {
          case "content":
            for (o = 0; o < e.childNodes.length; o++)
              if (s = e.childNodes[o], s.nodeType === 3 && s.textContent.replace(/\s/g, "")) {
                s.textContent = f;
                break
              } break;
          case "title":
            e.title = f
        }
      } else console.log("Missing: " + u)
  }
  var i;
  return t.readLang = function (u) {
    var y = t.canvas.runExtensions("addlangData", i, !0),
      a, v, c;
    if (n.each(y, function (t, i) {
        i.data && (u = n.merge(u, i.data))
      }), u.tools) {
      var f = u.tools,
        p = u.misc,
        e = u.properties,
        o = u.config,
        s = u.layers,
        h = u.common,
        l = u.ui;
      r("content", {
        copyrightLabel: p.powered_by,
        curve_segments: e.curve_segments,
        fitToContent: f.fitToContent,
        fit_to_all: f.fit_to_all,
        fit_to_canvas: f.fit_to_canvas,
        fit_to_layer_content: f.fit_to_layer_content,
        fit_to_sel: f.fit_to_sel,
        icon_large: o.icon_large,
        icon_medium: o.icon_medium,
        icon_small: o.icon_small,
        icon_xlarge: o.icon_xlarge,
        image_opt_embed: o.image_opt_embed,
        image_opt_ref: o.image_opt_ref,
        includedImages: o.included_images,
        largest_object: f.largest_object,
        layersLabel: s.layers,
        page: f.page,
        relativeToLabel: f.relativeTo,
        selLayerLabel: s.move_elems_to,
        selectedPredefined: o.select_predefined,
        selected_objects: f.selected_objects,
        smallest_object: f.smallest_object,
        straight_segments: e.straight_segments,
        svginfo_bg_url: o.editor_img_url + ":",
        svginfo_bg_note: o.editor_bg_note,
        svginfo_change_background: o.background,
        svginfo_dim: o.doc_dims,
        svginfo_editor_prefs: o.editor_prefs,
        svginfo_height: h.height,
        svginfo_icons: o.icon_size,
        svginfo_image_props: o.image_props,
        svginfo_lang: o.language,
        svginfo_title: o.doc_title,
        svginfo_width: h.width,
        tool_docprops_cancel: h.cancel,
        tool_docprops_save: h.ok,
        tool_source_cancel: h.cancel,
        tool_source_save: h.ok,
        tool_prefs_cancel: h.cancel,
        tool_prefs_save: h.ok,
        sidepanel_handle: s.layers.split("").join(" "),
        tool_clear: f.new_doc,
        tool_docprops: f.docprops,
        tool_export: f.export_png,
        tool_import: f.import_doc,
        tool_imagelib: f.imagelib,
        tool_open: f.open_doc,
        tool_save: f.save_doc,
        svginfo_units_rulers: o.units_and_rulers,
        svginfo_rulers_onoff: o.show_rulers,
        svginfo_unit: o.base_unit,
        svginfo_grid_settings: o.grid,
        svginfo_snap_onoff: o.snapping_onoff,
        svginfo_snap_step: o.snapping_stepsize
      }, !0);
      a = {};
      for (v in u.shape_cats) a['#shape_cats [data-cat="' + v + '"]'] = u.shape_cats[v];
      setTimeout(function () {
        r("content", a)
      }, 2e3);
      c = {};
      n.each(["cut", "copy", "paste", "paste_in_place", "delete", "group", "ungroup", "move_front", "move_up", "move_down", "move_back"], function () {
        c['#cmenu_canvas a[href="#' + this + '"]'] = f[this]
      });
      n.each(["dupe", "merge_down", "merge_all"], function () {
        c['#cmenu_layers a[href="#' + this + '"]'] = s[this]
      });
      c['#cmenu_layers a[href="#delete"]'] = s.del;
      r("content", c);
      r("title", {
        align_relative_to: f.align_relative_to,
        circle_cx: e.circle_cx,
        circle_cy: e.circle_cy,
        circle_r: e.circle_r,
        cornerRadiusLabel: e.corner_radius,
        ellipse_cx: e.ellipse_cx,
        ellipse_cy: e.ellipse_cy,
        ellipse_rx: e.ellipse_rx,
        ellipse_ry: e.ellipse_ry,
        fill_color: e.fill_color,
        font_family: e.font_family,
        idLabel: e.id,
        image_height: e.image_height,
        image_url: e.image_url,
        image_width: e.image_width,
        layer_delete: s.del,
        layer_down: s.move_down,
        layer_new: s["new"],
        layer_rename: s.rename,
        layer_moreopts: h.more_opts,
        layer_up: s.move_up,
        line_x1: e.line_x1,
        line_x2: e.line_x2,
        line_y1: e.line_y1,
        line_y2: e.line_y2,
        linecap_butt: e.linecap_butt,
        linecap_round: e.linecap_round,
        linecap_square: e.linecap_square,
        linejoin_bevel: e.linejoin_bevel,
        linejoin_miter: e.linejoin_miter,
        linejoin_round: e.linejoin_round,
        main_icon: f.main_menu,
        mode_connect: f.mode_connect,
        tools_shapelib_show: f.mode_shapelib,
        palette: l.palette_info,
        zoom_panel: l.zoom_level,
        path_node_x: e.node_x,
        path_node_y: e.node_y,
        rect_height_tool: e.rect_height,
        rect_width_tool: e.rect_width,
        seg_type: e.seg_type,
        selLayerNames: s.move_selected,
        selected_x: e.pos_x,
        selected_y: e.pos_y,
        stroke_color: e.stroke_color,
        stroke_style: e.stroke_style,
        stroke_width: e.stroke_width,
        svginfo_title: o.doc_title,
        text: e.text_contents,
        toggle_stroke_tools: l.toggle_stroke_tools,
        tool_add_subpath: f.add_subpath,
        tool_alignbottom: f.align_bottom,
        tool_aligncenter: f.align_center,
        tool_alignleft: f.align_left,
        tool_alignmiddle: f.align_middle,
        tool_alignright: f.align_right,
        tool_aligntop: f.align_top,
        tool_angle: e.angle,
        tool_blur: e.blur,
        tool_bold: e.bold,
        tool_circle: f.mode_circle,
        tool_clone: f.clone,
        tool_clone_multi: f.clone,
        tool_delete: f.del,
        tool_delete_multi: f.del,
        tool_ellipse: f.mode_ellipse,
        tool_eyedropper: f.mode_eyedropper,
        tool_fhellipse: f.mode_fhellipse,
        tool_fhpath: f.mode_fhpath,
        tool_fhrect: f.mode_fhrect,
        tool_font_size: e.font_size,
        tool_group: f.group,
        tool_make_link: f.make_link,
        tool_link_url: f.set_link_url,
        tool_image: f.mode_image,
        tool_italic: e.italic,
        tool_line: f.mode_line,
        tool_move_bottom: f.move_bottom,
        tool_move_top: f.move_top,
        tool_node_clone: f.node_clone,
        tool_node_delete: f.node_delete,
        tool_node_link: f.node_link,
        tool_opacity: e.opacity,
        tool_openclose_path: f.openclose_path,
        tool_path: f.mode_path,
        tool_position: f.align_to_page,
        tool_rect: f.mode_rect,
        tool_redo: f.redo,
        tool_reorient: f.reorient_path,
        tool_select: f.mode_select,
        tool_source: f.source_save,
        tool_square: f.mode_square,
        tool_text: f.mode_text,
        tool_topath: f.to_path,
        tool_undo: f.undo,
        tool_ungroup: f.ungroup,
        tool_wireframe: f.wireframe_mode,
        view_grid: f.toggle_grid,
        tool_zoom: f.mode_zoom,
        url_notice: f.no_embed
      }, !0);
      t.setLang(i, u)
    }
  }, t.putLocale = function (r, u) {
    if (r) i = r;
    else {
      if (i = n.pref("lang"), !i && (navigator.userLanguage ? i = navigator.userLanguage : navigator.language && (i = navigator.language), i == "")) return;
      if (console.log("Lang: " + i), n.inArray(i, u) == -1 && i !== "test" && (i = "en"), i.indexOf("en") == 0) return
    }
    var e = t.curConfig,
      f = e.langPath + "lang." + i + ".js";
    n.getScript(f, function (n) {
      if (!n) {
        var t = document.createElement("script");
        t.src = f;
        document.querySelector("head").appendChild(t)
      }
    })
  }, t
}(jQuery, svgEditor);
svgedit = svgedit || {},
  function () {
    var n = this;
    svgedit.contextmenu || (svgedit.contextmenu = {});
    n.contextMenuExtensions = {};
    var t = function (t) {
        if (!f(t)) {
          console.error("Menu items must be defined and have at least properties: id, label, action, where action must be a function");
          return
        }
        if (t.id in n.contextMenuExtensions) {
          console.error('Cannot add extension "' + t.id + '", an extension by that name already exists"');
          return
        }
        console.log("Registed contextmenu item: {id:" + t.id + ", label:" + t.label + "}");
        n.contextMenuExtensions[t.id] = t
      },
      i = function (t) {
        return n.contextMenuExtensions[t] && !0
      },
      r = function (t) {
        return n.contextMenuExtensions[t].action
      },
      u = function (t) {
        Object.keys(n.contextMenuExtensions).length == 0 && $("#cmenu_canvas").append("<li class='separator'>");
        var i = t.shortcut || "";
        $("#cmenu_canvas").append("<li class='disabled'><a href='#" + t.id + "'>" + t.label + "<span class='shortcut'>" + i + "<\/span><\/a><\/li>")
      },
      f = function (n) {
        return n && n.id && n.label && n.action && typeof n.action == "function"
      };
    svgEditor.ready(function () {
      for (menuItem in contextMenuExtensions) u(contextMenuExtensions[menuItem])
    });
    svgedit.contextmenu.resetCustomMenus = function () {
      n.contextMenuExtensions = {}
    };
    svgedit.contextmenu.add = t;
    svgedit.contextmenu.hasCustomHandler = i;
    svgedit.contextmenu.getCustomHandler = r
  }(),
  function (n) {
    var f, e;
    Math.precision = function (n, t) {
      return t === undefined && (t = 0), Math.round(n * Math.pow(10, t)) / Math.pow(10, t)
    };
    f = function (t, i) {
      var r = this,
        s = t.find("img:first"),
        u = 0,
        f = 100,
        h = 100,
        e = 0,
        o = 100,
        c = 100,
        l = 0,
        a = 0,
        p, y, v = [],
        tt = function (n) {
          for (var t = 0; t < v.length; t++) v[t].call(r, r, n)
        },
        k = function (i) {
          var u = t.offset();
          p = {
            l: u.left | 0,
            t: u.top | 0
          };
          clearTimeout(y);
          y = setTimeout(function () {
            d.call(r, i)
          }, 0);
          n(document).bind("mousemove", w).bind("mouseup", b);
          i.preventDefault()
        },
        w = function (n) {
          return clearTimeout(y), y = setTimeout(function () {
            d.call(r, n)
          }, 0), n.stopPropagation(), n.preventDefault(), !1
        },
        b = function (t) {
          return n(document).unbind("mouseup", b).unbind("mousemove", w), t.stopPropagation(), t.preventDefault(), !1
        },
        d = function (n) {
          var i = n.pageX - p.l,
            f = n.pageY - p.t,
            o = t.w,
            s = t.h;
          i < 0 ? i = 0 : i > o && (i = o);
          f < 0 ? f = 0 : f > s && (f = s);
          g.call(r, "xy", {
            x: i / o * h + u,
            y: f / s * c + e
          })
        },
        it = function () {
          var n = 0,
            i = 0,
            r = t.w,
            u = t.h,
            e = s.w,
            v = s.h;
          setTimeout(function () {
            h > 0 && (n = l == f ? r : l / h * r | 0);
            c > 0 && (i = a == o ? u : a / c * u | 0);
            e >= r ? n = (r >> 1) - (e >> 1) : n -= e >> 1;
            v >= u ? i = (u >> 1) - (v >> 1) : i -= v >> 1;
            s.css({
              left: n + "px",
              top: i + "px"
            })
          }, 0)
        },
        g = function (n, t, i) {
          var v = t !== undefined,
            c, s, h;
          if (!v) {
            (n === undefined || n == null) && (n = "xy");
            switch (n.toLowerCase()) {
              case "x":
                return l;
              case "y":
                return a;
              case "xy":
              default:
                return {
                  x: l,
                  y: a
                }
            }
          }
          if (i == null || i != r) {
            c = !1;
            n == null && (n = "xy");
            switch (n.toLowerCase()) {
              case "x":
                s = t && (t.x && t.x | 0 || t | 0) || 0;
                break;
              case "y":
                h = t && (t.y && t.y | 0 || t | 0) || 0;
                break;
              case "xy":
              default:
                s = t && t.x && t.x | 0 || 0;
                h = t && t.y && t.y | 0 || 0
            }
            s != null && (s < u ? s = u : s > f && (s = f), l != s && (l = s, c = !0));
            h != null && (h < e ? h = e : h > o && (h = o), a != h && (a = h, c = !0));
            c && tt.call(r, i || r)
          }
        },
        rt = function (n, t) {
          var a = t !== undefined,
            v, i, r, s, l;
          if (!a) {
            (n === undefined || n == null) && (n = "all");
            switch (n.toLowerCase()) {
              case "minx":
                return u;
              case "maxx":
                return f;
              case "rangex":
                return {
                  minX: u,
                  maxX: f,
                  rangeX: h
                };
              case "miny":
                return e;
              case "maxy":
                return o;
              case "rangey":
                return {
                  minY: e,
                  maxY: o,
                  rangeY: c
                };
              case "all":
              default:
                return {
                  minX: u,
                  maxX: f,
                  rangeX: h,
                  minY: e,
                  maxY: o,
                  rangeY: c
                }
            }
          }
          v = !1;
          n == null && (n = "all");
          switch (n.toLowerCase()) {
            case "minx":
              i = t && (t.minX && t.minX | 0 || t | 0) || 0;
              break;
            case "maxx":
              r = t && (t.maxX && t.maxX | 0 || t | 0) || 0;
              break;
            case "rangex":
              i = t && t.minX && t.minX | 0 || 0;
              r = t && t.maxX && t.maxX | 0 || 0;
              break;
            case "miny":
              s = t && (t.minY && t.minY | 0 || t | 0) || 0;
              break;
            case "maxy":
              l = t && (t.maxY && t.maxY | 0 || t | 0) || 0;
              break;
            case "rangey":
              s = t && t.minY && t.minY | 0 || 0;
              l = t && t.maxY && t.maxY | 0 || 0;
              break;
            case "all":
            default:
              i = t && t.minX && t.minX | 0 || 0;
              r = t && t.maxX && t.maxX | 0 || 0;
              s = t && t.minY && t.minY | 0 || 0;
              l = t && t.maxY && t.maxY | 0 || 0
          }
          i != null && u != i && (u = i, h = f - u);
          r != null && f != r && (f = r, h = f - u);
          s != null && e != s && (e = s, c = o - e);
          l != null && o != l && (o = l, c = o - e)
        },
        nt = function (t) {
          n.isFunction(t) && v.push(t)
        },
        ut = function (t) {
          if (n.isFunction(t))
            for (var i;
              (i = n.inArray(t, v)) != -1;) v.splice(i, 1)
        },
        ft = function () {
          n(document).unbind("mouseup", b).unbind("mousemove", w);
          t.unbind("mousedown", k);
          t = null;
          s = null;
          v = null
        };
      n.extend(!0, r, {
        val: g,
        range: rt,
        bind: nt,
        unbind: ut,
        destroy: ft
      });
      s.src = i.arrow && i.arrow.image;
      s.w = i.arrow && i.arrow.width || s.width();
      s.h = i.arrow && i.arrow.height || s.height();
      t.w = i.map && i.map.width || t.width();
      t.h = i.map && i.map.height || t.height();
      t.bind("mousedown", k);
      nt.call(r, it)
    };
    e = function (t, i, r, u) {
      var p = this,
        s = t.find("td.Text input"),
        h = s.eq(3),
        c = s.eq(4),
        l = s.eq(5),
        o = s.length > 7 ? s.eq(6) : null,
        a = s.eq(0),
        v = s.eq(1),
        y = s.eq(2),
        f = s.eq(s.length > 7 ? 7 : 6),
        e = s.length > 7 ? s.eq(8) : null,
        b = function (n) {
          if (n.target.value != "" || n.target == f.get(0) || (r == null || n.target == r.get(0)) && r != null) {
            if (!g(n)) return n;
            switch (n.target) {
              case h.get(0):
                h.val(w.call(p, h.val(), 0, 255));
                i.val("r", h.val(), n.target);
                break;
              case c.get(0):
                c.val(w.call(p, c.val(), 0, 255));
                i.val("g", c.val(), n.target);
                break;
              case l.get(0):
                l.val(w.call(p, l.val(), 0, 255));
                i.val("b", l.val(), n.target);
                break;
              case o && o.get(0):
                o.val(w.call(p, o.val(), 0, 100));
                i.val("a", Math.precision(o.val() * 255 / 100, u), n.target);
                break;
              case a.get(0):
                a.val(w.call(p, a.val(), 0, 360));
                i.val("h", a.val(), n.target);
                break;
              case v.get(0):
                v.val(w.call(p, v.val(), 0, 100));
                i.val("s", v.val(), n.target);
                break;
              case y.get(0):
                y.val(w.call(p, y.val(), 0, 100));
                i.val("v", y.val(), n.target);
                break;
              case f.get(0):
                f.val(f.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 6));
                r && r.val(f.val());
                i.val("hex", f.val() != "" ? f.val() : null, n.target);
                break;
              case r && r.get(0):
                r.val(r.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 6));
                f.val(r.val());
                i.val("hex", r.val() != "" ? r.val() : null, n.target);
                break;
              case e && e.get(0):
                e.val(e.val().replace(/[^a-fA-F0-9]/g, "").toLowerCase().substring(0, 2));
                i.val("a", e.val() != null ? parseInt(e.val(), 16) : null, n.target)
            }
          }
        },
        k = function (n) {
          if (i.val() != null) switch (n.target) {
            case h.get(0):
              h.val(i.val("r"));
              break;
            case c.get(0):
              c.val(i.val("g"));
              break;
            case l.get(0):
              l.val(i.val("b"));
              break;
            case o && o.get(0):
              o.val(Math.precision(i.val("a") * 100 / 255, u));
              break;
            case a.get(0):
              a.val(i.val("h"));
              break;
            case v.get(0):
              v.val(i.val("s"));
              break;
            case y.get(0):
              y.val(i.val("v"));
              break;
            case f.get(0):
            case r && r.get(0):
              f.val(i.val("hex"));
              r && r.val(i.val("hex"));
              break;
            case e && e.get(0):
              e.val(i.val("ahex").substring(6))
          }
        },
        g = function (n) {
          switch (n.keyCode) {
            case 9:
            case 16:
            case 29:
            case 37:
            case 38:
            case 40:
              return !1;
            case "c".charCodeAt():
            case "v".charCodeAt():
              if (n.ctrlKey) return !1
          }
          return !0
        },
        w = function (n, t, i) {
          return n == "" || isNaN(n) ? t : n > i ? i : n < t ? t : n
        },
        d = function (n, t) {
          var i = n.val("all");
          t != h.get(0) && h.val(i != null ? i.r : "");
          t != c.get(0) && c.val(i != null ? i.g : "");
          t != l.get(0) && l.val(i != null ? i.b : "");
          o && t != o.get(0) && o.val(i != null ? Math.precision(i.a * 100 / 255, u) : "");
          t != a.get(0) && a.val(i != null ? i.h : "");
          t != v.get(0) && v.val(i != null ? i.s : "");
          t != y.get(0) && y.val(i != null ? i.v : "");
          t != f.get(0) && (r && t != r.get(0) || !r) && f.val(i != null ? i.hex : "");
          r && t != r.get(0) && t != f.get(0) && r.val(i != null ? i.hex : "");
          e && t != e.get(0) && e.val(i != null ? i.ahex.substring(6) : "")
        },
        nt = function () {
          h.add(c).add(l).add(o).add(a).add(v).add(y).add(f).add(r).add(e).unbind("keyup", b).unbind("blur", k);
          i.unbind(d);
          h = null;
          c = null;
          l = null;
          o = null;
          a = null;
          v = null;
          y = null;
          f = null;
          e = null
        };
      n.extend(!0, p, {
        destroy: nt
      });
      h.add(c).add(l).add(o).add(a).add(v).add(y).add(f).add(r).add(e).bind("keyup", b).bind("blur", k);
      i.bind(d)
    };
    n.jPicker = {
      List: [],
      Color: function (t) {
        var i = this,
          u, e, o, f, c, s, h, a = [],
          v = function (n) {
            for (var t = 0; t < a.length; t++) a[t].call(i, i, n)
          },
          l = function (n, t, a) {
            var g = t !== undefined,
              w, b, p;
            if (!g) {
              if ((n === undefined || n == null || n == "") && (n = "all"), u == null) return null;
              switch (n.toLowerCase()) {
                case "ahex":
                  return r.rgbaToHex({
                    r: u,
                    g: e,
                    b: o,
                    a: f
                  });
                case "hex":
                  return l("ahex").substring(0, 6);
                case "all":
                  return {
                    r: u,
                    g: e,
                    b: o,
                    a: f,
                    h: c,
                    s: s,
                    v: h,
                    hex: l.call(i, "hex"),
                    ahex: l.call(i, "ahex")
                  };
                default:
                  for (p = {}, b = 0; b < n.length; b++) switch (n.charAt(b)) {
                    case "r":
                      n.length == 1 ? p = u : p.r = u;
                      break;
                    case "g":
                      n.length == 1 ? p = e : p.g = e;
                      break;
                    case "b":
                      n.length == 1 ? p = o : p.b = o;
                      break;
                    case "a":
                      n.length == 1 ? p = f : p.a = f;
                      break;
                    case "h":
                      n.length == 1 ? p = c : p.h = c;
                      break;
                    case "s":
                      n.length == 1 ? p = s : p.s = s;
                      break;
                    case "v":
                      n.length == 1 ? p = h : p.v = h
                  }
                  return p == {} ? l.call(i, "all") : p
              }
            }
            if (a == null || a != i) {
              if (w = !1, n == null && (n = ""), t == null) {
                u != null && (u = null, w = !0);
                e != null && (e = null, w = !0);
                o != null && (o = null, w = !0);
                f != null && (f = null, w = !0);
                c != null && (c = null, w = !0);
                s != null && (s = null, w = !0);
                h != null && (h = null, w = !0);
                w && v.call(i, a || i);
                return
              }
              switch (n.toLowerCase()) {
                case "ahex":
                case "hex":
                  p = r.hexToRgba(t && (t.ahex || t.hex) || t || "00000000");
                  l.call(i, "rgba", {
                    r: p.r,
                    g: p.g,
                    b: p.b,
                    a: n == "ahex" ? p.a : f != null ? f : 255
                  }, a);
                  break;
                default:
                  if (t && (t.ahex != null || t.hex != null)) {
                    l.call(i, "ahex", t.ahex || t.hex || "00000000", a);
                    return
                  }
                  var y = {},
                    k = !1,
                    d = !1;
                  for (t.r !== undefined && !n.indexOf("r") == -1 && (n += "r"), t.g !== undefined && !n.indexOf("g") == -1 && (n += "g"), t.b !== undefined && !n.indexOf("b") == -1 && (n += "b"), t.a !== undefined && !n.indexOf("a") == -1 && (n += "a"), t.h !== undefined && !n.indexOf("h") == -1 && (n += "h"), t.s !== undefined && !n.indexOf("s") == -1 && (n += "s"), t.v !== undefined && !n.indexOf("v") == -1 && (n += "v"), b = 0; b < n.length; b++) switch (n.charAt(b)) {
                    case "r":
                      if (d) continue;
                      k = !0;
                      y.r = t && t.r && t.r | 0 || t && t | 0 || 0;
                      y.r < 0 ? y.r = 0 : y.r > 255 && (y.r = 255);
                      u != y.r && (u = y.r, w = !0);
                      break;
                    case "g":
                      if (d) continue;
                      k = !0;
                      y.g = t && t.g && t.g | 0 || t && t | 0 || 0;
                      y.g < 0 ? y.g = 0 : y.g > 255 && (y.g = 255);
                      e != y.g && (e = y.g, w = !0);
                      break;
                    case "b":
                      if (d) continue;
                      k = !0;
                      y.b = t && t.b && t.b | 0 || t && t | 0 || 0;
                      y.b < 0 ? y.b = 0 : y.b > 255 && (y.b = 255);
                      o != y.b && (o = y.b, w = !0);
                      break;
                    case "a":
                      y.a = t && t.a != null ? t.a | 0 : t != null ? t | 0 : 255;
                      y.a < 0 ? y.a = 0 : y.a > 255 && (y.a = 255);
                      f != y.a && (f = y.a, w = !0);
                      break;
                    case "h":
                      if (k) continue;
                      d = !0;
                      y.h = t && t.h && t.h | 0 || t && t | 0 || 0;
                      y.h < 0 ? y.h = 0 : y.h > 360 && (y.h = 360);
                      c != y.h && (c = y.h, w = !0);
                      break;
                    case "s":
                      if (k) continue;
                      d = !0;
                      y.s = t && t.s != null ? t.s | 0 : t != null ? t | 0 : 100;
                      y.s < 0 ? y.s = 0 : y.s > 100 && (y.s = 100);
                      s != y.s && (s = y.s, w = !0);
                      break;
                    case "v":
                      if (k) continue;
                      d = !0;
                      y.v = t && t.v != null ? t.v | 0 : t != null ? t | 0 : 100;
                      y.v < 0 ? y.v = 0 : y.v > 100 && (y.v = 100);
                      h != y.v && (h = y.v, w = !0)
                  }
                  w && (k ? (u = u || 0, e = e || 0, o = o || 0, p = r.rgbToHsv({
                    r: u,
                    g: e,
                    b: o
                  }), c = p.h, s = p.s, h = p.v) : d && (c = c || 0, s = s != null ? s : 100, h = h != null ? h : 100, p = r.hsvToRgb({
                    h: c,
                    s: s,
                    v: h
                  }), u = p.r, e = p.g, o = p.b), f = f != null ? f : 255, v.call(i, a || i))
              }
            }
          },
          y = function (t) {
            n.isFunction(t) && a.push(t)
          },
          p = function (t) {
            if (n.isFunction(t))
              for (var i;
                (i = n.inArray(t, a)) != -1;) a.splice(i, 1)
          },
          w = function () {
            a = null
          };
        n.extend(!0, i, {
          val: l,
          bind: y,
          unbind: p,
          destroy: w
        });
        t && (t.ahex != null ? l("ahex", t) : t.hex != null ? l((t.a != null ? "a" : "") + "hex", t.a != null ? {
          ahex: t.hex + r.intToHex(t.a)
        } : t) : t.r != null && t.g != null && t.b != null ? l("rgb" + (t.a != null ? "a" : ""), t) : t.h != null && t.s != null && t.v != null && l("hsv" + (t.a != null ? "a" : ""), t))
      },
      ColorMethods: {
        hexToRgba: function (n) {
          if (n = this.validateHex(n), n == "") return {
            r: null,
            g: null,
            b: null,
            a: null
          };
          var t = "00",
            i = "00",
            r = "00",
            u = "255";
          return n.length == 6 && (n += "ff"), n.length > 6 ? (t = n.substring(0, 2), i = n.substring(2, 4), r = n.substring(4, 6), u = n.substring(6, n.length)) : (n.length > 4 && (t = n.substring(4, n.length), n = n.substring(0, 4)), n.length > 2 && (i = n.substring(2, n.length), n = n.substring(0, 2)), n.length > 0 && (r = n.substring(0, n.length))), {
            r: this.hexToInt(t),
            g: this.hexToInt(i),
            b: this.hexToInt(r),
            a: this.hexToInt(u)
          }
        },
        validateHex: function (n) {
          return n = n.toLowerCase().replace(/[^a-f0-9]/g, ""), n.length > 8 && (n = n.substring(0, 8)), n
        },
        rgbaToHex: function (n) {
          return this.intToHex(n.r) + this.intToHex(n.g) + this.intToHex(n.b) + this.intToHex(n.a)
        },
        intToHex: function (n) {
          var t = (n | 0).toString(16);
          return t.length == 1 && (t = "0" + t), t.toLowerCase()
        },
        hexToInt: function (n) {
          return parseInt(n, 16)
        },
        rgbToHsv: function (n) {
          var i = n.r / 255,
            r = n.g / 255,
            f = n.b / 255,
            t = {
              h: 0,
              s: 0,
              v: 0
            },
            e = 0,
            u = 0,
            o;
          return i >= r && i >= f ? (u = i, e = r > f ? f : r) : r >= f && r >= i ? (u = r, e = i > f ? f : i) : (u = f, e = r > i ? i : r), t.v = u, t.s = u ? (u - e) / u : 0, t.s ? (o = u - e, t.h = i == u ? (r - f) / o : r == u ? 2 + (f - i) / o : 4 + (i - r) / o, t.h = parseInt(t.h * 60), t.h < 0 && (t.h += 360)) : t.h = 0, t.s = t.s * 100 | 0, t.v = t.v * 100 | 0, t
        },
        hsvToRgb: function (n) {
          var t = {
              r: 0,
              g: 0,
              b: 0,
              a: 100
            },
            f = n.h,
            r = n.s,
            i = n.v;
          if (r == 0) t.r = i == 0 ? t.g = t.b = 0 : t.g = t.b = i * 255 / 100 | 0;
          else {
            f == 360 && (f = 0);
            f /= 60;
            r = r / 100;
            i = i / 100;
            var s = f | 0,
              h = f - s,
              u = i * (1 - r),
              e = i * (1 - r * h),
              o = i * (1 - r * (1 - h));
            switch (s) {
              case 0:
                t.r = i;
                t.g = o;
                t.b = u;
                break;
              case 1:
                t.r = e;
                t.g = i;
                t.b = u;
                break;
              case 2:
                t.r = u;
                t.g = i;
                t.b = o;
                break;
              case 3:
                t.r = u;
                t.g = e;
                t.b = i;
                break;
              case 4:
                t.r = o;
                t.g = u;
                t.b = i;
                break;
              case 5:
                t.r = i;
                t.g = u;
                t.b = e
            }
            t.r = t.r * 255 | 0;
            t.g = t.g * 255 | 0;
            t.b = t.b * 255 | 0
          }
          return t
        }
      }
    };
    var t = n.jPicker.Color,
      u = n.jPicker.List,
      r = n.jPicker.ColorMethods;
    n.fn.jPicker = function (o) {
      var s = arguments;
      return this.each(function () {
        var h = this,
          c = n.extend(!0, {}, n.fn.jPicker.defaults, o);
        n(h).get(0).nodeName.toLowerCase() == "input" && (n.extend(!0, c, {
          window: {
            bindToInput: !0,
            expandable: !0,
            input: n(h)
          }
        }), n(h).val() == "" ? (c.color.active = new t({
          hex: null
        }), c.color.current = new t({
          hex: null
        })) : r.validateHex(n(h).val()) && (c.color.active = new t({
          hex: n(h).val(),
          a: c.color.active.val("a")
        }), c.color.current = new t({
          hex: n(h).val(),
          a: c.color.active.val("a")
        })));
        c.window.expandable ? n(h).after('<span class="jPicker"><span class="Icon"><span class="Color">&nbsp;<\/span><span class="Alpha">&nbsp;<\/span><span class="Image" title="Click To Open Color Picker">&nbsp;<\/span><span class="Container">&nbsp;<\/span><\/span><\/span>') : c.window.liveUpdate = !1;
        var gt = parseFloat(navigator.appVersion.split("MSIE")[1]) < 7 && document.body.filters,
          a = null,
          ft = null,
          et = null,
          tt = null,
          g = null,
          at = null,
          ut = null,
          nt = null,
          ot = null,
          st = null,
          ht = null,
          d = null,
          y = null,
          v = null,
          ni = null,
          ri = null,
          ui = null,
          fi = null,
          ei = null,
          vt = null,
          ct = null,
          yt = null,
          pt = null,
          lt = null,
          oi = null,
          wt = null,
          si = null,
          hi = null,
          ci = function (n) {
            var t = b.active,
              f = p.clientPath,
              u = t.val("hex"),
              r, i;
            c.color.mode = n;
            switch (n) {
              case "h":
                if (setTimeout(function () {
                    it.call(h, ft, "transparent");
                    w.call(h, tt, 0);
                    l.call(h, tt, 100);
                    w.call(h, g, 260);
                    l.call(h, g, 100);
                    it.call(h, et, "transparent");
                    w.call(h, ut, 0);
                    l.call(h, ut, 100);
                    w.call(h, nt, 260);
                    l.call(h, nt, 100);
                    w.call(h, ot, 260);
                    l.call(h, ot, 100);
                    w.call(h, st, 260);
                    l.call(h, st, 100);
                    w.call(h, d, 260);
                    l.call(h, d, 100)
                  }, 0), y.range("all", {
                    minX: 0,
                    maxX: 100,
                    minY: 0,
                    maxY: 100
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 360
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("s"),
                  y: 100 - t.val("v")
                }, y);
                v.val("y", 360 - t.val("h"), v);
                break;
              case "s":
                if (setTimeout(function () {
                    it.call(h, ft, "transparent");
                    w.call(h, tt, -260);
                    w.call(h, g, -520);
                    w.call(h, ut, -260);
                    w.call(h, nt, -520);
                    w.call(h, d, 260);
                    l.call(h, d, 100)
                  }, 0), y.range("all", {
                    minX: 0,
                    maxX: 360,
                    minY: 0,
                    maxY: 100
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 100
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("h"),
                  y: 100 - t.val("v")
                }, y);
                v.val("y", 100 - t.val("s"), v);
                break;
              case "v":
                if (setTimeout(function () {
                    it.call(h, ft, "000000");
                    w.call(h, tt, -780);
                    w.call(h, g, 260);
                    it.call(h, et, u);
                    w.call(h, ut, -520);
                    w.call(h, nt, 260);
                    l.call(h, nt, 100);
                    w.call(h, d, 260);
                    l.call(h, d, 100)
                  }, 0), y.range("all", {
                    minX: 0,
                    maxX: 360,
                    minY: 0,
                    maxY: 100
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 100
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("h"),
                  y: 100 - t.val("s")
                }, y);
                v.val("y", 100 - t.val("v"), v);
                break;
              case "r":
                if (r = -1040, i = -780, y.range("all", {
                    minX: 0,
                    maxX: 255,
                    minY: 0,
                    maxY: 255
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 255
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("b"),
                  y: 255 - t.val("g")
                }, y);
                v.val("y", 255 - t.val("r"), v);
                break;
              case "g":
                if (r = -1560, i = -1820, y.range("all", {
                    minX: 0,
                    maxX: 255,
                    minY: 0,
                    maxY: 255
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 255
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("b"),
                  y: 255 - t.val("r")
                }, y);
                v.val("y", 255 - t.val("g"), v);
                break;
              case "b":
                if (r = -2080, i = -2860, y.range("all", {
                    minX: 0,
                    maxX: 255,
                    minY: 0,
                    maxY: 255
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 255
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("r"),
                  y: 255 - t.val("g")
                }, y);
                v.val("y", 255 - t.val("b"), v);
                break;
              case "a":
                if (setTimeout(function () {
                    it.call(h, ft, "transparent");
                    w.call(h, tt, -260);
                    w.call(h, g, -520);
                    w.call(h, ut, 260);
                    w.call(h, nt, 260);
                    l.call(h, nt, 100);
                    w.call(h, d, 0);
                    l.call(h, d, 100)
                  }, 0), y.range("all", {
                    minX: 0,
                    maxX: 360,
                    minY: 0,
                    maxY: 100
                  }), v.range("rangeY", {
                    minY: 0,
                    maxY: 255
                  }), t.val("ahex") == null) break;
                y.val("xy", {
                  x: t.val("h"),
                  y: 100 - t.val("v")
                }, y);
                v.val("y", 255 - t.val("a"), v);
                break;
              default:
                throw "Invalid Mode";
            }
            switch (n) {
              case "s":
              case "v":
              case "a":
                setTimeout(function () {
                  l.call(h, tt, 100);
                  l.call(h, ut, 100);
                  w.call(h, ot, 260);
                  l.call(h, ot, 100);
                  w.call(h, st, 260);
                  l.call(h, st, 100)
                }, 0);
                break;
              case "r":
              case "g":
              case "b":
                setTimeout(function () {
                  it.call(h, ft, "transparent");
                  it.call(h, et, "transparent");
                  l.call(h, ut, 100);
                  l.call(h, tt, 100);
                  w.call(h, tt, r);
                  w.call(h, g, r - 260);
                  w.call(h, ut, i - 780);
                  w.call(h, nt, i - 520);
                  w.call(h, ot, i);
                  w.call(h, st, i - 260);
                  w.call(h, d, 260);
                  l.call(h, d, 100)
                }, 0)
            }
            t.val("ahex") != null && li.call(h, t)
          },
          li = function (n, t) {
            (t == null || t != v && t != y) && rr.call(h, n, t);
            setTimeout(function () {
              ur.call(h, n);
              fr.call(h, n);
              er.call(h, n)
            }, 0)
          },
          tr = function (n, t) {
            var r = b.active,
              i;
            if (t == y || r.val() != null) {
              i = n.val("all");
              switch (c.color.mode) {
                case "h":
                  r.val("sv", {
                    s: i.x,
                    v: 100 - i.y
                  }, t);
                  break;
                case "s":
                case "a":
                  r.val("hv", {
                    h: i.x,
                    v: 100 - i.y
                  }, t);
                  break;
                case "v":
                  r.val("hs", {
                    h: i.x,
                    s: 100 - i.y
                  }, t);
                  break;
                case "r":
                  r.val("gb", {
                    g: 255 - i.y,
                    b: i.x
                  }, t);
                  break;
                case "g":
                  r.val("rb", {
                    r: 255 - i.y,
                    b: i.x
                  }, t);
                  break;
                case "b":
                  r.val("rg", {
                    r: i.x,
                    g: 255 - i.y
                  }, t)
              }
            }
          },
          ir = function (n, t) {
            var i = b.active;
            if (t == v || i.val() != null) switch (c.color.mode) {
              case "h":
                i.val("h", {
                  h: 360 - n.val("y")
                }, t);
                break;
              case "s":
                i.val("s", {
                  s: 100 - n.val("y")
                }, t);
                break;
              case "v":
                i.val("v", {
                  v: 100 - n.val("y")
                }, t);
                break;
              case "r":
                i.val("r", {
                  r: 255 - n.val("y")
                }, t);
                break;
              case "g":
                i.val("g", {
                  g: 255 - n.val("y")
                }, t);
                break;
              case "b":
                i.val("b", {
                  b: 255 - n.val("y")
                }, t);
                break;
              case "a":
                i.val("a", 255 - n.val("y"), t)
            }
          },
          rr = function (n, t) {
            var i, r, u, f, e, o, s, h, l;
            if (t != y) switch (c.color.mode) {
              case "h":
                i = n.val("sv");
                y.val("xy", {
                  x: i != null ? i.s : 100,
                  y: 100 - (i != null ? i.v : 100)
                }, t);
                break;
              case "s":
              case "a":
                r = n.val("hv");
                y.val("xy", {
                  x: r && r.h || 0,
                  y: 100 - (r != null ? r.v : 100)
                }, t);
                break;
              case "v":
                u = n.val("hs");
                y.val("xy", {
                  x: u && u.h || 0,
                  y: 100 - (u != null ? u.s : 100)
                }, t);
                break;
              case "r":
                f = n.val("bg");
                y.val("xy", {
                  x: f && f.b || 0,
                  y: 255 - (f && f.g || 0)
                }, t);
                break;
              case "g":
                e = n.val("br");
                y.val("xy", {
                  x: e && e.b || 0,
                  y: 255 - (e && e.r || 0)
                }, t);
                break;
              case "b":
                o = n.val("rg");
                y.val("xy", {
                  x: o && o.r || 0,
                  y: 255 - (o && o.g || 0)
                }, t)
            }
            if (t != v) switch (c.color.mode) {
              case "h":
                v.val("y", 360 - (n.val("h") || 0), t);
                break;
              case "s":
                s = n.val("s");
                v.val("y", 100 - (s != null ? s : 100), t);
                break;
              case "v":
                h = n.val("v");
                v.val("y", 100 - (h != null ? h : 100), t);
                break;
              case "r":
                v.val("y", 255 - (n.val("r") || 0), t);
                break;
              case "g":
                v.val("y", 255 - (n.val("g") || 0), t);
                break;
              case "b":
                v.val("y", 255 - (n.val("b") || 0), t);
                break;
              case "a":
                l = n.val("a");
                v.val("y", 255 - (l != null ? l : 255), t)
            }
          },
          ur = function (n) {
            try {
              var t = n.val("all");
              vt.css({
                backgroundColor: t && "#" + t.hex || "transparent"
              });
              l.call(h, vt, t && Math.precision(t.a * 100 / 255, 4) || 0)
            } catch (i) {}
          },
          fr = function (n) {
            var i, r, u;
            switch (c.color.mode) {
              case "h":
                it.call(h, ft, new t({
                  h: n.val("h") || 0,
                  s: 100,
                  v: 100
                }).val("hex"));
                break;
              case "s":
              case "a":
                i = n.val("s");
                l.call(h, g, 100 - (i != null ? i : 100));
                break;
              case "v":
                r = n.val("v");
                l.call(h, tt, r != null ? r : 100);
                break;
              case "r":
                l.call(h, g, Math.precision((n.val("r") || 0) / 255 * 100, 4));
                break;
              case "g":
                l.call(h, g, Math.precision((n.val("g") || 0) / 255 * 100, 4));
                break;
              case "b":
                l.call(h, g, Math.precision((n.val("b") || 0) / 255 * 100))
            }
            u = n.val("a");
            l.call(h, at, Math.precision((255 - (u || 0)) * 100 / 255, 4))
          },
          er = function (n) {
            var f, s, e, a, v, o;
            switch (c.color.mode) {
              case "h":
                o = n.val("a");
                l.call(h, ht, Math.precision((255 - (o || 0)) * 100 / 255, 4));
                break;
              case "s":
                f = n.val("hva");
                s = new t({
                  h: f && f.h || 0,
                  s: 100,
                  v: f != null ? f.v : 100
                });
                it.call(h, et, s.val("hex"));
                l.call(h, nt, 100 - (f != null ? f.v : 100));
                l.call(h, ht, Math.precision((255 - (f && f.a || 0)) * 100 / 255, 4));
                break;
              case "v":
                e = n.val("hsa");
                a = new t({
                  h: e && e.h || 0,
                  s: e != null ? e.s : 100,
                  v: 100
                });
                it.call(h, et, a.val("hex"));
                l.call(h, ht, Math.precision((255 - (e && e.a || 0)) * 100 / 255, 4));
                break;
              case "r":
              case "g":
              case "b":
                var r = 0,
                  u = 0,
                  i = n.val("rgba");
                c.color.mode == "r" ? (r = i && i.b || 0, u = i && i.g || 0) : c.color.mode == "g" ? (r = i && i.b || 0, u = i && i.r || 0) : c.color.mode == "b" && (r = i && i.r || 0, u = i && i.g || 0);
                v = u > r ? r : u;
                l.call(h, nt, r > u ? Math.precision((r - u) / (255 - u) * 100, 4) : 0);
                l.call(h, ot, u > r ? Math.precision((u - r) / (255 - r) * 100, 4) : 0);
                l.call(h, st, Math.precision(v / 255 * 100, 4));
                l.call(h, ht, Math.precision((255 - (i && i.a || 0)) * 100 / 255, 4));
                break;
              case "a":
                o = n.val("a");
                it.call(h, et, n.val("hex") || "000000");
                l.call(h, ht, o != null ? 0 : 100);
                l.call(h, d, o != null ? 100 : 0)
            }
          },
          it = function (n, t) {
            n.css({
              backgroundColor: t && t.length == 6 && "#" + t || "transparent"
            })
          },
          rt = function (n, t) {
            gt && (t.indexOf("AlphaBar.png") != -1 || t.indexOf("Bars.png") != -1 || t.indexOf("Maps.png") != -1) ? (n.attr("pngSrc", t), n.css({
              backgroundImage: "none",
              filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t + "', sizingMethod='scale')"
            })) : n.css({
              backgroundImage: "url(" + t + ")"
            })
          },
          w = function (n, t) {
            n.css({
              top: t + "px"
            })
          },
          l = function (n, t) {
            var i;
            n.css({
              visibility: t > 0 ? "visible" : "hidden"
            });
            t > 0 && t < 100 ? gt ? (i = n.attr("pngSrc"), i != null && (i.indexOf("AlphaBar.png") != -1 || i.indexOf("Bars.png") != -1 || i.indexOf("Maps.png") != -1) ? n.css({
              filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + i + "', sizingMethod='scale') progid:DXImageTransform.Microsoft.Alpha(opacity=" + t + ")"
            }) : n.css({
              opacity: Math.precision(t / 100, 4)
            })) : n.css({
              opacity: Math.precision(t / 100, 4)
            }) : (t == 0 || t == 100) && (gt ? (i = n.attr("pngSrc"), i != null && (i.indexOf("AlphaBar.png") != -1 || i.indexOf("Bars.png") != -1 || i.indexOf("Maps.png") != -1) ? n.css({
              filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + i + "', sizingMethod='scale')"
            }) : n.css({
              opacity: ""
            })) : n.css({
              opacity: ""
            }))
          },
          ai = function () {
            b.active.val("ahex", b.current.val("ahex"))
          },
          or = function () {
            b.current.val("ahex", b.active.val("ahex"))
          },
          vi = function (t) {
            n(this).parents("tbody:first").find('input:radio[value!="' + t.target.value + '"]').removeAttr("checked");
            ci.call(h, t.target.value)
          },
          yi = function () {
            ai.call(h)
          },
          pi = function () {
            ai.call(h);
            c.window.expandable && ii.call(h);
            n.isFunction(dt) && dt.call(h, b.active, pt)
          },
          wi = function () {
            or.call(h);
            c.window.expandable && ii.call(h);
            n.isFunction(bt) && bt.call(h, b.active, yt)
          },
          bi = function () {
            ti.call(h)
          },
          sr = function (n) {
            var t = n.val("hex");
            ct.css({
              backgroundColor: t && "#" + t || "transparent"
            });
            l.call(h, ct, Math.precision((n.val("a") || 0) * 100 / 255, 4))
          },
          hr = function (n) {
            var t = n.val("hex"),
              i = n.val("va");
            oi.css({
              backgroundColor: t && "#" + t || "transparent"
            });
            l.call(h, wt, Math.precision((255 - (i && i.a || 0)) * 100 / 255, 4));
            c.window.bindToInput && c.window.updateInputColor && c.window.input.css({
              backgroundColor: t && "#" + t || "transparent",
              color: i == null || i.v > 75 ? "#000000" : "#ffffff"
            })
          },
          ki = function (t) {
            var i = c.window.element,
              r = c.window.page;
            ri = parseInt(a.css("left"));
            ui = parseInt(a.css("top"));
            fi = t.pageX;
            ei = t.pageY;
            n(document).bind("mousemove", di).bind("mouseup", gi);
            t.preventDefault()
          },
          di = function (t) {
            return a.css({
              left: ri - (fi - t.pageX) + "px",
              top: ui - (ei - t.pageY) + "px"
            }), c.window.expandable && !n.support.boxModel && a.prev().css({
              left: a.css("left"),
              top: a.css("top")
            }), t.stopPropagation(), t.preventDefault(), !1
          },
          gi = function (t) {
            return n(document).unbind("mousemove", di).unbind("mouseup", gi), t.stopPropagation(), t.preventDefault(), !1
          },
          nr = function (t) {
            return t.preventDefault(), t.stopPropagation(), b.active.val("ahex", n(this).attr("title") || null, t.target), !1
          },
          bt = n.isFunction(s[1]) && s[1] || null,
          kt = n.isFunction(s[2]) && s[2] || null,
          dt = n.isFunction(s[3]) && s[3] || null,
          ti = function () {
            b.current.val("ahex", b.active.val("ahex"));
            var t = function () {
              if (c.window.expandable && !n.support.boxModel) {
                var t = a.find("table:first");
                a.before("<iframe/>");
                a.prev().css({
                  width: t.width(),
                  height: a.height(),
                  opacity: 0,
                  position: "absolute",
                  left: a.css("left"),
                  top: a.css("top")
                })
              }
            };
            c.window.expandable && (n(document.body).children("div.jPicker.Container").css({
              zIndex: 10
            }), a.css({
              zIndex: 20
            }));
            switch (c.window.effects.type) {
              case "fade":
                a.fadeIn(c.window.effects.speed.show, t);
                break;
              case "slide":
                a.slideDown(c.window.effects.speed.show, t);
                break;
              case "show":
              default:
                a.show(c.window.effects.speed.show, t)
            }
          },
          ii = function () {
            var t = function () {
              (c.window.expandable && a.css({
                zIndex: 10
              }), c.window.expandable && !n.support.boxModel) && a.prev().remove()
            };
            switch (c.window.effects.type) {
              case "fade":
                a.fadeOut(c.window.effects.speed.hide, t);
                break;
              case "slide":
                a.slideUp(c.window.effects.speed.hide, t);
                break;
              case "show":
              default:
                a.hide(c.window.effects.speed.hide, t)
            }
          },
          cr = function () {
            var r = c.window,
              o = r.expandable ? n(h).next().find(".Container:first") : null,
              u, ri, s, gt, it, ei, dt, bt, ii;
            a = r.expandable ? n("<div/>") : n(h);
            a.addClass("jPicker Container");
            r.expandable && a.hide();
            a.get(0).onselectstart = function () {
              return !1
            };
            u = b.active.val("all");
            r.alphaPrecision < 0 ? r.alphaPrecision = 0 : r.alphaPrecision > 2 && (r.alphaPrecision = 2);
            ri = '<table class="jPicker" cellpadding="0" cellspacing="0"><tbody>' + (r.expandable ? '<tr><td class="Move" colspan="5">&nbsp;<\/td><\/tr>' : "") + '<tr><td rowspan="9"><h2 class="Title">' + (r.title || k.text.title) + '<\/h2><div class="Map"><span class="Map1">&nbsp;<\/span><span class="Map2">&nbsp;<\/span><span class="Map3">&nbsp;<\/span><img src="' + p.clientPath + p.colorMap.arrow.file + '" class="Arrow"/><\/div><\/td><td rowspan="9"><div class="Bar"><span class="Map1">&nbsp;<\/span><span class="Map2">&nbsp;<\/span><span class="Map3">&nbsp;<\/span><span class="Map4">&nbsp;<\/span><span class="Map5">&nbsp;<\/span><span class="Map6">&nbsp;<\/span><img src="' + p.clientPath + p.colorBar.arrow.file + '" class="Arrow"/><\/div><\/td><td colspan="2" class="Preview">' + k.text.newColor + '<div><span class="Active" title="' + k.tooltips.colors.newColor + '">&nbsp;<\/span><span class="Current" title="' + k.tooltips.colors.currentColor + '">&nbsp;<\/span><\/div>' + k.text.currentColor + '<\/td><td rowspan="9" class="Button"><input type="button" class="Ok" value="' + k.text.ok + '" title="' + k.tooltips.buttons.ok + '"/><input type="button" class="Cancel" value="' + k.text.cancel + '" title="' + k.tooltips.buttons.cancel + '"/><hr/><div class="Grid">&nbsp;<\/div><\/td><\/tr><tr class="Hue"><td class="Radio"><label title="' + k.tooltips.hue.radio + '"><input type="radio" value="h"' + (c.color.mode == "h" ? ' checked="checked"' : "") + '/>H:<\/label><\/td><td class="Text"><input type="text" maxlength="3" value="' + (u != null ? u.h : "") + '" title="' + k.tooltips.hue.textbox + '"/>&nbsp;&deg;<\/td><\/tr><tr class="Saturation"><td class="Radio"><label title="' + k.tooltips.saturation.radio + '"><input type="radio" value="s"' + (c.color.mode == "s" ? ' checked="checked"' : "") + '/>S:<\/label><\/td><td class="Text"><input type="text" maxlength="3" value="' + (u != null ? u.s : "") + '" title="' + k.tooltips.saturation.textbox + '"/>&nbsp;%<\/td><\/tr><tr class="Value"><td class="Radio"><label title="' + k.tooltips.value.radio + '"><input type="radio" value="v"' + (c.color.mode == "v" ? ' checked="checked"' : "") + '/>V:<\/label><br/><br/><\/td><td class="Text"><input type="text" maxlength="3" value="' + (u != null ? u.v : "") + '" title="' + k.tooltips.value.textbox + '"/>&nbsp;%<br/><br/><\/td><\/tr><tr class="Red"><td class="Radio"><label title="' + k.tooltips.red.radio + '"><input type="radio" value="r"' + (c.color.mode == "r" ? ' checked="checked"' : "") + '/>R:<\/label><\/td><td class="Text"><input type="text" maxlength="3" value="' + (u != null ? u.r : "") + '" title="' + k.tooltips.red.textbox + '"/><\/td><\/tr><tr class="Green"><td class="Radio"><label title="' + k.tooltips.green.radio + '"><input type="radio" value="g"' + (c.color.mode == "g" ? ' checked="checked"' : "") + '/>G:<\/label><\/td><td class="Text"><input type="text" maxlength="3" value="' + (u != null ? u.g : "") + '" title="' + k.tooltips.green.textbox + '"/><\/td><\/tr><tr class="Blue"><td class="Radio"><label title="' + k.tooltips.blue.radio + '"><input type="radio" value="b"' + (c.color.mode == "b" ? ' checked="checked"' : "") + '/>B:<\/label><\/td><td class="Text"><input type="text" maxlength="3" value="' + (u != null ? u.b : "") + '" title="' + k.tooltips.blue.textbox + '"/><\/td><\/tr><tr class="Alpha"><td class="Radio">' + (r.alphaSupport ? '<label title="' + k.tooltips.alpha.radio + '"><input type="radio" value="a"' + (c.color.mode == "a" ? ' checked="checked"' : "") + "/>A:<\/label>" : "&nbsp;") + '<\/td><td class="Text">' + (r.alphaSupport ? '<input type="text" maxlength="' + (3 + r.alphaPrecision) + '" value="' + (u != null ? Math.precision(u.a * 100 / 255, r.alphaPrecision) : "") + '" title="' + k.tooltips.alpha.textbox + '"/>&nbsp;%' : "&nbsp;") + '<\/td><\/tr><tr class="Hex"><td colspan="2" class="Text"><label title="' + k.tooltips.hex.textbox + '">#:<input type="text" maxlength="6" class="Hex" value="' + (u != null ? u.hex : "") + '"/><\/label>' + (r.alphaSupport ? '<input type="text" maxlength="2" class="AHex" value="' + (u != null ? u.ahex.substring(6) : "") + '" title="' + k.tooltips.hex.alpha + '"/><\/td>' : "&nbsp;") + "<\/tr><\/tbody><\/table>";
            r.expandable ? (a.html(ri), n(document.body).children("div.jPicker.Container").length == 0 ? n(document.body).prepend(a) : n(document.body).children("div.jPicker.Container:last").after(a), a.mousedown(function () {
              n(document.body).children("div.jPicker.Container").css({
                zIndex: 10
              });
              a.css({
                zIndex: 20
              })
            }), a.css({
              left: r.position.x == "left" ? o.offset().left - 530 - (r.position.y == "center" ? 25 : 0) + "px" : r.position.x == "center" ? o.offset().left - 260 + "px" : r.position.x == "right" ? o.offset().left - 10 + (r.position.y == "center" ? 25 : 0) + "px" : r.position.x == "screenCenter" ? (n(document).width() >> 1) - 260 + "px" : o.offset().left + parseInt(r.position.x) + "px",
              position: "absolute",
              top: r.position.y == "top" ? o.offset().top - 312 + "px" : r.position.y == "center" ? o.offset().top - 156 + "px" : r.position.y == "bottom" ? o.offset().top + 25 + "px" : o.offset().top + parseInt(r.position.y) + "px"
            })) : (a = n(h), a.html(ri));
            s = a.find("tbody:first");
            ft = s.find("div.Map:first");
            et = s.find("div.Bar:first");
            gt = ft.find("span");
            it = et.find("span");
            tt = gt.filter(".Map1:first");
            g = gt.filter(".Map2:first");
            at = gt.filter(".Map3:first");
            ut = it.filter(".Map1:first");
            nt = it.filter(".Map2:first");
            ot = it.filter(".Map3:first");
            st = it.filter(".Map4:first");
            ht = it.filter(".Map5:first");
            d = it.filter(".Map6:first");
            y = new f(ft, {
              map: {
                width: p.colorMap.width,
                height: p.colorMap.height
              },
              arrow: {
                image: p.clientPath + p.colorMap.arrow.file,
                width: p.colorMap.arrow.width,
                height: p.colorMap.arrow.height
              }
            });
            y.bind(tr);
            v = new f(et, {
              map: {
                width: p.colorBar.width,
                height: p.colorBar.height
              },
              arrow: {
                image: p.clientPath + p.colorBar.arrow.file,
                width: p.colorBar.arrow.width,
                height: p.colorBar.arrow.height
              }
            });
            v.bind(ir);
            ni = new e(s, b.active, r.expandable && r.bindToInput ? r.input : null, r.alphaPrecision);
            var w = u != null ? u.hex : null,
              ui = s.find(".Preview"),
              fi = s.find(".Button");
            if (vt = ui.find(".Active:first").css({
                backgroundColor: w && "#" + w || "transparent"
              }), ct = ui.find(".Current:first").css({
                backgroundColor: w && "#" + w || "transparent"
              }).bind("click", yi), l.call(h, ct, Math.precision(b.current.val("a") * 100) / 255, 4), yt = fi.find(".Ok:first").bind("click", wi), pt = fi.find(".Cancel:first").bind("click", pi), lt = fi.find(".Grid:first"), setTimeout(function () {
                rt.call(h, tt, p.clientPath + "Maps.png");
                rt.call(h, g, p.clientPath + "Maps.png");
                rt.call(h, at, p.clientPath + "map-opacity.png");
                rt.call(h, ut, p.clientPath + "Bars.png");
                rt.call(h, nt, p.clientPath + "Bars.png");
                rt.call(h, ot, p.clientPath + "Bars.png");
                rt.call(h, st, p.clientPath + "Bars.png");
                rt.call(h, ht, p.clientPath + "bar-opacity.png");
                rt.call(h, d, p.clientPath + "AlphaBar.png");
                rt.call(h, ui.find("div:first"), p.clientPath + "preview-opacity.png")
              }, 0), s.find("td.Radio input").bind("click", vi), b.quickList && b.quickList.length > 0) {
              for (ei = "", i = 0; i < b.quickList.length; i++)(typeof b.quickList[i]).toString().toLowerCase() == "string" && (b.quickList[i] = new t({
                hex: b.quickList[i]
              })), dt = b.quickList[i].val("a"), bt = b.quickList[i].val("ahex"), !r.alphaSupport && bt && (bt = bt.substring(0, 6) + "ff"), ii = b.quickList[i].val("hex"), ei += '<span class="QuickColor"' + (bt && ' title="#' + bt + '"' || "") + ' style="background-color:' + (ii && "#" + ii || "") + ";" + (ii ? "" : "background-image:url(" + p.clientPath + "NoColor.png)") + (r.alphaSupport && dt && dt < 255 ? ";opacity:" + Math.precision(dt / 255, 4) + ";filter:Alpha(opacity=" + Math.precision(dt / 2.55, 4) + ")" : "") + '">&nbsp;<\/span>';
              rt.call(h, lt, p.clientPath + "bar-opacity.png");
              lt.html(ei);
              lt.find(".QuickColor").click(nr)
            }
            ci.call(h, c.color.mode);
            b.active.bind(li);
            n.isFunction(kt) && b.active.bind(kt);
            b.current.bind(sr);
            r.expandable ? (h.icon = o.parents(".Icon:first"), oi = h.icon.find(".Color:first").css({
              backgroundColor: w && "#" + w || "transparent"
            }), wt = h.icon.find(".Alpha:first"), rt.call(h, wt, p.clientPath + "bar-opacity.png"), l.call(h, wt, Math.precision((255 - (u != null ? u.a : 0)) * 100 / 255, 4)), si = h.icon.find(".Image:first").css({
              backgroundImage: "url(" + p.clientPath + p.picker.file + ")"
            }).bind("click", bi), r.bindToInput && r.updateInputColor && r.input.css({
              backgroundColor: w && "#" + w || "transparent",
              color: u == null || u.v > 75 ? "#000000" : "#ffffff"
            }), hi = s.find(".Move:first").bind("mousedown", ki), b.active.bind(hr)) : ti.call(h)
          },
          lr = function () {
            for (a.find("td.Radio input").unbind("click", vi), ct.unbind("click", yi), pt.unbind("click", pi), yt.unbind("click", wi), c.window.expandable && (si.unbind("click", bi), hi.unbind("mousedown", ki), h.icon = null), a.find(".QuickColor").unbind("click", nr), ft = null, et = null, tt = null, g = null, at = null, ut = null, nt = null, ot = null, st = null, ht = null, d = null, y.destroy(), y = null, v.destroy(), v = null, ni.destroy(), ni = null, vt = null, ct = null, yt = null, pt = null, lt = null, bt = null, dt = null, kt = null, a.html(""), i = 0; i < u.length; i++) u[i] == h && u.splice(i, 1)
          },
          p = c.images,
          k = c.localization,
          b = {
            active: (typeof c.color.active).toString().toLowerCase() == "string" ? new t({
              ahex: !c.window.alphaSupport && c.color.active ? c.color.active.substring(0, 6) + "ff" : c.color.active
            }) : new t({
              ahex: !c.window.alphaSupport && c.color.active.val("ahex") ? c.color.active.val("ahex").substring(0, 6) + "ff" : c.color.active.val("ahex")
            }),
            current: (typeof c.color.active).toString().toLowerCase() == "string" ? new t({
              ahex: !c.window.alphaSupport && c.color.active ? c.color.active.substring(0, 6) + "ff" : c.color.active
            }) : new t({
              ahex: !c.window.alphaSupport && c.color.active.val("ahex") ? c.color.active.val("ahex").substring(0, 6) + "ff" : c.color.active.val("ahex")
            }),
            quickList: c.color.quickList
          };
        n.extend(!0, h, {
          commitCallback: bt,
          liveCallback: kt,
          cancelCallback: dt,
          color: b,
          show: ti,
          hide: ii,
          destroy: lr
        });
        u.push(h);
        setTimeout(function () {
          cr.call(h)
        }, 0)
      })
    };
    n.fn.jPicker.defaults = {
      window: {
        title: null,
        effects: {
          type: "slide",
          speed: {
            show: "slow",
            hide: "fast"
          }
        },
        position: {
          x: "screenCenter",
          y: "top"
        },
        expandable: !1,
        liveUpdate: !0,
        alphaSupport: !1,
        alphaPrecision: 0,
        updateInputColor: !0
      },
      color: {
        mode: "h",
        active: new t({
          ahex: "#ffcc00ff"
        }),
        quickList: [new t({
          h: 360,
          s: 33,
          v: 100
        }), new t({
          h: 360,
          s: 66,
          v: 100
        }), new t({
          h: 360,
          s: 100,
          v: 100
        }), new t({
          h: 360,
          s: 100,
          v: 75
        }), new t({
          h: 360,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 100
        }), new t({
          h: 30,
          s: 33,
          v: 100
        }), new t({
          h: 30,
          s: 66,
          v: 100
        }), new t({
          h: 30,
          s: 100,
          v: 100
        }), new t({
          h: 30,
          s: 100,
          v: 75
        }), new t({
          h: 30,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 90
        }), new t({
          h: 60,
          s: 33,
          v: 100
        }), new t({
          h: 60,
          s: 66,
          v: 100
        }), new t({
          h: 60,
          s: 100,
          v: 100
        }), new t({
          h: 60,
          s: 100,
          v: 75
        }), new t({
          h: 60,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 80
        }), new t({
          h: 90,
          s: 33,
          v: 100
        }), new t({
          h: 90,
          s: 66,
          v: 100
        }), new t({
          h: 90,
          s: 100,
          v: 100
        }), new t({
          h: 90,
          s: 100,
          v: 75
        }), new t({
          h: 90,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 70
        }), new t({
          h: 120,
          s: 33,
          v: 100
        }), new t({
          h: 120,
          s: 66,
          v: 100
        }), new t({
          h: 120,
          s: 100,
          v: 100
        }), new t({
          h: 120,
          s: 100,
          v: 75
        }), new t({
          h: 120,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 60
        }), new t({
          h: 150,
          s: 33,
          v: 100
        }), new t({
          h: 150,
          s: 66,
          v: 100
        }), new t({
          h: 150,
          s: 100,
          v: 100
        }), new t({
          h: 150,
          s: 100,
          v: 75
        }), new t({
          h: 150,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 50
        }), new t({
          h: 180,
          s: 33,
          v: 100
        }), new t({
          h: 180,
          s: 66,
          v: 100
        }), new t({
          h: 180,
          s: 100,
          v: 100
        }), new t({
          h: 180,
          s: 100,
          v: 75
        }), new t({
          h: 180,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 40
        }), new t({
          h: 210,
          s: 33,
          v: 100
        }), new t({
          h: 210,
          s: 66,
          v: 100
        }), new t({
          h: 210,
          s: 100,
          v: 100
        }), new t({
          h: 210,
          s: 100,
          v: 75
        }), new t({
          h: 210,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 30
        }), new t({
          h: 240,
          s: 33,
          v: 100
        }), new t({
          h: 240,
          s: 66,
          v: 100
        }), new t({
          h: 240,
          s: 100,
          v: 100
        }), new t({
          h: 240,
          s: 100,
          v: 75
        }), new t({
          h: 240,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 20
        }), new t({
          h: 270,
          s: 33,
          v: 100
        }), new t({
          h: 270,
          s: 66,
          v: 100
        }), new t({
          h: 270,
          s: 100,
          v: 100
        }), new t({
          h: 270,
          s: 100,
          v: 75
        }), new t({
          h: 270,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 10
        }), new t({
          h: 300,
          s: 33,
          v: 100
        }), new t({
          h: 300,
          s: 66,
          v: 100
        }), new t({
          h: 300,
          s: 100,
          v: 100
        }), new t({
          h: 300,
          s: 100,
          v: 75
        }), new t({
          h: 300,
          s: 100,
          v: 50
        }), new t({
          h: 180,
          s: 0,
          v: 0
        }), new t({
          h: 330,
          s: 33,
          v: 100
        }), new t({
          h: 330,
          s: 66,
          v: 100
        }), new t({
          h: 330,
          s: 100,
          v: 100
        }), new t({
          h: 330,
          s: 100,
          v: 75
        }), new t({
          h: 330,
          s: 100,
          v: 50
        }), new t]
      },
      images: {
        clientPath: "/jPicker/images/",
        colorMap: {
          width: 256,
          height: 256,
          arrow: {
            file: "mappoint.gif",
            width: 15,
            height: 15
          }
        },
        colorBar: {
          width: 20,
          height: 256,
          arrow: {
            file: "rangearrows.gif",
            width: 20,
            height: 7
          }
        },
        picker: {
          file: "picker.gif",
          width: 25,
          height: 24
        }
      },
      localization: {
        text: {
          title: "Drag Markers To Pick A Color",
          newColor: "new",
          currentColor: "current",
          ok: "OK",
          cancel: "Cancel"
        },
        tooltips: {
          colors: {
            newColor: "New Color - Press &ldquo;OK&rdquo; To Commit",
            currentColor: "Click To Revert To Original Color"
          },
          buttons: {
            ok: "Commit To This Color Selection",
            cancel: "Cancel And Revert To Original Color"
          },
          hue: {
            radio: "Set To &ldquo;Hue&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Hue&rdquo; Value (0-360&deg;)"
          },
          saturation: {
            radio: "Set To &ldquo;Saturation&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Saturation&rdquo; Value (0-100%)"
          },
          value: {
            radio: "Set To &ldquo;Value&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Value&rdquo; Value (0-100%)"
          },
          red: {
            radio: "Set To &ldquo;Red&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Red&rdquo; Value (0-255)"
          },
          green: {
            radio: "Set To &ldquo;Green&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Green&rdquo; Value (0-255)"
          },
          blue: {
            radio: "Set To &ldquo;Blue&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Blue&rdquo; Value (0-255)"
          },
          alpha: {
            radio: "Set To &ldquo;Alpha&rdquo; Color Mode",
            textbox: "Enter A &ldquo;Alpha&rdquo; Value (0-100)"
          },
          hex: {
            textbox: "Enter A &ldquo;Hex&rdquo; Color Value (#000000-#ffffff)",
            alpha: "Enter A &ldquo;Alpha&rdquo; Value (#00-#ff)"
          }
        }
      }
    }
  }(jQuery, "1.1.5"),
  function (n) {
    var t = {},
      i;
    n.svgIcons = function (r, u) {
      function h(t, i) {
        var r, e;
        if (t !== "ajax") {
          if (b) return;
          if (f = o[0].contentDocument, r = f && f.getElementById("svg_eof"), !r && !(i && r)) {
            nt++;
            nt < 50 ? setTimeout(h, 20) : (s(), b = !0);
            return
          }
          b = !0
        }
        y = n(f.firstChild).children();
        u.no_img ? setTimeout(function () {
          w || l()
        }, 500) : (e = it + "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNzUiIGhlaWdodD0iMjc1Ij48L3N2Zz4%3D", p = n(new Image).attr({
          src: e,
          width: 0,
          height: 0
        }).appendTo("body").load(function () {
          l(!0)
        }).error(function () {
          l()
        }))
      }

      function l(r, f) {
        var ft, l, et, ot, b, tt, k, h, s, st, ht, ct, at, lt, nt;
        if (!w) {
          if (u.no_img && (r = !1), r && (l = n(document.createElement("div")), l.hide().appendTo("body")), f) et = u.fallback_path ? u.fallback_path : "", n.each(f, function (t, i) {
            ft = n("#" + t);
            var r = n(new Image).attr({
              "class": "svg_icon",
              src: et + i,
              width: a,
              height: v,
              alt: "icon"
            });
            g(r, t)
          });
          else
            for (ot = y.length, b = 0; b < ot; b++) {
              if (tt = y[b], k = tt.id, k === "svg_eof") break;
              ft = n("#" + k);
              h = tt.getElementsByTagNameNS(c, "svg")[0];
              s = document.createElementNS(c, "svg");
              s.setAttributeNS(c, "viewBox", [0, 0, a, v].join(" "));
              st = h.getAttribute("width");
              ht = h.getAttribute("height");
              h.removeAttribute("width");
              h.removeAttribute("height");
              ct = h.getAttribute("viewBox");
              ct || h.setAttribute("viewBox", [0, 0, st, ht].join(" "));
              s.setAttribute("xmlns", c);
              s.setAttribute("width", a);
              s.setAttribute("height", v);
              s.setAttribute("xmlns:xlink", rt);
              s.setAttribute("class", "svg_icon");
              e || (h = h.cloneNode(!0));
              s.appendChild(h);
              r ? (at = e ? s : s.cloneNode(!0), l.empty().append(s), lt = it + ut(l.html()), nt = n(new Image).attr({
                "class": "svg_icon",
                src: lt
              })) : nt = i(n(s), b);
              g(nt, k)
            }
          u.placement && n.each(u.placement, function (u, f) {
            t[f] && n(u).each(function (u) {
              var e = t[f].clone();
              u > 0 && !r && (e = i(e, u, !0));
              d(n(this), e, f)
            })
          });
          f || (r && l.remove(), o && o.remove(), p && p.remove());
          u.resize && n.resizeSvgIcons(u.resize);
          w = !0;
          u.callback && u.callback(t)
        }
      }

      function s() {
        if (r.indexOf(".svgz") != -1) {
          var t = r.replace(".svgz", ".svg");
          window.console && console.log(".svgz failed, trying with .svg");
          n.svgIcons(t, u)
        } else u.fallback && l(!1, u.fallback)
      }

      function ut(n) {
        if (window.btoa) return window.btoa(n);
        var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          t = new Array(Math.floor((n.length + 2) / 3) * 4),
          s, r, u, c, l, h, f, e = 0,
          o = 0;
        do s = n.charCodeAt(e++), r = n.charCodeAt(e++), u = n.charCodeAt(e++), c = s >> 2, l = (s & 3) << 4 | r >> 4, h = (r & 15) << 2 | u >> 6, f = u & 63, isNaN(r) ? h = f = 64 : isNaN(u) && (f = 64), t[o++] = i.charAt(c), t[o++] = i.charAt(l), t[o++] = i.charAt(h), t[o++] = i.charAt(f); while (e < n.length);
        return t.join("")
      }
      var c = "http://www.w3.org/2000/svg",
        rt = "http://www.w3.org/1999/xlink",
        a = u.w ? u.w : 24,
        v = u.h ? u.h : 24,
        y, f, p, w = !1,
        b = !1,
        nt = 0,
        tt = navigator.userAgent,
        e = !!window.opera,
        ft = tt.indexOf("Safari/") > -1 && tt.indexOf("Chrome/") == -1,
        it = "data:image/svg+xml;charset=utf-8;base64,",
        o, k, d, g;
      if (u.svgz) {
        o = n('<object data="' + r + '" type=image/svg+xml>').appendTo("body").hide();
        try {
          f = o[0].contentDocument;
          o.load(h);
          h(0, !0)
        } catch (et) {
          s()
        }
      } else k = new DOMParser, n.ajax({
        url: r,
        dataType: "string",
        success: function (t) {
          if (!t) {
            n(s);
            return
          }
          f = k.parseFromString(t, "text/xml");
          n(function () {
            h("ajax")
          })
        },
        error: function (t) {
          window.opera ? n(function () {
            s()
          }) : t.responseText ? (f = k.parseFromString(t.responseText, "text/xml"), f.childNodes.length || n(s), n(function () {
            h("ajax")
          })) : n(s)
        }
      });
      d = function (n, t, i, r) {
        if (e && t.css("visibility", "hidden"), u.replace) {
          r && t.attr("id", i);
          var f = n.attr("class");
          f && t.attr("class", "svg_icon " + f);
          n.replaceWith(t)
        } else n.append(t);
        e && setTimeout(function () {
          t.removeAttr("style")
        }, 1)
      };
      g = function (n, i) {
        (u.id_match === undefined || u.id_match !== !1) && d(holder, n, i, !0);
        t[i] = n
      };
      i = function (t, i) {
        var r = t.find("defs"),
          u, o, s;
        return r.length ? (u = e ? r.find("*").filter(function () {
          return !!this.id
        }) : r.find("[id]"), o = t[0].getElementsByTagName("*"), s = o.length, u.each(function (t) {
          var c = this.id,
            a = n(f).find("#" + c).length <= 1,
            l, u, h, t, r;
          for (e && (a = !1), l = "x" + c + i + t, this.id = l, u = "url(#" + c + ")", h = "url(#" + l + ")", t = 0; t < s; t++) r = o[t], r.getAttribute("fill") === u && r.setAttribute("fill", h), r.getAttribute("stroke") === u && r.setAttribute("stroke", h), r.getAttribute("filter") === u && r.setAttribute("filter", h)
        }), t) : t
      }
    };
    n.getSvgIcon = function (n, r) {
      var u = t[n];
      return r && u && (u = i(u, 0, !0).clone(!0)), u
    };
    n.resizeSvgIcons = function (t) {
      var i = !n(".svg_icon:first").length;
      n.each(t, function (t, r) {
        var u = n.isArray(r),
          f = u ? r[0] : r,
          e = u ? r[1] : r;
        i && (t = t.replace(/\.svg_icon/g, "svg"));
        n(t).each(function () {
          this.setAttribute("width", f);
          this.setAttribute("height", e);
          window.opera && window.widget && (this.parentNode.style.width = f + "px", this.parentNode.style.height = e + "px")
        })
      })
    }
  }(jQuery),
  function (n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports == "object" && typeof module == "object" ? module.exports = n(require("jquery")) : n(jQuery)
  }(function (n, t) {
    "use strict";

    function s(t, i, r, u) {
      for (var s = [], o, f, h, c, a, v, e = 0; e < t.length; e++) o = t[e], o ? (f = tinycolor(o), h = f.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light", h += tinycolor.equals(i, o) ? " sp-thumb-active" : "", c = f.toString(u.preferredFormat || "rgb"), a = l ? "background-color:" + f.toRgbString() : "filter:" + f.toFilter(), s.push('<span title="' + c + '" data-color="' + f.toRgbString() + '" class="' + h + '"><span class="sp-thumb-inner" style="' + a + ';" /><\/span>')) : (v = "sp-clear-display", s.push(n("<div />").append(n('<span data-color="" style="background-color:transparent;" class="' + v + '"><\/span>').attr("title", u.noColorSelectedText)).html()));
      return "<div class='sp-cf " + r + "'>" + s.join("") + "<\/div>"
    }

    function y() {
      for (var n = 0; n < i.length; n++) i[n] && i[n].hide()
    }

    function p(t, i) {
      var r = n.extend({}, c, t);
      return r.callbacks = {
        move: f(r.move, i),
        change: f(r.change, i),
        show: f(r.show, i),
        hide: f(r.hide, i),
        beforeShow: f(r.beforeShow, i)
      }, r
    }

    function w(u, f) {
      function fr() {
        var t, i, r;
        if (h.showPaletteOnly && (h.showPalette = !0), rr.text(h.showPaletteOnly ? h.togglePaletteMoreText : h.togglePaletteLessText), h.palette)
          for (ai = h.palette.slice(0), ei = n.isArray(ai[0]) ? ai : [ai], vi = {}, t = 0; t < ei.length; t++)
            for (i = 0; i < ei[t].length; i++) r = tinycolor(ei[t][i]).toRgbString(), vi[r] = !0;
        c.toggleClass("sp-flat", ut);
        c.toggleClass("sp-input-disabled", !h.showInput);
        c.toggleClass("sp-alpha-enabled", h.showAlpha);
        c.toggleClass("sp-clear-enabled", ht);
        c.toggleClass("sp-buttons-disabled", !h.showButtons);
        c.toggleClass("sp-palette-buttons-disabled", !h.togglePaletteOnly);
        c.toggleClass("sp-palette-disabled", !h.showPalette);
        c.toggleClass("sp-palette-only", h.showPaletteOnly);
        c.toggleClass("sp-initial-disabled", !h.showInitial);
        c.addClass(h.className).addClass(h.containerClassName);
        at()
      }

      function pu() {
        function u(t) {
          return t.data && t.data.ignore ? (ct(n(t.target).closest(".sp-thumb-el").data("color")), ni()) : (ct(n(t.target).closest(".sp-thumb-el").data("color")), ni(), lt(!0), h.hideAfterPaletteSelect && ot()), !1
        }
        var t, i;
        r && c.find("*:not(input)").attr("unselectable", "on");
        fr();
        ur && w.after(bt).hide();
        ht || ir.hide();
        ut ? w.after(c).hide() : (t = h.appendTo === "parent" ? w.parent() : n(h.appendTo), t.length !== 1 && (t = n("body")), t.append(c));
        nu();
        si.bind("click.spectrum touchstart.spectrum", function (t) {
          nr || ru();
          t.stopPropagation();
          n(t.target).is("input") || t.preventDefault()
        });
        (w.is(":disabled") || h.disabled === !0) && su();
        c.click(k);
        it.change(hr);
        it.bind("paste", function () {
          setTimeout(hr, 1)
        });
        it.keydown(function (n) {
          n.keyCode == 13 && hr()
        });
        dr.text(h.cancelText);
        dr.bind("click.spectrum", function (n) {
          n.stopPropagation();
          n.preventDefault();
          eu();
          ot()
        });
        ir.attr("title", h.clearText);
        ir.bind("click.spectrum", function (n) {
          n.stopPropagation();
          n.preventDefault();
          et = !0;
          ni();
          ut && lt(!0)
        });
        gr.text(h.chooseText);
        gr.bind("click.spectrum", function (n) {
          n.stopPropagation();
          n.preventDefault();
          r && it.is(":focus") && it.trigger("change");
          bu() && (lt(!0), ot())
        });
        rr.text(h.showPaletteOnly ? h.togglePaletteMoreText : h.togglePaletteLessText);
        rr.bind("click.spectrum", function (n) {
          n.stopPropagation();
          n.preventDefault();
          h.showPaletteOnly = !h.showPaletteOnly;
          h.showPaletteOnly || ut || c.css("left", "-=" + (au.outerWidth(!0) + 5));
          fr()
        });
        o(wr, function (n, t, i) {
          nt = n / gi;
          et = !1;
          i.shiftKey && (nt = Math.round(nt * 10) / 10);
          ni()
        }, or, sr);
        o(tr, function (n, t) {
          ri = parseFloat(t / li);
          et = !1;
          h.showAlpha || (nt = 1);
          ni()
        }, or, sr);
        o(yi, function (n, t, i) {
          var r, u;
          if (i.shiftKey) {
            if (!ft) {
              var f = ui * pt,
                e = rt - fi * rt,
                o = Math.abs(n - f) > Math.abs(t - e);
              ft = o ? "x" : "y"
            }
          } else ft = null;
          r = !ft || ft === "x";
          u = !ft || ft === "y";
          r && (ui = parseFloat(n / pt));
          u && (fi = parseFloat((rt - t) / rt));
          et = !1;
          h.showAlpha || (nt = 1);
          ni()
        }, or, sr);
        hi ? (ct(hi), ti(), gt = h.preferredFormat || tinycolor(hi).format, er(hi)) : ti();
        ut && cr();
        i = r ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
        br.delegate(".sp-thumb-el", i, u);
        kr.delegate(".sp-thumb-el:nth-child(1)", i, {
          ignore: !0
        }, u)
      }

      function nu() {
        if (vt && window.localStorage) {
          try {
            var t = window.localStorage[vt].split(",#");
            t.length > 1 && (delete window.localStorage[vt], n.each(t, function (n, t) {
              er(t)
            }))
          } catch (i) {}
          try {
            tt = window.localStorage[vt].split(";")
          } catch (i) {}
        }
      }

      function er(t) {
        if (hu) {
          var i = tinycolor(t).toRgbString();
          if (!vi[i] && n.inArray(i, tt) === -1)
            for (tt.push(i); tt.length > lu;) tt.shift();
          if (vt && window.localStorage) try {
            window.localStorage[vt] = tt.join(";")
          } catch (r) {}
        }
      }

      function wu() {
        var t = [],
          n, i;
        if (h.showPalette)
          for (n = 0; n < tt.length; n++) i = tinycolor(tt[n]).toRgbString(), vi[i] || t.push(tt[n]);
        return t.reverse().slice(0, h.maxSelectionSize)
      }

      function tu() {
        var t = g(),
          i = n.map(ei, function (n, i) {
            return s(n, t, "sp-palette-row sp-palette-row-" + i, h)
          });
        nu();
        tt && i.push(s(wu(), t, "sp-palette-row sp-palette-row-selection", h));
        br.html(i.join(""))
      }

      function iu() {
        if (h.showInitial) {
          var t = dt,
            n = g();
          kr.html(s([t, n], n, "sp-palette-row-initial", h))
        }
      }

      function or() {
        (rt <= 0 || pt <= 0 || li <= 0) && at();
        di = !0;
        c.addClass(pr);
        ft = null;
        w.trigger("dragstart.spectrum", [g()])
      }

      function sr() {
        di = !1;
        c.removeClass(pr);
        w.trigger("dragstop.spectrum", [g()])
      }

      function hr() {
        var n = it.val(),
          t;
        (n === null || n === "") && ht ? (ct(null), lt(!0)) : (t = tinycolor(n), t.isValid() ? (ct(t), lt(!0)) : it.addClass("sp-validation-error"))
      }

      function ru() {
        yt ? ot() : cr()
      }

      function cr() {
        var t = n.Event("beforeShow.spectrum");
        if (yt) {
          at();
          return
        }(w.trigger(t, [g()]), ii.beforeShow(g()) === !1 || t.isDefaultPrevented()) || (y(), yt = !0, n(wt).bind("keydown.spectrum", uu), n(wt).bind("click.spectrum", fu), n(window).bind("resize.spectrum", ar), bt.addClass("sp-active"), c.removeClass("sp-hidden"), at(), ti(), dt = g(), iu(), ii.show(dt), w.trigger("show.spectrum", [dt]))
      }

      function uu(n) {
        n.keyCode === 27 && ot()
      }

      function fu(n) {
        n.button != 2 && (di || (yu ? lt(!0) : eu(), ot()))
      }

      function ot() {
        yt && !ut && (yt = !1, n(wt).unbind("keydown.spectrum", uu), n(wt).unbind("click.spectrum", fu), n(window).unbind("resize.spectrum", ar), bt.removeClass("sp-active"), c.addClass("sp-hidden"), ii.hide(g()), w.trigger("hide.spectrum", [g()]))
      }

      function eu() {
        ct(dt, !0)
      }

      function ct(n, t) {
        if (tinycolor.equals(n, g())) {
          ti();
          return
        }
        var i, r;
        !n && ht ? et = !0 : (et = !1, i = tinycolor(n), r = i.toHsv(), ri = r.h % 360 / 360, ui = r.s, fi = r.v, nt = r.a);
        ti();
        i && i.isValid() && !t && (gt = h.preferredFormat || i.getFormat())
      }

      function g(n) {
        return (n = n || {}, ht && et) ? null : tinycolor.fromRatio({
          h: ri,
          s: ui,
          v: fi,
          a: Math.round(nt * 100) / 100
        }, {
          format: n.format || gt
        })
      }

      function bu() {
        return !it.hasClass("sp-validation-error")
      }

      function ni() {
        ti();
        ii.move(g());
        w.trigger("move.spectrum", [g()])
      }

      function ti() {
        var s, n, t, e, i, c, o, u, f;
        it.removeClass("sp-validation-error");
        ou();
        s = tinycolor.fromRatio({
          h: ri,
          s: 1,
          v: 1
        });
        yi.css("background-color", s.toHexString());
        n = gt;
        nt < 1 && !(nt === 0 && n === "name") && (n === "hex" || n === "hex3" || n === "hex6" || n === "name") && (n = "rgb");
        t = g({
          format: n
        });
        e = "";
        kt.removeClass("sp-clear-display");
        kt.css("background-color", "transparent");
        !t && ht ? kt.addClass("sp-clear-display") : (i = t.toHexString(), c = t.toRgbString(), l || t.alpha === 1 ? kt.css("background-color", c) : (kt.css("background-color", "transparent"), kt.css("filter", t.toFilter())), h.showAlpha && (o = t.toRgb(), o.a = 0, u = tinycolor(o).toRgbString(), f = "linear-gradient(left, " + u + ", " + i + ")", r ? oi.css("filter", tinycolor(u).toFilter({
          gradientType: 1
        }, i)) : (oi.css("background", "-webkit-" + f), oi.css("background", "-moz-" + f), oi.css("background", "-ms-" + f), oi.css("background", "linear-gradient(to right, " + u + ", " + i + ")"))), e = t.toString(n));
        h.showInput && it.val(e);
        h.showPalette && tu();
        iu()
      }

      function ou() {
        var u = ui,
          f = fi,
          n, t, i, r;
        ht && et ? (bi.hide(), wi.hide(), pi.hide()) : (bi.show(), wi.show(), pi.show(), n = u * pt, t = rt - f * rt, n = Math.max(-st, Math.min(pt - st, n - st)), t = Math.max(-st, Math.min(rt - st, t - st)), pi.css({
          top: t + "px",
          left: n + "px"
        }), i = nt * gi, bi.css({
          left: i - vr / 2 + "px"
        }), r = ri * li, wi.css({
          top: r - yr + "px"
        }))
      }

      function lt(n) {
        var t = g(),
          i = "",
          r = !tinycolor.equals(t, dt);
        t && (i = t.toString(gt), er(t));
        ki && w.val(i);
        n && r && (ii.change(t), w.trigger("change", [t]))
      }

      function at() {
        yt && (pt = yi.width(), rt = yi.height(), st = pi.height(), cu = tr.width(), li = tr.height(), yr = wi.height(), gi = wr.width(), vr = bi.width(), ut || (c.css("position", "absolute"), h.offset ? c.offset(h.offset) : c.offset(b(c, si))), ou(), h.showPalette && tu(), w.trigger("reflow.spectrum"))
      }

      function ku() {
        w.show();
        si.unbind("click.spectrum touchstart.spectrum");
        c.remove();
        bt.remove();
        i[ci.id] = null
      }

      function du(i, r) {
        if (i === t) return n.extend({}, h);
        if (r === t) return h[i];
        h[i] = r;
        i === "preferredFormat" && (gt = h.preferredFormat);
        fr()
      }

      function gu() {
        nr = !1;
        w.attr("disabled", !1);
        si.removeClass("sp-disabled")
      }

      function su() {
        ot();
        nr = !0;
        w.attr("disabled", !0);
        si.addClass("sp-disabled")
      }

      function nf(n) {
        h.offset = n;
        at()
      }
      var h = p(f, u),
        ut = h.flat,
        hu = h.showSelectionPalette,
        vt = h.localStorageKey,
        lr = h.theme,
        ii = h.callbacks,
        ar = d(at, 10),
        yt = !1,
        di = !1,
        pt = 0,
        rt = 0,
        st = 0,
        li = 0,
        cu = 0,
        gi = 0,
        vr = 0,
        yr = 0,
        ri = 0,
        ui = 0,
        fi = 0,
        nt = 1,
        ai = [],
        ei = [],
        vi = {},
        tt = h.selectionPalette.slice(0),
        lu = h.maxSelectionSize,
        pr = "sp-dragging",
        ft = null,
        wt = u.ownerDocument,
        tf = wt.body,
        w = n(u),
        nr = !1,
        c = n(v, wt).addClass(lr),
        au = c.find(".sp-picker-container"),
        yi = c.find(".sp-color"),
        pi = c.find(".sp-dragger"),
        tr = c.find(".sp-hue"),
        wi = c.find(".sp-slider"),
        oi = c.find(".sp-alpha-inner"),
        wr = c.find(".sp-alpha"),
        bi = c.find(".sp-alpha-handle"),
        it = c.find(".sp-input"),
        br = c.find(".sp-palette"),
        kr = c.find(".sp-initial"),
        dr = c.find(".sp-cancel"),
        ir = c.find(".sp-clear"),
        gr = c.find(".sp-choose"),
        rr = c.find(".sp-palette-toggle"),
        ki = w.is("input"),
        vu = ki && w.attr("type") === "color" && e(),
        ur = ki && !ut,
        bt = ur ? n(a).addClass(lr).addClass(h.className).addClass(h.replacerClassName) : n([]),
        si = ur ? bt : w,
        kt = bt.find(".sp-preview-inner"),
        hi = h.color || ki && w.val(),
        dt = !1,
        gt = h.preferredFormat,
        yu = !h.showButtons || h.clickoutFiresChange,
        et = !hi,
        ht = h.allowEmpty && !vu,
        ci;
      return pu(), ci = {
        show: cr,
        hide: ot,
        toggle: ru,
        reflow: at,
        option: du,
        enable: gu,
        disable: su,
        offset: nf,
        set: function (n) {
          ct(n);
          lt()
        },
        get: g,
        destroy: ku,
        container: c
      }, ci.id = i.push(ci) - 1, ci
    }

    function b(t, i) {
      var s = 0,
        u = t.outerWidth(),
        f = t.outerHeight(),
        h = i.outerHeight(),
        e = t[0].ownerDocument,
        c = e.documentElement,
        o = c.clientWidth + n(e).scrollLeft(),
        l = c.clientHeight + n(e).scrollTop(),
        r = i.offset();
      return r.top += h, r.left -= Math.min(r.left, r.left + u > o && o > u ? Math.abs(r.left + u - o) : 0), r.top -= Math.min(r.top, r.top + f > l && l > f ? Math.abs(f + h - s) : s), r
    }

    function u() {}

    function k(n) {
      n.stopPropagation()
    }

    function f(n, t) {
      var i = Array.prototype.slice,
        r = i.call(arguments, 2);
      return function () {
        return n.apply(t, r.concat(i.call(arguments)))
      }
    }

    function o(t, i, u, f) {
      function h(n) {
        n.stopPropagation && n.stopPropagation();
        n.preventDefault && n.preventDefault();
        n.returnValue = !1
      }

      function v(n) {
        if (s) {
          if (r && o.documentMode < 9 && !n.button) return y();
          var u = n.originalEvent && n.originalEvent.touches && n.originalEvent.touches[0],
            f = u && u.pageX || n.pageX,
            e = u && u.pageY || n.pageY,
            v = Math.max(0, Math.min(f - c.left, a)),
            w = Math.max(0, Math.min(e - c.top, l));
          p && h(n);
          i.apply(t, [v, w, n])
        }
      }

      function w(i) {
        var r = i.which ? i.which == 3 : i.button == 2;
        r || s || u.apply(t, arguments) !== !1 && (s = !0, l = n(t).height(), a = n(t).width(), c = n(t).offset(), n(o).bind(e), n(o.body).addClass("sp-dragging"), v(i), h(i))
      }

      function y() {
        s && (n(o).unbind(e), n(o.body).removeClass("sp-dragging"), setTimeout(function () {
          f.apply(t, arguments)
        }, 0));
        s = !1
      }
      i = i || function () {};
      u = u || function () {};
      f = f || function () {};
      var o = document,
        s = !1,
        c = {},
        l = 0,
        a = 0,
        p = "ontouchstart" in window,
        e = {};
      e.selectstart = h;
      e.dragstart = h;
      e["touchmove mousemove"] = v;
      e["touchend mouseup"] = y;
      n(t).bind("touchstart mousedown", w)
    }

    function d(n, t, i) {
      var r;
      return function () {
        var u = this,
          f = arguments,
          e = function () {
            r = null;
            n.apply(u, f)
          };
        i && clearTimeout(r);
        (i || !r) && (r = setTimeout(e, t))
      }
    }

    function e() {
      return n.fn.spectrum.inputTypeColorSupport()
    }
    var c = {
        beforeShow: u,
        move: u,
        change: u,
        show: u,
        hide: u,
        color: !1,
        flat: !1,
        showInput: !1,
        allowEmpty: !1,
        showButtons: !0,
        clickoutFiresChange: !0,
        showInitial: !1,
        showPalette: !1,
        showPaletteOnly: !1,
        hideAfterPaletteSelect: !1,
        togglePaletteOnly: !1,
        showSelectionPalette: !0,
        localStorageKey: !1,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: !1,
        className: "",
        containerClassName: "",
        replacerClassName: "",
        showAlpha: !1,
        theme: "sp-light",
        palette: [
          ["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]
        ],
        selectionPalette: [],
        disabled: !1,
        offset: null
      },
      i = [],
      r = !!/msie/i.exec(window.navigator.userAgent),
      l = function () {
        function t(n, t) {
          return !!~("" + n).indexOf(t)
        }
        var i = document.createElement("div"),
          n = i.style;
        return n.cssText = "background-color:rgba(0,0,0,.5)", t(n.backgroundColor, "rgba") || t(n.backgroundColor, "hsla")
      }(),
      a = "<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'><\/div><\/div><div class='sp-dd'>&#9660;<\/div><\/div>",
      v = function () {
        var t = "",
          n;
        if (r)
          for (n = 1; n <= 6; n++) t += "<div class='sp-" + n + "'><\/div>";
        return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'><\/div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'><\/button>", "<\/div>", "<\/div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'><\/div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'><\/div>", "<\/div>", "<\/div>", "<\/div>", "<div class='sp-clear sp-clear-display'>", "<\/div>", "<div class='sp-hue'>", "<div class='sp-slider'><\/div>", t, "<\/div>", "<\/div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'><\/div><\/div><\/div>", "<\/div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "<\/div>", "<div class='sp-initial sp-thumb sp-cf'><\/div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'><\/a>", "<button type='button' class='sp-choose'><\/button>", "<\/div>", "<\/div>", "<\/div>"].join("")
      }(),
      h = "spectrum.id";
    n.fn.spectrum = function (t) {
      if (typeof t == "string") {
        var r = this,
          u = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
          var f = i[n(this).data(h)],
            e;
          if (f) {
            if (e = f[t], !e) throw new Error("Spectrum: no such method: '" + t + "'");
            t == "get" ? r = f.get() : t == "container" ? r = f.container : t == "option" ? r = f.option.apply(f, u) : t == "destroy" ? (f.destroy(), n(this).removeData(h)) : e.apply(f, u)
          }
        }), r
      }
      return this.spectrum("destroy").each(function () {
        var i = n.extend({}, t, n(this).data()),
          r = w(this, i);
        n(this).data(h, r.id)
      })
    };
    n.fn.spectrum.load = !0;
    n.fn.spectrum.loadOpts = {};
    n.fn.spectrum.draggable = o;
    n.fn.spectrum.defaults = c;
    n.fn.spectrum.inputTypeColorSupport = function e() {
      if (typeof e._cachedResult == "undefined") {
        var t = n("<input type='color'/>")[0];
        e._cachedResult = t.type === "color" && t.value !== ""
      }
      return e._cachedResult
    };
    n.spectrum = {};
    n.spectrum.localization = {};
    n.spectrum.palettes = {};
    n.fn.spectrum.processNativeColorInputs = function () {
        var t = n("input[type=color]");
        t.length && !e() && t.spectrum({
          preferredFormat: "hex6"
        })
      },
      function () {
        function tt(n) {
          var t = {
              r: 0,
              g: 0,
              b: 0
            },
            i = 1,
            f = !1,
            e = !1;
          return typeof n == "string" && (n = ii(n)), typeof n == "object" && (n.hasOwnProperty("r") && n.hasOwnProperty("g") && n.hasOwnProperty("b") ? (t = it(n.r, n.g, n.b), f = !0, e = String(n.r).substr(-1) === "%" ? "prgb" : "rgb") : n.hasOwnProperty("h") && n.hasOwnProperty("s") && n.hasOwnProperty("v") ? (n.s = h(n.s), n.v = h(n.v), t = ut(n.h, n.s, n.v), f = !0, e = "hsv") : n.hasOwnProperty("h") && n.hasOwnProperty("s") && n.hasOwnProperty("l") && (n.s = h(n.s), n.l = h(n.l), t = rt(n.h, n.s, n.l), f = !0, e = "hsl"), n.hasOwnProperty("a") && (i = n.a)), i = k(i), {
            ok: f,
            format: n.format || e,
            r: r(255, u(t.r, 0)),
            g: r(255, u(t.g, 0)),
            b: r(255, u(t.b, 0)),
            a: i
          }
        }

        function it(n, t, r) {
          return {
            r: i(n, 255) * 255,
            g: i(t, 255) * 255,
            b: i(r, 255) * 255
          }
        }

        function v(n, t, f) {
          var s;
          n = i(n, 255);
          t = i(t, 255);
          f = i(f, 255);
          var e = u(n, t, f),
            h = r(n, t, f),
            o, c, l = (e + h) / 2;
          if (e == h) o = c = 0;
          else {
            s = e - h;
            c = l > .5 ? s / (2 - e - h) : s / (e + h);
            switch (e) {
              case n:
                o = (t - f) / s + (t < f ? 6 : 0);
                break;
              case t:
                o = (f - n) / s + 2;
                break;
              case f:
                o = (n - t) / s + 4
            }
            o /= 6
          }
          return {
            h: o,
            s: c,
            l: l
          }
        }

        function rt(n, t, r) {
          function h(n, t, i) {
            return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6) ? n + (t - n) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? n + (t - n) * (2 / 3 - i) * 6 : n
          }
          var e, o, s, u, f;
          return n = i(n, 360), t = i(t, 100), r = i(r, 100), t === 0 ? e = o = s = r : (u = r < .5 ? r * (1 + t) : r + t - r * t, f = 2 * r - u, e = h(f, u, n + 1 / 3), o = h(f, u, n), s = h(f, u, n - 1 / 3)), {
            r: e * 255,
            g: o * 255,
            b: s * 255
          }
        }

        function y(n, t, f) {
          n = i(n, 255);
          t = i(t, 255);
          f = i(f, 255);
          var e = u(n, t, f),
            h = r(n, t, f),
            o, c, l = e,
            s = e - h;
          if (c = e === 0 ? 0 : s / e, e == h) o = 0;
          else {
            switch (e) {
              case n:
                o = (t - f) / s + (t < f ? 6 : 0);
                break;
              case t:
                o = (f - n) / s + 2;
                break;
              case f:
                o = (n - t) / s + 4
            }
            o /= 6
          }
          return {
            h: o,
            s: c,
            v: l
          }
        }

        function ut(n, t, r) {
          n = i(n, 360) * 6;
          t = i(t, 100);
          r = i(r, 100);
          var h = s.floor(n),
            c = n - h,
            u = r * (1 - t),
            f = r * (1 - c * t),
            e = r * (1 - (1 - c) * t),
            o = h % 6,
            l = [r, f, u, u, e, r][o],
            a = [e, r, r, f, u, u][o],
            v = [u, u, e, r, r, f][o];
          return {
            r: l * 255,
            g: a * 255,
            b: v * 255
          }
        }

        function p(n, i, r, u) {
          var f = [o(t(n).toString(16)), o(t(i).toString(16)), o(t(r).toString(16))];
          return u && f[0].charAt(0) == f[0].charAt(1) && f[1].charAt(0) == f[1].charAt(1) && f[2].charAt(0) == f[2].charAt(1) ? f[0].charAt(0) + f[1].charAt(0) + f[2].charAt(0) : f.join("")
        }

        function w(n, i, r, u) {
          var f = [o(ni(u)), o(t(n).toString(16)), o(t(i).toString(16)), o(t(r).toString(16))];
          return f.join("")
        }

        function ft(t, i) {
          i = i === 0 ? 0 : i || 10;
          var r = n(t).toHsl();
          return r.s -= i / 100, r.s = l(r.s), n(r)
        }

        function et(t, i) {
          i = i === 0 ? 0 : i || 10;
          var r = n(t).toHsl();
          return r.s += i / 100, r.s = l(r.s), n(r)
        }

        function ot(t) {
          return n(t).desaturate(100)
        }

        function st(t, i) {
          i = i === 0 ? 0 : i || 10;
          var r = n(t).toHsl();
          return r.l += i / 100, r.l = l(r.l), n(r)
        }

        function ht(i, f) {
          f = f === 0 ? 0 : f || 10;
          var e = n(i).toRgb();
          return e.r = u(0, r(255, e.r - t(255 * -(f / 100)))), e.g = u(0, r(255, e.g - t(255 * -(f / 100)))), e.b = u(0, r(255, e.b - t(255 * -(f / 100)))), n(e)
        }

        function ct(t, i) {
          i = i === 0 ? 0 : i || 10;
          var r = n(t).toHsl();
          return r.l -= i / 100, r.l = l(r.l), n(r)
        }

        function lt(i, r) {
          var u = n(i).toHsl(),
            f = (t(u.h) + r) % 360;
          return u.h = f < 0 ? 360 + f : f, n(u)
        }

        function at(t) {
          var i = n(t).toHsl();
          return i.h = (i.h + 180) % 360, n(i)
        }

        function vt(t) {
          var i = n(t).toHsl(),
            r = i.h;
          return [n(t), n({
            h: (r + 120) % 360,
            s: i.s,
            l: i.l
          }), n({
            h: (r + 240) % 360,
            s: i.s,
            l: i.l
          })]
        }

        function yt(t) {
          var i = n(t).toHsl(),
            r = i.h;
          return [n(t), n({
            h: (r + 90) % 360,
            s: i.s,
            l: i.l
          }), n({
            h: (r + 180) % 360,
            s: i.s,
            l: i.l
          }), n({
            h: (r + 270) % 360,
            s: i.s,
            l: i.l
          })]
        }

        function pt(t) {
          var i = n(t).toHsl(),
            r = i.h;
          return [n(t), n({
            h: (r + 72) % 360,
            s: i.s,
            l: i.l
          }), n({
            h: (r + 216) % 360,
            s: i.s,
            l: i.l
          })]
        }

        function wt(t, i, r) {
          i = i || 6;
          r = r || 30;
          var u = n(t).toHsl(),
            f = 360 / r,
            e = [n(t)];
          for (u.h = (u.h - (f * i >> 1) + 720) % 360; --i;) u.h = (u.h + f) % 360, e.push(n(u));
          return e
        }

        function bt(t, i) {
          i = i || 6;
          for (var r = n(t).toHsv(), e = r.h, o = r.s, u = r.v, f = [], s = 1 / i; i--;) f.push(n({
            h: e,
            s: o,
            v: u
          })), u = (u + s) % 1;
          return f
        }

        function kt(n) {
          var i = {},
            t;
          for (t in n) n.hasOwnProperty(t) && (i[n[t]] = t);
          return i
        }

        function k(n) {
          return n = parseFloat(n), (isNaN(n) || n < 0 || n > 1) && (n = 1), n
        }

        function i(n, t) {
          dt(n) && (n = "100%");
          var i = gt(n);
          return (n = r(t, u(0, parseFloat(n))), i && (n = parseInt(n * t, 10) / 100), s.abs(n - t) < 1e-6) ? 1 : n % t / parseFloat(t)
        }

        function l(n) {
          return r(1, u(0, n))
        }

        function f(n) {
          return parseInt(n, 16)
        }

        function dt(n) {
          return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1
        }

        function gt(n) {
          return typeof n == "string" && n.indexOf("%") != -1
        }

        function o(n) {
          return n.length == 1 ? "0" + n : "" + n
        }

        function h(n) {
          return n <= 1 && (n = n * 100 + "%"), n
        }

        function ni(n) {
          return Math.round(parseFloat(n) * 255).toString(16)
        }

        function ti(n) {
          return f(n) / 255
        }

        function ii(n) {
          var i, t;
          if (n = n.replace(d, "").replace(g, "").toLowerCase(), i = !1, c[n]) n = c[n], i = !0;
          else if (n == "transparent") return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
          };
          return (t = e.rgb.exec(n)) ? {
            r: t[1],
            g: t[2],
            b: t[3]
          } : (t = e.rgba.exec(n)) ? {
            r: t[1],
            g: t[2],
            b: t[3],
            a: t[4]
          } : (t = e.hsl.exec(n)) ? {
            h: t[1],
            s: t[2],
            l: t[3]
          } : (t = e.hsla.exec(n)) ? {
            h: t[1],
            s: t[2],
            l: t[3],
            a: t[4]
          } : (t = e.hsv.exec(n)) ? {
            h: t[1],
            s: t[2],
            v: t[3]
          } : (t = e.hsva.exec(n)) ? {
            h: t[1],
            s: t[2],
            v: t[3],
            a: t[4]
          } : (t = e.hex8.exec(n)) ? {
            a: ti(t[1]),
            r: f(t[2]),
            g: f(t[3]),
            b: f(t[4]),
            format: i ? "name" : "hex8"
          } : (t = e.hex6.exec(n)) ? {
            r: f(t[1]),
            g: f(t[2]),
            b: f(t[3]),
            format: i ? "name" : "hex"
          } : (t = e.hex3.exec(n)) ? {
            r: f(t[1] + "" + t[1]),
            g: f(t[2] + "" + t[2]),
            b: f(t[3] + "" + t[3]),
            format: i ? "name" : "hex"
          } : !1
        }
        var d = /^[\s,#]+/,
          g = /\s+$/,
          nt = 0,
          s = Math,
          t = s.round,
          r = s.min,
          u = s.max,
          a = s.random,
          n = function (i, r) {
            if (i = i ? i : "", r = r || {}, i instanceof n) return i;
            if (!(this instanceof n)) return new n(i, r);
            var u = tt(i);
            this._originalInput = i;
            this._r = u.r;
            this._g = u.g;
            this._b = u.b;
            this._a = u.a;
            this._roundA = t(100 * this._a) / 100;
            this._format = r.format || u.format;
            this._gradientType = r.gradientType;
            this._r < 1 && (this._r = t(this._r));
            this._g < 1 && (this._g = t(this._g));
            this._b < 1 && (this._b = t(this._b));
            this._ok = u.ok;
            this._tc_id = nt++
          },
          c, b, e;
        n.prototype = {
          isDark: function () {
            return this.getBrightness() < 128
          },
          isLight: function () {
            return !this.isDark()
          },
          isValid: function () {
            return this._ok
          },
          getOriginalInput: function () {
            return this._originalInput
          },
          getFormat: function () {
            return this._format
          },
          getAlpha: function () {
            return this._a
          },
          getBrightness: function () {
            var n = this.toRgb();
            return (n.r * 299 + n.g * 587 + n.b * 114) / 1e3
          },
          setAlpha: function (n) {
            return this._a = k(n), this._roundA = t(100 * this._a) / 100, this
          },
          toHsv: function () {
            var n = y(this._r, this._g, this._b);
            return {
              h: n.h * 360,
              s: n.s,
              v: n.v,
              a: this._a
            }
          },
          toHsvString: function () {
            var n = y(this._r, this._g, this._b),
              i = t(n.h * 360),
              r = t(n.s * 100),
              u = t(n.v * 100);
            return this._a == 1 ? "hsv(" + i + ", " + r + "%, " + u + "%)" : "hsva(" + i + ", " + r + "%, " + u + "%, " + this._roundA + ")"
          },
          toHsl: function () {
            var n = v(this._r, this._g, this._b);
            return {
              h: n.h * 360,
              s: n.s,
              l: n.l,
              a: this._a
            }
          },
          toHslString: function () {
            var n = v(this._r, this._g, this._b),
              i = t(n.h * 360),
              r = t(n.s * 100),
              u = t(n.l * 100);
            return this._a == 1 ? "hsl(" + i + ", " + r + "%, " + u + "%)" : "hsla(" + i + ", " + r + "%, " + u + "%, " + this._roundA + ")"
          },
          toHex: function (n) {
            return p(this._r, this._g, this._b, n)
          },
          toHexString: function (n) {
            return "#" + this.toHex(n)
          },
          toHex8: function () {
            return w(this._r, this._g, this._b, this._a)
          },
          toHex8String: function () {
            return "#" + this.toHex8()
          },
          toRgb: function () {
            return {
              r: t(this._r),
              g: t(this._g),
              b: t(this._b),
              a: this._a
            }
          },
          toRgbString: function () {
            return this._a == 1 ? "rgb(" + t(this._r) + ", " + t(this._g) + ", " + t(this._b) + ")" : "rgba(" + t(this._r) + ", " + t(this._g) + ", " + t(this._b) + ", " + this._roundA + ")"
          },
          toPercentageRgb: function () {
            return {
              r: t(i(this._r, 255) * 100) + "%",
              g: t(i(this._g, 255) * 100) + "%",
              b: t(i(this._b, 255) * 100) + "%",
              a: this._a
            }
          },
          toPercentageRgbString: function () {
            return this._a == 1 ? "rgb(" + t(i(this._r, 255) * 100) + "%, " + t(i(this._g, 255) * 100) + "%, " + t(i(this._b, 255) * 100) + "%)" : "rgba(" + t(i(this._r, 255) * 100) + "%, " + t(i(this._g, 255) * 100) + "%, " + t(i(this._b, 255) * 100) + "%, " + this._roundA + ")"
          },
          toName: function () {
            return this._a === 0 ? "transparent" : this._a < 1 ? !1 : b[p(this._r, this._g, this._b, !0)] || !1
          },
          toFilter: function (t) {
            var i = "#" + w(this._r, this._g, this._b, this._a),
              r = i,
              f = this._gradientType ? "GradientType = 1, " : "",
              u;
            return t && (u = n(t), r = u.toHex8String()), "progid:DXImageTransform.Microsoft.gradient(" + f + "startColorstr=" + i + ",endColorstr=" + r + ")"
          },
          toString: function (n) {
            var i = !!n;
            n = n || this._format;
            var t = !1,
              r = this._a < 1 && this._a >= 0,
              u = !i && r && (n === "hex" || n === "hex6" || n === "hex3" || n === "name");
            return u ? n === "name" && this._a === 0 ? this.toName() : this.toRgbString() : (n === "rgb" && (t = this.toRgbString()), n === "prgb" && (t = this.toPercentageRgbString()), (n === "hex" || n === "hex6") && (t = this.toHexString()), n === "hex3" && (t = this.toHexString(!0)), n === "hex8" && (t = this.toHex8String()), n === "name" && (t = this.toName()), n === "hsl" && (t = this.toHslString()), n === "hsv" && (t = this.toHsvString()), t || this.toHexString())
          },
          _applyModification: function (n, t) {
            var i = n.apply(null, [this].concat([].slice.call(t)));
            return this._r = i._r, this._g = i._g, this._b = i._b, this.setAlpha(i._a), this
          },
          lighten: function () {
            return this._applyModification(st, arguments)
          },
          brighten: function () {
            return this._applyModification(ht, arguments)
          },
          darken: function () {
            return this._applyModification(ct, arguments)
          },
          desaturate: function () {
            return this._applyModification(ft, arguments)
          },
          saturate: function () {
            return this._applyModification(et, arguments)
          },
          greyscale: function () {
            return this._applyModification(ot, arguments)
          },
          spin: function () {
            return this._applyModification(lt, arguments)
          },
          _applyCombination: function (n, t) {
            return n.apply(null, [this].concat([].slice.call(t)))
          },
          analogous: function () {
            return this._applyCombination(wt, arguments)
          },
          complement: function () {
            return this._applyCombination(at, arguments)
          },
          monochromatic: function () {
            return this._applyCombination(bt, arguments)
          },
          splitcomplement: function () {
            return this._applyCombination(pt, arguments)
          },
          triad: function () {
            return this._applyCombination(vt, arguments)
          },
          tetrad: function () {
            return this._applyCombination(yt, arguments)
          }
        };
        n.fromRatio = function (t, i) {
          var u, r;
          if (typeof t == "object") {
            u = {};
            for (r in t) t.hasOwnProperty(r) && (u[r] = r === "a" ? t[r] : h(t[r]));
            t = u
          }
          return n(t, i)
        };
        n.equals = function (t, i) {
          return !t || !i ? !1 : n(t).toRgbString() == n(i).toRgbString()
        };
        n.random = function () {
          return n.fromRatio({
            r: a(),
            g: a(),
            b: a()
          })
        };
        n.mix = function (t, i, r) {
          var s, l;
          r = r === 0 ? 0 : r || 50;
          var f = n(t).toRgb(),
            e = n(i).toRgb(),
            h = r / 100,
            o = h * 2 - 1,
            c = e.a - f.a,
            u;
          return u = o * c == -1 ? o : (o + c) / (1 + o * c), u = (u + 1) / 2, s = 1 - u, l = {
            r: e.r * u + f.r * s,
            g: e.g * u + f.g * s,
            b: e.b * u + f.b * s,
            a: e.a * h + f.a * (1 - h)
          }, n(l)
        };
        n.readability = function (t, i) {
          var f = n(t),
            e = n(i),
            r = f.toRgb(),
            u = e.toRgb(),
            o = f.getBrightness(),
            s = e.getBrightness(),
            h = Math.max(r.r, u.r) - Math.min(r.r, u.r) + Math.max(r.g, u.g) - Math.min(r.g, u.g) + Math.max(r.b, u.b) - Math.min(r.b, u.b);
          return {
            brightness: Math.abs(o - s),
            color: h
          }
        };
        n.isReadable = function (t, i) {
          var r = n.readability(t, i);
          return r.brightness > 125 && r.color > 500
        };
        n.mostReadable = function (t, i) {
          for (var h = null, o = 0, u = !1, r = 0; r < i.length; r++) {
            var f = n.readability(t, i[r]),
              e = f.brightness > 125 && f.color > 500,
              s = 3 * (f.brightness / 125) + f.color / 500;
            (e && !u || e && u && s > o || !e && !u && s > o) && (u = e, o = s, h = n(i[r]))
          }
          return h
        };
        c = n.names = {
          aliceblue: "f0f8ff",
          antiquewhite: "faebd7",
          aqua: "0ff",
          aquamarine: "7fffd4",
          azure: "f0ffff",
          beige: "f5f5dc",
          bisque: "ffe4c4",
          black: "000",
          blanchedalmond: "ffebcd",
          blue: "00f",
          blueviolet: "8a2be2",
          brown: "a52a2a",
          burlywood: "deb887",
          burntsienna: "ea7e5d",
          cadetblue: "5f9ea0",
          chartreuse: "7fff00",
          chocolate: "d2691e",
          coral: "ff7f50",
          cornflowerblue: "6495ed",
          cornsilk: "fff8dc",
          crimson: "dc143c",
          cyan: "0ff",
          darkblue: "00008b",
          darkcyan: "008b8b",
          darkgoldenrod: "b8860b",
          darkgray: "a9a9a9",
          darkgreen: "006400",
          darkgrey: "a9a9a9",
          darkkhaki: "bdb76b",
          darkmagenta: "8b008b",
          darkolivegreen: "556b2f",
          darkorange: "ff8c00",
          darkorchid: "9932cc",
          darkred: "8b0000",
          darksalmon: "e9967a",
          darkseagreen: "8fbc8f",
          darkslateblue: "483d8b",
          darkslategray: "2f4f4f",
          darkslategrey: "2f4f4f",
          darkturquoise: "00ced1",
          darkviolet: "9400d3",
          deeppink: "ff1493",
          deepskyblue: "00bfff",
          dimgray: "696969",
          dimgrey: "696969",
          dodgerblue: "1e90ff",
          firebrick: "b22222",
          floralwhite: "fffaf0",
          forestgreen: "228b22",
          fuchsia: "f0f",
          gainsboro: "dcdcdc",
          ghostwhite: "f8f8ff",
          gold: "ffd700",
          goldenrod: "daa520",
          gray: "808080",
          green: "008000",
          greenyellow: "adff2f",
          grey: "808080",
          honeydew: "f0fff0",
          hotpink: "ff69b4",
          indianred: "cd5c5c",
          indigo: "4b0082",
          ivory: "fffff0",
          khaki: "f0e68c",
          lavender: "e6e6fa",
          lavenderblush: "fff0f5",
          lawngreen: "7cfc00",
          lemonchiffon: "fffacd",
          lightblue: "add8e6",
          lightcoral: "f08080",
          lightcyan: "e0ffff",
          lightgoldenrodyellow: "fafad2",
          lightgray: "d3d3d3",
          lightgreen: "90ee90",
          lightgrey: "d3d3d3",
          lightpink: "ffb6c1",
          lightsalmon: "ffa07a",
          lightseagreen: "20b2aa",
          lightskyblue: "87cefa",
          lightslategray: "789",
          lightslategrey: "789",
          lightsteelblue: "b0c4de",
          lightyellow: "ffffe0",
          lime: "0f0",
          limegreen: "32cd32",
          linen: "faf0e6",
          magenta: "f0f",
          maroon: "800000",
          mediumaquamarine: "66cdaa",
          mediumblue: "0000cd",
          mediumorchid: "ba55d3",
          mediumpurple: "9370db",
          mediumseagreen: "3cb371",
          mediumslateblue: "7b68ee",
          mediumspringgreen: "00fa9a",
          mediumturquoise: "48d1cc",
          mediumvioletred: "c71585",
          midnightblue: "191970",
          mintcream: "f5fffa",
          mistyrose: "ffe4e1",
          moccasin: "ffe4b5",
          navajowhite: "ffdead",
          navy: "000080",
          oldlace: "fdf5e6",
          olive: "808000",
          olivedrab: "6b8e23",
          orange: "ffa500",
          orangered: "ff4500",
          orchid: "da70d6",
          palegoldenrod: "eee8aa",
          palegreen: "98fb98",
          paleturquoise: "afeeee",
          palevioletred: "db7093",
          papayawhip: "ffefd5",
          peachpuff: "ffdab9",
          peru: "cd853f",
          pink: "ffc0cb",
          plum: "dda0dd",
          powderblue: "b0e0e6",
          purple: "800080",
          rebeccapurple: "663399",
          red: "f00",
          rosybrown: "bc8f8f",
          royalblue: "4169e1",
          saddlebrown: "8b4513",
          salmon: "fa8072",
          sandybrown: "f4a460",
          seagreen: "2e8b57",
          seashell: "fff5ee",
          sienna: "a0522d",
          silver: "c0c0c0",
          skyblue: "87ceeb",
          slateblue: "6a5acd",
          slategray: "708090",
          slategrey: "708090",
          snow: "fffafa",
          springgreen: "00ff7f",
          steelblue: "4682b4",
          tan: "d2b48c",
          teal: "008080",
          thistle: "d8bfd8",
          tomato: "ff6347",
          turquoise: "40e0d0",
          violet: "ee82ee",
          wheat: "f5deb3",
          white: "fff",
          whitesmoke: "f5f5f5",
          yellow: "ff0",
          yellowgreen: "9acd32"
        };
        b = n.hexNames = kt(c);
        e = function () {
          var n = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",
            t = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?",
            i = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
          return {
            rgb: new RegExp("rgb" + t),
            rgba: new RegExp("rgba" + i),
            hsl: new RegExp("hsl" + t),
            hsla: new RegExp("hsla" + i),
            hsv: new RegExp("hsv" + t),
            hsva: new RegExp("hsva" + i),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
          }
        }();
        window.tinycolor = n
      }();
    n(function () {
      n.fn.spectrum.load && n.fn.spectrum.processNativeColorInputs()
    })
  })
