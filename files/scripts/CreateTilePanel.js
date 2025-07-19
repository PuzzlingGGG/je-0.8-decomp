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
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../CustomUI/Toggle"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/Util"),
  h = e("../../GameData/GameTypeDefine"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends c.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.sprite = null;
    this.typeDropDownBox = null;
    this.blockToggle = null;
    this.canDrstroyToggle = null;
    this.hpEditBox = null;
    this.shapeList = null;
    this.okBtn = null;
    this.conf = null;
    this.confirmCall = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtnClick, this);
    this.canDrstroyToggle.node.on(l.default.STATE_CHANGE, this.onCanDestroyToggleChange, this);
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      this.conf = d.Util.deepCopy(e);
      this.nameEditBox.string = e.name;
      this.blockToggle.isChecked = e.block;
      this.canDrstroyToggle.isChecked = e.canDestroy;
      this.hpEditBox.node.active = e.canDestroy;
      this.hpEditBox.string = e.hp + "";
      this.setSpriteByPixels(t);
      this.typeDropDownBox.setDataArr([{
        str: "侧视地块",
        type: h.TileType.Jump
      }, {
        str: "俯视地块",
        type: h.TileType.RPG
      }]);
      this.typeDropDownBox.selectByIdx(e.tileType == h.TileType.Jump ? 0 : 1);
      let o = [h.TileShape.Normal, h.TileShape.Half_Btm, h.TileShape.Half_Top, h.TileShape.Slope_45, h.TileShape.Slope_45_Flip, h.TileShape.Slope_135, h.TileShape.Slope_135_Flip],
        i = o.findIndex(t => t == e.shape);
      i <= 0 && (i = 0);
      this.shapeList.setDataArr(o);
      this.shapeList.selectByIdx(i);
    });
  }
  setSpriteByPixels(e) {
    let t = new cc.RenderTexture();
    t.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    t.initWithData(e, cc.Texture2D.PixelFormat.RGBA8888, 256, 256);
    if (this.sprite) {
      this.sprite.spriteFrame = new cc.SpriteFrame(t);
      this.sprite.node.width = this.sprite.node.height = 192;
    }
  }
  onCanDestroyToggleChange(e) {
    this.hpEditBox.node.active = e;
  }
  onOkBtnClick() {
    let e = this.conf;
    e.name = this.nameEditBox.textLabel.string;
    e.block = this.blockToggle.isChecked;
    e.canDestroy = this.canDrstroyToggle.isChecked;
    e.hp = Number.parseInt(this.hpEditBox.textLabel.string);
    e.type = h.CommonDataType.Tile;
    e.tileType = this.typeDropDownBox.getCurData().type;
    e.shape = this.shapeList.getCurData();
    this.closePanel();
    this.confirmCall && this.confirmCall(e);
  }
};
m.TILE_CONF_CHANGE = "TILE_CONF_CHANGE";
i([u(cc.EditBox)], m.prototype, "nameEditBox", void 0);
i([u(cc.Sprite)], m.prototype, "sprite", void 0);
i([u(s.default)], m.prototype, "typeDropDownBox", void 0);
i([u(l.default)], m.prototype, "blockToggle", void 0);
i([u(l.default)], m.prototype, "canDrstroyToggle", void 0);
i([u(cc.EditBox)], m.prototype, "hpEditBox", void 0);
i([u(r.default)], m.prototype, "shapeList", void 0);
i([u(a.default)], m.prototype, "okBtn", void 0);
m = i([p], m);
exports.default = m;