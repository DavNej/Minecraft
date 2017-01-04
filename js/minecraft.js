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
    //minecraft.updateBoard();
}

//Création des lignes et des colonnes. 
minecraft.initMatrix = function(){
    minecraft.matrix = new Array(20);
    for(var i = 0; i < minecraft.matrix.length; i++){
        minecraft.matrix[i] = new Array(20);
    }
    for(var i = 0; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix.length; j++){
            minecraft.matrix[i][j] = "";
        }
    }
}

minecraft.initBoard = function(){
    for(var i = 0; i < minecraft.matrix.length; i++){
        for(var j = 0; j < minecraft.matrix.length; j++){
            minecraft.matrix[i][j] = i + " & " + j;
            var block = $('<div>');
            block
                .addClass("case")
                .addClass(minecraft.matrix[i][j])
                .data("line", i)
                .data("col", j)
                .on("click", minecraft.caseClicked);

            $('#world').append(block);
        }
    }
}
minecraft.caseClicked = function(){ //me donne la valeur de ma case (ma classe)
    var line =$(this).data("line");
    var col =$(this).data("col");
return(minecraft.matrix[line][col]); 
}

//Fonction of the menu that have to be on pause when the main is landing, and on play when the main is gameboard. : 

$('.tool').click(function(e){minecraft.selectTool(e);});

//Function selectTool allow us to select one of our tool. 

minecraft.selectTool = function(e){
    console.log(e.target.id);
    if (e.target.id == "axe"){
	    minecraft.pickWood();
	    //minecraft.currentTool = "axe";
    }
    else if(e.target.id =="pickaxe"){
	    minecraft.pickStone();
        //minecraft.currentTool = "pickaxe";
    }
    else if (e.target.id =="shovel"){
        minecraft.pickDirt();
    }
    else if(e.target.id =="matter"){
        minecraft.pickMatter();
    }
}

//Function pick me permet de changer les class . 
minecraft.pickWood=function(e){
	alert("You can only pick wood");
    $('#matter').css({"display" : "block"});
    if(minecraft.caseClicked === "wood"){
        minecraft.matrix
    }
	}

minecraft.pickStone=function(e){
	alert("You can only pick stone");
    $('#matter').css({"display" : "block"});
}

minecraft.pickDirt=function(e){
    alert("You can only pick dirt");
    $('#matter').css({"display" : "block"});
}
minecraft.pickMatter=function(e){
    alert("You can have only the matter you select");
}

// pickaxe() : Doit comparer si il s'agit d'un background pierre, Si oui attrape le background. – for mining rocks
//shovel(); idem sauf qu'il s'agit de la terre. -for digging dirt
//remove class wood et addclass ciel . 

minecraft.createButton();