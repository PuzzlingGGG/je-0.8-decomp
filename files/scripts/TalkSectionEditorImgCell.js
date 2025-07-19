"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Game/Player/Mng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.deleteBtn = null;
    this.sprite = null;
    this.addIcocn = null;
    this.data = null;
    this.parent = null;
  }
  onLoad() {
    this.node.on(n.default.CLICK, this.onClickThis, this);
    this.deleteBtn.node.on(n.default.CLICK, this.onDeleteBtn, this);
  }
  setData(e) {
    this.data = e;
    this.addIcocn.active = !1;
    this.deleteBtn.node.active = !1;
    if (e) {
      this.deleteBtn.node.active = !0;
      s.Mng.Ins.spriteMng.setSprite(this.sprite, e.url, 200, 1);
    } else {
      this.addIcocn.active = !0;
      this.sprite.spriteFrame = null;
    }
  }
  onClickThis() {
    this.data ? a.default.ins.OpenPanelByName("SelectImagePanel", e => {
      e.call = e => {
        this.data.url = e;
        this.setData(this.data);
      };
    }) : a.default.ins.OpenPanelByName("SelectImagePanel", e => {
      e.call = e => {
        this.parent.datas.push({
          url: e
        });
        this.parent.refresh();
      };
    });
  }
  onDeleteBtn() {
    let e = this.parent.datas.indexOf(this.data);
    this.parent.datas.splice(e, 1);
    this.parent.refresh();
  }
};
i([l(n.default)], c.prototype, "deleteBtn", void 0);
i([l(cc.Sprite)], c.prototype, "sprite", void 0);
i([l(cc.Node)], c.prototype, "addIcocn", void 0);
c = i([r], c);
exports.default = c;