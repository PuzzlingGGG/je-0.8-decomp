"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/CrossPlatform"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = i = class {
  constructor() {
    this.localKey = "talkDraftList";
  }
  loadDraftList() {
    return a.crossPlatform.getStorageSync(this.localKey) || [];
  }
  addDraft(e) {
    let t = this.loadDraftList();
    t.unshift(e);
    a.crossPlatform.setStorageSync(this.localKey, t);
  }
  deleteDraft(e) {
    let t = this.loadDraftList();
    t = t.filter(t => t.id != e);
    a.crossPlatform.setStorageSync(this.localKey, t);
  }
  deleteDraftByTalkId(e) {
    let t = this.loadDraftList();
    for (let o = 0; o < t.length; o++) t[o].talkId == e && t.splice(o--, 1);
    a.crossPlatform.setStorageSync(this.localKey, t);
  }
  saveDraft(e) {
    let t = this.loadDraftList(),
      o = t.findIndex(t => t.id == e.id);
    o >= 0 ? t[o] = e : t.unshift(e);
    a.crossPlatform.setStorageSync(this.localKey, t);
  }
};
l.Ins = new i();
l = i = n([s], l);
exports.default = l;