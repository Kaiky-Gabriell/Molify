const unidades = {
    t: 1000000,
    kg: 1000,
    hg: 100,
    dag: 10,
    g: 1,
    dg: 0.1,
    cg: 0.01,
    mg: 0.001,
    lb: 453.59237,
};

function converterMassa(valor, origem, destino) {

    if (
        valor === "" ||
        valor === null ||
        !Number.isFinite(Number(valor))
    ) {
        throw new Error("Informe um valor numérico válido.");
    }

    if (!(origem in unidades) || !(destino in unidades)) {
        throw new Error("Unidade de massa inválida.");
    }

    const valorEmGramas = Number(valor) * unidades[origem];
    const resultado = valorEmGramas / unidades[destino];
    return resultado;
}

const formulario = document.getElementById("formConversor");
const campoValor = document.getElementById("valor");
const campoOrigem = document.getElementById("origem");
const campoDestino = document.getElementById("destino");
const divResultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();
    const valor = campoValor.value;
    const origem = campoOrigem.value;
    const destino = campoDestino.value;

    try {
        const resultado = converterMassa(valor, origem, destino);
        const resultadoFormatado = resultado.toLocaleString("pt-BR", {
            maximumFractionDigits: 12
        });

        divResultado.textContent = `${valor} ${origem} = ${resultadoFormatado} ${destino}`;

    } catch (erro) {
        divResultado.textContent = erro.message;
    }
});