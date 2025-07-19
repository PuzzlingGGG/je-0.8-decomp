"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/GameIcon"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.nameLabel = null;
    this.playLabel = null;
    this.thumbLabel = null;
    this.collectLabel = null;
    this.hurryLabel = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.nameLabel.string = s.Util.clampStr(e.name, 12, "..");
    this.playLabel.string = e.playCnt + "";
    this.thumbLabel.string = e.thumbCnt + "";
    this.collectLabel.string = e.collectionCnt + "";
    this.hurryLabel.string = e.hurryCnt + "";
    this.gameIcon.loadUrl(e.iconTextureName);
  }
};
i([l(n.default)], c.prototype, "gameIcon", void 0);
i([l(cc.Label)], c.prototype, "nameLabel", void 0);
i([l(cc.Label)], c.prototype, "playLabel", void 0);
i([l(cc.Label)], c.prototype, "thumbLabel", void 0);
i([l(cc.Label)], c.prototype, "collectLabel", void 0);
i([l(cc.Label)], c.prototype, "hurryLabel", void 0);
c = i([r], c);
exports.default = c;