"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ProgressBar"),
  a = e("../../Frame/Panel"),
  s = e("../../Game/Hortor"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this.downloadProgressBar = null;
    this._retryTimer = 0;
    this._downloadUrl = "";
    this._isDownloading = !1;
    this._isDownloadingOver = !1;
  }
  canRetry() {
    return this._retryTimer < cc.director.getTotalTime();
  }
  setData(e) {
    this._downloadUrl = e;
    this.downloadProgressBar.node.active = !0;
    this.downloadProgressBar.setRange(0, 1);
    this.downloadProgressBar.setValue(0);
    this._retryTimer = 0;
    this._isDownloadingOver = !1;
    this.onStartDownload();
  }
  ReStartDownload() {
    console.log(">>ReStartDownload");
    this.onStartDownload();
  }
  onStartDownload() {
    this._isDownloading = !0;
    this._retryTimer = cc.director.getTotalTime() + 2e3;
    s.Hortor.downloadNewPkg(this._downloadUrl, this.onProgress.bind(this), this.onComplete.bind(this));
  }
  onProgress(e) {
    this._isDownloading && this.downloadProgressBar.setValue(e);
  }
  onComplete(e) {
    this._isDownloading = !1;
    if (e) {
      this._isDownloadingOver = !0;
      this.closePanel();
      this.callComplete && this.callComplete(e);
    }
  }
  update() {
    this._isDownloadingOver || this._isDownloading || cc.sys.getNetworkType() == cc.sys.NetworkType.NONE || !this.canRetry() || this.ReStartDownload();
  }
};
i([l(n.default)], c.prototype, "downloadProgressBar", void 0);
c = i([r], c);
exports.default = c;