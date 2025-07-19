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
const s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/UIColor"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/Mng"),
  m = e("../../Game/Player/SpriteMng"),
  f = e("../../GameData/GameTypeDefine"),
  g = e("../../Scene/EditWorldScene/EditWorldScene"),
  y = e("../../Scene/EditWorldScene/Inspector"),
  v = e("./CommonOptionHelperFactory"),
  {
    ccclass: C,
    property: _
  } = cc._decorator;
let S = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.authorLabel = null;
    this.sprite = null;
    this.paintBtn = null;
    this.deleteBtn = null;
    this.saveBtn = null;
    this.inspector = null;
    this.toggleGroup = null;
    this.buildInLabel = null;
    this.centerWidget = null;
    this.centerWidgetTopDisplayToggle = 350;
    this.centerWidgetTopNotDisplayToggle = 270;
    this._conf = null;
    this._saveCall = null;
    this._delCall = null;
  }
  onLoad() {
    super.onLoad();
    this.paintBtn.node.on(s.default.CLICK, this.onPaintBtnClick, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtnClick, this);
    this.saveBtn.node.on(s.default.CLICK, this.onSaveBtnClick, this);
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, (e, t) => {
      if (e != t && this._helper && this._helper.displayWorldType()) {
        let t = 0 == e ? f.WorldType.Rpg : f.WorldType.Jump;
        this._helper.onShiftWorldType && this._helper.onShiftWorldType(t, this.inspector);
      }
    }, this);
  }
  openAnim(e) {
    cc.game.emit(i.CommonOptionPanel_Open, this);
    super.openAnim(() => {
      e && e();
      cc.game.emit(i.CommonOptionPanel_Opend, this);
    });
  }
  setData(e, t, o) {
    return a(this, void 0, void 0, function* () {
      this.inspector.reset();
      this._saveCall = t;
      this._delCall = o;
      this._conf = p.Util.deepCopy(e);
      this._helper = v.CommonOptionHelperFactory.instance.GetGommonOptionHelper(this._conf);
      if (this._helper) {
        if (this._helper.displayWorldType()) {
          this.toggleGroup.node.active = !0;
          if (this.centerWidget) {
            this.centerWidget.top = this.centerWidgetTopDisplayToggle;
            this.centerWidget.updateAlignment();
          }
          let e = c.default.ins.findScene(g.default).worldData.info.type == f.WorldType.Rpg ? 0 : 1;
          this.toggleGroup.selectIdx(e);
        } else {
          this.toggleGroup.node.active = !1;
          if (this.centerWidget) {
            this.centerWidget.top = this.centerWidgetTopNotDisplayToggle;
            this.centerWidget.updateAlignment();
          }
        }
        this.nameEditBox.string = this._conf.name;
        this.authorLabel.string = this._conf.author;
        this._helper.initInspector(this.inspector);
        this.buildInLabel.node.active = !1;
        if (this._conf.isBuildIn) {
          this.deleteBtn.node.active = !1;
          this.saveBtn.node.active = !1;
          this.paintBtn.node.active = !1;
          this.buildInLabel.node.active = !0;
        } else if (this._conf.belongGameId) {
          this.deleteBtn.node.active = !1;
          this.saveBtn.node.active = !0;
        } else {
          this.deleteBtn.node.active = !0;
          this.saveBtn.node.active = !0;
        }
        u.Mng.Ins.spriteMng.setSprite(this.sprite, this._conf.textureName, 150);
      }
    });
  }
  onPaintBtnClick() {
    d.default.showLoading("加载中");
    c.default.ins.Enter("PaintScene", e => a(this, void 0, void 0, function* () {
      d.default.hideLoading();
      this._helper.paintCall(e);
      let t = yield p.Util.downloadPngPixel(this._conf.textureName);
      e.graphics.drawPixels(t);
      e.setBelongGameId(this._conf.belongGameId);
      e.setImportOthersImg(this._conf.importOthersImg);
      e.completeCall = (e, t, o, i) => a(this, void 0, void 0, function* () {
        d.default.showLoading("正在上传");
        let n = yield p.Util.uploadPng(e, this._helper.imageFileType, i);
        if (n.err) d.default.hideLoading("图片违规：" + n.err);else {
          cc.game.emit(m.default.UPDATE_SPRITE, this._conf.id, n.url);
          this._conf.textureName = n.url;
          this._conf.importOthersImg = t;
          this._conf.belongGameId = o;
          this._helper.onModifyTexture && this._helper.onModifyTexture(e, this._conf);
          yield this._helper.saveAsncFunc();
          d.default.hideLoading("重绘已保存");
          u.Mng.Ins.spriteMng.setSprite(this.sprite, this._conf.textureName, 150);
          c.default.ins.Back();
        }
      });
    }));
  }
  onDeleteBtnClick() {
    i.CAN_DELETE ? c.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = `Delete this ${this._helper.optionName}？`;
      e.setLeftBtn({
        text: "删除",
        color: h.UIColor.pink,
        call: () => a(this, void 0, void 0, function* () {
          d.default.showLoading("正在删除");
          yield this._helper.deleteAsncFunc();
          d.default.hideLoading("删除成功");
          this._helper.refreshMsgName && cc.game.emit(this._helper.refreshMsgName);
          this.closePanel();
          this._delCall && this._delCall();
        })
      });
      e.setRightBtn({
        text: "关闭",
        color: h.UIColor.blue
      });
    }) : d.default.showToast("不能删除");
  }
  onSaveBtnClick() {
    return a(this, void 0, void 0, function* () {
      let e = this._conf;
      e.name = this.nameEditBox.textLabel.string;
      d.default.showLoading("保存中");
      yield this._helper.saveAsncFunc();
      d.default.hideLoading();
      this._helper.refreshMsgName && cc.game.emit(this._helper.refreshMsgName);
      this._helper.changeDataMsgName && cc.game.emit(this._helper.changeDataMsgName, this._helper.conf);
      this.closePanel();
      this._saveCall && this._saveCall(e);
    });
  }
};
S.CommonOptionPanel_Open = "CommonOptionPanel_Open";
S.CommonOptionPanel_Opend = "CommonOptionPanel_Opend";
S.CAN_DELETE = !0;
n([_(cc.EditBox)], S.prototype, "nameEditBox", void 0);
n([_(cc.Label)], S.prototype, "authorLabel", void 0);
n([_(cc.Sprite)], S.prototype, "sprite", void 0);
n([_(s.default)], S.prototype, "paintBtn", void 0);
n([_(s.default)], S.prototype, "deleteBtn", void 0);
n([_(s.default)], S.prototype, "saveBtn", void 0);
n([_(y.default)], S.prototype, "inspector", void 0);
n([_(r.default)], S.prototype, "toggleGroup", void 0);
n([_(cc.Label)], S.prototype, "buildInLabel", void 0);
n([_(cc.Widget)], S.prototype, "centerWidget", void 0);
n([_], S.prototype, "centerWidgetTopDisplayToggle", void 0);
n([_], S.prototype, "centerWidgetTopNotDisplayToggle", void 0);
S = i = n([C], S);
exports.default = S;