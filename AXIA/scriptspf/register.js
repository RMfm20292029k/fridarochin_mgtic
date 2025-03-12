document.addEventListener("DOMContentLoaded", () => {
    const creatorForm = document.getElementById("creatorForm");
    const brandForm = document.getElementById("brandForm");
    const userList = document.getElementById("userList");

    class Usuario {
        constructor(tipo, nombre, email, extra) {
            this.tipo = tipo; // "Creador" o "Marca"
            this.nombre = nombre;
            this.email = email;
            this.extra = extra; // Biografía para creadores, Industria para marcas
        }
    }

    let usuarios = [];

    function agregarUsuario(usuario) {
        usuarios.push(usuario);
        actualizarListaUsuarios();
    }

    function actualizarListaUsuarios() {
        userList.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `
                <strong>${usuario.tipo}:</strong> ${usuario.nombre} <br>
                <strong>Email:</strong> ${usuario.email} <br>
                <strong>${usuario.tipo === "Creador" ? "Biografía" : "Industria"}:</strong> ${usuario.extra}
                <button class="btn btn-danger btn-sm float-end" onclick="eliminarUsuario(${index})">Eliminar</button>
            `;
            userList.appendChild(listItem);
        });
    }

    window.eliminarUsuario = function(index) {
        usuarios.splice(index, 1);
        actualizarListaUsuarios();
    };

    creatorForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;
        
        const nuevoCreador = new Usuario("Creador", name, email, bio);
        agregarUsuario(nuevoCreador);
        
        creatorForm.reset();
    });

    brandForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const companyName = document.getElementById("company_name").value;
        const companyEmail = document.getElementById("company_email").value;
        const industry = document.getElementById("industry").value;

        const nuevaMarca = new Usuario("Marca", companyName, companyEmail, industry);
        agregarUsuario(nuevaMarca);
        
        brandForm.reset();
    });
});
