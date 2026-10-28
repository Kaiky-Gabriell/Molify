const { chemicalEquationBalancer } = require('./balanceador');
const { pedirAjudaIA } = require('./ajudaIA');


// ========= PLACEHOLDERS PARA O FRONT-END (ALTERAR CONFOROME NECESSÁRIO) =========
const inputEquacaoEl = document.getElementById("inputEquacao");
const resultadoEquacaoEl = document.getElementById("resultadoEquacao");
const buttonBalancear = document.getElementById("buttonBalancear");
const buttonAjudaIA = document.getElementById("buttonAjudaIA");

// ========= PLACEHOLDERS PARA O FRONT-END (ALTERAR CONFOROME NECESSÁRIO) =========



// ================ BALANCEAR EQUAÇÃO COM A BIBLIOTECA LOCAL ao clicar no botão ===============

buttonBalancear?.addEventListener("click", () => {
  const equacao = inputEquacaoEl.value.trim();

  if (!equacao) {
    resultadoEquacaoEl.textContent = "Por favor, digite uma equação.";
    return;
  }

  const resultado = chemicalEquationBalancer(equacao);
  resultadoEquacaoEl.textContent = resultado.text;
});
// ================= BALANCEAR EQUAÇÃO COM A BIBLIOTECA LOCAL ao clicar no botão ==============




// ============= Só executa se o usuário clicar no botao de ÍA QUE GERA A RESPOSTA ============

let textoRespostaIAEl; // executa sem clicar no botão, mas só cria o elemento de resposta da IA quando o usuário clicar no botão de ajuda da IA

// Função para lidar com o clique no botão de ajuda da IA
buttonAjudaIA.addEventListener("click", async () => {
  const equacao = inputEquacaoEl.value;

  if (!equacao.trim()) {
    mostrarRespostaIA("Por favor, digite uma equação.");
    return;
  }

  mostrarRespostaIA("Consultando IA...");

  try {
    const resposta = await pedirAjudaIA(equacao);
    mostrarRespostaIA(resposta.success
      ? resposta.response
      : resposta.error);
  } catch (erro) {
    mostrarRespostaIA("Erro ao conectar com a IA.");
    console.error(erro);
  }
});

// Função para mostrar a resposta da IA no front-end
function mostrarRespostaIA(texto) {
  if (!textoRespostaIAEl) {
    const respostaIAEl = document.createElement("section");
    respostaIAEl.id = "respostaIA";
    respostaIAEl.className = "resposta-ia";
    respostaIAEl.setAttribute("aria-live", "polite");

    const tituloRespostaIAEl = document.createElement("h2");
    tituloRespostaIAEl.textContent = "Resposta da IA";
    textoRespostaIAEl = document.createElement("p");
    respostaIAEl.append(tituloRespostaIAEl, textoRespostaIAEl);
    resultadoEquacaoEl.insertAdjacentElement("afterend", respostaIAEl);
  }

  textoRespostaIAEl.textContent = texto;
}

// ============= Só executa se o usuário clicar no botao de ÍA QUE GERA A RESPOSTA  ============

