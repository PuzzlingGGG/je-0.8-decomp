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
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/Mng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends r.default {
  constructor() {
    super(...arguments);
    this.propBtn = null;
    this.cntBtn = null;
    this.useGravity = null;
    this.okBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.cntBtn.node.on(a.default.CLICK, this.onCntBtn, this);
    this.propBtn.node.on(a.default.CLICK, this.onPropBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.evt = c.Util.deepCopy(e);
      this.evt.extra || (this.evt.extra = {
        propConfId: 1,
        cnt: 1,
        useGravity: !1
      });
      this.cntBtn.label.string = this.evt.extra.cnt;
      this.evt.extra.useGravity ? this.useGravity.check() : this.useGravity.uncheck();
      this.refreshProp();
    });
  }
  refreshProp() {
    return n(this, void 0, void 0, function* () {
      let e = yield d.Mng.Ins.propMng.loadOne(this.evt.extra.propConfId);
      if (e) {
        this.propBtn.label.node.active = !1;
        this.propBtn.icon.node.active = !0;
        d.Mng.Ins.spriteMng.setPropSprite(this.propBtn.icon, e.textureName, 120);
      } else {
        this.propBtn.label.node.active = !0;
        this.propBtn.icon.node.active = !1;
      }
    });
  }
  onPropBtn() {
    l.default.ins.OpenPanelByName("SelectPropPanel", e => {
      e.setData(this.evt.extra.propConfId);
      e.selectCall = e => {
        this.evt.extra.propConfId = e.id;
        this.refreshProp();
      };
    });
  }
  onCntBtn() {
    l.default.ins.OpenPanelByName("NumberInputPanel", e => {
      e.setData("数量：", this.evt.extra.cnt, e => n(this, void 0, void 0, function* () {
        e = Math.floor(e);
        e = c.Util.clamp(e, 0, 99);
        this.evt.extra.cnt = e;
        this.cntBtn.label.string = e;
      }));
    });
  }
  onOkBtn() {
    this.closePanel();
    this.evt.extra.useGravity = this.useGravity.isChecked;
    this.call && this.call(this.evt);
  }
};
i([p(a.default)], u.prototype, "propBtn", void 0);
i([p(a.default)], u.prototype, "cntBtn", void 0);
i([p(s.default)], u.prototype, "useGravity", void 0);
i([p(a.default)], u.prototype, "okBtn", void 0);
u = i([h], u);
exports.default = u;