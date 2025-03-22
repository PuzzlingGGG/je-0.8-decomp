var __awaiter = this && this.__awaiter || function (e, t, n, r) {
	return new (n || (n = Promise))(function (o, i) {
		function s(e) {
			try {
				c(r.next(e));
			} catch (e) {
				i(e);
			}
		}

		function a(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				i(e);
			}
		}

		function c(e) {
			e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
				e(t);
			})).then(s, a);
			var t;
		}
		c((r = r.apply(e, t || [])).next());
	});
},
	__generator = this && this.__generator || function (e, t) {
		var n, r, o, i, s = {
			label: 0,
			sent: function () {
				if (1 & o[0]) throw o[1];
				return o[1];
			},
			trys: [],
			ops: []
		};
		return i = {
			next: a(0),
			throw: a(1),
			return: a(2)
		}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
			return this;
		}), i;

		function a(e) {
			return function (t) {
				return c([e, t]);
			};
		}

		function c(i) {
			if (n) throw new TypeError("Generator is already executing.");
			for (; s;) try {
				if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
					0) : r.next) && !(o = o.call(r, i[1])).done) return o;
				(r = 0, o) && (i = [2 & i[0], o.value]);
				switch (i[0]) {
					case 0:
					case 1:
						o = i;
						break;

					case 4:
						s.label++;
						return {
							value: i[1],
							done: !1
						};

					case 5:
						s.label++;
						r = i[1];
						i = [0];
						continue;

					case 7:
						i = s.ops.pop();
						s.trys.pop();
						continue;

					default:
						if (!(o = s.trys, o = o.length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
							s = 0;
							continue;
						}
						if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
							s.label = i[1];
							break;
						}
						if (6 === i[0] && s.label < o[1]) {
							s.label = o[1];
							o = i;
							break;
						}
						if (o && s.label < o[2]) {
							s.label = o[2];
							s.ops.push(i);
							break;
						}
						o[2] && s.ops.pop();
						s.trys.pop();
						continue;
				}
				i = t.call(e, s);
			} catch (e) {
				i = [6, e];
				r = 0;
			} finally {
					n = o = 0;
				}
			if (5 & i[0]) throw i[1];
			return {
				value: i[0] ? i[1] : void 0,
				done: !0
			};
		}
	},
	__values = this && this.__values || function (e) {
		var t = "function" == typeof Symbol && Symbol.iterator,
			n = t && e[t],
			r = 0;
		if (n) return n.call(e);
		if (e && "number" == typeof e.length) return {
			next: function () {
				e && r >= e.length && (e = void 0);
				return {
					value: e && e[r++],
					done: !e
				};
			}
		};
		throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
	},
	__extends = this && this.__extends || function () {
		var e = function (t, n) {
			return (e = Object.setPrototypeOf || {
				__proto__: []
			}
				instanceof Array && function (e, t) {
					e.__proto__ = t;
				} || function (e, t) {
					for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
				})(t, n);
		};
		return function (t, n) {
			e(t, n);

			function r() {
				this.constructor = t;
			}
			t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
		};
	}(),
	__read = this && this.__read || function (e, t) {
		var n = "function" == typeof Symbol && e[Symbol.iterator];
		if (!n) return e;
		var r, o, i = n.call(e),
			s = [];
		try {
			for (;
				(void 0 === t || t-- > 0) && !(r = i.next()).done;) s.push(r.value);
		} catch (e) {
			o = {
				error: e
			};
		} finally {
			try {
				r && !r.done && (n = i.return) && n.call(i);
			} finally {
				if (o) throw o.error;
			}
		}
		return s;
	},
	__spread = this && this.__spread || function () {
		for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(__read(arguments[t]));
		return e;
	},
	__decorate = this && this.__decorate || function (e, t, n, r) {
		var o, i = arguments.length,
			s = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
		else
			for (var a = e.length - 1; a >= 0; a--)(o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
		return i > 3 && s && Object.defineProperty(t, n, s), s;
	};

(function (e) {
	e.options = {};
	var t = [];
	e.addStartBack = function (e) {
		t.push(e);
	};
	e.startup = function (n) {
		void 0 === n && (n = null);
		return __awaiter(this, void 0, void 0, function () {
			var r, o, i, s, a, c;
			return __generator(this, function (u) {
				switch (u.label) {
					case 0:
						if (!n.debug) try {
							window._getGlobalState().disableErrorBoundaries = !0;
						} catch (e) { }
						e.options = n = n || e.options;
						n.debug = !!n.debug;
						(r = n.rpc || (n.rpc = {})).connectTimeoutTotal = r.connectTimeoutTotal || 1e4;
						r.connectTimeoutOnce = r.connectTimeoutOnce || 3e3;
						r.heartbeatInterval = r.heartbeatInterval || 5e3;
						r.heartbeatTimeout = r.heartbeatTimeout || 1e4;
						u.label = 1;

					case 1:
						u.trys.push([1, 6, 7, 8]);
						o = __values(t), i = o.next();
						u.label = 2;

					case 2:
						return i.done ? [3, 5] : [4, (0, i.value)(n)];

					case 3:
						u.sent();
						u.label = 4;

					case 4:
						i = o.next();
						return [3, 2];

					case 5:
						return [3, 8];

					case 6:
						s = u.sent();
						a = {
							error: s
						};
						return [3, 8];

					case 7:
						try {
							i && !i.done && (c = o.return) && c.call(o);
						} finally {
							if (a) throw a.error;
						}
						return [7];

					case 8:
						return [2];
				}
			});
		});
	};
})(orange || (orange = {}));

try {
	(window || global).orange = orange;
} catch (e) { }

var orange, run = function () {
	try {
		return autorun;
	} catch (e) {
		return null;
	}
}(),
	ract = function () {
		try {
			return reaction;
		} catch (e) {
			return null;
		}
	}();

(function (e) {
	var t = 1;
	e.calculate = function (e, t, n) {
		if (window.computed) return computed(e, t, n);
	};
	e.watch = function (e, t, n) {
		if (window.observable) return observable(e, t, n);
	};
	e.modify = function (e, t, n) {
		if (window.action) return action.bound.call(null, e, t, n);
	};
	var n = Symbol("orange autorun");
	e.observer = function (r) {
		var o = e.getHideProperty(r.prototype);
		r.prototype.$className || (r.prototype.$className = r.name);
		if (o && o.data) return r;
		if (o) {
			o.data = !0;
			return function (e) {
				__extends(r, e);

				function r() {
					for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
					var s = e.apply(this, __spread(r)) || this;
					s.startRunSymbol = [];
					s.stopRunSymbol = [];
					s.stopSymbol = !1;
					s.uuid || (s.uuid = t++);
					o[n] && o[n].forEach(function (e) {
						return e(s);
					});
					return s;
				}
				return r;
			}(r);
		}
	};
	var r = Symbol("orange render list");

	function o(t, r) {
		var o = e.createHideProperty(t);
		o[n] || (o[n] = new Set());
		o[n].add(function (e) {
			var t = e[r].bind(e);
			e.startRunSymbol.push(t);
			e.stopRunSymbol.push(i(t));
		});
	}
	e.addInsideAutorunToClass = o;
	e.autorunExtend = function (t, o, s) {
		var a = e.createHideProperty(t);
		a[n] || (a[n] = new Set());
		a[n].add(function (e) {
			e[r] || (e[r] = {});
			if (!e[r]["$component_" + o]) {
				e[r]["$component_" + o] = !0;
				var t = e[o].bind(e),
					n = null;
				s(e, function () {
					n || (n = i(t));
				}, function () {
					n && n();
					n = null;
				});
			}
		});
	};
	e.constructorCall = function (t, r) {
		var o = e.createHideProperty(t);
		o[n] || (o[n] = new Set());
		o[n].add(r);
	};

	function i(t, n, r) {
		if (!n) {
			if (e.options.debug) {
				e.Debug.autorunCount++;
				e.Debug.autorunSum++;
				var i = run(t);
				return function () {
					e.Debug.autorunCount--;
					i();
					i = null;
				};
			}
			return run(t);
		}
		o(t, n);
		return r;
	}
	e.autorun = i;
	e.reaction = function (e, t, n) {
		var r = {
			fireImmediately: !0
		};
		n && (r.equals = n);
		return ract(function () {
			return e();
		}, function (e) {
			t(e);
		}, r);
	};
})(orange || (orange = {}));

window.orange = orange;

(function (e) {
	var t = function () {
		function t() {
			this.descs = [];
			this.calls = new Set();
		}
		t.prototype.execute = function (e) {
			this.calls.forEach(function (t) {
				return t.apply(null, e);
			});
		};
		t.register = function (e, n, r) {
			void 0 === r && (r = "");
			var o = t.cmds.get(e);
			if (!o) {
				(o = new t()).name = e;
				o.descs.push(r);
				t.cmds.set(e, o);
			}
			o.calls.add(n);
		};
		t.execute = function (e) {
			for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
			var o = t.cmds.get(e);
			o ? o.execute(n) : console.warn("[orange command] 没有找到对应的命令：" + e);
		};
		t.list = function () {
			console.log("[orange command] list：");
			var n = [
				["name", "desc"]
			];
			t.cmds.forEach(function (e) {
				return n.push([e.name, e.descs]);
			});
			console.log(e.StringUtil.tableToString(n));
		};
		t.cmds = new Map();
		return t;
	}();
	e.Command = t;
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function t() {
			this.serverTime = -1;
		}
		__decorate([e.watch], t.prototype, "serverTime", void 0);
		return t;
	}();
	e.BaseSync = t;
	e.baseSync = new t();
})(orange || (orange = {}));

