import Gustulus from './gustulus';

export default class Nuntiator<T> {
  public valor?: T
  public nuntium!: Gustulus

  successum(): boolean { return !!this.valor }
}
