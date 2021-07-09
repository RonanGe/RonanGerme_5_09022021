let cartProducts = JSON.parse(localStorage.getItem("cart"))

//Sélection de la classe où injecter le code
const positionElement = document.querySelector("#mainCart"); 
console.log(positionElement);

//si panier vide

if(cartProducts === null){
    const panierVide = `
    <div class="panier-vide">
        <div> Le panier est vide</div>
    </div>
    `;
    positionElement.innerHTML = panierVide;
}

else{
    let structurePanier = new Array(cartProducts);
    let table = document.getElementById("table"); 
    var total = 0;
    structurePanier[0].forEach(element => {
        var ligne = table.insertRow(-1);
        ligne.insertCell(0).innerHTML = "<img src=" + element.picture + "></img>";
        ligne.insertCell(1).innerHTML = "<p class= panier_name>" + element.name + "</p>";
        ligne.insertCell(2).innerHTML = "<p id = element-ID>" + element.id + "</p>";
        ligne.insertCell(3).innerHTML = "<p class= panier_color>" + element.color + "</p>";
        ligne.insertCell(4).innerHTML = "<p class= panier_price>" + element.price + "€ </p>"; 
        total = (total + element.price);
    });

    document.getElementById("totalPrice").innerHTML= total + "€";
} 

let contact = {}
let products = []
let sendValues

// regex de vérification
let lettersChecker = /[a-zA-Z\s]+/
let numbersChecker = /[0-9]/
let specialCharactersChecker = /[§!@#$%^&*(),.?":{}|<>]/
const emailChecker = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

// préparations des vérifications
let formValidation = document.getElementById('confirm_btn')
let form = document.getElementById('form')
const mainConfirm = document.getElementById("mainConfirm")

if(formValidation != null){
    formValidation.addEventListener('click', (e)=>{
        e.preventDefault()
        let firstNameValue = document.getElementById('firstName').value
        let lastNameValue = document.getElementById('lastName').value
        let addressValue = document.getElementById('address').value
        let cityValue = document.getElementById('city').value
        let emailValue = document.getElementById('email').value

        let checkCart = () =>{
            if(JSON.parse(localStorage.getItem('cart')) === null || JSON.parse(localStorage.getItem('cart')).length < 1){
                alert('Votre panier est vide')
                window.location.href = 'index.html'
                return false
            }else{
                return true
            }
        }
        
        // vérifier les indications du formulaire et des valeurs demandées
        // récupération des valeurs inscrites
        let checkForm = () =>{
            if(emailChecker.test(emailValue) == true && lettersChecker.test(firstNameValue) == true && numbersChecker.test(firstNameValue) == false && lettersChecker.test(lastNameValue) == true && numbersChecker.test(lastNameValue) == false && lettersChecker.test(cityValue) == true && numbersChecker.test(cityValue) == false){
               return true
            }else{
                return false
            }
        }

        // requête POST : envoi à l'API
        let sendPost = function(sendValues){
            let request = new XMLHttpRequest()
            request.onreadystatechange = function(){
                if(request.readyState === XMLHttpRequest.DONE && request.status == 201){
                    sessionStorage.setItem('order', this.responseText)
                    window.location = 'remerciement.html'
                    localStorage.clear()
                }
            }
            request.open("POST", "http://localhost:3000/api/teddies/order")
            request.setRequestHeader("Content-Type", "application/json")
            console.log(sendValues);
            request.send(sendValues)
        }
        // préparation de l'objet à transmettre à l'API
        let sendForm = () =>{
            if(checkCart() === true && checkForm() === true){
                cartProducts.forEach(function(product){
                    products.push(product.id)

                    contact = {
                        "firstName": firstNameValue,
                        "lastName": lastNameValue,
                        "address": addressValue,
                        "city": cityValue,
                        "email": emailValue
                    }
                    return contact
                })
                
        
                let values = {
                    contact,
                    products,
                }
                sendValues = JSON.stringify(values)
                sendPost(sendValues)
                
            }
            
        }
        sendForm()   
    })
}
