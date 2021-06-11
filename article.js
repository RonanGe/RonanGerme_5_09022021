const elt = document.getElementById('ancre');    
elt.addEventListener('click', function() {          
    elt.innerHTML = "C'est cliqué !";               
});

let content =''
fetch("http://localhost:3000/api/teddies")
.then(data => data.json())
.then(teddie =>{
    content += `
                   <div class="card">
                       <a href="article.html" id="ancre"><img src="${
                         teddie.imageUrl
                       }" class="card-img-top" alt="...">
                       <div class="card-body">
                       <h3 class="card-title">${teddie.name}</h3>
                       <p class="card-text ">${teddie.description}.</p>
                       <p class="card-text"><strong>${
                        teddie.price}€</strong></p></a></div></div>`

document.querySelector('#main').innerHTML = content
})
.catch(err => console.log(err))