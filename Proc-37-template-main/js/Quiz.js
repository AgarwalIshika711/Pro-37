class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    backgroud("yellow");

    textSize(30);
    text("Results of the quiz" + ":",340,50);

    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      var displayAnswers = 230;
      textSize(20);
      text ("NOTE: Contestant who answered correct are highlighted in green", 130,230);
      
      for(var plr in allContestants){
        var correctAns = "2";
        if (correctAns === allContestants[plr].answer){
          fill("green");  
        } else{
          fill("red")
        }
      }
    }
    //write code to highlight contest who answered correctly 
    
  }

}
