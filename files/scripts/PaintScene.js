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
const s = e("../../CustomUI/Graphics"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../CustomUI/Slider"),
  c = e("../../Frame/SceneManager"),
  d = e("../../CustomUI/Button"),
  h = e("../../Frame/Util"),
  p = e("../../Frame/GameRecorder"),
  u = e("../../Frame/Scene"),
  m = e("../../Frame/UIColor"),
  f = e("../../Frame/Top"),
  g = e("../../Game/OperationFlow"),
  y = e("../../CustomUI/DropDownBox"),
  v = e("../../Game/Player/ColorMng"),
  C = e("../../Frame/ScreenRect"),
  _ = e("../../Frame/Config"),
  S = e("../../GameData/GameTypeDefine"),
  I = e("../../Game/Player/CoinMng"),
  {
    ccclass: G,
    menu: T,
    property: b
  } = cc._decorator;
var M;
(function (e) {
  e[e.Select = 0] = "Select";
  e[e.Pencil = 1] = "Pencil";
  e[e.StraightLine = 2] = "StraightLine";
  e[e.Rect = 3] = "Rect";
  e[e.FillRect = 4] = "FillRect";
  e[e.Circle = 5] = "Circle";
  e[e.FillCircle = 6] = "FillCircle";
  e[e.Eraser = 7] = "Eraser";
  e[e.Bucket = 8] = "Bucket";
  e[e.Move = 9] = "Move";
})(M || (M = {}));
let P = i = class extends u.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.colorList = null;
    this.selectBtn = null;
    this.moveBtn = null;
    this.pencilBtn = null;
    this.shapeBtn = null;
    this.eraserBtn = null;
    this.revertBtn = null;
    this.clearBtn = null;
    this.bucketBtn = null;
    this.saveBtn = null;
    this.recorderBtn = null;
    this.graphics = null;
    this.sizeSlider = null;
    this.shapeDropDown = null;
    this.bucketPointer = null;
    this.eraserPointer = null;
    this.examples = null;
    this.tileExample = null;
    this.actorIdleExample = null;
    this.actorJumpExample = null;
    this.meleeWeaponExample = null;
    this.shopExample = null;
    this.rankExample = null;
    this.importBtn = null;
    this.importTipLabel = null;
    this.importOthersImg = !1;
    this.belongGameId = "";
    this.sensitiveName = "";
    this.state = M.Pencil;
    this.pencilColor = null;
    this.completeCall = null;
    this._temp_v2_0 = new cc.Vec2();
    this._graphicsScaleMin = 1;
    this._graphicsScaleMax = 80;
    this._graphicsFocus = new cc.Vec2();
    this._multiTouchStartDiameter = 0;
    this._startMultiTouch = !1;
    this._graphicsStartScale = 1;
    this._startScalePos = new cc.Vec2();
    this._currentTouchList = [];
  }
  onLoad() {
    super.onLoad();
    this.backBtn.node.on(d.default.CLICK, this.onBackBtnTap, this);
    this.graphics.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.graphics.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove10, this);
    this.graphics.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd11, this);
    this.graphics.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd11, this);
    this.selectBtn.node.on(d.default.CLICK, this.onSelectBtn, this);
    this.moveBtn.node.on(d.default.CLICK, this.onMoveBtn, this);
    this.pencilBtn.node.on(d.default.CLICK, this.onPencilTap, this);
    this.shapeBtn.node.on(d.default.CLICK, this.onShapeBtn, this);
    this.eraserBtn.node.on(d.default.CLICK, this.onEraserTap, this);
    this.revertBtn.node.on(d.default.CLICK, this.onRevertTap, this);
    this.clearBtn.node.on(d.default.CLICK, this.onClearTap, this);
    this.bucketBtn.node.on(d.default.CLICK, this.onBucketTap, this);
    this.saveBtn.node.on(d.default.CLICK, this.onSaveBtnTap, this);
    this.sizeSlider.node.on(l.default.MOVE, this.onSizeChange, this);
    this.importBtn.node.on(d.default.CLICK, this.onImportBtn, this);
    this.shapeDropDown.node.on(y.default.SELECT_CHANGE, this.onShapeDropDown, this);
    this.colorList.node.on(r.default.SELECT_ITEM, this.selectColorChild, this);
    this.colorList.getPrefabName = this.colorPrefabFun;
    this.colorList.canSelect = this.canSelectFunc;
    this.tileExample.active = !1;
    this.actorIdleExample.active = !1;
    this.actorJumpExample.active = !1;
    this.meleeWeaponExample.active = !1;
    this.bucketPointer.active = !1;
    this.eraserPointer.active = !1;
    this.setImportOthersImg(!1);
    this.setBelongGameId("");
    this.sensitiveName = "stamp" + orange.TimeUtil.serverTime;
    this.shapeDropDown.setDataArr([{
      state: M.StraightLine,
      img: "Paint/line"
    }, {
      state: M.Rect,
      img: "Paint/rect"
    }, {
      state: M.FillRect,
      img: "Paint/fillRect"
    }, {
      state: M.Circle,
      img: "Paint/circle"
    }, {
      state: M.FillCircle,
      img: "Paint/fillCircle"
    }]);
    p.default.attachRecordButton(this.recorderBtn, {
      video_title: "This game is so much fun!",
      topics: ["Julianseditor", "Makeurgame"],
      tgaFrom: "PaintScene",
      query: "",
      succ: () => a(this, void 0, void 0, function* () {
        if (this.recorderBtn.dot.active) {
          let e = yield I.default.Ins.requestAddCoinByShare();
          if (!e) return;
          g.OperationFlow.openRewards(e, () => {});
        }
      })
    });
  }
  onDestroy() {
    p.default.dettachRecordButton();
  }
  onShapeDropDown(e, t, o) {
    o && (this.state = t.state);
  }
  onShow(e) {
    g.OperationFlow.deelOnShow(e);
  }
  onEnterScene() {
    super.onEnterScene();
    p.default.stopAndClear();
  }
  onExitScene() {
    p.default.stopAndClear();
  }
  start() {
    this.refreshColorList(1);
    this.highLightBtn(this.pencilBtn);
    this.state = M.Pencil;
    this.graphics.lineWidth = this.sizeSlider.value = 8;
  }
  refreshColorList(e) {
    let t = [];
    t = t.concat(_.Config.colors);
    for (let e = 0; e < v.ColorMng.Ins.customColors.length; e++) {
      let o = v.ColorMng.Ins.customColors[e];
      t.push({
        id: o.id,
        color: cc.color(o.data.r, o.data.g, o.data.b),
        isCustom: !0
      });
    }
    t.push({
      type: "EditColorBtn"
    });
    this.colorList.setDataArr(t);
    let o = t.findIndex(t => t.id == e);
    o < 0 && (o = 0);
    this.colorList.selectByIdx(o);
  }
  addColorGuide(e) {
    return a(this, void 0, void 0, function* () {
      let t = yield h.Util.loadBundleRes("Prefab/ColorGuide"),
        o = cc.instantiate(t);
      this.node.addChild(o);
      exports.position = h.Util.convertPosition(e, this.node, cc.v2(0, 20));
      let i = o.convertToWorldSpaceAR(cc.Vec2.ZERO);
      exports.scaleX = i.x > C.default.width / 2 ? -1 : 1;
      for (let e = 0; e < o.children.length; e++) o.children[e].scaleX = o.scaleX;
      this.scheduleOnce(() => {
        o.destroy();
      }, 2);
    });
  }
  colorPrefabFun(e) {
    return "EditColorBtn" == e.type ? "EditColorBtn" : "ColorBtn";
  }
  canSelectFunc(e) {
    return "EditColorBtn" != e.type;
  }
  selectColorChild(e, t) {
    this.pencilColor = t.color;
  }
  onBackBtnTap() {
    this.graphics.checkFinishSelectBox();
    h.Util.isAlphaPixels(this.graphics.pixels) ? c.default.ins.Back() : c.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "是否放弃绘图？";
      e.setLeftBtn({
        text: "放弃",
        color: m.UIColor.pink,
        call: () => {
          c.default.ins.Back();
        }
      });
      e.setRightBtn({
        text: "继续画",
        color: m.UIColor.blue
      });
    });
  }
  onMoveBtn() {
    this.highLightBtn(this.moveBtn);
    this.state = M.Move;
  }
  onPencilTap() {
    this.graphics.checkFinishSelectBox();
    this.highLightBtn(this.pencilBtn);
    this.state = M.Pencil;
  }
  onShapeBtn() {
    this.graphics.checkFinishSelectBox();
    this.highLightBtn(this.shapeBtn);
    this.state = this.shapeDropDown.getCurData().state;
  }
  onEraserTap() {
    this.graphics.checkFinishSelectBox();
    this.highLightBtn(this.eraserBtn);
    this.state = M.Eraser;
  }
  onBucketTap() {
    this.graphics.checkFinishSelectBox();
    this.highLightBtn(this.bucketBtn);
    this.state = M.Bucket;
  }
  onSelectBtn() {
    this.highLightBtn(this.selectBtn);
    this.state = M.Select;
  }
  onRevertTap() {
    this.graphics.selectBox.node.active ? this.graphics.checkFinishSelectBox() : this.graphics.revert();
  }
  onClearTap() {
    this.graphics.checkFinishSelectBox();
    c.default.ins.OpenPanelByName("MessageBox", e => {
      this.importOthersImg ? e.label.string = "是否清空画布？\n(并清空导入标记)" : e.label.string = "是否清空画布？";
      e.leftBtn.node.active = !1;
      e.setRightBtn({
        text: "确定",
        color: m.UIColor.pink,
        call: () => {
          this.setImportOthersImg(!1);
          this.setBelongGameId("");
          this.graphics.clear();
        }
      });
    });
  }
  onImportBtn() {
    return a(this, void 0, void 0, function* () {
      this.graphics.checkFinishSelectBox();
      c.default.ins.OpenPanelByName("SelectImagePanel", e => {
        e.call = (e, t, o) => a(this, void 0, void 0, function* () {
          f.default.showLoading("下载中");
          let i = yield h.Util.downloadPngPixel(e);
          this.state = M.Select;
          this.highLightBtn(this.selectBtn);
          this.graphics.importPixels(i);
          f.default.hideLoading();
          this.setImportOthersImg(this.importOthersImg || t);
          this.setBelongGameId(this.belongGameId || o);
        });
      });
    });
  }
  onSaveBtnTap() {
    return a(this, void 0, void 0, function* () {
      this.graphics.checkFinishSelectBox();
      h.Util.isAlphaPixels(this.graphics.pixels) ? c.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "多画几笔吧";
        e.leftBtn.node.active = !1;
        e.setRightBtn({
          text: "确定",
          color: m.UIColor.blue
        });
      }) : this.completeCall && this.completeCall(this.graphics.pixels, this.importOthersImg, this.belongGameId, this.sensitiveName);
    });
  }
  highLightBtn(e) {
    let t = [this.pencilBtn, this.shapeBtn, this.eraserBtn, this.bucketBtn, this.moveBtn, this.selectBtn];
    for (let o = 0; o < t.length; o++) {
      let i = t[o],
        n = h.Util.searchChild(i.node, "select");
      n && (n.active = i == e);
    }
  }
  onSizeChange(e) {
    console.log(e);
    this.graphics.lineWidth = e;
  }
  onTouchStart(e) {
    this.startMultiTouch(e);
    if (this._startMultiTouch) {
      this.endPaint();
      return;
    }
    let t = e.getLocation();
    this.graphics.node.convertToNodeSpaceAR(t, t);
    switch (this.state) {
      case M.Bucket:
        {
          this.bucketPointer.scale = 1 / this.graphics.node.scale;
          this.bucketPointer.position = t;
          let e = h.Util.searchChild(this.bucketPointer, "posNode");
          t = h.Util.convertPosition(e, this.graphics.node);
          this.bucketPointer.active = !0;
          h.Util.searchChild(this.bucketPointer, "sight").color = this.pencilColor;
          break;
        }
      case M.Pencil:
        this.graphics.color = this.pencilColor;
        this.graphics.beginLine(t);
        this.graphics.lineTo(t);
        break;
      case M.Eraser:
        {
          this.eraserPointer.scale = 1 / this.graphics.node.scale;
          let e = this.eraserPointer.getComponentInChildren(cc.Graphics);
          e.clear();
          e.fillColor = e.strokeColor = cc.Color.WHITE;
          e.circle(0, 0, this.graphics.lineWidth / this.eraserPointer.scale);
          e.stroke();
          this.eraserPointer.position = t;
          let o = h.Util.searchChild(this.eraserPointer, "posNode");
          t = h.Util.convertPosition(o, this.graphics.node);
          this.eraserPointer.active = !0;
          this.graphics.color = cc.Color.TRANSPARENT;
          this.graphics.beginLine(t);
          this.graphics.lineTo(t);
          break;
        }
      case M.Select:
        this.graphics.selectBoxTouchStart(t);
        break;
      case M.StraightLine:
        this.graphics.color = this.pencilColor;
        this.graphics.beginStraightLine(t);
        break;
      case M.Rect:
        this.graphics.color = this.pencilColor;
        this.graphics.beginRect(!1, t);
        break;
      case M.FillRect:
        this.graphics.color = this.pencilColor;
        this.graphics.beginRect(!0, t);
        break;
      case M.Circle:
        this.graphics.color = this.pencilColor;
        this.graphics.beginCircle(!1, t);
        break;
      case M.FillCircle:
        this.graphics.color = this.pencilColor;
        this.graphics.beginCircle(!0, t);
    }
  }
  onTouchMove10(e) {
    let t = e.getLocation();
    this.graphics.node.convertToNodeSpaceAR(t, t);
    switch (this.state) {
      case M.Bucket:
        this.bucketPointer.position = t;
        break;
      case M.Pencil:
        this.graphics.lineTo(t);
        break;
      case M.Eraser:
        {
          let e = this.eraserPointer;
          e.position = t;
          let o = h.Util.searchChild(e, "posNode");
          t = h.Util.convertPosition(o, this.graphics.node);
          this.graphics.lineTo(t);
          break;
        }
      case M.Move:
        this.multiTouchMove(e);
        break;
      case M.Select:
        this.graphics.selectBoxTouchMove(t);
        break;
      case M.StraightLine:
        this.graphics.dragStraightLine(t);
        break;
      case M.Rect:
        this.graphics.dragRect(!1, t);
        break;
      case M.FillRect:
        this.graphics.dragRect(!0, t);
        break;
      case M.Circle:
        this.graphics.dragCircle(!1, t);
        break;
      case M.FillCircle:
        this.graphics.dragCircle(!0, t);
    }
  }
  onTouchEnd11(e) {
    this.endMultiTouch(e);
    this.endPaint();
  }
  endPaint() {
    switch (this.state) {
      case M.Bucket:
        {
          this.bucketPointer.active = !1;
          let e = h.Util.searchChild(this.bucketPointer, "posNode"),
            t = h.Util.convertPosition(e, this.graphics.node);
          this.graphics.bucketFill(t, this.pencilColor);
          break;
        }
      case M.Pencil:
      case M.Eraser:
        this.eraserPointer.active = !1;
        this.graphics.endLine();
        break;
      case M.Select:
        this.graphics.selectBoxTouchEnd();
        break;
      case M.StraightLine:
        this.graphics.endStraightLine();
        break;
      case M.Rect:
        this.graphics.endRect(!1);
        break;
      case M.FillRect:
        this.graphics.endRect(!0);
        break;
      case M.Circle:
        this.graphics.endCircle(!1);
        break;
      case M.FillCircle:
        this.graphics.endCircle(!0);
    }
  }
  setSize(e, t) {
    let o = Math.min(this.graphics.node.width / e, this.graphics.node.height / t);
    this.graphics.setScale(o);
    this.bucketPointer.scale = 1 / o;
    this.eraserPointer.scale = 1 / o;
    this.graphics.setSize(e, t);
    this._graphicsScaleMin = o;
  }
  toPaintTile() {
    this.tileExample.active = !0;
    this.setSize(256, 256);
    cc.game.emit(i.PaintScene_Entered, this);
  }
  toPaintHeadIcon() {
    this.tileExample.active = !1;
    this.setSize(256, 256);
  }
  toPaintGameIcon() {
    this.tileExample.active = !1;
    this.setSize(256, 256);
  }
  toPaintActor() {
    this.tileExample.active = !0;
    this.actorIdleExample.active = !0;
    this.actorIdleExample.width = 182;
    this.actorIdleExample.height = 182;
    this.setSize(256, 256);
  }
  toPaintWeapon(e) {
    this.tileExample.active = !0;
    if (e == S.WeaponType.Melee) {
      this.meleeWeaponExample.active = !0;
      this.actorIdleExample.width = 182;
      this.actorIdleExample.height = 182;
    } else this.meleeWeaponExample.active = !1;
    this.setSize(256, 256);
  }
  toPaintShop() {
    this.shopExample.active = !0;
    this.setSize(256, 256);
  }
  toPaintRank() {
    this.rankExample.active = !0;
    this.setSize(256, 256);
  }
  startMultiTouch(e) {
    if (this.state != M.Move) {
      this._currentTouchList.length = 0;
      this._startMultiTouch = !1;
      return;
    }
    if (this._currentTouchList.length < 2) {
      let t = !0;
      for (let o of this._currentTouchList) if (o.getID() == e.touch.getID()) {
        t = !1;
        break;
      }
      if (t) {
        this._currentTouchList.push(e.touch);
        console.log("add touch:", e.touch.getID());
      }
    }
    if (this._currentTouchList.length < 2) return;
    let t = this.graphics.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this._temp_v2_0),
      o = [];
    for (let e of this._currentTouchList) o.push({
      x: e.getLocationX() - t.x,
      y: e.getLocationY() - t.y
    });
    let i = this.getCenterPoint(o),
      n = 0;
    for (let e of o) {
      let t = .5 * (Math.abs(e.x - i.x) + Math.abs(e.y - i.y));
      n < t && (n = t);
    }
    this._multiTouchStartDiameter = n;
    if (this._startMultiTouch) {
      this._graphicsStartScale = this.graphics.node.scale;
      this._startScalePos.set(this.graphics.node.position);
    } else {
      this._startMultiTouch = !0;
      this._graphicsStartScale = this.graphics.node.scale;
      let e = this.graphics.node.width * this._graphicsStartScale,
        t = this.graphics.node.height * this._graphicsStartScale;
      this._graphicsFocus.x = i.x / e;
      this._graphicsFocus.y = i.y / t;
      this._startScalePos.set(this.graphics.node.position);
    }
  }
  multiTouchMove(e) {
    if (this._currentTouchList.length > 1) {
      let e = this.graphics.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this._temp_v2_0),
        t = [];
      for (let o of this._currentTouchList) t.push({
        x: o.getLocationX() - e.x,
        y: o.getLocationY() - e.y
      });
      let o = this.getCenterPoint(t),
        i = 0;
      for (let e of t) {
        let t = .5 * (Math.abs(e.x - o.x) + Math.abs(e.y - o.y));
        i < t && (i = t);
      }
      let n = .005 * (i - this._multiTouchStartDiameter) * this.graphics.node.scale,
        a = this._graphicsStartScale + n;
      a < this._graphicsScaleMin && (a = this._graphicsScaleMin);
      a > this._graphicsScaleMax && (a = this._graphicsScaleMax);
      n = a - this._graphicsStartScale;
      this.graphics.setScale(a);
      let s = .5 * -this.graphics.node.parent.width,
        r = .5 * -this.graphics.node.parent.height,
        l = s - (this.graphics.node.width * this.graphics.node.scale - this.graphics.node.parent.width),
        c = r - (this.graphics.node.height * this.graphics.node.scale - this.graphics.node.parent.height),
        d = -this.graphics.node.width * this._graphicsFocus.x * n,
        h = -this.graphics.node.height * this._graphicsFocus.y * n,
        p = this._startScalePos.x + d,
        u = this._startScalePos.y + h;
      p > s && (p = s);
      u > r && (u = r);
      p < l && (p = l);
      u < c && (u = c);
      this.graphics.node.x = p;
      this.graphics.node.y = u;
    } else {
      let t = .5 * -this.graphics.node.parent.width,
        o = .5 * -this.graphics.node.parent.height,
        i = t - (this.graphics.node.width * this.graphics.node.scale - this.graphics.node.parent.width),
        n = o - (this.graphics.node.height * this.graphics.node.scale - this.graphics.node.parent.height),
        a = e.touch.getDelta(),
        s = this.graphics.node.x + a.x,
        r = this.graphics.node.y + a.y;
      s > t && (s = t);
      r > o && (r = o);
      s < i && (s = i);
      r < n && (r = n);
      this.graphics.node.x = s;
      this.graphics.node.y = r;
    }
  }
  endMultiTouch(e) {
    for (let t = 0; t < this._currentTouchList.length; ++t) if (this._currentTouchList[t].getID() == e.touch.getID()) {
      this._currentTouchList.splice(t, 1);
      console.log("remove touch:", e.touch.getID());
      break;
    }
    0 == this._currentTouchList.length && (this._startMultiTouch = !1);
  }
  getCenterPoint(e) {
    if (!e || 0 == e.length) return {
      x: 0,
      y: 0
    };
    let t = e.length;
    if (1 == t) return e[0];
    if (2 == t) {
      let t = e[0],
        o = e[1];
      return {
        x: .5 * (t.x + o.x),
        y: .5 * (t.y + o.y)
      };
    }
    let o = [];
    for (let i = 0; i < t - 1; ++i) {
      let t = e[i],
        n = e[i + 1];
      o.push({
        x: .5 * (t.x + n.x),
        y: .5 * (t.y + n.y)
      });
    }
    return this.getCenterPoint(o);
  }
  setImportOthersImg(e) {
    this.importOthersImg = !!e;
    this.updateImportTipLabel();
  }
  setBelongGameId(e) {
    this.belongGameId = e;
    this.updateImportTipLabel();
  }
  updateImportTipLabel() {
    let e = [];
    this.importOthersImg && e.push("导入标记");
    this.belongGameId && e.push("工坊素材");
    this.importTipLabel.node.active = e.length > 0;
    this.importTipLabel.string = e.join(" / ");
  }
};
P.PaintScene_Entered = "PaintScene_Entered";
n([b(d.default)], P.prototype, "backBtn", void 0);
n([b(r.default)], P.prototype, "colorList", void 0);
n([b(d.default)], P.prototype, "selectBtn", void 0);
n([b(d.default)], P.prototype, "moveBtn", void 0);
n([b(d.default)], P.prototype, "pencilBtn", void 0);
n([b(d.default)], P.prototype, "shapeBtn", void 0);
n([b(d.default)], P.prototype, "eraserBtn", void 0);
n([b(d.default)], P.prototype, "revertBtn", void 0);
n([b(d.default)], P.prototype, "clearBtn", void 0);
n([b(d.default)], P.prototype, "bucketBtn", void 0);
n([b(d.default)], P.prototype, "saveBtn", void 0);
n([b(d.default)], P.prototype, "recorderBtn", void 0);
n([b(s.default)], P.prototype, "graphics", void 0);
n([b(l.default)], P.prototype, "sizeSlider", void 0);
n([b(y.default)], P.prototype, "shapeDropDown", void 0);
n([b(cc.Node)], P.prototype, "bucketPointer", void 0);
n([b(cc.Node)], P.prototype, "eraserPointer", void 0);
n([b(cc.Node)], P.prototype, "examples", void 0);
n([b(cc.Node)], P.prototype, "tileExample", void 0);
n([b(cc.Node)], P.prototype, "actorIdleExample", void 0);
n([b(cc.Node)], P.prototype, "actorJumpExample", void 0);
n([b(cc.Node)], P.prototype, "meleeWeaponExample", void 0);
n([b(cc.Node)], P.prototype, "shopExample", void 0);
n([b(cc.Node)], P.prototype, "rankExample", void 0);
n([b(d.default)], P.prototype, "importBtn", void 0);
n([b(cc.Label)], P.prototype, "importTipLabel", void 0);
P = i = n([G, T("面板/PaintPanel")], P);
exports.default = P;