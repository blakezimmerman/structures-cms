import { Semigroup } from './algebras';
import { Either, Right, Left } from './monads';
import { Flatten } from './monoids';

const fold = (Monoid: (x: any) => Semigroup<any>, list: Array<any>) =>
  list
    .map(x => Monoid(x))
    .reduce((x, y) => x.concat(y), Monoid.prototype.identity)
    .val;

const flatFold = (Monoid: (x: any) => Semigroup<any>, list: Array<any>) =>
  fold(Monoid, fold(Flatten, list));

const flatMap = (f: Function, list: Array<any>) =>
  fold(Flatten, list).map(f);

const fromNullable = (x: any): Either<any> =>
  x != null ? Right(x) : Left(null);

const tryCatch = (f: Function): Either<any> => {
  try {
    return Right(f());
  } catch(e) {
    return Left(e);
  }
};

export { fold, flatFold, flatMap, fromNullable, tryCatch };
