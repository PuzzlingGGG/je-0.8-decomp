var cocosExtend;

(function(n) {
n.render = function(n, o, c) {
orange.autorunExtend(n, o, function(n, o, c) {
if (!(n instanceof cc.Component)) throw "render 只能修饰组件对象(cc.Component)";
var t = n.onEnable;
n.onEnable = function() {
t && t.call(this);
o();
};
var e = n.onDisable;
n.onDisable = function() {
e && e.call(this);
c();
};
});
return c;
};
})(cocosExtend || (cocosExtend = {}));

try {
window.cocosExtend = cocosExtend;
window.orange.cocos = cocosExtend;
} catch (n) {}