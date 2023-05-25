tablero = document.querySelector('#nQueensForm');
tablero.addEventListener('submit', function(e) {
    e.preventDefault();

    let n = document.querySelector('#nValue').value;

    if (n < 1 || n > 92) {
        alert('Por favor, ingrese un número válido del 1 al 92.');
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'api.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let solutionOutput = document.getElementById('solutionOutput');
            solutionOutput.innerHTML = '<h2>Solución # ' + n + ':</h2>' + xhr.responseText;
        }
    };
    xhr.send('n=' + n);
});