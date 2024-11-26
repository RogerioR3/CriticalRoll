
    let alternando = false;

    // Alternar entre chat/histórico e fichas
    function alternarPainel() {
      alternando = !alternando;
      document.getElementById('chat-historico').classList.toggle('hidden', alternando);
      document.getElementById('fichas').classList.toggle('hidden', !alternando);
    }

    // Função para enviar mensagem no chat
    function enviarMensagem() {
      const chatInput = document.getElementById('chatInput');
      const mensagem = chatInput.value.trim();
      if (mensagem !== '') {
        const chat = document.getElementById('chat');
        const novaMensagem = document.createElement('p');
        novaMensagem.innerText = mensagem;
        chat.appendChild(novaMensagem);
        chat.scrollTop = chat.scrollHeight; // Rola para o final
        chatInput.value = ''; // Limpa o campo de entrada
      }
    }

    // Função para criar personagem
    function criarPersonagem(event) {
      event.preventDefault();
      const nome = document.getElementById('nomePersonagem').value;
      const classe = document.getElementById('classePersonagem').value;
      const raça = document.getElementById('RaçaPersonagem').value;
      const nivel = document.getElementById('nivelPersonagem').value;
      const experiencia = document.getElementById('experienciaPersonagem').value;

      const ficha = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Raça:</strong> ${raça}</p>
        <p><strong>Classe:</strong> ${classe}</p>
        <p><strong>Nível:</strong> ${nivel}</p>
        <p><strong>Experiência:</strong> ${experiencia}</p>
        <hr>
      `;
      document.getElementById('listaFichas').innerHTML += ficha;

      document.getElementById('fichaForm').reset();
    }

    // Função para adicionar item ao inventário
    function adicionarItem() {
      const item = document.getElementById('itemInventario').value.trim();
      if (item !== '') {
        const listaFichas = document.getElementById('listaFichas');
        const novoItem = document.createElement('p');
        novoItem.innerHTML = `<strong>Item:</strong> ${item}`;
        listaFichas.appendChild(novoItem);
        document.getElementById('itemInventario').value = ''; // Limpa o campo
      }
    }

    // Funções de rolagem de dados
    function rolarDado(lados) {
      return Math.floor(Math.random() * lados) + 1;
    }

    function rolarDadoTipo(lados) {
      const resultado = rolarDado(lados);
      document.getElementById('resultado').innerText = `Resultado do d${lados}: ${resultado}`;
      adicionarAoHistorico(`Rolou d${lados} e obteve ${resultado}`);
    }

    // Função para adicionar ao histórico
    function adicionarAoHistorico(mensagem) {
      const historico = document.getElementById('historico');
      const novaEntrada = document.createElement('p');
      novaEntrada.innerText = mensagem;
      historico.appendChild(novaEntrada);
      historico.scrollTop = historico.scrollHeight; // Rola para o final do histórico
    }