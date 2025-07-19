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
  l = e("../../CustomUI/GameIcon"),
  c = e("../../CustomUI/ScrollList"),
  d = e("../../Frame/Scene"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Top"),
  u = e("../../Frame/Util"),
  m = e("../../Game/OperationFlow"),
  f = e("../../Game/Player/GiftRankMng"),
  g = e("../GameCoverScene/GameCoverScene"),
  y = e("./GiftRankDetialCell"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = i = class extends d.default {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.totalLabel = null;
    this.nameLabel = null;
    this.backBtn = null;
    this.gameList = null;
    this.myDetialCell = null;
    this.backCall = null;
    this.data = null;
    this.isLoading = !1;
    this.beginIndex = 0;
    this.giftArr = [];
  }
  onLoad() {
    cc.game.on(i.RELOAD, this.reLoad, this);
    this.backBtn.node.on(r.default.CLICK, this.onBackBtn, this);
  }
  init(e) {
    return a(this, void 0, void 0, function* () {
      this.data = e;
      this.gameIcon.loadUrl(e.game.iconTextureName);
      this.nameLabel.string = u.Util.clampStr(e.gameName, 10, "..");
      this.refresh();
    });
  }
  onBackBtn() {
    h.default.ins.Back(() => {
      cc.game.emit(g.default.GameCoverScene_ReLoad);
    }, h.ShiftAnima.moveRightShift);
  }
  onShow(e) {
    m.OperationFlow.deelOnShow(e);
  }
  reLoad() {
    this.giftArr = [];
    this.beginIndex = 0;
    this.refresh();
  }
  refresh() {
    return a(this, void 0, void 0, function* () {
      if (this.isLoading) {
        p.default.showToast("加载中");
        return;
      }
      this.isLoading = !0;
      let e = this.data,
        t = yield f.GiftRankMng.Ins.loadGameGiftRank(e.gameId, this.beginIndex);
      this.totalLabel.string = s.I18nMgr.getI18nStringByZh("总计：") + t.score;
      let o = t.checkerInfo,
        i = t.rankList;
      this.giftArr = this.giftArr.concat(i);
      for (let e = 0; e < this.giftArr.length; e++) this.giftArr[e].rank = e + 1;
      this.beginIndex = this.giftArr.length;
      this.gameList.setDataArr(this.giftArr);
      this.myDetialCell.init(this.data.gameId, e.detail.authorMsg.id);
      this.myDetialCell.setData(o);
      this.isLoading = !1;
    });
  }
  onScrollEvt(e, t) {
    return a(this, void 0, void 0, function* () {
      e.getScrollOffset();
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          yield this.refresh();
      }
    });
  }
};
_.RELOAD = "RELOAD";
n([C(l.default)], _.prototype, "gameIcon", void 0);
n([C(cc.Label)], _.prototype, "totalLabel", void 0);
n([C(cc.Label)], _.prototype, "nameLabel", void 0);
n([C(r.default)], _.prototype, "backBtn", void 0);
n([C(c.default)], _.prototype, "gameList", void 0);
n([C(y.default)], _.prototype, "myDetialCell", void 0);
_ = i = n([v], _);
exports.default = _;