(function (e) {
	var t = function (e, t, n, r) {
		var o, i = arguments.length,
			s = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
		else
			for (var a = e.length - 1; a >= 0; a--)(o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
		return i > 3 && s && Object.defineProperty(t, n, s), s;
	};
	e.extendClass = function (n, r, o) {
		var i = n.prototype;
		if (i) {
			if (r)
				for (var s in r) {
					var a = r[s];
					Object.defineProperty(i, s, {
						get: a,
						enumerable: !0,
						configurable: !0
					});
					t([e.calculate], i, s, null);
				}
			if (o)
				for (var s in o) {
					a = o[s];
					i[s] = a;
				}
		}
	};
})(orange || (orange = {}));

(function (e) {
	var t = 1,
		n = function () {
			function e() {
				this._hash = t++;
			}
			Object.defineProperty(e.prototype, "hash", {
				get: function () {
					return this._hash;
				},
				enumerable: !1,
				configurable: !0
			});
			Object.defineProperty(e, "hash", {
				get: function () {
					return t;
				},
				set: function (e) {
					t = e;
				},
				enumerable: !1,
				configurable: !0
			});
			return e;
		}();
	e.HashObject = n;
})(orange || (orange = {}));

(function (e) {
	var t = Symbol("orange"),
		n = 1;
	e.createHideProperty = function (e) {
		e[t] || Object.defineProperty(e, t, {
			enumerable: !1,
			writable: !1,
			configurable: !1,
			value: {
				uuid: n++
			}
		});
		return e[t];
	};
	e.getHideProperty = function (e) {
		return e[t];
	};
})(orange || (orange = {}));

(function (e) {
	e.getDifference = function (t, n) {
		for (var r = t.history, o = t, i = 0; i < n.length; ++i) {
			var s = n[i];
			if (!(r = "function" == typeof r.get ? r.get(s) : "function" == typeof r.getTime ? r[s].getTime() : r[s])) {
				i != n.length - 1 && e.options.debug && console.warn("orange.getDifference 数据非法", n);
				return o;
			}
			o = "function" == typeof o.get ? o.get(s) : "function" == typeof o.getTime ? o[s].getTime() : o[s];
		}
		return o - r;
	};
	e.getDifferenceMap = function (e, t) {
		"string" == typeof t && (t = [t]);
		for (var n = new Map(), r = function (r) {
			var o = t[r],
				i = e.history.get(o);
			e[o].forEach(function (e, t) {
				var r = i.get(t) || 0;
				e - r != 0 && n.set(t, e - r);
			});
			i.forEach(function (e, t) {
				n.has(t) || n.set(t, -e);
			});
		}, o = 0; o < t.length; ++o) r(o);
		return n;
	};
	e.find = function (n, r) {
		var o = e.GetUtil.getFromGlobal(n),
			i = !1;
		if (o && o instanceof t) {
			o.$search("", r, function (e, t) {
				i = !0;
				console.log("[find] 找到对象:", n + "." + e, t);
			});
			i || console.log("[find] 没有查找到对应结果");
		} else console.log("[find] 类型错误，无法查找");
	};
	var t = function (t) {
		__extends(n, t);

		function n() {
			var e = t.call(this) || this;
			e.properties = Object.getPrototypeOf(e).constructor.properties;
			e.history = new Map();
			return e;
		}
		n.prototype.dispose = function () {
			var e = this;
			this.properties.forEach(function (t, n) {
				var r, o;
				if (1 == t.type) e[n] && e[n].dispose();
				else if (2 == t.type) {
					if (t.classType && e[n]) try {
						for (var i = __values(e[n]), s = i.next(); !s.done; s = i.next()) {
							var a = s.value;
							a && a.dispose();
						}
					} catch (e) {
						r = {
							error: e
						};
					} finally {
							try {
								s && !s.done && (o = i.return) && o.call(i);
							} finally {
								if (r) throw r.error;
							}
						}
				} else 3 == t.type && t.classType && e[n] && e[n].forEach(function (e) {
					e && e.dispose();
				});
			});
		};
		n.prototype.find = function (e) {
			var t = !1;
			this.$search("", e, function (e) {
				t = !0;
				console.log("[find] 找到结果:", e);
			});
			t || console.log("[find] 没有找到对应的结果");
		};
		n.prototype.$search = function (e, t, n) {
			var r = this;
			e += "" == e ? "" : ".";
			this.properties.forEach(function (o, i) {
				var s = e + i;
				0 == o.type ? "function" == typeof t ? t(r[i], s) && n(s, r[i]) : r[i] == t && n(s, r[i]) : 1 == o.type ? r[i] && r[i].$search && r[i].$search(s, t, n) : 2 == o.type ? r[i] && r[i].forEach(function (e, r) {
					var i = s + "[" + r + "]";
					o.classType ? e && e.$search(i, t, n) : "function" == typeof t ? t(e, i) && n(i, e) : e == t && n(i, e);
				}) : 3 == o.type && r[i] && r[i].forEach(function (e, r) {
					var i = s + ".get(" + ("string" == typeof r ? '"' + r + '"' : r) + ")";
					if (o.classType) {
						if (e)
							if (e.$search) e.$search(i, t, n);
							else if ("object" == typeof e)
								for (var a in e) {
									var c = i + "." + a;
									"function" == typeof t ? t(e[a], c) && n(c, e) : e[a] == t && n(c, e[a]);
								}
					} else "function" == typeof t ? t(e, i) && n(i, e) : e == t && n(i, e);
				});
			});
		};
		n.prototype.toJSON = function () {
			var e = this,
				t = {};
			this.properties.forEach(function (n, r) {
				var o, i, s, a;
				0 == n.type && (t[r] = e[r]);
				1 == n.type && (t[r] = e[r].toJSON());
				if (2 == n.type) {
					var c = t[r] = [];
					if (n.classType) try {
						for (var u = __values(e[r]), h = u.next(); !h.done; h = u.next()) {
							p = h.value;
							c.push(p.toJSON());
						}
					} catch (e) {
						s = {
							error: e
						};
					} finally {
							try {
								h && !h.done && (a = u.return) && a.call(u);
							} finally {
								if (s) throw s.error;
							}
						} else try {
							for (var l = __values(e[r]), f = l.next(); !f.done; f = l.next()) {
								var p = f.value;
								c.push(p);
							}
						} catch (e) {
							o = {
								error: e
							};
						} finally {
						try {
							f && !f.done && (i = l.return) && i.call(l);
						} finally {
							if (o) throw o.error;
						}
					}
				} else if (3 == n.type) {
					var d = t[r] = {};
					n.classType ? e[r].forEach(function (e, t) {
						d[t] = e.toJSON();
					}) : e[r].forEach(function (e, t) {
						d[t] = e;
					});
				} else 4 === n.type && (t[r] = e[r].toString());
			});
			return t;
		};
		n.prototype.createProperty = function (e) {
			var t = this.properties.get(e);
			if (1 == t.type) return new t.classType();
			if (2 == t.type) return new Array();
			if (3 == t.type) return new Map();
			if (4 == t.type) return new Date();
			var n = typeof this[e];
			return "string" === n ? "" : "boolean" !== n && 0;
		};
		n.prototype.reset = function () {
			var e, t, n = this.properties;
			try {
				for (var r = __values(n), o = r.next(); !o.done; o = r.next()) {
					var i = __read(o.value, 2),
						s = i[0],
						a = i[1];
					if (0 === a.type || 4 === a.type) this[s] = this.createProperty(s);
					else if (1 === a.type) this[s] && this[s].reset();
					else if (2 === a.type) {
						this[s] || (this[s] = this.createProperty(s));
						this[s] && (this[s].length = 0);
					} else if (3 === a.type) {
						this[s] || (this[s] = this.createProperty(s));
						this[s] && this[s].clear();
					}
				}
			} catch (t) {
				e = {
					error: t
				};
			} finally {
				try {
					o && !o.done && (t = r.return) && t.call(r);
				} finally {
					if (e) throw e.error;
				}
			}
		};
		n.prototype.clone = function () {
			var e, t, n = new (Object.getPrototypeOf(this).constructor)(),
				r = this.properties,
				o = function (e, t) {
					if (0 === t.type) n[e] = i[e];
					else if (1 === t.type) i[e] ? n[e] = i[e].clone() : n[e] = i.createProperty(e);
					else if (2 === t.type) {
						n[e] = i.createProperty(e);
						i[e] && i[e].forEach(function (t) {
							return n[e].push(t);
						});
					} else if (3 === t.type) {
						n[e] = i.createProperty(e);
						i[e] && i[e].forEach(function (t, r) {
							return n[e].set(r, t);
						});
					} else if (4 === t.type) {
						var r = i.createProperty(e);
						r.setTime(i[e].getTime());
						n[e] = r;
					}
				},
				i = this;
			try {
				for (var s = __values(r), a = s.next(); !a.done; a = s.next()) {
					var c = __read(a.value, 2);
					o(c[0], c[1]);
				}
			} catch (t) {
				e = {
					error: t
				};
			} finally {
				try {
					a && !a.done && (t = s.return) && t.call(s);
				} finally {
					if (e) throw e.error;
				}
			}
			return n;
		};
		n.prototype.setValue = function (e) {
			var t = this.properties,
				n = function (n) {
					var o, i, s, a, c = e[n],
						u = t.get(n);
					if (!u) return "continue";
					if (null === c && u.useDefaultValue) {
						2 == u.type ? r[n].length = 0 : 3 == u.type ? r[n].clear() : r[n] = r.createProperty(n);
						return "continue";
					}
					if (0 == u.type) {
						var h = r[n];
						r[n] = c;
						u.recordFlag && r.setHistoryValue(n, h, c);
					} else if (1 == u.type) {
						if (r[n]) {
							var l = r[n]._key_;
							l && c.hasOwnProperty(l) && r[n][l] != c[l] && r[n].reset();
						} else r[n] = r.createProperty(n);
						r[n].setValue(c);
					} else if (2 == u.type) {
						h = r[n];
						if (null == c) r[n] = [];
						else if (u.classType) {
							if (r[n]) try {
								for (var f = (o = void 0, __values(r[n])), p = f.next(); !p.done; p = f.next())(b = p.value) && b.dispose();
							} catch (e) {
								o = {
									error: e
								};
							} finally {
									try {
										p && !p.done && (i = f.return) && i.call(f);
									} finally {
										if (o) throw o.error;
									}
								}
							r[n] = [];
							try {
								for (var d = (s = void 0, __values(c)), y = d.next(); !y.done; y = d.next()) {
									var g = y.value;
									if ((b = new u.classType()).setValue) b.setValue(g);
									else
										for (var v in g) b[v] = c[v];
									r[n].push(b);
								}
							} catch (e) {
								s = {
									error: e
								};
							} finally {
								try {
									y && !y.done && (a = d.return) && a.call(d);
								} finally {
									if (s) throw s.error;
								}
							}
						} else r[n] = c;
						u.recordFlag && r.setHistoryValue(n, h, r[n]);
					} else if (3 == u.type || 5 == u.type) {
						var _, m = r[n];
						if (u.recordFlag) {
							_ = new Map();
							m.forEach(function (e, t) {
								return _.set(t, e);
							});
						}
						if (null == c) m.clear();
						else
							for (var v in c) {
								3 == u.type && (v = ~~v);
								if (null == c[v]) m.delete(v);
								else if (m.has(v)) u.classType ? (b = m.get(v)).setValue(c[v]) : m.set(v, c[v]);
								else if (u.classType) {
									var b;
									(b = new u.classType()).setValue(c[v]);
									m.set(v, b);
								} else m.set(v, c[v]);
							}
						u.recordFlag && r.setHistoryValue(n, _, r[n]);
					} else if (4 === u.type) {
						h = r[n];
						c instanceof Array ? r[n] = new Date(1e3 * c[0] + c[1] / 1e6) : r[n] = new Date(c);
						u.recordFlag && r.setHistoryValue(n, h, r[n]);
					}
				},
				r = this;
			for (var o in e) n(o);
		};
		n.prototype.setHistoryValue = function (e, t, n) {
			this.history.has(e) ? this.history.set(e, t) : this.history.set(e, n);
		};
		n.prototype.setMap = function (e, t, n) {
			var r = this[e];
			n || (n = this.properties.get(e).classType);
			if (null != t)
				for (var o in t) {
					+o + "" === o && (o = +o);
					if (null == t[o]) r.delete(o);
					else if (r.has(o)) n ? (i = r.get(o)).setValue(t[o]) : r.set(o, t[o]);
					else if (n) {
						var i;
						(i = new n()).setValue(t[o]);
						r.set(o, i);
					} else r.set(o, t[o]);
				} else r.clear();
		};
		n.setMap = function (e, t, n) {
			if (null != t)
				for (var r in t) {
					+r + "" === r && (r = +r);
					if (null == t[r]) e.delete(r);
					else if (e.has(r)) n ? (o = e.get(r)).setValue(t[r]) : e.set(r, t[r]);
					else if (n) {
						var o;
						(o = new n()).setValue(t[r]);
						e.set(r, o);
					} else e.set(r, t[r]);
				} else e.clear();
		};
		__decorate([e.watch], n.prototype, "history", void 0);
		return n;
	}(e.HashObject);
	e.DataBase = t;
})(orange || (orange = {}));

(function (e) {
	var t = function (e, t) {
		e.constructor.properties || (e.constructor.properties = new Map());
		var n = e.constructor.properties,
			r = n.get(t);
		if (!r) {
			r = {
				type: 0,
				classType: null,
				key: t,
				recordFlag: !1,
				useDefaultValue: !1
			};
			n.set(t, r);
		}
		return r;
	};
	e.type = function (e, n) {
		return function (r, o) {
			var i = t(r, o);
			i.type = e;
			i.classType = n;
		};
	};
	e.record = function (e) {
		return function (n, r) {
			t(n, r).recordFlag = e;
		};
	};
	e.defaultValue = function (e) {
		return function (n, r) {
			t(n, r).useDefaultValue = e;
		};
	};
	var n = function (e) {
		if (!e.constructor.autoMarked) {
			e.constructor.autoMarked = !0;
			for (var n in e) {
				var r = n.charAt(0);
				if (r && "$" !== r && "_" !== r) {
					var o = e[n],
						i = t(e, n);
					switch (o.constructor) {
						case Number:
						case Boolean:
						case String:
						case Object:
							i.type = 0;
							break;

						case Array:
							i.type = 2;
							break;

						case Map:
							0 === i.type && (i.type = 5);
							break;

						case Date:
							i.type = 4;
							break;

						default:
							i.type = 1;
							i.classType = o.constructor;
					}
				}
			}
		}
	};
	e.autoMark = function () {
		for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
		for (var r = 0; r < e.length; ++r) {
			var o = new e[r]();
			n(o);
		}
	};
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function e() { }
		e.autorunSum = 0;
		e.autorunCount = 0;
		return e;
	}();
	e.Debug = t;
})(orange || (orange = {}));

