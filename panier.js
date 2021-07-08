let cartProducts = JSON.parse(localStorage.getItem("cart"))

//Sélection de la classe où injecter le code
const positionElement = document.querySelector("#mainCart"); 
console.log(positionElement);

//si panier vide

if(cartProducts === null){
    const panierVide = `
    <div class="panier-vide">
        <div> Le panier est vide</div>
    </div>
    `;
    positionElement.innerHTML = panierVide;
}

else{
    let structurePanier = new Array(cartProducts);
    let table = document.getElementById("table"); 
    var pos = structurePanier.indexOf('Norbert')

    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);

    cell1.innerHTML += structurePanier[0];
    console.log(structurePanier);
    
}
