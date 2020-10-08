
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores,roundscore,activeplayer,dice,gameplaying;
scores =[0,0];
roundscore=0;
activeplayer=0;
gameplaying=true;

//  just shown for learning
// dice=Math.floor(Math.random()*6)+1;
// console.log(dice);
// document.querySelector('#current-'+activeplayer ).textcontent=dice;



document.querySelector('.dice').style.display = 'none';
 // setting all the score value as 0

//  Now, we could, of course, use the document.querySelectorjust fine, such as we did before,
// but I want to show you another method now,which is to document .getElementByID,
// instead of querySelector.So, this only works for IDs,but is faster than querySelector.
// So, sometimes, when we have IDs,
// instead of just using querySelector all the time,that we use getElementByID, for IDs.So, let's do that.



    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click',function()
{
  // all of the task will be performed if game is on
  if(gameplaying)
  {

      // 1.generate a random number
   var x=Math.floor(Math.random()*6)+1;

      // 2.display the result using picture of dice
   var dicedom=document.querySelector('.dice');
   dicedom.style.display='block';
   dicedom.src='dice-' + x + '.png';

      // 3.update the round score if the rolled number was not 1

      if(x!=1)   //if value of dice is other 1 then for that player we will add his score to his
      {          // total score which is roundscore
        roundscore = roundscore + x;  //here we are adding his score to roundscore until he hits 1
        document.querySelector('#current-'+ activeplayer ).textContent=roundscore;  //using this line we are displaying his total score on our webpage
      }
      else     //if the player who was playing earlier hits 1 then its turn for next player
      {
        if(activeplayer==1)    // since we are using current + activeplayer so we need to change our
        {                      // activeplayer now as the player has changed so if earlier activeplayer was 1 now 0
          activeplayer=0;      // if earlier was 0 now would be 1
        }
        else if(activeplayer==0)
        {
          activeplayer=1;
        }
        roundscore=0;      // now since theres only one roundscore variable we need to initialise it to 0 else if the prev player has total score as 15 then he hit 1
                           // and our player got chance so now if our player scores 2 , our player total score should be 2 but it would be 15+2=17 therefore we need
                           // to initialise roundscore =0
        document.getElementById('current-0').textContent = '0';  // this two lines are to display current score as 0 wen player changes
        document.getElementById('current-1').textContent = '0';

      // we have done some layout in css for player 1 but we want to switch that layout to player 2
      // when his turns come up so we can use feature of "toggle"

      // what the toggle class does is if that class doesnt have that prop it will remove it
      // else if its already present it will add it

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

       // we want to hide our dice wen player changes so this code
        // document.querySelector('.dice').style.display = 'none';
      }
    }
});

function nextplayer()
{
     // we will be using using code twice once in roll->else part and secondly in hold button so made
     // a function ,its easier way to use our code.
    if(activeplayer==1)
    {
      activeplayer=0;
    }
    else if(activeplayer==0)
    {
      activeplayer=1;
    }
    roundscore=0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}

document.querySelector('.btn-hold').addEventListener('click',function()
{
  if(gameplaying)
  {


   // add current score to global scores
   scores[activeplayer] = scores[activeplayer] + roundscore;

   // update the UI
   document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];

    // check if the player is won
    if(scores[activeplayer]>=75)
    {
      document.querySelector('#name-' + activeplayer).textContent = 'Winner !!';
      // when the winner is declared hide the dice.
      document.querySelector('.dice').style.display = 'none';
      // we have already written a css style for winner just apply it when winner is declared
      document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');

      // this line is to remove the existing active class style so that only winner class
      // is visble
      document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
      gameplaying=false;
    }
    else
    {
      nextplayer();
    }
  }
});


function init()
{
   // its all same piece of code we wrote in beignning of this section to initialise everything
   // and we need that again wen someone presses new game button so better aproach would be make
   // a function and then use it everywhere
     scores =[0,0];
     roundscore=0;
     activeplayer=0;
     gameplaying=true;
      document.querySelector('.dice').style.display = 'none';
      document.getElementById('score-0').textContent='0';
      document.getElementById('score-1').textContent='0';
      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';

      document.getElementById('name-0').textContent = 'Player 1';
      document.getElementById('name-1').textContent = 'Player 2';


       // we dont know which player won player 1 or player 2 but one thing is sure
       // whoever won the game has applied css class of winner so better remove it from
      // both no harm in that.
      document.querySelector('.player-0-panel').classList.remove('winner');
      document.querySelector('.player-1-panel').classList.remove('winner');

      //  one of them(btw player 1 and 2) is active so better remove it from both
      // to be on safer side
      document.querySelector('.player-0-panel').classList.remove('active');
      document.querySelector('.player-1-panel').classList.remove('active');

      // since now no player is active assign one player as active as we did earlier
      document.querySelector('.player-0-panel').classList.add('active');

}



document.querySelector('.btn-new').addEventListener('click',init);
