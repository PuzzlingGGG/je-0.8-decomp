"use strict";

exports.BagSaveData = void 0;
const i = e("../../Frame/Util"),
  n = e("./../../GameScript/index");
exports.BagSaveData = class {
  constructor() {
    this.propList = [];
  }
};
class a {
  constructor() {
    this.bagSize = 36;
    this.cellSize = 99;
    this.propList = [];
    this.coinPropId = "1";
  }
  add(e, t) {
    let o = this.cellSize;
    e == this.coinPropId && (o = 99999999);
    for (let i = 0; i < this.propList.length && !(t <= 0); i++) {
      let n = this.propList[i];
      if (n.propConfId == e) {
        let e = o - n.cnt,
          i = Math.min(e, t);
        if (i > 0) {
          t -= i;
          n.cnt += i;
        }
      }
    }
    for (; t > 0 && this.propList.length < this.bagSize;) {
      let i = Math.min(o, t);
      t -= i;
      this.propList.push({
        cnt: i,
        propConfId: e
      });
    }
    n.GSVariableMng.instance.setItemVariable(e, this.getCnt(e));
    cc.game.emit("refreshGameBagBar");
    return t;
  }
  sub(e, t) {
    for (let o = this.propList.length - 1; o >= 0; o--) {
      let i = this.propList[o];
      if (t > 0 && i.propConfId == e) {
        let e = Math.min(i.cnt, t);
        if (e > 0) {
          i.cnt -= e;
          t -= e;
          i.cnt <= 0 && this.propList.splice(o, 1);
        }
      }
    }
    n.GSVariableMng.instance.setItemVariable(e, this.getCnt(e));
    cc.game.emit("refreshGameBagBar");
    return t;
  }
  getCnt(e) {
    let t = 0;
    for (let o = 0; o < this.propList.length; o++) {
      let i = this.propList[o];
      i.propConfId == e && (t += i.cnt);
    }
    return t;
  }
  clear() {
    this.propList = [];
    n.GSVariableMng.instance.clearItem();
    cc.game.emit("refreshGameBagBar");
  }
  getCoinCnt() {
    return this.getCnt(this.coinPropId) || 0;
  }
  gainCoin(e) {
    this.add(this.coinPropId, e);
  }
  costCoin(e) {
    this.sub(this.coinPropId, e);
  }
  addCoin(e) {
    this.add(this.coinPropId, e);
  }
  isCoin(e) {
    return this.coinPropId == e;
  }
  makeData() {
    return {
      bagSize: this.bagSize,
      cellSize: this.cellSize,
      propList: i.Util.deepCopy(this.propList)
    };
  }
  initWithData(e) {
    this.bagSize = e.bagSize;
    this.cellSize = e.cellSize;
    this.propList = e.propList || [];
    for (let e = 0; e < this.propList.length; e++) {
      let t = this.propList[e];
      n.GSVariableMng.instance.setItemVariable(t.propConfId, this.getCnt(t.propConfId));
    }
    cc.game.emit("refreshGameBagBar");
  }
}
exports.default = a;
a.Ins = new a();