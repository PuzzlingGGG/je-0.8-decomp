"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/GameIcon"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Share"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/Util"),
  d = e("../../Game/GameEnv"),
  h = e("../../Game/Hortor"),
  p = e("../../Game/Player/TalkMng"),
  u = e("../../Game/Player/TriggerMng"),
  m = e("../../Role"),
  f = e("../../TGA"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends s.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.gameIcon = null;
    this.btn = null;
    this.gameData = null;
    this.extra = null;
    this.sourceNode = null;
  }
  onLoad() {
    super.onLoad();
    this.btn.node.on(n.default.CLICK, this.onOkBtn, this);
  }
  setData(e, t, o) {
    this.gameData = e;
    this.extra = t;
    this.sourceNode = o;
    this.gameIcon.loadUrl(e.iconTextureName);
    t.str ? this.titleLabel.string = t.str : this.titleLabel.string = "你喜欢我的游戏吗？\n分享给好友吧！";
  }
  onOkBtn() {
    let e = {
        type: "game",
        isMine: this.gameData.playerId == m.default.Ins.role.id,
        cyGameId: this.gameData.id
      },
      t = {
        shareType: "shareGame",
        title: h.Hortor.isApp() ? `《${this.gameData.name}》` : `《${this.gameData.name}》${this.gameData.advert}`,
        desc: this.gameData.advert,
        imageUrl: "",
        query: c.Util.toQueryStr(e),
        imageName: this.gameData.iconTextureName,
        talk: {
          title: "",
          sections: [{
            type: p.TalkSectionType.Game,
            gameId: this.gameData.id
          }]
        },
        success: () => {
          l.default.showToast("分享成功");
          this.closePanel();
          this.extra.onSucc && u.default.Ins.emitTrigger(this.extra.onSucc, this.sourceNode);
          f.TGA.track("share", e);
        },
        fail: () => {
          l.default.showToast("分享失败");
          this.extra.onFail && u.default.Ins.emitTrigger(this.extra.onFail, this.sourceNode);
        }
      };
    this.gameData.iconTextureName && "icon1" !== this.gameData.iconTextureName ? t.imageUrl = d.gameEnv.fileCDN + this.gameData.iconTextureName : delete t.imageUrl;
    r.Share.share(t);
  }
};
i([y(cc.Label)], v.prototype, "titleLabel", void 0);
i([y(a.default)], v.prototype, "gameIcon", void 0);
i([y(n.default)], v.prototype, "btn", void 0);
v = i([g], v);
exports.default = v;