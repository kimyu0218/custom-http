export default class StringBuilder {
  private result: string;

  constructor(str: string) {
    this.result = str;
  }

  add(str: string): StringBuilder {
    this.result += str;
    return this;
  }

  build(): string {
    return this.result;
  }
}
