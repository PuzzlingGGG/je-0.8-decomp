"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.DynamicMng = exports.FunctionEnum = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/CrossPlatform"),
  s = e("../../Frame/NetworkMgr"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/UIColor"),
  c = e("../../Role"),
  d = e("../GameEnv"),
  h = e("../Hortor");
(function (e) {
  e.PublishGame = "PublishGame2";
  e.PublishTalk = "PublishTalk";
  e.PublishGoods = "PublishGoods";
  e.PublishGameTag = "PublishGameTag";
  e.PublishGameComment = "PublishGameComment";
  e.PublishTalkComment = "PublishTalkComment";
  e.PublishUserInfo = "PublishUserInfo";
  e.UserImg = "UserImg";
  e.UserName = "UserName";
  e.FriendScene = "FriendScene";
  e.DiscoverPage = "DiscoverPage";
  e.GoodsPage = "GoodsPage";
  e.GameComment = "GameComment";
  e.TalkComment = "TalkComment";
  e.CreativeGame = "CreativeGame";
  e.PaintAsset = "PaintAsset";
})(o.FunctionEnum || (exports.FunctionEnum = {}));
class p {
  constructor() {
    this.map = new Map();
    this.inspectGameIds = ["GD:14408:27", "GD:5070497:53", "GD:1024699:314", "8877198:1", "GD:6480222:26", "GD:5070497:33", "GD:5070497:24", "GD:6480222:19", "GD:8447584:7", "GD:5070497:15", "GD:5070497:9"];
    this.inspectGoodsIds = ["GI:1338721:1", "GI:239686:1", "GI:93877:1", "GI:175121:2", "GI:33792:1", "GI:1644064:1"];
  }
  init(e) {
    this.map = e;
  }
  loadOne(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.map.get(e);
      if (!t) {
        let o = {
            id: e
          },
          i = yield s.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetOneDynamicConfig,
            params: o
          }, n.Game_RGetOneDynamicConfig);
        if (i) {
          t = i.dynamicConfig;
          0 == Object.keys(t).length && "object" == typeof t && (t = null);
          this.map.set(e, t);
        }
      }
      return t;
    });
  }
  isViolationsName(e) {
    if (!e) return !1;
    let t = e.toLowerCase(),
      o = this.map.get("ViolationsNames") || new Map(),
      i = o.all || [];
    if (h.Hortor.isApp()) {
      let e = h.Hortor.platformSysBigType == h.PlatformSysBigType.Android ? d.gameEnv.androidChannel : "apple";
      i = i.concat(o[e] || []);
    } else a.tt ? i = i.concat(o.tt || []) : a.wx && (i = i.concat(o.wx || []));
    for (let e = 0; e < i.length; e++) {
      let o = i[e];
      if (t.indexOf(o) >= 0) return !0;
    }
    return !1;
  }
  isDisable(e, t) {
    let o = this.map.get("DisableFunction") || {},
      i = null;
    h.Hortor.isApp() ? i = o[d.gameEnv.androidChannel] : a.tt ? i = o.tt : a.wx && (i = o.wx);
    let n = !1 === (null == (i = i || {}) ? void 0 : i[e]);
    n && t && r.default.ins.OpenPanelByName("MessageBox", e => {
      e.titleLabel.string = "提示";
      e.label.string = i.reason || "";
      e.leftBtn.node.active = !1;
      e.setRightBtn({
        text: "好的",
        color: l.UIColor.blue
      });
    });
    return n;
  }
  isGmPlayer() {
    return (this.map.get("GmPlayerIds") || []).indexOf(c.default.Ins.role.id) >= 0;
  }
  isGmDebug() {
    return !h.Hortor.isApp() && !h.Hortor.isMiniGame();
  }
  isInspectVersion() {
    let e = this.map.get("InspectVersionData") || {};
    return h.Hortor.isApp() ? h.Hortor.platformSysBigType == h.PlatformSysBigType.IOS ? e.apple == d.gameEnv.creatorVersion : e[d.gameEnv.androidChannel] == d.gameEnv.creatorVersion : a.tt ? e.tt == d.gameEnv.creatorVersion : void 0;
  }
  isGameSwitchOpen(e) {
    let t = this.map.get("GameSwitchs") || [];
    for (let o of t) if (o.key == e) return o.open;
    return !0;
  }
}
exports.DynamicMng = p;
p.Ins = new p();
p.SW_GS = "SW_GS";
p.SW_GS_REF_NOTCHECK = "SW_GS_REF_NOTCHECK";