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

const colorLuminance = (hex: string, lum: number) => {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  let rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
};

export { fold, flatFold, flatMap, fromNullable, tryCatch, colorLuminance };
