"use strict";

var i,
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
exports.I18nMgr = void 0;
(function (e) {
  e[e.notInit = 0] = "notInit";
  e[e.initializing = 1] = "initializing";
  e[e.initialized = 2] = "initialized";
})(i || (i = {}));
class a {
  static checkInit() {
    return n(this, void 0, void 0, function* () {
      switch (this.initState) {
        case i.notInit:
          this.initState = i.initializing;
          yield new Promise((e, t) => {
            cc.resources.load(["i18n/languages", "i18n/config"], (o, n) => {
              let a = {};
              if (o) {
                console.error(o);
                this.labelData = {};
                this.initState = i.notInit;
                t();
              } else {
                this.labelData = n[0].json;
                a = n[1].json;
                this.setLanguage(a.usingLan);
                this.initState = i.initialized;
                e(!0);
              }
            });
          });
          break;
        case i.initializing:
        case i.initialized:
      }
    });
  }
  static setLanguage(e) {
    if (this.language !== e) {
      this.language = e;
      this.reloadLabel();
      this.reloadSprite();
    }
  }
  static addLabel(e) {
    this.labelArr.push(e);
  }
  static delLabel(e) {
    let t = this.labelArr.indexOf(e);
    -1 !== t && this.labelArr.splice(t, 1);
  }
  static getI18nString(e) {
    var t;
    this.checkInit();
    return null === (t = this.labelData[e]) || void 0 === t ? void 0 : t[this.language];
  }
  static getI18nStringByZh(e) {
    this.checkInit();
    for (const t in this.labelData) {
      let o = this.labelData[t];
      if (o.zh == e) return o[this.language];
    }
    return e;
  }
  static exceI18nStringByZh(e, t) {
    let o = this.getI18nStringByZh(e);
    t.forEach(e => {
      o = o.replace(`\${${e.paramName}}`, `${e.param}`);
    });
    return o;
  }
  static getI18nTidByZh(e) {
    this.checkInit();
    for (const t in this.labelData) if (this.labelData[t].zh == e) return t;
    return "";
  }
  static _addOrDelSprite(e, t) {
    if (t) this.spriteArr.push(e);else {
      let t = this.spriteArr.indexOf(e);
      -1 !== t && this.spriteArr.splice(t, 1);
    }
  }
  static getSprite(e, t) {
    this.checkInit();
    cc.resources.load("i18n/sprite/" + this.language + "/" + e, cc.SpriteFrame, (e, o) => {
      if (e) return t(null);
      t(o);
    });
  }
  static reloadLabel() {
    this.checkInit().then(() => {
      for (let e of this.labelArr) e.refreshLabel();
    });
  }
  static reloadSprite() {
    for (let e of this.spriteArr) e._resetValue();
  }
}
exports.I18nMgr = a;
a.language = "";
a.labelArr = [];
a.labelData = {};
a.spriteArr = [];
a.initState = i.notInit;