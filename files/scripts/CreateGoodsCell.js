"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../../scripts/_autogen/data/data"),
  a = e("../../../CustomUI/Button"),
  s = e("../../../Frame/SceneManager"),
  r = e("../../../Frame/Top"),
  l = e("../../../Game/Hortor"),
  c = e("../../../Game/OperationFlow"),
  d = e("../../../Game/Player/CreditMng"),
  h = e("../../../Game/Player/DynamicMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  onLoad() {
    this.node.on(a.default.CLICK, this.onClick, this);
  }
  onClick() {
    if (h.DynamicMng.Ins.isDisable(h.FunctionEnum.PublishGoods, !0)) return;
    if (l.Hortor.isVisitor()) {
      c.OperationFlow.openVisitorPanel();
      return;
    }
    if (d.CreditMng.Ins.credit <= 2) {
      r.default.showToast("近期违规，不能上传作品");
      return;
    }
    let e = {
      goodsId: "",
      name: "",
      iconTextureName: "",
      advert: "",
      price: 0,
      goodsType: n.GoodsType.all,
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
    s.default.ins.OpenPanelByName("UploadGoodsPanel", t => {
      t.setData(e, this.data ? "modify" : "upload");
      t.uploadCall = () => {
        cc.game.emit("MyGoodsChange");
      };
    });
  }
};
m = i([p], m);
exports.default = m;