"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../CustomUI/ScrollList"),
  s = e("../../CustomUI/HeadIcon"),
  r = e("../../Frame/Util"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.emptyLabels = [];
    this.headIcons = [];
    this.nameLabels = [];
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      for (let t = 0; t < 3; t++) {
        let o = e[t];
        if (o) {
          this.emptyLabels[t].node.active = !1;
          this.headIcons[t].node.active = !0;
          this.nameLabels[t].node.active = !0;
          this.nameLabels[t].string = r.Util.clampStr(o.userName, 8, "..");
          this.headIcons[t].loadUrl(o.userImg);
        } else {
          this.emptyLabels[t].node.active = !0;
          this.headIcons[t].node.active = !1;
          this.nameLabels[t].node.active = !1;
        }
      }
    });
  }
};
i([c([cc.Label])], d.prototype, "emptyLabels", void 0);
i([c([s.default])], d.prototype, "headIcons", void 0);
i([c([cc.Label])], d.prototype, "nameLabels", void 0);
d = i([l], d);
exports.default = d;