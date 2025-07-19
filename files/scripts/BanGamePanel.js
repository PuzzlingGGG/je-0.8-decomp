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
  s = e("../../CustomUI/Toggle"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/ReportMng"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends l.default {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.btnLayout = null;
    this.scoreToggleGroup = null;
    this.msgEditBox = null;
    this.deleteProjectToggle = null;
    this.okBtn = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.btn.node.active = !1;
  }
  addBtn(e, t, o, i) {
    let n = cc.instantiate(this.btn.node);
    this.btnLayout.addChild(n);
    let s = n.getComponent(a.default);
    s.label.string = e;
    s.node.active = !0;
    n.on(a.default.CLICK, () => {
      this.scoreToggleGroup.selectIdx(t);
      this.msgEditBox.string = o;
      this.deleteProjectToggle.isChecked = i;
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.addBtn("SCP", 0, "应抖音审核方要求，不能发布SCP相关内容", !0);
      this.addBtn("SANS", 0, "应抖音审核方要求，不能发布sans相关内容", !1);
      this.addBtn("挑拨引战", 1, `您的游戏：《${e.name}》由于‘挑拨引战’被下架`, !0);
      this.addBtn("引人不适", 1, `您的游戏：《${e.name}》由于‘引人不适’被下架`, !0);
      this.addBtn("图标违规", 1, `您的游戏：《${e.name}》由于‘图标违规’被下架`, !0);
      this.addBtn("低俗色情", 3, `您的游戏：《${e.name}》由于‘低俗色情’被下架`, !0);
      this.addBtn("政治敏感", 3, `您的游戏：《${e.name}》由于‘政治敏感’被下架`, !0);
    });
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      c.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "是否下架该游戏？";
        e.setLeftBtn({
          text: "下架",
          color: d.UIColor.pink,
          call: () => n(this, void 0, void 0, function* () {
            yield this.banGame();
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
  banGame() {
    return n(this, void 0, void 0, function* () {
      if (!this.data) return;
      let e = this.msgEditBox.textLabel.string,
        t = -this.scoreToggleGroup.idx,
        o = this.deleteProjectToggle.isChecked;
      p.ReportMng.Ins.banGame(this.data.id, t, e, o);
    });
  }
};
i([m(a.default)], f.prototype, "btn", void 0);
i([m(cc.Node)], f.prototype, "btnLayout", void 0);
i([m(r.default)], f.prototype, "scoreToggleGroup", void 0);
i([m(cc.EditBox)], f.prototype, "msgEditBox", void 0);
i([m(s.default)], f.prototype, "deleteProjectToggle", void 0);
i([m(a.default)], f.prototype, "okBtn", void 0);
f = i([u], f);
exports.default = f;