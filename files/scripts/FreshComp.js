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
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/Util"),
  c = e("../../../Game/Player/DiscoverMng"),
  d = e("../GameCell"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameCell = null;
    this.moreBtn = null;
    this.spaceX = 10;
    this.spcaeY = 10;
    this.speed = 20;
    this.data = null;
    this.colMax = 5;
  }
  onLoad() {
    this.moreBtn.node.on(a.default.CLICK, this.onMoreBtn, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
    let e = 0,
      t = -this.gameCell.node.height / 2,
      o = 0,
      i = 0;
    l.Util.makeBro(this.gameCell.node, 10, n => {
      if (i >= this.colMax) {
        i = 0;
        e = ++o % 2 ? -(n.width + this.spaceX) / 2 : 0;
        t -= n.height + this.spcaeY;
      }
      e += n.width / 2;
      n.x = e;
      n.y = t;
      e += n.width / 2 + this.spaceX;
      i++;
    });
  }
  setData(e) {
    this.data = e;
    l.Util.makeBro(this.gameCell.node, e.games.length, (t, o) => {
      let i = t.getComponent(d.default),
        n = e.games[o],
        a = orange.TimeUtil.serverTime;
      i.setData(n, a);
    });
  }
  update(e) {
    let t = this.gameCell.node.parent;
    for (let o = 0; o < t.childrenCount; o++) {
      let i = t.children[o];
      i.x -= e * this.speed;
      i.x + i.width / 2 < 0 && (i.x += this.colMax * (i.width + this.spaceX));
    }
  }
  onMoreBtn() {
    r.default.ins.Enter("GameListScene", e => n(this, void 0, void 0, function* () {
      e.setData({
        title: "新鲜出炉",
        games: c.default.Ins.freshGames.concat(),
        from: "FreshCompMore",
        appendFunc: () => n(this, void 0, void 0, function* () {
          return c.default.Ins.appendLoadFreshGames(20);
        })
      });
    }));
  }
};
i([p(d.default)], u.prototype, "gameCell", void 0);
i([p(a.default)], u.prototype, "moreBtn", void 0);
u = i([h], u);
exports.default = u;