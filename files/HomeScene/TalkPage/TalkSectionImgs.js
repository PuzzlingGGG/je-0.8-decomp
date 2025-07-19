"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../CustomUI/ScrollList"),
  s = e("../../../Frame/SceneManager"),
  r = e("../../../Frame/Util"),
  l = e("../../../Game/OperationFlow"),
  c = e("../../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.img = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    let t = l.OperationFlow.getImgGridSize(e.imgDatas.length);
    this.node.height = 200 * t.row + 10 * (t.row - 1);
    r.Util.makeBro(this.img.node, e.imgDatas.length, (o, i) => {
      let a = o.getComponent(cc.Sprite),
        r = e.imgDatas[i].url;
      c.Mng.Ins.spriteMng.setSprite(a, r, 200, 1);
      let l = Math.floor(i / t.col),
        d = i % t.col;
      exports.x = 200 * (d + .5) - this.node.width / 2 + 10 * d;
      exports.y = 200 * -(l + .5) + this.node.height / 2 - 10 * l;
      o.targetOff(this);
      o.on(n.default.CLICK, () => {
        s.default.ins.OpenPanelByName("ImagePreviewPanel", e => {
          e.setData("", r);
        });
      }, this);
    });
  }
  calcuH(e) {
    let t = l.OperationFlow.getImgGridSize(e.imgDatas.length);
    return 200 * t.row + 10 * (t.row - 1);
  }
};
i([h(cc.Sprite)], p.prototype, "img", void 0);
p = i([d], p);
exports.default = p;