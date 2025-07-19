"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../CustomUI/Button"),
  s = e("./GSUIItemCondition"),
  r = e("./NodeRender/GSDataNodeRender"),
  l = e("./SimpleNodeList"),
  c = e("../GSSelectDataNodePanel/GSSelectDataNodePanel"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/UIColor"),
  {
    ccclass: p,
    property: u
  } = cc._decorator,
  m = [h.UIColor.yellow],
  f = h.UIColor.blue;
let g, y;
function v(e) {
  for (let t of g) if (t.type == e) return t.color;
  return f;
}
function C() {
  g || (g = [{
    type: n.GSDataNodeType.G_Start,
    color: h.UIColor.blue
  }, {
    type: n.GSDataNodeType.GFLOW_If,
    color: h.UIColor.green
  }, {
    type: n.GSDataNodeType.GFLOW_IfElse,
    color: h.UIColor.green
  }, {
    type: n.GSDataNodeType.GFLOW_WAIT,
    color: h.UIColor.green
  }]);
  y || (y = new Map([[n.GSDataNodeType.G_Start, ["开始"]], [n.GSDataNodeType.GFLOW_If, ["如果"]], [n.GSDataNodeType.GFLOW_IfElse, ["如果", "否则"]], [n.GSDataNodeType.GFLOW_WAIT, ["等待"]], [n.GSDataNodeType.GINTERACTION_Dialog, ["对话"]], [n.GSDataNodeType.GDATA_DropItem, ["掉落"]], [n.GSDataNodeType.GDATA_ChangeBagItem, ["背包"]], [n.GSDataNodeType.GDATA_ChangeVariable, ["变量"]], [n.GSDataNodeType.GDATA_ChangeActorProperty, ["物体"]], [n.GSDataNodeType.GDATA_ChangeHeroProperty, ["主角"]], [n.GSDataNodeType.GSYS_ShowGameWin, ["过关"]], [n.GSDataNodeType.GSYS_ShowGameOver, ["失败"]], [n.GSDataNodeType.GSYS_SwitchMap, ["过关"]], [n.GSDataNodeType.GSYS_SwitchHero, ["主角"]], [n.GSDataNodeType.GSYS_TimeCountDownStart, ["计时"]], [n.GSDataNodeType.GSYS_TimeCountDownStop, ["计时"]], [n.GSDataNodeType.GSYS_SwitchHero, ["主角"]], [n.GSDataNodeType.GSCREEN_CameraShake, ["震屏"]], [n.GSDataNodeType.GSOUND_PlaySfx, ["音效"]]]));
}
let _ = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.root = null;
    this.head = null;
    this.nameBg = null;
    this.nameLabel = null;
    this.error = null;
    this.newBtn = null;
    this.content = null;
    this.frameBtn = null;
    this.info = null;
    this.infoDesc = null;
    this.condition = null;
    this.childCellList = null;
    this._inited = !1;
    this.hasCondition = !1;
    this._depth = 0;
    this._switchIdx = 0;
    this._renderInfo = null;
  }
  get childNodeDatas() {
    return this._childNodeDatas;
  }
  init() {
    if (!this._inited) {
      C();
      this._inited = !0;
      this.newBtn.node.active = !1;
      this.newBtn.node.on(a.default.CLICK, this.onClickNew, this);
      this.frameBtn.node.on(a.default.CLICK, this.onClickFrame, this);
      this.node.on(l.default.ADD_NEW_ITEM, e => {
        this._renderInfo && this._renderInfo.root.emit(l.default.ADD_NEW_ITEM, e);
      }, this);
    }
  }
  setData(e, t = 0, o, i) {
    this.init();
    this._renderInfo = e;
    this._condition = o;
    this._childNodeDatas = i;
    this._depth = e.depth;
    this._switchIdx = t;
    this.onRefresh();
  }
  onRefresh() {
    if (!this._inited) return;
    this.newBtn.node.active = !1;
    let e = m.length;
    this.head.node.color = m[this._depth % e];
    if (this._renderInfo.data) {
      this.content.active = !0;
      this.nameBg.node.color = v(this._renderInfo.data.type);
      this.nameLabel.string = y.get(this._renderInfo.data.type)[this._switchIdx];
      this.error.node.active = this._renderInfo.error;
      this.condition && (this.condition.node.active = this.hasCondition);
      this.infoDesc.node.active = !this.hasCondition;
      this.frameBtn.node.active = this.condition && this.condition.node.active || this.infoDesc.node.active;
      this.hasCondition && this._condition && this.condition ? this.condition.setData(this._condition) : this.infoDesc.string = `<color=#000000>${this._renderInfo.infoDesc}</color>`;
      this.childCellList.node.active = !0;
      if (this._childNodeDatas && this._childNodeDatas.length > 0) {
        this.hasCondition && this._childNodeDatas[this._childNodeDatas.length - 1].type != n.GSDataNodeType.G_Add && this._childNodeDatas.push(n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.G_Add));
        this.childCellList.numberItems = this._childNodeDatas.length;
      } else if (this.hasCondition && this._childNodeDatas) {
        this._childNodeDatas.push(n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.G_Add));
        this.childCellList.numberItems = 1;
      } else this.childCellList.node.active = !1;
    } else {
      this.error.node.active = !1;
      this.content.active = !1;
      this.childCellList.node.active = !1;
    }
  }
  onAddNew() {
    if (!this._childNodeDatas) {
      this._renderInfo.root.emit("OnAddNew");
      return;
    }
    let e = e => {
      let t = this._childNodeDatas.length > 1 ? this._childNodeDatas.length - 1 : 0;
      this._childNodeDatas.splice(t, 0, e);
      this._renderInfo.root.emit(l.default.ADD_NEW_ITEM, e.id);
    };
    e.bind(this);
    d.default.ins.OpenPanelByName("GSSelectDataNodePanel", t => {
      t.setData(null, e);
    });
  }
  onClickNew() {
    this.onAddNew();
  }
  onClickFrame() {
    let e = () => {
      this._renderInfo.root.emit(r.GSDataNodeRenderEvent_Refresh);
    };
    e.bind(this);
    c.default.openEditDataPanel(this._renderInfo.data.type, this._renderInfo.data, e);
  }
};
i([u(cc.Node)], _.prototype, "root", void 0);
i([u(cc.Sprite)], _.prototype, "head", void 0);
i([u(cc.Sprite)], _.prototype, "nameBg", void 0);
i([u(cc.Label)], _.prototype, "nameLabel", void 0);
i([u(cc.Sprite)], _.prototype, "error", void 0);
i([u(a.default)], _.prototype, "newBtn", void 0);
i([u(cc.Node)], _.prototype, "content", void 0);
i([u(a.default)], _.prototype, "frameBtn", void 0);
i([u(cc.Node)], _.prototype, "info", void 0);
i([u(cc.RichText)], _.prototype, "infoDesc", void 0);
i([u(s.default)], _.prototype, "condition", void 0);
i([u(l.default)], _.prototype, "childCellList", void 0);
_ = i([p], _);
exports.default = _;