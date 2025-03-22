var pnglite, SIGNATURE = new Uint8Array([ 137, 80, 78, 71, 13, 10, 26, 10 ]), IHDR_LENGTH = new Uint8Array([ 0, 0, 0, 13 ]), TYPE_IHDR = new Uint8Array([ 73, 72, 68, 82 ]), TYPE_IDAT = new Uint8Array([ 73, 68, 65, 84 ]), IEND = new Uint8Array([ 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130 ]);

(function(t) {
t.encode = function(t) {
var i = t.width, n = t.height, e = t.data, o = !0;
if (e.byteLength === i * n * 4) ; else {
if (e.byteLength !== i * n * 3) throw new Error("invalid data");
o = !1;
}
var w = new bon.DataWriter();
w.writeUint8Array(SIGNATURE);
w.writeUint8Array(IHDR_LENGTH);
var I = w.position;
w.writeUint8Array(TYPE_IHDR);
r(w, i);
r(w, n);
w.writeInt8(8);
w.writeInt8(o ? 6 : 2);
w.writeInt8(0);
w.writeInt8(0);
w.writeInt8(0);
r(w, a(w.data, I, w.position));
I = w.position;
for (var s = 0, d = i * (o ? 4 : 3), p = 0; p < n; p++, s += d) {
w.writeInt8(0);
w.writeUint8Array(e, s, d);
}
var y = pako.deflate(w.data.subarray(I, w.position), {
level: 9,
strategy: 3
});
w.position = I;
r(w, y.byteLength);
I = w.position;
w.writeUint8Array(TYPE_IDAT);
w.writeUint8Array(y);
r(w, a(w.data, I, w.position));
w.writeUint8Array(IEND);
return w.getBytes(!0);
};
t.decode = function(t) {
var r = new bon.DataReader(t);
r.position += 16;
var n = i(r), a = i(r);
r.position++;
var e = r.readUInt8(), o = 6 == e || 2 != e && void 0;
if (void 0 === o) throw new Error("invalid data");
r.position += 7;
for (var w = 0; ;) {
w = i(r);
if (t[r.position] == TYPE_IDAT[0] && t[r.position + 1] == TYPE_IDAT[1] && t[r.position + 2] == TYPE_IDAT[2] && t[r.position + 3] == TYPE_IDAT[3]) {
r.position += 4;
break;
}
r.position += 8 + w;
}
if (r.position + w + 4 >= t.byteLength) throw new Error("invalid data");
for (var I = pako.inflate(t.subarray(r.position, r.position + w)), s = 0, d = 0, p = n * (o ? 4 : 3), y = p + 1, v = 0; v < a; v++, 
s += p, d += y) I.set(I.subarray(d + 1, d + 1 + p), s);
return {
width: n,
height: a,
data: I.subarray(0, s)
};
};
function r(t, r) {
t.writeInt8(r >> 24);
t.writeInt8(r >> 16);
t.writeInt8(r >> 8);
t.writeInt8(r);
}
function i(t) {
return t.readUInt8() << 24 | t.readUInt8() << 16 | t.readUInt8() << 8 | t.readUInt8();
}
var n = [];
(function() {
for (var t = 0; t < 256; t++) {
for (var r = t, i = 0; i < 8; i++) 1 & r ? r = 3988292384 ^ r >>> 1 : r >>>= 1;
n[t] = r;
}
})();
function a(t, r, i) {
for (var a = -1, e = r; e < i; e++) a = n[255 & (a ^ t[e])] ^ a >>> 8;
return -1 ^ a;
}
})(pnglite || (pnglite = {}));

window.pnglite = pnglite;