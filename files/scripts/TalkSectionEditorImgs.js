"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Util"),
  a = e("../../Game/OperationFlow"),
  s = e("../../Game/Player/TalkMng"),
  r = e("./TalkSectionEditorBase"),
  l = e("./TalkSectionEditorImgCell"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends r.default {
  constructor() {
    super(...arguments);
    this.cell = null;
    this.datas = [];
  }
  onLoad() {
    this.refresh();
  }
  refresh() {
    let e = this.datas.length + 1;
    e = Math.min(e, 9);
    let t = a.OperationFlow.getImgGridSize(e);
    this.node.height = 200 * t.row + 10 * (t.row - 1);
    n.Util.makeBro(this.cell.node, e, (e, o) => {
      let i = e.getComponent(l.default);
      i.parent = this;
      let n = this.datas[o];
      i.setData(n);
      let a = Math.floor(o / t.col),
        s = o % t.col;
      e.x = 200 * (s + .5) - this.node.width / 2 + 10 * s;
      e.y = 200 * -(a + .5) + this.node.height / 2 - 10 * a;
    });
  }
  reset() {
    this.datas = [];
    this.refresh();
  }
  setData(e) {
    this.datas = e.imgDatas;
    this.refresh();
  }
  getData() {
    return {
      type: s.TalkSectionType.Imgs,
      imgDatas: this.datas
    };
  }
};
i([d(l.default)], h.prototype, "cell", void 0);
h = i([c], h);
exports.default = h;