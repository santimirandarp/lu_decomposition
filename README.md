Simple, limited, incomplete and probably wrong LU decomposition.

1. Clone the project
2. Install `npm i`
3. Run `npm start` to see the result with a random matrix.

What does the code do?

1. It creates a random matrix of size 1000x1000
2. It calculates the LU decomposition of the matrix with 2 different methods ml-matrix LU and the one implemented in this project, which is not robust yet.
3. It returns the original random matrix, timestamps for each method, and the result of L*U which, since we are not using pivots, should be equal to the original matrix.
