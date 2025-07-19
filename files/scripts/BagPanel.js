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
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/GameBagMng"),
  u = e("../../Game/Player/Mng"),
  m = e("../../Game/Player/TriggerMng"),
  f = e("../../GameData/GameTypeDefine"),
  g = e("../../Scene/GameScene/GameScene"),
  y = e("./BagCell"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = class extends r.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.bag_cell_show = null;
    this.label_name = null;
    this.label_desc = null;
    this.btn_drop = null;
    this.btn_use = null;
    this.coinCntLabel = null;
    this.emptyNode = null;
    this.content = null;
    this.triggerSource = null;
    this.conf = null;
    this.bagItemData = null;
  }
  onLoad() {
    super.onLoad();
    this.btn_drop.node.on(a.default.CLICK, this.onClickDrop, this);
    this.btn_use.node.on(a.default.CLICK, this.onClickUse, this);
    this.list.node.on(s.default.CLICK_ITEM, this.onClickItem, this);
    this.refreshList();
    this.list.selectByIdx(0);
    this.list.node.emit(s.default.CLICK_ITEM, this.list.curSelectIdx, this.list.getCurData());
    this.coinCntLabel.string = "x" + p.default.Ins.getCoinCnt();
  }
  refreshList() {
    let e = p.default.Ins.propList.filter(e => !p.default.Ins.isCoin(e.propConfId));
    this.list.setDataArr(e);
    this.emptyNode.active = 0 == e.length;
    this.content.active = 0 !== e.length;
  }
  onClickItem(e, t) {
    t && this.setContent(t);
  }
  setContent(e) {
    return n(this, void 0, void 0, function* () {
      this.bag_cell_show.setData(e);
      let t = yield u.Mng.Ins.propMng.loadOne(e.propConfId);
      this.conf = t;
      this.bagItemData = e;
      this.label_name.string = t.name;
      this.label_desc.string = t.intro;
    });
  }
  onClickDrop() {
    this.conf && l.default.ins.OpenPanelByName("MessageBox", e => {
      e.titleLabel.node.active = !1;
      e.label.string = `确定丢弃全部【${this.conf.name}】吗?`;
      e.leftBtn.node.width *= .7;
      e.rightBtn.node.width *= 1.3;
      e.setLeftBtn({
        text: "确定",
        color: d.UIColor.pink,
        call: () => {
          let e = p.default.Ins.getCnt(this.bagItemData.propConfId);
          if (e > 0) {
            p.default.Ins.sub(this.bagItemData.propConfId, e);
            this.refreshCnt();
            let t = l.default.ins.findScene(g.default).world.hero,
              o = h.Util.deepCopy(this.conf.onDrop) || [];
            o.push({
              act: f.TriggerAct.DropProp,
              extra: {
                propConfId: this.bagItemData.propConfId,
                cnt: e,
                useGravity: !0
              }
            });
            m.default.Ins.emitTrigger(o, t.node);
          } else c.default.showToast("数量不足");
        }
      });
      e.setRightBtn({
        text: "不丢,留着",
        color: d.UIColor.green
      });
    });
  }
  onClickUse() {
    if (this.conf) {
      let e = l.default.ins.findScene(g.default),
        t = e.world.hero,
        o = t.node.position;
      exports.y += t.node.height / 2;
      if (p.default.Ins.getCnt(this.bagItemData.propConfId) > 0) {
        if (this.conf.once) {
          p.default.Ins.sub(this.bagItemData.propConfId, 1);
          this.refreshCnt();
        }
        let i = h.Util.deepCopy(this.conf.onUse, []);
        m.default.Ins.emitTrigger(i, t.node);
        this.closePanel();
        e.world.playFloatLabel({
          str: `使用【${this.conf.name}】`,
          pos: o,
          color: d.UIColor.purple,
          anim: "JumpLabel",
          size: 40
        });
      } else {
        c.default.showToast("道具用光了");
        e.world.playFloatLabel({
          str: "道具用光了",
          pos: o,
          color: d.UIColor.purple,
          anim: "FlashLabel",
          size: 40
        });
      }
    }
  }
  refreshCnt() {
    this.refreshList();
    let e = p.default.Ins.getCnt(this.bagItemData.propConfId);
    if (e > 0) this.bag_cell_show.cntLabel.string = "x" + e;else {
      this.list.selectByIdx(0);
      this.list.node.emit(s.default.CLICK_ITEM, this.list.curSelectIdx, this.list.getCurData());
    }
  }
};
i([C(s.default)], _.prototype, "list", void 0);
i([C(y.default)], _.prototype, "bag_cell_show", void 0);
i([C(cc.Label)], _.prototype, "label_name", void 0);
i([C(cc.Label)], _.prototype, "label_desc", void 0);
i([C(a.default)], _.prototype, "btn_drop", void 0);
i([C(a.default)], _.prototype, "btn_use", void 0);
i([C(cc.Label)], _.prototype, "coinCntLabel", void 0);
i([C(cc.Node)], _.prototype, "emptyNode", void 0);
i([C(cc.Node)], _.prototype, "content", void 0);
_ = i([v], _);
exports.default = _;