(function (e) {
	e.whenEquals = function (e, n, r) {
		var o = !1,
			i = t(e, n),
			s = e;
		if (null == i) try {
			i = t(s = new e(), n);
			o = !0;
		} catch (t) {
			s = e;
			i = null;
		}
		if (i && i.set && i.get) {
			var a = i.set;
			i.set = function (t) {
				if ((o || this == e) && t == r) {
					o ? console.warn("[检测到属性改变] ", r, n, e) : console.warn("[检测到属性改变] ", e[n], r, n, e);
					console.warn("[在这一行打断点就可以 debug 了] ");
				}
				a.call(this, t);
			};
			Object.defineProperty(Object.getPrototypeOf(s), n, {
				set: i.set,
				get: i.get,
				enumerable: !0,
				configurable: !0
			});
			console.warn("whenEquals: 点击打断点查看 ⬆");
		} else console.warn("whenEquals 调用失败，没有查到对应的属性：" + n);
	};

	function t(e, t) {
		for (var n = Object.getPrototypeOf(e); n;) {
			var r = Object.getOwnPropertyDescriptor(n, t);
			if (r) return r;
			n = n.__proto__;
		}
		return null;
	}
})(orange || (orange = {}));

(function (e) {
	var t = [];

	function n(e) {
		if (!(t.length > 100)) {
			e.type = void 0;
			e.target = void 0;
			e.data = void 0;
			e.cancel = !1;
			t.push(e);
		}
	}
	var r = function () {
		function e() { }
		e.prototype._on = function (e, t, n, r) {
			var o = this.listeners || (this.listeners = {});
			(o[e] || (o[e] = [])).push({
				type: e,
				listener: t,
				thisObj: n,
				once: r
			});
		};
		e.prototype.on = function (e, t, n) {
			this._on(e, t, n, !1);
		};
		e.prototype.once = function (e, t, n) {
			this._on(e, t, n, !0);
		};
		e.prototype.off = function (e, t, n) {
			var r = this.listeners && this.listeners[e];
			if (r && 0 !== r.length)
				for (var o = r.length; --o >= 0;) {
					var i = r[o];
					i && i.listener === t && i.thisObj === n && (r[o] = null);
				}
		};
		e.prototype.emit = function (e, r) {
			var o = this.listeners && this.listeners[e];
			if (o && 0 !== o.length) {
				for (var i, s = 0; s < o.length; s++) {
					var a = o[s];
					if (a) {
						if (!i) {
							(i = t.pop() || {}).target = a.thisObj;
							i.type = e;
							i.data = r;
						}
						a.once && o.splice(s--, 1);
						a.listener.call(a.thisObj, i);
						if (i.cancel) break;
					} else o.splice(s--, 1);
				}
				i && n(i);
			}
		};
		e.prototype.clear = function (e) {
			e ? delete this.listeners[e] : this.listeners = void 0;
		};
		return e;
	}();
	e.EventEmitter = r;
})(orange || (orange = {}));

