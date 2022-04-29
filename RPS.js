const opts = ['Rock', 'Paper', 'Scissors'];
const beats = new Map([['Rock', 'Scissors'],['Paper', 'Rock'],['Scissors','Paper']]);
let i = 0;
function isOpt(str, list=opts) {
    for (i=0; i < list.length; i++) {
        if (list[i]===str) {
            return true;
        }
    }
    return false;
}

function propCap(str) {
    return str.at(0).toUpperCase().concat(str.slice(1).toLowerCase());
}

function computerPlay() {
    choice = Math.floor(Math.random()*3);
    return opts[choice];
}

function whoWon(s1, s2) {
    if (beats.get(s1) == s2) {
        return s1;
    } else if (beats.get(s2) == s1) {
        return s2;
    } else {
        return 'tie';
    }
}

function playRound(playerSelect, computerSelect=computerPlay()) {
    ps = propCap(playerSelect);
    cs = propCap(computerSelect);
    if (isOpt(ps) && isOpt(cs)) {
        let winner = whoWon(ps, computerSelect);
        if (winner == ps){
            return 'p';
        } else if (winner == cs) {
            return 'c';
        } else {
            return 't';
        }
    } else if (!isOpt(ps)) {
        console.log('Player selection must be either "Rock", "Paper", or "Scissors"');
    } else if (!isOpt(cs)) {
        console.log('Computer selection must be either "Rock", "Paper", or "Scissors"');
    }
}

function game(pc) {
    let score = [0,0,0];
    let com = '';
    const cc = computerPlay();
    let result = playRound(pc, cc);
    if (result == 'p') {
        score[0] += 1;
        com = `Congrats! ${ps} beats ${cs}, so you win!`;
    } else if (result == 'c') {
        score[1] += 1;
        com = `Oops. ${cs} beats ${ps}, so computer wins.`;
    } else {
        com = `Whoa! We have a tie!`;
        score[2] += 1;
    }
    return [score, com];
}

const rckBtn = document.querySelector('#rock');
const pprBtn = document.querySelector('#paper');
const scssrBtn = document.querySelector('#scissors');
const Btns = [rckBtn, pprBtn, scssrBtn];
const BtnCllctn = document.querySelector('.bttns')
const scoreCard = document.querySelector('.scoreCard');
const scTitle = document.createElement('h3');
scTitle.textContent = 'Running Scores:';
const scTiles = document.createElement('div');
const scPlyrTile = document.createElement('div');
const scTieTile = document.createElement('div');
const scCmpTile = document.createElement('div');
const scPlyrTileTitle = document.createElement('p');
scPlyrTileTitle.textContent = 'You:      ';
const scTieTileTitle = document.createElement('p');
scTieTileTitle.textContent = 'Ties:     ';
const scCmpTileTitle = document.createElement('p');
scCmpTileTitle.textContent = 'Computer:     ';
let scPlyrTileScore = document.createElement('p');
let scTieTileScore = document.createElement('p');
let scCmpTileScore = document.createElement('p');
const coms = document.querySelector('.comms');
const comsM = document.createElement('p');

coms.appendChild(comsM)

scPlyrTileTitle.setAttribute('style', 'padding:10px');
scTieTileTitle.setAttribute('style','padding:10px');
scCmpTileTitle.setAttribute('style', 'padding:10px');
scPlyrTileScore.setAttribute('style', 'padding:10px');
scTieTileScore.setAttribute('style', 'padding:10px');
scCmpTileScore.setAttribute('style', 'padding:10px');

scPlyrTile.appendChild(scPlyrTileTitle);
scPlyrTile.appendChild(scPlyrTileScore);
scTieTile.appendChild(scTieTileTitle);
scTieTile.appendChild(scTieTileScore);
scCmpTile.appendChild(scCmpTileTitle);
scCmpTile.appendChild(scCmpTileScore);

scPlyrTile.setAttribute('style', 'display: flex; justify-content: space-between; padding:10px')
scTieTile.setAttribute('style', 'display: flex; justify-content: space-between; padding:10px')
scCmpTile.setAttribute('style', 'display: flex; justify-content: space-evenly; padding:10px')

scTiles.appendChild(scPlyrTile);
scTiles.appendChild(scTieTile);
scTiles.appendChild(scCmpTile);
scTiles.setAttribute('style', 'display:flex; flex-direction: column; align-items:right')



let scObs = [scTitle, scTiles];
for (i = 0; i < scObs.length; i++) {
    scoreCard.appendChild(scObs[i]);
}



let playerChoice;
let score = [0,0,0];

for (let i=0; i < Btns.length; i++) {
    Btns[i].addEventListener('click', () => {
        playerChoice = Btns[i].getAttribute('id');
        let s = game(playerChoice);
        score[0] += s[0][0];
        score[1] += s[0][1];
        score[2] += s[0][2];
        scPlyrTileScore.textContent = `${score[0]}`;
        scTieTileScore.textContent = `${score[2]}`;
        scCmpTileScore.textContent = `${score[1]}`;
        comsM.textContent = `${s[1]}`;

        

    });
}

const RSb = document.querySelector('.resetBtn');
RSb.addEventListener('click', () => {
    score = [0,0,0];
    scPlyrTileScore.textContent = `${score[0]}`;
    scTieTileScore.textContent = `${score[2]}`;
    scCmpTileScore.textContent = `${score[1]}`
    comsM.textContent = '';
});

