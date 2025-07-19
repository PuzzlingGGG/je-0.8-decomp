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
const a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/NetworkMgr"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/Top"),
  d = e("../../Game/Player/Mng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends l.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.saveBtn = null;
    this.worldData = null;
    this.saveCall = null;
  }
  onLoad() {
    super.onLoad();
    this.saveBtn.node.on(s.default.CLICK, this.onSave, this);
  }
  setData(e) {
    this.worldData = e;
    this.nameEditBox.string = e.info.name;
  }
  onSave() {
    return n(this, void 0, void 0, function* () {
      this.worldData.info.name = this.nameEditBox.textLabel.string;
      let e = {
          msg: this.worldData.info.name
        },
        t = yield r.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_SensitiveMsg,
          params: e
        }, a.Game_RSensitiveMsg);
      if (t && t.sensitiveWords && t.sensitiveWords.length) c.default.showToast("名称违规");else if (yield d.Mng.Ins.worldMng.save(this.worldData, !1)) {
        this.saveCall && this.saveCall(this.worldData);
        this.closePanel();
      } else c.default.showToast("保存失败");
    });
  }
};
i([p(cc.EditBox)], u.prototype, "nameEditBox", void 0);
i([p(s.default)], u.prototype, "saveBtn", void 0);
u = i([h], u);
exports.default = u;