(function (e) {
	var t;
	(function (e) {
		e.LX = "lx";
		e.X = "x";
		e.XTM = "xtm";
		e.NULL = "";
	})(t = e.Encoding || (e.Encoding = {}));
	var n = window.XXTEA && new window.XXTEA();
	e.encodeMsg = function (r, o) {
		for (var i = [], s = 2; s < arguments.length; s++) i[s - 2] = arguments[s];
		var a = bon.encode(r, !1);
		switch (o) {
			case t.LX:
				a = e.lz4XorEncode(a);
				break;

			case t.X:
				a = e.xorEncode(a, !1);
				break;

			case t.XTM:
				if (n) {
					var c = n.encryptMod({
						data: a.buffer,
						length: a.byteLength
					});
					return c;
				}
		}
		return a.buffer.slice(0, a.byteLength);
	};
	e.decodeMsg = function (r, o) {
		for (var i = [], s = 2; s < arguments.length; s++) i[s - 2] = arguments[s];
		var a = new Uint8Array(r);
		if (o === t.LX || a.length > 4 && 112 == a[0] && 108 == a[1]) a = e.lz4XorDecode(a);
		else if (o === t.X || a.length > 4 && 112 == a[0] && 120 == a[1]) a = e.xorDecode(a);
		else if ((o === t.XTM || a.length > 3 && 112 == a[0] && 116 == a[1]) && n) {
			var c = n.decryptMod({
				data: a.buffer,
				length: a.byteLength
			});
			a = new Uint8Array(c);
		}
		var u = bon.decode(a);
		return u;
	};
})(orange || (orange = {}));

(function (e) {
	(function (e) {
		e[e.TIMEOUT = -2] = "TIMEOUT";
		e[e.UNKNOWN = -1] = "UNKNOWN";
		e[e.NEED_AUTH = -3] = "NEED_AUTH";
		e[e.AUTH_ERROR = -4] = "AUTH_ERROR";
		e[e.CANCELED = -5] = "CANCELED";
		e[e.SKIP = 6] = "SKIP";
	})(e.ErrorCode || (e.ErrorCode = {}));
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function t() {
			this.encoding = e.Encoding.LX;
		}
		t.prototype.sendAsync = function (t) {
			return __awaiter(this, void 0, void 0, function () {
				var n, r, o, i;
				return __generator(this, function (s) {
					switch (s.label) {
						case 0:
							n = this._url || e.options.url;
							(r = new e.HttpRequest()).responseType = e.HttpResponseType.ARRAY_BUFFER;
							r.setRequestHeader("Content-Type", "application/octet-stream");
							r.setRequestHeader("encoding", this.encoding);
							r.open(n + "/" + t.cmd.replace("_", "/").toLowerCase(), e.HttpMethod.POST);
							o = e.encodeMsg(t.params, this.encoding);
							return [4, r.send(o)];

						case 1:
							s.sent();
							(i = e.decodeMsg(r.response, this.encoding)).decBody = i.body && bon.decode(i.body);
							return [2, i];
					}
				});
			});
		};
		return t;
	}();
	e.HttpDelegate = t;
})(orange || (orange = {}));

