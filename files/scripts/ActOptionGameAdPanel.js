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
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Util"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Scene/EditWorldScene/Inspector/TriggerItem"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.eidtBox = null;
    this.imgBtn = null;
    this.succTriggerItem = null;
    this.failTriggerItem = null;
    this.okBtn = null;
    this.aboutBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
      this.aboutBtn.node.on(a.default.CLICK, this.onAboutBtn, this);
      this.imgBtn.node.on(a.default.CLICK, this.onImgBtn, this);
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      e = l.Util.deepCopy(e);
      this.evt = e;
      e.extra = e.extra || {
        str: "",
        url: "",
        onSucc: [],
        onFail: []
      };
      c.Mng.Ins.spriteMng.setShopSprite(this.imgBtn.icon, e.extra.url, 100);
      this.succTriggerItem.setData("看完广告后：", e.extra.onSucc, !1);
      this.failTriggerItem.setData("不看广告时：", e.extra.onFail, !1);
    });
  }
  onOkBtn() {
    this.closePanel();
    this.evt.extra.str = this.eidtBox.textLabel.string;
    this.call && this.call(this.evt);
  }
  onImgBtn() {
    r.default.ins.OpenPanelByName("SelectImagePanel", e => {
      e.call = e => {
        this.evt.extra.url = e;
        c.Mng.Ins.spriteMng.setShopSprite(this.imgBtn.icon, e, 100);
      };
    });
  }
  onAboutBtn() {
    r.default.ins.OpenPanelByName("AboutPanel", e => {
      e.setData("说明", "    \n    1.应清晰的说明奖励内容，再在广告成功时兑现奖励。\n    2.奖励与描述不符则可能收到举报。\n    3.游戏作者可以100%的获得广告产生的G币。\n");
    });
  }
};
i([p(cc.EditBox)], u.prototype, "eidtBox", void 0);
i([p(a.default)], u.prototype, "imgBtn", void 0);
i([p(d.default)], u.prototype, "succTriggerItem", void 0);
i([p(d.default)], u.prototype, "failTriggerItem", void 0);
i([p(a.default)], u.prototype, "okBtn", void 0);
i([p(a.default)], u.prototype, "aboutBtn", void 0);
u = i([h], u);
exports.default = u;