"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../Frame/Top"),
  s = e("../Frame/Util"),
  r = e("../Game/Player/Mng"),
  l = e("./Button"),
  c = e("./ScrollList"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.icon = null;
    this.triangle = null;
    this.list = null;
    this.openDisplayNode = null;
    this.strLenLimit = -1;
    this.curSelectIdx = 0;
    this.dataArr = [];
    this.oriPos = null;
  }
  onLoad() {
    this.node.on(l.default.CLICK, this.onClick, this);
    this.list.node.on(c.default.SELECT_ITEM, this.onSelectItem, this);
    this.list.node.on(c.default.CLICK_ITEM, this.onClcikItem, this);
    this.openDisplayNode || (this.openDisplayNode = this.list.node);
    this.openDisplayNode.active = !1;
  }
  onDestroy() {
    this.openDisplayNode && this.openDisplayNode.removeFromParent();
  }
  setDataArr(e, t = 0) {
    this.openDisplayNode || (this.openDisplayNode = this.list.node);
    this.dataArr = e || [];
    this.openDisplayNode.active = !1;
    this.selectByIdx(t);
  }
  getDataArr() {
    return this.dataArr;
  }
  selectByIdx(e, t = !1) {
    this.curSelectIdx = e;
    let o = this.dataArr[e];
    if (o) {
      if (this.label) {
        this.label.node.active = !!o.str;
        this.strLenLimit > 0 ? this.label.string = s.Util.clampStr(o.str, this.strLenLimit, "..") : this.label.string = o.str;
      }
      if (this.icon) {
        let e = o.img;
        this.icon.node.active = !!e;
        e && r.Mng.Ins.spriteMng.setSprite(this.icon, e, 50);
      }
      this.node.emit(i.SELECT_CHANGE, e, o, t);
    } else {
      this.label && (this.label.node.active = !1);
      this.icon && (this.icon.node.active = !1);
      this.node.emit(i.SELECT_CHANGE, e, null, t);
    }
  }
  getCurData() {
    return this.curSelectIdx < 0 || this.curSelectIdx >= this.dataArr.length ? null : this.dataArr[this.curSelectIdx];
  }
  open() {
    this.openDisplayNode.active = !0;
    let e = this.list.getComponent(cc.Widget);
    e && (e.enabled = !1);
    this.triangle.angle = 90;
    a.default.blockInput(!0, "DropDownBox");
    a.default.node.on(cc.Node.EventType.TOUCH_END, this.onTopNodeTouch, this);
    this.oriPos = this.openDisplayNode.position;
    s.Util.moveNode(this.openDisplayNode, a.default.node);
    this.list.setDataArr(this.dataArr);
    this.list.selectByIdx(this.curSelectIdx);
  }
  close() {
    this.openDisplayNode.active = !1;
    this.triangle.angle = 0;
    a.default.blockInput(!1, "DropDownBox");
    a.default.node.off(cc.Node.EventType.TOUCH_END, this.onTopNodeTouch, this);
    s.Util.moveNode(this.openDisplayNode, this.node);
    this.openDisplayNode.position = this.oriPos;
  }
  onTopNodeTouch() {
    this.close();
  }
  onClick() {
    this.openDisplayNode.active ? this.close() : this.open();
  }
  onSelectItem(e, t) {
    this.selectByIdx(e, !0);
  }
  onClcikItem(e, t) {
    this.close();
    this.node.emit(i.CLICK_ITEM, e, t);
  }
};
p.SELECT_CHANGE = "SELECT_CHANGE";
p.CLICK_ITEM = "CLICK_ITEM";
n([h(cc.Label)], p.prototype, "label", void 0);
n([h(cc.Sprite)], p.prototype, "icon", void 0);
n([h(cc.Node)], p.prototype, "triangle", void 0);
n([h(c.default)], p.prototype, "list", void 0);
n([h(cc.Node)], p.prototype, "openDisplayNode", void 0);
n([h], p.prototype, "strLenLimit", void 0);
p = i = n([d], p);
exports.default = p;