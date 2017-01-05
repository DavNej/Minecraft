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

minecraft.createButton();

// Fonction qui va définir l'univers du jeu
minecraft.initWorld = function(){
    minecraft.initMatrix();
    minecraft.initBoard();
    minecraft.createTree(16, 3);
    minecraft.createStone(15, 16);
    minecraft.createBush(15, 9);
    minecraft.updateBoard();
    
    $('.tool, #matter').click(minecraft.selectTool);
    $('.tool, #matter').mousedown(function(){$(this).css("box-shadow", "5px 5px 5px #000 inset");});
    $('.tool, #matter').mouseup(function(){$(this).css("box-shadow", "5px 5px 5px #000");});
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
minecraft.createTree = function(line, col){
    minecraft.matrix[line][col] = "wood";
    minecraft.matrix[line-1][col] = "wood";
    minecraft.matrix[line-2][col] = "wood";
    minecraft.matrix[line-3][col] = "wood";
    minecraft.matrix[line-4][col] = "wood";
    minecraft.matrix[line-5][col] = "wood";
    
    minecraft.matrix[line-6][col] = "leaves";
    minecraft.matrix[line-7][col] = "leaves";
    minecraft.matrix[line-8][col] = "leaves";
    minecraft.matrix[line-9][col] = "leaves";
    
    minecraft.matrix[line-6][col-1] = "leaves";
    minecraft.matrix[line-7][col-1] = "leaves";
    minecraft.matrix[line-8][col-1] = "leaves";
    minecraft.matrix[line-9][col-1] = "leaves";

    minecraft.matrix[line-6][col-2] = "leaves";
    minecraft.matrix[line-7][col-2] = "leaves";
    minecraft.matrix[line-8][col-2] = "leaves";
    minecraft.matrix[line-9][col-2] = "leaves";

    minecraft.matrix[line-6][col+1] = "leaves";
    minecraft.matrix[line-7][col+1] = "leaves";
    minecraft.matrix[line-8][col+1] = "leaves";
    minecraft.matrix[line-9][col+1] = "leaves";

    minecraft.matrix[line-6][col+2] = "leaves";
    minecraft.matrix[line-7][col+2] = "leaves";
    minecraft.matrix[line-8][col+2] = "leaves";
    minecraft.matrix[line-9][col+2] = "leaves";

}
minecraft.createStone = function(line, col){
    minecraft.matrix[line][col-1] = "stone";
    minecraft.matrix[line][col] = "stone";
    minecraft.matrix[line][col+1] = "stone";
    minecraft.matrix[line-1][col-1] = "stone";
    minecraft.matrix[line-1][col] = "stone";
    minecraft.matrix[line-1][col+1] = "stone";
}
minecraft.createBush = function(line, col){
    minecraft.matrix[line][col-1] = "bush";
    minecraft.matrix[line][col] = "bush";
    minecraft.matrix[line][col+1] = "bush";
    minecraft.matrix[line-1][col-1] = "bush";
    minecraft.matrix[line-1][col] = "bush";
    minecraft.matrix[line-1][col+1] = "bush";
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

minecraft.checkIfPickable = function(line, col) {
    if(minecraft.matrix[line][col] == "leaves"){
        if(minecraft.matrix[line-1][col] == "" || minecraft.matrix[line+1][col] == "" || minecraft.matrix[line][col-1] == "" || minecraft.matrix[line][col+1] == ""){
            return true;
        }
        else{
            return false;
        }
    }
    if(minecraft.matrix[line][col] == "wood" || minecraft.matrix[line][col] == "dirt" || minecraft.matrix[line][col] == "floor" || minecraft.matrix[line][col] == "bush" || minecraft.matrix[line][col] == "stone"){
        if(minecraft.matrix[line-1][col] == ""){
            return true;
        }
        else{
            return false;
        }
    }
}


minecraft.inventory = {
    stone: 0,
    leaves: 0,
    wood: 0,
    bush: 0,
    dirt: 0,
    floor: 0
}

minecraft.updateInventory = function(){
    
}

minecraft.updateMatter = function(pickedMatter){
    minecraft.inventory[pickedMatter]++;
    $('#matter').removeClass();
    $('#matter').css({"display" : "block"});
    $('#matter').addClass(pickedMatter);
}



minecraft.caseClicked = function(){ //me donne la valeur de ma case (ma classe)
    var line =$(this).data("line");
    var col =$(this).data("col");

    if(minecraft.checkIfPickable(line, col)){
        if(minecraft.selectedTool=="axe"){
            if(minecraft.matrix[line][col] =="wood" /*|| minecraft.matrix[line][col] =="leaves" || minecraft.matrix[line][col] =="bush"*/){
                minecraft.updateMatter(minecraft.matrix[line][col]);
                minecraft.matrix[line][col] = "";
            }
        }
        else if(minecraft.selectedTool=="secateur"){
            if(minecraft.matrix[line][col] =="bush" || minecraft.matrix[line][col] =="leaves"){
                minecraft.updateMatter(minecraft.matrix[line][col]);
                minecraft.matrix[line][col] = "";
            }
        }
        else if(minecraft.selectedTool=="pickaxe"){
            if(minecraft.matrix[line][col] =="stone"){
                minecraft.updateMatter(minecraft.matrix[line][col]);
                minecraft.matrix[line][col] = "";
            }
        }
        else if(minecraft.selectedTool=="shovel"){
            if(minecraft.matrix[line][col] =="dirt" || minecraft.matrix[line][col] =="floor" ){
                minecraft.updateMatter(minecraft.matrix[line][col]);
                minecraft.matrix[line][col] = "";
            }
        }
    }
    else if (minecraft.selectedTool=="matter"){
        if(minecraft.matrix[line][col] == ""){
            minecraft.matrix[line][col] = $("#matter").attr('class');
        }
    }
    minecraft.updateBoard(); // We are calling updateBoard who reads the matrix and update the board.
}

//Fonction of the menu that have to be on pause when the main is landing, and on play when the main is gameboard. : 
minecraft.selectTool = function(){
    if ($(this).hasClass("tool")) {
        minecraft.selectedTool=$(this).attr('id');
    }
    if($(this).attr("id")==('matter')){
        minecraft.selectedTool = 'matter';
    }
}