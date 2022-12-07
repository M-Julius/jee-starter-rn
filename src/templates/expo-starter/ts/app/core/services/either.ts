export default class Either<T, R> {
  right?: T;

  left?: R;

  constructor({right, left}:{right?: T, left?: R}) {
    this.right = right;
    this.left = left;
  }

  get isLeft() {
    return this.left !== undefined;
  }

  get isRight() {
    return this.right !== undefined;
  }

  mapLeft<R2>(transformer: (left: R) => R2): Either<T, R2> {
    if (this.isLeft) return new Either({left: transformer(this.left!)});
    return new Either({right: this.right});
  }

  mapRight<T2>(transformer: (right: T) => T2): Either<T2, R> {
    if (this.isRight) return new Either({right: transformer(this.right!)});
    return new Either({left: this.left});
  }
}
