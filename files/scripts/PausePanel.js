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
  l = e("../../Frame/UIColor"),
  c = e("../../Game/Player/GameSaveMng"),
  d = e("../../Scene/GameScene/GameScene"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.resumeBtn = null;
    this.resetBtn = null;
    this.loadBtn = null;
    this.exitBtn = null;
    this.resumeCall = null;
    this.exitCall = null;
  }
  onLoad() {
    super.onLoad();
    this.resumeBtn.node.on(a.default.CLICK, this.onResumeBtn, this);
    this.exitBtn.node.on(a.default.CLICK, this.onExitBtn, this);
    this.resetBtn.node.on(a.default.CLICK, this.onResetBtn, this);
    this.loadBtn.node.on(a.default.CLICK, this.onLoadBtn, this);
  }
  closeAnim(e = null) {
    e && e();
  }
  onCloseBtnTap() {
    super.onCloseBtnTap();
    this.resumeCall && this.resumeCall();
  }
  onResumeBtn() {
    this.closePanel();
    this.resumeCall && this.resumeCall();
  }
  onExitBtn() {
    this.closePanel();
    this.exitCall && this.exitCall();
  }
  onResetBtn() {
    r.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "是否删除存档，重新开始？";
      e.setLeftBtn({
        text: "是",
        color: l.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          this.closePanel();
          let e = r.default.ins.findScene(d.default);
          c.default.Ins.remove(e.gameData.id);
          e.initWithSave(null);
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: l.UIColor.blue
      });
    });
  }
  onLoadBtn() {
    this.closePanel();
    let e = r.default.ins.findScene(d.default),
      t = c.default.Ins.load(e.gameData.id);
    e.initWithSave(t);
  }
};
i([p(a.default)], u.prototype, "resumeBtn", void 0);
i([p(a.default)], u.prototype, "resetBtn", void 0);
i([p(a.default)], u.prototype, "loadBtn", void 0);
i([p(a.default)], u.prototype, "exitBtn", void 0);
u = i([h], u);
exports.default = u;