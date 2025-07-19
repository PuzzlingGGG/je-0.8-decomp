"use strict";

exports.GSRunner = void 0;
exports.GSRunner = class {
  constructor(e, t) {
    this._instructionStack = [];
    this._paramStack = [];
    this._isExcute = !1;
    this._isReExcuted = !1;
    this.id = e;
    this.scriptDataId = t;
  }
  log(e, ...t) {
    console.log(`>>GSRunner[${this.id}]${e}`, ...t);
  }
  warn(e, ...t) {
    console.warn(`>>GSRunner[${this.id}]${e}`, ...t);
  }
  error(e, ...t) {
    console.error(`>>GSRunner[${this.id}]${e}`, ...t);
  }
  pushInstruction(e) {
    if (this._instructionStack.length >= 100) {
      this.error(">>instructionStack is overflow!!!");
      this.stop();
    } else {
      e.runnerId = this.id;
      this._instructionStack.push(e);
    }
  }
  pushParam(e) {
    e && this._paramStack.push(e);
  }
  getLastResult() {
    return this._paramStack.length > 0 ? this._paramStack.pop() : null;
  }
  excute() {
    this.log("start excute..");
    this._isExcute = !0;
  }
  isComplete() {
    return 0 == this._instructionStack.length && (!this._re || this._isReExcuted && this._re.isComplete());
  }
  step() {
    if (this._isExcute && !this.isComplete()) {
      if (this._re) {
        let e = this._re.excute();
        this._isReExcuted = !0;
        e && this.pushParam(e);
        this._re && !this._re.isComplete() || this.doNext();
      } else this.doNext();
      this.isComplete() && this.log("excute complete!");
    }
  }
  break() {
    this._re = null;
    let e = 0;
    for (let t = this._instructionStack.length - 1; t >= 0; --t) {
      let o = this._instructionStack[t];
      if (o && o.isLoop) {
        e = t;
        break;
      }
    }
    this._instructionStack.splice(e, this._instructionStack.length - e);
    this.log("excute break!");
  }
  stop() {
    this._isExcute = !1;
    this._re = null;
    this._instructionStack.length = 0;
    this._paramStack.length = 0;
    this.log("excute stop!");
  }
  doNext() {
    if (this._instructionStack.length > 0) {
      this._re = this._instructionStack.pop();
      this._isReExcuted = !1;
    } else this._re = null;
  }
};