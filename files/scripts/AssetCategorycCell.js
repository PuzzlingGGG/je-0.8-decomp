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
const a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Util"),
  r = e("../../Game/OperationFlow"),
  l = e("../../GameData/GameTypeDefine"),
  c = e("../../CustomUI/Button"),
  d = e("../../Frame/SceneManager"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.title = null;
    this._category = l.CommonDataType.Tile;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
    this.node.on(c.default.CLICK, this.onTap, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this._category = e;
      switch (this._category) {
        case l.CommonDataType.Actor:
          this.icon.spriteFrame = yield s.Util.loadBundleRes("Atlas/Icon/icon_asset_actor", cc.SpriteFrame);
          this.title.string = "Role";
          break;
        case l.CommonDataType.Tile:
          this.icon.spriteFrame = yield s.Util.loadBundleRes("Atlas/Icon/icon_asset_tile", cc.SpriteFrame);
          this.title.string = "Plot";
          break;
        case l.CommonDataType.Device:
          this.icon.spriteFrame = yield s.Util.loadBundleRes("Atlas/Icon/icon_asset_device", cc.SpriteFrame);
          this.title.string = "Device";
          break;
        case l.CommonDataType.Prop:
          this.icon.spriteFrame = yield s.Util.loadBundleRes("Atlas/Icon/icon_asset_prop", cc.SpriteFrame);
          this.title.string = "Tool";
          break;
        case l.CommonDataType.Weapon:
          this.icon.spriteFrame = yield s.Util.loadBundleRes("Atlas/Icon/icon_asset_weapon", cc.SpriteFrame);
          this.title.string = "Weapon";
      }
    });
  }
  onTap() {
    switch (this._category) {
      case l.CommonDataType.Actor:
        d.default.ins.curScene.closeAllPanel();
        r.OperationFlow.paintActor(null);
        break;
      case l.CommonDataType.Tile:
        d.default.ins.curScene.closeAllPanel();
        r.OperationFlow.paintTile(l.TileType.All, null);
        break;
      case l.CommonDataType.Device:
        d.default.ins.curScene.closeAllPanel();
        r.OperationFlow.paintDevice(null);
        break;
      case l.CommonDataType.Prop:
        d.default.ins.curScene.closeAllPanel();
        r.OperationFlow.paintProp(null);
        break;
      case l.CommonDataType.Weapon:
        d.default.ins.curScene.closeAllPanel();
        r.OperationFlow.paintWeapon(null, null);
    }
  }
};
i([p(cc.Sprite)], u.prototype, "icon", void 0);
i([p(cc.Label)], u.prototype, "title", void 0);
u = i([h], u);
exports.default = u;