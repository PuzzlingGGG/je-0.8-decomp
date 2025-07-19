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
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/Util"),
  d = e("../../Scene/EditWorldScene/Inspector"),
  h = e("./CreateCommonHelperFactory"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends r.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameEditBox = null;
    this.authorLabel = null;
    this.titleLabel = null;
    this.inspector = null;
    this.okBtn = null;
    this._pixels = null;
    this._saveCall = null;
    this.sensitiveName = "";
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(s.default.CLICK, this.onClickOk, this);
    this.sensitiveName = "stamp" + orange.TimeUtil.serverTime;
  }
  setData(e, t, o, i) {
    return n(this, void 0, void 0, function* () {
      this._saveCall = i;
      this._helper = h.CreateCommonHelperFactory.instance.GetGommonOptionHelper(e);
      if (t) {
        this._conf = t;
        this._helper.setConf(t);
      } else this._conf = yield this._helper.createConf(o);
      this.titleLabel.string = a.I18nMgr.exceI18nStringByZh("创建${this._helper.displayName}", [{
        paramName: "this._helper.displayName",
        param: a.I18nMgr.getI18nStringByZh(this._helper.displayName)
      }]);
      this.authorLabel.string = this._conf.author;
      this.nameEditBox.string = a.I18nMgr.getI18nStringByZh(this._conf.name);
      this._helper.initInspector(this.inspector);
    });
  }
  setPixel(e) {
    this._pixels = e;
    this.sprite.spriteFrame = this.makeSpriteFrameByPixel(e);
  }
  makeSpriteFrameByPixel(e) {
    let t = new cc.RenderTexture();
    t.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    t.initWithData(e, cc.Texture2D.PixelFormat.RGBA8888, 256, 256);
    return new cc.SpriteFrame(t);
  }
  onClickOk() {
    return n(this, void 0, void 0, function* () {
      if (!this._pixels) {
        l.default.showToast(`请绘制${this._helper.displayName}`);
        return;
      }
      l.default.showLoading("上传中(1/3)");
      let e = yield c.Util.uploadPng(this._pixels, this._helper.imageFileType, this.sensitiveName);
      if (e.err) l.default.hideLoading("图片违规：" + e.err);else {
        l.default.showLoading("上传中(2/3)");
        this._conf.name = this.nameEditBox.textLabel.string;
        this._conf.textureName = e.url;
        this._conf.author = this.authorLabel.string;
        l.default.showLoading("上传中(3/3)");
        if (yield this._helper.saveAsncFunc()) {
          l.default.hideLoading("上传成功");
          this.closePanel();
          this._helper.refreshMsgName && cc.game.emit(this._helper.refreshMsgName);
          this._saveCall && this._saveCall(this._conf);
        } else l.default.hideLoading("上传失败");
      }
    });
  }
  update() {
    if (this._helper && this._helper.isDirty) {
      this._helper.isDirty = !1;
      this._helper.initInspector(this.inspector);
    }
  }
};
i([u(cc.Sprite)], m.prototype, "sprite", void 0);
i([u(cc.EditBox)], m.prototype, "nameEditBox", void 0);
i([u(cc.Label)], m.prototype, "authorLabel", void 0);
i([u(cc.Label)], m.prototype, "titleLabel", void 0);
i([u(d.default)], m.prototype, "inspector", void 0);
i([u(s.default)], m.prototype, "okBtn", void 0);
m = i([p], m);
exports.default = m;