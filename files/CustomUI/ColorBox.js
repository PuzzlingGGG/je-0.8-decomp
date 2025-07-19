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
  r = e("./Button"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.triangle = null;
    this.content = null;
    this.selectIdx = 0;
    this.dataArr = [];
  }
  onLoad() {
    this.content.active = !1;
    this.node.on(r.default.CLICK, this.onClick, this);
    this.content.on(cc.Node.EventType.TOUCH_START, this.onTouchContentMove, this);
    this.content.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchContentMove, this);
  }
  onDestroy() {
    this.content && this.content.removeFromParent();
  }
  setDataArr(e) {
    this.dataArr = e;
    this.content.active = !1;
    this.select(0);
  }
  select(e) {
    this.selectIdx = e;
    let t = this.dataArr[e];
    this.sprite.node.color = t.color;
    this.node.emit(i.COLOR_CHANGE, e, t);
  }
  open() {
    this.content.active = !0;
    this.triangle.angle = 90;
    a.default.blockInput(!0, "ColorBox");
    a.default.node.on(cc.Node.EventType.TOUCH_END, this.onTopNodeTouch, this);
    s.Util.moveNode(this.content, a.default.node);
    let e = this.content.children[0],
      t = Math.floor(this.content.width / e.width),
      o = Math.ceil(this.dataArr.length / t);
    this.content.width = t * e.width;
    this.content.height = o * e.height;
    s.Util.makeBro(e, this.dataArr.length, (o, i) => {
      let n = this.dataArr[i];
      exports.color = n.color;
      exports.x = i % t * e.width;
      exports.y = -Math.floor(i / t) * e.height;
    });
  }
  close() {
    this.content.active = !1;
    this.triangle.angle = 0;
    a.default.blockInput(!1, "ColorBox");
    a.default.node.off(cc.Node.EventType.TOUCH_END, this.onTopNodeTouch, this);
    s.Util.moveNode(this.content, this.node);
  }
  onTopNodeTouch() {
    this.close();
  }
  onClick() {
    this.content.active ? this.close() : this.open();
  }
  onTouchContentMove(e) {
    let t = e.getLocation();
    this.content.convertToNodeSpaceAR(t, t);
    let o = this.content.children[0],
      i = Math.floor(this.content.width / o.width),
      n = Math.floor(t.x / o.width),
      a = Math.floor(-t.y / o.height),
      s = i * a + n;
    n >= 0 && n < i && a >= 0 && s < this.dataArr.length && this.select(s);
  }
  getColor() {
    return this.dataArr[this.selectIdx].color;
  }
};
d.COLOR_CHANGE = "COLOR_CHANGE";
n([c(cc.Sprite)], d.prototype, "sprite", void 0);
n([c(cc.Node)], d.prototype, "triangle", void 0);
n([c(cc.Node)], d.prototype, "content", void 0);
d = i = n([l], d);
exports.default = d;