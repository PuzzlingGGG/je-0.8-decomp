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
  r = e("../../Frame/AD"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/Mng"),
  u = e("../../Game/Player/TriggerMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends c.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.sprite = null;
    this.btn = null;
    this.gameData = null;
    this.extra = null;
    this.sourceNode = null;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      this.btn.node.on(s.default.CLICK, this.onOkBtn, this);
    });
  }
  setData(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.gameData = e;
      this.extra = t;
      this.sourceNode = o;
      t.str ? this.titleLabel.string = t.str : this.titleLabel.string = "奖励说明";
      if (t.url) {
        this.node.height = 650;
        yield p.Mng.Ins.spriteMng.setSprite(this.sprite, t.url, 250);
      } else {
        this.sprite.node.active = !1;
        h.Util.updateLabel(this.titleLabel);
        this.node.height = this.titleLabel.node.height + 300;
      }
    });
  }
  onOkBtn() {
    let e = this.extra,
      t = this.sourceNode;
    r.AD.hasAD() ? r.AD.showVideoAd({
      id: r.AdUnitId.GameAD,
      succ: () => n(this, void 0, void 0, function* () {
        this.closePanel();
        let o = {
            targetId: this.gameData.playerId,
            name: e.str,
            textureName: e.url,
            gameId: this.gameData.id
          },
          i = yield l.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_AddOtherCoinByAdvert,
            params: o
          }, a.Game_RAddOtherCoinByAdvert);
        if (i) {
          r.AD.addCoinByAdvertCnt = i.addCoinByAdvertCnt;
          e.onSucc && u.default.Ins.emitTrigger(e.onSucc, t);
        }
      }),
      fail: () => {
        e.onFail && u.default.Ins.emitTrigger(e.onFail, t);
      }
    }) : d.default.showToast("暂无广告");
  }
};
i([f(cc.Label)], g.prototype, "titleLabel", void 0);
i([f(cc.Sprite)], g.prototype, "sprite", void 0);
i([f(s.default)], g.prototype, "btn", void 0);
g = i([m], g);
exports.default = g;