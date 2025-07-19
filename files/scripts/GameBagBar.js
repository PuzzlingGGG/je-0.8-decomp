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
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/GameBagMng"),
  p = e("../../Game/Player/Mng"),
  u = e("../../Game/Player/TriggerMng"),
  m = e("../../GameData/GameTypeDefine"),
  f = e("./GameScene"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.bagBtn = null;
    this.list = null;
    this.menu = null;
    this.useBtn = null;
    this.dropBtn = null;
    this.cancelBtn = null;
    this.nameLabel = null;
    this.introLabel = null;
    this.coinLabel = null;
    this.coinSprite = null;
  }
  onLoad() {
    this.bagBtn.node.on(a.default.CLICK, this.onBagBtn, this);
    this.useBtn.node.on(a.default.CLICK, this.onUseBtn, this);
    this.dropBtn.node.on(a.default.CLICK, this.onDropBtn, this);
    this.cancelBtn.node.on(a.default.CLICK, this.hideMenu, this);
    this.list.node.on(s.default.CLICK_ITEM, this.onClickItem, this);
    cc.game.on("refreshGameBagBar", this.refresh, this);
    this.hideMenu();
  }
  onDestroy() {
    cc.game.off("refreshGameBagBar", this.refresh, this);
  }
  refresh() {
    let e = h.default.Ins.propList.filter(e => !h.default.Ins.isCoin(e.propConfId));
    this.list.setDataArr(e);
    this.coinLabel.string = "" + h.default.Ins.getCoinCnt();
  }
  onBagBtn() {}
  onDropBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.list.getCurData();
      if (e) {
        let t = yield p.Mng.Ins.propMng.loadOne(e.propConfId),
          o = e.cnt,
          i = r.default.ins.findScene(f.default).world.hero;
        h.default.Ins.sub(e.propConfId, o);
        let n = d.Util.deepCopy(t.onDrop) || [];
        n.push({
          act: m.TriggerAct.DropProp,
          extra: {
            propConfId: e.propConfId,
            cnt: o,
            useGravity: !0
          }
        });
        u.default.Ins.emitTrigger(n, i.node);
      }
      this.hideMenu();
    });
  }
  onUseBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.list.getCurData();
      if (e) {
        let t = yield p.Mng.Ins.propMng.loadOne(e.propConfId),
          o = r.default.ins.findScene(f.default),
          i = o.world.hero,
          n = i.node.position;
        n.y += i.node.height / 2;
        if (h.default.Ins.getCnt(e.propConfId) > 0) {
          t.once && h.default.Ins.sub(t.id, 1);
          let e = d.Util.deepCopy(t.onUse, []);
          u.default.Ins.emitTrigger(e, i.node);
          o.world.playFloatLabel({
            str: `Use【${t.name}】`,
            pos: n,
            color: c.UIColor.purple,
            anim: "JumpLabel",
            size: 40
          });
        } else {
          l.default.showToast("Running out of props");
          o.world.playFloatLabel({
            str: "Running out of props",
            pos: n,
            color: c.UIColor.purple,
            anim: "FlashLabel",
            size: 40
          });
        }
      }
      this.hideMenu();
    });
  }
  onClickItem(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = this.list.getExtraData(e);
      if (o && o.item) {
        let e = d.Util.convertPosition(o.item, this.node);
        this.menu.x = e.x;
        this.menu.active = !0;
        this.cancelBtn.node.active = !0;
        let i = yield p.Mng.Ins.propMng.loadOne(t.propConfId);
        this.nameLabel.string = i.name;
        this.introLabel.string = i.intro;
      }
    });
  }
  show() {
    this.node.active = !0;
  }
  hide() {
    this.node.active = !1;
  }
  hideMenu() {
    this.menu.active = !1;
    this.cancelBtn.node.active = !1;
  }
};
i([y(a.default)], v.prototype, "bagBtn", void 0);
i([y(s.default)], v.prototype, "list", void 0);
i([y(cc.Node)], v.prototype, "menu", void 0);
i([y(a.default)], v.prototype, "useBtn", void 0);
i([y(a.default)], v.prototype, "dropBtn", void 0);
i([y(a.default)], v.prototype, "cancelBtn", void 0);
i([y(cc.Label)], v.prototype, "nameLabel", void 0);
i([y(cc.Label)], v.prototype, "introLabel", void 0);
i([y(cc.Label)], v.prototype, "coinLabel", void 0);
i([y(cc.Sprite)], v.prototype, "coinSprite", void 0);
v = i([g], v);
exports.default = v;