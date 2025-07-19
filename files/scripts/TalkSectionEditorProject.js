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
  r = e("../../CustomUI/GameIcon"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/Mng"),
  p = e("../../Game/Player/TalkMng"),
  u = e("./TalkSectionEditorBase"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = i = class extends u.default {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.nameLabel = null;
    this.playBtn = null;
    this.openBtn = null;
    this.worldNode = null;
    this.gameId = "";
    this.gameData = null;
    this.worldDatas = [];
    this.open = !1;
  }
  onLoad() {
    this.refresh();
    this.node.on(s.default.CLICK, this.onClick, this);
    this.playBtn.node.on(s.default.CLICK, this.onPlayBtn, this);
    this.openBtn.node.on(s.default.CLICK, this.onOpenBtn, this);
  }
  reset() {
    this.open = !1;
    this.gameId = "";
    this.gameData = null;
    this.worldDatas = [];
    this.refresh();
  }
  setData(e) {
    return a(this, void 0, void 0, function* () {
      this.gameId = e.gameId;
      this.refresh();
    });
  }
  refresh() {
    return a(this, void 0, void 0, function* () {
      let e = this.gameId;
      d.Util.makeBro(this.worldNode, 0);
      d.Util.updateLayout(this.node);
      this.playBtn.node.active = !1;
      this.openBtn.node.active = !1;
      let t = null;
      e && (t = yield h.Mng.Ins.gameMng.loadOne(e));
      this.gameData = t;
      if (t) {
        this.playBtn.node.active = !0;
        this.nameLabel.string = t.name;
        this.gameIcon.loadUrl(t.iconTextureName);
        let e = yield h.Mng.Ins.worldMng.loadMany(t.worldIds);
        this.worldDatas = e;
        let o = e.length,
          n = o > i.overflowCnt;
        this.openBtn.node.active = n;
        this.open || (o = Math.min(o, i.overflowCnt));
        d.Util.makeBro(this.worldNode, o, (o, i) => {
          let n = e[i],
            r = d.Util.searchChild(o, "nameLabel").getComponent(cc.Label),
            c = d.Util.searchChild(o, "editBtn").getComponent(s.default);
          r.string = n.info.name;
          c.node.targetOff(this);
          c.node.on(s.default.CLICK, () => a(this, void 0, void 0, function* () {
            n = yield h.Mng.Ins.worldMng.loadOne(n.id, !0);
            l.default.ins.Enter("EditWorldScene", e => {
              e.setDataByTalkProject(!1, t, n);
            });
          }), this);
        });
        d.Util.updateAllLayout(this.node);
        this.refreshOpenBtn();
      } else {
        this.gameIcon.loadUrl("icon1");
        this.nameLabel.string = "点我选择游戏";
        this.openBtn.node.active = !1;
      }
    });
  }
  getData() {
    return {
      type: p.TalkSectionType.Project,
      gameId: this.gameId
    };
  }
  onClick() {
    l.default.ins.OpenPanelByName("SelectGamePanel", e => {
      e.setData(!1, !1);
      e.call = e => {
        this.gameId = e;
        this.refresh();
      };
    });
  }
  onPlayBtn() {
    this.gameData.worldIds.length <= 0 ? c.default.showToast("游戏至少包含一个地图") : l.default.ins.Enter("GameScene", e => {
      e.mode = "Prod";
      e.play(this.gameData);
    });
  }
  onOpenBtn() {
    this.open = !this.open;
    this.refresh();
  }
  refreshOpenBtn() {
    this.openBtn.label.string = this.open ? "收起" : `展开剩余地图(${this.worldDatas.length - i.overflowCnt})`;
  }
};
g.overflowCnt = 3;
n([f(r.default)], g.prototype, "gameIcon", void 0);
n([f(cc.Label)], g.prototype, "nameLabel", void 0);
n([f(s.default)], g.prototype, "playBtn", void 0);
n([f(s.default)], g.prototype, "openBtn", void 0);
n([f(cc.Node)], g.prototype, "worldNode", void 0);
g = i = n([m], g);
exports.default = g;