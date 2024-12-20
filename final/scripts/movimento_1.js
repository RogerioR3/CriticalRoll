
    const canvas = document.getElementById('mapaCanvas');
    const ctx = canvas.getContext('2d');

    let imagens = []; // Lista de objetos de imagens no mapa
    let imagemSelecionada = null; // A imagem que está sendo movida

    // Função para desenhar o mapa
    function desenharMapa() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

      // Desenha todas as imagens no mapa
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

    // Função para começar o movimento de uma imagem
    function iniciarMovimento(event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // Verifica se o clique foi em alguma imagem no mapa
      imagens.forEach(imagem => {
        if (
          mouseX >= imagem.x && mouseX <= imagem.x + imagem.largura &&
          mouseY >= imagem.y && mouseY <= imagem.y + imagem.altura
        ) {
          imagemSelecionada = imagem; // A imagem foi selecionada para movimentação
        }
      });
    }

    // Função para mover a imagem selecionada
    function moverImagem(event) {
      if (imagemSelecionada) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        imagemSelecionada.x = mouseX - imagemSelecionada.largura / 2;
        imagemSelecionada.y = mouseY - imagemSelecionada.altura / 2;

        desenharMapa(); // Redesenha o mapa com a imagem movida
      }
    }

    // Função para finalizar o movimento
    function finalizarMovimento() {
      imagemSelecionada = null;
    }

    // Função para limpar o mapa (remover todas as imagens)
    function limparMapa() {
      imagens = [];
      desenharMapa();
    }

    // Evento de clique para começar o movimento da imagem
    canvas.addEventListener('mousedown', iniciarMovimento);
    canvas.addEventListener('mousemove', moverImagem);
    canvas.addEventListener('mouseup', finalizarMovimento);

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

    // Inicializa o mapa com algumas imagens já
    adicionarImagem('https://upload.wikimedia.org/wikipedia/commons/7/7e/Font_Awesome_5_solid_circle.svg', 200, 200, 40, 40); // Adiciona uma imagem de exemplo
    adicionarImagem('https://upload.wikimedia.org/wikipedia/commons/7/7e/Font_Awesome_5_solid_circle.svg', 300, 300, 40, 40);
