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
const a = e("../../Frame/Panel"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Game/Hortor"),
  l = e("../../Frame/image-share"),
  c = e("../../Frame/CrossPlatform"),
  d = e("../../CustomUI/Button"),
  h = e("../../Frame/Share"),
  p = e("../../Frame/CrossPlatform"),
  u = e("../../Frame/Top"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends a.default {
  constructor() {
    super(...arguments);
    this.closeBg = null;
    this.scrollList = null;
    this.imgShareHelper = null;
    this.useTricks = !1;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.scrollList.node.on(s.default.CLICK_ITEM, this.onClickItem, this);
    this.closeBg.on(d.default.CLICK, this.closePanel, this);
    this.imgShareHelper.node.active = !1;
  }
  setData(e) {
    this.data = e;
    let t = this.data.success;
    this.data.success = () => {
      t && t();
      this.closePanel();
    };
    let o = [];
    e.talk;
    if (r.Hortor.isApp()) o.push({
      icon: "qq",
      name: "QQ"
    });else if (c.tt) o.push({
      icon: "tictok",
      name: "抖音"
    });else if (c.wx) o.push({
      icon: "wechat",
      name: "微信"
    });else {
      o.push({
        icon: "talk",
        name: "Copy Link"
      });
      o.push({
        icon: "facebook",
        name: "Facebook"
      });
    }
    this.scrollList.setDataArr(o);
  }
  onClickItem(e, t) {
    return n(this, void 0, void 0, function* () {
      switch (t.name) {
        case "QQ":
          r.Hortor.isApp() && h.Share.appShare2QQ(this.data, this.imgShareHelper);
          break;
        case "微信":
          r.Hortor.isApp() ? h.Share.appShare2WX(this.data, this.imgShareHelper) : h.Share.miniShare2WX(this.data);
          break;
        case "抖音":
          h.Share.miniShare2TT(this.data);
          break;
        case "论坛":
          h.Share.share2Talk(this.data);
          break;
        case "Copy Link":
          let e = "https://h5.julianseditor.com";
          e = e + "?" + this.data.query;
          p.crossPlatform.setClipboardData({
            data: e,
            success: () => {
              u.default.showToast("Link copied~");
            }
          });
          break;
        case "Facebook":
          h.Share.share2Facebook(this.data);
      }
    });
  }
};
i([f(cc.Node)], g.prototype, "closeBg", void 0);
i([f(s.default)], g.prototype, "scrollList", void 0);
i([f(l.default)], g.prototype, "imgShareHelper", void 0);
g = i([m], g);
exports.default = g;