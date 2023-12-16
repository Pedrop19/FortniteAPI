

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

    