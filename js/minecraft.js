var minecraft = {};
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
}

minecraft.newGame = function(){
    alert('test');
}

minecraft.createButton();