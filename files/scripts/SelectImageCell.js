"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Frame/UIColor"),
  s = e("../../Game/Player/Mng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.dot = null;
    this.dotLabel = null;
  }
  onLoad() {
    this.node.on(n.default.SET_DATA, this.setData, this);
    this.node.on(n.default.ITEM_STATE_CHANGE, this.onStateChange, this);
  }
  setData(e) {
    s.Mng.Ins.spriteMng.setSprite(this.sprite, e.url, 130);
    if (e.goodsUId) {
      this.dot.node.active = !0;
      this.dotLabel.string = "商店素材";
    } else if (e.importOthersImg) {
      this.dot.node.active = !0;
      this.dotLabel.string = "导入标记";
    } else if (e.belongGameId) {
      this.dot.node.active = !0;
      this.dotLabel.string = "工坊素材";
    } else this.dot.node.active = !1;
  }
  onStateChange(e) {
    this.node.color = e ? a.UIColor.blue : a.UIColor.white;
  }
};
i([l(cc.Sprite)], c.prototype, "sprite", void 0);
i([l(cc.Sprite)], c.prototype, "dot", void 0);
i([l(cc.Label)], c.prototype, "dotLabel", void 0);
c = i([r], c);
exports.default = c;