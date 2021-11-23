const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEL= document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm= document.getElementById('settings-form');
const settings= document.getElementById('settings');
const difficultySelect = document.getElementById('difficulty');

// list of words 
const words = [
    'game',
    'name',
    'year',
    'near',
    'college',
    'toll',
    'book',
    'look',
    'mobile',
    'box',
    'paper',
    'pen'
]
// init word 
let randomWord;
//init score 
let score = 0;
//init time 
let time = 10;
//set difficulty to hard, medium or easy
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value 
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focus on text on start 
text.focus();

// start count down 
const timeInterval = setInterval(updateTime, 1000);

//generate random words from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

//add words to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

//update score 
function updateScore() {
    score++;
    scoreEl.innerText = score;
}

// update time
function updateTime() {
    time--;
    timeEl.innerText = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // end game 
        gameOver();
    }

}
// end and reload game
function gameOver() {
    endGameEL.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score} </p>
        <button onclick='location.reload()'>Reload</button>
    `
    endGameEL.style.display = 'flex';
}
addWordToDOM();

// event listeners 

//typeing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';
        
        //update time for score
        if (difficulty === 'hard') {
            time += 2;
        } else if(difficulty === 'medium'){
            time += 3;
        }else {
            time += 5;
        }
        
        updateTime();
    }
})
//settings
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//set difficulity 
settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty)
})