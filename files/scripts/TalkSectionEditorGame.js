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
  s = e("../../CustomUI/GameIcon"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Game/Player/GameCellDataMng"),
  c = e("../../Game/Player/TalkMng"),
  d = e("./TalkSectionEditorBase"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends d.default {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.nameLabel = null;
    this.introLabel = null;
    this.playLabel = null;
    this.thumbLabel = null;
    this.collectLabel = null;
    this.hurryLabel = null;
    this.gameId = "";
  }
  onLoad() {
    this.refresh();
    this.node.on(a.default.CLICK, this.onClick, this);
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      if (this.gameId) {
        let e = (yield l.default.Ins.loadGames([this.gameId]))[0];
        if (e) {
          this.nameLabel.string = e.name;
          this.introLabel.string = e.advert;
          this.playLabel.string = e.playCnt + "";
          this.thumbLabel.string = e.thumbCnt + "";
          this.collectLabel.string = e.collectionCnt + "";
          this.hurryLabel.string = e.hurryCnt + "";
          this.gameIcon.loadUrl(e.iconTextureName);
        } else this.nameLabel.string = "游戏链接失效";
      } else {
        this.nameLabel.string = "点我选择游戏";
        this.introLabel.string = "";
        this.playLabel.string = "--";
        this.thumbLabel.string = "--";
        this.collectLabel.string = "--";
        this.hurryLabel.string = "--";
        this.gameIcon.loadUrl("icon1");
      }
    });
  }
  onClick() {
    r.default.ins.OpenPanelByName("SelectGamePanel", e => {
      e.setData(!0, !0);
      e.call = e => {
        this.gameId = e;
        this.refresh();
      };
    });
  }
  reset() {
    this.gameId = "";
    this.refresh();
  }
  setData(e) {
    this.gameId = e.gameId;
    this.refresh();
  }
  getData() {
    return {
      type: c.TalkSectionType.Game,
      gameId: this.gameId
    };
  }
};
i([p(s.default)], u.prototype, "gameIcon", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "introLabel", void 0);
i([p(cc.Label)], u.prototype, "playLabel", void 0);
i([p(cc.Label)], u.prototype, "thumbLabel", void 0);
i([p(cc.Label)], u.prototype, "collectLabel", void 0);
i([p(cc.Label)], u.prototype, "hurryLabel", void 0);
u = i([h], u);
exports.default = u;