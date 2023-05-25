const solveNQueens = function(n) {
    if (n === 1) return [["Q"]];

    let col = new Set();
    let posDiag = new Set();
    let negDiag = new Set();

    let res = [];
    let board = Array.from(Array(n), () => new Array(n).fill("."));

    // Helper functions

    const isValid = (r, c) => !col.has(c) && !posDiag.has(r + c) && !negDiag.has(r - c);

    const addQueen = (r, c) => {
        col.add(c);
        posDiag.add(r + c);
        negDiag.add(r - c);
        board[r][c] = "Q";
    };

    const removeQueen = (r, c) => {
        col.delete(c);
        posDiag.delete(r + c);
        negDiag.delete(r - c);
        board[r][c] = ".";
    };

    // Recursive backtracking function

    function recurse(row) {
        // Base case
        if (row === n) {
            res.push([...board.map(row => row.join(""))]);
            return;
        }

        // Recurrence relation
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                addQueen(row, col);
                // Recurse
                recurse(row + 1);
                // Backtrack
                removeQueen(row, col);
            }
        }
    }

    recurse(0);
    return res;
};

// Imprimir la respuesta en la consola
const n = 8; // Cambiar el valor de "n" según sea necesario
const solutions = solveNQueens(n);
console.log(`Soluciones para ${n} reinas:`);
solutions.forEach((solution, index) => {
    console.log(`Solución ${index + 1}:`);
    solution.forEach(row => console.log(row));
    console.log();
});