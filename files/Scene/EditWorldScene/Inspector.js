"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../Frame/Pool"),
  r = e("../../Frame/ScreenRect"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/TweenUtil"),
  d = e("./Inspector/ButtonItem"),
  h = e("./Inspector/DropDownBoxItem"),
  p = e("./Inspector/EditBoxItem"),
  u = e("./Inspector/HeadItem"),
  m = e("./Inspector/ToggleItem"),
  f = e("./Inspector/TriggerItem"),
  g = e("../../CustomUI/Button"),
  y = e("./TouchWorldShowGizmos"),
  v = e("./EditWorldScene"),
  C = e("../../Frame/Util"),
  _ = e("../../Frame/SceneManager"),
  S = e("./Inspector/NumberEditBoxItem"),
  I = e("./Inspector/ImgBtnHListItem"),
  G = e("../../Game/Player/Mng"),
  T = e("./Inspector/SpawnMonsterItem"),
  b = e("./Page/PropPage"),
  M = e("../../Game/Player/GuideMng"),
  {
    ccclass: P,
    property: D
  } = cc._decorator;
let w = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.scrollView = null;
    this.headPool = null;
    this.labelPool = null;
    this.buttonPool = null;
    this.intBoxPool = null;
    this.dropDownBoxPool = null;
    this.editBoxPool = null;
    this.numberEditBoxPool = null;
    this.numberEditBoxPool2 = null;
    this.togglePool = null;
    this.triggerPool = null;
    this.spawnMonsterPool = null;
    this.imgBtnHListPool = null;
    this.content = null;
    this.btn_copy = null;
    this.tempData = null;
    this.selectType = "";
  }
  onLoad() {
    this.btn_copy && this.btn_copy.node.on(g.default.CLICK, this.onClickCopy, this);
  }
  onEnable() {
    this.btn_copy && (this.btn_copy.node.active = !!this.tempData && M.default.Ins.isComplete(M.GuideId.EditWorld));
    this.node.height = .4 * r.default.height;
  }
  onClickCopy() {
    return a(this, void 0, void 0, function* () {
      if (this.tempData && "" != this.selectType) {
        let e = _.default.ins.findScene(v.default);
        if (!e) return;
        let t = e.world;
        if (!t) return;
        let o = this.tempData.node.position,
          i = t.tiledMap.getGridPos(o.x, o.y);
        i.iCol++;
        if (i.iCol >= t.tiledMap.nCol) return;
        let n = this.selectType + t.worldLayout.incId++,
          a = this.tempData.data,
          s = C.Util.deepCopy(a);
        s.id = n;
        if ("actor" == this.selectType) {
          let o = t.addActor(i);
          yield o.setData(s);
          (yield o.getTeamGizmo()).setTeam(s.team);
          y.default.Ins.clickActor(o);
          e.cameraDragCtrl.centerOn(o.node);
        } else if ("device" == this.selectType) {
          let o = yield G.Mng.Ins.deviceMng.loadOne(s.confId),
            n = yield t.addDevice(i, o.prefabName);
          yield n.setData(s, o);
          y.default.Ins.clickDevice(n);
          e.cameraDragCtrl.centerOn(n.node);
        } else if ("tile" == this.selectType) {
          let o = t.tiledMap.getTile(i.iCol, i.iRow);
          o || (o = t.tiledMap.addTile(i.iCol, i.iRow));
          yield o.setData(s);
          y.default.Ins.clickTile(o);
          e.cameraDragCtrl.centerOn(o.node);
        } else if ("prop" == this.selectType) {
          let o = yield t.addProp(i);
          yield o.setData(s);
          y.default.Ins.clickProp(o);
          e.cameraDragCtrl.centerOn(o.node);
          cc.game.emit(b.default.PropPage_PUT_PROP, o.conf);
        }
      }
    });
  }
  reset() {
    for (let e = this.content.childrenCount - 1; e >= 0; e--) {
      let t = this.content.children[e];
      t.emit(s.default.PUT);
      t.scale = 1;
    }
  }
  addHead(e, t) {
    t || (t = "UI/error");
    let o = this.headPool.get().getComponent(u.default);
    this.content.addChild(o.node);
    o.setData(e, t);
    return o;
  }
  addLabel(e, t) {
    t || (t = {
      fontSize: 40,
      align: cc.Label.HorizontalAlign.CENTER
    });
    let o = this.labelPool.get().getComponent(cc.Label);
    exports.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
    o.node.width = this.node.width - 50;
    exports.fontSize = t.fontSize;
    exports.horizontalAlign = t.align;
    this.content.addChild(o.node);
    exports.string = e;
    return o;
  }
  addButton(e, t, o) {
    let i = this.buttonPool.get().getComponent(d.default);
    this.content.addChild(i.node);
    i.setData(e, t, o);
    return i;
  }
  addDropDownBox(e, t, o, i) {
    let n = this.dropDownBoxPool.get().getComponent(h.default);
    this.content.addChild(n.node);
    n.setData(e, t, o, i);
    n.node.scaleY = 1;
    return n;
  }
  addImgBtnHList(e, t, o, i) {
    let n = this.imgBtnHListPool.get().getComponent(I.default);
    this.content.addChild(n.node);
    n.setData(e, t, o, i);
    n.node.scaleY = 1;
    return n;
  }
  addEditBox(e, t, o) {
    let i = this.editBoxPool.get().getComponent(p.default);
    this.content.addChild(i.node);
    i.setData(e, t, o);
    return i;
  }
  addNumberEditBox(e, t, o, i, n) {
    let a = this.numberEditBoxPool.get().getComponent(S.default);
    this.content.addChild(a.node);
    a.setData(e, t, e => {
      e = C.Util.clamp(e, o, i);
      a.label_num.string = e;
      n(e);
    });
    return a;
  }
  addNumberEditBox2(e, t, o, i) {
    let n = this.numberEditBoxPool2.get().getComponent(S.default);
    this.content.addChild(n.node);
    n.setDataWithSurfix(e, t, o, i);
    return n;
  }
  addToggle(e, t, o) {
    let i = this.togglePool.get().getComponent(m.default);
    this.content.addChild(i.node);
    i.setData(e, t, o);
    return i;
  }
  addTrigger(e, t, o) {
    let i = this.triggerPool.get().getComponent(f.default);
    this.content.addChild(i.node);
    i.setData(e, t, o);
    return i;
  }
  addSpawnMonster(e, t) {
    let o = this.spawnMonsterPool.get().getComponent(T.default);
    this.content.addChild(o.node);
    o.setData(e, t);
    return o;
  }
  show() {
    this.node.active = !0;
    let e = this.getComponent(cc.Widget);
    e.bottom = -this.node.height;
    e.updateAlignment();
    l.default.blockInput(!0, "showInspector");
    cc.tween(this.node).to(.2, {
      y: this.node.y + this.node.height
    }, {
      easing: c.Easing.backIn
    }).call(() => {
      l.default.blockInput(!1, "showInspector");
      cc.game.emit(i.Inspector_ShowEnd);
    }).start();
  }
  hide() {
    let e = this.getComponent(cc.Widget);
    e.bottom = 0;
    e.updateAlignment();
    l.default.blockInput(!0, "hideInspector");
    cc.tween(this.node).to(.2, {
      y: this.node.y - this.node.height
    }, {
      easing: c.Easing.backOut
    }).call(() => {
      this.node.active = !1;
      l.default.blockInput(!1, "hideInspector");
    }).start();
  }
  findItemByName(e) {
    for (let t = 0; t < this.content.childrenCount; t++) {
      let o = this.content.children[t],
        i = C.Util.searchChild(o, "nameLabel");
      if (i) {
        let t = i.getComponent(cc.Label);
        if (t && t.string.includes(e)) return o;
      }
    }
    return null;
  }
};
w.Inspector_ShowEnd = "Inspector_ShowEnd";
n([D(cc.ScrollView)], w.prototype, "scrollView", void 0);
n([D(s.default)], w.prototype, "headPool", void 0);
n([D(s.default)], w.prototype, "labelPool", void 0);
n([D(s.default)], w.prototype, "buttonPool", void 0);
n([D(s.default)], w.prototype, "intBoxPool", void 0);
n([D(s.default)], w.prototype, "dropDownBoxPool", void 0);
n([D(s.default)], w.prototype, "editBoxPool", void 0);
n([D(s.default)], w.prototype, "numberEditBoxPool", void 0);
n([D(s.default)], w.prototype, "numberEditBoxPool2", void 0);
n([D(s.default)], w.prototype, "togglePool", void 0);
n([D(s.default)], w.prototype, "triggerPool", void 0);
n([D(s.default)], w.prototype, "spawnMonsterPool", void 0);
n([D(s.default)], w.prototype, "imgBtnHListPool", void 0);
n([D(cc.Node)], w.prototype, "content", void 0);
n([D(g.default)], w.prototype, "btn_copy", void 0);
w = i = n([P], w);
exports.default = w;