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

minecraft.initWorld = function(){
    minecraft.initMatrix();
    minecraft.initBoard();
    //minecraft.updateBoard();
}

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
            var block = $('<div>');
            block
                .addClass("case")
                .addClass(minecraft.matrix[i][j])
                .data("i", i)
                .data("j", j)
                .on("click", minecraft.caseClicked);
            $('#world').append(block);
        }
    }
}


//Fonction of the menu that have to be on pause when the main is landing, and on play when the main is gameboard. : 

// pickaxe() : Doit comparer si il s'agit d'un background pierre, Si oui attrape le background. – for mining rocks


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
}

minecraft.pickWood=function(e){
	alert("You can only pick wood");
	
}

minecraft.pickStone=function(e){
	alert("You can only pick stone");
}

minecraft.pickwood=function(e){
	alert("You can only pick dirt");
}
/*
//axe(); idem sauf qu'il s'agit du bois et des buissons. – for cutting trees

	/*else if(e.target.id =="pickaxe"){
		$("pickaxe")

		//remove class three addClassSky
	}
	else (e.target.id =="shovel"){
	$("shovel".css)
	}	
}*/

// pickaxe() : Doit comparer si il s'agit d'un background pierre, Si oui attrape le background. – for mining rocks
//shovel(); idem sauf qu'il s'agit de la terre. -for digging dirt

//remove class wood et addclass ciel . 

minecraft.createButton();