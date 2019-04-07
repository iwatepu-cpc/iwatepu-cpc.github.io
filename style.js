
const _loadingMessage = [
    "今、この瞬間が最高に熱い",
    "1時間40分がこんなに短いなんて思わなかった",
    "人生で一番頭を使ったかもしれない",
    "プログラミングでハイになることってあるんだ",
    "思考の速度に手が追いつかない",
    "タイムアップのその瞬間まで考え抜いた",
    "コンテスト直後のコークほど美味いものは無い",
]

function setLoadingMessage() {
    const loading = document.querySelector('.-loading-message')
    const message = _loadingMessage[Math.floor(Math.random() * _loadingMessage.length)]   
    loading.innerHTML = `&ldquo;${message}&rdquo;`
    loading.classList.add('set')
}

function updateSquareSize() {
    const title = document.querySelector('.-title')
    const copyright = document.querySelector('.-copyright')
    const elem = document.querySelector('.-big-square')
    const wWidth = document.body.clientWidth
    const wHeight = document.body.clientHeight
    const theta = Math.atan(wHeight/wWidth)
    const hyp = wWidth/Math.cos(theta)
    const height = hyp*Math.tan(theta)
    const fontSize = hyp/title.innerHTML.length
    title.style.fontSize = `${fontSize}px`
    copyright.style.top = `${fontSize*1.5}px`
    elem.style.width = `${hyp}px`
    elem.style.height = `${height}px`
    return theta
}

function updateTitleRotation() {
    const elem = document.querySelector('.-big-square')
    let theta = updateSquareSize()
    const backgroundImages = document.querySelectorAll('.-bg-container img')
    if (location.hash == '#challenge') {
        theta = -theta
        const topSection = document.querySelector('section#top')
        topSection.classList.remove('show')
        backgroundImages[0].classList.remove('show')
        backgroundImages[1].classList.add('show')
    } else {
        backgroundImages[0].classList.add('show')
        backgroundImages[1].classList.remove('show')
    }
    elem.style.transform = `translateX(-50%) rotateZ(${theta}rad)`
}

function hideProgressContainer() {
    const progressContainer = document.querySelector('.-progress-container')
    progressContainer.style.display = 'none'
}

function afterBeginningTransition(e) {
    const sectionContainer = document.querySelector('.-section-container')
    const bigSquare = document.querySelector('.-big-square')
    bigSquare.removeEventListener('transitionend', afterBeginningTransition)
    setTimeout(() => {
        hideProgressContainer()
        updateTitleRotation()
        window.addEventListener('resize', updateTitleRotation)
        window.addEventListener('hashchange', updateTitleRotation)
        if (location.hash == '') {
            location.replace('#top')
        }
        sectionContainer.classList.add('show')
    }, 1000)
}

window.addEventListener('load', () => {
    setLoadingMessage()
    updateSquareSize()
    const container = document.querySelector('.-container')
    const copyright = document.querySelector('.-copyright')
    copyright.addEventListener('transitionend', afterBeginningTransition)
    setTimeout(() => {
        container.classList.add('loaded')
    }, 500)
})
