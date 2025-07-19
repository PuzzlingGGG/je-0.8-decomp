!function(e) {
"function" == typeof define && define.amd ? define(e) : e();
}(function() {
"use strict";
var e, t = new (function() {
function e() {
this.eventMap = {};
}
return e.prototype.on = function(e, t, n) {
void 0 === n && (n = !1), this.eventMap[e] = this.eventMap[e] || [], this.eventMap[e].push({
callback: t,
isOnce: n
});
}, e.prototype.once = function(e, t) {
this.on(e, t, !0);
}, e.prototype.off = function(e, t) {
if (void 0 === t) this.eventMap[e] = []; else {
var n = this.eventMap[e];
if (n && n.length) for (var o = this.getCallbackIndex(n, t); -1 !== o; ) this.eventMap[e].splice(o, 1), 
o = this.getCallbackIndex(n, t);
}
}, e.prototype.getCallbackIndex = function(e, t) {
var n = -1;
return e.forEach(function(e, o) {
e.callback === t && (n = o);
}), n;
}, e.prototype.emit = function(e) {
for (var t = this, n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
var r = this.eventMap[e];
r && r.forEach(function(o) {
var r = o.callback, i = o.isOnce;
"function" == typeof r && (r.apply(void 0, n), i && t.off(e, r));
});
}, e;
}())();
!function(e) {
var t;
!function(e) {
e[e.SendToNative = 0] = "SendToNative", e[e.ReceiveFromNative = 1] = "ReceiveFromNative", 
e[e.Init = 2] = "Init", e[e.Login = 3] = "Login";
}(e.EventType || (e.EventType = {})), (t = e.ApiType || (e.ApiType = {}))[t.Login = 0] = "Login";
}(e || (e = {}));
var n = e, o = cc.sys.os == cc.sys.OS_IOS, r = o ? "SDKMessager" : "com/hortorgames/gamesdk/SDKBridge", i = o ? "callNative:withMessage:" : "receiveMsgFromHSDK";
t.on(n.EventType.SendToNative, function(e) {
var t = e.action, n = e.payload;
o ? jsb.reflection.callStaticMethod(r, i, "sdk", JSON.stringify({
action: t,
extra: n
})) : jsb.reflection.callStaticMethod(r, i, "(Ljava/lang/String;)V", JSON.stringify({
action: t,
extra: n
}));
});
var a = function() {
return (a = Object.assign || function(e) {
for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
return e;
}).apply(this, arguments);
};
function s(e, t, n, o) {
return new (n || (n = Promise))(function(r, i) {
function a(e) {
try {
l(o.next(e));
} catch (e) {
i(e);
}
}
function s(e) {
try {
l(o.throw(e));
} catch (e) {
i(e);
}
}
function l(e) {
var t;
e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
e(t);
})).then(a, s);
}
l((o = o.apply(e, t || [])).next());
});
}
function l(e, t) {
var n, o, r, i, a = {
label: 0,
sent: function() {
if (1 & r[0]) throw r[1];
return r[1];
},
trys: [],
ops: []
};
return i = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
return this;
}), i;
function s(i) {
return function(s) {
return function(i) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o), 
0) : o.next) && !(r = r.call(o, i[1])).done) return r;
switch (o = 0, r && (i = [ 2 & i[0], r.value ]), i[0]) {
case 0:
case 1:
r = i;
break;

case 4:
return a.label++, {
value: i[1],
done: !1
};

case 5:
a.label++, o = i[1], i = [ 0 ];
continue;

case 7:
i = a.ops.pop(), a.trys.pop();
continue;

default:
if (!(r = a.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
a = 0;
continue;
}
if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
a.label = i[1];
break;
}
if (6 === i[0] && a.label < r[1]) {
a.label = r[1], r = i;
break;
}
if (r && a.label < r[2]) {
a.label = r[2], a.ops.push(i);
break;
}
r[2] && a.ops.pop(), a.trys.pop();
continue;
}
i = t.call(e, a);
} catch (e) {
i = [ 6, e ], o = 0;
} finally {
n = r = 0;
}
if (5 & i[0]) throw i[1];
return {
value: i[0] ? i[1] : void 0,
done: !0
};
}([ i, s ]);
};
}
}
function c(e) {
if ("string" == typeof e || "number" == typeof e || "bigint" == typeof e) return e;
try {
return JSON.stringify(e);
} catch (e) {
return "tryJsonStringify fail";
}
}
function u() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
var n = "[HAPP] ";
e.forEach(function(e) {
n += c(e) + " ";
}), console.log(n);
}
function f(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
"function" == typeof e && e.apply(void 0, t);
}
function d() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
u.apply(void 0, e);
}
var p = {};
function h(e) {
var t = e || {
listener: function() {}
}, n = t.action, o = t.listener;
p[n] = {
isListen: !0,
listener: o
};
}
function v(e) {
var o = e.action, r = e.payload, i = void 0 === r ? {} : r;
d("HAPP发送消息给原生"), d("action:", o), d("payload:", i), t.emit(n.EventType.SendToNative, {
action: o,
payload: i
});
}
function g(e) {
var t = e.action, n = e.payload, o = void 0 === n ? {} : n, r = e.listener;
v({
action: t,
payload: o
}), h({
action: t,
listener: r
});
}
function y(e) {
var t = e.action, n = e.payload, o = e.apiType;
return new Promise(function(e, r) {
p[t] = {
resolve: e,
reject: r,
apiType: o,
isListen: !1
}, v({
action: t,
payload: n
});
});
}
t.on(n.EventType.ReceiveFromNative, function(e) {
try {
var o = JSON.parse(e) || {}, r = o.action, i = o.extra, a = o.meta;
d("HAPP接收到了原生的消息"), d("action:", r), d("extra:", i), d("meta:", a);
var s = p[r];
(null == s ? void 0 : s.isListen) ? f(null == s ? void 0 : s.listener, {
extra: i,
meta: a
}) : 0 === (null == a ? void 0 : a.errCode) ? (null == s || s.resolve(i), (null == s ? void 0 : s.apiType) === n.ApiType.Login && t.emit(n.EventType.Login, i)) : null == s || s.reject(a);
} catch (t) {
d("解析JSON失败或游戏代码错误", e);
try {
d("err", JSON.stringify(t));
} catch (e) {
d("err", e);
}
}
});
var m = {};
function b(e) {
var o = this;
return void 0 === e && (e = {}), m = Object.assign(m, e), new Promise(function(e, r) {
return s(o, void 0, void 0, function() {
var o, i, a;
return l(this, function(s) {
switch (s.label) {
case 0:
return s.trys.push([ 0, 2, , 3 ]), [ 4, y({
action: "game-init",
payload: {
HSDKVersion: "2.0.1"
}
}) ];

case 1:
return o = s.sent(), v({
action: "wx-share-get-data"
}), e({
distinctId: null == o ? void 0 : o.distinctId
}), i = [ "Prod", "Test", "Dev" ], t.emit(n.EventType.Init, {
config: {
gameId: null == o ? void 0 : o.gameID,
env: i[null == o ? void 0 : o.env],
gameVersion: null == o ? void 0 : o.gameVersion,
channel: null == o ? void 0 : o.channel
},
sysInfo: null == o ? void 0 : o.deviceInfo
}), [ 3, 3 ];

case 2:
return a = s.sent(), r(a), [ 3, 3 ];

case 3:
return [ 2 ];
}
});
});
});
}
Object.defineProperty(function() {}, "config", {
get: function() {
return m;
},
enumerable: !1,
configurable: !0
});
var w = n.ApiType.Login;
function _(e) {
return void 0 === (null == e ? void 0 : e.isHiddenClose) && (e.isHiddenClose = !1), 
void 0 === (null == e ? void 0 : e.agreeProtocol) && (e.agreeProtocol = !1), y({
action: "user_login_show_dialog",
payload: e,
apiType: w
});
}
function T() {
return y({
action: "user-visitorlogin",
apiType: w
});
}
function k() {}
var S, A = "function" == typeof atob, O = "function" == typeof Buffer, P = "function" == typeof TextDecoder ? new TextDecoder() : void 0, E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""), I = (S = {}, 
E.forEach(function(e, t) {
return S[e] = t;
}), S), R = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, M = String.fromCharCode.bind(String), x = "function" == typeof Uint8Array.from ? Uint8Array.from.bind(Uint8Array) : function(e, t) {
return void 0 === t && (t = function(e) {
return e;
}), new Uint8Array(Array.prototype.slice.call(e, 0).map(t));
}, C = function(e) {
return e.replace(/[^A-Za-z0-9\+\/]/g, "");
}, L = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, N = function(e) {
switch (e.length) {
case 4:
var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
return M(55296 + (t >>> 10)) + M(56320 + (1023 & t));

case 3:
return M((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));

default:
return M((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
}
}, j = A ? function(e) {
return atob(C(e));
} : O ? function(e) {
return Buffer.from(e, "base64").toString("binary");
} : function(e) {
if (e = e.replace(/\s+/g, ""), !R.test(e)) throw new TypeError("malformed base64.");
e += "==".slice(2 - (3 & e.length));
for (var t, n, o, r = "", i = 0; i < e.length; ) t = I[e.charAt(i++)] << 18 | I[e.charAt(i++)] << 12 | (n = I[e.charAt(i++)]) << 6 | (o = I[e.charAt(i++)]), 
r += 64 === n ? M(t >> 16 & 255) : 64 === o ? M(t >> 16 & 255, t >> 8 & 255) : M(t >> 16 & 255, t >> 8 & 255, 255 & t);
return r;
}, D = O ? function(e) {
return x(Buffer.from(e, "base64"));
} : function(e) {
return x(j(e), function(e) {
return e.charCodeAt(0);
});
}, F = O ? function(e) {
return Buffer.from(e, "base64").toString("utf8");
} : P ? function(e) {
return P.decode(D(e));
} : function(e) {
return j(e).replace(L, N);
}, U = function(e) {
return F(function(e) {
return C(e.replace(/[-_]/g, function(e) {
return "-" == e ? "+" : "/";
}));
}(e));
};
function q(e) {
return void 0 === e && (e = {}), s(this, void 0, void 0, function() {
return l(this, function() {
return [ 2, new Promise(function(t, n) {
y({
action: "get-notice-info",
payload: e
}).then(function(e) {
var n;
t({
list: (null === (n = null == e ? void 0 : e.list) || void 0 === n ? void 0 : n.map(function(e) {
return e.content = U(e.content), e;
})) || []
});
}).catch(function(e) {
n(e);
});
}) ];
});
});
}
var H, V, B = function() {
function e(e) {
void 0 === e && (e = {}), this.onStartListener = function() {}, this.onStopListener = function() {}, 
this.onMsgListener = function() {}, this.onErrListener = function() {}, this.isStoped = !1, 
this.opt = e;
var t = this;
h({
action: "start_recorder",
listener: function(e) {
var n = e.extra || {}, o = n.resultText, r = n.end, i = n.code;
if (1 === r && (t.isStoped = !0, t.onStopListener()), 1e3 === i) {
var a = {
errCode: i,
errMsg: o
};
t.onErrListener(a);
} else t.isStoped || t.onMsgListener(o);
}
}), h({
action: "stop_recorder",
listener: function() {
t.onStopListener();
}
});
}
return e.prototype.onStart = function(e) {
this.onStartListener = e;
}, e.prototype.onStop = function(e) {
this.onStopListener = e;
}, e.prototype.onMessage = function(e) {
this.onMsgListener = e;
}, e.prototype.onError = function(e) {
this.onErrListener = e;
}, e.prototype.start = function() {
var e = {};
"number" == typeof this.opt.duration && (e.recTime = this.opt.duration / 1e3), v({
action: "start_recorder",
payload: e
}), this.isStoped = !1;
}, e.prototype.stop = function() {
v({
action: "stop_recorder"
});
}, e.prototype.setOption = function(e) {
void 0 === e && (e = {}), this.opt = Object.assign(this.opt, e);
}, e;
}(), G = null, J = (V = ((H = {
exports: {}
}).exports = function(e) {
var t = {};
function n(o) {
if (t[o]) return t[o].exports;
var r = t[o] = {
i: o,
l: !1,
exports: {}
};
return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
}
return n.m = e, n.c = t, n.d = function(e, t, o) {
n.o(e, t) || Object.defineProperty(e, t, {
enumerable: !0,
get: o
});
}, n.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(e, "__esModule", {
value: !0
});
}, n.t = function(e, t) {
if (1 & t && (e = n(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var o = Object.create(null);
if (n.r(o), Object.defineProperty(o, "default", {
enumerable: !0,
value: e
}), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function(t) {
return e[t];
}.bind(null, r));
return o;
}, n.n = function(e) {
var t = e && e.__esModule ? function() {
return e.default;
} : function() {
return e;
};
return n.d(t, "a", t), t;
}, n.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, n.p = "", n(n.s = 4);
}([ function(e, t) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var n = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), o = 1, r = (t.LOG_TYPE = {
UNCAUGHT_ERROR: "unc-err",
RES_REQ: "res-req",
RES_ERROR: "res-err",
DOWNLOAD_ERROR: "down-err",
DOWNLOAD_REQ: "down-req",
UPLOAD_REQ: "up-req",
UPLOAD_ERROR: "up-err",
SOCKET_REQ: "soc-req",
SOCKET_ERROR: "soc-err",
APP_LANCH: "app-lanch",
APP_ERROR: "app-err",
GAME_NOTICE: "game-notice",
GAME_TRACK: "game-track",
MEMORY_WARN: "mem-warn"
}, function() {
function e(t) {
var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.id = o++, this.logType = t, this.extra = {}, this.collected = !1, 
this.collector = n;
}
return n(e, [ {
key: "setType",
value: function(e) {
return this.logType = e, this;
}
}, {
key: "addExtra",
value: function(e) {
return e.url && (this.resURI = e.url), e.errMsg && !e.msg && (e.msg = e.errMsg), 
this.extra = Object.assign(this.extra, e), this;
}
}, {
key: "start",
value: function() {
return this.startTime = new Date().getTime(), this;
}
}, {
key: "end",
value: function() {
return this.timestamp = new Date().getTime() - this.startTime, this.timestamp = this.timestamp < 0 ? 0 : this.timestamp, 
this.collect(), this;
}
}, {
key: "collect",
value: function() {
return this.collected || "function" != typeof this.collector.collect || (this.collected = !0, 
this.collector.collect(this)), this;
}
}, {
key: "tryReport",
value: function() {
return this.collected || "function" != typeof this.collector.tryReport || (this.collected = !0, 
this.collector.tryReport(this)), this;
}
}, {
key: "toJSON",
value: function() {
return {
res: this.resURI,
type: this.logType,
ts: this.timestamp,
ext: this.extra
};
}
} ]), e;
}());
t.default = r;
}, function(e, t) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var n = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), o = [ "wxmini", "wxmini-log", "platform", "wxmini-test", "platform-test", "wxmini-dev", "platform-dev" ], r = (t.TIMES_TYPE = {
RES_TIMES: "requestTimes",
DOWNLOAD_TIMES: "downloadTimes"
}, function() {
function e(t) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.collector = t, this.reset();
}
return n(e, [ {
key: "getPlatformByUrl",
value: function(e) {
var t = e.split("//"), n = t.length > 1 && t[1] ? t[1].split(".") : [], r = n.length ? n[0] : "";
return o.indexOf(r) > -1 ? "platformSource" : "gameSource";
}
}, {
key: "add",
value: function(e, t) {
if (e && "string" == typeof e) {
this.hadData = !0;
var n = this.getPlatformByUrl(e);
this.requestInfo[n][t] += 1;
}
}
}, {
key: "reset",
value: function() {
this.hadData = !1, this.requestInfo = {
platformSource: {
requestTimes: 0,
downloadTimes: 0
},
gameSource: {
requestTimes: 0,
downloadTimes: 0
}
};
}
}, {
key: "getInfo",
value: function() {
return this.hadData ? this.requestInfo : void 0;
}
} ]), e;
}());
t.default = r;
}, function(e, t) {
Object.defineProperty(t, "__esModule", {
value: !0
}), t.DEFAULT_CONFIG = {
Debug: !1,
ReportDelay: 6e4,
ErrorReportDelay: 2e3,
ClearRepeatLog: !0,
EnabledAppOnErr: !0,
EnabledResErr: !0,
EnabledResPerf: !0,
EnabledSocket: !1,
EnabledSocketTimes: !1,
EnabledMemoryWarning: !1,
EnabledTempFailLog: !1,
MaxTempFailLogLength: 100,
Filters: [],
reportUrlProc: "https://platform.hortorgames.com/wxlog/api/v1/apmlog",
reportUrlDev: "https://platform-test.hortorgames.com/wxlog/api/v1/apmlog"
}, t.Extra_CONFIG = {
Filters: [ /\/v1\/statlog$/, /\/v1\/log$/, /\/v1\/log\/multi$/ ]
};
}, function(e, t, n) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), r = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(n(0)), i = function() {
function e(t) {
var n = t.app, o = t.config, r = t.collector;
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.app = n, this.config = o, this.collector = r;
}
return o(e, [ {
key: "handle",
value: function() {}
}, {
key: "isFun",
value: function(e) {
return !(!e || "function" != typeof e);
}
}, {
key: "tracker",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
return new r.default(e, this.collector).addExtra(t);
}
} ]), e;
}();
t.default = i;
}, function(e, t, n) {
var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), i = c(n(5)), a = n(2), s = n(0), l = c(n(13));
function c(e) {
return e && e.__esModule ? e : {
default: e
};
}
var u = function() {
function e() {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e);
}
return r(e, [ {
key: "init",
value: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
e.Debug = !e.env || "Prod" !== e.env || e.Debug, console.log("[APM] config", "undefined" == typeof window ? "undefined" : o(window)), 
this.appTracker = new i.default(window, Object.assign({}, a.DEFAULT_CONFIG, l.default, e)).track();
}
}, {
key: "notify",
value: function(e, t) {
return this.appTracker ? this.appTracker.tracker(s.LOG_TYPE.GAME_NOTICE, Object.assign({
msg: e
}, t)).collect() : {
errMsg: "please init apm first"
};
}
}, {
key: "notifyError",
value: function(e, t) {
return this.notify(e, t);
}
}, {
key: "newTracker",
value: function(e, t) {
return this.appTracker ? this.appTracker.tracker(s.LOG_TYPE.GAME_TRACK, Object.assign({
msg: e
}, t)) : {
errMsg: "please init apm first"
};
}
}, {
key: "setUserInfo",
value: function(e) {
this.appTracker && this.appTracker.setUserInfo(e);
}
}, {
key: "setSysInfo",
value: function(e) {
this.appTracker && this.appTracker.setSysInfo(e);
}
} ]), e;
}();
e.exports = new u();
}, function(e, t, n) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), r = c(n(6)), i = c(n(0)), a = c(n(10)), s = c(n(11)), l = c(n(12));
function c(e) {
return e && e.__esModule ? e : {
default: e
};
}
var u = function() {
function e(t, n) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e);
var o = new a.default(t);
this.config = n, this.collector = new r.default(o, n);
var i = {
app: o,
config: n,
collector: this.collector
};
this.handlers = [ new s.default(i), new l.default(i) ];
}
return o(e, [ {
key: "track",
value: function() {
return this.handlers.forEach(function(e) {
e.handle();
}), this;
}
}, {
key: "tracker",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
return new i.default(e, this.collector).addExtra(t);
}
}, {
key: "setUserInfo",
value: function(e) {
this.collector && this.collector.reporter.setUserInfo(e);
}
}, {
key: "setSysInfo",
value: function(e) {
this.collector && this.collector.reporter.setSysInfo(e);
}
} ]), e;
}();
t.default = u;
}, function(e, t, n) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), r = l(n(7)), i = l(n(1)), a = l(n(9)), s = n(2);
function l(e) {
return e && e.__esModule ? e : {
default: e
};
}
var c = function() {
function e(t, n) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.logs = [], this.started = !1, this.app = t, this.config = n, this.reporter = new r.default(this.app, n), 
this.timeser = new i.default(), this.socketTimeser = new a.default();
}
return o(e, [ {
key: "clearReporter",
value: function(e) {
return e && clearTimeout(e), null;
}
}, {
key: "finalReport",
value: function() {
var e = this, t = this.logs, n = this.timeser.getInfo(), o = this.socketTimeser.getInfo();
this.reporter.report({
logs: t,
times: n,
sockets: o
}, function() {
var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).data || [];
if (t.length) {
var n = t.join(", ");
n && e.app.getWindow().alert("" + n);
}
}), this.logs = [], this.timeser.reset(), this.socketTimeser.reset(), this.errorReporterTimer = this.clearReporter(this.errorReporterTimer), 
this.fixedReporter = this.clearReporter(this.fixedReporter), this.fixedReport();
}
}, {
key: "fixedReport",
value: function() {
this.fixedReporter = setTimeout(this.finalReport.bind(this), this.config.ReportDelay);
}
}, {
key: "startFixedReport",
value: function() {
this.started || (this.started = !0, this.fixedReport());
}
}, {
key: "tryReport",
value: function(e) {
var t = this;
this.checkValid(e) && (this.add(e), this.errorReporterTimer || (this.errorReporterTimer = setTimeout(function() {
t.finalReport();
}, this.config.ErrorReportDelay)));
}
}, {
key: "collect",
value: function(e) {
this.checkValid(e) && this.add(e);
}
}, {
key: "checkValid",
value: function(e) {
if (!e) return !1;
var t = this.reporter.getReportUrl();
return !(e.resURI && e.resURI.indexOf(t) > -1 || e.resURI && (this.filters || (this.filters = s.Extra_CONFIG.Filters || [], 
this.filters = this.filters.concat(this.config.Filters)), this.filters.length && this.filters.some(function(t) {
return t && t.test && t.test(e.resURI);
})));
}
}, {
key: "isRepeat",
value: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
return !(!e.id || e.id !== t.id) || !!this.config.ClearRepeatLog && [ "resURI", "logType", "extra" ].every(function(n) {
return JSON.stringify(e[n]) == JSON.stringify(t[n]);
});
}
}, {
key: "add",
value: function(e) {
var t = this;
this.logs.some(function(n, o) {
if (t.isRepeat(e, n)) return (!e.timestamp || e.timestamp > n.timestamp) && (t.logs[o] = e), 
!0;
}) || (this.logs.push(e), this.startFixedReport());
}
}, {
key: "addTimes",
value: function(e, t) {
this.checkValid({
resURI: e
}) && (this.timeser.add(e, t), this.startFixedReport());
}
}, {
key: "addSocketTimes",
value: function(e) {
this.socketTimeser.add(e), this.startFixedReport();
}
} ]), e;
}();
t.default = c;
}, function(e, t, n) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), r = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(n(8)), i = function() {
function e(t, n) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.clientInfo = null, this.app = t, this.config = n, this.logTemper = new r.default(this.app, n);
}
return o(e, [ {
key: "setUserInfo",
value: function(e) {
this.config.userInfo = Object.assign(this.config.userInfo || {}, e);
}
}, {
key: "setSysInfo",
value: function(e) {
var t = this.app.sysInfo;
this.sysInfo = Object.assign({}, t, e), console.log("[APM] setSysInfo:", JSON.stringify(this.sysInfo));
}
}, {
key: "getClientInfo",
value: function() {
var e = this.sysInfo;
return e.netType = this.app.getConnectionType() || e.netType, e;
}
}, {
key: "report",
value: function() {
var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1], o = t.logs, r = t.times, i = t.sockets;
if (this.logTemper.checkTemp() || t.logs && t.logs.length || t.times || t.sockets) {
var a = [];
0 === o.length ? (r && (a = [ {
type: "req-times"
} ]), i && (a = [ {
type: "socket-track"
} ])) : a = o.map(function(e) {
return e.toJSON();
});
var s = this.logTemper.getTemp({
logs: a,
times: r,
sockets: i
}), l = this.config, c = {
game: {
gameId: l.gameId,
version: l.gameVersion,
env: l.env
},
client: this.getClientInfo(),
user: l.userInfo,
logs: s.logs,
requestInfo: s.times,
socketInfo: s.sockets
};
console.log("[APM] report client", JSON.stringify(c.client)), console.log("[APM] report requestInfo", JSON.stringify(c.requestInfo)), 
this.post(c, function(t, o) {
o ? e.logTemper.setTemp(s) : n && n(t);
});
}
}
}, {
key: "getReportUrl",
value: function() {
return this.config.Debug ? this.config.reportUrlDev : this.config.reportUrlProc;
}
}, {
key: "post",
value: function(e, t) {
var n = new XMLHttpRequest();
n.timeout = 5e3, n.open("POST", this.getReportUrl(), !0), n.setRequestHeader("Content-Type", "application/json"), 
n.onreadystatechange = function() {
if (4 === n.readyState) {
var e = n.status, o = n.responseText;
if (console.log("[APM] report end", e, o), 200 == e) try {
var r = JSON.parse(o);
if (r.meta && r.meta.errCode) return void (t && t(null, r.meta));
t && t(r.data);
} catch (e) {
t && t(null, e);
} else t && t(null, {
errCode: e,
errMsg: o
});
}
}, n.send(JSON.stringify(e));
}
} ]), e;
}();
t.default = i;
}, function(e, t) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var n = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), o = function() {
function e(t, n) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.app = t, this._temp = null, this._max = n.MaxTempFailLogLength || 0, 
this.enable = n.EnabledTempFailLog;
}
return n(e, [ {
key: "setStorage",
value: function(e) {
try {
this._temp = e, this.app.setStorage("__APM_TEMP_LOGS", e);
} catch (e) {
console.log("[APM] set storage err: ", e);
}
}
}, {
key: "getStorage",
value: function() {
var e = this._temp;
if (e) return e;
try {
e = this.app.getStorage("__APM_TEMP_LOGS"), this._temp = e;
} catch (t) {
e = "", console.log("[APM] get storage err: ", t);
}
return e;
}
}, {
key: "limitLens",
value: function(e, t) {
var n = e, o = e.length - t;
return t > 0 && o > 0 && (n = e.slice(o)), n;
}
}, {
key: "setTemp",
value: function(e) {
if (this.enable) {
var t = this._temp || [];
t.push(e), this._temp = this.limitLens(t, this._max), console.log("[APM] storage fail log: ", this._temp), 
this.setStorage(this._temp);
}
}
}, {
key: "mergeNum",
value: function(e, t) {
var n = e || t;
if (n) {
for (var o in t = t || {}, e = e || {}, n) t[o] = t[o] || 0, t[o] += e[o] || 0;
return t;
}
}
}, {
key: "mergeTemp",
value: function(e, t) {
var n = t || {}, o = n.logs, r = n.sockets, i = n.times, a = e || {}, s = a.logs, l = a.sockets, c = a.times, u = {};
u.logs = this.limitLens((s || []).concat(o || []), this._max), u.sockets = this.mergeNum(r, l);
var f = i || c;
if (f) for (var d in u.times = {}, f) u.times[d] = this.mergeNum((i || {})[d], (c || {})[d]);
return u;
}
}, {
key: "getTemp",
value: function(e) {
var t = this;
if (!this.enable) return e;
var n = this.getStorage(), o = Object.assign({}, e || {});
return n && n.length && (n.forEach(function(e) {
o = t.mergeTemp(e, o);
}), console.log("[APM] merge storage log: ", o), this.clear()), o;
}
}, {
key: "checkTemp",
value: function() {
return this.enable && this.getStorage();
}
}, {
key: "clear",
value: function() {
this.setStorage("");
}
} ]), e;
}();
t.default = o;
}, function(e, t) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var n = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}();
t.SOCKET_TIMES_TYPE = {
CONNECT_TIMES: "connectTimes",
DISCONNECT_TIMES: "disconnectTimes"
};
var o = function() {
function e(t) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.collector = t, this.reset();
}
return n(e, [ {
key: "add",
value: function(e) {
e && (this.hasSocketData = !0, this.socketInfo[e] += 1);
}
}, {
key: "reset",
value: function() {
this.hasSocketData = !1, this.socketInfo = {
connectTimes: 0,
disconnectTimes: 0
};
}
}, {
key: "getInfo",
value: function() {
return this.hasSocketData ? this.socketInfo : void 0;
}
} ]), e;
}();
t.default = o;
}, function(e, t) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var n = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), o = function() {
function e(t) {
!function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), this.win = t, this._storage = {}, this.sysInfo = this.getSysInfo();
}
return n(e, [ {
key: "getWindow",
value: function() {
return this.win;
}
}, {
key: "getSysInfo",
value: function() {
var e = {}, t = this.win || {}, n = t.navigator ? t.navigator.userAgent : "";
if (!n) return e;
var o = !!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), r = n.match(/\((.+?)\)/g);
n.replace(/\((.+?)\)/g, "").replace(/\s+/g, " ").split(" ").forEach(function(t) {
var n = t.split("/");
e[n[0]] = n[1] || !0;
});
var i = r[0].replace(/\(|\)/g, "").replace(/;\s+/g, ";").split(";");
if (o) e.platform = i[0], e.system = i[1].replace(" like Mac OS X", "").replace("CPU ", ""), 
e.brand = i[0]; else {
e.platform = i[1], e.system = i[1];
var a = (i[2] || "").split(" ");
e.brand = a[0], e.model = (a[1] || "").replace("Build/", "");
}
return {
version: e.Version,
system: e.system,
platform: e.platform,
sdk: e.SDKVersion,
model: e.model,
brand: e.brand,
netType: e.NetType || ""
};
}
}, {
key: "getLocationOrigin",
value: function() {
return this.win.location.origin;
}
}, {
key: "getPerformanceTimeing",
value: function() {
return this.win.performance && this.win.performance.timing ? this.win.performance.timing : null;
}
}, {
key: "getPerformanceEntries",
value: function() {
return this.win.performance && this.win.performance.getEntries ? this.win.performance.getEntries() : {};
}
}, {
key: "getConnectionType",
value: function() {
if (!this.win.navigator || !this.win.connection) return "unknow";
var e = this.win.navigator.connection || {};
return e.type || e.effectiveType;
}
}, {
key: "setStorage",
value: function(e, t) {
if (e && (this._storage[e] = t, this.win.localStorage)) try {
var n = JSON.stringify(t);
this.win.localStorage.setItem(e, n);
} catch (e) {}
}
}, {
key: "getStorage",
value: function(e) {
var t = this._storage[e];
if (t) return t;
if (!e || !this.win.localStorage) return "";
var n = this.win.localStorage.getItem(e) || "";
try {
t = JSON.parse(n);
} catch (e) {
t = n;
}
return t;
}
}, {
key: "addEventListener",
value: function(e, t, n) {
this.win.addEventListener && this.win.addEventListener(e, t, n);
}
}, {
key: "XMLHttpRequest",
get: function() {
return this.win.XMLHttpRequest ? this.win.XMLHttpRequest : {};
},
set: function(e) {
this.win.XMLHttpRequest = e;
}
}, {
key: "navigator",
get: function() {
return this.win.navigator ? this.win.navigator : {};
}
}, {
key: "MutationObserver",
get: function() {
return this.win.MutationObserver || this.win.WebKitMutationObserver || this.win.MozMutationObserver || {};
}
} ]), e;
}();
t.default = o;
}, function(e, t, n) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), r = n(0), i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(n(3)), a = function() {
function e(t) {
return function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), function(e, t) {
if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return !t || "object" != typeof t && "function" != typeof t ? e : t;
}(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
}
return function(e, t) {
if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
e.prototype = Object.create(t && t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}(e, i.default), o(e, [ {
key: "handle",
value: function() {
var e = this;
if (this.config.EnabledAppOnErr) {
var t = void 0, n = this.onError.bind(this);
Object.defineProperty(this.app.getWindow(), "onerror", {
get: function() {
return function() {
n.apply(void 0, arguments), "function" == typeof t && t.apply(void 0, arguments);
};
},
set: function(e) {
t = e;
}
});
var o = {};
window.__errorHandler = function(t, n, r, i) {
var a = i.split("\n").map(function(e) {
for (var t = 0, n = 0; n < e.length; n++) if ("]" === e[n]) {
t = n;
break;
}
return e.substr(t + 1);
});
void 0 === o[r] && (o[r] = 1, e.onError(r, t, n, 0, {
stack: a
}));
};
}
}
}, {
key: "onError",
value: function(e, t, n, o, i) {
console.log("[APM] onerror: ", e, t, n, o, JSON.stringify(i));
var a = i ? i.stack : "";
this.tracker(r.LOG_TYPE.UNCAUGHT_ERROR).addExtra({
url: t,
line: n,
column: o,
msg: e,
stack: a
}).tryReport();
}
} ]), e;
}();
t.default = a;
}, function(e, t, n) {
Object.defineProperty(t, "__esModule", {
value: !0
});
var o = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), r = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(n(3)), i = n(0), a = n(1), s = function() {
function e(t) {
return function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}(this, e), function(e, t) {
if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return !t || "object" != typeof t && "function" != typeof t ? e : t;
}(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
}
return function(e, t) {
if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
e.prototype = Object.create(t && t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}(e, r.default), o(e, [ {
key: "handle",
value: function() {
this.app.XMLHttpRequest = this.wrapXMLHttpRequest(this.app.XMLHttpRequest);
}
}, {
key: "wrapXMLHttpRequest",
value: function(e) {
var t = this;
return function() {
var n = new e(), o = t.app.getWindow(), r = t.tracker(i.LOG_TYPE.RES_REQ, {
url: o && o.location && o.location.href
}), s = function(e) {
console.log("[APM] request err", JSON.stringify(e)), t.config.EnabledResErr && r.startTime && r.setType(i.LOG_TYPE.RES_ERROR).addExtra(e).end();
};
return n.origOpen = n.open, n.open = function(e, o) {
var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], s = arguments[3], l = arguments[4];
!function(e, n) {
r.addExtra({
url: n,
method: e
}).start(), t.collector.addTimes(n, a.TIMES_TYPE.RES_TIMES);
}(e, o), n.origOpen(e, o, i, s, l);
}, n.addEventListener("error", function(e) {
s({
err: e
});
}), n.addEventListener("timeout", function(e) {
s({
err: e
});
}), n.addEventListener("readystatechange", function() {
if (4 == n.readyState) {
var e = n.getResponseHeader("Content-Length") || 0, o = n.status, a = n.responseText;
200 == o ? function(e) {
t.config.EnabledResPerf && r.startTime && r.setType(i.LOG_TYPE.RES_REQ).addExtra(e).end();
}({
status: o,
size: e
}) : s({
status: o,
size: e,
err: a
});
}
}), n;
};
}
} ]), e;
}();
t.default = s;
}, function(e) {
e.exports = {
version: "0.1.2-2021-1-11",
date: 1610368558987,
mode: "dev"
};
} ]), H.exports)) && V.__esModule && Object.prototype.hasOwnProperty.call(V, "default") ? V.default : V;
function Q() {}
function W(e) {
void 0 === (null == e ? void 0 : e.eventName) && (e.eventName = HAPP.EventType.Track), 
void 0 === (null == e ? void 0 : e.logType) && (e.logType = HAPP.LogType.TGA), (null == e ? void 0 : e.customData) && (e.extra = e.customData), 
y({
action: "report_log_post",
payload: e
});
}
t.on(n.EventType.Init, function(e) {
var t = e.config, n = e.sysInfo;
J.init(t), J.setSysInfo(n);
}), t.on(n.EventType.Login, function(e) {
var t = (e || {}).uniqueId;
J.setUserInfo({
userId: t
});
});
var X, K = cc ? cc.sys.os === cc.sys.OS_IOS : "iOS" === egret.Capabilities.os;
function Y(e) {
return (null == e ? void 0 : e.style) && (e.extra = e.style), (null == e ? void 0 : e.id) && (e.placementId = e.id), 
new Promise(function(t, n) {
y({
action: "preload_topon_banner_ad",
payload: e
}).then(function(e) {
"onBannerLoaded" === (null == e ? void 0 : e.callbackName) ? t(e) : (null == e || e.callbackName, 
n(e));
}).catch(function(e) {
n(e);
});
});
}
function z(e) {
(null == e ? void 0 : e.id) && (e.placementId = e.id), g({
action: "show_topon_banner",
payload: e,
listener: function(t) {
var n = t.extra || {}, o = n.callbackName, r = n.param, i = n.error, a = n.errCode;
i && !K && (r = U(r)), "onBannerShow" === o ? f(null == e ? void 0 : e.onShow, r) : "onBannerFail" === o ? f(null == e ? void 0 : e.onShowFail, {
errCode: a,
errMsg: null == i ? void 0 : i.errMsg
}) : "onBannerClose" === o ? f(null == e ? void 0 : e.onClose, r) : "onBannerAutoRefreshed" === o ? f(null == e ? void 0 : e.onRefresh, r) : "onBannerAutoRefreshFail" === o ? f(null == e ? void 0 : e.onRefreshFail, {
errCode: a,
error: null == i ? void 0 : i.errMsg
}) : "onBannerClicked" === o ? f(null == e ? void 0 : e.onClick, r) : "onBannerDeepLinkOrJump" === o && f(null == e ? void 0 : e.onDeepLinkOrJump, r);
}
});
}
function Z(e) {
return (null == e ? void 0 : e.id) && (e.placementId = e.id), new Promise(function(t, n) {
y({
action: "hide_topon_banner",
payload: e
}).then(function(e) {
t(e);
}).catch(function(e) {
n(e);
});
});
}
function $(e) {
return (null == e ? void 0 : e.id) && (e.placementId = e.id), new Promise(function(t, n) {
y({
action: "preload_topon_interstitial_video_ad",
payload: e
}).then(function(e) {
"onInterstitialAdLoaded" === (null == e ? void 0 : e.callbackName) ? t(e) : (null == e || e.callbackName, 
n(e));
}).catch(function(e) {
n(e);
});
});
}
function ee(e) {
(null == e ? void 0 : e.id) && (e.placementId = e.id), g({
payload: e,
action: "show_topon_interstitial_ad",
listener: function(t) {
var n = t.extra || {}, o = n.callbackName, r = n.param, i = n.error, a = n.errCode;
i && !K && (r = U(r)), "onInterstitialAdShow" === o ? f(null == e ? void 0 : e.onShow, r) : "onInterstitialAdLoadFail" === o ? f(null == e ? void 0 : e.onShowFail, {
errCode: a,
errMsg: null == i ? void 0 : i.errMsg
}) : "onInterstitialAdClose" === o ? f(null == e ? void 0 : e.onClose, r) : "onInterstitialAdVideoStart" === o ? f(null == e ? void 0 : e.onPlayStart, r) : "onInterstitialAdVideoEnd" === o ? f(null == e ? void 0 : e.onPlayEnd, r) : "onInterstitialAdVideoError" === o ? f(null == e ? void 0 : e.onError, r) : "onInterstitialAdClicked" === o ? f(null == e ? void 0 : e.onClick, r) : "onInterstitialDeepLinkOrJump" === o && f(null == e ? void 0 : e.onDeepLinkOrJump, r);
}
});
}
function te(e) {
return (null == e ? void 0 : e.id) && (e.placementId = e.id), new Promise(function(t, n) {
y({
action: "preload_topon_reward_video_ad",
payload: e
}).then(function(e) {
"onRewardedVideoAdLoaded" === (null == e ? void 0 : e.callbackName) ? t(e) : (null == e || e.callbackName, 
n(e));
}).catch(function(e) {
n(e);
});
});
}
function ne(e) {
(null == e ? void 0 : e.id) && (e.placementId = e.id), g({
action: "show_topon_reward_video_ad",
payload: e,
listener: function(t) {
var n = t.extra || {}, o = n.callbackName, r = n.param, i = n.error, a = n.errCode;
i && !K && (r = U(r)), "onReward" === o ? f(null == e ? void 0 : e.onReward, r) : "onRewardedVideoAdLoaded" === o ? f(null == e ? void 0 : e.onLoad, r) : "onRewardedVideoAdPlayFailed" === o || "onRewardedVideoAdFailed" === o ? f(null == e ? void 0 : e.onShowFail, {
errCode: a,
errMsg: null == i ? void 0 : i.errMsg
}) : "onRewardedVideoAdClosed" === o ? f(null == e ? void 0 : e.onClose, r) : "onRewardedVideoAdPlayStart" === o ? f(null == e ? void 0 : e.onPlayStart, r) : "onRewardedVideoAdPlayEnd" === o ? f(null == e ? void 0 : e.onPlayEnd, r) : "onRewardedVideoAdPlayClicked" === o ? f(null == e ? void 0 : e.onClick, r) : "onRewardDeepLinkOrJump" === o && f(null == e ? void 0 : e.onDeepLinkOrJump, r);
}
});
}
function oe(e) {
return y({
action: "get-check-switchs",
payload: e
});
}
function re() {}
function ie(e) {
return void 0 === (null == e ? void 0 : e.isHiddenClose) && (e.isHiddenClose = !1), 
y({
action: "real_name_show_auth",
payload: e
});
}
!function(e) {
e.Channel = "get_app_channel", e.PlacementId = "get_placement_id", e.IsMobileLogin = "get_is_mobile_login";
}(X || (X = {}));
var ae, se = Object.freeze({
__proto__: null,
SMSCodeType: {
Login: "login",
Register: "register",
ResetPass: "resetPass",
Binding: "binding"
},
EventType: {
Track: "track",
UserSet: "user_set",
UserSetOnce: "user_setOnce",
UserAdd: "user_add",
UserUnset: "user_unset",
UserDel: "user_del"
},
LogType: {
Ali: 1,
TGA: 2,
STD: 4,
Platform: 8
},
QQScene: {
Friend: 0,
Space: 1
},
WXScene: {
Session: 0,
Timeline: 1,
Favorite: 2,
SpecifiedSession: 3
},
QQMicroAppType: {
Test: 1,
Release: 3
},
WXMicroAppType: {
Release: 0,
Development: 1,
Experience: 2
},
NoticeType: {
Text: 1,
Image: 2,
TextAndImage: 3,
Scroll: 4,
ScrollAndText: 5,
ScrollAndImage: 6,
All: 7
},
BindPlatformType: {
WX: "app-we",
QQ: "app-qq",
Mobile: "app-mobile",
Apple: "app-apple"
},
AddicationType: {
QuitGame: 0,
SwitchAccount: 1
},
init: b,
dialogLogin: _,
oneKeyLogin: function() {
return y({
action: "start_onekey_auth",
apiType: w
});
},
tryLogin: function() {
return y({
action: "user-tokenlogin",
apiType: w
});
},
qqLogin: function() {
return y({
action: "qq_login",
apiType: w
});
},
wechatLogin: function() {
return y({
action: "wx-getcode",
apiType: w
});
},
visitorLogin: T,
smsLogin: function(e) {
return (null == e ? void 0 : e.phoneNumber) && (e.mobile = e.phoneNumber), y({
action: "user-mobile-login",
payload: e,
apiType: w
});
},
getIsSupportAppleLogin: function() {
return y({
action: "apple_is_support_login"
});
},
appleLogin: function() {
return y({
action: "apple_get_login_code",
apiType: w
});
},
sendSMSCode: function(e) {
return void 0 !== e.phoneNumber && (e.accountNum = e.phoneNumber), void 0 !== e.smsCodeType ? e.verifyCodeTp = e.smsCodeType : e.verifyCodeTp = HAPP.SMSCodeType.Login, 
y({
action: "send_verify_code",
payload: e
});
},
bindPlatform: function(e) {
return y({
action: "user-bind-platform",
payload: e
});
},
getUserInfo: function() {
return y({
action: "user-getuserinfo"
});
},
logout: function() {
return y({
action: "user-logout"
});
},
applePay: function(e) {
return s(this, void 0, void 0, function() {
return l(this, function() {
return [ 2, y({
action: "iap-purchase",
payload: e
}) ];
});
});
},
onApplePaySupplement: function(e) {
return s(this, void 0, void 0, function() {
return l(this, function() {
return g({
action: "iap-register-supplement",
listener: null == e ? void 0 : e.listener
}), [ 2 ];
});
});
},
restoreApplePay: function() {
return s(this, void 0, void 0, function() {
return l(this, function() {
return [ 2, y({
action: "iap-restore-purchase"
}) ];
});
});
},
dialogPay: function(e) {
return s(this, void 0, void 0, function() {
return l(this, function() {
return [ 2, y({
action: "show-pay-dialog",
payload: e
}) ];
});
});
},
dialogShare: k,
getShareDataList: function() {
return new Promise(function(e, t) {
y({
action: "wx-share-get-data"
}).then(function(t) {
Array.isArray(t) ? e(t) : e(t.data);
}).catch(function(e) {
t(e);
});
});
},
onQueryChange: function(e) {
void 0 === e && (e = {
listener: function() {}
});
var t = e.listener, n = null;
h({
action: "send-url-param",
listener: function(e) {
var t = e.meta, o = e.extra;
t && 0 === t.errCode && o && (Object.keys(o).forEach(function(e) {
o[e] = decodeURIComponent(o[e]);
}), n = o);
}
}), n && (t(n), n = ""), setInterval(function() {
n && (t(n), n = "");
}, 500);
},
qqShareImage: function(e) {
return y({
action: "qq-image-share-by-path",
payload: e
});
},
qqShareImageAndText: function(e) {
return y({
action: "qq-share-url-by-path",
payload: e
});
},
qqShareMicroApp: function(e) {
return y({
action: "qq-share-miniprogram",
payload: e
});
},
wxShareImage: function(e) {
return y({
action: "wx-share-imgpath",
payload: e
});
},
wxShareImageAndText: function(e) {
return y({
action: "wx-share-url-by-path",
payload: e
});
},
wxShareMicroApp: function(e) {
return e.disableForward = e.isDisableForward ? 1 : 0, e.withShareTicket = e.isWithShareTicket ? 1 : 0, 
y({
action: "wx-share-miniprogram",
payload: e
});
},
getNotice: q,
getFilePath: function(e) {
return y({
action: "cp_share_img_sdcard",
payload: e
});
},
downloadFile: function(e) {
void 0 === e && (e = {}), void 0 !== (null == e ? void 0 : e.url) && (e.downloadUrl = e.url), 
void 0 !== (null == e ? void 0 : e.isAutoInstall) ? e.isInstallApk = e.isAutoInstall : e.isInstallApk = !0, 
void 0 === (null == e ? void 0 : e.md5) && (e.md5 = ""), (null == e ? void 0 : e.fileName) && (e.saveFile = e.fileName), 
g({
payload: e,
action: "download_file",
listener: function(t) {
var n = t.extra, o = t.meta;
o && 0 !== o.errCode ? f(null == e ? void 0 : e.onError, o) : o && 0 === o.errCode ? (n && "onStart" === n.status && f(null == e ? void 0 : e.onStart), 
n && "onProgress" === n.status && f(null == e ? void 0 : e.onProgress, n.progress), 
n && "onComplete" === n.status && f(null == e ? void 0 : e.onComplete)) : f(null == e ? void 0 : e.onError, o);
}
});
},
getIsInstalledWX: function() {
return y({
action: "wx-isinstalled"
});
},
getIsInstalledQQ: function() {
return y({
action: "qq-isinstalled"
});
},
jumpMiniProgram: function(e) {
return y({
action: "wx-jump-miniprogram",
payload: e
});
},
getRTCToken: function(e) {
return y({
action: "get_rtc_token",
payload: e
});
},
getAsrInstance: function(e) {
return G || (G = new B(e)), G;
},
postAPMLog: function(e) {
J.notify(e);
},
onAddictionQuit: function(e) {
h({
action: "game_addiction_quit",
listener: null == e ? void 0 : e.listener
});
},
onAddictionSwitchAccount: function(e) {
h({
action: "game_addiction_switch_account",
listener: null == e ? void 0 : e.listener
});
},
getAddictionConfig: function() {
return y({
action: "get_addiction_config"
});
},
postAddiction: function() {
return y({
action: "post_addiction"
});
},
listenNeedRest: function(e) {
h({
action: "game_addiction_quit",
listener: function() {
f(null == e ? void 0 : e.listener, {
type: HAPP.AddicationType.QuitGame
});
}
}), h({
action: "game_addiction_switch_account",
listener: function() {
f(null == e ? void 0 : e.listener, {
type: HAPP.AddicationType.SwitchAccount
});
}
});
},
sharePointShow: Q,
postGameLog: W,
setTGAUserAccountId: function(e) {
y({
action: "user_account_id",
payload: e
});
},
showAppComment: function(e) {
v({
action: "show-inapp-comment",
payload: {
appleId: e.appleId
}
});
},
preloadBannerAd: Y,
showBannerAd: z,
closeBannerAd: Z,
preloadInterstitialAd: $,
showInterstitialAd: ee,
preloadVideoAd: te,
showVideoAd: ne,
show233Ad: function(e) {
(null == e ? void 0 : e.id) && (e.advId = e.id), g({
action: "show_ad_233",
payload: e,
listener: function(t) {
var n = t.extra || {}, o = n.callbackName, r = n.param;
n.error, n.errCode, "onVideoShow" === o ? f(null == e ? void 0 : e.onShow, r) : "onVideoShowSkip" === o ? f(null == e ? void 0 : e.onSkip, r) : "onVideoShowFail" === o ? f(null == e ? void 0 : e.onShowFail, r) : "onVideoReward" === o ? f(null == e ? void 0 : e.onReward, r) : "onVideoClose" === o ? f(null == e ? void 0 : e.onClose, r) : "onVideoClick" === o && f(null == e ? void 0 : e.onClick, r);
}
});
},
checkSwitches: oe,
onPushMsg: function(e) {
g({
action: "push-onmessage",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
pushMsgSetUserTags: function(e) {
return y({
action: "push-set-tags",
payload: e
});
},
pushMsgSetAlias: function(e) {
return y({
action: "push-setalias",
payload: e
});
},
pushMsgResetAlias: function(e) {
return y({
action: "push-unsetalias",
payload: e
});
},
pushMsgSetBadge: function(e) {
return y({
action: "push-setbadge",
payload: e
});
},
pushMsgResetBadge: function() {
return y({
action: "push-reset-badge"
});
},
pushMsgClear: function() {
return y({
action: "push-clearallnotice"
});
},
onPushMsgOnlineStateChange: function(e) {
g({
action: "on-receive-online-tate",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
onPushMsgCommandChange: function(e) {
g({
action: "on-receive-command-result",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
onPushMsgArrivedChange: function(e) {
g({
action: "on-notification-message-arrived",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
onPushMsgClick: function(e) {
g({
action: "on-notification-message-clicked",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
onPushMsgPID: function(e) {
g({
action: "on-receive-service-pid",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
onPushMsgClientId: function(e) {
g({
action: "on-receive-client-id",
listener: function(t) {
var n = t.extra;
t.meta, f(null == e ? void 0 : e.listener, n);
}
});
},
checkRealNameAuth: re,
setRealNameAuth: ie,
showLoading: function() {
v({
action: "show_loading"
});
},
hideLoading: function() {
v({
action: "hide_loading"
});
},
getBuildKey: function() {
var e = {
channel: "get_app_channel",
placementId: "get_placement_id",
isMobileLogin: "get_is_mobile_login"
}, t = {}, n = 0;
return new Promise(function(o, r) {
var i = Object.keys(e);
i.forEach(function(a) {
y({
action: e[a]
}).then(function(e) {
t = Object.assign(t, e), ++n === i.length && o(t);
}).catch(function(e) {
r(e);
});
});
});
}
});
!function(e) {
e.Development = "Dev", e.Test = "Test", e.Production = "Prod";
}(ae || (ae = {}));
var le = a({
init: b,
login: _,
weakLogin: T,
shareMessage: k,
sharePointShow: Q,
preloadVideoAd: te,
showVideoAd: ne,
preloadBannerAd: Y,
showBannerAd: z,
closeBannerAd: Z,
preloadInterstitialAd: $,
showInterstitialAd: ee,
postGameLog: W,
getNotice: q,
checkSwitches: oe,
checkRealNameAuth: re,
setRealNameAuth: ie
}, Object.freeze({
__proto__: null,
get ENV() {
return ae;
},
NoticeType: {
Text: 1,
Image: 2,
TextAndImage: 3,
Scroll: 4,
ScrollAndText: 5,
ScrollAndImage: 6,
All: 7
}
}));
window.HAPP = Object.assign({}, se), window.HAPP.onMessage = function(e, o) {
"sdk" === e && t.emit(n.EventType.ReceiveFromNative, o);
}, window.HSDK = window.HAPP, window.HWX = le;
});