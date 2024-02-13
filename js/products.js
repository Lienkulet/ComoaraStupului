import { productsArr } from "./productsArr.js";
import { fetchCart } from "./app.js";

const dropbtn = document.getElementById("dropbtnPrice");
const crescator = document.getElementById("crescator");
const descrescator = document.getElementById("descrescator");

const dropbtnCateg = document.getElementById("dropbtnCateg");
const allCateg = document.getElementById("allCateg");
const miere = document.getElementById("miere");
const lumanari = document.getElementById("lumanari");
const fagure = document.getElementById("fagure");
const polen = document.getElementById("polen");

const products_wrapper = document.getElementById("products_wrapper");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");

let sortVal = 'crescator';
let category = 'all';

function displayItems(arr){
    let content = ''
    arr.map(prod => {
        content+=`
        <div product-id="${prod.id}" class="product_card" id="${prod.id}">
            <a href='/html/product-page.html?id=${prod.id}'>
                <img src="${prod.img}" alt="Product 1">
                <div class="product_card_details">
                    <h3>${prod.name}</h3>
                    <h4>${prod.price} mdl per ${prod.bucata}</h4>
                </div>
            </a>
            <button class="orange_button" productId="${prod.id}">Adaugă în coș🛒</button>
        </div>
        `;
    });

    products_wrapper.innerHTML = content;
};

function attachEventListeners() {
        const productCards = document.querySelectorAll('.product_card');
    
        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('orange_button')) {
                    const productId = e.target.getAttribute('productId');
                    addToCart(productId);
                } else {
                    const productId = card.getAttribute('product-id');
                    const productName = card.querySelector('.product_card_details h3').innerText;
                    const productPrice = card.querySelector('.product_card_details h4').innerText;
                    const productImgSrc = card.querySelector('img').src;
    
                    const productDetails = {
                        id: productId,
                        name: productName,
                        price: productPrice,
                        img: productImgSrc
                    };
    
                    localStorage.setItem('product', JSON.stringify(productDetails));
                    
                    // window.location.href = `/html/product-page.html?id=${productId}`;
                }
            });
        });
        
}

function addToCart(prodId){
    console.log(prodId)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product ='';
    let productExists = cart.find(item => item.id === prodId);

    productsArr.forEach(category => {
        let item = category.items.find(item => item.id === prodId);
    
        if(item){
            product = item;
        }
    });
    console.log(product)
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

function sortArr(arr){
    let sortedArr = [];
    console.log(sortVal)
    if(sortVal == 'crescator')sortedArr = arr.sort((a,b) => a.price - b.price);
    else if(sortVal == 'descrescator')sortedArr = arr.sort((a, b) => b.price - a.price);

    displayItems(sortedArr);
}

function sortPrice(arr) {
    let min = parseFloat(minPrice.value);
    let max = parseFloat(maxPrice.value);
    
    let sortPriceArr = arr.filter(item => item.price >= min && item.price <= max);

    if (sortPriceArr.length > 0) {
        sortArr(sortPriceArr);
    } else {
        products_wrapper.innerHTML = `<h4 class="no-products">0 Produse Găsite</h4>`;
    }
}

function sortCategory(){
    let categoryArr = []
    if(category === 'all')categoryArr = [...new Set(productsArr.flatMap(({items}) => items))];
    else if(category === 'miere')categoryArr = productsArr[0].items;
    else if(category === 'fagure')categoryArr = productsArr[1].items;
    else if(category === 'lumanari')categoryArr = productsArr[2].items;
    else if(category === 'polen')categoryArr = productsArr[3].items;

    sortPrice(categoryArr);
}


function checkPrice(){
    if(maxPrice.value <= 0) maxPrice.value = 10;
    if(maxPrice.value < minPrice.value){
        let temp = maxPrice.value;
        maxPrice.value = minPrice.value;
        minPrice.value = temp;
    }

    if(minPrice.value < 0)minPrice.value = 0;
}

maxPrice.addEventListener("input", () => {
    checkPrice();

    sortCategory(productsArr);
});

minPrice.addEventListener("input", () => {
    checkPrice()

    sortCategory(productsArr);
});

dropbtn.addEventListener("click", () => {
    document.getElementById("myDropdown").classList.toggle("show");
});

crescator.addEventListener("click", () => {
    document.getElementById("myDropdown").classList.toggle("show");
    dropbtn.innerText = 'Pret Crescător';
    sortVal = 'crescator'
    sortCategory(productsArr);
});

descrescator.addEventListener("click", () => {
    document.getElementById("myDropdown").classList.toggle("show");
    dropbtn.innerText = 'Pret Descresător';
    sortVal = 'descrescator';
    sortCategory(productsArr);
});

dropbtnCateg.addEventListener("click", () => {
    document.getElementById("myDropdown2").classList.toggle("show");
});

allCateg.addEventListener("click", () => {
    document.getElementById("myDropdown2").classList.toggle("show");
    dropbtnCateg.innerText = 'Toate Categoriile';
    category = 'all';
    sortCategory(productsArr);
});

miere.addEventListener("click", () => {
    document.getElementById("myDropdown2").classList.toggle("show");
    dropbtnCateg.innerText = 'Miere';
    category = 'miere';
    sortCategory(productsArr);
});

polen.addEventListener("click", () => {
    document.getElementById("myDropdown2").classList.toggle("show");
    dropbtnCateg.innerText = 'Polen';
    category = 'polen';
    sortCategory(productsArr);
});

fagure.addEventListener("click", () => {
    document.getElementById("myDropdown2").classList.toggle("show");
    dropbtnCateg.innerText = 'Fagure';
    category = 'fagure';
    sortCategory(productsArr);
});

lumanari.addEventListener("click", () => {
    document.getElementById("myDropdown2").classList.toggle("show");
    dropbtnCateg.innerText = 'Lumânări';
    category = 'lumanari';
    sortCategory(productsArr);
});

sortCategory(productsArr);
attachEventListeners()
