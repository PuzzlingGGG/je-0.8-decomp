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
const a = e("../../../TypeScript/Frame/Panel"),
  s = e("../../../TypeScript/Game/Player/ShopMng"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/HeadIcon"),
  c = e("../../CustomUI/ScrollList"),
  d = e("../../Frame/Config"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Top"),
  u = e("../../Frame/UIColor"),
  m = e("../../Frame/Util"),
  f = e("../../Game/GameEnv"),
  g = e("../../Game/Hortor"),
  y = e("../../Game/OperationFlow"),
  v = e("../../Game/Player/CoinMng"),
  C = e("../../Game/Player/DynamicMng"),
  _ = e("../../Game/Player/PlayerDetailMng"),
  S = e("../../Game/Player/TalkMng"),
  I = e("../../GameData/GameTypeDefine"),
  G = e("../../Role"),
  T = e("../../Scene/FriendSceen/FriendScene"),
  b = e("../../TGA"),
  M = e("../../Frame/Share"),
  P = e("../../Game/Player/CollectionMng"),
  D = e("../../Game/PathConfig"),
  w = e("../../../i18n/i18nMgr"),
  {
    ccclass: B,
    property: R
  } = cc._decorator;
let x = class extends a.default {
  constructor() {
    super(...arguments);
    this.headIcon = null;
    this.userNameLabel = null;
    this.advertLabel = null;
    this.goodsNameLabel = null;
    this.saleCntLabel = null;
    this.timeLabel = null;
    this.packageSizeLabel = null;
    this.scrollList = null;
    this.shareBtn = null;
    this.buyBtn = null;
    this.discountBuyBtn = null;
    this.fullPriceLabel = null;
    this.discountLabel = null;
    this.mineLabel = null;
    this.menuBtn = null;
    this.info = null;
    this.buyCall = null;
    this.discount = 1;
    this.price = 0;
  }
  onLoad() {
    super.onLoad();
    this.buyBtn.node.on(r.default.CLICK, this.onBuyBtn, this);
    this.shareBtn.node.on(r.default.CLICK, this.onShareBtn, this);
    this.discountBuyBtn.node.on(r.default.CLICK, this.onBuyBtn, this);
    this.headIcon.node.on(r.default.CLICK, this.onHeadIcon, this);
    this.menuBtn.node.on(r.default.CLICK, this.onMenuBtn, this);
    this.buyBtn.node.active = !0;
    this.discountBuyBtn.node.active = !1;
  }
  onCollectBtn() {
    return n(this, void 0, void 0, function* () {
      this.closePanel();
      let e = this.info.id,
        t = yield s.default.Ins.gmLoadAllChosenGoodsIds();
      if (t.includes(e)) {
        let o = t.indexOf(e);
        o >= 0 && t.splice(o, 1);
      } else {
        let o = t.indexOf(e);
        o >= 0 && t.splice(o, 1);
        t.unshift(e);
      }
      cc.game.emit("RefreshShopList");
    });
  }
  onBanBtn() {
    return n(this, void 0, void 0, function* () {
      h.default.ins.OpenPanelByName("BanGoodsPanel", e => {
        e.setData(this.info.id);
      });
    });
  }
  onMenuBtn() {
    return n(this, void 0, void 0, function* () {
      let e = [{
          str: "举报",
          icon: {
            url: "Atlas/UI/reportBtn",
            color: u.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => {
            this.onReportBtn();
          }
        }, {
          str: "分享",
          icon: {
            url: "Atlas/UI/ttShare",
            color: u.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            this.onShareBtn();
          }
        }],
        t = P.CollectionMng.Ins.isCollectGoods(this.info.id);
      e.push({
        str: t ? "取消收藏" : "收藏",
        icon: {
          url: D.default.ICON_MENU_COLLECTION,
          color: t ? u.UIColor.yellow : u.UIColor.gray,
          w: 40,
          h: 40
        },
        call: () => n(this, void 0, void 0, function* () {
          t ? P.CollectionMng.Ins.unCollectGoods(this.info.id) : P.CollectionMng.Ins.collectGoods(this.info.id);
        })
      });
      if (C.DynamicMng.Ins.isGmPlayer() || g.Hortor.platformSysBigType == g.PlatformSysBigType.H5) {
        let t = yield s.default.Ins.gmLoadAllChosenGoodsIds(),
          o = (yield C.DynamicMng.Ins.loadOne("IpGoodsIds")) || [];
        e.push({
          str: t.includes(this.info.id) ? "移除精选" : "加入精选",
          icon: {
            url: "Atlas/UI/ttShare",
            color: u.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            this.onCollectBtn();
          }
        });
        e.push({
          str: o.includes(this.info.id) ? "取消Ip" : "标记IP",
          icon: {
            url: "Atlas/UI/ttShare",
            color: u.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            if (o.includes(this.info.id)) {
              let e = o.indexOf(this.info.id);
              o.splice(e, 1);
            } else o.unshift(this.info.id);
            cc.game.emit("RefreshShopList");
          }
        });
        e.push({
          str: "下架",
          icon: {
            url: "Atlas/UI/ttShare",
            color: u.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            this.onBanBtn();
          }
        });
        e.push({
          str: "游戏信息",
          icon: {
            url: "Atlas/UI/reportBtn",
            color: u.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => {
            h.default.ins.OpenPanelByName("AboutPanel", e => {
              let t = w.I18nMgr.exceI18nStringByZh("商品ID：${this.info.id}", [{
                paramName: "this.info.id",
                param: this.info.id
              }]);
              e.setData("商品信息", t);
              console.log(t);
            });
          }
        });
      }
      p.default.showMenu(this.menuBtn.node, e);
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.info = e;
      this.price = e.price;
      this.goodsNameLabel.string = e.name + ":";
      this.advertLabel.string = e.advert;
      this.saleCntLabel.string = e.saleCnt + w.I18nMgr.getI18nStringByZh("次下载");
      this.buyBtn.label.string = e.price + w.I18nMgr.getI18nStringByZh("购买");
      let t = [];
      for (let o = 0; o < e.goodsContent.tileConfs.length; o++) {
        let i = e.goodsContent.tileConfs[o];
        i.conf.typeName = "地块";
        t.push(i);
      }
      for (let o = 0; o < e.goodsContent.actorConfs.length; o++) {
        let i = e.goodsContent.actorConfs[o];
        i.conf.typeName = "角色";
        t.push(i);
      }
      for (let o = 0; o < e.goodsContent.deviceConfs.length; o++) {
        let i = e.goodsContent.deviceConfs[o],
          n = i.conf;
        i.conf.typeName = d.Config.getDeviceTypeName(n.deviceType);
        t.push(i);
      }
      for (let o = 0; o < e.goodsContent.propConfs.length; o++) {
        let i = e.goodsContent.propConfs[o];
        i.conf.typeName = "道具";
        t.push(i);
      }
      for (let o = 0; o < e.goodsContent.weaponConfs.length; o++) {
        let i = e.goodsContent.weaponConfs[o],
          n = i.conf;
        n.weaponType == I.WeaponType.Gun ? i.conf.typeName = "直射武器" : n.weaponType == I.WeaponType.Melee ? i.conf.typeName = "近战武器" : n.weaponType == I.WeaponType.Cast ? i.conf.typeName = "弹射武器" : i.conf.typeName = "武器";
        t.push(i);
      }
      this.scrollList.setDataArr(t);
      let o = yield _.default.Ins.load(e.playerId);
      this.timeLabel.string = "Upload on: " + m.Util.parseDataString(e.upStamp);
      this.packageSizeLabel.string = t.length + "";
      if (o) {
        this.userNameLabel.string = o.userName;
        this.headIcon.loadUrl(o.userImg);
        this.headIcon.setLevel(o.level);
      }
      if (this.info.playerId == G.default.Ins.role.id) {
        this.buyBtn.node.active = !1;
        this.discountBuyBtn.node.active = !1;
        this.mineLabel.node.active = !0;
      } else this.mineLabel.node.active = !1;
    });
  }
  setDiscount(e) {
    return n(this, void 0, void 0, function* () {
      if (1 == e) {
        this.buyBtn.node.active = !0;
        this.discountBuyBtn.node.active = !1;
      } else {
        this.discount = e;
        this.price = Math.ceil(this.info.price * this.discount);
        this.discountBuyBtn.label.string = this.price + "购买";
        this.fullPriceLabel.string = "原价" + this.info.price;
        this.discountLabel.string = 10 * e + "折";
        if (this.buyBtn.node.active) {
          this.buyBtn.node.active = !1;
          this.discountBuyBtn.node.active = !0;
        }
      }
    });
  }
  onBuyBtn() {
    return n(this, void 0, void 0, function* () {
      if ((v.default.Ins.coin || 0) < this.price) h.default.ins.OpenPanelByName("LackCoinPanel", e => {
        e.titleLabel.string = "G币不足";
      });else {
        p.default.showLoading("下载中");
        let e = yield s.default.Ins.buy(this.info.id, this.discount);
        p.default.hideLoading();
        v.default.Ins.costCoin(this.price);
        this.closePanel();
        y.OperationFlow.openRewards(e);
        this.buyCall && this.buyCall();
        b.TGA.track("buyGoods", {
          goodsId: this.info.id,
          price: this.price,
          goodsType: this.info.goodsType,
          packageSize: e.length,
          discount: this.discount
        });
      }
    });
  }
  onHeadIcon() {
    let e = h.default.ins.findScene(T.default);
    e && e.enabled ? this.closePanel() : h.default.ins.Enter("FriendScene", e => {
      e.setData(this.info.playerId);
    }, h.ShiftAnima.moveLeftShift);
  }
  onReportBtn() {
    h.default.ins.Enter("ReportScene", e => {
      e.initReportGoods(this.info.id);
    }, h.ShiftAnima.moveLeftShift);
  }
  onShareBtn() {
    let e = {
        type: "goods",
        isMine: this.info.playerId == G.default.Ins.role.id,
        goodsId: this.info.id
      },
      t = {
        shareType: "shareGoods",
        title: g.Hortor.isApp() ? this.info.name : `${this.info.name}：${this.info.advert}`,
        desc: this.info.advert,
        imageUrl: f.gameEnv.fileCDN + this.info.iconTextureName,
        query: m.Util.toQueryStr(e),
        imageName: this.info.iconTextureName,
        talk: {
          title: "",
          sections: [{
            type: S.TalkSectionType.Goods,
            goodsId: this.info.id
          }]
        },
        success: () => {
          p.default.showToast("分享成功");
          b.TGA.track("share", e);
        },
        fail: () => {
          p.default.showToast("分享失败");
        }
      };
    M.Share.share(t);
  }
};
i([R(l.default)], x.prototype, "headIcon", void 0);
i([R(cc.Label)], x.prototype, "userNameLabel", void 0);
i([R(cc.Label)], x.prototype, "advertLabel", void 0);
i([R(cc.Label)], x.prototype, "goodsNameLabel", void 0);
i([R(cc.Label)], x.prototype, "saleCntLabel", void 0);
i([R(cc.Label)], x.prototype, "timeLabel", void 0);
i([R(cc.Label)], x.prototype, "packageSizeLabel", void 0);
i([R(c.default)], x.prototype, "scrollList", void 0);
i([R(r.default)], x.prototype, "shareBtn", void 0);
i([R(r.default)], x.prototype, "buyBtn", void 0);
i([R(r.default)], x.prototype, "discountBuyBtn", void 0);
i([R(cc.Label)], x.prototype, "fullPriceLabel", void 0);
i([R(cc.Label)], x.prototype, "discountLabel", void 0);
i([R(cc.Label)], x.prototype, "mineLabel", void 0);
i([R(r.default)], x.prototype, "menuBtn", void 0);
x = i([B], x);
exports.default = x;