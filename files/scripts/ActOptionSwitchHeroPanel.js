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
const a = e("../../GameScript/index"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Game/Player/Mng"),
  c = e("../../CustomUI/Button"),
  d = e("../../Frame/Top"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.nameLabel = null;
    this.btnSelHero = null;
    this.btnOk = null;
    this.evt = null;
    this.saveCall = null;
  }
  onLoad() {
    super.onLoad();
    this.btnSelHero.node.on(c.default.CLICK, this.onClickSelHero, this);
    this.btnOk.node.on(c.default.CLICK, this.onClickOk, this);
  }
  setData(e) {
    this.evt = e;
    let t = e.extra;
    this._confId = t ? t.confId : null;
    this.onRefresh();
  }
  onRefresh() {
    return n(this, void 0, void 0, function* () {
      let e = yield l.Mng.Ins.actorMng.loadOne(this._confId);
      if (e) {
        this.nameLabel.string = e.name;
        l.Mng.Ins.spriteMng.setPropSprite(this.icon, e.textureName, 160);
      } else {
        this.nameLabel.string = "";
        this.icon.spriteFrame = null;
      }
    });
  }
  onClickSelHero() {
    r.default.ins.OpenPanelByName("SelectHeroPanel", e => {
      e.setData(null);
      e.selectCall = (e => {
        if (e) {
          this._confId = e.id;
          this.onRefresh();
        }
      }).bind(this);
    });
  }
  onClickOk() {
    if (!this._confId || "" == this._confId) {
      d.default.showToast("请选择英雄");
      return;
    }
    this.closePanel();
    let e = {
      type: a.GSDataNodeType.GSYS_SwitchHero,
      confId: this._confId
    };
    this.evt.extra = e;
    this.saveCall && this.saveCall(this.evt);
  }
};
i([p(cc.Sprite)], u.prototype, "icon", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(c.default)], u.prototype, "btnSelHero", void 0);
i([p(c.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;