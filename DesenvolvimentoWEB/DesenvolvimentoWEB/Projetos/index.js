
function onchangeEmail(){ /// aqui armazeno todas as funcoes dentro de uma unica funcao
        toggleButtonDisable();
        toggleEmailError();
}

function onchangePassword(){ ///aqui tambem estou armazenando todas as funcoes dentro de uma so, no input q eu irei usar para atribuir oque se tem de fazer.
    toggleButtonDisable();
    togglePasswordErros();

}

function isEmailValid(){///armazenando toda funcao dentro de isEmailValid
        const email = form.email().value;
        if (!email) {
            return false;
        }///basicamente ele ira verificar se o valor colocado na caixa de texto "email" e verdadeiro.
        return validateEmail(email);
}

function toggleEmailError(){///aqui e para as mensagens de erro
        const email = form.email().value; 
        form.emailRequiredError().style.display = email ? "none" :  "block"; 

        form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErros() {///tag para erro na senha
        const password = form.password().value;
        form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonDisable(){ ///aqui todo o codigo vai ficar armazenado dentro da funcao toggleButtonDisable botoes desabilitados

        const emailValid = isEmailValid(); 
        form.emailValid().disabled = !emailValid; ///aqui recebe uma funcao e otimizamos botando false
    
        const passwordValid = isPasswordValid();
        form.loginButton().disabled = !emailValid || !passwordValid; ///a funcao loginButton e desabilitada, caso o email ou senha for verdadeira entao o resultado sera true.
}               

function isPasswordValid(){ ///funcao isPasswordValid recebe as condicoes
        const password = form.password().value;/// password recebe o codigo de form.password(), se o valor de password for falsa entao ele retorna falso, caso contrario verdadeiro
        if (!password) {
            return false;
        }
            return true;
}
function login(){
    showLoading(); ///transição de carregamento
    firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.password().value
    ).then(response => {
        hideLoading();
        window.location.href = "pagina/home/homer.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });    
}
function getErrorMessage(error){
     if (error.code == "auth/invalid-credential"){ ///variavel erro compara (nome do erro), se for igual entao
         return "Usuário não encontrado";   ///aparecer usuario nao encontrado no alert
         }
     if (error.code == "auth/invalid-credential"){
        return "Senha inválida";
     }
            return error.message;   
}           
function register(){
    loadingRegister();
    window.location.href = "pagina/registro/register.html";
}

    const form = { /// aqui vou puxar todos os elementos com o nome form e especificando oque irei puxar com o codigo dentro do ()
        email: () => document.getElementById('email'),
        password: () => document.getElementById('password'),
        loginButton: () => document.getElementById('loginbutton'),
        emailValid: () => document.getElementById('recover-password-button'),
        passwordRequiredError: () => document.getElementById('password-required-error'),
        emailRequiredError: () => document.getElementById('email-required-error'),
        emailInvalidError: () => document.getElementById('email-invalid-error'),
    }

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso!');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
