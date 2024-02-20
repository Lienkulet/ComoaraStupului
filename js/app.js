const newsletter = document.getElementById("newsletterInput");
const newsletterSuccess = document.getElementById("newsletterSuccess");
const newsletterBtn = document.getElementById("newsletterBtn");
const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validation_error_newsletter = document.getElementById("validation_error_newsletter");

const logo_mobile = document.getElementById("logo_mobile");
const nav_list_mobile = document.getElementById("nav_list_mobile");
const cart = document.getElementById('shoppingcartNr');
const cart_heading = document.getElementById('cart_heading');
const cart_wrapper = document.getElementById('cart_wrapper');
const empty_cart = document.getElementById('empty_cart');
const shoppingcart = document.getElementById('shoppingcart');
const cartMenu = document.getElementById('cart_num_items');
const product_container = document.getElementById('product_container');
const cart_bottom = document.getElementById('cart_bottom');
let newsletterOk = false;
let sum = 0;
let cartArr = JSON.parse(localStorage.getItem('cart')) || [];

// FORM VALIDATION
newsletter.addEventListener("input", () => {
    if (!regex_email.test(newsletter.value)) {
        newsletterOk = false;
        validation_error_newsletter.style.display = 'flex';
    } else {
        newsletterOk = true;
        validation_error_newsletter.style.display = 'none';
    }
});

// SUBSCRIBE TO NEWSLETTER
function sendEmail() {
    const params = {
        email_id: newsletter.value
    };

    emailjs.send('service_dwwgi4k', 'template_ze75xjb', params).then(
        (response) => {
            newsletterSuccess.innerText = 'Subscription successful!';
            newsletterSuccess.style.color = 'green';
            newsletterSuccess.style.textAlign = 'center';
            newsletterSuccess.style.display = 'flex';

            setTimeout(() => {
                newsletterSuccess.style.display = 'none';
            }, 3000);
        },
        (error) => {
            window.alert('An error occurred during your subscription, please try again later...', error);
        },
    );
}

newsletterBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (newsletterOk) {
        sendEmail();
        newsletterOk = false;
        newsletter.value = '';
    } else {
        console.log('Please enter your email!')
        newsletterSuccess.innerText = 'Please enter your email!';
        newsletterSuccess.style.color = 'red';
        newsletterSuccess.style.textAlign = 'center';
        newsletterSuccess.style.display = 'flex';

        setTimeout(() => {
            newsletterSuccess.style.display = 'none';
        }, 3000);
    }
});

// MOBILE NAV MENU
logo_mobile.addEventListener("click", () => {
    if (nav_list_mobile.style.display === 'none') nav_list_mobile.style.display = 'flex';
    else nav_list_mobile.style.display = 'none';
});

// SHOPPING CART
export function fetchCart() {
    cartArr = JSON.parse(localStorage.getItem('cart')) || []; // Refresh the cart array from localStorage
    let cartItemsNr = cartArr.reduce((acc, prod) => acc + prod.quantity, 0);
    cart.innerText = cartItemsNr;
    if (cartArr.length <= 0) {
        cartMenu.innerText = `(${cartItemsNr} prosuse)`;
        empty_cart.style.display = 'flex'
        product_container.innerHTML = '';
        cart_bottom.innerHTML = '';
        empty_cart.innerHTML = `
            <svg>...</svg>
            <h4>Coșul dumneavoastră este gol</h4>
            <a href="/html/produse.html" class="orange_button">Continuați Cumpărăturile</a>
        `;
    } else {
        cartMenu.innerText = `(${cartItemsNr} prosuse)`;
        empty_cart.innerHTML = '';
        empty_cart.style.display = 'none'
        product_container.innerHTML = '';
        cartArr.forEach((prod, index) => {
            sum += prod.basePrice * prod.quantity;
            product_container.innerHTML += `
                <div class="product">
                <img src="${prod.img}" class="cart-product-image">
                  <div class="item_desc">
                    <div class="flex top">
                      <h5>${prod.name}</h5>
                      <h4>${prod.price} mdl</h4>
                    </div>
                    <div class="flex bottom">
                      <div class="quantity">
                        <div class="quantitybtns">
                          <span data-index='${index}' class="minusCart">-</span>
                          <span class="num">${prod.quantity}</span>
                          <span data-index='${index}' class="plusCart">+</span>
                        </div>
                        <button type="button" data-id='${prod.id}' class="deleteItem remove_btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
        });

        cart_bottom.innerHTML = `
          <div class="total">
            <h3>SubTotal:</h3>
            <h3>${sum} mdl</h3>
          </div>
          <div class="btn_container">
          <a href='/html/checkout.html'>
            <button type="button" class="orange_button">Achitare</button>
          </a>
          </div>
        `;
    }
}

// Adjust and remove cart items using event delegation
document.getElementById('product_container').addEventListener('click', function(e) {
  // Define a helper function to find the parent element with the specified class
  function findParentWithClass(element, className) {
      while (element && !element.classList.contains(className)) {
          element = element.parentElement;
      }
      return element;
  }

  let targetElement = e.target;

  // Use the helper function to find the parent button if the target is an SVG or inside an SVG
  let deleteButton = findParentWithClass(targetElement, 'deleteItem');
  let minusButton = findParentWithClass(targetElement, 'minusCart');
  let plusButton = findParentWithClass(targetElement, 'plusCart');

  // Determine the action based on the class found on the parent or the target itself
  if (deleteButton) {
      const id = deleteButton.getAttribute('data-id');
      removeCartItem(id);
  } else if (minusButton) {
      const index = parseInt(minusButton.getAttribute('data-index'));
      adjustCartItemQuantity(index, 'decrease');
  } else if (plusButton) {
      const index = parseInt(plusButton.getAttribute('data-index'));
      adjustCartItemQuantity(index, 'increase');
  }
});


function adjustCartItemQuantity(index, action) {
    if (action === 'increase') {
        cartArr[index].quantity += 1;
    } else if (action === 'decrease' && cartArr[index].quantity > 1) {
        cartArr[index].quantity -= 1;
    }

    cartArr[index].price = cartArr[index].basePrice * cartArr[index].quantity; // Update this line if necessary
    localStorage.setItem('cart', JSON.stringify(cartArr));
    updateCart();
}

function removeCartItem(id) {
    let cartArr2 = cartArr.filter(prod => prod.id !== id);
  console.log(cartArr2)
    localStorage.setItem('cart', JSON.stringify(cartArr2));
    updateCart();
}

function updateCart() {
    sum = 0; // Reset sum
    fetchCart(); // Re-fetch and rebuild the cart UI
}

fetchCart(); // Initial cart fetch

cart_heading.addEventListener("click", () => {
    cart_wrapper.style.display = 'none';
});

shoppingcart.addEventListener("click", () => {
    cart_wrapper.style.display = 'block';
});
