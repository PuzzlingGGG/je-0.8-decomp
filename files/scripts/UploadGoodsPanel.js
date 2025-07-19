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
  s = e("../../../scripts/_autogen/data/data"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../CustomUI/Slider"),
  d = e("../../Frame/Panel"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Top"),
  u = e("../../Frame/UIColor"),
  m = e("../../Game/OperationFlow"),
  f = e("../../Game/Player/Mng"),
  g = e("../../Game/Player/ShopMng"),
  y = e("../../GameData/GameTypeDefine"),
  v = e("../../TGA"),
  {
    ccclass: C,
    property: _
  } = cc._decorator;
let S = class extends d.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.goodsList = null;
    this.nameEditBox = null;
    this.advertEditBox = null;
    this.priceSlider = null;
    this.priceLabel = null;
    this.uploadBtn = null;
    this.questionBtn = null;
    this.params = null;
    this.uploadType = null;
    this.uploadCall = null;
  }
  onLoad() {
    super.onLoad();
    this.uploadBtn.node.on(r.default.CLICK, this.onUploadBtn, this);
    this.goodsList.node.on(l.default.CLICK_ITEM, this.onClickCell, this);
    this.priceSlider.node.on(c.default.MOVE, this.onSliderMove, this);
    this.questionBtn.node.on(r.default.CLICK, this.openSummaryDividePanel, this);
    this.node.on("UploadGoodsCell.onDeleteBtn", this.onUploadGoodsCellDeleteBtn, this);
  }
  setData(e, t) {
    this.params = e;
    this.uploadType = t;
    this.nameEditBox.string = e.name;
    this.advertEditBox.string = e.advert;
    this.priceSlider.value = e.price;
    this.refreshList();
    this.updatePriceRange();
    this.priceSlider.value = this.params.price;
  }
  onUploadBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.params;
      e.name = this.nameEditBox.textLabel.string;
      e.advert = this.advertEditBox.textLabel.string;
      e.price = this.priceSlider.value;
      if (0 == this.params.name.length) {
        p.default.showToast("请填写名字");
        return;
      }
      let t = e.tileConfIds.concat(e.actorConfIds).concat(e.deviceConfIds).concat(e.propConfIds).concat(e.weaponConfIds);
      if (t.length <= 0) {
        p.default.showToast("至少添加一个作品");
        return;
      }
      let o = yield this.checkImportOther(e);
      if (o) {
        p.default.showToast(o);
        return;
      }
      e.iconTextureName = yield this.getTextureName(e);
      e.goodsType = yield this.getType(e);
      let i = [];
      for (let t = 0; t < e.weaponConfIds.length; t++) {
        let o = e.weaponConfIds[t],
          n = yield f.Mng.Ins.weaponMng.loadOne(o),
          a = null;
        n && n.weaponType == y.WeaponType.Gun && n.gun && (a = n.gun.bulletId);
        n.weaponType == y.WeaponType.Cast && n.cast && (a = n.cast.bulletId);
        let s = yield f.Mng.Ins.bulletMng.loadOne(a);
        !s || s.isBuildIn || i.includes(a) || i.push(a);
      }
      e.bulletConfIds = i;
      e.reviewStr = "";
      e.sensitiveMsg = yield this.collectString(e);
      e.reviewImageMap = yield m.OperationFlow.getReviewImageMap(e);
      p.default.showLoading("上传中");
      let n = yield g.default.Ins.uploadGoods(e);
      if (n) {
        if (n.sensitiveWords && n.sensitiveWords.length > 0) {
          p.default.hideLoading();
          h.default.ins.OpenPanelByName("MessageBox", e => {
            e.titleLabel.string = "发布失败";
            e.label.string = "检测到敏感词：" + n.sensitiveWords.join(",");
            e.leftBtn.node.active = !1;
            e.setRightBtn({
              text: "确定",
              color: u.UIColor.blue
            });
          });
        } else {
          p.default.hideLoading("上传成功");
          this.closePanel();
          this.uploadCall && this.uploadCall();
          v.TGA.track("uploadGoods", {
            goodsId: n.id,
            price: e.price,
            goodsType: e.goodsType,
            uploadType: this.uploadType,
            packageSize: t.length
          });
        }
      } else p.default.hideLoading("上传失败");
    });
  }
  checkImportOther(e) {
    return n(this, void 0, void 0, function* () {
      for (let t = 0; t < e.tileConfIds.length; t++) {
        let o = yield f.Mng.Ins.tileMng.loadOne(e.tileConfIds[t]);
        if (o && o.importOthersImg) return `地块：${o.name}，涉及他人素材不能上传`;
      }
      for (let t = 0; t < e.actorConfIds.length; t++) {
        let o = yield f.Mng.Ins.actorMng.loadOne(e.actorConfIds[t]);
        if (o && o.importOthersImg) return `角色：${o.name}，涉及他人素材不能上传`;
      }
      for (let t = 0; t < e.deviceConfIds.length; t++) {
        let o = yield f.Mng.Ins.deviceMng.loadOne(e.deviceConfIds[t]);
        if (o && o.importOthersImg) return `装置：${o.name}，涉及他人素材不能上传`;
      }
      for (let t = 0; t < e.propConfIds.length; t++) {
        let o = yield f.Mng.Ins.propMng.loadOne(e.propConfIds[t]);
        if (o && o.importOthersImg) return `道具：${o.name}，涉及他人素材不能上传`;
      }
      for (let t = 0; t < e.weaponConfIds.length; t++) {
        let o = yield f.Mng.Ins.weaponMng.loadOne(e.weaponConfIds[t]);
        if (o && o.importOthersImg) return `武器：${o.name}，涉及他人素材不能上传`;
      }
      return null;
    });
  }
  onSliderMove(e) {
    this.priceLabel.string = e.toFixed();
  }
  getTextureName(e) {
    return n(this, void 0, void 0, function* () {
      for (let t = 0; t < e.tileConfIds.length; t++) {
        let o = e.tileConfIds[t],
          i = yield f.Mng.Ins.tileMng.loadOne(o);
        if (i) return i.textureName;
      }
      for (let t = 0; t < e.actorConfIds.length; t++) {
        let o = e.actorConfIds[t],
          i = yield f.Mng.Ins.actorMng.loadOne(o);
        if (i) return i.textureName;
      }
      for (let t = 0; t < e.deviceConfIds.length; t++) {
        let o = e.deviceConfIds[t],
          i = yield f.Mng.Ins.deviceMng.loadOne(o);
        if (i) return i.textureName;
      }
      for (let t = 0; t < e.propConfIds.length; t++) {
        let o = e.propConfIds[t],
          i = yield f.Mng.Ins.propMng.loadOne(o);
        if (i) return i.textureName;
      }
      for (let t = 0; t < e.weaponConfIds.length; t++) {
        let o = e.weaponConfIds[t],
          i = yield f.Mng.Ins.weaponMng.loadOne(o);
        if (i) return i.textureName;
      }
    });
  }
  collectString(e) {
    return n(this, void 0, void 0, function* () {
      let t = e.name + "哈" + e.advert;
      for (let o = 0; o < e.tileConfIds.length; o++) {
        let i = e.tileConfIds[o],
          n = yield f.Mng.Ins.tileMng.loadOne(i);
        n && (t += "哈" + n.name);
      }
      for (let o = 0; o < e.actorConfIds.length; o++) {
        let i = e.actorConfIds[o],
          n = yield f.Mng.Ins.actorMng.loadOne(i);
        n && (t += "哈" + n.name);
      }
      for (let o = 0; o < e.deviceConfIds.length; o++) {
        let i = e.deviceConfIds[o],
          n = yield f.Mng.Ins.deviceMng.loadOne(i);
        n && (t += "哈" + n.name);
      }
      for (let o = 0; o < e.propConfIds.length; o++) {
        let i = e.propConfIds[o],
          n = yield f.Mng.Ins.propMng.loadOne(i);
        if (n) {
          t += "哈" + n.name;
          t += "哈" + n.intro;
        }
      }
      for (let o = 0; o < e.weaponConfIds.length; o++) {
        let i = e.weaponConfIds[o],
          n = yield f.Mng.Ins.weaponMng.loadOne(i);
        n && (t += "哈" + n.name);
      }
      return t;
    });
  }
  getType(e) {
    return n(this, void 0, void 0, function* () {
      let t = [];
      e.tileConfIds.length > 0 && t.push(s.GoodsType.tile);
      e.actorConfIds.length > 0 && t.push(s.GoodsType.actor);
      e.deviceConfIds.length > 0 && t.push(s.GoodsType.device);
      e.propConfIds.length > 0 && t.push(s.GoodsType.prop);
      e.weaponConfIds.length > 0 && t.push(s.GoodsType.weapon);
      return 1 == t.length ? t[0] : t.length > 1 ? s.GoodsType.package : s.GoodsType.all;
    });
  }
  onClickCell(e, t) {
    h.default.ins.OpenPanelByName("SelectGoodsItemPanel", e => {
      switch (t.type) {
        case "tile":
          e.selectToggle(0);
          break;
        case "actor":
          e.selectToggle(1);
          break;
        case "device":
          e.selectToggle(2);
          break;
        case "prop":
          e.selectToggle(3);
          break;
        case "weapon":
          e.selectToggle(4);
      }
      e.setData(this.params);
      e.call = () => {
        this.refreshList();
        this.centerPrice();
      };
    });
  }
  centerPrice() {
    this.updatePriceRange();
    let e = (this.priceSlider.max + this.priceSlider.min) / 2;
    this.priceSlider.value = e;
  }
  onUploadGoodsCellDeleteBtn(e) {
    return n(this, void 0, void 0, function* () {
      let t = e.detail;
      switch (t.type) {
        case "tile":
          {
            let e = this.params.tileConfIds.indexOf(t.id);
            e >= 0 && this.params.tileConfIds.splice(e, 1);
            break;
          }
        case "actor":
          {
            let e = this.params.actorConfIds.indexOf(t.id);
            e >= 0 && this.params.actorConfIds.splice(e, 1);
            break;
          }
        case "device":
          {
            let e = this.params.deviceConfIds.indexOf(t.id);
            e >= 0 && this.params.deviceConfIds.splice(e, 1);
            break;
          }
        case "prop":
          {
            let e = this.params.propConfIds.indexOf(t.id);
            e >= 0 && this.params.propConfIds.splice(e, 1);
            break;
          }
        case "weapon":
          {
            let e = this.params.weaponConfIds.indexOf(t.id);
            e >= 0 && this.params.weaponConfIds.splice(e, 1);
            break;
          }
      }
      this.refreshList();
      this.centerPrice();
    });
  }
  refreshList() {
    let e = [];
    for (let t = 0; t < this.params.tileConfIds.length; t++) e.push({
      type: "tile",
      id: this.params.tileConfIds[t]
    });
    for (let t = 0; t < this.params.actorConfIds.length; t++) e.push({
      type: "actor",
      id: this.params.actorConfIds[t]
    });
    for (let t = 0; t < this.params.deviceConfIds.length; t++) e.push({
      type: "device",
      id: this.params.deviceConfIds[t]
    });
    for (let t = 0; t < this.params.propConfIds.length; t++) e.push({
      type: "prop",
      id: this.params.propConfIds[t]
    });
    for (let t = 0; t < this.params.weaponConfIds.length; t++) e.push({
      type: "weapon",
      id: this.params.weaponConfIds[t]
    });
    let t = e.length;
    if (e.length < g.default.Ins.packageSizeMax) e.push({
      type: "add",
      id: ""
    });else if (e.length > g.default.Ins.packageSizeMax) {
      e = e.slice(0, g.default.Ins.packageSizeMax);
      p.default.showToast(`最多${g.default.Ins.packageSizeMax}个`);
    }
    this.goodsList.setDataArr(e);
    this.titleLabel.string = a.I18nMgr.exceI18nStringByZh("上传素材（${cnt}/${ShopMng.Ins.packageSizeMax}）", [{
      paramName: "cnt",
      param: t
    }, {
      paramName: "ShopMng.Ins.packageSizeMax",
      param: g.default.Ins.packageSizeMax
    }]);
  }
  updatePriceRange() {
    let e = this.goodsList.getDataArr() || [];
    e.filter(e => "add" != e.type);
    let t = e.length - 1,
      o = 50 * (t = Math.max(t, 1)),
      i = 200 * t;
    this.priceSlider.setRange(o, i);
    this.priceSlider.step = i - o + 1;
  }
  openSummaryDividePanel() {
    h.default.ins.OpenPanelByName("MessageBox", e => {
      e.titleLabel.string = "定价说明";
      e.label.string = "    当别人购买您的素材时，您作为创作者可以获得其中的60%，平台回收40%";
      e.rightBtn.node.active = !1;
      e.setLeftBtn({
        text: "确定",
        color: u.UIColor.green
      });
    });
  }
};
i([_(cc.Label)], S.prototype, "titleLabel", void 0);
i([_(l.default)], S.prototype, "goodsList", void 0);
i([_(cc.EditBox)], S.prototype, "nameEditBox", void 0);
i([_(cc.EditBox)], S.prototype, "advertEditBox", void 0);
i([_(c.default)], S.prototype, "priceSlider", void 0);
i([_(cc.Label)], S.prototype, "priceLabel", void 0);
i([_(r.default)], S.prototype, "uploadBtn", void 0);
i([_(r.default)], S.prototype, "questionBtn", void 0);
S = i([C], S);
exports.default = S;