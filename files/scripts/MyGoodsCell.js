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
const s = e("../../../../i18n/i18nMgr"),
  r = e("../../../../scripts/_autogen/data/data"),
  l = e("../../../CustomUI/Button"),
  c = e("../../../CustomUI/ScrollList"),
  d = e("../../../Frame/SceneManager"),
  h = e("../../../Frame/Share"),
  p = e("../../../Frame/Top"),
  u = e("../../../Frame/UIColor"),
  m = e("../../../Frame/Util"),
  f = e("../../../Game/GameEnv"),
  g = e("../../../Game/Hortor"),
  y = e("../../../Game/OperationFlow"),
  v = e("../../../Game/Player/CreditMng"),
  C = e("../../../Game/Player/DynamicMng"),
  _ = e("../../../Game/Player/Mng"),
  S = e("../../../Game/Player/ShopMng"),
  I = e("../../../Game/Player/TalkMng"),
  G = e("../../../Role"),
  T = e("../../../TGA"),
  {
    ccclass: b,
    property: M
  } = cc._decorator;
let P = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.priceLabel = null;
    this.saleCntLabel = null;
    this.stateLabel = null;
    this.offBtn = null;
    this.editBtn = null;
    this.shareBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(c.default.SET_DATA, this.setData, this);
    this.node.on(l.default.CLICK, this.onEditBtn, this);
    this.offBtn.node.on(l.default.CLICK, this.onOffBtn, this);
    this.editBtn.node.on(l.default.CLICK, this.onEditBtn, this);
    this.shareBtn.node.on(l.default.CLICK, this.onShareBtn, this);
    this.stateLabel.node.on(l.default.CLICK, this.onStateBtn, this);
  }
  setData(e) {
    this.data = e;
    this.nameLabel.string = m.Util.clampStr(e.name, 9, "..");
    this.priceLabel.string = e.price + "";
    this.saleCntLabel.string = e.saleCnt + "";
    this.stateLabel.node.getComponent(l.default).interactable = !1;
    this.stateLabel.node.color = u.UIColor.gray;
    switch (e.status) {
      case r.GoodsStatus.inReview:
        this.stateLabel.string = "审核中";
        this.stateLabel.node.color = u.UIColor.black;
        break;
      case r.GoodsStatus.success:
        this.stateLabel.string = m.Util.parseDataString(e.upStamp);
        break;
      case r.GoodsStatus.fail:
        this.stateLabel.string = "审核未通过";
        this.stateLabel.node.color = u.UIColor.red;
        this.stateLabel.node.getComponent(l.default).interactable = !0;
    }
    _.Mng.Ins.spriteMng.setSprite(this.sprite, e.iconTextureName, 160);
  }
  onEditBtn() {
    return a(this, void 0, void 0, function* () {
      if (C.DynamicMng.Ins.isDisable(C.FunctionEnum.PublishGoods, !0)) return;
      if (v.CreditMng.Ins.credit <= 2) {
        p.default.showToast("近期违规，不能上传作品");
        return;
      }
      let e = {
        goodsId: "",
        name: "",
        iconTextureName: "",
        advert: "",
        price: 0,
        goodsType: r.GoodsType.all,
        tileConfIds: [],
        actorConfIds: [],
        propConfIds: [],
        deviceConfIds: [],
        weaponConfIds: [],
        bulletConfIds: [],
        sensitiveMsg: "",
        reviewStr: "",
        reviewImageMap: null
      };
      if (this.data) {
        e.goodsId = this.data.id;
        e.iconTextureName = this.data.iconTextureName;
        e.advert = this.data.advert;
        e.name = this.data.name;
        e.price = this.data.price;
        e.goodsType = this.data.goodsType;
        this.data.goodsContent.tileConfs.forEach(t => {
          e.tileConfIds.push(t.id);
        });
        this.data.goodsContent.actorConfs.forEach(t => {
          e.actorConfIds.push(t.id);
        });
        this.data.goodsContent.deviceConfs.forEach(t => {
          e.deviceConfIds.push(t.id);
        });
        this.data.goodsContent.propConfs.forEach(t => {
          e.propConfIds.push(t.id);
        });
        this.data.goodsContent.weaponConfs.forEach(t => {
          e.weaponConfIds.push(t.id);
        });
        this.data.goodsContent.bulletConfs.forEach(t => {
          e.bulletConfIds.push(t.id);
        });
      }
      if (!i.clickLock) {
        i.clickLock = !0;
        d.default.ins.OpenPanelByName("UploadGoodsPanel", t => {
          i.clickLock = !1;
          t.setData(e, this.data ? "modify" : "upload");
          t.uploadCall = () => {
            cc.game.emit("MyGoodsChange");
          };
        });
      }
    });
  }
  onOffBtn() {
    d.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = s.I18nMgr.exceI18nStringByZh("是否下架作品：${this.data.name}？", [{
        paramName: "this.data.name",
        param: this.data.name
      }]);
      e.setLeftBtn({
        text: "下架",
        color: u.UIColor.pink,
        call: () => a(this, void 0, void 0, function* () {
          yield S.default.Ins.offGoods(this.data.id);
          cc.game.emit("MyGoodsChange");
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: u.UIColor.blue
      });
    });
  }
  onShareBtn() {
    let e = {
        type: "goods",
        isMine: this.data.playerId == G.default.Ins.role.id,
        goodsId: this.data.id
      },
      t = {
        shareType: "shareGoods",
        title: g.Hortor.isApp() ? this.data.name : `${this.data.name}：${this.data.advert}`,
        desc: this.data.advert,
        imageUrl: f.gameEnv.fileCDN + this.data.iconTextureName,
        imageName: this.data.iconTextureName,
        query: m.Util.toQueryStr(e),
        talk: {
          title: "",
          sections: [{
            type: I.TalkSectionType.Goods,
            goodsId: this.data.id
          }]
        },
        success: () => {
          p.default.showToast("分享成功");
          T.TGA.track("share", e);
        },
        fail: e => {
          e || p.default.showToast("分享失败");
        }
      };
    h.Share.share(t);
  }
  onStateBtn() {
    d.default.ins.OpenPanelByName("ReviewFailReasonPanel", e => {
      let t = y.OperationFlow.makeOffReason(this.data.offReason);
      e.setData(t);
    });
  }
};
P.clickLock = !1;
n([M(cc.Sprite)], P.prototype, "sprite", void 0);
n([M(cc.Label)], P.prototype, "nameLabel", void 0);
n([M(cc.Label)], P.prototype, "priceLabel", void 0);
n([M(cc.Label)], P.prototype, "saleCntLabel", void 0);
n([M(cc.Label)], P.prototype, "stateLabel", void 0);
n([M(l.default)], P.prototype, "offBtn", void 0);
n([M(l.default)], P.prototype, "editBtn", void 0);
n([M(l.default)], P.prototype, "shareBtn", void 0);
P = i = n([b], P);
exports.default = P;