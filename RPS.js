const opts = ['Rock', 'Paper', 'Scissors'];
const beats = new Map([['Rock', 'Scissors'],['Paper', 'Rock'],['Scissors','Paper']]);

function isOpt(str, list=opts) {
    let i;
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
    choice = Math.floor(Math.random()*2);
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
            console.log(`Congrats! ${ps} beats ${cs}, so Player wins!`)
            return 'p'
        } else if (winner == cs) {
            console.log(`Oops. ${cs} beats ${ps}, so computer wins.`)
            return 'c'
        } else {
            console.log(`Whoa! We have a ${winner}!`)
            return 't'
        }
    } else if (!isOpt(ps)) {
        console.log('Player selection must be either "Rock", "Paper", or "Scissors"');
    } else if (!isOpt(cs)) {
        console.log('Computer selection must be either "Rock", "Paper", or "Scissors"')
    }
}

function game() {
    let playerChoice;
    let score = [0,0]
    //for (let i = 0; i <= 5; i++) {
    playerChoice = window.prompt('Choose "Rock", "Paper", or "Scissors"');
    let result = playRound(playerChoice)
    if (result == 'p') {
        score[0] += 1
    } else if (result == 'c') {
        score[1] += 1
    }
    console.log(`Cumulative score: Player has ${score[0]}, computer has ${score[1]}.`);
    //}
    return score
}