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
const a = e("../../CustomUI/Button"),
  s = e("../../Frame/AD"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/Mng"),
  p = e("../../Game/Player/CreditMng"),
  u = e("../../TGA"),
  m = e("../../../scripts/_autogen/data/data"),
  f = e("../../Game/Player/PublishMng"),
  g = e("../../Game/Player/GameIconMng"),
  y = e("../../Frame/UIColor"),
  v = e("../../Frame/CrossPlatform"),
  C = e("../../../i18n/i18nMgr"),
  {
    ccclass: _,
    property: S
  } = cc._decorator;
let I = class extends r.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameEditbox = null;
    this.advertEditbox = null;
    this.versionEditbox = null;
    this.paintBtn = null;
    this.tipLabel = null;
    this.creativeBtn = null;
    this.publishBtn = null;
    this.richText = null;
    this.gameData = null;
    this.creativeOption = null;
    this.coodTime = 6e5;
  }
  onLoad() {
    super.onLoad();
    this.publishBtn.node.on(a.default.CLICK, this.onPublishBtnTap, this);
    this.paintBtn.node.on(a.default.CLICK, this.onPaint, this);
    this.creativeBtn.node.on(a.default.CLICK, this.onCreativeBtn, this);
    let e = this.richText.node.width + 750;
    this.richText.node.x = 350;
    this.richText.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(15, -e, 0), cc.moveBy(0, e, 0))));
    s.AD.preloadRewardVideo();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.gameData = e;
      this.creativeOption = e.creativeOp;
      this.updateCreativeBtn();
      this.creativeBtn.dot.active = !v.crossPlatform.getStorageSync("PublishGamePanel-creativeBtn");
      this.nameEditbox.string = e.name;
      this.advertEditbox.string = e.advert;
      this.versionEditbox.string = d.Util.nextVersion(e.version) || "0.0.1";
      this.loadSpriteFrame(this.gameData.iconTextureName);
      this.paintBtn.dot.active = "icon1" == this.gameData.iconTextureName;
      this.gameData.lastPublishStamp + this.coodTime - orange.TimeUtil.serverTime > 0 ? this.startCooling() : this.tipLabel.node.active = !1;
    });
  }
  updateCreativeBtn() {
    let e = this.creativeOption;
    e.isOpenAll ? this.creativeBtn.label.string = "分享所有" : e.isClose ? this.creativeBtn.label.string = "关闭" : this.creativeBtn.label.string = "分享部分";
  }
  startCooling() {
    return n(this, void 0, void 0, function* () {
      this.coolingUpdate();
      this.schedule(this.coolingUpdate, 1, cc.macro.REPEAT_FOREVER);
      this.publishBtn.icon.node.active = !1;
      this.publishBtn.icon.spriteFrame = yield d.Util.loadBundleRes("Atlas/UI/ad", cc.SpriteFrame);
      this.publishBtn.icon.node.active = !0;
    });
  }
  coolingUpdate() {
    return n(this, void 0, void 0, function* () {
      let e = this.gameData.lastPublishStamp + this.coodTime - orange.TimeUtil.serverTime;
      if (e > 0) {
        this.tipLabel.node.active = !0;
        this.publishBtn.icon.node.active = !0;
        this.tipLabel.string = C.I18nMgr.exceI18nStringByZh("${Util.parseDateMMSS(time)}后可免费发布", [{
          paramName: "Util.parseDateMMSS(time)",
          param: d.Util.parseDateMMSS(e)
        }]);
      } else {
        this.tipLabel.node.active = !1;
        this.publishBtn.icon.node.active = !1;
        this.unschedule(this.coolingUpdate);
        this.publishBtn.icon.spriteFrame = yield d.Util.loadBundleRes("Atlas/UI/upload", cc.SpriteFrame);
      }
    });
  }
  loadSpriteFrame(e) {
    return n(this, void 0, void 0, function* () {
      g.GameIconMng.Ins.setSprite(this.sprite, e, 180);
    });
  }
  onVersionTextChange() {
    let e = d.Util.parseVersion(this.versionEditbox.textLabel.string);
    this.versionEditbox.string = e;
  }
  onPaint() {
    l.default.ins.Enter("PaintScene", e => n(this, void 0, void 0, function* () {
      e.toPaintGameIcon();
      if (d.Util.isCdnPng(this.gameData.iconTextureName)) {
        let t = yield d.Util.downloadPngPixel(this.gameData.iconTextureName);
        e.graphics.drawPixels(t);
      }
      e.completeCall = (e, t, o, i) => n(this, void 0, void 0, function* () {
        c.default.showLoading("正在上传");
        let t = yield d.Util.uploadPng(e, m.ImageFileType.gameIcon, i);
        if (t.err) c.default.hideLoading("图片违规：" + t.err);else {
          this.gameData.iconTextureName = t.url;
          yield h.Mng.Ins.gameMng.save(this.gameData);
          this.loadSpriteFrame(t.url);
          l.default.ins.Back();
          c.default.hideLoading("图标已保存");
          this.paintBtn.dot.active = !1;
        }
      });
    }));
  }
  onCreativeBtn() {
    return n(this, void 0, void 0, function* () {
      v.crossPlatform.setStorageSync("PublishGamePanel-creativeBtn", !0);
      this.creativeBtn.dot.active = !1;
      let e = yield h.Mng.Ins.worldMng.loadMany(this.gameData.worldIds);
      l.default.ins.OpenPanelByName("SelectCreativeWorldPanel", t => {
        t.setData(e, this.creativeOption);
        t.call = e => {
          this.creativeOption = e;
          this.updateCreativeBtn();
        };
      });
    });
  }
  onPublishBtnTap() {
    return n(this, void 0, void 0, function* () {
      p.CreditMng.Ins.credit <= 2 ? c.default.showToast("近期违规，不能发布游戏") : this.gameData.lastPublishStamp + this.coodTime - orange.TimeUtil.serverTime > 0 ? s.AD.showVideoAd({
        id: s.AdUnitId.PublishGame,
        succ: () => {
          this.publishGame();
        }
      }) : this.publishGame();
    });
  }
  publishGame() {
    return n(this, void 0, void 0, function* () {
      if (this.gameData.isOldTangData) {
        c.default.showToast("旧服数据不可发布");
        return;
      }
      let e = d.Util.deepCopy(this.gameData);
      e.name = this.nameEditbox.textLabel.string;
      e.advert = this.advertEditbox.textLabel.string;
      e.version = this.versionEditbox.textLabel.string;
      e.creativeOp = this.creativeOption;
      e.lastPublishStamp = orange.TimeUtil.serverTime;
      e.firstPublishStamp || (e.firstPublishStamp = orange.TimeUtil.serverTime);
      let t = yield f.default.Ins.publish(e);
      if (t) {
        t.msg && c.default.showToast(t.msg);
        t.checkStrItems && t.sensitiveWords && l.default.ins.OpenPanelByName("MessageBox", e => {
          e.titleLabel.string = "发布失败";
          e.label.string = "检测到敏感词,请修改后重新发布";
          e.leftBtn.node.active = !1;
          e.setRightBtn({
            text: "定位敏感词",
            color: y.UIColor.pink,
            call: () => {
              l.default.ins.OpenPanelByName("SensitiveCheckPanel", e => {
                e.setData(t.checkStrItems, t.sensitiveWords);
              });
            }
          });
        });
      } else {
        c.default.showToast("发布成功");
        yield h.Mng.Ins.gameMng.save(e);
        this.closePanel();
        u.TGA.track("gameOperate", {
          gameId: this.gameData.id,
          step: "publish",
          gameVer: this.gameData.version,
          gameName: this.gameData.name,
          openCreative: !this.creativeOption.isClose
        });
      }
    });
  }
};
i([S(cc.Sprite)], I.prototype, "sprite", void 0);
i([S(cc.EditBox)], I.prototype, "nameEditbox", void 0);
i([S(cc.EditBox)], I.prototype, "advertEditbox", void 0);
i([S(cc.EditBox)], I.prototype, "versionEditbox", void 0);
i([S(a.default)], I.prototype, "paintBtn", void 0);
i([S(cc.Label)], I.prototype, "tipLabel", void 0);
i([S(a.default)], I.prototype, "creativeBtn", void 0);
i([S(a.default)], I.prototype, "publishBtn", void 0);
i([S(cc.RichText)], I.prototype, "richText", void 0);
I = i([_], I);
exports.default = I;