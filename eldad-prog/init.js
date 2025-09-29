'use  strict'
 
function createModel(rows, cols) {
    const mat = []
    for (var i = 0; i < rows; i++) {
        const row = []
        for (var j = 0; j < cols; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}
function updateTimeForGame() {
    const diff = Date.now() - gStartTime
    const ms = String(diff % 1000)
    const seconds = String((diff - ms) / 1000)

    const elTimer = document.querySelector('.timer')
    elTimer.innerText = `${seconds.padStart(2, '0')} : ${ms.padStart(3, '0')}`
}
function stopTimer() {
    clearInterval(gTimerInterval)
}
