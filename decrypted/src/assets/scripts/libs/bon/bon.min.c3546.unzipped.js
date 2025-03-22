var bon;

(function(t) {
var i = {}, e = 0, r = [], n = function() {
function t(t) {
this.position = 0;
this.reset(t);
}
Object.defineProperty(t.prototype, "dataView", {
get: function() {
return this._dataView || (this._dataView = new DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength));
},
enumerable: !1,
configurable: !0
});
t.prototype.reset = function(t) {
this.data = t;
this.position = 0;
this._dataView = null;
};
t.prototype.validate = function(t) {
if (this.position + t > this.data.length) {
console.error("read eof");
return !1;
}
return !0;
};
t.prototype.readUInt8 = function() {
if (this.validate(1)) return this.data[this.position++];
};
t.prototype.readInt16 = function() {
if (this.validate(2)) return this.data[this.position++] | this.data[this.position++] << 8;
};
t.prototype.readInt32 = function() {
if (this.validate(4)) return this.data[this.position++] | this.data[this.position++] << 8 | this.data[this.position++] << 16 | this.data[this.position++] << 24;
};
t.prototype.readInt64 = function() {
var t = this.readInt32();
t < 0 && (t += 4294967296);
return t + 4294967296 * this.readInt32();
};
t.prototype.readFloat32 = function() {
if (this.validate(4)) {
var t = this.dataView.getFloat32(this.position, !0);
this.position += 4;
return t;
}
};
t.prototype.readFloat64 = function() {
if (this.validate(8)) {
var t = this.dataView.getFloat64(this.position, !0);
this.position += 8;
return t;
}
};
t.prototype.read7BitInt = function() {
var t = 0, i = 0, e = 0;
do {
if (35 == e) throw Error("Format_Bad7BitInt32");
i |= (127 & (t = this.readUInt8())) << e;
e += 7;
} while (0 != (128 & t));
return i;
};
t.prototype.readUTF = function() {
var t = this.read7BitInt();
return this.readUTFBytes(t);
};
t.prototype.readUint8Array = function(t, i) {
void 0 === i && (i = !1);
var e = i ? this.data.slice(this.position, this.position + t) : this.data.subarray(this.position, this.position + t);
this.position += t;
return e;
};
t.prototype.readUTFBytes = function(t) {
if (0 === t) return "";
if (this.validate(t)) {
var i = this.decodeUTF8(this.data, this.position, t);
this.position += t;
return i;
}
};
t.prototype.decoderError = function(t) {
throw new Error("decode error at " + this.position + ": " + t);
};
t.prototype.decodeUTF8 = function(t, n, o) {
var s = ~~n, a = void 0 === o ? t.byteLength : Math.min(t.byteLength, s + o);
if (0 == (o = a - s)) return "";
var h, d = o <= 32;
if (d) {
h = i;
for (var p = s; p < a; ) {
var u = t[p++];
h = h[u] || (h[u] = {});
}
if (h.value) return h.value;
}
r.length = 0;
for (;s < a; ) {
var c = t[s++];
0 != (128 & c) ? 192 != (224 & c) ? 224 != (240 & c) ? 240 != (248 & c) ? 248 != (252 & c) ? 252 != (254 & c) ? this.decoderError("unsuport utf8 code: " + c) : r.push((1 & c) << 30 | (63 & t[s++]) << 24 | (63 & t[s++]) << 18 | (63 & t[s++]) << 12 | (63 & t[s++]) << 6 | 63 & t[s++]) : r.push((3 & c) << 24 | (63 & t[s++]) << 18 | (63 & t[s++]) << 12 | (63 & t[s++]) << 6 | 63 & t[s++]) : r.push((7 & c) << 18 | (63 & t[s++]) << 12 | (63 & t[s++]) << 6 | 63 & t[s++]) : r.push((15 & c) << 12 | (63 & t[s++]) << 6 | 63 & t[s++]) : r.push((31 & c) << 6 | 63 & t[s++]) : r.push(c);
}
var w = String.fromCodePoint.apply(String, r);
r.length = 0;
if (d) if (++e >= 32768) {
e = 0;
i = {};
} else h.value = w;
return w;
};
return t;
}();
t.DataReader = n;
})(bon || (bon = {}));

