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
  c = e("../../Game/OperationFlow"),
  d = e("../../Game/Player/FollowMng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends r.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.backBtn = null;
    this.titleLabel = null;
  }
  onLoad() {
    super.onLoad();
    this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
  }
  onBackBtn() {
    l.default.ins.Back(null, l.ShiftAnima.moveRightShift);
  }
  onShow(e) {
    c.OperationFlow.deelOnShow(e);
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      this.titleLabel.string = e;
      let o = yield d.FollowMng.Ins.loadInfos(t);
      this.list.setDataArr(o);
    });
  }
};
i([p(s.default)], u.prototype, "list", void 0);
i([p(a.default)], u.prototype, "backBtn", void 0);
i([p(cc.Label)], u.prototype, "titleLabel", void 0);
u = i([h], u);
exports.default = u;