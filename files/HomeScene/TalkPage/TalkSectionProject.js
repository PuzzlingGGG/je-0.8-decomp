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
const s = e("../../../CustomUI/Button"),
  r = e("../../../CustomUI/GameIcon"),
  l = e("../../../CustomUI/ScrollList"),
  c = e("../../../Frame/SceneManager"),
  d = e("../../../Frame/Top"),
  h = e("../../../Frame/Util"),
  p = e("../../../Game/Player/Mng"),
  u = e("../../../Game/Player/TalkMng"),
  m = e("./TalkCommentMng"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.nameLabel = null;
    this.playBtn = null;
    this.newWorldBtn = null;
    this.openBtn = null;
    this.worldNode = null;
    this.gameData = null;
    this.worldDatas = [];
    this.open = !1;
    this.showWorlds = !0;
    this.data = null;
  }
  onLoad() {
    this.node.on(l.default.SET_DATA, this.setData, this);
    this.playBtn.node.on(s.default.CLICK, this.onPlayBtn, this);
    this.openBtn.node.on(s.default.CLICK, this.onOpenBtn, this);
    this.newWorldBtn.node.on(s.default.CLICK, this.onNewWorldBtn, this);
  }
  setData(e) {
    this.open = e.open;
    this.data = e;
    this.refresh();
  }
  refresh() {
    let e = this.data.gameId;
    h.Util.makeBro(this.worldNode, 0);
    this.playBtn.node.active = !1;
    this.openBtn.node.active = !1;
    this.newWorldBtn.node.active = !1;
    this.worldNode.parent.active = !1;
    h.Util.updateAllLayout(this.node);
    let t = null;
    e && (t = p.Mng.Ins.gameMng.cache.get(e));
    this.gameData = t;
    if (t) {
      this.nameLabel.string = t.name;
      this.gameIcon.loadUrl(t.iconTextureName);
      if (this.showWorlds) {
        let e = p.Mng.Ins.worldMng.getMany(t.worldIds);
        this.worldDatas = e;
        let o = e.length;
        this.openBtn.node.active = o > i.overflowCnt;
        this.open || (o = Math.min(o, i.overflowCnt));
        this.playBtn.node.active = !0;
        this.newWorldBtn.node.active = !0;
        this.worldNode.parent.active = !0;
        h.Util.makeBro(this.worldNode, o, (o, i) => {
          let n = e[i],
            r = h.Util.searchChild(o, "nameLabel").getComponent(cc.Label),
            l = h.Util.searchChild(o, "editBtn").getComponent(s.default);
          r.string = n.info.name;
          l.node.targetOff(this);
          l.node.on(s.default.CLICK, () => a(this, void 0, void 0, function* () {
            yield p.Mng.switchTalkProject(t.id);
            n = yield p.Mng.Ins.worldMng.loadOne(n.id, !0);
            this.enterEditWorld(t, n);
          }), this);
        });
        this.refreshOpenBtn();
      }
      h.Util.updateAllLayout(this.node);
    } else {
      this.gameIcon.loadUrl("icon1");
      this.nameLabel.string = "游戏已失效";
      this.openBtn.node.active = !1;
    }
  }
  onNewWorldBtn() {
    let e = this.gameData;
    c.default.ins.OpenPanelByName("CreateWorldTypePanel", t => {
      t.onSeleteType = t => {
        c.default.ins.OpenPanelByName("CreateWorldInfoPanel", o => {
          o.setData(t, e);
          exports.onCreate = t => a(this, void 0, void 0, function* () {
            t.id = "test";
            yield p.Mng.switchTalkProject(e.id);
            p.Mng.Ins.worldMng.extraIds.push(t.id);
            p.Mng.Ins.worldMng.extraCache.set(t.id, t);
            this.enterEditWorld(e, t);
          });
        });
      };
    });
  }
  enterEditWorld(e, t) {
    return a(this, void 0, void 0, function* () {
      c.default.ins.Enter("EditWorldScene", o => {
        o.setDataByTalkProject(!1, e, t);
        exports.submitCall = (o, i) => a(this, void 0, void 0, function* () {
          (t = h.Util.deepCopy(t)).worldLayout = i;
          let n = {
            msg: o,
            gameId: e.id,
            worldData: t
          };
          yield m.TalkCommentMng.Ins.sendComment(this.data.talkId, "", n);
          cc.game.emit(u.default.Talk_Refresh);
        });
      });
    });
  }
  onPlayBtn() {
    this.gameData.worldIds.length <= 0 ? d.default.showToast("游戏至少包含一个地图") : c.default.ins.Enter("GameScene", e => {
      e.mode = "Prod";
      e.play(this.gameData);
    });
  }
  onOpenBtn() {
    this.open = !this.open;
    this.data.open = this.open;
    this.refresh();
    cc.game.emit(u.default.Talk_Refresh);
  }
  refreshOpenBtn() {
    this.openBtn.label.string = this.open ? "收起" : `展开剩余地图(${this.worldDatas.length - i.overflowCnt})`;
  }
  calcuH(e) {
    this.setData(e);
    return this.node.height;
  }
};
y.overflowCnt = 3;
n([g(r.default)], y.prototype, "gameIcon", void 0);
n([g(cc.Label)], y.prototype, "nameLabel", void 0);
n([g(s.default)], y.prototype, "playBtn", void 0);
n([g(s.default)], y.prototype, "newWorldBtn", void 0);
n([g(s.default)], y.prototype, "openBtn", void 0);
n([g(cc.Node)], y.prototype, "worldNode", void 0);
y = i = n([f], y);
exports.default = y;