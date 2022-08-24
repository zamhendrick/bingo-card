const goToBingoCardBtn = document.querySelector('#go_to_bingo_card_btn')
const pickNumberBtn = document.querySelector('#pick_number_btn')
const url = window.location.href
// let letterB = []
// let letterI = []
// let letterN = []
// let letterG = []
// let letterO = []
let randomNumber = '';
let numbersDrawn = []
const currentDraw = document.querySelector('#current_draw')
let bingoCells = document.querySelectorAll('td');

function pickNumber() {
    let drawNumberBool = false
    if (numbersDrawn.length < 75) {
        while (!drawNumberBool) {
            randomNumber = Math.floor(Math.random() * 75) + 1
            if (numbersDrawn.indexOf(randomNumber) === -1) {
                numbersDrawn.push(randomNumber);
    
                if (randomNumber >= 1 && randomNumber <= 15) {
                    current_draw.innerHTML = 'B' + randomNumber
                } else if (randomNumber >= 16 && randomNumber <= 30) {
                    current_draw.innerHTML = 'I' + randomNumber
                } else if (randomNumber >= 31 && randomNumber <= 45) {
                    current_draw.innerHTML = 'N' + randomNumber
                } else if (randomNumber >= 46 && randomNumber <= 60) {
                    current_draw.innerHTML = 'G' + randomNumber
                } else if (randomNumber >= 61 && randomNumber <= 75) {
                    current_draw.innerHTML = 'O' + randomNumber
                } else {
                    console.log('error');
                }
                drawNumberBool = true;
            } else {
                drawNumberBool = false;
            }
        }
    } else {
        alert('Done!')
        numbersDrawn = []
        for (let i = 0; i < bingoCells.length + 1; i++) {
            bingoCells[i].classList.remove('number-drawn')
        }
    }
    
    for (const cell in bingoCells) {
        if (bingoCells[cell].innerText == randomNumber) {
            bingoCells[cell].classList.add('number-drawn')
        }
    }
}

pickNumberBtn.onclick = () => {
    pickNumber()
}

goToBingoCardBtn.onclick = () => {
    if (url.indexOf('github') > -1) {
        window.location.href = '/bingo-card'
    } else {
        window.location.href = '/index.html'
    }
}
