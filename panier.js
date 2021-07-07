let cartProducts = JSON.parse(localStorage.getItem("product"))

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
    let structurePanier = [];

    for(k = 0; k < cartProducts.lengh; k++){
        structurePanier = structurePanier +=`
        <div class="container">
            ${cartProducts[k].picture}
            <div>Quantité 1 - ${cartProducts[k].firstName} Prix : ${cartProducts[k].price}</div>
        </div>
        `;
    }
        if(k === cartProducts.lengh){

        positionElement.innerHTML = structurePanier; 
    }
}