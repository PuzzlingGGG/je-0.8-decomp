"use strict";

exports.UnionSet = void 0;
exports.UnionSet = class {
  constructor() {
    this._arr = [];
    this._fa = [];
  }
  clear() {
    this._arr = [];
    this._fa = [];
  }
  idx(e) {
    return this._arr.findIndex(t => t == e);
  }
  find(e) {
    let t = this.idx(e);
    if (t < 0) return e;
    let o = this._find(t);
    return this._arr[o];
  }
  isUnion(e, t) {
    return e === t || this.find(e) === this.find(t);
  }
  _find(e) {
    return this._fa[e] == e ? e : this._find(this._fa[e]);
  }
  union(e, t) {
    let o = this.idx(e),
      i = this.idx(t);
    if (o < 0) {
      o = this._arr.length;
      this._arr.push(e);
      this._fa.push(this._fa.length);
    }
    if (i < 0) {
      i = this._arr.length;
      this._arr.push(t);
      this._fa.push(this._fa.length);
    }
    let n = this._find(o),
      a = this._find(i);
    if (n !== a) {
      if (n < a) {
        let e = n;
        n = a;
        a = e;
      }
      this._fa[n] = a;
    }
  }
};