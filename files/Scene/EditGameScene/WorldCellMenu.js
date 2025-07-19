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
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/TweenUtil"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/Mng"),
  u = e("./EditGameScene"),
  m = e("./WorldCell"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.firstBtn = null;
    this.optionBtn = null;
    this.deleteBtn = null;
    this.copyBtn = null;
    this.worldId = null;
    this.gameData = null;
    this.worldCell = null;
    this.oriParent = null;
  }
  onLoad() {
    this.firstBtn.node.on(s.default.CLICK, this.onFirstBtnTap, this);
    this.optionBtn.node.on(s.default.CLICK, this.onOptionBtnTap, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtnTap, this);
    this.copyBtn.node.on(s.default.CLICK, this.onCopyBtnTap, this);
  }
  show(e) {
    this.worldId = e.worldId;
    this.worldCell = e;
    if (e.worldData.belongGameId) {
      this.deleteBtn.node.active = !1;
      this.optionBtn.node.active = !1;
      this.firstBtn.node.active = !1;
    } else {
      this.deleteBtn.node.active = !0;
      this.optionBtn.node.active = !0;
      this.firstBtn.node.active = this.worldId !== this.gameData.firstWorldId;
    }
    this.node.active = !0;
    let t = h.Util.convertPosition(e.node, this.node.parent);
    this.node.x = t.x + e.node.width / 2;
    this.node.y = t.y - e.node.height / 2;
  }
  onTopNodeTouch() {
    this.hide();
  }
  hide() {
    this.node.active = !1;
  }
  onFirstBtnTap() {
    r.default.ins.findScene(u.default).setFirstWorld(this.worldId);
    this.hide();
  }
  onOptionBtnTap() {
    return n(this, void 0, void 0, function* () {
      let e = yield p.Mng.Ins.worldMng.loadOne(this.worldId, !0);
      r.default.ins.OpenPanelByName("WorldRenamePanel", t => {
        t.setData(e);
      });
      this.hide();
    });
  }
  onDeleteBtnTap() {
    r.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "真的要删除这个地图吗？";
      e.setLeftBtn({
        text: "删除",
        color: d.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          yield p.Mng.Ins.worldMng.delete(this.worldId, this.gameData);
          this.worldCell.node.active = !1;
          this.hide();
          this.gameData.firstWorldId == this.worldId && this.gameData.worldIds.length > 0 && r.default.ins.findScene(u.default).setFirstWorld(this.gameData.worldIds[0]);
        })
      });
      e.setRightBtn({
        text: "关闭",
        color: d.UIColor.blue
      });
    });
    this.hide();
  }
  onCopyBtnTap() {
    return n(this, void 0, void 0, function* () {
      l.default.showLoading("正在复制地图");
      this.worldCell.refreshWorldData();
      let e = yield p.Mng.Ins.worldMng.loadOne(this.worldId, !0),
        t = {
          id: null,
          info: {
            name: e.info.name + a.I18nMgr.getI18nStringByZh("-副本"),
            type: e.info.type,
            size: {
              col: e.info.size.col,
              row: e.info.size.row
            }
          },
          layoutMin: h.Util.zip(e.worldLayout)
        };
      if (!(yield p.Mng.Ins.worldMng.create(t, this.gameData))) {
        l.default.hideLoading("复制失败");
        return;
      }
      let o = cc.instantiate(this.worldCell.node);
      this.worldCell.node.parent.addChild(o);
      exports.active = !0;
      let i = o.getComponent(m.default);
      yield i.setData(t.id, this.gameData);
      l.default.hideLoading("复制成功");
      c.TweenUtil.applyAppear({
        node: o
      });
      this.gameData.worldIds.find(e => e == this.gameData.firstWorldId) || r.default.ins.findScene(u.default).setFirstWorld(t.id);
      let s = yield p.Mng.Ins.worldMng.loadOne(t.id, !0);
      r.default.ins.Enter("EditWorldScene", e => n(this, void 0, void 0, function* () {
        e.setData(this.gameData, s);
      }));
    });
  }
};
i([g(s.default)], y.prototype, "firstBtn", void 0);
i([g(s.default)], y.prototype, "optionBtn", void 0);
i([g(s.default)], y.prototype, "deleteBtn", void 0);
i([g(s.default)], y.prototype, "copyBtn", void 0);
y = i([f], y);
exports.default = y;