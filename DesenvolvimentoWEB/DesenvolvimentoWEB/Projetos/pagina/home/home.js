function Logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "../../index.html";
    }).catch(() =>{
        alert('Erro ao fazer logout');
    })
}

function findTransactions(user){
    transactionService.findByUser(user)
    .then(transactions => {
       addTransactionsToScreen(transactions);
    })
    .catch(error => {
        console.log(error);
        alert('Erro ao recuperar transacoes')
    })
}

    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            findTransactions(user);
        }
    })


function transactionButton(){
    window.location.href = "../transactions/transaction.html";
}

function addTransactionsToScreen(transactions){
    const orderedList = document.getElementById('transactions');

    
    transactions.forEach(transaction =>{
        const li = createTransactionList(transaction);
        li.appendChild(createDeletButton(transaction));

        li.appendChild(createParagraph(FormatarData(transaction.date)));
        li.appendChild(createParagraph(formatMoney(transaction.money)));
        li.appendChild(createParagraph(transaction.type));

        orderedList.appendChild(li);
    });
}

function createParagraph(value){
    const element = document.createElement('p');
    element.innerHTML = value;
    return element;
}


function createDeletButton(transaction){
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Remover";
    deleteButton.classList.add('outline', 'danger');
    deleteButton.addEventListener('click', () =>
        askRemoveTransaction(transaction));
    return deleteButton;
}


function createTransactionList(transaction){
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.id = transaction.uid;
    return li;
}


function askRemoveTransaction(transaction){
    const shouldRemove = confirm('deseja remover a transação?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
    return li;
}


function removeTransaction(transaction){
   transactionService.remove(transaction)
    .then(() =>{
            document.getElementById(transaction.uid).remove();
    })
}


function FormatarData(date){
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money){
    return `${money.currency} ${money.value.toFixed(2)}`
}





