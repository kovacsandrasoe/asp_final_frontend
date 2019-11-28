export class Word {
  public Id: number;
  public homeWord: string;
  public foreignWord: string;

  constructor(a: string, b: string) {
    this.homeWord = a;
    this.foreignWord = b;
  }

}
