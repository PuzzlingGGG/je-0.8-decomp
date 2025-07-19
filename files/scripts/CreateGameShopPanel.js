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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/UIColor"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/Mng"),
  m = e("../../GameData/GameTypeDefine"),
  f = e("../../Scene/EditWorldScene/EditWorldScene"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends l.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.bgBtn = null;
    this.actorBtn = null;
    this.nameEditBox = null;
    this.welcomeEditBox = null;
    this.scrollList = null;
    this.createBtn = null;
    this.deleteBtn = null;
    this.saveBtn = null;
    this.createCall = null;
    this.saveCall = null;
    this.data = null;
    this.style = "create";
  }
  onLoad() {
    super.onLoad();
    this.bgBtn.node.on(s.default.CLICK, this.onBgBtn, this);
    this.actorBtn.node.on(s.default.CLICK, this.onActorBtn, this);
    this.createBtn.node.on(s.default.CLICK, this.onCreateBtn, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtn, this);
    this.saveBtn.node.on(s.default.CLICK, this.onSaveBtn, this);
    this.scrollList.node.on(r.default.CLICK_ITEM, this.onClickItem, this);
    this.node.on("CreateGameShopCell.onDeleteBtn", this.onCreateGameShopCellDeleteBtn, this);
  }
  toCreateStyle() {
    return n(this, void 0, void 0, function* () {
      let e,
        t = {
          type: m.CommonDataType.Shop,
          id: null,
          name: "",
          actorId: "2",
          welcome: "欢迎光临",
          goodses: [],
          textureName: "Shop/shop",
          belongGameId: ""
        },
        o = c.default.ins.findScene(f.default).gameData,
        i = yield u.Mng.Ins.gameShopMng.loadMany(o.gameShopIds),
        n = 1;
      do {
        e = "Shop" + n;
        n++;
      } while (i.findIndex(t => t.name == e) >= 0);
      t.name = e;
      this.style = "edit";
      this.titleLabel.string = "Create Shop";
      this.createBtn.node.active = !0;
      this.deleteBtn.node.active = !1;
      this.saveBtn.node.active = !1;
      this.setData(t);
    });
  }
  toEditStyle(e) {
    e = p.Util.deepCopy(e);
    this.style = "create";
    this.titleLabel.string = "Edit Shop";
    this.createBtn.node.active = !1;
    this.deleteBtn.node.active = !0;
    this.saveBtn.node.active = !0;
    this.setData(e);
  }
  setData(e) {
    this.data = e;
    this.nameEditBox.string = e.name;
    this.welcomeEditBox.string = e.welcome;
    u.Mng.Ins.spriteMng.setShopSprite(this.bgBtn.icon, e.textureName, 196);
    this.setActor(e.actorId);
    this.refreshList();
  }
  refreshList() {
    let e = this.data.goodses.concat();
    e.length < 6 && e.push(null);
    this.scrollList.setDataArr(e);
  }
  setActor(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield u.Mng.Ins.actorMng.loadOne(e);
      u.Mng.Ins.spriteMng.setActorSprite(this.actorBtn.icon, t.textureName, 50);
      this.actorBtn.label.string = t.name;
    });
  }
  onActorBtn() {
    c.default.ins.OpenPanelByName("SelectActorPanel", e => {
      e.setData(this.data.actorId);
      e.selectCall = e => {
        this.data.actorId = e.id;
        this.setActor(e.id);
      };
    });
  }
  onBgBtn() {
    d.default.showLoading("加载中");
    c.default.ins.Enter("PaintScene", e => n(this, void 0, void 0, function* () {
      e.toPaintShop();
      if (p.Util.isCdnPng(this.data.textureName)) {
        let t = yield p.Util.downloadPngPixel(this.data.textureName);
        e.graphics.drawPixels(t);
      }
      d.default.hideLoading();
      e.setImportOthersImg(this.data.importOthersImg);
      e.completeCall = (e, t, o, i) => n(this, void 0, void 0, function* () {
        let o = yield p.Util.uploadPng(e, a.ImageFileType.actor, i);
        if (o.err) d.default.showToast("图片违规：" + o.err);else {
          this.data.textureName = o.url;
          this.data.importOthersImg = t;
          u.Mng.Ins.spriteMng.setSprite(this.bgBtn.icon, this.data.textureName, 150);
          c.default.ins.Back();
          yield u.Mng.Ins.gameShopMng.save(this.data);
          this.saveCall && this.saveCall(this.data);
          d.default.showToast("重绘已保存");
        }
      });
    }));
  }
  onClickItem(e, t) {
    if (null == t) {
      let e = {
        propId: "2",
        price: 10,
        costType: m.GameGoodsCostType.Coin,
        advert: "草莓味回血药剂！"
      };
      this.data.goodses.push(e);
      this.refreshList();
    }
  }
  onCreateGameShopCellDeleteBtn(e) {
    let t = e.detail,
      o = this.data.goodses.indexOf(t);
    o >= 0 && this.data.goodses.splice(o, 1);
    this.refreshList();
  }
  onCreateBtn() {
    return n(this, void 0, void 0, function* () {
      this.closePanel();
      let e = c.default.ins.findScene(f.default).gameData;
      if (yield u.Mng.Ins.gameShopMng.create(this.data, e)) {
        this.createCall && this.createCall(this.data);
        d.default.showToast("创建成功");
      } else d.default.showToast("创建失败");
    });
  }
  onSaveBtn() {
    return n(this, void 0, void 0, function* () {
      this.closePanel();
      this.data.name = this.nameEditBox.textLabel.string;
      this.data.welcome = this.welcomeEditBox.textLabel.string;
      yield u.Mng.Ins.gameShopMng.save(this.data);
      this.saveCall && this.saveCall(this.data);
      d.default.showToast("已保存");
    });
  }
  onDeleteBtn() {
    return n(this, void 0, void 0, function* () {
      c.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "Delete this shop？";
        e.setLeftBtn({
          text: "Delete",
          color: h.UIColor.pink,
          call: () => n(this, void 0, void 0, function* () {
            let e = c.default.ins.findScene(f.default).gameData;
            yield u.Mng.Ins.gameShopMng.delete(this.data, e);
            this.closePanel();
            cc.game.emit("refreshGameShopList");
            d.default.showToast("Deleted");
          })
        });
        e.setRightBtn({
          text: "点错了",
          color: h.UIColor.blue
        });
      });
    });
  }
};
i([y(cc.Label)], v.prototype, "titleLabel", void 0);
i([y(s.default)], v.prototype, "bgBtn", void 0);
i([y(s.default)], v.prototype, "actorBtn", void 0);
i([y(cc.EditBox)], v.prototype, "nameEditBox", void 0);
i([y(cc.EditBox)], v.prototype, "welcomeEditBox", void 0);
i([y(r.default)], v.prototype, "scrollList", void 0);
i([y(s.default)], v.prototype, "createBtn", void 0);
i([y(s.default)], v.prototype, "deleteBtn", void 0);
i([y(s.default)], v.prototype, "saveBtn", void 0);
v = i([g], v);
exports.default = v;