// Ne pas utiliser "var" : Soit const ou let
//Utilisation de const
//cart : panier


// J'initialise local storage au chargement de la page
// window.onload : C'est une fonction qui se lance aussiôt la la fenêtre est chargée 
window.onload=()=>{
  if(!localStorage.get("cart")){
    localStorage.setItem("cart",JSON.stringify([]))
      }
}

// ICI je défini l'URL de base
const BASE_URL="http://localhost:3000/api/teddies/";

// Je crée mes variable qui font référence à des élements du DOM
const articlePicture= document.getElementById("image")
const articleName= document.getElementById("name")
const articleColors= document.getElementById("colors");
const articlePrice= document.getElementById("prix");
const articleDescription=document.getElementById("description");
const articleImage=document.getElementById("image");


// Ici je recupère l'ID
const params = new URL(document.location).searchParams;
const id = params.get("id");

// Je crée l'objet qui va garder les informations sur l'articel chargé
let selectedArticle={};

// La fonction pour charger l'article par son ID
function fetchArticleById(id) {
  const urlToFetch=BASE_URL+id;
  console.log(urlToFetch)
  fetch(urlToFetch)
    .then((data) => data.json())
    .then((article) => {

      // article.color[0] : C'est définir comme couleur par défaut la première couleur de la liste des couleurs
      selectedArticle={picture: article.name,name:article.name,color:article.colors[0],price:article.price};
      updateDom(article)
    })
    .catch((err) => console.log(err));
}

fetchArticleById(id);

// Fonction pour mettre à jour les élements du DOM
function updateDom(article){
   document.title = "Orinoco ~ " + article.name;
      articleName.innerText = article.name;
      articlePrice.innerText = article.price + "€";
      articleImage.src = article.imageUrl;
      articleDescription.innerText = article.description;
      article.colors.forEach(color=>{
          articleColors.innerHTML +="<option value="+color+">"+color+"</option>";
      })
}


// Function pour mettre à jour l'attribut color de l'objet article quand l'utilisateur choisis une couleurs
articleColors.addEventListener('change',(e)=>{
  selectedArticle.color=e.target.value;
})

const addCart = document.querySelector('button');

//evenement 'click' pour l'envoi au local storage
addCart.addEventListener('click', function(e) { 

  // Ici, plus besoin de vérifier se le localstorage est vide, parce qu'il a déjà initialisé au chargement de la page
  //Avec window.onload
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.push(selectedArticle);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Ajouté au panier !');
})
