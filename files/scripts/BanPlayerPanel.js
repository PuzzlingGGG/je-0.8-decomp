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
  s = e("../../CustomUI/ToggleGroup"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/ReportMng"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends r.default {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.btnLayout = null;
    this.scoreToggleGroup = null;
    this.msgEditBox = null;
    this.okBtn = null;
    this.playerId = 0;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.addBtn("头像违规", 1, "头像违规");
    this.addBtn("名称违规", 1, "名称违规");
    this.addBtn("头像名称", 1, "头像、名称违规");
    this.addBtn("头像名称介绍", 1, "头像、名称、介绍违规");
    this.btn.node.active = !1;
  }
  addBtn(e, t, o) {
    let i = cc.instantiate(this.btn.node);
    this.btnLayout.addChild(i);
    i.getComponent(a.default).label.string = e;
    i.on(a.default.CLICK, () => {
      this.scoreToggleGroup.selectIdx(t);
      this.msgEditBox.string = o;
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.playerId = e;
    });
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      l.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "是否处罚该玩家？";
        e.setLeftBtn({
          text: "是",
          color: d.UIColor.pink,
          call: () => n(this, void 0, void 0, function* () {
            yield this.doBanPlayer();
            this.node.dispatchEvent(h.Util.customEvent("refreshList"));
            this.closePanel();
          })
        });
        e.setRightBtn({
          text: "取消",
          color: d.UIColor.blue
        });
      });
    });
  }
  doBanPlayer() {
    return n(this, void 0, void 0, function* () {
      let e = !1,
        t = !1,
        o = !1,
        i = this.msgEditBox.textLabel.string;
      i.indexOf("头像") >= 0 && (t = !0);
      i.indexOf("名称") >= 0 && (e = !0);
      i.indexOf("介绍") >= 0 && (o = !0);
      let n = -this.scoreToggleGroup.idx;
      p.ReportMng.Ins.banPlayer(this.playerId, i, n, e, t, o);
      c.default.hideLoading("下线完成");
    });
  }
};
i([m(a.default)], f.prototype, "btn", void 0);
i([m(cc.Node)], f.prototype, "btnLayout", void 0);
i([m(s.default)], f.prototype, "scoreToggleGroup", void 0);
i([m(cc.EditBox)], f.prototype, "msgEditBox", void 0);
i([m(a.default)], f.prototype, "okBtn", void 0);
f = i([u], f);
exports.default = f;