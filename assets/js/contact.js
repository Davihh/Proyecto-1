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
        const list = form2.elements['list'].value
        const captcha = form2.elements['captcha'].value
        if (name.length && lastName.length && list.length && captcha.length !== 0) {
            enabledBtn()
        } else {
            disableBtn()
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
    // SET enabled buttom
    disableBtn()
    // FORM
    const form = document.getElementById('contact-us');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        disableBtn()
        loading(true)
        setTimeout(() => {
            enabledBtn()
            loading(false)
            successMessage()
        }, 2500)
    })
}

function errors(type, value) {
    switch (type.toString()) {
        case 'name':
            validateError(value, type, '*** Por favor coloque su nombre');
        case 'lastName':
            validateError(value, type, '*** Por favor coloque su apellido');
        case 'list':
            validateError(value, type, '*** Por favor seleccione una opcion');
        case 'captcha':
            validateCaptcha(value, type, '*** Por favor coloque la verificación correctamente');
    }
}

function validateError(value, type, message) {
    if (value.length === 0) {
        document.getElementById(`error-${type}`).innerText = message;
        document.getElementById(`error-${type}`).style.display = 'block';
    } else {
        document.getElementById(`error-${type}`).style.display = 'none';
    }
}

function validateCaptcha(value, type, message) {
    if(type === 'captcha') {
        if (Number(value) !== numberCaptcha) {
            document.getElementById(`error-${type}`).innerText = message;
            document.getElementById(`error-${type}`).style.display = 'block';
            enabledBtn()
        } else {
            disableBtn()
            document.getElementById(`error-${type}`).style.display = 'none';
        }
    }
}

function setOptions() {
    let i;
    let optionHTML;
    for (i = 0; i < 9; i++) {
        if(i === 0) {
            optionHTML += `<option selected disabled value="">------</option>`
        } else {
            optionHTML += `<option value="${i}">Opcion ${i}</option>`
        }
    }
    document.getElementById('list').innerHTML = optionHTML;
}

// HELPERS
function disableBtn(){
    document.getElementById('send-form').setAttribute('disabled', true);
}

function enabledBtn() {
    document.getElementById('send-form').removeAttribute('disabled');
}

function loading(value) {
    if (value) {
        document.getElementById('loading').style.visibility = 'visible'
    } else {
        document.getElementById('loading').style.visibility = 'hidden'
    }
}

function successMessage() {
    document.getElementById('success-message').innerHTML = '<h3>Su mensaje ha sido enviado correctamente</h3>';
    setTimeout(() => {
        document.getElementById('success-message').innerHTML = '';
    }, 2500)
}
// UTILS
