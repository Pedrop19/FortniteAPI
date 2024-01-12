let btnlogin = document.querySelector('.btn-logear');
let btnregistrar = document.querySelector('.btn-registrar');
let btnlogout = document.querySelector('.btn-logout');


// Crear la base de datos
let dbPromise = new Promise((resolve, reject) => {
    let request = indexedDB.open('users', 2);

    request.onupgradeneeded = function (event) {
        let db = event.target.result;
        let store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
    };

    request.onsuccess = function (event) {
        resolve(event.target.result);
    };

    request.onerror = function (event) {
        reject(event.target.error);
    };
});

if (btnlogin) {
    btnlogin.addEventListener('click', login);
}

if (btnregistrar) {
    btnregistrar.addEventListener('click', register);
}

function login() {
    let email = document.querySelector('#emailLogin');
    let password = document.querySelector('#passwordLogin');
    let emailValue = email.value;
    let passwordValue = password.value;
    console.log(emailValue);
    console.log(passwordValue);

    if (emailValue === '' || passwordValue === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    dbPromise.then(db => {
        let tx = db.transaction('users', 'readonly');
        let store = tx.objectStore('users');
        let index = store.index('name');
        let request = index.getAll();

        request.onsuccess = function () {
            let users = request.result;
            console.log(users);

            let user = users.find(user => user.email == emailValue && user.password == passwordValue);
            console.log(user);

            if (user) {
                localStorage.setItem('user', user.name);
                window.location.reload();
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    });
}

function register() {
    let nombre = document.querySelector('#nombre');
    let email = document.querySelector('#email');
    let user = document.querySelector('#user');
    let password = document.querySelector('#password');
    let password2 = document.querySelector('#password2');
    let nombreValue = nombre.value;
    let emailValue = email.value;
    let userValue = user.value;
    let passwordValue = password.value;
    let password2Value = password2.value;

    if (nombreValue === '' || emailValue === '' || userValue === '' || passwordValue === '' || password2Value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (passwordValue !== password2Value) {
        alert('Las contraseñas no coinciden');
        return;
    }

    let player = {
        name: nombreValue,
        email: emailValue,
        user: userValue,
        password: passwordValue
    }

    dbPromise.then(db => {
        let tx = db.transaction('users', 'readwrite');
        let store = tx.objectStore('users');
        store.add(player);
        return tx.complete;
    }).then(() => {
        window.location.reload();
        console.log('Player added');

    }).catch(error => {
        console.log(error);
    });
}

if (btnlogout) {
    btnlogout.addEventListener('click', logout);
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}