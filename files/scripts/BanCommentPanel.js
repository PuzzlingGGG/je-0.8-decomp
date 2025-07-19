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
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/ReportMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends r.default {
  constructor() {
    super(...arguments);
    this.btnPrefab = null;
    this.btnLayout = null;
    this.scoreToggleGroup = null;
    this.msgEditBox = null;
    this.okBtn = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.btnPrefab.node.active = !1;
  }
  addBtn(e, t, o, i) {
    let n = cc.instantiate(this.btnPrefab.node);
    this.btnLayout.addChild(n);
    let s = n.getComponent(a.default);
    s.label.string = e;
    s.node.active = !0;
    n.on(a.default.CLICK, () => {
      this.scoreToggleGroup.selectIdx(t);
      this.msgEditBox.string = o;
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      let t = d.Util.clampStr(e.msg, 8, "..");
      this.addBtn("SCP", 0, "应抖音审核方要求，不能发布SCP相关内容", !0);
      this.addBtn("挑拨引战", 1, `您的评论："${t}"由于‘挑拨引战’被删除`, !0);
      this.addBtn("引人不适", 1, `您的评论："${t}"由于‘引人不适’被删除`, !0);
      this.addBtn("图标违规", 1, `您的评论："${t}"由于‘图标违规’被删除`, !0);
      this.addBtn("低俗色情", 3, `您的评论："${t}"由于‘低俗色情’被删除`, !0);
      this.addBtn("政治敏感", 3, `您的评论："${t}"由于‘政治敏感’被删除`, !0);
    });
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      l.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "是否处罚该评论？";
        e.setLeftBtn({
          text: "是",
          color: c.UIColor.pink,
          call: () => n(this, void 0, void 0, function* () {
            yield this.banGame();
            this.node.dispatchEvent(d.Util.customEvent("refreshList"));
            this.closePanel();
          })
        });
        e.setRightBtn({
          text: "取消",
          color: c.UIColor.blue
        });
      });
    });
  }
  banGame() {
    return n(this, void 0, void 0, function* () {
      if (!this.data) return;
      let e = this.msgEditBox.textLabel.string,
        t = -this.scoreToggleGroup.idx;
      h.ReportMng.Ins.banComments(this.data.id, e, t);
    });
  }
};
i([u(a.default)], m.prototype, "btnPrefab", void 0);
i([u(cc.Node)], m.prototype, "btnLayout", void 0);
i([u(s.default)], m.prototype, "scoreToggleGroup", void 0);
i([u(cc.EditBox)], m.prototype, "msgEditBox", void 0);
i([u(a.default)], m.prototype, "okBtn", void 0);
m = i([p], m);
exports.default = m;