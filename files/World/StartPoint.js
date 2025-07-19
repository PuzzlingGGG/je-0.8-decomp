"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/SceneManager"),
  s = e("../../Frame/Util"),
  r = e("./WorldNodeBody"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = i = class extends r.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.data = null;
  }
  initInspector(e) {
    e.addHead("占位主角", "UI/startPoint");
    e.addButton("说明", "什么是占位主角?", () => {
      a.default.ins.OpenPanelByName("AboutPanel", e => {
        e.setData("主角编辑方式优化", i.about);
      });
    });
  }
  onLoad() {
    super.onLoad();
  }
  onDestroy() {}
  setCutting(e) {
    this.sprite && (this.sprite.enabled = !e);
  }
  setData(e) {
    this.world.isGameScene && (e = s.Util.deepCopy(e));
    this.data = e;
  }
};
d.about = '\n    Version 0.4.5 optimizes the process of creating plot games.\n    \n    When making a plot-oriented game, it is possible to put only one main character in the initial map, and no main character is placed in other maps. This way, when switching maps, the main character\'s attributes and weapons can be carried over to the second map. When the plot needs to change the protagonist, you can use the "switch protagonist" command.\n\n    Other details.\n\n    1. Compatible with older versions, if there is already a protagonist in the map, the protagonist in the map will be used first. If there is no protagonist in the map, the protagonist of the previous map will enter the map.\n\n    2. When switching protagonists, the blood and weapons of the old protagonist and the new protagonist are independent and will not affect each other.\n\n    3. The attributes of the switched protagonist are determined by the template. To change the attributes, please click the setting button at the bottom right corner of the character.\n    ';
n([c(cc.Sprite)], d.prototype, "sprite", void 0);
d = i = n([l], d);
exports.default = d;