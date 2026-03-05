// Seleciona o botão no DOM para adicionar interatividade de clique
let botao = document.querySelector(".botao-gerar")

// Define o endpoint da API de chat completion que será consumida
let endereco = "https://api.groq.com/openai/v1/chat/completions"

// Criei a funcao que será chamada quando clicar 
// no botao
/**
 * Função assíncrona principal.
 * Captura o input do usuário, envia para a IA e exibe o resultado na tela.
 */
async function gerarCodigo() {

    // Seleciona os elementos da interface: entrada de texto, área de código e iframe de visualização
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    // Executa a requisição POST para a API da Groq
    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Nota: Em ambientes de produção, evite expor chaves de API diretamente no front-end
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    // Converte a resposta bruta da API para formato JSON
    let dados = await resposta.json()
    
    // Extrai o conteúdo da mensagem gerada pela IA
    let resultado = dados.choices[0].message.content

    // Atualiza o DOM: insere o texto do código e renderiza no iframe
    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}

// ficar de olho no botao, quando clicado chamar o gerarCodigo
botao.addEventListener("click", gerarCodigo)



// vizinho curioso (addEventListener)
// adicionar ouvinte de eventos
// Evento = clique, digitei...