(function (e) {
	(function (e) {
		e.GET = "GET";
		e.POST = "POST";
	})(e.HttpMethod || (e.HttpMethod = {}));
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function t() {
			this.timeout = 0;
			this.$responseType = e.HttpResponseType.ARRAY_BUFFER;
			this.$url = "";
			this.$method = "";
		}
		Object.defineProperty(t.prototype, "response", {
			get: function () {
				return this.$xhr ? null != this.$xhr.response ? this.$xhr.response : "text" == this.$responseType ? this.$xhr.responseText : "arraybuffer" == this.$responseType && /msie 9.0/i.test(navigator.userAgent) ? window.convertResponseBodyToText(this.$xhr.responseBody) : null : null;
			},
			enumerable: !1,
			configurable: !0
		});
		Object.defineProperty(t.prototype, "responseType", {
			get: function () {
				return this.$responseType;
			},
			set: function (e) {
				this.$responseType = e;
			},
			enumerable: !1,
			configurable: !0
		});
		Object.defineProperty(t.prototype, "withCredentials", {
			get: function () {
				return this.$withCredentials;
			},
			set: function (e) {
				this.$withCredentials = e;
			},
			enumerable: !1,
			configurable: !0
		});
		t.prototype.open = function (t, n) {
			void 0 === n && (n = e.HttpMethod.GET);
			this.$url = t;
			this.$method = n;
			if (this.$xhr) {
				this.$xhr.abort();
				this.$xhr = null;
			}
			var r = new XMLHttpRequest();
			r.addEventListener("load", this.onload.bind(this));
			r.addEventListener("error", this.onError.bind(this));
			r.ontimeout = this.onError.bind(this);
			r.open(this.$method, this.$url, !0);
			this.$xhr = r;
		};
		t.prototype.send = function (e) {
			var t = this;
			return new Promise(function (n, r) {
				t.resolve = n;
				t.reject = r;
				null != t.$responseType && (t.$xhr.responseType = t.$responseType);
				null != t.$withCredentials && (t.$xhr.withCredentials = t.$withCredentials);
				if (t.headerObj)
					for (var o in t.headerObj) t.$xhr.setRequestHeader(o, t.headerObj[o]);
				t.$xhr.timeout = t.timeout;
				t.$xhr.send(e);
			});
		};
		t.prototype.abort = function () {
			this.$xhr && this.$xhr.abort();
		};
		t.prototype.getAllResponseHeaders = function () {
			return this.$xhr ? this.$xhr.getAllResponseHeaders() || "" : null;
		};
		t.prototype.setRequestHeader = function (e, t) {
			this.headerObj || (this.headerObj = {});
			this.headerObj[e] = t;
		};
		t.prototype.getResponseHeader = function (e) {
			return this.$xhr ? this.$xhr.getResponseHeader(e) || "" : null;
		};
		t.prototype.onload = function () {
			var e = this,
				t = e.$xhr.status >= 400;
			window.setTimeout(function () {
				t ? e.onError() : e.onSuccess();
			}, 0);
		};
		t.prototype.onSuccess = function () {
			if (this.resolve) {
				this.resolve(this.response);
				this.resolve = null;
				this.reject = null;
			}
		};
		t.prototype.onError = function () {
			if (this.reject) {
				this.reject();
				this.reject = null;
				this.resolve = null;
			}
		};
		return t;
	}();
	e.HttpRequest = t;
})(orange || (orange = {}));

(function (e) {
	(function (e) {
		e.TEXT = "text";
		e.ARRAY_BUFFER = "arraybuffer";
	})(e.HttpResponseType || (e.HttpResponseType = {}));
})(orange || (orange = {}));

