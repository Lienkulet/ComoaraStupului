const contact_name = document.getElementById("nume");
const phone = document.getElementById("phone");
const contact_email = document.getElementById("contact_email");
const contact_message = document.getElementById("contact_message");
const sendMailBtn = document.getElementById("sendMailBtn");
const emailSuccess = document.getElementById("emailSuccess");
const regex_phone = /^\+(373)[0-9]{8}/g;
const regex_name = /^[A-Z][a-z]+(?:['-][a-z]+)?/g;
const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validation_error_name = document.getElementById("validation_error_name");
const validation_error_phone = document.getElementById("validation_error_phone");
const validation_error_email = document.getElementById("validation_error_email");
let phoneOk = false;
let nameOk = false;
let emailOk = false;
  
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
        validation_error_name.style.display = 'flex';
    }
    else {
        validation_error_name.style.display = 'none';
        nameOk = true;
    }
});

contact_email.addEventListener("input", () => {
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
    const params = {
        from_name: contact_name.value,
        email_id: contact_email.value,
        message: contact_message.value,
        clientName: contact_name.value,
        phone_number: phone.value
    }

    emailjs.send('service_dwwgi4k', 'template_kdpvkf3', params).then(
        (response) => {
            emailSuccess.innerText = 'Mesaj transmis cu succes!';
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

sendMailBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(nameOk && phoneOk && emailOk){
        sendEmail();
        nameOk = false;
        phoneOk = false;
        emailOk = false;
        phone.value = '';
        contact_name.value = '';
        contact_email.value = '';
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
