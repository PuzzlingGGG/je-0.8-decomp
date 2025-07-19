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
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/Util"),
  c = e("../../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.btnEdit = null;
    this.label = null;
    this.groupName = null;
  }
  onLoad() {
    this.btnEdit.node.on(a.default.CLICK, this.onClickEdit, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.groupName = e.str;
    this.btnEdit.node.active = e.canEdit;
    this.label.string = l.Util.clampStr(e.str, 6, "..");
  }
  onClickEdit() {
    return n(this, void 0, void 0, function* () {
      cc.game.emit("ActorGroupFilterCell.onClickEdit");
      let e = yield c.Mng.Ins.assetGroupMng.findGroup(this.groupName);
      e && r.default.ins.OpenPanelByName("EditAssetGroupPanel", t => {
        t.setData(e);
      });
    });
  }
};
i([h(a.default)], p.prototype, "btnEdit", void 0);
i([h(cc.Label)], p.prototype, "label", void 0);
p = i([d], p);
exports.default = p;