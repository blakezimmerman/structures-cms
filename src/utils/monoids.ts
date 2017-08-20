import { Semigroup } from './algebras';
import { fold } from './functions';

// Sum Monoid
const Sum = (x: any): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) =>
    Sum(x + y.val),
  inspect: () => `Sum(${x})`,
  toString: () => `Sum(${x})`
});

Sum.prototype.identity = Sum(0);

// Product Monoid
const Product = (x: any): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) =>
    Product(x * y.val),
  inspect: () => `Product(${x})`,
  toString: () => `Product(${x})`
});

Product.prototype.identity = Product(1);

// Max Monoid
const Max = (x: any): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) =>
    x > y.val ? Max(x) : Max(y.val),
  inspect: () => `Max(${x})`,
  toString: () => `Max(${x})`
});

Max.prototype.identity = Max(-Infinity);

// Min Monoid
const Min = (x: any): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) =>
    x < y.val ? Min(x) : Min(y.val),
  inspect: () => `Min(${x})`,
  toString: () => `Min(${x})`
});

Min.prototype.identity = Min(Infinity);

// Average Monoid
const Average = (sum: any, length: number = 1) => ({
  val: length && sum / length,
  props: { sum, length },
  concat: (that: Semigroup<any>) =>
    Average(
      sum + that.props.sum,
      length + that.props.length
    ),
  inspect: () => `Average(${{sum, length}})`,
  toString: () => `Average(${{sum, length}})`
});

Average.prototype.identity = Average(0, 0);

// All Monoid
const All = (x: any): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) => All(x && y.val),
  inspect: () => `All(${x})`,
  toString: () => `All(${x})`
});

All.prototype.identity = All(true);

// Some Monoid
const Some = (x: any): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) => Some(x || y.val),
  inspect: () => `Some(${x})`,
  toString: () => `Some(${x})`
});

Some.prototype.identity = Some(false);

// Flatten Monoid
const Flatten = (x: Array<any>): Semigroup<any> => ({
  val: x,
  concat: (y: Semigroup<any>) =>
    Flatten(x.concat(
      y.val instanceof Array
        ? fold(Flatten, y.val)
        : y.val
    )),
  inspect: () => `Flatten(${x})`,
  toString: () => `Flatten(${x})`
});

Flatten.prototype.identity = Flatten([]);

export { Sum, Product, Max, Min, Average, All, Some, Flatten };
