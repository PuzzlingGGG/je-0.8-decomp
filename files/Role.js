"use strict";

const i = e("../i18n/i18nMgr");
class n {
  constructor() {
    this.role = null;
    this.gameSlotUnlockLvls = [];
    this.goodsSlotUnlockLvls = [];
  }
  static get Ins() {
    this.ins || (this.ins = new n());
    return this.ins;
  }
  init(e) {
    this.role = e;
    e.userIntro = e.userIntro || i.I18nMgr.getI18nStringByZh("这个家伙很懒，什么东西也没有留下");
  }
  get userName() {
    return this.role.userName;
  }
  get userImg() {
    return this.role.userImg;
  }
  get userIntro() {
    return this.role.userIntro;
  }
  set userName(e) {
    this.role.userName = e;
  }
  set userImg(e) {
    this.role.userImg = e;
  }
  set userIntro(e) {
    this.role.userIntro = e;
  }
}
exports.default = n;
n.UserInfoChange = "UserInfoChange";
n.UserImgChange = "UserImgChange";