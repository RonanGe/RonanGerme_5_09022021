let content ='';
fetch("https://ronange.github.io/RonanGerme_5_09022021/:3000/api/teddies")
.then(data => data.json())
.then(teddies => {
    teddies.forEach(teddie=>{
       content += `
                    
                        <div class="card">
                        <a href="article.html?id=${teddie._id}" id="link">
                            <img src="${
                                teddie.imageUrl
                            }" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h3 class="card-title">${teddie.name}</h3>
                            <p class="card-text_description">${teddie.description}.</p>
                            <p class="card-text"><strong>${
                                teddie.price}€</strong></p></a></div></div>`
            })
    document.querySelector('#main').innerHTML = content
})
.catch(err => console.log(err))