(function (e) {
	var t, n = window.requestAnimationFrame || function (e) {
		return setTimeout(e, 16);
	};
	(function (e) {
		e[e.Idle = 0] = "Idle";
		e[e.Connecting = 1] = "Connecting";
		e[e.Running = 2] = "Running";
		e[e.Reconnecting = 3] = "Reconnecting";
		e[e.Error = 4] = "Error";
	})(t || (t = {}));
	var r = function () {
		function e() {
			this._arr = [];
			this._idx = 0;
			this.seq = 0;
		}
		Object.defineProperty(e.prototype, "length", {
			get: function () {
				return this._arr.length - this._idx;
			},
			enumerable: !1,
			configurable: !0
		});
		e.prototype.enqueue = function (e) {
			this._arr.push(e);
		};
		e.prototype.dequeue = function () {
			if (!(this._idx >= this._arr.length)) return this._arr[this._idx++];
		};
		e.prototype.confirm = function (e) {
			var t = this._arr.length - this.seq + e - 1;
			t >= this._idx && (t = this._idx - 1);
			if (!(t < 0)) {
				this._arr.splice(0, t + 1);
				this._idx -= t + 1;
			}
		};
		e.prototype.restore = function () {
			this._idx = 0;
		};
		return e;
	}(),
		o = function () {
			function e() {
				this._arr = [];
				this._seq = 0;
			}
			Object.defineProperty(e.prototype, "seq", {
				get: function () {
					return this._seq;
				},
				enumerable: !1,
				configurable: !0
			});
			Object.defineProperty(e.prototype, "length", {
				get: function () {
					return this._arr.length;
				},
				enumerable: !1,
				configurable: !0
			});
			e.prototype.enqueue = function (e) {
				if (~~e.seq > 0) {
					if (e.seq <= this._seq) return;
					if (e.seq > this._seq + 1) throw new Error("over seq: " + e);
					this._seq = e.seq;
				}
				this._arr.push(e);
			};
			e.prototype.dequeue = function () {
				if (0 !== this._arr.length) return this._arr.shift();
			};
			return e;
		}(),
		i = function () {
			function e() {
				this._last = this._now = Date.now();
			}
			e.prototype.update = function () {
				var e = Date.now();
				this._now += Math.min(e - this._last, 100);
				this._last = e;
			};
			Object.defineProperty(e.prototype, "now", {
				get: function () {
					return this._now;
				},
				enumerable: !1,
				configurable: !0
			});
			return e;
		}(),
		s = new ArrayBuffer(1),
		a = function () {
			function a() {
				var r = this;
				this._destroyed = !1;
				this._sendData = {};
				this._sendItemPool = [];
				this.events = new e.EventEmitter();
				window.ws = this;
				this._sm = new e.StateMachine();
				this._sm.registerState({
					state: t.Running,
					enter: function () {
						return r.onRunningEnter();
					},
					update: function () {
						return r.onRunningUpdate();
					}
				});
				this._sm.registerState({
					state: t.Connecting,
					enter: function () {
						return r.onConnectingEnter();
					},
					update: function () {
						return r.onConnectingUpdate();
					}
				});
				this._sm.registerState({
					state: t.Reconnecting,
					enter: function () {
						return r.onReconnectingEnter();
					},
					update: function () {
						return r.onReconnectingUpdate();
					}
				});
				this._sm.registerState({
					state: t.Error,
					enter: function () {
						return r.onErrorEnter();
					}
				});
				this._sm.changeState(t.Idle);
				this._frameTimer = new i();
				this.reset();
				n(function () {
					return r.update();
				});
			}
			Object.defineProperty(a.prototype, "connected", {
				get: function () {
					return this._sm.curState == t.Running;
				},
				enumerable: !1,
				configurable: !0
			});
			a.prototype.resetSendData = function () {
				var e = this._sendData;
				e.ack = void 0;
				e.body = void 0;
				e.c = void 0;
				e.cmd = void 0;
				e.hint = void 0;
				e.seq = void 0;
				e.time = void 0;
				return e;
			};
			a.prototype.reset = function () {
				if (!this._destroyed) {
					this.cleanData();
					this._sm.changeState(t.Idle);
				}
			};
			a.prototype.destroy = function () {
				this._destroyed = !0;
				delete this._connParam.sessId;
				this.cleanData();
				this.events.emit(a.EVENT_CLOSED);
				this.events.clear();
			};
			a.prototype.getAndUseAck = function () {
				var e = this._ack;
				this._ack = 0;
				return e;
			};
			a.prototype.connect = function (n) {
				return __awaiter(this, void 0, void 0, function () {
					var r, o = this;
					return __generator(this, function () {
						if (this._sm.curState != t.Idle) throw new Error("state error");
						this.connectOptions = n;
						this._url = n.url || e.options.url.replace("http://", "ws://").replace("https://", "wss://") + "/agent";
						this._connParam.roleToken = n.token;
						r = new Promise(function (e) {
							o._connResolve = e;
						});
						this._sm.changeStateNextFrame(t.Connecting);
						return [2, r];
					});
				});
			};
			a.prototype.onConnectingEnter = function () {
				e.options.debug && console.debug("~~~~~~~~~onConnectingEnter");
				this.cleanWS();
				this._tryConnectTimeoutTotal = this._frameTimer.now + e.options.rpc.connectTimeoutTotal;
				this._tryConnectTimeoutOnce = -1;
				this._ws = void 0;
				this._connParam.isRestore = 0;
				this._nextTryConnectTime = 1;
				this._tryConnectTimes = 0;
			};
			a.prototype.onConnectingUpdate = function () {
				this.tryConnect();
			};
			a.prototype.tryConnect = function () {
				var n = this,
					r = this._frameTimer.now;
				if (this._tryConnectTimeoutTotal > 0 && r > this._tryConnectTimeoutTotal) {
					this._tryConnectTimeoutTotal = -1;
					this.closeReason = {
						code: e.ErrorCode.TIMEOUT,
						error: "connect timeout"
					};
					this._sm.changeState(t.Error);
				} else {
					if (this._tryConnectTimeoutOnce > 0 && r > this._tryConnectTimeoutOnce) {
						this._tryConnectTimeoutOnce = -1;
						this.cleanWS();
						this._nextTryConnectTime = r + 100;
						this._ws = void 0;
					}
					if (this._nextTryConnectTime > 0 && r > this._nextTryConnectTime) {
						this._tryConnectTimes++;
						this._nextTryConnectTime = -1;
						this._tryConnectTimeoutOnce = r + e.options.rpc.connectTimeoutOnce;
						this.cleanWS();
						this._connParam.connId = Date.now();
						var o = JSON.stringify(this._connParam),
							i = this._url + "?p=" + encodeURIComponent(o) + "&e=" + this.connectOptions.encoding,
							s = this._tryConnectTimes < 2 && window.kcpconn,
							a = s && new window.kcpconn.KcpConnection(i) || new WebSocket(i);
						e.options.debug && console.log("use " + (s ? "kcp" : "ws"));
						this._ws = a;
						a.binaryType = "arraybuffer";
						a.onopen = function () {
							n._sm.changeState(t.Running);
						};
						a.onclose = a.onerror = function () {
							n._nextTryConnectTime = r + 100;
						};
						a.onmessage = function (e) {
							n.addResp(e.data);
						};
					}
				}
			};
			a.prototype.send = function (n) {
				if (!this._destroyed && this._sm.curState != t.Error) {
					var r = this.resetSendData();
					r.ack = this.getAndUseAck();
					r.body = bon.encode(n.params);
					r.c = n.c;
					r.cmd = n.cmd;
					r.hint = n.hint;
					r.seq = ++this._sndQueue.seq;
					r.time = Date.now();
					e.options.debug && console.debug("%c>>>> ws send: " + JSON.stringify(r), "color:#00af00;font-weight:bold;");
					var o = e.encodeMsg(r, this.connectOptions.encoding),
						i = this._sndQueue;
					i.enqueue(o);
					this._sm.curState === t.Running && 1 == this._sndQueue.length && this.doSend(i.dequeue());
					return r;
				}
			};
			a.prototype.newSendItem = function () {
				return this._sendItemPool.pop() || {};
			};
			a.prototype.freeSendItem = function (e) {
				var t = this._sendItemPool;
				if (!(t.length > 60)) {
					e.resolve = void 0;
					t.push(e);
				}
			};
			a.prototype.sendAsync = function (t) {
				var n = this.send(t);
				if (!n) return Promise.resolve({
					code: e.ErrorCode.CANCELED,
					error: "offline"
				});
				var r = this.newSendItem();
				r.cmd = n.cmd;
				r.seq = n.seq;
				var o = new Promise(function (e) {
					return r.resolve = e;
				});
				this._asyncList.push(r);
				return o;
			};
			a.prototype.update = function () {
				var e = this;
				if (!this._destroyed) {
					this._frameTimer.update();
					this._sm.update();
					n(function () {
						return e.update();
					});
				}
			};
			a.prototype.resetHeartbeatTime = function () {
				var t = Date.now();
				this._nextHeartbeatTime = t + e.options.rpc.heartbeatInterval;
			};
			a.prototype.resetConnectionTimeout = function () {
				var t = this._frameTimer.now;
				this._connectionTimeout = t + e.options.rpc.heartbeatTimeout;
			};
			a.prototype.onRunningEnter = function () {
				var n = this;
				e.options.debug && console.debug("~~~~~~~~~onRunningEnter");
				if (this._connResolve) {
					this._connResolve(!0);
					this._connResolve = void 0;
				}
				this._sndQueue.restore();
				this.resetHeartbeatTime();
				this.resetConnectionTimeout();
				var r = this._ws;
				r.onmessage = function (e) {
					r === n._ws && n.addResp(e.data);
				};
				r.onerror = r.onclose = function () {
					r === n._ws && n._sm.changeStateNextFrame(t.Reconnecting);
				};
			};
			a.prototype.addResp = function (n) {
				this.resetConnectionTimeout();
				try {
					if (n.byteLength <= 1) return;
					var r = e.decodeMsg(n, this.connectOptions.encoding);
					~~r.ack > 0 && this._sndQueue.confirm(~~r.ack);
					r.seq && (this._ack = r.seq);
					switch (r.cmd) {
						case "_sys/ack":
							return;

						case "_sys/error":
							if (r.error) console.error(r.error);
							else try {
								console.error(bon.decode(r.body));
							} catch (e) { }
							this._sm.changeStateNextFrame(t.Reconnecting);
							return;

						case "_sys/fatal":
							if (r.error) console.error(r.error);
							else try {
								console.error(bon.decode(r.body));
							} catch (e) { }
							this.closeReason = r;
							this._sm.changeState(t.Error);
							return;

						default:
							var o = this._recQueue;
							o.enqueue(r);
							1 == o.length && this.doReceive(o.dequeue());
							return;
					}
				} catch (n) {
					e.options.debug && console.error(n);
					this._sm.changeStateNextFrame(t.Reconnecting);
				}
			};
			a.prototype.onRunningUpdate = function () {
				var e = Date.now(),
					n = this._sm;
				if (this._frameTimer.now > this._connectionTimeout) n.changeStateNextFrame(t.Reconnecting);
				else {
					e > this._nextHeartbeatTime && this.sendHeartbeat();
					for (; this._sndQueue.length > 0 && void 0 === n.nextState;) this.doSend(this._sndQueue.dequeue());
					for (; this._recQueue.length > 0 && void 0 === n.nextState;) {
						var r = this._recQueue.dequeue();
						this.doReceive(r);
					}
				}
			};
			a.prototype.sendHeartbeat = function () {
				this.resetHeartbeatTime();
				var t = this.getAndUseAck();
				e.options.debug && console.debug("~~~~~~~~~sendHeartbeat", t);
				if (0 == t) this.doSend(s);
				else {
					var n = this.resetSendData();
					n.ack = t;
					n.cmd = "_sys/ack";
					n.time = Date.now();
					this.doSend(e.encodeMsg(n, this.connectOptions.encoding));
				}
			};
			a.prototype.doSend = function (e) {
				var n = this._ws,
					r = this._sm;
				if (1 == n.readyState) try {
					n.send(e);
				} catch (e) {
					r.changeStateNextFrame(t.Reconnecting);
					console.error(e);
				} else r.changeStateNextFrame(t.Reconnecting);
			};
			a.prototype.doReceive = function (n) {
				var r = this._sm;
				try {
					n.decBody = n.body && bon.decode(n.body);
					n.body = void 0;
					n.code = ~~n.code;
					e.options.debug && console.debug("%c<<<< ws recieve: " + JSON.stringify(n), "color:#00afaf;font-weight:bold;");
					this.events.emit(n.cmd, n);
					this.events.emit(a.EVENT_MSG, n);
					if (~~n.resp > 0)
						for (var o = this._asyncList; o.length > 0;) {
							var i = o[0];
							if (n.resp === i.seq) {
								i.resolve(n);
								o.splice(0, 1);
								this.freeSendItem(i);
								break;
							}
							if (n.resp < i.seq) break;
							if (n.resp > i.seq) {
								e.options.debug && console.warn(i.cmd + " has no response, use send instead");
								i.resolve({
									code: e.ErrorCode.SKIP
								});
								o.splice(0, 1);
								this.freeSendItem(i);
							}
						}
					if (n.code < 0) {
						this.closeReason = n;
						r.changeStateNextFrame(t.Error);
						return;
					}
				} catch (n) {
					console.error(n);
					this.closeReason = {
						code: e.ErrorCode.UNKNOWN,
						error: n
					};
					r.changeStateNextFrame(t.Error);
				}
			};
			a.prototype.onReconnectingEnter = function () {
				e.options.debug && console.debug("~~~~~~~~~onReconnectingEnter");
				this.cleanWS();
				this._tryConnectTimeoutTotal = this._frameTimer.now + e.options.rpc.connectTimeoutTotal;
				this._tryConnectTimeoutOnce = -1;
				this._connParam.isRestore = 1;
				this._nextTryConnectTime = 1;
				this._tryConnectTimes = 0;
			};
			a.prototype.onReconnectingUpdate = function () {
				this.tryConnect();
			};
			a.prototype.cleanWS = function () {
				if (this._ws) {
					this._ws.onerror = this._ws.onclose = this._ws.onmessage = this._ws.onopen = void 0;
					this._ws.close();
					this._ws = void 0;
				}
			};
			a.prototype.cleanData = function () {
				this.cleanWS();
				if (this._connResolve) {
					this._connResolve(!1);
					this._connResolve = void 0;
				}
				this._sndQueue = new r();
				this._asyncList && this._asyncList.forEach(function (t) {
					t.resolve({
						code: e.ErrorCode.CANCELED
					});
				});
				this._asyncList = [];
				this._recQueue = new o();
				this._connParam = {
					roleToken: "",
					sessId: 100 * Date.now() + ~~(100 * Math.random()),
					connId: 0,
					isRestore: 0
				};
				this._ack = 0;
			};
			a.prototype.onErrorEnter = function () {
				e.options.debug && console.debug("~~~~~~~~~onErrorEnter");
				this.cleanData();
				this.events.emit(a.EVENT_CLOSED, this.closeReason);
				this.closeReason = void 0;
			};
			a.EVENT_CLOSED = "e_closed";
			a.EVENT_MSG = "e_msg";
			return a;
		}();
	e.WebSocketClient = a;
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function t() {
			this.events = new e.EventEmitter();
			this.root = null;
			this.syncCommands = {
				RespSync: !0
			};
			this.syncAllCommand = !0;
		}
		t.prototype.connect = function (n) {
			return __awaiter(this, void 0, void 0, function () {
				var r = this;
				return __generator(this, function () {
					this.close();
					this.socket = new e.WebSocketClient();
					this.socket.events.on(e.WebSocketClient.EVENT_MSG, this.onReceiveMsg, this);
					this.socket.events.once(e.WebSocketClient.EVENT_CLOSED, function (e) {
						r.events.emit(t.EVENT_CLOSED, e.data);
					});
					return [2, this.socket.connect(n)];
				});
			});
		};
		Object.defineProperty(t.prototype, "connected", {
			get: function () {
				return this.socket && this.socket.connected;
			},
			enumerable: !1,
			configurable: !0
		});
		t.prototype.close = function () {
			if (this.socket) {
				this.socket.destroy();
				this.socket = null;
			}
		};
		t.prototype.send = function (e) {
			this.socket.send(e);
		};
		t.prototype.sendAsync = function (e) {
			return this.socket.sendAsync(e);
		};
		t.prototype.addSyncCommand = function (e) {
			this.syncCommands[e] = !0;
		};
		t.prototype.onReceiveMsg = function (n) {
			var r = n.data;
			r.time && (e.TimeUtil.serverTime = r.time);
			if (this.syncAllCommand || this.syncCommands[r.cmd])
				for (var o in r.decBody)
					if (this.root[o]) {
						var i = this.root[o]._key_;
						i && r.decBody[o].hasOwnProperty(i) && r.decBody[o][i] != this.root[o][i] && this.root[o].reset();
						this.root[o].setValue(r.decBody[o]);
					}
			this.events.emit(r.cmd, r);
			this.events.emit(t.EVENT_MSG, r);
		};
		t.EVENT_CLOSED = e.WebSocketClient.EVENT_CLOSED;
		t.EVENT_MSG = e.WebSocketClient.EVENT_MSG;
		__decorate([e.modify], t.prototype, "onReceiveMsg", null);
		return t;
	}();
	e.WebSocketDelegate = t;
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function e() { }
		e.getFromGlobal = function (e, t) {
			for (var n = e.split("."), r = t || window, o = 0; o < n.length; o++)
				if (null == (r = r[n[o]])) return r;
			return r;
		};
		e.setFromGlobal = function (t, n, r) {
			for (var o = t.split("."), i = r || window, s = 0; s < o.length; s++)
				if (s == o.length - 1) {
					i[o[s]] = n;
					e.watchs.has(t) && e.watchs.get(t).forEach(function (e) {
						return e(n);
					});
				} else {
					i[o[s]] || (i[o[s]] = {});
					i = i[o[s]];
				}
			return i;
		};
		e.watchFromGlobal = function (t, n) {
			e.watchs.has(t) || e.watchs.set(t, []);
			e.watchs.get(t).push(n);
			n(e.getFromGlobal(t));
			return function () {
				e.watchs.get(t).splice(e.watchs.get(t).indexOf(n), 1);
			};
		};
		e.watchs = new Map();
		return e;
	}();
	e.GetUtil = t;
})(orange || (orange = {}));

