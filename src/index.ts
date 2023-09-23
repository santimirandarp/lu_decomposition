import { LuDecomposition, Matrix } from 'ml-matrix';

export function luDecomposition(A: Matrix) {
  const LU = A.clone(); //it will become LU
  const r = A.rows;
  const c = A.columns;

  for (let o = 0; o < r - 1; o++) {
    // origin row
    const rowO = LU.getRow(o);
    for (let i = o + 1; i < r; i++) {
      // row to change
      const factor = LU.get(i, o) / rowO[o]; // factor to multiply the origin row
      let j = o + 1; // start from column 1

      for (j; j < c; j++) {
        LU.set(i, j, LU.get(i, j) - rowO[j] * factor);
      }
      LU.set(i, o, factor); // set the factor in the col 0..
    }
  }
  return LU;
}

function luToLAndU(LU: Matrix) {
  const r = LU.rows;
  const c = LU.columns;
  const L = new Matrix(r, c);
  const U = new Matrix(r, c);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (i > j) {
        L.set(i, j, LU.get(i, j));
      } else {
        U.set(i, j, LU.get(i, j));
      }
      if (i === j) {
        L.set(i, j, 1);
      }
    }
  }
  return { L, U };
}

const A = Matrix.random(1000, 1000);
console.log(A);

const timeIn2 = performance.now();
const result = new LuDecomposition(A);
const timeOut2 = performance.now();
console.log(`ml-matrix factorisation ${timeOut2 - timeIn2}ms`);
const { upperTriangularMatrix, lowerTriangularMatrix } = result;
console.log(lowerTriangularMatrix.mmul(upperTriangularMatrix));
const timeIn = performance.now();
const decomposed = luDecomposition(A);
const timeOut = performance.now();
const { L, U } = luToLAndU(decomposed);
console.log(L.mmul(U));
console.log(`Current factorisation took ${timeOut - timeIn}ms`);
