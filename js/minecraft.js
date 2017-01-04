var minecraft = {};
minecraft.gamePlay = false; 
/*
Ca c'est un NameSpace. A partir de cette ligne, toute nouvelle variable ou fonction doit commencer par minecraft.nomDeLaChose

______ Declaration d'une nouvelle fonction: ______

minecraft.nomDeLaFonction = function(){
    console.log('youpi');
}

______ Declaration d'une nouvelle variable: ______

minecraft.nouvelleVariable = 'NameSpace is easy';

meme plus besoin de lui dire var :)
*/

minecraft.createButton = function(){
    var btn=$("<button/>");
    btn.addClass("myButton");
    btn.text("START");
    $("#main").append(btn);
    btn.click(minecraft.newGame);
};

minecraft.newGame = function(){ // set the game board.
	$('#logo').hide();
    $('.myButton').hide();
	$('#main').css({'background-image':'none', 'background-color':'#3b3d3f', 'line-height': '0'});
    $('#world').css({"display" : "block"});
    minecraft.gamePlay = true;
    minecraft.initWorld();
}

minecraft.initWorld = function(){
    minecraft.createMatrix();
    minecraft.initMatrix();
    //minecraft.updateBoard();
    

}

minecraft.createMatrix = function(){
    minecraft.matrix = Array(20);
    for(var i = 0; i < minecraft.matrix.length; i++){
        minecraft.matrix[i] = Array(20);
    }
    //intialization
    for(var i = 0; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix.length; j++){
            minecraft.matrix[i][j] = "";
        }
    }
}

minecraft.initMatrix = function(){
    for(var i = 0; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix.length; j++){
            var block = $('<div>');
            block
                .addClass('empty')
                .data("i", i)
                .data("j", j);
            
            $('#world').append(block);
        }
    }
}

minecraft.createButton();

//Fonction of the menu that have to be on pause when the main is landing, and on play when the main is gameboard. : 

// pickaxe() : Doit comparer si il s'agit d'un background pierre, Si oui attrape le background. – for mining rocks

//shovel(); idem sauf qu'il s'agit de la terre. -for digging dirt

//axe(); idem sauf qu'il s'agit du bois et des buissons. – for cutting trees