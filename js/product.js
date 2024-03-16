import { fetchCart } from "./app.js";
import { productsArr } from "./productsArr.js";

const title = document.getElementById('title');
const description = document.getElementById('details');
const imgSrc = document.getElementById('imgSrc');
const price = document.getElementById('price');
const bucata = document.getElementById('bucata');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const num = document.getElementById('num');
const buy = document.getElementById('buy');

function getQueryParam(key) {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(key);
}
const productId = getQueryParam('id');

let productDetails = null; 

productsArr.forEach(category => {
    let item = category.items.find(item => item.id === productId);

    if(item){
        productDetails = item;
        title.innerText = productDetails.name;
        description.innerText = productDetails.description;
        price.innerText = productDetails.price;
        imgSrc.src = productDetails.img;
        bucata.innerText = `mdl per ${productDetails.bucata}`;
    }
});



minus.addEventListener('click', () => {
    let value = parseInt(num.textContent, 10);

    if(value > 1){
        num.innerText = value - 1;
    }
    console.log(value-1)
});

plus.addEventListener('click', () => {
    let value = parseInt(num.textContent, 10);

    if(value < 99 )num.innerText = value + 1;
});

buy.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productExists = cart.find(item => item.id === productDetails.id);

    let quantity = parseInt(num.textContent, 10);

    if(quantity < 1)quantity = 1;

    if(productExists){
        productExists.quantity+=quantity;
        productExists.price += productDetails.price * quantity;
    } else{
        cart.push({
             id: productDetails.id, 
             quantity: quantity,
             price: productDetails.price * quantity,
             basePrice: productDetails.price,
             name: productDetails.name,
             img: productDetails.img,
         });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    fetchCart();
});

    


