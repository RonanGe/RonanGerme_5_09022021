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


const addCart = document.querySelector('button');
addCart.addEventListener('click', function(e) { //evenement 'click' pour l'envoi au local storage
  let teddiesChoosen = {
        picture: document.getElementById("image"),
        firstName: document.getElementById("nom"),
        color: document.getElementById("couleur"),
        price: document.getElementById("prix"),
    }
    const teddiesAdded = localStorage.getItem('product');
    if(teddiesAdded) {
      console.log("teddiesChoosen")
        teddiesInCArt = JSON.parse(teddiesAdded);
        teddiesInCArt.push(teddiesChoosen);
        localStorage.setItem('product', JSON.stringify(teddiesInCArt));
        alert('Ajouté au panier !');
    } else {
      console.log("teddiesChoosen")
        teddiesInCArt = [];
        teddiesInCArt.push(teddiesChoosen);
        localStorage.setItem('product', JSON.stringify(teddiesInCArt));
        alert('Ajouté au panier !');
    }
})

