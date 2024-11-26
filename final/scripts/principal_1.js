  const canvas = document.getElementById('mapaCanvas');
  const ctx = canvas.getContext('2d');

  let imagens = []; // Lista de imagens no mapa
  let imagemSelecionada = null; // A imagem que está sendo movida ou redimensionada
  let pontoInicial = { x: 0, y: 0 }; // Ponto onde a imagem é clicada para movimento ou redimensionamento
  let redimensionando = false; // Flag para verificar se a imagem está sendo redimensionada
  let movendo = false; // Flag para verificar se a imagem está sendo movida

  // Função para desenhar o mapa
  function desenharMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    imagens.forEach(imagem => {
      ctx.drawImage(imagem.img, imagem.x, imagem.y, imagem.largura, imagem.altura);
    });
  }

  // Função para carregar e adicionar uma imagem ao mapa
  function adicionarImagem(imgSrc, x, y, largura = 50, altura = 50) {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      imagens.push({
        img: img,
        x: x,
        y: y,
        largura: largura,
        altura: altura
      });
      desenharMapa(); // Redesenha o mapa com a nova imagem
    };
  }

  // Função para iniciar o movimento ou redimensionamento
  function iniciarMovimento(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Verifica se o clique foi em alguma imagem no mapa
    imagens.forEach(imagem => {
      if (
        mouseX >= imagem.x && mouseX <= imagem.x + imagem.largura &&
        mouseY >= imagem.y && mouseY <= imagem.y + imagem.altura
      ) {
        imagemSelecionada = imagem; // A imagem foi selecionada
        pontoInicial = { x: mouseX, y: mouseY };

        // Verifica se o clique foi na borda da imagem (para redimensionamento)
        if (mouseX >= imagem.x + imagem.largura - 10 && mouseY >= imagem.y + imagem.altura - 10) {
          redimensionando = true; // Ativa o redimensionamento
        } else {
          movendo = true; // Ativa o movimento
        }
      }
    });
  }

  // Função para mover ou redimensionar a imagem selecionada
  function moverOuRedimensionarImagem(event) {
    if (imagemSelecionada) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      /**/if (redimensionando) {
        // Redimensiona a imagem
        const deltaX = mouseX - pontoInicial.x;
        const deltaY = mouseY - pontoInicial.y;
        imagemSelecionada.largura = Math.max(20, imagemSelecionada.largura + deltaX); // Limita o tamanho mínimo
        imagemSelecionada.altura = Math.max(20, imagemSelecionada.altura + deltaY); // Limita o tamanho mínimo
        pontoInicial = { x: mouseX, y: mouseY };
      } else /**/if (movendo) {
        // Move a imagem
        imagemSelecionada.x += mouseX - pontoInicial.x;
        imagemSelecionada.y += mouseY - pontoInicial.y;
        pontoInicial = { x: mouseX, y: mouseY };
      }

      desenharMapa(); // Redesenha o mapa com a imagem movida ou redimensionada
    }
  }

  // Função para finalizar o movimento ou redimensionamento
  function finalizarMovimentoOuRedimensionamento() {
    imagemSelecionada = null;
    redimensionando = false;
    movendo = false;
  }

  // Função para limpar o mapa
  function limparMapa() {
    imagens = [];
    desenharMapa();
  }

  // Evento de clique para iniciar o movimento ou redimensionamento
  canvas.addEventListener('mousedown', iniciarMovimento);
  canvas.addEventListener('mousemove', moverOuRedimensionarImagem);
  canvas.addEventListener('mouseup', finalizarMovimentoOuRedimensionamento);

  // Função para carregar uma imagem de arquivo local
  document.getElementById('uploadImagem').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        // Adiciona a imagem no mapa em uma posição inicial
        adicionarImagem(e.target.result, 100, 100); // Adiciona a imagem no mapa em (100, 100)
      };

      reader.readAsDataURL(file); // Lê o arquivo de imagem como URL de dados
    }
  });