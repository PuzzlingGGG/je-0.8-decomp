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
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Util"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Scene/EditWorldScene/EditWorldScene"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends r.default {
  constructor() {
    super(...arguments);
    this.rankDropDown = null;
    this.okBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
      this.rankDropDown.node.on(s.default.SELECT_CHANGE, this.onRankChange, this);
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      e = l.Util.deepCopy(e);
      this.evt = e;
      e.extra || (e.extra = {
        gameRankId: "",
        sourceType: 0,
        propId: 0,
        variableId: 0
      });
      let t = d.default.ins.findScene(h.default).gameData,
        o = yield c.Mng.Ins.gameRankMng.loadMany(t.gameRankIds),
        i = [];
      for (let e = 0; e < o.length; e++) {
        let t = o[e];
        i.push({
          str: t.name,
          id: t.id
        });
      }
      let n = i.findIndex(t => t.id == e.extra.gameRankId);
      this.rankDropDown.setDataArr(i, n);
    });
  }
  onRankChange(e, t, o) {
    this.evt && t && (this.evt.extra.gameRankId = t.id);
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call(this.evt);
  }
};
i([u(s.default)], m.prototype, "rankDropDown", void 0);
i([u(a.default)], m.prototype, "okBtn", void 0);
m = i([p], m);
exports.default = m;