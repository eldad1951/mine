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
  
    var minitenum = Math.floor(((diff - ms) / 1000) / 60)
    var minite  = String(minitenum) 
    var seconds9  = String(((diff - ms) / 1000) % 60)
     
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = `${minite.padStart(2, '0')} : ${seconds9.padStart(2, '0')} : ${ms.padStart(3, '0')}`
}    

 