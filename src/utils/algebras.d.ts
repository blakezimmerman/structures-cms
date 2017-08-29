interface Functor<T> {
  map: (f: Function) => Functor<T>
  fold: (f: Function, g?: Function) => T
  inspect: () => string
  toString: () => string
}

interface Monad<T> extends Functor<T> {
  map: (f: Function) => Monad<T>
  chain: (f: Function) => T
}

export { Functor, Monad };
