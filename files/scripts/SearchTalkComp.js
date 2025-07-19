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
  r = e("../../Frame/CrossPlatform"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/CreditMng"),
  p = e("../../Game/Player/DynamicMng"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.block = null;
    this.editBox = null;
    this.searchHelp = null;
    this.oldSearchLabel = null;
    this.clearSearchBtn = null;
    this.oldSearchBtn = null;
    this.closeBtn = null;
  }
  onLoad() {
    this.clearSearchBtn.node.on(s.default.CLICK, this.onClearSearchBtn, this);
    this.closeBtn.node.on(s.default.CLICK, this.closeSearch, this);
    this.block.on(cc.Node.EventType.TOUCH_END, this.onClickBlock, this);
    this.closeSearch();
  }
  start() {
    this.showSearchHelp(!1);
  }
  closeSearch() {
    this.showSearchHelp(!1);
    r.crossPlatform.hideKeyboard({});
    this.editBox.string = "";
    this.closeBtn.node.active = !1;
  }
  onClickBlock() {
    r.crossPlatform.hideKeyboard({});
    this.showSearchHelp(!1);
  }
  showSearchHelp(e) {
    this.searchHelp.active = e;
    this.block.active = e;
  }
  onSearchBagin(e) {
    return n(this, void 0, void 0, function* () {
      this.showSearchHelp(!0);
      this.block.active = !0;
      this.closeBtn.node.active = !0;
      let e = r.crossPlatform.getStorageSync("oldSearchTalkList") || [];
      this.oldSearchLabel.node.active = e.length > 0;
      this.oldSearchBtn.node.parent.active = e.length > 0;
      d.Util.makeBro(this.oldSearchBtn.node, e.length, (t, o) => {
        let i = t.getComponent(s.default);
        i.label.string = d.Util.clampStr(e[o], 15, "..");
        i.node.off(s.default.CLICK, this.onOldSearchBtn, this);
        i.node.on(s.default.CLICK, this.onOldSearchBtn, this);
      });
    });
  }
  onSearchEnd(e) {
    return n(this, void 0, void 0, function* () {
      this.closeBtn.node.active = !1;
      this.showSearchHelp(!1);
      this.searchTalk(e.textLabel.string);
    });
  }
  onOldSearchBtn(e) {
    this.showSearchHelp(!1);
    let t = e.target.getComponent(s.default);
    this.editBox.string = t.label.string;
    this.searchTalk(t.label.string);
  }
  onClearSearchBtn() {
    r.crossPlatform.removeStorageSync("oldSearchTalkList");
    d.Util.makeBro(this.oldSearchBtn.node, 0);
    this.oldSearchLabel.node.active = !1;
  }
  searchTalk(e) {
    return n(this, void 0, void 0, function* () {
      this.showSearchHelp(!1);
      if (h.CreditMng.Ins.credit <= 1) {
        c.default.showToast("近期违规，不可搜索帖子");
        return;
      }
      let t = [];
      if (e) if (p.DynamicMng.Ins.isInspectVersion()) t = [];else {
        c.default.showLoading("搜索中");
        let o = {
            searchName: e,
            start: 0,
            end: 15
          },
          i = yield l.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_SearchTalk,
            params: o
          }, a.Game_RSearchTalk);
        i && (t = i.talkList);
        c.default.hideLoading();
      }
      if (t && t.length > 0) {
        let o = r.crossPlatform.getStorageSync("oldSearchTalkList") || [],
          i = o.indexOf(e);
        i >= 0 && o.splice(i, 1);
        o.unshift(e);
        o = o.slice(0, 8);
        r.crossPlatform.setStorageSync("oldSearchTalkList", o);
        console.log(t);
      } else c.default.showToast("找不到帖子");
    });
  }
};
i([m(cc.Node)], f.prototype, "block", void 0);
i([m(cc.EditBox)], f.prototype, "editBox", void 0);
i([m(cc.Node)], f.prototype, "searchHelp", void 0);
i([m(cc.Label)], f.prototype, "oldSearchLabel", void 0);
i([m(s.default)], f.prototype, "clearSearchBtn", void 0);
i([m(s.default)], f.prototype, "oldSearchBtn", void 0);
i([m(s.default)], f.prototype, "closeBtn", void 0);
f = i([u], f);
exports.default = f;