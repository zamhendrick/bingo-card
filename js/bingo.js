const bingoCard = document.querySelector('#bingo_card');
const bingoRow = bingoCard.querySelectorAll('tr');
const tbody = document.querySelector('#bingo_card tbody');
const clearCellsBtn = document.querySelector('#clear_cells_btn')
const generateCardBtn = document.querySelector('#generate_card_btn')
let numbersGenerated = false;

function generateNumber() {
    var cardNumbers = [];

    for (let i = 1;  i < bingoRow.length; i++) {
        let bingoCell = bingoRow[i].querySelectorAll('td');
        let min = 1;
        for (let i = 0; i < bingoCell.length; i++) {
            if (!bingoCell[i].classList.contains('special-cell')) {
                randomNumber = Math.floor(Math.random() * 15) + min;
                if (cardNumbers.indexOf(randomNumber) === -1) {
                    cardNumbers.push(randomNumber);
                    bingoCell[i].innerHTML = randomNumber;
                    min += 15;
                } else {
                    i--;
                }
            }
        }
    }

    numbersGenerated = true;
    clearCellColor();
}

tbody.addEventListener('click', function(e) {
    const bingoCell = e.target.closest('td');
    const bingoCellClass = bingoCell.classList;
    if (!bingoCell) {
        return;
    }
    if (!bingoCellClass.contains('colored-cell') && numbersGenerated && !bingoCellClass.contains('special-cell')) {
        bingoCell.classList.add('colored-cell');
    } else {
        bingoCellClass.remove('colored-cell');
    }
    
});

function clearCellColor() {
    document.querySelectorAll('.colored-cell').forEach((bingoCell) => {
        bingoCell.classList.remove('colored-cell')
    })
    
}

clearCellsBtn.onclick = () => {
    clearCellColor()
}

generateCardBtn.onclick = () => {
    generateNumber()
}