
const massas = {
    H: 1.008, He: 4.003, Li: 6.94, Be: 9.012,
    B: 10.81, C: 12.011, N: 14.007, O: 15.999,
    F: 18.998, Ne: 20.18, Na: 22.990, Mg: 24.305,
    Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
    Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
    Mn: 54.938, Fe: 55.845, Cu: 63.546, Zn: 65.38,
    Ag: 107.868, I: 126.904, Ba: 137.327, Au: 196.967,
    Pb: 207.2, Sn: 118.710, Br: 79.904, Ni: 58.693,
    Co: 58.933, Cr: 51.996, Hg: 200.592, Pt: 195.084
};

function calcularMassaMolar(formula) {
    let massa = 0;
    let i = 0;

    while (i < formula.length) {
        if (formula[i] === "(") {
            let inicio = i + 1;
            let fim = formula.indexOf(")", inicio);

            if (fim === -1) throw Error("Parênteses inválidos.");

            let dentro = formula.substring(inicio, fim);
            i = fim + 1;

            let numero = "";
            while (i < formula.length && /\d/.test(formula[i])) {
                numero += formula[i];
                i++;
            }

            massa += calcularMassaMolar(dentro) * (Number(numero) || 1);
        } else {
            let elemento = formula[i];
            i++;

            if (i < formula.length && /[a-z]/.test(formula[i])) {
                elemento += formula[i];
                i++;
            }

            let numero = "";
            while (i < formula.length && /\d/.test(formula[i])) {
                numero += formula[i];
                i++;
            }

            if (massas[elemento] === undefined) {
                throw Error("Elemento desconhecido: " + elemento);
            }

            massa += massas[elemento] * (Number(numero) || 1);
        }
    }

    return massa;
}

function calcular() {
    let resultado = document.getElementById("resultado");

    try {
        let equacao = document.getElementById("equacao").value
            .replace(/→|⟶|=/g, "->");

        let reagente = document.getElementById("reagente").value.trim();
        let produto = document.getElementById("produto").value.trim();
        let massa = Number(document.getElementById("massa").value);

        if (massa <= 0 || !Number.isFinite(massa)) {
            throw Error("Digite uma massa válida.");
        }

        let lados = equacao.split("->");

        if (lados.length !== 2) {
            throw Error("Equação inválida. Use -> para separar os lados.");
        }

        let reagentes = lados[0].split("+");
        let produtos = lados[1].split("+");
        let coefR = 0;
        let coefP = 0;
        let atomosR = {};
        let atomosP = {};

        function lerSubstancias(lista, atomos, lado) {
            for (let item of lista) {
                let partes = item.trim().match(/^(\d*)([A-Z].*)$/);

                if (!partes) throw Error("Substância inválida.");

                let coef = Number(partes[1]) || 1;
                let formula = partes[2];
                let i = 0;

                while (i < formula.length) {
                    let elemento = formula[i++];
                    
                    if (i < formula.length && /[a-z]/.test(formula[i])) {
                        elemento += formula[i++];
                    }

                    let numero = "";
                    while (i < formula.length && /\d/.test(formula[i])) {
                        numero += formula[i++];
                    }

                    let quantidade = Number(numero) || 1;

                    if (massas[elemento] === undefined) {
                        throw Error("Elemento desconhecido: " + elemento);
                    }

                    atomos[elemento] = (atomos[elemento] || 0) +
                        quantidade * coef;
                }

                if (formula === reagente && lado === "reagente") {
                    coefR = coef;
                }

                if (formula === produto && lado === "produto") {
                    coefP = coef;
                }
            }
        }

        lerSubstancias(reagentes, atomosR, "reagente");
        lerSubstancias(produtos, atomosP, "produto");

        if (coefR === 0 || coefP === 0) {
            throw Error("Confira o reagente e o produto.");
        }

        let elementos = new Set([
            ...Object.keys(atomosR),
            ...Object.keys(atomosP)
        ]);

        for (let elemento of elementos) {
            if ((atomosR[elemento] || 0) !== (atomosP[elemento] || 0)) {
                throw Error("A equação não está balanceada.");
            }
        }

        let massaR = calcularMassaMolar(reagente);
        let massaP = calcularMassaMolar(produto);

        let molsR = massa / massaR;
        let molsP = molsR * coefP / coefR;
        let massaFinal = molsP * massaP;

        resultado.textContent =
            "Massa molar de " + reagente + ": " +
            massaR.toFixed(3) + " g/mol\n" +

            "Quantidade de " + reagente + ": " +
            molsR.toFixed(4) + " mol\n" +

            "Quantidade de " + produto + ": " +
            molsP.toFixed(4) + " mol\n" +

            "Massa molar de " + produto + ": " +
            massaP.toFixed(3) + " g/mol\n\n" +

            "MASSA TEÓRICA DO PRODUTO: " +
            massaFinal.toFixed(3) + " g";

    } catch (erro) {
        resultado.textContent = "Erro: " + erro.message;
    }
}

document.getElementById("calcular").addEventListener("click", calcular);
