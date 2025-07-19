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
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/UIColor"),
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/TalkDraftMng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.deleteBtn = null;
    this.editBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
    this.editBtn.node.on(a.default.CLICK, this.onEditBtn, this);
  }
  setData(e) {
    this.data = e;
    this.titleLabel.string = c.Util.clampStr(e.title, 30, "..");
  }
  onDeleteBtn() {
    r.default.ins.OpenPanelByName("MessageBox", e => {
      e.titleLabel.string = "提示";
      e.label.string = "是否删除此草稿？";
      e.setLeftBtn({
        text: "删除",
        color: l.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          d.default.Ins.deleteDraft(this.data.id);
          this.node.dispatchEvent(c.Util.customEvent("TalkDraftCell.deleteDraft"));
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: l.UIColor.blue
      });
    });
  }
  onEditBtn() {
    let e = this.data;
    r.default.ins.popPanel();
    r.default.ins.Enter("EditTalkScene", t => {
      t.toModifyStyleByDraft(e);
    }, r.ShiftAnima.moveLeftShift);
  }
};
i([p(cc.Label)], u.prototype, "titleLabel", void 0);
i([p(a.default)], u.prototype, "deleteBtn", void 0);
i([p(a.default)], u.prototype, "editBtn", void 0);
u = i([h], u);
exports.default = u;