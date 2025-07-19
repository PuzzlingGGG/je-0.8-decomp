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
const s = e("../../CustomUI/Button"),
  r = e("../../Frame/AD"),
  l = e("../../Frame/CrossPlatform"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/Top"),
  h = e("../../Game/Hortor"),
  p = e("../../Game/OperationFlow"),
  u = e("../../Game/Player/CoinMng"),
  m = e("../../Game/Player/DynamicMng"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.cntLabel = null;
    this.adBtn = null;
    this.shareBtn = null;
    this.gameData = null;
  }
  onLoad() {
    super.onLoad();
    this.adBtn.node.on(s.default.CLICK, this.onAdBtn, this);
    this.shareBtn.node.on(s.default.CLICK, this.onShareBtn, this);
    r.AD.preloadRewardVideo();
    this.shareBtn.node.active = !1;
  }
  onAdBtn() {
    r.AD.hasAD() ? r.AD.showVideoAd({
      id: r.AdUnitId.Coin,
      succ: () => a(this, void 0, void 0, function* () {
        let e = yield u.default.Ins.requestAddCoinByAd();
        if (e) {
          p.OperationFlow.openRewards(e, () => {});
          this.closePanel();
          i.index++;
        }
      })
    }) : d.default.showToast("暂无广告");
  }
  onShareBtn() {
    if (!r.AD.hasAD()) {
      d.default.showToast("已达最大次数限制");
      return;
    }
    let e = {
      shareType: "default",
      success: () => a(this, void 0, void 0, function* () {
        let e = yield u.default.Ins.requestAddCoinByAd();
        if (e) {
          p.OperationFlow.openRewards(e, () => {});
          this.closePanel();
          i.index++;
        }
      })
    };
    if (l.wx) {
      let t = !m.DynamicMng.Ins.isInspectVersion();
      h.Hortor.wxShare(e, t);
    } else l.tt && l.tt.shareAppMessage(e);
  }
  setGameData(e) {
    this.gameData = e;
  }
};
y.index = 0;
n([g(cc.Label)], y.prototype, "titleLabel", void 0);
n([g(cc.Label)], y.prototype, "cntLabel", void 0);
n([g(s.default)], y.prototype, "adBtn", void 0);
n([g(s.default)], y.prototype, "shareBtn", void 0);
y = i = n([f], y);
exports.default = y;