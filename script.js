let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d");
let caixa = 32;
let snake = []; //vetor: atribui vários valores dentro, diferente das variáveis, que só armazenam um valor ou informação por vez

snake[0] = {
    x: 8 * caixa, 
    y: 8 * caixa
}

let textura = new Image();
textura.src = 'yqw5rywc.png'; // exemplo de imagem, troque pela que quiser

  // Espera a imagem carregar antes de desenhar
textura.onload = function() {
    criarCobrinha();  
};

function criarCobrinha() {
    contexto.clearRect(0, 0, snake, snake);
    // Desenha a cobra com textura
    for (let i = 0; i < snake.length; i++) {
        contexto.drawImage(textura, snake[i].x, snake[i].y, caixa, caixa);
    }
}



let direcao = 'direita';

//Método:
let comida = {  //Math.floor: arredondar o nº aleatório || Math.random: nº entre 1 e 15 e quase chega a 16
    x: Math.floor(Math.random() * 15 + 1) * caixa, //Elemento 1 e elemento 2
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarFundo( ){
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}


//function criarCobrinha() { //Aumenta um bloco na cobrinha
    //for (i=0; i < snake.length; i++){
        //contexto.fillStyle = "green";
        //contexto.fillRect(snake[i].x, snake[i].y, caixa, caixa);
        //contexto.fillRect() = desenha um retângulo preenchido no canvas
        //contexto.fillRect(coordenada x, coordenada y, largura da comida(caixa), altura da comida(caixa))
  //  }
//}

function desenharComida() {
    contexto.fillStyle = "red";
    contexto.fillRect(comida.x, comida.y, caixa, caixa);
}


document.addEventListener('keydown', atualizarDirecao);//Toda a vez que alguma tecla qualquer do teclado for pressionada, o programa efetua a função "atualizarDirecao"


//Cód das teclas que indicam direção:

//37 = esquerda
//38 = cima
//39 = direita
//40 = baixo


function atualizarDirecao(evento){
    if(evento.keyCode == 37 && direcao != 'direita') direcao = 'esquerda';
    if(evento.keyCode == 38 && direcao != 'baixo') direcao = 'cima';
    if(evento.keyCode == 39 && direcao != 'esquerda') direcao = 'direita';
    if(evento.keyCode == 40 && direcao != 'cima') direcao = 'baixo';
    
}

function iniciarJogo(){
    //Teletransportar a cobra ao ultrapassar as bordas
    if (snake[0].x > 15 * caixa && direcao == 'direita') snake[0].x=0;
    if (snake[0].x < 0 && direcao == 'esquerda') snake[0].x=15 * caixa;
    if (snake[0].y > 15 * caixa && direcao == 'baixo') snake[0].y = 0;
    if (snake[0].y < 0 && direcao == 'cima') snake[0].y=15 * caixa;
   //Verificar a colisão da cabeça com o corpo
   for (let i = 1; i< snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); 
            alert('Fim de jogo!');
        }
    }    
    
    criarFundo();
    criarCobrinha(); 
    desenharComida();
    
    let cobraX = snake[0].x;
    let cobraY = snake[0].y;

    if (direcao == 'direita') cobraX += caixa;
    if (direcao == 'esquerda') cobraX -= caixa;
    if (direcao == 'cima') cobraY -= caixa;
    if (direcao == 'baixo') cobraY += caixa;

    //verificar se comeu a comida

    //if(cobraX != comida.x || cobraY != snake.y){
       //snake.pop();
    //}else{
        //comida.x = Math.floor(Math.random() * 15 + 1) *caixa;
        //comida.y = Math.floor(Math.random() * 15 + 1) *caixa;  
    //}

    if(cobraX == comida.x && cobraY == comida.y){
        comida.x = Math.floor(Math.random() * 16) *caixa;
        comida.y = Math.floor(Math.random() * 16) *caixa;
     }else{
        snake.pop();
     }

    let novaCabeca = {
        x: cobraX,
        y: cobraY,
    } 

    snake.unshift(novaCabeca);//add nova parte do corpo
}
let jogo = setInterval(iniciarJogo, 100);