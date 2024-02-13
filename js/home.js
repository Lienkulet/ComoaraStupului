import { fetchCart } from "./app.js";
import { productsArr } from "./productsArr.js";

const sliderbtn1 = document.getElementById("slide_bnt_1");
const sliderbtn2 = document.getElementById("slide_bnt_2");
const sliderbtn3 = document.getElementById("slide_bnt_3");
const sliderbtn4 = document.getElementById("slide_bnt_4");
const sliderbtn5 = document.getElementById("slide_bnt_5");

const productBtn1 = document.getElementById("productBtn1");
const productBtn2 = document.getElementById("productBtn2");
const productBtn3 = document.getElementById("productBtn3");
const productBtn4 = document.getElementById("productBtn4");
const productBtn5 = document.getElementById("productBtn5");

// =========== SLIDER START =========== 
sliderbtn1.addEventListener("click", () => {
    document.querySelector('.slides').style.marginLeft = `0`;
    sliderbtn2.classList.remove('active');
    sliderbtn3.classList.remove('active');
    sliderbtn4.classList.remove('active');
    sliderbtn5.classList.remove('active');
    sliderbtn1.classList.add('active');
});

sliderbtn2.addEventListener("click", () => {
    let element = document.getElementById("popular_product_card_2");
    let width = getComputedStyle(element);
    document.querySelector('.slides').style.marginLeft = `-${width.width}`;
    sliderbtn1.classList.remove('active');
    sliderbtn3.classList.remove('active');
    sliderbtn4.classList.remove('active');
    sliderbtn5.classList.remove('active');
    sliderbtn2.classList.add('active');
});

sliderbtn3.addEventListener("click", () => {
    let element = document.getElementById("popular_product_card_3");
    let style = getComputedStyle(element);
    document.querySelector('.slides').style.marginLeft = `-${parseInt(style.width, 10) * 2}px`;
    sliderbtn1.classList.remove('active');
    sliderbtn2.classList.remove('active');
    sliderbtn4.classList.remove('active');
    sliderbtn5.classList.remove('active');
    sliderbtn3.classList.add('active');
});

sliderbtn4.addEventListener("click", () => {
    let element = document.getElementById("popular_product_card_4");
    let style = getComputedStyle(element);
    document.querySelector('.slides').style.marginLeft = `-${parseInt(style.width, 10) * 3}px`;
    sliderbtn1.classList.remove('active');
    sliderbtn3.classList.remove('active');
    sliderbtn2.classList.remove('active');
    sliderbtn5.classList.remove('active');
    sliderbtn4.classList.add('active');
});

sliderbtn5.addEventListener("click", () => {
    let element = document.getElementById("popular_product_card_5");
    let style = getComputedStyle(element);
    document.querySelector('.slides').style.marginLeft = `-${parseInt(style.width, 10) * 4}px`;
    sliderbtn1.classList.remove('active');
    sliderbtn3.classList.remove('active');
    sliderbtn4.classList.remove('active');
    sliderbtn2.classList.remove('active');
    sliderbtn5.classList.add('active');
});
// =========== SLIDER END =========== 


function addToCart(prodId){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product ='';
    let productExists = cart.find(item => item.id === prodId);

    productsArr.forEach(category => {
        let item = category.items.find(item => item.id === prodId);
    
        if(item){
            product = item;
        }
    });
    if(productExists){
        productExists.quantity++;
        productExists.price += product.price;
    } else{
        cart.push({
             id: prodId, 
             quantity: 1,
             basePrice: product.price,
             price: product.price,
             name: product.name,
             img: product.img,
         });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    fetchCart();
}

productBtn1.addEventListener('click', () => addToCart('prod1'));
productBtn2.addEventListener('click', () => addToCart('prod2'));
productBtn3.addEventListener('click', () => addToCart('prod4'));
productBtn5.addEventListener('click', () => addToCart('prod7'));
productBtn4.addEventListener('click', () => addToCart('prod10'));


window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
      // Call fetchCart or equivalent function to update the UI based on the new cart data
      fetchCart();
    }
  });