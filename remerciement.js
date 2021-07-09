var mainConfirm = document.getElementById("mainConfirm");
getOrder = () =>{
    if(sessionStorage.getItem('order') != null){
        console.log(sessionStorage);
        let order = JSON.parse(sessionStorage.getItem('order'))
        let priceToPay = 0
        order.products.forEach((item)=>{
            priceToPay += item.price
        })
        console.log(order.contact);
        console.log(mainConfirm);
        mainConfirm.innerHTML +=  `<h2>Informations sur la commande</h2>
        <p>Nom et prénom : ${order.contact.firstName} ${order.contact.lastName}</p>
        <p>Adresse : ${order.contact.address} ${order.contact.city}</p>
        <p>Email : ${order.contact.email}</p>
        <p>Total de la commande: ${priceToPay  + ' €'}</p>
        <p>Numéro de commande : <span>${order.orderId}</span></p>`
        
        sessionStorage.removeItem('order')
    }else{
        alert("Vous êtes arrivé ici par erreur, toutes nos excuses !")
        window.location.href = "index.html"
    }
}
getOrder()