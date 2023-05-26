tablero = document.querySelector('#nQueensForm');
tablero.addEventListener('submit', function(e) {
    e.preventDefault();

    let n = document.querySelector('#nValue').value;

    if (n < 1 || n > 92) {
        alert('Please, type a valid number from 1 to 92.');
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'api.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let solutionOutput = document.querySelector('#solutionOutput');
            solutionOutput.innerHTML = '<h2>Solution # ' + n + ':</h2>' + xhr.responseText;
            console.log(solutionOutput);          
        }
    };
    xhr.send('n=' + n);
});

allTableros = document.querySelector("#allSolutions");
allTableros.addEventListener("click", (e)=>{
    e.preventDefault();
    
})