"use strict";

exports.UIColor = void 0;
(function (e) {
  e.yellow = cc.color(251, 242, 54);
  e.lightBlue = cc.color(199, 222, 244);
  e.blue = cc.color(101, 203, 239);
  e.darkBlue = cc.color(61, 128, 207);
  e.green = cc.color(101, 239, 153);
  e.white = cc.color(255, 255, 255);
  e.red = cc.color(239, 101, 126);
  e.purple = cc.color(203, 101, 239);
  e.orange = cc.color(239, 198, 101);
  e.darkOrange = cc.color(237, 129, 63);
  e.lightOrange = cc.color(241, 218, 164);
  e.pink = cc.color(241, 138, 165);
  e.lightGray = cc.color(239, 239, 239);
  e.gray = cc.color(152, 152, 152);
  e.black = cc.color(0, 0, 0);
  e.getRankColor = function (t) {
    switch (t) {
      case 1:
        return e.yellow;
      case 2:
        return e.lightBlue;
      case 3:
        return e.lightOrange;
      default:
        return e.white;
    }
  };
})(o.UIColor || (exports.UIColor = {}));