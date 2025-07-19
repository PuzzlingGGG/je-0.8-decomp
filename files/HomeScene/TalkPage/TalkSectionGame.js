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
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/GameIcon"),
  r = e("../../../CustomUI/ScrollList"),
  l = e("../../../Frame/SceneManager"),
  c = e("../../../Game/Player/GameCellDataMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.nameLabel = null;
    this.introLabel = null;
    this.playLabel = null;
    this.thumbLabel = null;
    this.collectLabel = null;
    this.hurryLabel = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.node.on(a.default.CLICK, this.onClick, this);
  }
  setData(e) {
    this.data = e;
    this.refresh();
  }
  onClick() {
    l.default.ins.Enter("GameCoverScene", e => {
      e.setData(this.data.gameId);
    });
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = null;
      this.data.gameId && (e = (yield c.default.Ins.loadGames([this.data.gameId]))[0]);
      if (e) {
        this.nameLabel.string = e.name;
        this.introLabel.string = e.advert;
        this.playLabel.string = e.playCnt + "";
        this.thumbLabel.string = e.thumbCnt + "";
        this.collectLabel.string = e.collectionCnt + "";
        this.hurryLabel.string = e.hurryCnt + "";
        this.gameIcon.loadUrl(e.iconTextureName);
      } else {
        this.nameLabel.string = "游戏链接失效啦";
        this.introLabel.string = "";
        this.playLabel.string = "--";
        this.thumbLabel.string = "--";
        this.collectLabel.string = "--";
        this.hurryLabel.string = "--";
        this.gameIcon.loadUrl("icon1");
      }
    });
  }
  calcuH(e) {
    return this.node.height;
  }
};
i([h(s.default)], p.prototype, "gameIcon", void 0);
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Label)], p.prototype, "introLabel", void 0);
i([h(cc.Label)], p.prototype, "playLabel", void 0);
i([h(cc.Label)], p.prototype, "thumbLabel", void 0);
i([h(cc.Label)], p.prototype, "collectLabel", void 0);
i([h(cc.Label)], p.prototype, "hurryLabel", void 0);
p = i([d], p);
exports.default = p;