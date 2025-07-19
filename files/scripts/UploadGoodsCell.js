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
  r = e("../../Frame/Util"),
  l = e("../../Game/Player/Mng"),
  c = e("../../GameData/GameTypeDefine"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.sprite = null;
    this.subSprite = null;
    this.deleteBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.subSprite.node.active = !1;
      this.deleteBtn.node.active = !0;
      switch (e.type) {
        case "add":
          {
            this.deleteBtn.node.active = !1;
            let e = yield r.Util.loadBundleRes("Atlas/UI/plusBtn", cc.SpriteFrame);
            this.sprite.spriteFrame = e;
            this.sprite.node.scale = 1;
            this.sprite.node.width = this.sprite.node.height = 100;
            this.nameLabel.string = "点击添加素材";
            break;
          }
        case "tile":
          {
            let t = yield l.Mng.Ins.tileMng.loadOne(e.id);
            if (t) {
              l.Mng.Ins.spriteMng.setTileSprite(this.sprite, t.textureName, 150);
              this.nameLabel.string = t.name;
            }
            break;
          }
        case "actor":
          {
            let t = yield l.Mng.Ins.actorMng.loadOne(e.id);
            if (t) {
              l.Mng.Ins.spriteMng.setActorSprite(this.sprite, t.textureName, 150);
              this.nameLabel.string = t.name;
            }
            break;
          }
        case "device":
          {
            let t = yield l.Mng.Ins.deviceMng.loadOne(e.id);
            if (t) {
              l.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 150);
              this.nameLabel.string = t.name;
            }
            break;
          }
        case "prop":
          {
            let t = yield l.Mng.Ins.propMng.loadOne(e.id);
            if (t) {
              l.Mng.Ins.spriteMng.setPropSprite(this.sprite, t.textureName, 150);
              this.nameLabel.string = t.name;
            }
            break;
          }
        case "weapon":
          {
            let t = yield l.Mng.Ins.weaponMng.loadOne(e.id);
            if (t) {
              l.Mng.Ins.spriteMng.setWeaponSprite(this.sprite, t.textureName, 150);
              let e = null;
              t.weaponType == c.WeaponType.Gun && t.gun && (e = t.gun.bulletId);
              t.weaponType == c.WeaponType.Cast && t.cast && (e = t.cast.bulletId);
              let o = yield l.Mng.Ins.bulletMng.loadOne(e);
              if (o) {
                this.subSprite.node.active = !0;
                l.Mng.Ins.spriteMng.setBullletSprite(this.subSprite, o.textureName, 80);
              }
              this.nameLabel.string = t.name;
            }
            break;
          }
      }
    });
  }
  onDeleteBtn() {
    this.data && this.node.dispatchEvent(r.Util.customEvent("UploadGoodsCell.onDeleteBtn", !0, this.data));
  }
};
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(cc.Sprite)], p.prototype, "subSprite", void 0);
i([h(a.default)], p.prototype, "deleteBtn", void 0);
p = i([d], p);
exports.default = p;