"use strict";

const i = e("../../Frame/CrossPlatform");
class n {
  constructor() {
    this.tileMap = new Map();
    this.actorMap = new Map();
    this.deviceMap = new Map();
    this.propMap = new Map();
  }
  load(e) {
    return i.crossPlatform.getStorageSync("save:" + e);
  }
  save(e, t) {
    i.crossPlatform.setStorageSync("save:" + e, t);
  }
  remove(e) {
    i.crossPlatform.removeStorageSync("save:" + e);
  }
  setTileFlag(e, t) {
    let o = this.tileMap.get(e) || new Set();
    o.add(t);
    this.tileMap.set(e, o);
  }
  getTileFlag(e, t) {
    let o = this.tileMap.get(e);
    return !!o && o.has(t);
  }
  setActorFlag(e, t) {
    let o = this.actorMap.get(e) || new Set();
    o.add(t);
    this.actorMap.set(e, o);
  }
  getActorFlag(e, t) {
    let o = this.actorMap.get(e);
    return !!o && o.has(t);
  }
  setDeviceFlag(e, t) {
    let o = this.deviceMap.get(e) || new Set();
    o.add(t);
    this.deviceMap.set(e, o);
  }
  getDeviceFlag(e, t) {
    let o = this.deviceMap.get(e);
    return !!o && o.has(t);
  }
  setPropFlag(e, t) {
    let o = this.propMap.get(e) || new Set();
    o.add(t);
    this.propMap.set(e, o);
  }
  getPropFlag(e, t) {
    let o = this.propMap.get(e);
    return !!o && o.has(t);
  }
  makeSaveData() {
    new Set([1]);
    let e = [];
    this.tileMap.forEach((t, o) => {
      let i = Array.from(t);
      e.push([o, i]);
    });
    let t = [];
    this.actorMap.forEach((e, o) => {
      let i = Array.from(e);
      t.push([o, i]);
    });
    let o = [];
    this.deviceMap.forEach((e, t) => {
      let i = Array.from(e);
      o.push([t, i]);
    });
    let i = [];
    this.propMap.forEach((e, t) => {
      let o = Array.from(e);
      i.push([t, o]);
    });
    return {
      tileMapArr: e,
      actorMapArr: t,
      deviceMapArr: o,
      propMapArr: i
    };
  }
  initSaveData(e) {
    this.clearFlag();
    if (e) {
      e.tileMapArr.forEach(e => {
        this.tileMap.set(e[0], new Set(e[1]));
      });
      e.actorMapArr.forEach(e => {
        this.actorMap.set(e[0], new Set(e[1]));
      });
      e.deviceMapArr.forEach(e => {
        this.deviceMap.set(e[0], new Set(e[1]));
      });
      e.propMapArr.forEach(e => {
        this.propMap.set(e[0], new Set(e[1]));
      });
    }
  }
  clearFlag() {
    this.tileMap.clear();
    this.actorMap.clear();
    this.deviceMap.clear();
    this.propMap.clear();
  }
}
exports.default = n;
n.Ins = new n();