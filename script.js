let check_box = document.getElementsByClassName('check-box');
let result = document.getElementById('result');
let playerOneTurn = true;
let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let noOfTurns = 0;
let player_count = document.getElementById('player-count-txt');
let areTwoPlayers = true;

for(let i=0; i<check_box.length; i++) {
    check_box[i].addEventListener('click', () => Mark(i))
}
document.getElementsByClassName('player-count')[0].addEventListener('click', SwitchPlayerCount);


function Mark(idx) {
    let x = Math.floor(idx/3), y = Math.floor(idx%3);
    if(board[x][y]) return;
    
    check_box[idx].classList.add(playerOneTurn? 'tick': 'cross');
    if(playerOneTurn) board[x][y] = 1;
    else board[x][y]  = 2;
    noOfTurns++;
    
    playerOneTurn = !playerOneTurn;
    
    let cont = CheckBoard(x, y);
    
    if(cont && !playerOneTurn && !areTwoPlayers) {
        ComputerPlayerTwo();
        return;
    }
}

function CheckBoard(x, y) {
    function CheckMove(x, y) {
        if(board[1][y] == board[0][y] && board[2][y] == board[0][y]) return [board[x][y], y, 3+y, 6+y];
        if(board[x][1] == board[x][0] && board[x][2] == board[x][0]) return [board[x][y], 3*x, 3*x + 1, 3*x + 2];
        if(x - y == 0) {
            if(board[1][1] == board[0][0] && board[2][2] == board[0][0]) return [board[x][y], 0, 4, 8];
        }
        if(x + y == 2) {
            if(board[1][1] == board[0][2] && board[2][0] == board[0][2]) return [board[x][y], 2, 4, 6];
        }
        return 0;
    }

    let res = CheckMove(x, y);

    if(res != 0) ShowResult(res);
    else if(noOfTurns == 9) ShowResult([0]);

    return (res || noOfTurns == 9)? 0: 1;
}

function ComputerPlayerTwo() {
    let positionsLeft = [];
    for(let i=0; i<3; i++) {
        for(let k=0; k<3; k++) {
            if(board[i][k] == 0) positionsLeft.push(i*3 + k);
        }
    }

    Mark(positionsLeft[Math.floor(Math.random()*positionsLeft.length)]);
}

function SwitchPlayerCount() {
    if(areTwoPlayers) {
        player_count.innerHTML = 'Two Players Mode';
    } else player_count.innerHTML = 'One Player Mode';
    areTwoPlayers = !areTwoPlayers;
    ResetGame();
}

function ShowResult(res) {

    if(res == 0){
        for(let i=0; i<9; i++) {
            res.push(i);
        }
        result.innerHTML = `It's a draw!`;
    } else {
        result.innerHTML = `Winner is Player ${res[0]}!!`;
    }
    
    setTimeout(() => {
        clearInterval(intervalID);
        ResetGame();
    }, 1001);
    let intervalID = setInterval(() => {
        for(let i = 1; i < res.length; i++) {
            check_box[res[i]].classList.toggle('highlight');
        }
    }, 250);

}

function ResetGame() {
    playerOneTurn = true;
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    noOfTurns = 0;
    for(let i=0; i<check_box.length; i++) {
        check_box[i].classList.remove('tick');
        check_box[i].classList.remove('cross');
    }
    result.innerHTML = '----';
}
