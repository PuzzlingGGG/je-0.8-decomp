"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../CustomUI/DropDownBox"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/ScreenRect"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/TweenUtil"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/AssetGroupMng"),
  m = e("../../Game/Player/Mng"),
  f = e("../../Game/World/TouchWorldCtrl"),
  g = e("../../GameData/GameTypeDefine"),
  y = e("./EditWorldScene"),
  v = e("./Page/EditPageBase"),
  {
    ccclass: C,
    property: _
  } = cc._decorator;
let S = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.pageToggleGroup = null;
    this.touchWorldCtrl = null;
    this.emptyLabel = null;
    this.pageNodes = [];
    this.filter = null;
    this._editPages = [];
  }
  onLoad() {
    this.pageToggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onPageToggleChange, this);
    this.touchWorldCtrl.node.on(f.default.BRUSH_TILE, this.onBrushTile, this);
    this.filter.node.on(a.default.SELECT_CHANGE, this.onGroupChange, this);
    this.filter.list.node.on(s.default.CLICK_ITEM, this.onClickCreate, this);
    this.filter.list.canSelect = e => !e.isCreate;
    cc.game.on("refreshElementBox", this.refresh, this);
    cc.game.on("EditAssetGroupPanel.deleteGroup", this.onGroupDeleted, this);
    cc.game.on("ActorGroupFilterCell.onClickEdit", this.onClickEdit, this);
    for (let e of this.pageNodes) this._editPages.push(e.getComponent(v.EditPageBase));
  }
  onDestroy() {
    cc.game.off("refreshElementBox", this.refresh, this);
    cc.game.off("EditAssetGroupPanel.deleteGroup", this.onGroupDeleted, this);
    cc.game.off("ActorGroupFilterCell.onClickEdit", this.onClickEdit, this);
  }
  onClickEdit() {
    this.filter.close();
  }
  onGroupDeleted() {
    this.refrershFilter();
    let e = this.filter.dataArr;
    this.filter.selectByIdx(e.length - 1);
  }
  onEnable() {
    this.node.height = .32 * c.default.height;
  }
  onPageToggleChange(e) {
    for (let t = 0; t < this.pageNodes.length; t++) this.pageNodes[t].active = t == e;
  }
  onBrushTile(e) {
    this.pageNodes[this.pageToggleGroup.idx].emit(f.default.BRUSH_TILE, e);
  }
  show(e = !1) {
    if (e || !this.node.active) {
      this.getComponent(cc.Widget).bottom = -this.node.height;
      p.Util.updateAllWidget(this.node);
      d.default.blockInput(!0, "showElementBox");
      this.node.active = !0;
      cc.tween(this.node).to(.2, {
        y: this.node.y + this.node.height
      }, {
        easing: h.Easing.backIn
      }).call(() => {
        d.default.blockInput(!1, "showElementBox");
        cc.game.emit(i.ElementBox_ShowEnd);
      }).start();
    }
  }
  hide() {
    if (!this.node.active) return;
    let e = this.getComponent(cc.Widget);
    e.bottom = 0;
    e.updateAlignment();
    d.default.blockInput(!0, "hideElementBox");
    cc.tween(this.node).to(.2, {
      y: this.node.y - this.node.height
    }, {
      easing: h.Easing.backOut
    }).call(() => {
      this.node.active = !1;
      d.default.blockInput(!1, "hideElementBox");
    }).start();
  }
  refrershFilter() {
    let e = l.default.ins.findScene(y.default),
      t = [];
    t.push({
      str: "创建新分组",
      isCreate: !0,
      canEdit: !1,
      delCreate: null
    });
    let o = m.Mng.Ins.assetGroupMng.customGroups;
    for (let e of o) t.push({
      str: e.groupName,
      canEdit: !0
    });
    let i = m.Mng.Ins.assetGroupMng.extra.groupName;
    i && t.push({
      str: i,
      canEdit: !1
    });
    t.push({
      str: u.default.RpgGroupName,
      canEdit: !1
    });
    t.push({
      str: u.default.JumpGroupName,
      canEdit: !1
    });
    t.push({
      str: u.default.AllGroupName,
      canEdit: !1
    });
    let n = this.filter.list.prefabs[0].height,
      a = t.length * n;
    a = Math.min(a, 440);
    this.filter.list.node.height = a;
    this.getComponent(cc.Widget).bottom = 0;
    p.Util.updateAllWidget(this.filter.list.node);
    let s = t.findIndex(e => e.str == m.Mng.Ins.assetGroupMng.curGroupName);
    if (s < 0) {
      e.worldData.info.type == g.WorldType.Jump && (s = t.findIndex(e => e.str == u.default.JumpGroupName));
      e.worldData.info.type == g.WorldType.Rpg && (s = t.findIndex(e => e.str == u.default.RpgGroupName));
    }
    this.filter.setDataArr(t, s);
  }
  refreshCurPage() {
    this._editPages[this.pageToggleGroup.idx].refreshList();
  }
  onGroupChange(e, t, o) {
    if (o) {
      m.Mng.Ins.assetGroupMng.curGroupName = t.str;
      this.refreshCurPage();
    }
  }
  onClickCreate(e, t, o) {
    if (t && t.isCreate) {
      this.filter.close();
      if (m.Mng.Ins.assetGroupMng.customGroups.length >= 10) {
        d.default.showToast("最多可创建10个分组");
        return;
      }
      l.default.ins.OpenPanelByName("ActorGroupCreatePanel", e => {
        e.setData(!0, e => {
          e && this.refresh();
        });
      });
    }
  }
  refresh() {
    this.refrershFilter();
    this.refreshCurPage();
  }
};
S.ElementBox_ShowEnd = "ElementBox_ShowEnd";
n([_(r.default)], S.prototype, "pageToggleGroup", void 0);
n([_(f.default)], S.prototype, "touchWorldCtrl", void 0);
n([_(cc.Label)], S.prototype, "emptyLabel", void 0);
n([_({
  type: [cc.Node],
  displayName: "pageNodes"
})], S.prototype, "pageNodes", void 0);
n([_(a.default)], S.prototype, "filter", void 0);
S = i = n([C], S);
exports.default = S;