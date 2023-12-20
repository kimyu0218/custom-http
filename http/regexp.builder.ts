export default class RegExpBuilder {
  private regExp: string;
  private flag?: string;

  constructor(exp: string) {
    this.regExp = exp;
  }

  add(exp: string): RegExpBuilder {
    this.regExp += exp;
    return this;
  }

  build(): RegExp {
    return this.flag ? new RegExp(this.regExp, this.flag) : new RegExp(this.regExp);
  }

  setFlags(flag: string): RegExpBuilder {
    this.flag = flag;
    return this;
  }
}
