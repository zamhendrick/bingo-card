const bingoCard = document.querySelector('#bingo_card');
const bingoRow = bingoCard.querySelectorAll('tr');
const tbody = document.querySelector('#bingo_card tbody');
const clearCellsBtn = document.querySelector('#clear_cells_btn')
const generateCardBtn = document.querySelector('#generate_card_btn')
const goToNumberPickerBtn = document.querySelector('#go_to_number_picker_btn')
const cellHighlightColor = document.querySelector('[name="cell_highlight_color"]')
const cellTextColor = document.querySelector('[name="cell_text_color"]')
const defaultCellHighlight = '#910000'
const defaultCellText = '#ffffff'
const url = window.location.href
let numbersGenerated = false;

cellHighlightColor.value = defaultCellHighlight
cellTextColor.value = defaultCellText

function clearCellColor() {
    document.querySelectorAll('.colored-cell').forEach((bingoCell) => {
        bingoCell.classList.remove('colored-cell')
    })
    
}

function generateNumber() {
    clearCellColor();
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
}

tbody.onclick = (e) => {
    if (numbersGenerated) {
        const bingoCell = e.target.closest('td');
        const bingoCellClass = bingoCell.classList;
        if (!bingoCell) {
            return;
        }
        if (!bingoCellClass.contains('colored-cell') && numbersGenerated && !bingoCellClass.contains('special-cell')) {
            bingoCell.classList.add('colored-cell');
            bingoCell.style.backgroundColor = cellHighlightColor.value;
            bingoCell.style.color = cellTextColor.value;
        } else {
            bingoCellClass.remove('colored-cell');
            bingoCell.style.backgroundColor = 'initial';
            bingoCell.style.color = 'initial';
        }
    }
}

cellHighlightColor.onchange = (e) => {
    console.log(e.target.value)
}

cellTextColor.onchange = (e) => {
    console.log(e.target.value)
}

clearCellsBtn.onclick = () => {
    if (numbersGenerated) {
        if (confirm('Are you sure you want to clear the colors?')) {
            clearCellColor()
        }
    }
}

generateCardBtn.onclick = () => {
    if (numbersGenerated) {
        if (confirm('Are you sure you want to generate new card?')) {
            generateNumber()
        }
    } else {
        generateNumber()
    }
}

goToNumberPickerBtn.onclick = () => {
    if (numbersGenerated) {
        if (confirm('Are you sure you want to leave your card?')) {
            if (url.indexOf('github') > -1) {
                window.location.href = '/bingo-card/pages/number-picker/number-picker.html'
            } else {
                window.location.href = '/pages/number-picker/number-picker.html'
            }
        }
    } else {
        if (url.indexOf('github') > -1) {
            window.location.href = '/bingo-card/pages/number-picker/number-picker.html'
        } else {
            window.location.href = '/pages/number-picker/number-picker.html'
        }
    }
}