import Gustulus from './gustulus';

type Optanda<T> = {
  valor?: T,
  nuntium: Gustulus;
};

export default class Nuntiator<T> {
  readonly valor?: T;
  readonly nuntium: Gustulus;

  constructor (optanda: Optanda<T>) {
    this.valor = optanda.valor;
    this.nuntium = optanda.nuntium;
  }

  successum (): boolean {
    return this.valor ? true : false;
  }
}
