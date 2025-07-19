"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.NetIns = exports.NetworkMgr = void 0;
class n {
  constructor() {
    this.reconnectTime = 0;
    this.reconnectWaitTime = 0;
    this.httpDelegate = new orange.HttpDelegate();
    this.wsDelegate = new orange.WebSocketDelegate();
    this._isInited = !1;
    this._isNetworkError = !1;
    this._watchReConnect = null;
    this._dictionaryServerCodeResponse = new Map();
  }
  get isInited() {
    return this._isInited;
  }
  init() {
    this._isInited = !0;
  }
  connect(e, t, o, n) {
    return i(this, void 0, void 0, function* () {
      this.token = e;
      this.wsDelegate.root = o;
      this.connectOptions = {
        token: this.token,
        encoding: t,
        url: n
      };
      return this.wsDelegate.connect(this.connectOptions);
    });
  }
  get connected() {
    return this.wsDelegate.connected;
  }
  sendHttpAsync(e) {
    return i(this, void 0, void 0, function* () {
      return yield this.httpDelegate.sendAsync(e);
    });
  }
  send(e) {
    this.wsDelegate.send(e);
  }
  sendAsync(e) {
    return i(this, void 0, void 0, function* () {
      return yield this.wsDelegate.sendAsync(e);
    });
  }
  on(e, t, o) {
    this.wsDelegate.events.on(e, t, o);
  }
  off(e, t, o) {
    this.wsDelegate.events.off(e, t, o);
  }
  onClose(e, t) {
    this.wsDelegate.events.on(orange.WebSocketDelegate.EVENT_CLOSED, e, t);
  }
  deWatchNetWork() {
    this.wsDelegate.events.off(orange.WebSocketDelegate.EVENT_CLOSED, this.onOrangeClose, this);
  }
  watchNetWork() {
    console.log("watchNetWork..");
    this.onClose(this.onOrangeClose, this);
    console.log("watchNetWork reg onOrangeClose");
  }
  checkNetworkStatus() {
    let e = this._isNetworkError;
    this._isNetworkError = !0;
    cc.sys.getNetworkType() != cc.sys.NetworkType.NONE && (this._isNetworkError = !1);
    if (e && !this._isNetworkError) {
      console.log(">>Is Network Reconnet.");
      this.onNetstatusChange({
        isConnected: !e
      });
    }
  }
  onOrangeClose() {
    this.startConnectTimer();
  }
  setWatchReConnect(e) {
    this._watchReConnect = e;
  }
  retryConnectExcute() {
    this.wsDelegate.connected || cc.director.getTotalTime() >= this.reconnectTime && this.retryContent();
  }
  retryContent() {
    return i(this, void 0, void 0, function* () {
      cc.sys.platform == cc.sys.WECHAT_GAME && wx.showLoading({
        title: "网络环境不好哦",
        mask: !0
      });
      yield this.wsDelegate.connect(this.connectOptions);
      if (this.wsDelegate.connected) {
        cc.sys.platform == cc.sys.WECHAT_GAME && wx.hideLoading();
        this._watchReConnect && this._watchReConnect();
        console.log("---Net---断线重连成功");
        this.clearReconnectTimer();
      } else {
        this.reconnectWaitTime = this.reconnectWaitTime || 1e3;
        this.reconnectTime = cc.director.getTotalTime() + this.reconnectWaitTime;
        this.reconnectWaitTime *= 2;
        this.reconnectWaitTime > 256e3 && (this.reconnectWaitTime = 256e3);
        console.log("---Net---断线重连失败，下次重连时间", this.reconnectTime);
      }
    });
  }
  startConnectTimer() {
    console.log(">>startConnectTimer");
    this.reconnectWaitTime = 1e3;
    this.reconnectTime = 0;
    this.reconnectHandle || (this.reconnectHandle = setInterval(this.retryConnectExcute.bind(this), 1e3));
  }
  clearReconnectTimer() {
    this.reconnectWaitTime = 0;
    this.reconnectTime = 0;
    if (this.reconnectHandle) {
      clearInterval(this.reconnectHandle);
      this.reconnectHandle = null;
    }
  }
  onNetstatusChange(e) {
    if (!this.wsDelegate.connected && e.isConnected) {
      console.log("---Net---网络状态变化,立即重连", e);
      this.startConnectTimer();
    }
  }
  RegistServerCodeResponse(e, t) {
    this._dictionaryServerCodeResponse.has(e) || this._dictionaryServerCodeResponse.set(e, []);
    this._dictionaryServerCodeResponse.get(e).indexOf(t) < 0 && this._dictionaryServerCodeResponse.get(e).push(t);
  }
  SendCmdAsync(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = yield this.sendAsync(e);
      return new Promise(e => {
        if (o && 0 == o.code) e(this.DecodeMsg(o.decBody, t));else {
          console.error(o.error);
          e(null);
        }
      });
    });
  }
  DecodeMsg(e, t) {
    let o = new t();
    o.setValue(e);
    return o;
  }
}
exports.NetworkMgr = n;
exports.NetIns = new n();