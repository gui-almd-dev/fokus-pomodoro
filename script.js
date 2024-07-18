const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const titulo = document.querySelector('.app__title')
const banner = document.querySelector('.app__image')
const iconePauseOuPlay = document.querySelector('.app__card-primary-butto-icon')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioComeçarOuContinuar = new Audio ('/sons/play.wav')
const audioPausar = new Audio ('/sons/pause.mp3')
const audioAcabouTempo = new Audio ('/sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')
musica.loop = true;
const comecarBt = document.querySelector('#start-pause')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null
const iniciarOuPausarBT = document.querySelector('#start-pause span')


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.volume = 0.75
        musica.play()
        console.log('play')
    } else {
        musica.pause()
        console.log('pause')
    }
})

focoBt.addEventListener('click', ()=> {
    if (intervaloId){
        iniciarOuPausar()
    }
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    titulo.innerHTML = `Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', ()=> {
    if (intervaloId){
        iniciarOuPausar()
    }
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    titulo.innerHTML = `Que tal dar uma respirada?,<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', ()=> {
    if (intervaloId){
        iniciarOuPausar()
    }
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    titulo.innerHTML = `Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    longoBt.classList.add('active')

})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach( function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0 ){
        // audioAcabouTempo.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    // console.log('Temporizador: '+tempoDecorridoEmSegundos)
}

comecarBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        zerar()
        audioPausar.volume = 0.5
        audioPausar.play()
        return
    }
    audioComeçarOuContinuar.volume = 0.5
    audioComeçarOuContinuar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBT.textContent = 'Pausar'
    iconePauseOuPlay.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBT.textContent = 'Começar'
    iconePauseOuPlay.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo()