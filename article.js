function loadTeddy() {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  console.log(id);
  var a = new URL("http://localhost:3000/api/teddies/" + id);
  console.log(a);
  fetch(a)
    .then((data) => data.json())
    .then((teddie) => {
      console.log(teddie.colors);
      document.title = "Orinoco ~ " + teddie.name;
      document.getElementById("nom").innerText = teddie.name;
      document.getElementById("prix").innerText = teddie.price + "€";
      document.getElementById("image").src = teddie.imageUrl;
      document.getElementById("description").innerText = teddie.description;
      teddie.colors.forEach(color=>{
          console.log(color);
          document.getElementById("couleur").innerHTML +="<option value="+color+">"+color+"</option>";
      }
        
        )
    })
    .catch((err) => console.log(err));
}
loadTeddy();
