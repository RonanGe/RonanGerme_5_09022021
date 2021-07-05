let cartProducts = JSON.parse(localStorage.getItem("Panier"))

let urlProduct = ''

  let totalPrice = 0
  
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

  const mainCart = document.getElementById('mainCart')

  if(cartProducts.length > 0 && mainCart != null){
  
    let form = document.getElementById('form')
    form.style.display = 'flex'
    let textFinalPrice = document.getElementById('finalPrice')
    textFinalPrice.style.display = 'block'
  
    for(let i = 0; i < cartProducts.length; i++){ 
  
        // mise en page du panier
  
        fetch("http://localhost:3000/api/teddies/")
    .then((data) => data.json())
    .then((teddie) => {
      document.getElementById("nom").innerText = teddie.name;
      document.getElementById("prix").innerText = teddie.price + "€";
      document.getElementById("img").src = teddie.imageUrl;
      document.getElementById("description").innerText = teddie.description;
    console.log('nom')
    })
  
        // afficher le prix total à l'utilisateur
        totalPrice += cartProducts[i].price
        console.log(totalPrice)
        let finalPrice = document.getElementById('totalPrice')
        finalPrice.innerHTML = ' ' + parseInt(totalPrice / 100).toFixed(2) + ' €'
        console.log(i + ' numéro ourson')
    }
  }
  

