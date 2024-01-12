let divBotonesSesionElement = document.querySelector('.botonesSesion');
let divBotonesPerfil = document.querySelector('.botonesPerfil');

if (localStorage.getItem('user')) {
    divBotonesSesionElement.classList.add('d-none');
    divBotonesPerfil.classList.remove('d-none');
}else{
    divBotonesSesionElement.classList.remove('d-none');
    divBotonesPerfil.classList.add('d-none');
}