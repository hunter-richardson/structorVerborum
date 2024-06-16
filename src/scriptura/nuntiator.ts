import Gustularium from './gustularium';

type Optanda<T> = {
  valor?: T,
  nuntium: Gustularium;
};

export default class Nuntiator<T> {
  readonly valor?: T;
  readonly nuntium: Gustularium;

  constructor (optanda: Optanda<T>) {
    this.valor = optanda.valor;
    this.nuntium = optanda.nuntium;
  }

  successum (): boolean {
    return this.valor ? true : false;
  }
}
