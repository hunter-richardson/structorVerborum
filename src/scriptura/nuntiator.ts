import Gustulus from './gustulus.ts';

export default class Nuntiator<T> {
  public valor?: T
  public nuntium!: Gustulus

  successum(): boolean { return !!this.valor }
}
