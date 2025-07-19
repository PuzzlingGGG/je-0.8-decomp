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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/Scene"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends r.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.backBtn = null;
    this.titleLabel = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
  }
  onBackBtn() {
    l.default.ins.Back();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.titleLabel.string = e.title;
      this.list.setDataArr(e.roles);
    });
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          let e = yield this.data.appendFunc();
          if (e && e.length > 0) {
            for (let t = 0; t < e.length; t++) this.data.roles.push(e[t]);
            this.list.setDataArr(this.data.roles);
          } else c.default.showToast("没有了...");
      }
    });
  }
};
i([h(s.default)], p.prototype, "list", void 0);
i([h(a.default)], p.prototype, "backBtn", void 0);
i([h(cc.Label)], p.prototype, "titleLabel", void 0);
p = i([d], p);
exports.default = p;