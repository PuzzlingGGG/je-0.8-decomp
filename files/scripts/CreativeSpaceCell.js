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
const a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/GameIcon"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../Frame/NetworkMgr"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/GamePackageMng"),
  m = e("../../Game/Player/Mng"),
  f = e("../GameCoverScene/GameCoverScene"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.dot = null;
    this.dotLabel = null;
    this.nameLabel = null;
    this.select = null;
    this.playBtn = null;
    this.detailBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(l.default.SET_DATA, this.setData, this);
    this.node.on(l.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.playBtn.node.on(s.default.CLICK, this.onPlayBtn, this);
    this.detailBtn.node.on(s.default.CLICK, this.onDetailBtn, this);
  }
  setData(e) {
    this.data = e;
    this.gameIcon.loadUrl(e.iconTextureName);
    this.nameLabel.string = p.Util.clampStr(e.name, 7, "..");
    this.dot.node.active = e.isFirst;
  }
  onStateChange(e) {
    this.select.active = e;
    this.playBtn.node.active = e;
    this.detailBtn.node.active = e;
  }
  onPlayBtn() {
    return n(this, void 0, void 0, function* () {
      let e = yield u.default.Ins.load(this.data.gameDataCdnUrl);
      if (!e) {
        h.default.hideLoading();
        return;
      }
      if (!e) return;
      m.Mng.switchGamePackage(e);
      let t = yield m.Mng.Ins.gameMng.loadOne(this.data.id);
      yield m.Mng.Ins.variableMng.switchGame(t);
      d.default.ins.Enter("GameScene", e => {
        e.mode = "Prod";
        e.play(t);
        let o = orange.TimeUtil.serverTime;
        e.backCall = () => n(this, void 0, void 0, function* () {
          let t = orange.TimeUtil.serverTime,
            i = {
              id: this.data.id,
              playTime: (t - o) / 1e3
            };
          yield c.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_PlayGameStatistics,
            params: i
          }, a.Game_RPlayGameStatistics);
          e.backCall = null;
        });
      });
      if (!this.data.isPlay) {
        let e = {
            ids: [this.data.id]
          },
          t = yield c.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_PlayGames,
            params: e
          }, a.Game_RPlayGames);
        if (t) {
          this.data.playCnt = t.playCntList[0] || 0;
          this.data.isPlay = !0;
        }
      }
    });
  }
  onDetailBtn() {
    d.default.ins.Enter("GameCoverScene", e => {
      e instanceof f.default && e.setData(this.data.id);
    }, d.ShiftAnima.moveRightShift);
  }
};
i([y(r.default)], v.prototype, "gameIcon", void 0);
i([y(cc.Sprite)], v.prototype, "dot", void 0);
i([y(cc.Label)], v.prototype, "dotLabel", void 0);
i([y(cc.Label)], v.prototype, "nameLabel", void 0);
i([y(cc.Node)], v.prototype, "select", void 0);
i([y(s.default)], v.prototype, "playBtn", void 0);
i([y(s.default)], v.prototype, "detailBtn", void 0);
v = i([g], v);
exports.default = v;