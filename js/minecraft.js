var minecraft = {};
minecraft.gamePlay = false; 

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
// Fonction qui va définir l'univers du jeu . 
minecraft.initWorld = function(){
    minecraft.initMatrix();
    minecraft.initBoard();
    minecraft.updateBoard();
}

//Création des lignes et des colonnes. 
minecraft.initMatrix = function(){
    minecraft.matrix = new Array(20);
    for(var i = 0; i < minecraft.matrix.length; i++){
        minecraft.matrix[i] = new Array(20);
    }
    for(var i = 0; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix[i].length; j++){
            minecraft.matrix[i][j] = "";
        }
    }
}

minecraft.initBoard = function(){
    for(var i = 0; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix[i].length; j++){
            minecraft.block = $('<div>');
            minecraft.block
                    .addClass("block")
                    .data("line", i)
                    .data("col", j)
                    .on("click", minecraft.caseClicked);
            $('#world').append(minecraft.block);
        }
    }
    for(var i = 16; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix[i].length; j++){
            if(i === 16){
                minecraft.matrix[i][j] = "floor";
            }
            else{
                minecraft.matrix[i][j] = "dirt";
            }
        }
    }
}

minecraft.updateBoard = function(){
    minecraft.element = $('.block')
        .removeClass("wood")
        .removeClass("leaves")
        .removeClass("stone")
        .removeClass("floor")
        .removeClass("dirt")
        .removeClass("bush");


    for(var i = 0; i<minecraft.matrix.length; i++){
        for(var j = 0; j<minecraft.matrix[i].length; j++){
                minecraft.element.eq(i*20 + j).addClass(minecraft.matrix[i][j]);
        }
    }
}

minecraft.caseClicked = function(){ //me donne la valeur de ma case (ma classe)
    var line =$(this).data("line");
    var col =$(this).data("col");
    return minecraft.matrix[line][col]; 
}

//Fonction of the menu that have to be on pause when the main is landing, and on play when the main is gameboard. : 
minecraft.selectTool = function(){
    console.log($(this).attr('id'));
    if ($(this).attr('id')=="axe"){
        minecraft.selectedTool ==="axe";
    }
    else if($(this).attr('id') == "pickaxe"){
        minecraft.pickStone();
    }
    else if ($(this).attr('id') == "shovel"){
        minecraft.pickDirt();
    }
    else if($(this).attr('id') == "matter"){
        minecraft.pickMatter();
    }
}
$('.tool').click(minecraft.selectTool);

//Function selectTool allow us to select one of our tool. 

/********************************************************************************************************/

/*
//Function pick me permet de changer les class . 
minecraft.pickWood=function(){
	alert("You can only pick wood");
    $('#matter').css({"display" : "block"});
    if(minecraft.caseClicked === "wood"){
    
    }
	}

minecraft.pickStone=function(){
	alert("You can only pick stone");
    $('#matter').css({"display" : "block"});
}

minecraft.pickDirt=function(){
    alert("You can only pick dirt");
    $('#matter').css({"display" : "block"});
}
minecraft.pickMatter=function(){
    alert("You can have only the matter you select");
}

// pickaxe() : Doit comparer si il s'agit d'un background pierre, Si oui attrape le background. – for mining rocks
//shovel(); idem sauf qu'il s'agit de la terre. -for digging dirt
//remove class wood et addclass ciel . 
*/
minecraft.createButton();