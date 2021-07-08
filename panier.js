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
    console.log(structurePanier);
    structurePanier[0].forEach(element => {
        var ligne = table.insertRow(-1);
        ligne.insertCell(0).innerHTML = "<img src=" + element.picture + "></img>";
        ligne.insertCell(1).innerHTML = element.name;
        ligne.insertCell(2).innerHTML = element.color;
        ligne.insertCell(3).innerHTML = element.price;
     console.log(element);   
    });
   
}
