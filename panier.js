if(!localStorage.getItem("Panier")){
    let cartProducts = []
    localStorage.setItem("Panier", JSON.stringify(cartProducts))}

let cartProducts = JSON.parse(localStorage.getItem("LSCartProducts"))


if(document.getElementById('btn') != null){
    const btn = document.getElementById('btn')
    
    btn.addEventListener('click', async function(){
        console.log('le bouton marche !')
        const allProducts = await getProducts()
    
        cartProducts.push(allProducts)
        localStorage.setItem("Panier", JSON.stringify(cartProducts))
        let messageAddToCart = document.getElementById('messageAddToCart')
        messageAddToCart.style.display = 'block'
            
        console.log('Ajout au panier réussi !')
        console.log(cartProducts + " sont dans le panier")
    })
}
    
const mainCart = document.getElementById('mainCart')
