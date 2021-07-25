const cartas = document.querySelectorAll('.carta');
let tempoHTML = document.getElementById('tempo');
let pontosHTML = document.getElementById('pontos');

var virouCarta = false;
var primeiraCarta, segundaCarta;
var bloqueio = false;

var pontos = 0;
var segundos = 0;

var primeiraJogada = false;
var comecou = false;

var timer = setInterval(contaTempo, 1000);

function virarCarta() {
  if(bloqueio) return;
  if(this === primeiraCarta) return;

  this.classList.add('flip');

  if(!virouCarta) {
    virouCarta = true;
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;

  checarIguais();
}

function checarIguais() {
  if (primeiraCarta.dataset.framework === segundaCarta.dataset.framework){
    disabilitarCarta();
    
    return;
  }
  voltarCartas();
}

function disabilitarCarta() {
  primeiraCarta.removeEventListener('click', virarCarta);
  segundaCarta.removeEventListener('click', virarCarta);
  achouCarta();
  reiniciaJogada();
}

function voltarCartas() {
  bloqueio = true;
  setTimeout(() => {
    primeiraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');

    naoAchouCarta();
    reiniciaJogada();
  }, 1500)
}

function geraPontos() {
  pontos = pontos + 1;
  pontosHTML.innerHTML = pontos;
}

function reiniciaJogada() {
  [virouCarta, bloqueio] = [false, false]
  [primeiraCarta, segundaCarta] = [null, null]
}

function achouCarta(){
  setTimeout(() => {
    geraPontos();
    alert('Achou!');
    venceu()    
  }, 500)
}

function venceu(){
  if(pontos === 6) {
    clearInterval(timer);
    cartas.forEach( carta => {
      reiniciarJogo(carta)
    });
    fimJogo()
  }
  return;
}

function reiniciarJogo(carta){
  carta.addEventListener('click', virarCarta);
  carta.classList.toggle('flip');
}

function fimJogo(){
  ponto = 0; segundos = 0;
  tempoHTML.innerHTML = "Segundos: " + segundos.toString();
  pontosHTML.innerHTML = pontos;
  
  if (window.confirm("Ganhou! Deseja jogar mais uma vez?")) {
    timer = setInterval(contaTempo, 1000);
  }

}

function naoAchouCarta(){
  alert('Nao achou!');
}

(function embaralhar() {
  cartas.forEach( carta => {
    let processamentoRandom = Math.floor(Math.random() * 12)
    carta.style.order = processamentoRandom;
  });
})();

function contaTempo() { 
    if(!comecou) return;      
    segundos = segundos + 1;
    tempoHTML.innerHTML = "Segundos: " + segundos.toString();
};


function parar() {
  clearInterval(timer);
}

if (window.confirm("Preparar que o jogo vai comecar!")) {
  comecou = true
}

cartas.forEach( carta => carta.addEventListener('click', virarCarta));