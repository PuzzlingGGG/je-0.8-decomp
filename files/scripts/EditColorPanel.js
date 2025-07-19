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
  r = e("../../Frame/Panel"),
  l = e("../../Scene/PaintScene/PaintScene"),
  c = e("../../Frame/Util"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Game/Player/ColorMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends r.default {
  constructor() {
    super(...arguments);
    this.okBtn = null;
    this.list = null;
    this.addBtn = null;
    this.deleteBtn = null;
    this.moveUpBtn = null;
    this.moveDownBtn = null;
    this.emptyNode = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.closePanel, this);
    let e = c.Util.deepCopy(h.ColorMng.Ins.customColors);
    this.emptyNode.active = 0 == e.length;
    this.list.setDataArr(e);
    if (e.length > 0) {
      this.list.scrollTo(cc.Vec2.ZERO, .2);
      this.list.selectByIdx(e.length - 1);
    }
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.addBtn.node.on(a.default.CLICK, this.onAddBtn, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
    this.moveUpBtn.node.on(a.default.CLICK, this.onMoveUpBtn, this);
    this.moveDownBtn.node.on(a.default.CLICK, this.onMoveDownBtn, this);
  }
  onAddBtn() {
    let e = cc.color(0, 0, 0),
      t = this.list.getCurData();
    if (t) {
      e.r = t.data.r;
      e.g = t.data.g;
      e.b = t.data.b;
    }
    d.default.ins.OpenPanelByName("CreateColorPanel", t => {
      t.setColor(0, e);
      t.setSaveStyle(!0);
      t.call = e => {
        let t = this.list.getDataArr();
        t.splice(this.list.curSelectIdx + 1, 0, e);
        this.list.setDataArr(t);
        this.emptyNode.active = 0 == t.length;
      };
    });
  }
  setData() {
    let e = c.Util.deepCopy(h.ColorMng.Ins.customColors);
    this.list.setDataArr(e);
    this.emptyNode.active = 0 == e.length;
    e.length > 0 && this.list.selectByIdx(0);
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.list.getDataArr();
      yield h.ColorMng.Ins.saveAll(e);
      let t = d.default.ins.findScene(l.default),
        o = this.list.getCurData();
      if (o) {
        let e = cc.color(o.data.r, o.data.g, o.data.b);
        t.refreshColorList(o.id);
        t.pencilColor = e;
      } else t.refreshColorList(0);
      this.closePanel();
    });
  }
  onDeleteBtn() {
    let e = this.list.curSelectIdx,
      t = this.list.getDataArr();
    t.splice(e, 1);
    this.list.setDataArr(t);
    this.emptyNode.active = 0 == t.length;
  }
  onMoveUpBtn() {
    let e = this.list.curSelectIdx,
      t = this.list.getDataArr();
    if (e > 0) {
      let o = t[e],
        i = t[e - 1];
      t[e] = i;
      t[e - 1] = o;
      this.list.setDataArr(t);
      this.list.selectByIdx(e - 1);
    }
  }
  onMoveDownBtn() {
    let e = this.list.curSelectIdx,
      t = this.list.getDataArr();
    if (e < t.length - 1) {
      let o = t[e],
        i = t[e + 1];
      t[e] = i;
      t[e + 1] = o;
      this.list.setDataArr(t);
      this.list.selectByIdx(e + 1);
    }
  }
  closePanel() {
    super.closePanel();
  }
};
i([u(a.default)], m.prototype, "okBtn", void 0);
i([u(s.default)], m.prototype, "list", void 0);
i([u(a.default)], m.prototype, "addBtn", void 0);
i([u(a.default)], m.prototype, "deleteBtn", void 0);
i([u(a.default)], m.prototype, "moveUpBtn", void 0);
i([u(a.default)], m.prototype, "moveDownBtn", void 0);
i([u(cc.Node)], m.prototype, "emptyNode", void 0);
m = i([p], m);
exports.default = m;