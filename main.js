'use strict'
var  gLevel 
var  gBourdModel  
const SMILE = '😄' 
const SAD  = '😢'
const NORMAL = '🙂'
const cry = '🤗'   
const bomp =  '💥'
 const flag = '🚩' 
 var gStartTime
  var gTimerInterval
 var gSumCellRvaled
 var gSumCellMark
 var gSumKlali
 var gNumberOfAttemps
 var gGameOver = false
 var gLastMove
 var gIndexforundo
var stepMoveForUndo
function easyGame()   {
  gLevel = {size:4,mines:2}
  
 // var bourd = builtbort(gLevel.size,gLevel.size) 
    gNumberOfAttemps = 0
	gLastMove = {}
 //
  stepMoveForUndo = [] 

   gBourdModel = buildBoard()
   console.log("my table before " ,gBourdModel)
   renderBoard(gBourdModel)
//   alert ("i am in the stsrat")
   levelGame()
    gGameOver = false
   gSumCellRvaled = 0
   gSumCellMark = 0
   
   console.log("my table   after 1 "  , gBourdModel)
   document.querySelector('.lost').style.display='none'	
   document.querySelector('.emoj').innerText = NORMAL
    startTimer()
   
    
} 
function mediumGame()   {
   document.querySelector('.lost').style.display='none'	
  gSumCellRvaled = 0
  gSumCellMark = 0 
  gNumberOfAttemps = 0
  stepMoveForUndo =[]
  
  gLevel = {size:8,mines:4}
    gGameOver = false
   gBourdModel = buildBoard()
   console.log(gBourdModel)
   renderBoard(gBourdModel)
   levelGame()
   document.querySelector('.emoj').innerText = NORMAL
   startTimer()
} 
function diffcultGame()   {
  gLevel = {size:12,mines:32}
  gNumberOfAttemps = 0
  gLastMove = {}
  stepMoveForUndo =[]
   document.querySelector('.lost').style.display='none'	
  gBourdModel = buildBoard()
   console.log(gBourdModel)
   renderBoard(gBourdModel)
   levelGame()
    
    
    gGameOver = false
   gSumCellRvaled = 0
   gSumCellMark = 0
   document.querySelector('.emoj').innerText = NORMAL
   startTimer()
   
}
function  buildBoard() {
	// TODO: Create the  suit Matrix (4*4 8*8 12*12)
	const board = createModel(gLevel.size,gLevel.size)

	// TODO:  create the main  bourd
    for (var i = 0; i < board.length; i++){
        for (var j = 0; j < board[i].length; j++){
                            
            
         board[i][j]= {mineAroundCount : 0, IsRvaled: false,
             IsMine : false,IsMarked:false}
          }
        }
      //place the bomp at model  randomali
	    var arrayp = []
	  for (var i = 0;i<gLevel.size;i++) {
            
         for (var j = 0;j<gLevel.size;j++) {
			var cellb = {line:i,colum:j} 
			arrayp.push(cellb)
		 }
	    } 
		console.log("arrayp ",arrayp)
		 var countbomp = 0
		 var countsetbomp = 1
		 //doto prevent dublicate places for bomp
		while (countbomp < gLevel.mines) {
        var indxbomp = getRandomIntInclusive(0, arrayp.length - 1 )
		var placeline  = arrayp[indxbomp].line
	    var  placecolm = arrayp[indxbomp].colum
//		alert ("length  " + arrayp.length)
		board[placeline][placecolm].IsMine = true
		arrayp.splice(indxbomp,1)
//   		 alert ("mine1 " + placeline +  ' ' + placecolm)	
		countbomp++
		}
 	  
       
	   
//	  alert ("mine1 " + placeline +  ' ' + placecolm)	
	  return board
 } 
 function renderBoard(board) {
  
	const elBoard = document.querySelector('.model')
	 
	var strHTML = ''
    
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n'
		for (var j = 0; j < board[0].length; j++) {
		//	const currCell = board[i][j]

		//	var cellClass = getClassName({ i: i, j: j })

		//	if (currCell.type === FLOOR) cellClass += ' floor'
		//	else if (currCell.type === WALL) cellClass += ' wall'

			// strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n'
			strHTML += `<td class="cell-${gLevel.size} cell-${i}-${j} " onmousedown ="onCellMouseDown(event,${i},${j})">`

		//	if (currCell.gameElement === GAMER) {
		//		strHTML += GAMER_IMG
		//	} else if (currCell.gameElement === BALL) {
		//		strHTML += BALL_IMG
		    strHTML += '</td>\n'
		}

			strHTML += '</tr>\n' 
		}
		 
	// console.log('strHTML is:')
	// console.log(strHTML)
	 elBoard.innerHTML = strHTML
	console.log(strHTML)
	console.log("my table   after 2 "  , gBourdModel)
	 
} 

