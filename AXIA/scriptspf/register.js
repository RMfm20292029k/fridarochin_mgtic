document.addEventListener("DOMContentLoaded", function() {
    // Obtener registros almacenados en localStorage o inicializar arreglo vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Función para registrar un nuevo usuario
    function registerUser(form, userType) {
        const formData = new FormData(form);
        const user = Object.fromEntries(formData.entries());
        user.type = userType; // Agregar tipo de usuario (Creador o Marca)
        users.push(user); // Agregar usuario a la lista

        // Guardar en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Mostrar usuarios en pantalla
        displayUsers();

        // Alerta de registro exitoso
        alert("Registro exitoso");

        // Limpiar formulario
        form.reset();
    }

    // Función para mostrar los usuarios en pantalla
    function displayUsers() {
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Limpiar la lista antes de actualizar

        users.forEach((user, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `
                ${user.type}: ${user.name || user.company_name} - ${user.email || user.company_email}
                <button class='btn btn-warning btn-sm' onclick='deleteUser(${index})'>Eliminar</button>
            `;
            userList.appendChild(listItem);
        });
    }

    // Función para eliminar un usuario específico
    function deleteUser(index) {
        users.splice(index, 1); // Eliminar usuario de la lista
        localStorage.setItem("users", JSON.stringify(users)); // Actualizar localStorage
        displayUsers(); // Actualizar la pantalla
    }

    // Función para borrar todos los registros del localStorage
    function clearStorage() {
        localStorage.removeItem("users");
        users = [];
        displayUsers();
    }

    // Eventos para capturar el envío de formularios
    const creatorForm = document.getElementById("creatorForm");
    const brandForm = document.getElementById("brandForm");
    const clearButton = document.getElementById("clearButton");

    if (creatorForm) {
        creatorForm.addEventListener("submit", function(event) {
            event.preventDefault();
            registerUser(this, "Creador de Contenido");
        });
    }

    if (brandForm) {
        brandForm.addEventListener("submit", function(event) {
            event.preventDefault();
            registerUser(this, "Marca");
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", clearStorage);
    }

    // Mostrar usuarios guardados al cargar la página
    displayUsers();
});
