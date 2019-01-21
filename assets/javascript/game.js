$(document).ready(function() {
  var pokemon = [
    {
      name: "Bulbasaur",
      hp: 120,
      att: 15,
      counteratt: 10,
      image: "<img src='assets/images/bulbasaur.png' />"
    },
    {
      name: "Charmander",
      hp: 100,
      att: 30,
      counteratt: 5,
      image: "<img src='assets/images/Charmander.png' />"
    },
    {
      name: "Pikachu",
      hp: 145,
      att: 15,
      counteratt: 20,
      image: "<img src='assets/images/Pikachu.png' />"
    },
    {
      name: "Squirtle",
      hp: 180,
      att: 5,
      counteratt: 25,
      image: "<img src='assets/images/Squirtle.png' />"
    }
  ];

  pokemon.forEach(function(element) {
    var pokemonBox = $("<div>");
    pokemonBox.prop("name", element.name);
    pokemonBox.prop("healthpower", element.hp);
    pokemonBox.prop("attack", element.att);
    pokemonBox.prop("counterattack", element.counteratt);
    pokemonBox.addClass("col-sm-6 col-lg-2 border border-dark rounded text-center pokedex");
    var pokemonName = $("<div>");
    pokemonName = element.name;
    var pokemonImage = $("<div>");
    pokemonImage.html(element.image);
    var pokemonHealth = $("<div>");
    pokemonHealth.addClass("health-inner")
    pokemonHealth.text("HP: " + element.hp);
    $("#initial").append(pokemonBox);
    pokemonBox.append(pokemonName);
    pokemonBox.append(pokemonImage);
    pokemonBox.append(pokemonHealth);
  });

var characterChosen = false;
var enemyChosen = false;
var chosenCharacterName = "";
var chosenCharacterHealth = 0;
var chosenCharacterAttack = 0;
var chosenEnemyName = "";
var chosenEnemyHealth =0;
var chosenEnemyCounterAttack = 0;
var finalAttack = 0;
var enemyDefeated = 0;
var infoCharacter = $("<div>");
var infoEnemy = $("<div>");
var restartBut = $('<a href="index.html" class="btn btn-primary btn-sm active" role="button" aria-pressed="true">Restart</a>');



  
  $(".container").on("click",".pokedex", function(){

    

    if(!characterChosen){
      characterChosen = true;
      $(this).removeClass("pokedex");
      
      $(this).appendTo("#your-character");
      $("#initial .pokedex").appendTo("#enemies-available");
      $("#firststep").empty();

      chosenCharacterName = $(this).prop("name");      
      chosenCharacterAttack = $(this).prop("attack");
      
      chosenCharacterHealth = $(this).prop("healthpower");
     

    }else if(!enemyChosen){
      enemyChosen = true;
      infoCharacter.empty();
      $(this).appendTo("#defender");
      chosenEnemyName = $(this).prop("name");
      chosenEnemyCounterAttack = $(this).prop("counterattack");
  
      chosenEnemyHealth = $(this).prop("healthpower");
    }
  })

  $("#attack-button").on("click", function(){

    if(!characterChosen || !enemyChosen){
      return;
    }

    if(chosenCharacterHealth > 0 && chosenEnemyHealth > 0){
      
      finalAttack = finalAttack + chosenCharacterAttack;
      chosenEnemyHealth = chosenEnemyHealth - finalAttack;
      chosenCharacterHealth = chosenCharacterHealth - chosenEnemyCounterAttack;
      
      $("#your-character .health-inner").text("HP: "+chosenCharacterHealth);
      $("#defender .health-inner").text("HP: "+chosenEnemyHealth);

      infoCharacter.text("You attacked "+chosenEnemyName+" for "+finalAttack+" damage.");
      infoEnemy.text(chosenEnemyName+" attacked you back for "+chosenEnemyCounterAttack+" damage.");

      $("#info-character").append(infoCharacter);
      $("#info-enemy").append(infoEnemy);

      if(chosenEnemyHealth<1){
        enemyChosen = false;
        enemyDefeated++;
        chosenEnemyHealth = 0;
        $("#defender").empty();
        infoCharacter.text("You have defeated "+chosenEnemyName+", you can choose to fight another pokemon.");
        infoEnemy.empty();
      }


      if(chosenCharacterHealth<1 && enemyDefeated===3){
        infoCharacter.text("Nobody Wins. GAME OVER!!! ");
        infoEnemy.empty();
        $("#info-character").prepend(restartBut);


      }else if(chosenCharacterHealth<1){
        
        infoCharacter.text("You have been defeated. GAME OVER!!! ");
        infoEnemy.empty();
        $("#info-character").prepend(restartBut);
        

      }else if(enemyDefeated === 3){

        infoCharacter.text("You WON. GAME OVER!!! ");
        $("#info-character").prepend(restartBut);
        

      }

    }

  })
  
});
