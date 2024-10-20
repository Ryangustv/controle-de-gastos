function onChangeDate(){
    const date = form.date().value; 

    form.dateRequiredError().style.display = !date ? "block" : "none";
    saveButtonEnable();
}   


function typeTransaction(){
    const transaction = form.transactionType().value;
    
    form.selectTransactionError().style.display = !transaction ? "block" : "none";
    saveButtonEnable();
}


function onChangeValue(){
    const value = form.value().value;

    form.valueRequiredError().style.display = !value ? "block" : "none";
    form.valueMin1Error().style.display = value <= 0 ? "block" : "none";
    saveButtonEnable();
}


function saveButtonEnable(){
    form.saveButton().disabled = !isFormValid();
}


function isFormValid(){
    const date = form.date().value;
    if (!date) {
        return false;
    }
    const value = form.value().value;
    if (!value || value <= 0 ) {
        return false;
    }
    const transaction = form.transactionType().value;
    if (!transaction) {
        return false;
    }
    return true;
}

function cancelButton(){
    window.location.href = '../home/homer.html';
}

function saveTransaction(){
        const transaction = createTransaction();

        transactionService.save(transaction)
        .then(() => {
            hideLoading();
            window.location.href = '../home/homer.html';
        }).catch(() =>{
            hideLoading();
            alert('Erro ao salvar transação');
        })      
}

function createTransaction(){
    return {  
        type: form.TypeExpense().checked ? "gastos" : "entradas",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form. transactionType().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}

const form = {
    date: () => document.getElementById('date'),
    currency: () => document.getElementById('currency'),
    saveButton: () => document.getElementById('saveButton'),
    TypeExpense: () => document.getElementById('gastos'),
    dateInvalidError: () => document.getElementById('date-invalid-error'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueMin1Error: () => document.getElementById('value-min1-error'),
    transactionType: () => document.getElementById('transaction'),
    selectTransactionError: () => document.getElementById('type-required-error')
}


function showLoading() {
    aparecerLoading();

    setTimeout(() => {
        hideLoading();
    }, 1000);
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
