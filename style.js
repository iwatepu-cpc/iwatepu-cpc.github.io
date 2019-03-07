function updateSquareSize() {
    const elem = document.querySelector('.-big-square')
    const wWidth = document.body.clientWidth
    const wHeight = document.body.clientHeight
    const theta = Math.atan(wHeight/wWidth)
    const hyp = wWidth/Math.cos(theta)
    const height = hyp*Math.tan(theta)
    elem.style.width = `${hyp}px`
    elem.style.height = `${height}px`
    return theta
}

function updateTitleRotation() {
    const elem = document.querySelector('.-big-square')
    const theta = updateSquareSize()
    elem.style.transform = `translateX(-50%) rotateZ(${theta}rad)`
}

function hideProgressContainer() {
    const progressContainer = document.querySelector('.-progress-container')
    progressContainer.style.display = 'none'
}

window.addEventListener('load', () => {
    updateSquareSize()
    const container = document.querySelector('.-container')
    const bigSquare = document.querySelector('.-big-square')
    const topSection = document.querySelector('section#top')
    bigSquare.addEventListener('transitionend', () => {
        setTimeout(() => {
            hideProgressContainer()
            updateTitleRotation()
            window.addEventListener('resize', updateTitleRotation)
            topSection.classList.add('show')
        }, 1000)
    })
    setTimeout(() => {
        container.classList.add('loaded')
    }, 1000)    
})