(function(t) {
var i = new Uint8Array(524288), e = function() {
function t() {
this.position = 0;
this.data = i;
}
Object.defineProperty(t.prototype, "dataView", {
get: function() {
return this._dataView || (this._dataView = new DataView(this.data.buffer, 0, this.data.byteLength));
},
enumerable: !1,
configurable: !0
});
t.prototype.reset = function() {
this.data = i;
this._dataView = null;
this.position = 0;
};
t.prototype.ensureBuffer = function(t) {
if (this.position + t > i.byteLength) {
var e = i;
this.data = i = new Uint8Array(Math.max(~~(1.2 * i.byteLength), this.position + t));
i.set(e, 0);
this._dataView = null;
}
};
t.prototype.writeInt8 = function(t) {
this.ensureBuffer(1);
this.data[this.position++] = ~~t;
};
t.prototype.writeInt16 = function(t) {
this.ensureBuffer(2);
this.data[this.position++] = ~~t;
this.data[this.position++] = t >> 8;
};
t.prototype.writeInt32 = function(t) {
this.ensureBuffer(4);
this.data[this.position++] = ~~t;
this.data[this.position++] = t >> 8;
this.data[this.position++] = t >> 16;
this.data[this.position++] = t >> 24;
};
t.prototype.writeInt64 = function(t) {
this.writeInt32(t);
t < 0 ? this.writeInt32(~(-t / 4294967296)) : this.writeInt32(~~(t / 4294967296));
};
t.prototype.writeFloat32 = function(t) {
this.ensureBuffer(4);
this.dataView.setFloat32(this.position, t, !0);
this.position += 4;
};
t.prototype.writeFloat64 = function(t) {
this.ensureBuffer(8);
this.dataView.setFloat64(this.position, t, !0);
this.position += 8;
};
t.prototype.write7BitInt = function(t) {
for (var i = ~~t; i >= 128; ) {
this.writeInt8(128 | i);
i >>>= 7;
}
this.writeInt8(i);
};
t.prototype.writeUTF = function(t) {
if (0 !== t.length) {
var i = this.position;
this.ensureBuffer(8);
this.position += 8;
var e = this.position;
this.writeUTFBytes(t);
var r = this.position;
this.position = i;
var n = r - e;
this.write7BitInt(n);
this.data.copyWithin(this.position, e, r);
this.position += n;
} else this.write7BitInt(0);
};
t.prototype.writeUint8Array = function(t, i, e) {
var r = ~~i, n = void 0 === e ? t.byteLength : Math.min(t.byteLength, r + e);
if (!((e = n - r) <= 0)) {
this.ensureBuffer(e);
this.data.set(t.subarray(i, n), this.position);
this.position += e;
}
};
t.prototype.encoderError = function(t) {
throw new Error("encode error at " + this.position + ": " + t);
};
t.prototype.writeUTFBytes = function(t) {
for (var i = 0; i < t.length; i++) {
var e = t.codePointAt(i);
e < 0 && this.encoderError("unsupport code point: " + e);
if (e <= 127) this.writeInt8(e); else if (e <= 2047) {
this.writeInt8(e >>> 6 | 192);
this.writeInt8(e >>> 0 & 63 | 128);
} else if (e <= 65535) {
this.writeInt8(e >>> 12 | 224);
this.writeInt8(e >>> 6 & 63 | 128);
this.writeInt8(e >>> 0 & 63 | 128);
} else if (e <= 2097151) {
this.writeInt8(e >>> 18 | 240);
this.writeInt8(e >>> 12 & 63 | 128);
this.writeInt8(e >>> 6 & 63 | 128);
this.writeInt8(e >>> 0 & 63 | 128);
i++;
} else if (e <= 67108863) {
this.writeInt8(e >>> 24 | 248);
this.writeInt8(e >>> 18 & 63 | 128);
this.writeInt8(e >>> 12 & 63 | 128);
this.writeInt8(e >>> 6 & 63 | 128);
this.writeInt8(e >>> 0 & 63 | 128);
i++;
} else if (e <= 2147483647) {
this.writeInt8(e >>> 30 | 252);
this.writeInt8(e >>> 24 & 63 | 128);
this.writeInt8(e >>> 18 & 63 | 128);
this.writeInt8(e >>> 12 & 63 | 128);
this.writeInt8(e >>> 6 & 63 | 128);
this.writeInt8(e >>> 0 & 63 | 128);
i++;
} else this.encoderError("unsupport code point: " + e);
}
};
t.prototype.getBytes = function(t) {
void 0 === t && (t = !1);
return t ? this.data.slice(0, this.position) : this.data.subarray(0, this.position);
};
return t;
}();
t.DataWriter = e;
})(bon || (bon = {}));

