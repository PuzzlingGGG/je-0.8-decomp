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
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Util"),
  c = e("../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends s.default {
  constructor() {
    super(...arguments);
    this.editBox = null;
    this.rankBtn = null;
    this.okBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    super.onLoad();
    this.rankBtn.node.on(a.default.CLICK, this.onRankBtn, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e) {
    e = l.Util.deepCopy(e);
    this.evt = e;
    e.extra || (e.extra = {
      str: "Game Over"
    });
    this.editBox.string = e.extra.str;
    this.refreshRankBtn(e.extra.gameRankId);
  }
  refreshRankBtn(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield c.Mng.Ins.gameRankMng.loadOne(e);
      this.rankBtn.label.string = t ? t.name : "无";
    });
  }
  onRankBtn() {
    r.default.ins.OpenPanelByName("SelectGameRankPanel", e => {
      e.setData(this.evt.extra.gameRankId);
      e.selectCall = e => {
        this.evt.extra.gameRankId = e;
        this.refreshRankBtn(e);
      };
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = this.editBox.textLabel.string;
    this.evt.extra.str = e;
    this.call && this.call(this.evt);
  }
};
i([h(cc.EditBox)], p.prototype, "editBox", void 0);
i([h(a.default)], p.prototype, "rankBtn", void 0);
i([h(a.default)], p.prototype, "okBtn", void 0);
p = i([d], p);
exports.default = p;