"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../../i18n/i18nMgr"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/CoinBar"),
  c = e("../../CustomUI/ScrollList"),
  d = e("../../Frame/Panel"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Sound"),
  u = e("../../Frame/Util"),
  m = e("../../Game/PhyObj"),
  f = e("../../Game/Player/CoinMng"),
  g = e("../../Game/Player/GiftRankMng"),
  {
    ccclass: y,
    property: v
  } = cc._decorator;
let C = i = class extends d.default {
  constructor() {
    super(...arguments);
    this.payCoinBtn = null;
    this.giftList = null;
    this.coinLabel = null;
    this.introduceLabel = null;
    this.gameId = "";
    this.isOpenPanel = !1;
    this.timer = 0;
    this.touching = !1;
    this.inv = .5;
  }
  setCoin(e) {
    this.coinLabel.string = e + s.I18nMgr.getI18nStringByZh("赠送");
  }
  onLoad() {
    super.onLoad();
    this.giftList.node.on(c.default.SELECT_ITEM, this.onItemChange, this);
    this.payCoinBtn.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.payCoinBtn.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.payCoinBtn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
  }
  onEnable() {
    l.default.Ins.show(150, 110);
  }
  onDisable() {
    i.isSetFirst = !1;
    l.default.Ins.hide();
  }
  init(e) {
    this.gameId = e;
    let t = g.GiftRankMng.Ins.giftItemsMap,
      o = [];
    t.forEach(e => {
      o.push(e);
    });
    this.giftList.setDataArr(o);
    this.setCoin(o[0].coin);
    this.introduceLabel.string = o[0].intr;
    this.giftList.selectByIdx(0);
  }
  onItemChange(e, t) {
    this.curIdx = e;
    this.setCoin(t.coin);
    this.introduceLabel.string = t.intr;
  }
  touchStart() {
    this.touching = !0;
    this.timer = 0;
    this.inv = .5;
  }
  touchEnd() {
    this.touching = !1;
    this.pay();
  }
  touchCancel() {
    this.touching = !1;
  }
  update(e) {
    if (this.touching) {
      this.timer += e;
      if (this.timer > this.inv) {
        this.timer -= this.inv;
        this.inv = Math.max(.1, this.inv - .05);
        this.pay();
      }
    }
  }
  pay() {
    return a(this, void 0, void 0, function* () {
      const e = this.curIdx + 1,
        t = e + "",
        o = g.GiftRankMng.Ins.getCost(t);
      if (f.default.Ins.coin >= o) {
        let i = yield g.GiftRankMng.Ins.sendGift(this.gameId, e, 1);
        if (i && 0 == i.code) {
          f.default.Ins.costCoin(o);
          this.playAnim(t);
          return;
        }
      }
      if (!this.isOpenPanel) {
        h.default.ins.OpenPanelByName("LackCoinPanel", e => {
          e.closeCallback = () => {
            this.isOpenPanel = !1;
          };
        });
        this.isOpenPanel = !0;
      }
    });
  }
  playAnim(e) {
    return a(this, void 0, void 0, function* () {
      p.Sound.play("gainCoin");
      let t = new cc.Node();
      t.width = 128;
      t.height = 128;
      this.node.addChild(t);
      let o = t.addComponent(cc.Sprite);
      g.GiftRankMng.Ins.loadSF(e + "").then(e => {
        exports.spriteFrame = e;
      });
      t.y = 300;
      t.addComponent(m.default).fly(u.Util.randomFloat(-300, 300), u.Util.randomFloat(800, 1e3), u.Util.randomFloat(-360, 360));
    });
  }
};
C.isSetFirst = !1;
n([v(r.default)], C.prototype, "payCoinBtn", void 0);
n([v(c.default)], C.prototype, "giftList", void 0);
n([v(cc.Label)], C.prototype, "coinLabel", void 0);
n([v(cc.Label)], C.prototype, "introduceLabel", void 0);
C = i = n([y], C);
exports.default = C;