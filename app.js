/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//////////////////////////////////////////////////////////START

//CONTROLE VARIABLES
var activePlayer=0;
var dice=1;
var dice2=1;

var gameState=true;
class player{
    constructor(name,totalScore,currentScore){
        this.name=name;
        this.totalScore=0;
        this.currentScore=0;
    }
}

//DEFINE PLAYERS
name0=prompt("Type first player's name");
name1=prompt("Type second player's name");
var players=[new player(name0,0,0), new player(name1,0,0)];

document.querySelector('#name-0').textContent=name0;
document.querySelector('#name-1').textContent=name1;

var maxScore=100;

//GET elements from DOM
diceDOM=document.querySelector('.dice');
diceDOM2=document.querySelector('.dice2');

rollDOM=document.querySelector('.btn-roll');
holdDOM=document.querySelector('.btn-hold');
newDOM=document.querySelector('.btn-new');

updateScreen();


//////////////////////////////////////////////////////////UPDATE

function getScore(){
    var input=document.getElementById('maxScore').value;
    if (!input){
        maxScore=100;
    }else{
        maxScore=input;
    }
}

function newgame(){
    players=[new player(name0,0,0), new player(name1,0,0)];
    document.querySelector('#name-0').textContent=name0;
    document.querySelector('#name-1').textContent=name1;

    getScore();

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    activePlayer=0;
    gameState=true;
    updateScreen();
}

function hold(){
    if (gameState){
        players[activePlayer].totalScore+=players[activePlayer].currentScore;
        players[activePlayer].currentScore=0;
        updateScreen();
        getScore();
        checkWinner();
        
    }
}

function rollDice(){    
    if (gameState){
        dice=Math.floor(Math.random()*6)+1;
        dice2=Math.floor(Math.random()*6)+1;
        if(dice===6 && dice2===6){
            players[activePlayer].totalScore=0;
            players[activePlayer].currentScore=0;
            updateScreen();
            nextPlayer();
            
            return
        }else if (dice!=1 && dice2!=1){
            players[activePlayer].currentScore+=dice+dice2;        
        }else{        
            players[activePlayer].currentScore=0;
            updateScreen();
            nextPlayer();
        }
        updateScreen();
        
    }
    getScore();
}
function updateScreen(){  
    document.querySelector('#current-0').textContent=players[0].currentScore;
    document.querySelector('#score-0').textContent=players[0].totalScore;
    document.querySelector('#current-1').textContent=players[1].currentScore;
    document.querySelector('#score-1').textContent=players[1].totalScore;
    diceDOM.src='images/dice-'+dice+'.png';
    diceDOM2.src='images/dice-'+dice2+'.png';
}

function nextPlayer(){
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    activePlayer===0?activePlayer=1:activePlayer=0; //CHANGE PLAYER
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
}

function checkWinner(){
    getScore();
    if (players[0].totalScore>=maxScore){
        document.querySelector('#name-0').textContent='WINNER!';
        document.querySelector('.player-0-panel').classList.add('winner');
        document.querySelector('.player-1-panel').classList.remove('active');
        gameState=false;        
    } else if (players[1].totalScore>=maxScore){
        document.querySelector('#name-1').textContent='WINNER!';
        document.querySelector('.player-1-panel').classList.add('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        gameState=false;
        
    }else{
        nextPlayer();

    }

}


//////////////////////////////////////////////////////////EVENT LISTENER
rollDOM.addEventListener('click', rollDice);
holdDOM.addEventListener('click', hold);
newDOM.addEventListener('click', newgame);

