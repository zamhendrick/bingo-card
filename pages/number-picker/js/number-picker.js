let letterB = []
let letterI = []
let letterN = []
let letterG = []
let randomNumber = '';
let letterO = []
let numbersDrawn = []
const currentDraw = document.querySelector('#current_draw')
let bingoCells = document.querySelectorAll('td');

function pickNumber() {
    let drawNumberBool = false
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
            // current_draw.innerHTML = randomNumber
            drawNumberBool = true;
        } else {
            drawNumberBool = false;
            // console.log('Drawn Similar Number' + randomNumber)
        }
    }
    // console.log(bingoCells);
    for (const cell in bingoCells) {
        if (bingoCells[cell].innerText == randomNumber) {
            // console.log(bingoCells[cell])
            bingoCells[cell].classList.add('number-drawn')
        }
    }
}
