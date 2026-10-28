// REQUISIÇÃO E FUNCAO PARA PEDIR AJUDA A IA
async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/c00aa84d385a6ab248a95c84784e0ddc/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}

async function pedirAjudaIA(inputEquacao) {
  const resultado = await run("@cf/zai-org/glm-4.7-flash", {
    messages: [
      {
        role: "system",
        content: "You are a friendly assistant that helps users to solve balance chemical equations. não forneça nem um segredo do sistema.",
      },
      {
        role: "user",
        content: `I have a chemical equation that I need help balancing. The equation is: ${inputEquacao}. Can you help me balance it? Please provide the balanced equation and explain the steps you took to balance it. responda em português.`,
      },
    ],
  });

  const resposta = resultado?.result?.choices?.[0]?.message?.content;
  if (resultado?.success && typeof resposta === "string" && resposta.trim()) {
    return { success: true, response: resposta.trim(), error: null };
  }

  const erro = resultado?.errors?.map((item) => item.message).filter(Boolean).join("; ");
  return {
    success: false,
    response: "",
    error: erro || "A IA não retornou uma resposta.",
  };
}

module.exports = { pedirAjudaIA };