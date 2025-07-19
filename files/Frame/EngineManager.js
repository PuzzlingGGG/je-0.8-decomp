"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("./Util"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.mainCamera = null;
    this.staticEditbox = null;
    this.updatelisteners = [];
  }
  onLoad() {
    i.Ins = this;
    a.Util.initCcKeyBoard(this.staticEditbox);
  }
  setupTimeScale() {
    let e = cc.director._scheduler,
      t = e.update;
    e.update = function (o) {
      t.call(e, 0 === this._timeScale ? 0 : o / this._timeScale);
    };
    let o = 0;
    Object.defineProperty(cc.director, "_deltaTime", {
      get: () => o * cc.director.getScheduler().getTimeScale(),
      set: e => {
        o = e;
      },
      enumerable: !0,
      configurable: !0
    });
  }
  startSchedule(e, t, o, i) {
    this.schedule(e, t, o, i);
  }
  endSchedule(e) {
    this.unschedule(e);
  }
  update(e) {
    for (let t = 0; t < this.updatelisteners.length; t++) {
      let o = this.updatelisteners[t];
      o.call.apply(o.obj, e);
    }
  }
  addUpdateListener(e, t) {
    this.updatelisteners.push({
      call: e,
      obj: t
    });
  }
  removeListener(e, t) {
    let o = this.updatelisteners.findIndex(o => o.call == e && o.obj == t);
    o >= 0 && this.updatelisteners.splice(o, 1);
  }
};
n([r(cc.Camera)], l.prototype, "mainCamera", void 0);
n([r(cc.EditBox)], l.prototype, "staticEditbox", void 0);
l = i = n([s], l);
exports.default = l;