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
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/UIColor"),
  c = e("../../Game/Player/Mng"),
  d = e("../../GameData/GameTypeDefine"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.weaponSprite = null;
    this.bulletSprite = null;
    this.normalNode = null;
    this.createNew = null;
    this.noWeapon = null;
    this.optionBtn = null;
    this.conf = null;
    this.bulletConf = null;
    this.from = "MinePage";
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtnTap, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.conf = e;
      this.createNew.active = e.createNew;
      this.weaponSprite.node.active = !e.createNew;
      this.bulletSprite.node.active = !e.createNew;
      this.optionBtn.node.active = !0;
      this.noWeapon.active = e.noWeapon;
      if (e.noWeapon) {
        this.optionBtn.node.active = !1;
        this.bulletSprite.node.active = !1;
        this.weaponSprite.node.active = !1;
      } else if (!e.createNew) {
        c.Mng.Ins.spriteMng.setWeaponSprite(this.weaponSprite, e.textureName, 120);
        let t = null;
        e.weaponType == d.WeaponType.Gun && e.gun.bulletId ? t = e.gun.bulletId : e.weaponType == d.WeaponType.Cast && e.cast.bulletId && (t = e.cast.bulletId);
        if (t) {
          this.bulletConf = yield c.Mng.Ins.bulletMng.loadOne(t);
          if (this.bulletConf) {
            this.bulletSprite.node.active = !0;
            c.Mng.Ins.spriteMng.setBullletSprite(this.bulletSprite, this.bulletConf.textureName, 80);
          } else {
            this.bulletSprite.spriteFrame = null;
            this.bulletSprite.node.active = !1;
          }
        } else {
          this.bulletConf = null;
          this.bulletSprite.spriteFrame = null;
          this.bulletSprite.node.active = !1;
        }
      }
    });
  }
  onStateChange(e) {
    "MinePage" == this.from || "SelectWeaponPanel" == this.from && (this.node.color = e ? l.UIColor.blue : cc.Color.WHITE);
  }
  onOptionBtnTap() {
    this.conf && r.default.ins.OpenPanelByName("CommonOptionPanel", e => {
      e.setData(this.conf);
    });
  }
};
i([p(cc.Sprite)], u.prototype, "weaponSprite", void 0);
i([p(cc.Sprite)], u.prototype, "bulletSprite", void 0);
i([p(cc.Node)], u.prototype, "normalNode", void 0);
i([p(cc.Node)], u.prototype, "createNew", void 0);
i([p(cc.Node)], u.prototype, "noWeapon", void 0);
i([p(a.default)], u.prototype, "optionBtn", void 0);
i([p], u.prototype, "from", void 0);
u = i([h], u);
exports.default = u;