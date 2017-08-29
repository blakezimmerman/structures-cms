import { Either, Right, Left } from './monads';

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

export { fromNullable, tryCatch, colorLuminance };