(function (e) {
	var t = 131;

	function n(e) {
		for (var n = 0, r = 0; r < e.length; r++) n = ~~(n * t + e[r]);
		return 2147483647 & n;
	}
	e.bkdrHash = n;
	e.bkdrHashStr = function (e) {
		var t = new bon.DataWriter();
		t.writeUTFBytes(e);
		return n(t.getBytes(!1));
	};
	e.bkdrHashStrFast = function (e) {
		return n(e.split("").map(function (e) {
			return e.codePointAt(0);
		}));
	};
})(orange || (orange = {}));

(function (e) {
	e.lz4XorEncode = function (e) {
		e = lz4.compress(e);
		for (var t = 2 + ~~(248 * Math.random()), n = Math.min(e.length, 100); --n >= 0;) e[n] ^= t;
		e[0] = 112;
		e[1] = 108;
		e[2] = 170 & e[2] | (t >> 7 & 1) << 6 | (t >> 6 & 1) << 4 | (t >> 5 & 1) << 2 | (t >> 4 & 1) << 0;
		e[3] = 170 & e[3] | (t >> 3 & 1) << 6 | (t >> 2 & 1) << 4 | (t >> 1 & 1) << 2 | (t >> 0 & 1) << 0;
		return e;
	};
	e.lz4XorDecode = function (e) {
		for (var t = (e[2] >> 6 & 1) << 7 | (e[2] >> 4 & 1) << 6 | (e[2] >> 2 & 1) << 5 | (e[2] >> 0 & 1) << 4 | (e[3] >> 6 & 1) << 3 | (e[3] >> 4 & 1) << 2 | (e[3] >> 2 & 1) << 1 | (e[3] >> 0 & 1) << 0, n = Math.min(100, e.length); --n >= 2;) e[n] ^= t;
		e[0] = 4;
		e[1] = 34;
		e[2] = 77;
		e[3] = 24;
		return lz4.decompress(e);
	};
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function e() {
			this.states = {};
			this.nextState = void 0;
		}
		e.prototype.register = function (e, t, n, r) {
			this.registerState({
				state: e,
				enter: t,
				exit: n,
				update: r
			});
		};
		e.prototype.registerState = function (e) {
			this.states[e.state] = e;
		};
		e.prototype.changeStateNextFrame = function (e) {
			this.nextState = e;
		};
		e.prototype.changeState = function (e) {
			this.state && this.state.exit && this.state.exit();
			this.preState = this.curState;
			this.curState = e;
			this.state = this.states[e];
			this.firstUpdate = !0;
			this.state && this.state.enter && this.state.enter();
		};
		e.prototype.update = function () {
			if (void 0 !== this.nextState) {
				this.changeState(this.nextState);
				this.nextState = void 0;
			}
			this.state && this.state.update && this.state.update();
			this.firstUpdate = !1;
		};
		return e;
	}();
	e.StateMachine = t;
})(orange || (orange = {}));

