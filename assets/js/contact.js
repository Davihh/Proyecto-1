contact()
detectChange()

function detectChange() {
    const form = document.querySelector('#contact-us');
    form.addEventListener('keyup', e => {
        errors(e.target.name, e.target.value)
    })
}

function contact() {
    const form = document.getElementById('contact-us');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(form.elements['name'].value)
    })
}

function errors(type, value) {
    switch (type) {
        case 'name':
            validateError(value, 'name', '*** Por favor coloque su nombre')
        case 'lastName':
            validateError(value, 'lastName', '*** Por favor coloque su apellido')
    }
}

function validateError(value, type, message) {
    if (value.length == 0) {
        document.getElementById(`error-${type}`).innerText = message;
        document.getElementById(`error-${type}`).style.display = 'block'
    } else {
        document.getElementById(`error-${type}`).style.display = 'none'
    }
}
