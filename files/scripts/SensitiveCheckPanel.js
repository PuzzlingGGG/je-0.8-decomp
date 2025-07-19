"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Util"),
  l = e("./SensitiveCheckCell"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends s.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.sensLabel = null;
    this.scrollList = null;
    this.okBtn = null;
    this.items = [];
    this.sensitiveWords = [];
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.closePanel, this);
    this.scrollList.calculateSizeFunc = e => ({
      w: 600,
      h: this.scrollList.prefabs[0].getComponent(l.default).calcuHeight(e)
    });
  }
  setData(e, t) {
    this.items = e;
    this.sensitiveWords = t;
    this.sensLabel.string = "发现敏感词：" + t.join("，");
    let o = [];
    this.items.forEach(e => {
      if (e.str) {
        let i = e.str.toLowerCase().replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\ |\~|\`|\!|\@|\#|\$|\%|\^|\&amp;amp;amp;amp;amp;|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\&amp;amp;amp;quot;|\'|\,|\&amp;amp;amp;amp;lt;|\.|\&amp;amp;amp;amp;gt;|\/|\?]/g, ""),
          n = !1;
        for (let e = 0; e < t.length; e++) {
          let o = t[e];
          if (i.includes(o)) {
            n = !0;
            break;
          }
        }
        o.push({
          str: e.from + "：" + e.str,
          hasSens: n
        });
      }
    });
    this.scrollList.setDataArr(o);
  }
  toAllTxtStyle() {
    this.titleLabel.string = "所有文本";
    this.sensLabel.node.active = !1;
    this.scrollList.node.getComponent(cc.Widget).top = 120;
    r.Util.updateAllWidget(this.scrollList.node);
  }
};
i([d(cc.Label)], h.prototype, "titleLabel", void 0);
i([d(cc.Label)], h.prototype, "sensLabel", void 0);
i([d(a.default)], h.prototype, "scrollList", void 0);
i([d(n.default)], h.prototype, "okBtn", void 0);
h = i([c], h);
exports.default = h;