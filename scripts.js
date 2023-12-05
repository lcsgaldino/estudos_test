// script.js

const apiKey = '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'; // Substitua com a sua chave de API
const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Verifique a documentação para a URL correta

async function fazerSolicitacaoAPI(prompt) {
    const resposta = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Você é um assistente de linguagem.' },
                { role: 'user', content: prompt },
            ],
        }),
    });

    const dados = await resposta.json();
    exibirResposta(dados.choices[0].message.content);
}

function exibirResposta(resposta) {
    const chatLog = document.getElementById('chat-log');
    const userMessage = document.getElementById('user-input').value;

    // Adicione as mensagens ao registro de chat
    chatLog.innerHTML += `<div><strong>Você:</strong> ${userMessage}</div>`;
    chatLog.innerHTML += `<div><strong>Assistente:</strong> ${resposta}</div>`;

    // Limpe a entrada do usuário
    document.getElementById('user-input').value = '';
}

function enviarMensagem() {
    const userMessage = document.getElementById('user-input').value;

    if (userMessage.trim() !== '') {
        // Envia a mensagem do usuário para a API
        fazerSolicitacaoAPI(userMessage);
    }
}