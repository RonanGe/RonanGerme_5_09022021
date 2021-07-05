function loadTeddy() {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  var ourson = new URL("http://localhost:3000/api/teddies/" + id);
  fetch(ourson)
    .then((data) => data.json())
    .then((teddie) => {
      document.title = "Orinoco ~ " + teddie.name;
      document.getElementById("nom").innerText = teddie.name;
      document.getElementById("prix").innerText = teddie.price + "€";
      document.getElementById("image").src = teddie.imageUrl;
      document.getElementById("description").innerText = teddie.description;
      teddie.colors.forEach(color=>{
          document.getElementById("couleur").innerHTML +="<option value="+color+">"+color+"</option>";
      }
        
        )
    })
    .catch((err) => console.log(err));
}
loadTeddy();

if(!localStorage.getItem("Panier")){
  let cartProducts = []
  localStorage.setItem("Panier", JSON.stringify(cartProducts))}

let cartProducts = JSON.parse(localStorage.getItem("Panier"))

let urlProduct = ''

let getProducts = function(){
  return new Promise(function(resolve){
      let request = new XMLHttpRequest()
      request.onreadystatechange = function(){
          if(request.readyState === XMLHttpRequest.DONE && request.status == 200){
              resolve(JSON.parse(request.responseText))
          }
      }
      request.open("GET", "http://localhost:3000/api/teddies" + '/' + urlProduct)
      request.send()
  })
}



if(document.getElementById('btn') != null){
  const btn = document.getElementById('btn')
  
  btn.addEventListener('click', async function(){
      console.log('le bouton marche !')
      const allProducts = await getProducts()
  
      cartProducts.push(allProducts)
      localStorage.setItem("Panier", JSON.stringify(cartProducts))
          
      console.log('Ajout au panier réussi !')
      console.log(cartProducts + " sont dans le panier")
  })
}
  
const mainCart = document.getElementById('mainCart')

if(cartProducts.length > 0 && mainCart != null){

  let form = document.getElementById('form')
  form.style.display = 'flex'
  let textFinalPrice = document.getElementById('finalPrice')
  textFinalPrice.style.display = 'block'

  for(let i = 0; i < cartProducts.length; i++){ 

      // mise en page du panier

      let sectionCartArticle = document.createElement('section')
      mainCart.appendChild(sectionCartArticle)
      sectionCartArticle.classList.add('cart_Article')
      let imgCart = document.createElement("img")
      sectionCartArticle.appendChild(imgCart)
      imgCart.id = 'cart_photo'
      imgCart.setAttribute('src', cartProducts[i].teddie.imageUrl)
      let h1Cart = document.createElement("h1")
      sectionCartArticle.appendChild(h1Cart)
      h1Cart.innerHTML = cartProducts[i].name
      let priceCart = document.createElement('p')
      sectionCartArticle.appendChild(priceCart)
      priceCart.id = 'cart_prix'
      priceCart.innerHTML = parseInt(cartProducts[i].price / 100).toFixed(2) + '€'
      let buttonCartTrash = document.createElement('button')
      sectionCartArticle.appendChild(buttonCartTrash)
      let iTrash = document.createElement('span')
      buttonCartTrash.appendChild(iTrash)
      iTrash.classList.add('fas', 'fa-trash')

      // afficher le prix total à l'utilisateur
      totalPrice += cartProducts[i].price
      console.log(totalPrice)
      let finalPrice = document.getElementById('totalPrice')
      finalPrice.innerHTML = ' ' + parseInt(totalPrice / 100).toFixed(2) + ' €'
      console.log(i + ' numéro ourson')
      // supprimer un élément du panier
      
      buttonCartTrash.addEventListener('click', () => {
          cartProducts.splice(i,1) //supprimer l'élément
          console.log('element ' + cartProducts.name + 'supprimé !')
          localStorage.clear() // nettoyer le localStorage
          localStorage.setItem('LSCartProducts', JSON.stringify(cartProducts)) // réactualiser le panier
          window.location.reload() // afficher la nouvelle fenêtre
      })
  }
}
