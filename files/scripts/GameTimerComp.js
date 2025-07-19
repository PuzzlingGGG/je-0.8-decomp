"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.GameTimerComp = void 0;
const n = e("../../Frame/Util"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
let r = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.running = !1;
    this.timer = 0;
    this.targetTime = 0;
    this.completeCall = null;
    this.mode = "countDown";
    this.started = !1;
  }
  reset() {
    this.running = !1;
    this.started = !1;
    this.timer = 0;
    this.completeCall = null;
  }
  stop() {
    this.running = !1;
    this.started = !1;
    this.node.active = !1;
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0;
  }
  update(e) {
    if (this.running) {
      if ("countDown" == this.mode) {
        this.timer -= e;
        if (this.timer < 0) {
          let e = this.completeCall;
          this.completeCall = null;
          e && e();
          this.timer = 0;
          this.running = !1;
          this.started = !1;
          this.node.active = !1;
        }
      }
      if ("timer" == this.mode) {
        this.timer += e;
        if (this.timer > this.targetTime) {
          this.timer = this.targetTime;
          let e = this.completeCall;
          this.completeCall = null;
          e && e();
          this.running = !1;
          this.started = !1;
          this.node.active = !1;
        }
      }
      this.label.string = n.Util.fixedNum(this.timer, 2, !0);
    }
  }
  startCountDown(e, t) {
    this.mode = "countDown";
    this.running = !0;
    this.started = !0;
    this.timer = e;
    this.targetTime = 0;
    this.completeCall = t;
    this.node.active = !0;
  }
  startTimer(e, t) {
    this.node.active = !0;
    this.mode = "timer";
    this.running = !0;
    this.started = !0;
    this.timer = 0;
    this.targetTime = e;
    this.completeCall = t;
  }
  getCurTimer() {
    return Number.parseFloat(this.timer.toFixed(2));
  }
};
i([s(cc.Label)], r.prototype, "label", void 0);
r = i([a], r);
exports.GameTimerComp = r;