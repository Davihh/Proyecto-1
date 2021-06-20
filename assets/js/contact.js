let numberCaptcha = 0;
contact()
detectChange()
captcha()
setOptions()

function detectChange() {
    const form = document.querySelector('#contact-us');
    form.addEventListener('keyup', e => {
        errors(e.target.name, e.target.value)
    })
    const form2 = document.getElementById('contact-us');
    form2.addEventListener('change', e => {
        const name = form2.elements['name'].value
        const lastName = form2.elements['lastName'].value
        if (name.length && lastName.length !== 0) {
            disableBtn()
        } else {
            enabledBtn()
        }
    })
}

function captcha() {
    let sum1, sum2, result;

    sum1 = Math.floor((Math.random() * 50) + 1);
    sum2 = Math.floor((Math.random() * 50) + 1);
    result = sum1 + sum2;
    numberCaptcha = result;

    document.getElementById('captcha').innerHTML = `${sum1} + ${sum2} = `;
}

function contact() {
    // SET disabled buttom
    enabledBtn()
    // FORM
    const form = document.getElementById('contact-us');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(form.elements['name'].value);
    })
}

function errors(type, value) {
    switch (type.toString()) {
        case 'name':
            validateError(value, type, '*** Por favor coloque su nombre');
        case 'lastName':
            validateError(value, type, '*** Por favor coloque su apellido');
        case 'captcha':
            validateCaptcha(value, type, '*** Por favor coloque la verificación correctamente');
    }
}

function validateError(value, type, message) {
    if (value.length == 0) {
        document.getElementById(`error-${type}`).innerText = message;
        document.getElementById(`error-${type}`).style.display = 'block';
    } else {
        document.getElementById(`error-${type}`).style.display = 'none';
    }
}

function validateCaptcha(value, type, message) {
    if(type === 'captcha') {
        if (Number(value) !== numberCaptcha) {
            disableBtn()
            document.getElementById(`error-${type}`).innerText = message;
            document.getElementById(`error-${type}`).style.display = 'block';
        } else {
            enabledBtn()
            document.getElementById(`error-${type}`).style.display = 'none';
        }
    }
}

function setOptions() {
    let i;
    let optionHTML;
    for (i = 1; i < 9; i++) {
        optionHTML += `<option value="${i}">Opcion ${i}</option>`
    }
    document.getElementById('list').innerHTML = optionHTML;
}

// HELPERS
function disableBtn(){
    document.getElementById('send-form').removeAttribute('disabled');
}

function enabledBtn() {
    document.getElementById('send-form').setAttribute('disabled', true);
}

// UTILS
