const checkoutProds = document.getElementById('checkoutProds');
const checkoutTotal = document.getElementById('checkoutTotal');
const cardCheck = document.getElementById('cardCheck');
const numerarCheck = document.getElementById('numerarCheck');
const achitareBtn = document.getElementById('achitareBtn');
const emailSuccess = document.getElementById("emailSuccess");
const acthitare_type = document.getElementById("acthitare_type");

const contact_name = document.getElementById("name");
const phone = document.getElementById("phone");
const contact_email = document.getElementById("email");
const regex_phone = /^0\d{8}$/;
const regex_name = /^[A-Z][a-z]+(?:[ '-][A-Za-z]+)*$/;
const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validation_error_name = document.getElementById("validation_error_name");
const validation_error_phone = document.getElementById("validation_error_phone");
const validation_error_email = document.getElementById("validation_error_email");

let phoneOk = false;
let nameOk = false;
let emailOk = false;
let achitareTypeOk = false;
let message_items ='';
// CART CHECKOUT START

numerarCheck.addEventListener('click', () => {
    if (numerarCheck.checked) {
        cardCheck.checked = false;
        achitareTypeOk = true;
        acthitare_type.style.display = 'none';
    }

    if(!cardCheck.checked && !numerarCheck.checked){
        acthitare_type.style.display = 'flex';
        achitareTypeOk = false;
    }
});

cardCheck.addEventListener('click', () => {
    if (cardCheck.checked) {
        numerarCheck.checked = false;
        achitareTypeOk = true;
        acthitare_type.style.display = 'none';
    }

    if(!cardCheck.checked && !numerarCheck.checked){
        acthitare_type.style.display = 'flex';
        achitareTypeOk = false;
    }
});

const cartArr = JSON.parse(localStorage.getItem('cart')) || []; 
if(cartArr.length <=0)window.location.href = '/html/home.html';

let sum = 0;
cartArr.map(prod => {
    sum+=prod.basePrice*prod.quantity;
    message_items += ` Produs: ${prod.name} Cantitate: ${prod.quantity} Pret: ${prod.price} \n`;
    checkoutProds.innerHTML += `
        <article class='checkout_product' id=${prod.id}>
            <img src='${prod.img}' />
            <div class='checkout_product_details'>
                <h2>${prod.name}</h2>
                <h4>Cantitate: ${prod.quantity}</h4>
                <div>
                    <h4>Pret: ${prod.basePrice} mdl</h4>
                    <h3>Total: <span class='orange_gradient'>${prod.price} mdl</span></h3>
                </div>
            </div>
        </article>
    `
});

checkoutTotal.innerText = `${sum}mdl`;








// =========== FORM VALIDATION START =========== 
phone.addEventListener("input", () => {
    if(!regex_phone.test(phone.value)){
        phoneOk = false;
        validation_error_phone.style.display = 'flex';
    }
    else {
        validation_error_phone.style.display = 'none';
        phoneOk = true;
    }
});

contact_name.addEventListener("input", () => {
    if(!regex_name.test(contact_name.value)){
        nameOk = false;
        console.log('x')
        validation_error_name.style.display = 'flex';
    }
    else {
        validation_error_name.style.display = 'none';
        nameOk = true;
        console.log('y')

    }
});

contact_email.addEventListener("input", () => {
    console.log('xx')
    if(!regex_email.test(contact_email.value)){
        emailOk = false;
        validation_error_email.style.display = 'flex';
    }
    else {
        validation_error_email.style.display = 'none';
        emailOk = true;
    }
});
// =========== FORM VALIDATION END =========== 


// =========== SEND EMAIL START =========== 
function sendEmail(){
    let message = `Total: ${sum}mdl ${numerarCheck.checked? 'Numerar':'Card'} \nProduse:\n`;
    message += message_items;
    const params = {
        from_name: contact_name.value,
        email_id: contact_email.value,
        message: message,
        clientName: contact_name.value,
        phone_number: phone.value
    }

    emailjs.send('service_dwwgi4k', 'template_kdpvkf3', params).then(
        (response) => {
            emailSuccess.innerText = 'Comanda plasata cu succes!';
            emailSuccess.style.color = 'green';
            emailSuccess.style.textAlign = 'center';
            emailSuccess.style.display = 'flex';

            setTimeout(() => {
                emailSuccess.style.display = 'none';
            }, 3000);
        },
        (error) => {
          window.alert('A aparut o eroare in timpul transmiterii mesajului dvs, va rugam incerca-ti mai tarziu...', error);
        },
      );
}

achitareBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(nameOk && phoneOk && emailOk && achitareTypeOk){
        sendEmail();
        nameOk = false;
        phoneOk = false;
        emailOk = false;
        phone.value = '';
        contact_name.value = '';
        contact_email.value = '';
        localStorage.removeItem("cart");
        
        setTimeout(() => {
            window.location.href = '/html/home.html';
            cartArr = [];
        }, 3000);
    }
    else {
        console.log('Va rugam sa completati toate campurile formularului!')
        emailSuccess.innerText = 'Va rugam sa completati toate campurile formularului!';
        emailSuccess.style.color = 'red';
        emailSuccess.style.textAlign = 'center';
        emailSuccess.style.display = 'flex';

        setTimeout(() => {
            emailSuccess.style.display = 'none';
        }, 3000);
    }
});
// =========== SEND EMAIL END =========== 
