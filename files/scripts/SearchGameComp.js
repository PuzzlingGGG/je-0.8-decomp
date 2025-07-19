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
const a = e("../../../i18n/i18nMgr"),
  s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../CustomUI/Button"),
  l = e("../../Frame/CrossPlatform"),
  c = e("../../Frame/NetworkMgr"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/CreditMng"),
  m = e("../../Game/Player/DynamicMng"),
  f = e("../../Game/Player/GameCellDataMng"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.block = null;
    this.editBox = null;
    this.searchHelp = null;
    this.searchGameBtn = null;
    this.searchRoleBtn = null;
    this.oldSearchLabel = null;
    this.clearSearchBtn = null;
    this.oldSearchBtn = null;
  }
  onLoad() {
    this.searchGameBtn.node.on(r.default.CLICK, this.onSearchGameBtn, this);
    this.searchRoleBtn.node.on(r.default.CLICK, this.onSearchRoleBtn, this);
    this.clearSearchBtn.node.on(r.default.CLICK, this.onClearSearchBtn, this);
    this.block.on(cc.Node.EventType.TOUCH_END, this.onClickBlock, this);
  }
  start() {
    this.showSearchHelp(!1);
  }
  onClickBlock() {
    l.crossPlatform.hideKeyboard({});
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
      this.onTextChange(this.editBox.textLabel.string);
      let e = l.crossPlatform.getStorageSync("oldSearchList") || [];
      this.oldSearchLabel.node.active = e.length > 0;
      this.oldSearchBtn.node.parent.active = e.length > 0;
      p.Util.makeBro(this.oldSearchBtn.node, e.length, (t, o) => {
        let i = t.getComponent(r.default);
        i.label.string = p.Util.clampStr(e[o], 15, "..");
        i.node.off(r.default.CLICK, this.onOldSearchBtn, this);
        i.node.on(r.default.CLICK, this.onOldSearchBtn, this);
      });
    });
  }
  onTextChange(e) {
    return n(this, void 0, void 0, function* () {
      this.searchGameBtn.label.string = a.I18nMgr.exceI18nStringByZh('查找"${Util.clampStr(str, 10, "..")}"相关的游戏', [{
        paramName: 'Util.clampStr(str, 10, "..")',
        param: p.Util.clampStr(e, 10, "..")
      }]);
      this.searchRoleBtn.label.string = a.I18nMgr.exceI18nStringByZh('查找"${Util.clampStr(str, 10, "..")}"相关的玩家', [{
        paramName: 'Util.clampStr(str, 10, "..")',
        param: p.Util.clampStr(e, 10, "..")
      }]);
      this.searchGameBtn.node.active = !!e;
      this.searchRoleBtn.node.active = !!e;
    });
  }
  onSearchEnd(e) {
    return n(this, void 0, void 0, function* () {
      this.showSearchHelp(!1);
      this.searchGame(e.textLabel.string);
    });
  }
  onSearchGameBtn() {
    l.crossPlatform.hideKeyboard({});
    this.showSearchHelp(!1);
    let e = this.editBox.textLabel.string;
    this.searchGame(e);
  }
  onSearchRoleBtn() {
    l.crossPlatform.hideKeyboard({});
    this.showSearchHelp(!1);
    let e = this.editBox.textLabel.string;
    this.searchRole(e);
  }
  onOldSearchBtn(e) {
    this.showSearchHelp(!1);
    let t = e.target.getComponent(r.default);
    this.searchGame(t.label.string);
  }
  onClearSearchBtn() {
    l.crossPlatform.removeStorageSync("oldSearchList");
    p.Util.makeBro(this.oldSearchBtn.node, 0);
    this.oldSearchLabel.node.active = !1;
  }
  searchGame(e) {
    return n(this, void 0, void 0, function* () {
      this.showSearchHelp(!1);
      if (u.CreditMng.Ins.credit <= 1) {
        h.default.showToast("近期违规，不可搜索游戏");
        return;
      }
      let t = [];
      if (e) if (m.DynamicMng.Ins.isInspectVersion()) f.default.Ins.cache.forEach(o => {
        o.name.includes(e) && t.push(o);
      });else {
        h.default.showLoading("搜索中");
        let o = {
            searchName: e,
            start: 0,
            end: 15
          },
          i = yield c.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_SearchGame,
            params: o
          }, s.Game_RSearchGame);
        i && (t = i.gameDatas);
        h.default.hideLoading();
      }
      if (t && t.length > 0) {
        let o = l.crossPlatform.getStorageSync("oldSearchList") || [],
          i = o.indexOf(e);
        i >= 0 && o.splice(i, 1);
        o.unshift(e);
        o = o.slice(0, 8);
        l.crossPlatform.setStorageSync("oldSearchList", o);
        d.default.ins.Enter("GameListScene", o => {
          o.setData({
            title: "搜索游戏",
            games: t,
            from: "search",
            appendFunc: () => n(this, void 0, void 0, function* () {
              let o = t.length,
                i = {
                  searchName: e,
                  start: o,
                  end: o + 15
                },
                n = yield c.NetIns.SendCmdAsync({
                  cmd: s.CMDS.Game_SearchGame,
                  params: i
                }, s.Game_RSearchGame);
              return n ? n.gameDatas : [];
            })
          });
        });
      } else h.default.showToast("找不到游戏");
    });
  }
  searchRole(e) {
    return n(this, void 0, void 0, function* () {
      if (m.DynamicMng.Ins.isInspectVersion()) {
        h.default.showToast("找不到玩家");
        return;
      }
      let t = [];
      if (e) {
        h.default.showLoading("搜索中");
        let o = {
            searchName: e,
            start: 0,
            end: 15
          },
          i = yield c.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_SearchRole,
            params: o
          }, s.Game_RSearchRole);
        i && (t = i.roleDatas);
        h.default.hideLoading();
      }
      t && t.length > 0 ? d.default.ins.Enter("RoleListScene", o => {
        o.setData({
          title: "搜索玩家",
          roles: t,
          from: "search",
          appendFunc: () => n(this, void 0, void 0, function* () {
            let o = t.length,
              i = {
                searchName: e,
                start: o,
                end: o + 15
              },
              n = yield c.NetIns.SendCmdAsync({
                cmd: s.CMDS.Game_SearchRole,
                params: i
              }, s.Game_RSearchGame);
            return n ? n.roleDatas : [];
          })
        });
      }) : h.default.showToast("找不到玩家");
    });
  }
};
i([y(cc.Node)], v.prototype, "block", void 0);
i([y(cc.EditBox)], v.prototype, "editBox", void 0);
i([y(cc.Node)], v.prototype, "searchHelp", void 0);
i([y(r.default)], v.prototype, "searchGameBtn", void 0);
i([y(r.default)], v.prototype, "searchRoleBtn", void 0);
i([y(cc.Label)], v.prototype, "oldSearchLabel", void 0);
i([y(r.default)], v.prototype, "clearSearchBtn", void 0);
i([y(r.default)], v.prototype, "oldSearchBtn", void 0);
v = i([g], v);
exports.default = v;