function showLoading() {
    aparecerLoading();

    setTimeout(() => {
        // Ocultar o loader após o processo de login
        hideLoading();
        alert('Insira usuário novamente');
    }, 1000); // Simula um atraso de 2 segundos
}

function loadingRegister(){
    aparecerLoading();
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