(function(t) {
var i = function() {
function i() {
this.dw = new t.DataWriter();
this.strMap = new Map();
}
i.prototype.reset = function() {
this.dw.reset();
this.strMap.clear();
};
i.prototype.encodeInt = function(t) {
this.dw.writeInt8(1);
this.dw.writeInt32(t);
};
i.prototype.encodeLong = function(t) {
this.dw.writeInt8(2);
if ("number" == typeof t) this.dw.writeInt64(t); else {
this.dw.writeInt32(t.low);
this.dw.writeInt32(t.high);
}
};
i.prototype.encodeFloat = function(t) {
this.dw.writeInt8(3);
this.dw.writeFloat32(t);
};
i.prototype.encodeDouble = function(t) {
this.dw.writeInt8(4);
this.dw.writeFloat64(t);
};
i.prototype.encodeNumber = function(t) {
~~t !== t ? Math.floor(t) !== t ? this.encodeDouble(t) : this.encodeLong(t) : this.encodeInt(t);
};
i.prototype.encodeString = function(t) {
var i = this.strMap.get(t);
if (void 0 !== i) {
this.dw.writeInt8(99);
this.dw.write7BitInt(i);
} else {
this.dw.writeInt8(5);
this.dw.writeUTF(t);
this.strMap.set(t, this.strMap.size);
}
};
i.prototype.encodeBoolean = function(t) {
this.dw.writeInt8(6);
this.dw.writeInt8(t ? 1 : 0);
};
i.prototype.encodeNull = function() {
this.dw.writeInt8(0);
};
i.prototype.encodeDateTime = function(t) {
this.dw.writeInt8(10);
this.dw.writeInt64(t.getTime());
};
i.prototype.encodeBinary = function(t) {
this.dw.writeInt8(7);
this.dw.write7BitInt(t.byteLength);
this.dw.writeUint8Array(t);
};
i.prototype.encodeArray = function(t) {
this.dw.writeInt8(9);
this.dw.write7BitInt(t.length);
for (var i = t.length, e = 0; e < i; ++e) this.encode(t[e]);
};
i.prototype.encodeMap = function(t) {
var i = this;
this.dw.writeInt8(8);
this.dw.write7BitInt(t.size);
t.forEach(function(t, e) {
i.encode(e);
i.encode(t);
});
};
i.prototype.encodeObject = function(t) {
this.dw.writeInt8(8);
var i = [];
for (var e in t) void 0 !== t[e] && i.push(e);
this.dw.write7BitInt(i.length);
for (var r = 0, n = i; r < n.length; r++) {
var o = n[r];
this.encode(o);
this.encode(t[o]);
}
};
i.prototype.encode = function(i) {
if (null != i) switch (i.constructor) {
case Number:
this.encodeNumber(i);
return;

case Boolean:
this.encodeBoolean(i);
return;

case String:
this.encodeString(i);
return;

case t.Int64:
this.encodeLong(i);
return;

case Array:
this.encodeArray(i);
return;

case Map:
this.encodeMap(i);
return;

case Date:
this.encodeDateTime(i);
return;

case Uint8Array:
this.encodeBinary(i);
return;

default:
if ("object" != typeof i) {
this.encodeNull();
return;
}
this.encodeObject(i);
} else this.encodeNull();
};
i.prototype.getBytes = function(t) {
void 0 === t && (t = !1);
return this.dw.getBytes(t);
};
return i;
}();
t.BonEncoder = i;
var e = function() {
function i() {
this.dr = new t.DataReader(null);
this.strArr = [];
}
i.prototype.reset = function(t) {
this.dr.reset(t);
this.strArr.length = 0;
};
i.prototype.decode = function() {
switch (this.dr.readUInt8()) {
default:
return null;

case 1:
return this.dr.readInt32();

case 2:
return this.dr.readInt64();

case 3:
return this.dr.readFloat32();

case 4:
return this.dr.readFloat64();

case 5:
var t = this.dr.readUTF();
this.strArr.push(t);
return t;

case 6:
return 1 == this.dr.readUInt8();

case 7:
return this.dr.readUint8Array(this.dr.read7BitInt(), !1);

case 8:
for (var i = this.dr.read7BitInt(), e = {}, r = 0; r < i; r++) {
var n = this.decode(), o = this.decode();
e[n] = o;
}
return e;

case 9:
i = this.dr.read7BitInt();
var s = new Array(i);
for (r = 0; r < i; r++) s[r] = this.decode();
return s;

case 10:
return new Date(this.dr.readInt64());

case 99:
return this.strArr[this.dr.read7BitInt()];
}
};
return i;
}();
t.BonDecoder = e;
})(bon || (bon = {}));

(function(t) {
var i = new t.BonEncoder();
t.encode = function(t, e) {
void 0 === e && (e = !0);
var r = i;
r.reset();
r.encode(t);
return r.getBytes(e);
};
var e = new t.BonDecoder();
t.decode = function(t) {
var i = e;
i.reset(t);
return i.decode();
};
t.Int64 = function(t, i) {
this.high = t;
this.low = i;
};
})(bon || (bon = {}));

try {
window.bon = bon;
} catch (t) {}