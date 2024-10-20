function OnchangeEmail(){
    const email = form.email().value;

    form.EmailRequiredError().style.display = email ? "none" : "block";
    form.EmailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    registerButtonDisabled();
    
} 

function OnchangePassword(){
    const password = form.password().value;

    form.PasswordInvalidError().style.display = password ? "none" : "block";

    form.PasswordMinLengh().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMatch();
    registerButtonDisabled();
}

function onChangeConfirmPassword(){
    validatePasswordMatch();
    registerButtonDisabled();
}

function validatePasswordMatch(){
    const password = form.password().value;
    const confirmPassword = form.confirmarSenha().value;

    form.ConfirmPasswordError().style.display = password == confirmPassword ? "none" : "block";

    registerButtonDisabled();
}
function registerButtonDisabled(){
    form.RegisterButton().disabled = !isFormValid();

}


function Register(){
    showLoading();
    
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    hideLoading();
    window.location.href = "../../pagina/home/homer.html";
}).catch(error => {
    hideLoading();
    alert(getErrorMessage(error));
})
}

function getErrorMessage(error){
    if (error.code == "auth/email-already-in-use") {
        return "Email Ja existente";
    }
    return error.message;
}

function isFormValid(){
    const email = form.email().value;  
    
    if (!email || !validateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if (!password || password.length <6) {
        return false;
    }
    const confirmPassword = form.confirmarSenha().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

function login(){
    window.location.href = "../../index.html";
}

const form = {
    confirmarSenha: () => document.getElementById('confirmarSenha'),
    ConfirmPasswordError: () => document.getElementById('password-confirm-error'),
    email: () => document.getElementById('email'),
    EmailInvalidError: () => document.getElementById('email-invalid-error'),
    EmailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    PasswordInvalidError: () => document.getElementById('password-required-error'),
    PasswordMinLengh: () => document.getElementById('passowrd-lengh-error'),
    RegisterButton: () => document.getElementById('button-register'),
    login: () => document.getElementById('button-login')
}

function showLoading() {
    aparecerLoading();

    setTimeout(() => {
        // Ocultar o loader após o processo de login
        hideLoading();
    }, 1000); // Simula um atraso de 2 segundos
}

function loadingRegister(){
    setTimeout(() => {
        // Ocultar o loader após o processo de login
        hideLoading();
    }, 1000); // Simula um atraso de 2 segundos

}
function aparecerLoading(){
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
}

function hideLoading(){
    const overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
    }
