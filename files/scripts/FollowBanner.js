"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../Frame/CrossPlatform"),
  s = e("../../../Frame/Top"),
  r = e("../../../Frame/Util"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  onLoad() {
    this.node.on(n.default.CLICK, this.onClickFollow, this);
  }
  onClickFollow() {
    let e = a.systemInfo.SDKVersion;
    if (a.tt && a.crossPlatform.openAwemeUserProfile) {
      if (r.Util.compareVersion(e, "1.84.0") < 0) {
        s.default.showToast("您的版本过低,请更新客户端");
        return;
      }
      a.crossPlatform.openAwemeUserProfile();
    }
  }
};
d = i([l], d);
exports.default = d;