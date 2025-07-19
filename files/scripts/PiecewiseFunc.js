"use strict";

const i = e("./Util");
exports.default = class {
  constructor(e) {
    this.points = e;
    e.sort((e, t) => e.x - t.x);
  }
  getY(e) {
    let t = this.points.length;
    if (t <= 0) return 0;
    if (e <= this.points[0].x) return this.points[0].y;
    if (e >= this.points[t - 1].x) return this.points[t - 1].y;
    for (let o = 1; o < t; o++) if (e <= this.points[o].x) {
      let t = this.points[o - 1].x,
        n = this.points[o].x,
        a = this.points[o - 1].y,
        s = this.points[o].y;
      return i.Util.lerp01(a, s, (e - t) / (n - t));
    }
  }
};