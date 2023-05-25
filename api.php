<?php

function solveNQueens($n) {
    if ($n === 1) return [["Q"]];

    $col = [];
    $posDiag = [];
    $negDiag = [];

    $res = [];
    $board = array_fill(0, $n, array_fill(0, $n, "."));

    // Helper functions

    $isValid = function($r, $c) use (&$col, &$posDiag, &$negDiag) {
        return !isset($col[$c]) && !isset($posDiag[$r + $c]) && !isset($negDiag[$r - $c]);
    };

    $addQueen = function($r, $c) use (&$col, &$posDiag, &$negDiag, &$board) {
        $col[$c] = true;
        $posDiag[$r + $c] = true;
        $negDiag[$r - $c] = true;
        $board[$r][$c] = 'Q';
    };

    $removeQueen = function($r, $c) use (&$col, &$posDiag, &$negDiag, &$board) {
        unset($col[$c]);
        unset($posDiag[$r + $c]);
        unset($negDiag[$r - $c]);
        $board[$r][$c] = ".";
        
    };

    // Recursive backtracking function

    $recurse = function($row) use ($n, &$res, &$board, $isValid, $addQueen, $removeQueen, &$recurse) {
        // Base case
        if ($row === $n) {
            $res[] = array_map(function($row) {
                return implode("", $row);
            }, $board);
            return;
        }

        // Recurrence relation
        for ($col = 0; $col < $n; $col++) {
            if ($isValid($row, $col)) {
                $addQueen($row, $col);
                // Recurse
                $recurse($row + 1);
                // Backtrack
                $removeQueen($row, $col);
            }
        }
    };

    $recurse(0);
    return $res;
}

$n = $_POST['n'];

if ($n < 1 || $n > 92) {
    echo 'Número inválido. Por favor, ingrese un número del 1 al 92.';
    exit;
}

$solutions = solveNQueens(8);

if ($n > count($solutions)) {
    echo 'No hay solución para el número ingresado.';
    exit;
}

$solution = $solutions[$n - 1];
foreach ($solution as $row) {
    echo '<div class="solution-row">';
    for ($i = 0; $i < strlen($row); $i++) {
        if ($row[$i] === 'Q') {
            echo '<span class="queen">' . $row[$i] . '</span>';
        } else {
            echo '<span class="dot">' . $row[$i] . '</span>';
        }
    }
    echo '</div>';
}

?>