function countNeibor(row,col,gBourdModel )  {	
  
  var countNeibur = 0
  var countbomp = {countmine:0,linecell:-1,coulmcell:-1}
  
	for (var i = row - 1; i <= row + 1; i++) {
 		if (i >=  gLevel.size) {
			
			   continue
		   }  
	  	if (i < 0 || i >= gBourdModel[i].length) continue
	  	for (var j = col - 1; j <= col + 1; j++) {
	 		if (i === row && j === col) continue
	 		if (j < 0 || j >= gBourdModel [i].length) continue
			if (gBourdModel [i][j].IsMine )   {
               countNeibur++
 			}  
		}
	}
	gBourdModel[row][col].mineAroundCount = countNeibur
	countbomp.countmine=countNeibur
	countbomp.linecell=row
	countbomp.coulmcell=col
    
	return countbomp
	
}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function onCellMouseDown(ev,i,j) { 
	 gNumberOfAttemps++
     if  (gGameOver)  return
     
 //   alert ("my giga is " + gNumberOfAttemps  ) 
 //      alert (" i do "  + isBomp(i,j))
    //todo user can at first attemt to put at mine  
    if  ((isBomp(i,j))   && (gNumberOfAttemps === 1)  
                &&  (ev.button === 0))  return  
	                 
    if ((isBomp(i,j)) && (ev.button === 0))  { 
		     var audio = new Audio("mine.mp3") 
			  audio.play() 
         stopTimer()
        document.querySelector('.lost').style.display='block'
			 document.querySelector('.lost').innerText =   'you lost the game try later'
			 document.querySelector('.emoj').innerText = SAD
			 gGameOver = true
       stopTimer()
	 		 discoverboms()
			 return 
   }		 
   if ((ev.button === 0) && (checkVictory())) { 
	    document.querySelector('.lost').style.display='block'
	   document.querySelector('.lost').innerText = 'excellent    you   win'
	    document.querySelector('.emoj').innerText = SMILE
		gGameOver = true
    stopTimer()
		return
   }	
 // 	  alert ( "yfyyf  " + isBomp(i,j))  
//	  console.log( JSON.stringify(gBourdModel))
   //  alert(gBourdModel[0].length)
	//  alert ("my giga is " + gBourdModel[0] ) 
	  
      if ((ev.button === 0) && (!isBomp(i,j )))  
       
           
	      updateDom(i,j,gBourdModel)
      
//	   setTimeout(checkVictory,0)
	    
   	  if ((ev.button === 2) && (gBourdModel[i][j].IsRvaled))  {  
	  		 alert(" it is safe cell")
 		     const classCell = '.' + getClass(i,j)
 			 const cellLocation = document.querySelector(classCell)
 			 cellLocation.innerText = flag
			 return
 		}
	  
		if	(ev.button === 2) {
			alert( "this cell is not safe " )
	         return	
			} 	 	  
} 
function  updateDom(i,j,tav)  {
//  if (gBourdModel[i][j].IsRvaled)
//	  alert (" i find it waa")
 	console.log(" undo " ,stepMoveForUndo )
  const classCell = '.' + getClass(i,j)
  
 //  stepMoveForUndo.push(gLastMove)
//   console.log("aaa " , typeof stepMoveForUndo[0].lastline)
 //  console.log("aaa " , typeof stepMoveForUndo[0].lastcol)
//   console.log("BBB ",stepMoveForUndo[0])
 //  console.log("CCC ", stepMoveForUndo[0].lastline )
//    alert ("DDDD " +  
 //     stepMoveForUndo[0].lastline)
//    alert ("ffff " +stepMoveForUndo[0].lastcol )  
//   console.log("gdggd ", + stepMoveForUndo[0].lastline)
//   (stepMoveForUndo[gIndexforundo]).push(glastMove)
  var countRezult = {}	
  const cellLocation = document.querySelector(classCell)
 //   alert("after afTER  AFTER " + gBourdModel[0].length)
    countRezult = countNeibor(i,j,gBourdModel ) 
    //  RECUSIVI  OPERATION
    if (countRezult.countmine === 0 )   { 
		revealBompRecursiv(countRezult.linecell,countRezult.coulmcell)
		 
		// ALL THE AREA OF REALS CELLS
	 	paintAllArea()
	}
//	 gLastMove = {lastline:i,lastcol:j,countundo:countRezult.countmine}
   cellLocation.innerText =  countRezult.countmine
     if (countRezult.countmine === 0) { 
        gLastMove = {typecell:'unnormal',lastline:i,lastcol:j}
        stepMoveForUndo.push(gLastMove)
        cellLocation.style.color = "yellow"
      }   
  	else  { 
      gLastMove = {typecell:'normal',lastline:i,lastcol:j}
        stepMoveForUndo.push(gLastMove)
		cellLocation.style.color = "red"
    }
//   alert (" mark " + tav[i][j].IsMarked) 
    if (!tav[i][j].IsMarked) { 
      gSumCellMark++
 	  tav[i][j].IsMarked = true
   }          
   
 //   cellLocation.innerText = 20
 
}
function getClass(i,j) {
	return `cell-${i}-${j}`
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function startGame() { 
    gSumCellRvaled = 0
	gSumCellMark = 0
	gNumberOfAttemps = 0
	gLastMove = {}
  gIndexforundo = 0
  

  inititeundo()
  
    gLevel = {size:4,mines:2}
    gGameOver = false
 // var bourd = builtbort(gLevel.size,gLevel.size) 
  
   gBourdModel = buildBoard()
   console.log(gBourdModel)
   renderBoard(gBourdModel)
   document.querySelector('.emoj').innerText = NORMAL
   levelGame()
    startTimer()
   
}
function startTimer()  { 
//	alert(" i am at timer")
  gStartTime = new Date()
  gTimerInterval = setInterval(updateTimeForGame,50)	
}

function isBomp(i,j)  { 
 gSumKlali = gSumCellRvaled + gSumCellMark
	   
 var gsignsiumgame = Math.pow(gLevel.size,2) - gLevel.mines	   
   if   ((gBourdModel[i][j].IsMine) && (gSumKlali <= gsignsiumgame) )  
	 
	   return true



}
function levelGame()      {
	
 var levelG = document.querySelector('.level')
 switch(gLevel.size)  {
   case 4:
	levelG.innerText = 'easy game'
	break
   case 8:
	levelG.innerText = 'mduim  game'
	break	
    case 12:
	levelG.innerText = 'difficult game'
	break
	default :
	break	
 }


}
function discoverboms()  {
//alert ("i m in  discover"	)
for ( var i = 0;i<gLevel.size;i++)  { 
  for (var j = 0;j<gLevel.size;j++)	  { 	
      if (gBourdModel[i][j].IsMine) 
		  updatebomp(i,j) 
	  } 
  } 
   
} 
 function updatebomp(i,j)  {
   const classCell1 = '.' + getClass(i,j)

 //  alert ("i am  at   discover  "  + classCell1 )
 //  alert ("koriko " + getClass(i,j)) 
  const cellLocation = document.querySelector(classCell1)
 //  alert("after afTER  AFTER " + gBourdModel[0].length)
 //  var count = countNeibor(i,j,gBourdModel ) 
   cellLocation.innerText =  bomp


 } 
 function  revealBompRecursiv(i,j)  {
	
	 var count1 = {}
   if ((i < 0) || (j < 0) || (i>=gBourdModel.length )
	|| ( j >= gBourdModel[0].length))  return
  if ((gBourdModel[i][j]).IsRvaled)  return 
   gBourdModel[i][j].IsRvaled = true
  if (gBourdModel[i][j].Ismine)  return
  count1 = countNeibor(i,j,gBourdModel )
  if ((count1.countmine > 0) && (!gBourdModel[i][j].IsMarked) )  {
	   gSumCellMark++
	    gBourdModel[i][j].IsMarked = true
  }   
  if   (count1.countmine > 0)       
		updadeDomr(i,j,count1.countmine)
         
  else {      
   	for (var k = -1;k<= 1; k++)  {
		for (var l = -1;l<=1;l++ ) { 
            if (k === 0 && l === 0)
				continue
			revealBompRecursiv(i+k,j+l)
    	} 
    } 
   }		
   
 }
 function updadeDomr(i,j,k)  {
     const classCell = '.' + getClass(i,j)
   
  
  const cellLocation = document.querySelector(classCell)
 //  alert("after afTER  AFTER " + gBourdModel[0].length)
    gLastMove = {typecell:'unnormal',lastline:i,lastcol:j}
    stepMoveForUndo.push(gLastMove)
    
   cellLocation.innerText =  k
   cellLocation.style.color = "red"
 //   cellLocation.innerText = 20

 } 
 function paintAllArea()  {
//	gIndexforundo
  for (var i =0;i<gBourdModel.length;i++)  { 
//	 var kuk = array1[]
	for (var j =0;j<gBourdModel.length;j++) { 	
    const classCell = '.' + `cell-${i}-${j}`
    const cellLocation = document.querySelector(classCell)
   if ((gBourdModel[i][j].IsRvaled) && (cellLocation.innerText === '')) {   
	//    dataforundo(i,j)
      gSumCellRvaled++
	    cellLocation.classList.add('group-realved')
   }
 }
}
}
function checkVictory()  {
 //  	alert (" sum revaled " + gSumCellRvaled ) 
//  	alert (" sum mark " + gSumCellMark) 
	 gSumKlali = gSumCellRvaled + gSumCellMark
	   + gLevel.mines
//

 
 //     alert (" sum cells " +gSumKlali)  
	 if  (gSumKlali >= ((gLevel.size * gLevel.size) ))
		return true 
	    
	  else return false  
}     
function  undo()    {
  var il = stepMoveForUndo.length
  var il1 = il - 1
  if (il1 < 0)  return 
//  alert ("end end " + stepMoveForUndo[il1].typecell)
  console.log("end end ",stepMoveForUndo[il1])
  if (stepMoveForUndo[il1].typecell === 'normal') { 
  var i = stepMoveForUndo[il1].lastline
  var j = stepMoveForUndo[il1].lastcol
 //  if (gBourdModel[i][j].mineAroundCount > 0) { 
      const classCell = '.' + getClass(i,j)
      const cellLocation = document.querySelector(classCell)
      cellLocation.innerText = ''
      gBourdModel[i][j].IsMarked = false
      gSumCellMark--
      stepMoveForUndo.pop()
    }
    else { 
     var undoContinue = true
    while (undoContinue) {
       var il = stepMoveForUndo.length
       var il1 = il - 1
      var i = stepMoveForUndo[il1].lastline
      var j = stepMoveForUndo[il1].lastcol
  //    alert ("finish "  + i + ' ' + j)
 //  if (gBourdModel[i][j].mineAroundCount > 0) { 
      const classCell = '.' + getClass(i,j)
      const cellLocation = document.querySelector(classCell)
      cellLocation.innerText = ''
      gBourdModel[i][j].IsMarked = false
      gSumCellMark--
      stepMoveForUndo.pop()
      var il = stepMoveForUndo.length
      cellLocation.classList.remove('group-realved')
      var il1 = il - 1
      if   (stepMoveForUndo[il1].typecell === 'normal')
       undoContinue = false 
    }

  }


 }

 
  function  inititeundo()  {
     stepMoveForUndo =[] 
     
 //    stepMoveForUndo.push({lastline : 1,lastcol:2})
 
}  
function stopTimer() {
    
    clearInterval(gTimerInterval)
}   

