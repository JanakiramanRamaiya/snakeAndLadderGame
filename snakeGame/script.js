const boardContainerEle = document.querySelector('.board__container');
const boardDice = document.querySelector('.board__dice');
const diceValue = document.querySelector('.dice__Value');
const boardEle = document.querySelector('.board')
const boardCellNoList = generateCellNo();
const snakeList = [[99,24],[45,20],[50,10],[70,5]]
const LadderList = [[2,11],[30,44],[55,97],[60,90]]
const specialCellMap = new Map(generateSnakeAndLadderMap(snakeList,LadderList));
let playerPosition = 1
console.log(specialCellMap)
boardDice.addEventListener('click',playerMove)

console.log(boardCellNoList)
// generate random number between 1-6
function generateRandomNum(){
    const randNum = Math.ceil(Math.random()*100)
    if(randNum>0 && randNum<7){
        return randNum
    }
    else {
        return generateRandomNum()
    }
}
 
function updateDiceValue(randomNum){
    // const randomNum = generateRandomNum();
    diceValue.innerText = randomNum
    diceValue.setAttribute('data-value',randomNum)
}

// function generateBoard(noOfRows,noOfColumns){
 
// const noOfCells = noOfColumns*noOfRows;


// }
const noOfCells = 100;
generateBoard()
function generateBoard(){
    const fragment = document.createDocumentFragment();
    
    for(let i = 0; i<100;i++){
        let specialCell , playerCell;
        if(specialCellMap.has(boardCellNoList[i])){
            specialCell = specialCellMap.get(boardCellNoList[i])
            console.log(specialCell)
        }
        if( boardCellNoList[i]===playerPosition){
            playerCell = 'P1'
        }
        fragment.appendChild(generateCell(boardCellNoList[i],specialCell,playerCell))
    }
    boardEle.appendChild(fragment);
}

function generateCell(id,specialCell,playerCell){
    const divEle = document.createElement('div');
    const player = playerCell ??''
    let specialCellVal =  specialCell ??''
    const ptag = specialCellVal? ` <p class='specialCell' data-special-cell=${specialCellVal}> ${specialCellVal}</p>`: '<p class="specialCell" > </p>'
    divEle.classList.add('cell')
    divEle.setAttribute('data-id',id)
     divEle.innerHTML = `<h4 class='cellNo'> ${id} </h4> 
     ${ptag}
     <p class="personPosition" > ${player}  </p>`
    return divEle
}

function generateCellNo(){
    let resultList = []
    let resultArr = []
    let tempArr = []
    for(let i=1;i<=100;i++){
        tempArr.push(i);
        if(i%10===0){
            let temp = i/10;
            if(temp%2===0){
                tempArr.reverse()
            }
            resultArr.push(tempArr)
            // resultArr.push(...tempArr)
            tempArr = []
        }
    }
    resultArr.reverse() 
    for(let arr of resultArr){
        resultList.push(...arr)
    }
    
    return resultList
}

function generateSnakeAndLadderMap(snakeList,LadderList){

   let resultArr = []
 resultArr = [...resultArr,...generateListmap(snakeList,'S')]  
 resultArr = [...resultArr, ...generateListmap(LadderList,'L')]  
 return resultArr
}

function generateListmap(list,symbol){
  const resultArr  =[]
    for(let i=1;i<=list.length;i++){
        let temp =[]
       
        const val = list[i-1]
        console.log(val[0])
        if(symbol==='S'){

            temp.push([val[0],`${symbol}-${i}-1`])
            temp.push([val[1],`${symbol}-${i}-0`])
        }
       else if(symbol ==='L'){
        
        temp.push([val[0],`${symbol}-${i}-1`])
        temp.push([val[1],`${symbol}-${i}-0`])

       }
       resultArr.push(...temp)
        
    }
    return resultArr
}

function playerMove(){

    const diceValue = generateRandomNum();
     let newPosition = playerPosition + diceValue;
     if(newPosition===100){
         console.log('win!!')
     }
     if(newPosition<100){
         
         console.log(diceValue)
        updateDiceValue(diceValue)
        updatePlayerPosition(newPosition)
        playerPosition = newPosition
        const getele = document.querySelector(`[data-id="${playerPosition}"]`)
        const specialCellVal = getele.querySelector('[data-special-cell]')
        if(specialCellVal){
             console.log("jaan",specialCellVal.getAttribute('data-special-cell'))
            const lastVal = specialCellVal.getAttribute('data-special-cell').split('-')
            const whichtype = lastVal[1];
            const val = lastVal[2];
            const firstVal = lastVal[0]
            if(val==="1"){
                const getele = document.querySelector(`[data-special-cell="${firstVal}-${whichtype}-0"]`);
                const currentPer = document.querySelector(`[data-id="${playerPosition}"]`)
                const geteleChild = getele.nextElementSibling
                currentPer.querySelector('.personPosition').innerText=''
                geteleChild.innerText = 'p1'
                playerPositionele = getele.closest('[data-id]');
                playerPosition = playerPositionele.getAttribute(data-id)
            }
        }
     }
    
}

function updatePlayerPosition(newPosition){
    const playerPositionEle = document.querySelector(`[data-id="${playerPosition}"]`)
    playerPositionEle.querySelector('.personPosition').innerText=''
    const newPlayerPositionEle = document.querySelector(`[data-id="${newPosition}"]`)
    newPlayerPositionEle.querySelector('.personPosition').innerText='P1'
}