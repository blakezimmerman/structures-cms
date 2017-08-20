import { Monad } from './algebras';

interface Either<T> extends Monad<T> {
  fold: (f: Function, g: Function) => T
}

const Box = (x: any): Monad<any> => ({
  map: (f: Function) => Box(f(x)),
  chain: (f: Function) => f(x),
  fold: (f: Function) => f(x),
  inspect: () => `Box(${x})`,
  toString: () => `Box(${x})`
});

const Right = (x: any): Either<any> => ({
  chain: (f: Function) => f(x),
  map: (f: Function) => Right(f(x)),
  fold: (f: Function, g: Function) => g(x),
  inspect: () => `Right(${x})`,
  toString: () => `Right(${x})`
});

const Left = (x: any): Either<any> => ({
  chain: (f: Function) => Left(x),
  map: (f: Function) => Left(x),
  fold: (f: Function, g: Function) => f(x),
  inspect: () => `Left(${x})`,
  toString: () => `Left(${x})`
});

export { Box, Either, Right, Left };
