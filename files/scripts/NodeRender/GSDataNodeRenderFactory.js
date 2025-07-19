"use strict";

exports.GSDataNodeRenderFactory = void 0;
const i = e("../../../GameScript/index"),
  n = e("./GSDataNodeRenderAdd"),
  a = e("./GSDataNodeRenderBagItem"),
  s = e("./GSDataNodeRenderCameraShake"),
  r = e("./GSDataNodeRenderChangeActProperty"),
  l = e("./GSDataNodeRenderChangeHeroProperty"),
  c = e("./GSDataNodeRenderChangeVariable"),
  d = e("./GSDataNodeRenderDialogue"),
  h = e("./GSDataNodeRenderDropItem"),
  p = e("./GSDataNodeRenderFlowIf"),
  u = e("./GSDataNodeRenderFlowIfElse"),
  m = e("./GSDataNodeRenderFlowWait"),
  f = e("./GSDataNodeRenderShowGameOver"),
  g = e("./GSDataNodeRenderShowGameWin"),
  y = e("./GSDataNodeRenderStart"),
  v = e("./GSDataNodeRenderSwitchHero"),
  C = e("./GSDataNodeRenderSwitchWorld"),
  _ = e("./GSDataNodeRenderTimeCountDownStart"),
  S = e("./GSDataNodeRenderTimeCountDownStop");
class I {
  constructor() {
    this._renderInsMap = new Map();
  }
  static get instance() {
    this._instance || (this._instance = new I());
    return this._instance;
  }
  GetRender(e) {
    let t = null;
    switch (e) {
      case i.GSDataNodeType.G_Start:
        t = new y.GSDataNodeRenderStart();
        break;
      case i.GSDataNodeType.G_Add:
        t = new n.GSDataNodeRenderAdd();
        break;
      case i.GSDataNodeType.GFLOW_If:
        t = new p.GSDataNodeRenderFlowIf();
        break;
      case i.GSDataNodeType.GFLOW_IfElse:
        t = new u.GSDataNodeRenderFlowIfElse();
        break;
      case i.GSDataNodeType.GFLOW_WAIT:
        t = new m.GSDataNodeRenderFlowWait();
        break;
      case i.GSDataNodeType.GINTERACTION_Dialog:
        t = new d.GSDataNodeRenderDialogue();
        break;
      case i.GSDataNodeType.GDATA_DropItem:
        t = new h.GSDataNodeRenderDropItem();
        break;
      case i.GSDataNodeType.GDATA_ChangeBagItem:
        t = new a.GSDataNodeRenderBagItem();
        break;
      case i.GSDataNodeType.GDATA_ChangeVariable:
        t = new c.GSDataNodeRenderChangeVariable();
        break;
      case i.GSDataNodeType.GDATA_ChangeActorProperty:
        t = new r.GSDataNodeRenderChangeActProperty();
        break;
      case i.GSDataNodeType.GDATA_ChangeHeroProperty:
        t = new l.GSDataNodeRenderChangeHeroProperty();
        break;
      case i.GSDataNodeType.GSYS_ShowGameWin:
        t = new g.GSDataNodeRenderShowGameWin();
        break;
      case i.GSDataNodeType.GSYS_ShowGameOver:
        t = new f.GSDataNodeRenderShowGameOver();
        break;
      case i.GSDataNodeType.GSYS_SwitchMap:
        t = new C.GSDataNodeRenderSwitchWorld();
        break;
      case i.GSDataNodeType.GSYS_SwitchHero:
        t = new v.GSDataNodeRenderSwitchHero();
        break;
      case i.GSDataNodeType.GSYS_TimeCountDownStart:
        t = new _.GSDataNodeRenderTimeCountDownStart();
        break;
      case i.GSDataNodeType.GSYS_TimeCountDownStop:
        t = new S.GSDataNodeRenderTimeCountDownStop();
        break;
      case i.GSDataNodeType.GSCREEN_CameraShake:
        t = new s.GSDataNodeRenderCameraShake();
        break;
      case i.GSDataNodeType.GSOUND_PlaySfx:
    }
    return t;
  }
}
exports.GSDataNodeRenderFactory = I;