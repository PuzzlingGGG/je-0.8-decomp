"use strict";

exports.GSCmdDialogue = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GSRunnerMng"),
  s = e("../GSVariableMng");
exports.GSCmdDialogue = class {
  constructor() {}
  setParam(e) {
    this._showData = {
      lines: []
    };
    if (e) for (let t of e) {
      let e = {
        str: t.dialogue,
        actorConfId: t.actorConfId,
        items: []
      };
      this._showData.lines.push(e);
    }
  }
  excute() {
    let e = a.GSRunnerMng.instance.getRunner(this.runnerId);
    e && e.log(">>call game script dialogue command!play dialogue..");
    if (this._showData.lines.length > 0) {
      this._isComplete = !1;
      let e = i.default.ins.findScene(n.default);
      e && e.showDialog(this._showData, null, () => {
        this._isComplete = !0;
      });
    } else this._isComplete = !0;
  }
  setp() {}
  isComplete() {
    return this._isComplete;
  }
  static parseDialogue(e) {
    let t = [];
    t.push(e);
    let o = e.indexOf("#{");
    for (; o >= 0;) {
      t.pop();
      t.push(e.substr(0, o));
      o += 2;
      let i = e.indexOf("}", o);
      if (i > o) {
        let n = e.substr(o, i - o),
          a = s.GSVariableMng.instance.getVariableByName(n);
        a && t.push(a.getValue().getValue());
        o = i + 1;
      }
      t.push(e.substr(o, e.length - o));
      o = e.indexOf("#{", o);
    }
    return t.join("");
  }
};