(function (e) {
	var t = function () {
		function e() { }
		e.encodeUTF8 = function (e) {
			for (var t, n = [], r = 0; r < e.length; r++)
				if ((t = e.charCodeAt(r)) < 128) n.push(t);
				else if (t < 2048) {
					n.push(Math.floor(t / 64) + 128 + 64);
					n.push(t % 64 + 128);
				} else if (t < 65536) {
					n.push(Math.floor(t / 4096) + 128 + 64 + 32);
					n.push(Math.floor(t % 4096 / 64) + 128);
					n.push(t % 64 + 128);
				} else {
					n.push(Math.floor(t / 262144) + 128 + 64 + 32 + 16);
					n.push(Math.floor(t % 262144 / 4096) + 128);
					n.push(Math.floor(t % 4096 / 64) + 128);
					n.push(t % 64 + 128);
				}
			return n;
		};
		e.decodeUTF8 = function (e) {
			if (!(e instanceof Array)) {
				for (var t = [], n = 0, r = e.length; n < r; n++) t[n] = e[n];
				e = t;
			}
			for (var o = 0; o < e.length; o++) e[o] < 0 && (e[o] += 256);
			var i = [];
			for (o = 0; o < e.length && 0 != e[o]; o++)
				if (0 == (128 & e[o])) i.push(e[o]);
				else if (0 == (64 & e[o])) i.push(e[o] % 128);
				else if (0 == (32 & e[o])) {
					i.push(e[o] % 32 * 64 + e[o + 1] % 64);
					o++;
				} else if (0 == (16 & e[o])) {
					i.push(e[o] % 16 * 4096 + e[o + 1] % 64 * 64 + e[o + 2] % 64);
					o++;
					o++;
				} else if (0 == (8 & e[o])) {
					i.push(e[o] % 8 * 262144 + e[o + 1] % 64 * 4096 + e[o + 2] % 64 * 64 + e[o + 2] % 64);
					o++;
					o++;
					o++;
				}
			var s = "";
			for (o = 0; o < i.length; o++) s += String.fromCharCode(i[o]);
			return s;
		};
		e.replace = function (t, n, r, o) {
			void 0 === o && (o = !1);
			for (var i = 0; i < t.length; i++)
				if (e.hasStringAt(t, [n], i)) {
					t = t.slice(0, i) + r + t.slice(i + n.length, t.length);
					o || (i -= r.length - n.length);
				}
			return t;
		};
		e.hasStringAt = function (e, t, n) {
			for (var r = 0; r < t.length; r++) {
				var o = t[r];
				if (e.length - n >= o.length && e.slice(n, n + o.length) == o) return !0;
			}
			return !1;
		};
		e.tableToString = function (t, n) {
			void 0 === n && (n = 4);
			for (var r = "", o = [], i = 0; i < t.length; i++)
				for (var s = 0; s < t[i].length; s++) {
					t[i][s] = "" + t[i][s];
					o[s] ? e.getLength(t[i][s]) > o[s] && (o[s] = e.getLength(t[i][s])) : o[s] = e.getLength(t[i][s]);
				}
			for (i = 0; i < t.length; i++) {
				for (s = 0; s < t[i].length; s++) {
					r += t[i][s];
					for (var a = 0; a < n + o[s] - e.getLength(t[i][s]); a++) r += " ";
				}
				i < t.length - 1 && (r += "\n");
			}
			return r;
		};
		e.getLength = function (e) {
			for (var t = 0, n = 0; n < e.length; n++) e.charCodeAt(n) < 256 ? t++ : t += 2;
			return t;
		};
		return e;
	}();
	e.StringUtil = t;
})(orange || (orange = {}));

(function (e) {
	e.sleep = function (e) {
		return new Promise(function (t) {
			setTimeout(t, e);
		});
	};
	var t = 0,
		n = 0,
		r = !1,
		o = function () {
			function o() { }
			Object.defineProperty(o, "serverTime", {
				get: function () {
					return o.syncServerTime + Date.now() - t;
				},
				set: function (e) {
					if (!r) {
						r = !0;
						setInterval(function () {
							n += 1e3;
							Math.abs(n - o.serverTime) < 2e3 && (n = o.syncServerTime);
						}, 1e3);
					}
					var i = o.serverTime;
					if (!(e < i && i - e < 1e3)) {
						o.syncServerTime = e;
						t = Date.now();
						n = e;
					}
				},
				enumerable: !1,
				configurable: !0
			});
			Object.defineProperty(o, "serverTimeIsValid", {
				get: function () {
					return o.syncServerTime > 0 && Math.abs(n - o.serverTime) < 1e4;
				},
				enumerable: !1,
				configurable: !0
			});
			o.isServerTimeValidate = function () {
				return o.serverTimeIsValid;
			};
			o.syncServerTime = 0;
			__decorate([e.watch], o, "syncServerTime", void 0);
			__decorate([e.calculate], o, "serverTime", null);
			return o;
		}();
	e.TimeUtil = o;
})(orange || (orange = {}));

(function (e) {
	var t = new Uint8Array(524288);
	e.xorEncode = function (e, n) {
		void 0 === n && (n = !0);
		var r = ~~(4294967295 * Math.random()),
			o = e.byteLength + 4;
		t.byteLength < o && (t = new Uint8Array(o));
		var i = t.subarray(0, o);
		i[0] = 255 & r;
		i[1] = r >> 8 & 255;
		i[2] = r >> 16 & 255;
		i[3] = r >> 24 & 255;
		i.set(e, 4);
		for (var s = 2 + ~~(248 * Math.random()), a = i.length; --a >= 0;) i[a] ^= s;
		i[0] = 112;
		i[1] = 120;
		i[2] = 170 & i[2] | (s >> 7 & 1) << 6 | (s >> 6 & 1) << 4 | (s >> 5 & 1) << 2 | (s >> 4 & 1) << 0;
		i[3] = 170 & i[3] | (s >> 3 & 1) << 6 | (s >> 2 & 1) << 4 | (s >> 1 & 1) << 2 | (s >> 0 & 1) << 0;
		return n ? i.slice() : i;
	};
	e.xorDecode = function (e) {
		for (var t = (e[2] >> 6 & 1) << 7 | (e[2] >> 4 & 1) << 6 | (e[2] >> 2 & 1) << 5 | (e[2] >> 0 & 1) << 4 | (e[3] >> 6 & 1) << 3 | (e[3] >> 4 & 1) << 2 | (e[3] >> 2 & 1) << 1 | (e[3] >> 0 & 1) << 0, n = e.length; --n >= 4;) e[n] ^= t;
		return e.subarray(4);
	};
})(orange || (orange = {}));