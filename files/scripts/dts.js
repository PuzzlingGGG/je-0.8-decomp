"use strict";

exports.DiySaveData = exports.RType = void 0;
(function (e) {
  e.energy = "energy";
  e.energyBig = "energyBig";
  e.coin = "coin";
  e.coins = "coins";
  e.rareStar = "rareStar";
  e.title = "title";
  e.jigsaw = "jigsaw";
})(o.RType || (exports.RType = {}));
exports.DiySaveData = class {
  constructor() {
    this.time = 0;
    this.musicName = "";
    this.beatCnt = 0;
    this.beatsId = 0;
    this.tapeId = 0;
  }
};