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
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/Top"),
  d = e("../../Game/GameEnv"),
  h = e("../../Game/Player/Mng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.okBtn = null;
    this.scrollList = null;
    this.call = null;
    this.dropDownBox = null;
    this.emptyNode = null;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
      this.dropDownBox.node.on(s.default.SELECT_CHANGE, this.onDropDownBoxSelect, this);
      this.scrollList.node.on(r.default.SELECT_ITEM, (e, t) => {
        console.log(d.gameEnv.fileCDN + t.url);
      }, this);
      this.init();
    });
  }
  getConfDatas(e) {
    let t = [];
    e.forEach(e => {
      e.isBuildIn || t.push({
        url: e.textureName,
        goodsUId: e.goodsUId,
        importOthersImg: e.importOthersImg,
        belongGameId: e.belongGameId
      });
    });
    return t;
  }
  onDropDownBoxSelect(e, t) {
    return n(this, void 0, void 0, function* () {
      let e = [];
      c.default.showLoading("加载中");
      switch (t.type) {
        case "all":
          e = (e = (e = (e = (e = (e = yield h.Mng.Ins.tileMng.loadAll()).concat(yield h.Mng.Ins.actorMng.loadAll())).concat(yield h.Mng.Ins.deviceMng.loadAll())).concat(yield h.Mng.Ins.propMng.loadAll())).concat(yield h.Mng.Ins.weaponMng.loadAll())).concat(yield h.Mng.Ins.bulletMng.loadAll());
          break;
        case "tile":
          e = yield h.Mng.Ins.tileMng.loadAll();
          break;
        case "actor":
          e = yield h.Mng.Ins.actorMng.loadAll();
          break;
        case "device":
          e = yield h.Mng.Ins.deviceMng.loadAll();
          break;
        case "prop":
          e = yield h.Mng.Ins.propMng.loadAll();
          break;
        case "weapon":
          e = yield h.Mng.Ins.weaponMng.loadAll();
          break;
        case "bullect":
          e = yield h.Mng.Ins.bulletMng.loadAll();
      }
      let o = this.getConfDatas(e);
      this.scrollList.setDataArr(o);
      this.emptyNode.active = 0 == o.length;
      c.default.hideLoading();
    });
  }
  init() {
    return n(this, void 0, void 0, function* () {
      this.dropDownBox.setDataArr([{
        str: "全部素材",
        type: "all"
      }, {
        str: "地块",
        type: "tile"
      }, {
        str: "角色",
        type: "actor"
      }, {
        str: "装置",
        type: "device"
      }, {
        str: "道具",
        type: "prop"
      }, {
        str: "武器",
        type: "weapon"
      }, {
        str: "子弹",
        type: "bullect"
      }]);
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = this.scrollList.getCurData();
    if (e) {
      let t = !!e.importOthersImg || !!e.goodsUId;
      this.call && this.call(e.url, t, e.belongGameId);
    }
  }
};
i([u(a.default)], m.prototype, "okBtn", void 0);
i([u(r.default)], m.prototype, "scrollList", void 0);
i([u(s.default)], m.prototype, "dropDownBox", void 0);
i([u(cc.Node)], m.prototype, "emptyNode", void 0);
m = i([p], m);
exports.default = m;