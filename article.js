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
      console.log('Panier')
      console.log('Ajout au panier réussi !')
      console.log(cartProducts + " sont dans le panier")
  })
}
  
const mainCart = document.getElementById('mainCart')
