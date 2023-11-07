function consultarCEP() {
    var cep = document.getElementById("cepInput").value;
    var apiURL = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.cep) {
                adicionarRegistro(data);
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function adicionarRegistro(endereco) {
    var registrosBody = document.getElementById("registros-body");
    var novaLinha = registrosBody.insertRow();
    var cidadeCelula = novaLinha.insertCell(0);
    var bairroCelula = novaLinha.insertCell(1);
    var estadoCelula = novaLinha.insertCell(2);

    cidadeCelula.innerHTML = endereco.localidade;
    bairroCelula.innerHTML = endereco.bairro;
    estadoCelula.innerHTML = endereco.uf;
}

function ordenar(coluna) {
    var registrosTable = document.getElementById("registros");
    var registrosBody = document.getElementById("registros-body");
    var linhas = Array.from(registrosBody.rows);

    linhas.sort(function (a, b) {
        var valorA = a.cells[coluna === 'cidade' ? 0 : coluna === 'bairro' ? 1 : 2].innerHTML;
        var valorB = b.cells[coluna === 'cidade' ? 0 : coluna === 'bairro' ? 1 : 2].innerHTML;
        return valorA.localeCompare(valorB);
    });

    registrosBody.innerHTML = '';
    linhas.forEach(function (linha) {
        registrosBody.appendChild(linha);
    });
}

